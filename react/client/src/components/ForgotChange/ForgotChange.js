// Import
import React, { useEffect } from 'react';
import ForgotChangeUI from '../../layout/ForgotChange/ForgotChange';
import { ForgotChangeForm } from '../ForgotChange/ForgotChangeForm';
import { GetProfiles } from '../../context/actions/settings/GetProfiles';

// Export this component with UI for cleaner and more organized way
function ForgotChange() {
    useEffect(() => {
        GetProfiles();
    }, []);
    return (
        <ForgotChangeUI form={ForgotChangeForm()} />
    );
}
export default ForgotChange;
