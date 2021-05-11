// Import
import React, { useContext, useEffect } from 'react';
import ChangeUI from '../../layout/Change/Change';
import { ChangeForm } from '../Change/ChangeForm';
import { GetProfiles } from '../../context/actions/settings/GetProfiles';
import { useHistory } from 'react-router';
import { GlobalContext } from '../../context/Provider';

// Export this component with UI for cleaner and more organized way
function Change() {
    const history = useHistory();
    const { profileDispatch } = useContext(GlobalContext);
    useEffect(() => {
        document.body.style.backgroundColor = "white";
        GetProfiles(history)(profileDispatch);
    }, [history, profileDispatch]);
    return (
        <ChangeUI form={ChangeForm()} />
    );
}
export default Change;
