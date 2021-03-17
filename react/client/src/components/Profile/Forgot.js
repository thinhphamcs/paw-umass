// Import
import React, { useEffect } from 'react';
import ForgotUI from '../../layout/Profile/Profile';
import { ForgotForm } from './ProfileForm';
import { GetProfiles } from '../../context/actions/settings/GetProfiles';

// Export this component with UI for cleaner and more organized way
function Forgot() {
    useEffect(() => {
        document.body.style.backgroundColor = "white";
        GetProfiles();
    }, []);
    return (
        <ForgotUI form={ForgotForm()} />
    );
}
export default Forgot;
