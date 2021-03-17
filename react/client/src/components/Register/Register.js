// Import
import React, { useEffect } from 'react';
import RegisterUI from '../../layout/Register/Register';
import { RegisterForm } from './RegisterForm';

// Export this component with UI for cleaner and more organized way
const Register = () => {
    useEffect(() => {
    }, []);
    return (
        <RegisterUI form={RegisterForm()} />
    );
}

export default Register;
