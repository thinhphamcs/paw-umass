// Import
import React, { useEffect } from 'react';
import DeactivateUI from '../../layout/Deactivate/Deactivate';
import { DeactivateForm } from '../Deactivate/DeactivateForm';
import { GetProfiles } from '../../context/actions/settings/GetProfiles';

// Export this component with UI for cleaner and more organized way
function Deactivate() {
    useEffect(() => {
        document.body.style.backgroundColor = "white";
        GetProfiles();
    }, []);
    return (
        <DeactivateUI form={DeactivateForm()} />
    );
}
export default Deactivate;
