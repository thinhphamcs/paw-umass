// Import
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import RegisterUI from '../../layout/Register/Register';
import { RegisterForm } from './RegisterForm';

// Export this component with UI for cleaner and more organized way
const Register = () => {
    const history = useHistory();
    useEffect(() => {
        document.body.style.backgroundColor = "#6A150D";
    }, [history]);
    return (
        <RegisterUI form={RegisterForm()} />
    );
}

export default Register;
