// Import
import React from 'react';
import '../../layout/Login/Login.css';
import LoginUI from '../../layout/Login/Login';
import LoginForm from './LoginForm';

const Login = () => {
    return (
        <LoginUI form={LoginForm()} />
    );
}
export default Login;
