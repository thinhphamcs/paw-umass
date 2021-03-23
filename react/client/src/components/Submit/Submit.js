// Import
import React, { useEffect } from 'react';
import SubmitUI from '../../layout/Submit/Submit';
import { SubmitForm } from './SubmitForm';
import { GetProfiles } from '../../context/actions/settings/GetProfiles';

// Export this component with UI for cleaner and more organized way
const Submit = () => {
    useEffect(() => {
        document.body.style.backgroundColor = "white";
        GetProfiles();
    }, []);
    return (
        <SubmitUI form={SubmitForm()} />
    );
}

export default Submit;
