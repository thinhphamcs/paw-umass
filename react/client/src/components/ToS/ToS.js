// Import
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import ToSUI from '../../layout/ToS/ToS';
// Export it as a form so we can use it as props
const ToS = () => {
    const history = useHistory();
    useEffect(() => {
        document.body.style.backgroundColor = "#6A150D";
    }, [history]);
    return (
        <ToSUI />
    );
}
export default ToS;