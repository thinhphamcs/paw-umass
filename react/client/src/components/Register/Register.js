// Import
import React, { useEffect } from 'react';
import './Register.css';
import RegisterUI from '../../layout/Register';
import RegisterForm from './RegisterForm';

const Register = () => {

    // React useEffect
    useEffect(() => {
    }, []);
    return (
        <RegisterUI form={RegisterForm()} />
    )
}

export default Register;
