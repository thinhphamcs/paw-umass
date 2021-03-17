// Import
import React, { useEffect } from 'react';
import LoginUI from '../../layout/Login/Login';
import { LoginForm } from './LoginForm';

// Export this component with UI for cleaner and more organized way
const Login = () => {
    useEffect(() => {
    }, []);
    return (
        <LoginUI form={LoginForm()} />
    );
}
export default Login;
