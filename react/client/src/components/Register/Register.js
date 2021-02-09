// Import
import React, { useEffect } from 'react';
import '../../layout/Register/Register.css';
import RegisterUI from '../../layout/Register/Register';
import RegisterForm from './RegisterForm';

const Register = () => {

    // React useEffect, I'm not sure if I need this now...
    useEffect(() => {
    }, []);
    return (
        <RegisterUI form={RegisterForm()} />
    )
}

export default Register;
