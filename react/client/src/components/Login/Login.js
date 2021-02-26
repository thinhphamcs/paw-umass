// Import
import React, { useEffect } from 'react';
import LoginUI from '../../layout/Login/Login';
import LoginForm from './LoginForm';

const Login = () => {
    useEffect(() => {
    }, []);
    return (
        <LoginUI form={LoginForm()} />
    );
}
export default Login;
