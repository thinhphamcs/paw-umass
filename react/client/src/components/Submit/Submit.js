// Import
import React, { useContext, useEffect } from 'react';
import SubmitUI from '../../layout/Submit/Submit';
import { SubmitForm } from './SubmitForm';
import { GetProfiles } from '../../context/actions/settings/GetProfiles';
import { useHistory } from 'react-router';
import { GlobalContext } from '../../context/Provider';

// Export this component with UI for cleaner and more organized way
const Submit = () => {
    const history = useHistory();
    const { profileDispatch } = useContext(GlobalContext);
    useEffect(() => {
        document.body.style.backgroundColor = "white";
        GetProfiles(history)(profileDispatch);
    }, [history, profileDispatch]);
    return (
        <SubmitUI form={SubmitForm()} />
    );
}

export default Submit;
