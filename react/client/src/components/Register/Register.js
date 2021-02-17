// Import
import React, { useEffect } from 'react';
import RegisterUI from '../../layout/Register/Register';
import RegisterForm from './RegisterForm';

const Register = () => {
    useEffect(() => {
    }, []);
    return (
        <RegisterUI form={RegisterForm()} />
    )
}

export default Register;
