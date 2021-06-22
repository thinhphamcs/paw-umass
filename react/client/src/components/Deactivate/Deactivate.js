// Import
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import DeactivateUI from '../../layout/Deactivate/Deactivate';
import { DeactivateForm } from '../Deactivate/DeactivateForm';
// Export this component with UI for cleaner and more organized way
function Deactivate() {
    const history = useHistory();
    useEffect(() => {
        document.body.style.backgroundColor = "white";
    }, [history]);
    return (
        <DeactivateUI form={DeactivateForm()} />
    );
}
export default Deactivate;
