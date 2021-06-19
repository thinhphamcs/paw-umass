// Import
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import ForgotChangeUI from '../../layout/ForgotChange/ForgotChange';
import { ForgotChangeForm } from '../ForgotChange/ForgotChangeForm';
// Export this component with UI for cleaner and more organized way
function ForgotChange() {
    const history = useHistory();
    useEffect(() => {
        document.body.style.backgroundColor = "#6A150D";
        document.title = "Change Password";
    }, [history]);
    return (
        <ForgotChangeUI form={ForgotChangeForm()} />
    );
}
export default ForgotChange;
