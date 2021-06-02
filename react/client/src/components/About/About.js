// Import
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import AboutUI from '../../layout/About/About';

// Export it as a form so we can use it as props
const About = () => {
    const history = useHistory();
    useEffect(() => {
        document.body.style.backgroundColor = "#6A150D";
        document.title = "About";
    }, [history]);
    return (
        <AboutUI />
    );
}
export default About;