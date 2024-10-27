import React from 'react';
import '../libs/styles/loginSection.scss';
import LoginForm from './LoginForm';
import FacebookLogin from './FacebookLogin';

const LoginSection = () => {
    return (
        <div className='login__wrapper'>
            <div className="login__form">
                <h1 className='form__heading'>Welcome back!</h1>
                <p className='form__title'>Choose your favorite football club with <strong>SportMan</strong></p>
                <LoginForm />
                <div className="form__divide">
                    <p>or continue with</p>
                </div>
                <div className='form__media'>
                    <FacebookLogin />
                    <FacebookLogin />
                    <FacebookLogin />
                </div>
                <p className='form__register'>Not a member? <span>Register now</span></p>
            </div>
            <div className="login__draw">
                <img src="/login.png" alt="login" />
                <h1>Choose your favorite football club with <strong>SportMan</strong></h1>
            </div>
        </div>
    )
}

export default LoginSection