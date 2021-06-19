// Import
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import CookiesUI from '../../layout/Cookies/Cookies';
// Export it as a form so we can use it as props
const Cookies = () => {
    const history = useHistory();
    useEffect(() => {
        document.body.style.backgroundColor = "#6A150D";
        document.title = "Cookies";
    }, [history]);
    return (
        <CookiesUI />
    );
}
export default Cookies;