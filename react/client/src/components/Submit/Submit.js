// Import
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import SubmitUI from '../../layout/Submit/Submit';
import { SubmitForm } from './SubmitForm';
// Export this component with UI for cleaner and more organized way
const Submit = () => {
    const history = useHistory();
    useEffect(() => {
        document.body.style.backgroundColor = "white";
    }, [history]);
    return (
        <SubmitUI form={SubmitForm()} />
    );
}
export default Submit;
