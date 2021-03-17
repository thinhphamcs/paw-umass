// Import
import React, { useEffect } from 'react';
import ChangeUI from '../../layout/Change/Change';
import { ChangeForm } from '../Change/ChangeForm';
import { GetProfiles } from '../../context/actions/settings/GetProfiles';

// Export this component with UI for cleaner and more organized way
function Change() {
    useEffect(() => {
        document.body.style.backgroundColor = "white";
        GetProfiles();
    }, []);
    return (
        <ChangeUI form={ChangeForm()} />
    );
}
export default Change;
