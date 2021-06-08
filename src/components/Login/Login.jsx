import { connect } from 'react-redux';
import React from 'react';
import { Formik, Field, Form } from "formik";
import { required } from '../../utils/validators/validators';
import { Element } from '../Formcontrols/Formcontrols';
import { logIn } from '../Redux/auth-reducer';
import { Redirect } from 'react-router';
import * as Yup from 'yup'
import style from '../Formcontrols/Formcontrol.module.css'


const Input = Element("input");

const LoginForm = (props) => {

    const DisplayingErrorMessagesSchema = Yup.object().shape({
        email: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
          password: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
      });


    return (
        <Formik
        initialValues={{
             email: '',
             password: '', 
             rememberMe: false,
             captcha: '',
    }}
        onSubmit={props.onSubmit}
        validationSchema={ DisplayingErrorMessagesSchema }
      >
        {({ errors, touched, handleSubmit }) => (
         <Form onSubmit={handleSubmit}>
             <div className={touched.newMessageBody && errors.newMessageBody ? style.error : ""}>
           <Field name="email" type='text' placeholder="email"/>
           {touched.email && errors.email && <div>{errors.email}</div>}
           </div>
           <div>
           <Field name="password" type='password' placeholder="password"/>
           {touched.password && errors.password && <div>{errors.password}</div>}
           </div>
           <div>
           <Field name="rememberMe" type='checkbox'/>
           </div>
           <div>
                {props.captcha && <img src={props.captcha} />}
                {props.captcha &&  <Field placeholder='Please captcha' name='captcha' type='text' ></Field>}
            </div>
           <button type="submit">Login</button>
         </Form>
      
    )
        }
        </Formik>

        
    )
}

{/* <Form onSubmit={props.handleSubmit}>
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
        </Form> */}

const Login = (props) => {
    debugger;
    const onSubmit = (formData) => {
        props.logIn(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

if ( props.isAuth) {
       return <Redirect to='/profile'/>
}

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginForm onSubmit={onSubmit} captcha={props.captcha} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.Auth.isAuth,
    captcha: state.Auth.captcha,
})

export default connect(mapStateToProps, {logIn})(Login);