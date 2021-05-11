// Import
import React, { useContext, useEffect } from 'react';
import DeactivateUI from '../../layout/Deactivate/Deactivate';
import { DeactivateForm } from '../Deactivate/DeactivateForm';
import { GetProfiles } from '../../context/actions/settings/GetProfiles';
import { useHistory } from 'react-router';
import { GlobalContext } from '../../context/Provider';

// Export this component with UI for cleaner and more organized way
function Deactivate() {
    const history = useHistory();
    const { profileDispatch } = useContext(GlobalContext);
    useEffect(() => {
        document.body.style.backgroundColor = "white";
        GetProfiles(history)(profileDispatch);
    }, [history, profileDispatch]);
    return (
        <DeactivateUI form={DeactivateForm()} />
    );
}
export default Deactivate;
