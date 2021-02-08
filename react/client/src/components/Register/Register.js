// Import
import React, { useEffect } from 'react';
import './Register.css';
import { register } from '../../context/actions/Register';
import RegisterUI from '../../layout/Register';
import RegisterForm from './RegisterForm';

const Register = () => {

    // React useEffect
    useEffect(() => {
        register();
    }, []);
    return (
        <RegisterUI form={RegisterForm()} />
    )
}

export default Register;
