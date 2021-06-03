import { connect } from 'react-redux';
import React from 'react';
import { Form, Field, reduxForm } from 'redux-form'
import { required } from '../../utils/validators/validators';
import { Element } from '../Formcontrols/Formcontrols';
import { logIn } from '../Redux/auth-reducer';
import { Redirect } from 'react-router';
import style from '../Formcontrols/Formcontrol.module.css'


const Input = Element("input");

const LoginForm = (props) => {
    debugger;
    return (
        <Form onSubmit={props.handleSubmit}>
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
        </Form>
    )
}

const LoginFormRedux = reduxForm({form: 'login'})(LoginForm)

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
            <LoginFormRedux onSubmit={onSubmit} captcha={props.captcha} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.Auth.isAuth,
    captcha: state.Auth.captcha,
})

export default connect(mapStateToProps, {logIn})(Login);