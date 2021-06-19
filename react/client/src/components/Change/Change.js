// Import
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import ChangeUI from '../../layout/Change/Change';
import { ChangeForm } from '../Change/ChangeForm';
// Export this component with UI for cleaner and more organized way
function Change() {
    const history = useHistory();
    useEffect(() => {
        document.body.style.backgroundColor = "white";
        document.title = "Change Password";
    }, [history]);
    return (
        <ChangeUI form={ChangeForm()} />
    );
}
export default Change;
