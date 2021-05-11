// Import
import React, { useContext, useEffect } from 'react';
import ForgotChangeUI from '../../layout/ForgotChange/ForgotChange';
import { ForgotChangeForm } from '../ForgotChange/ForgotChangeForm';
import { GetProfiles } from '../../context/actions/settings/GetProfiles';
import { useHistory } from 'react-router';
import { GlobalContext } from '../../context/Provider';

// Export this component with UI for cleaner and more organized way
function ForgotChange() {
    const history = useHistory();
    const { profileDispatch } = useContext(GlobalContext);
    useEffect(() => {
        document.body.style.backgroundColor = "#6A150D";
        GetProfiles(history)(profileDispatch);
    }, [history, profileDispatch]);
    return (
        <ForgotChangeUI form={ForgotChangeForm()} />
    );
}
export default ForgotChange;
