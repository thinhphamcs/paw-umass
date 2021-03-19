// Import
import React, { useEffect } from 'react';
import ForgotUI from '../../layout/Forgot/Forgot';
import { ForgotForm } from './ForgotForm';

// Export this component with UI for cleaner and more organized way
function Forgot() {
    useEffect(() => {
    }, []);
    return (
        <ForgotUI form={ForgotForm()} />
    );
}
export default Forgot;
