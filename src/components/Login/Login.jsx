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
            <button>Login</button>
        </Form>
    )
}

const LoginFormRedux = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    debugger;
    const onSubmit = (formData) => {
        props.logIn(formData.email, formData.password, formData.rememberMe)
    }

if ( props.isAuth) {
       return <Redirect to='/profile'/>
}

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginFormRedux onSubmit={onSubmit} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.Auth.isAuth
})

export default connect(mapStateToProps, {logIn})(Login);