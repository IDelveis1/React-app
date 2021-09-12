import { connect } from "react-redux";
import React from "react";
import { Formik, Field, Form } from "formik";
import { logIn } from "../Redux/auth-reducer";
import { Redirect } from "react-router";
import * as Yup from "yup";
import style from "../Formcontrols/Formcontrol.module.css";
import { AppStateType } from "../Redux/redux-store";

type PropsType = {
  captcha: string | null;
  onSubmit: (formData: {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha: string;
  }) => void;
};

const LoginForm: React.FC<PropsType> = (props) => {
  const DisplayingErrorMessagesSchema = Yup.object().shape({
    email: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        rememberMe: false,
        captcha: "",
      }}
      onSubmit={props.onSubmit}
      validationSchema={DisplayingErrorMessagesSchema}
    >
      {({ errors, touched, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <div>
            <Field name="email" type="text" placeholder="email" />
            {touched.email && errors.email && <div>{errors.email}</div>}
          </div>
          <div>
            <Field name="password" type="password" placeholder="password" />
            {touched.password && errors.password && (
              <div>{errors.password}</div>
            )}
          </div>
          <div>
            <Field name="rememberMe" type="checkbox" />
          </div>
          <div>
            {props.captcha && <img src={props.captcha} />}
            {props.captcha && (
              <Field
                placeholder="Please captcha"
                name="captcha"
                type="text"
              ></Field>
            )}
          </div>
          <button type="submit">Login</button>
        </Form>
      )}
    </Formik>
  );
};

{
  /* <Form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder='email' name='email' component={Input} validate={[required]}></Field>
            </div>
            <div>
                <Field placeholder='password' type='password' name='password' component={Input} validate={[required]}></Field>
            </div>
           {props.error && <div className={style.formSummeryError}>
                {props.error}
            </div>
}
            <div>
                <Field name='rememberMe' component={Input} type='checkbox' ></Field>
            </div>
            <div>
                {props.captcha && <img src={props.captcha} />}
                {props.captcha &&  <Field placeholder='Please captcha' name='captcha' component={Input} ></Field>}
            </div>
            <button>Login</button>
        </Form> */
}

type Props = {
  logIn: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
  ) => void;
  isAuth: boolean;
  captcha: string | null;
};

const Login: React.FC<Props> = (props) => {
  debugger;
  const onSubmit = (formData: {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha: string;
  }) => {
    props.logIn(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha
    );
  };

  if (props.isAuth) {
    return <Redirect to="/profile" />;
  }

  return (
    <div>
      <h1>LOGIN</h1>
      <LoginForm onSubmit={onSubmit} captcha={props.captcha} />
    </div>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.Auth.isAuth,
  captcha: state.Auth.captcha,
});

type mapStateToPropsType = ReturnType<typeof mapStateToProps>;
type mapDispatchToPropsType = {
  logIn: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null
  ) => void;
};

export default connect<
  mapStateToPropsType,
  mapDispatchToPropsType,
  {},
  AppStateType
>(mapStateToProps, { logIn })(Login);
