// Import
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import PrivacyUI from '../../layout/Privacy/Privacy';
// Export it as a form so we can use it as props
const Privacy = () => {
    const history = useHistory();
    useEffect(() => {
        document.body.style.backgroundColor = "#6A150D";
        document.title = "Privacy";
    }, [history]);
    return (
        <PrivacyUI />
    );
}
export default Privacy;