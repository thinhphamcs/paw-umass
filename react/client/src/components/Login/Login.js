// Import
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import LoginUI from '../../layout/Login/Login';
import { LoginForm } from './LoginForm';
// Export this component with UI for cleaner and more organized way
const Login = () => {
    const history = useHistory();
    useEffect(() => {
        document.body.style.backgroundColor = "#6A150D";
        document.title = "Login";
    }, [history]);
    return (
        <LoginUI form={LoginForm()} />
    );
}
export default Login;
