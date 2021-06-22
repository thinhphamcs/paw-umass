// Import
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import ForgotUI from '../../layout/Forgot/Forgot';
import { ForgotForm } from './ForgotForm';
// Export this component with UI for cleaner and more organized way
function Forgot() {
    const history = useHistory();
    useEffect(() => {
        document.body.style.backgroundColor = "#6A150D";
    }, [history]);
    return (
        <ForgotUI form={ForgotForm()} />
    );
}
export default Forgot;
