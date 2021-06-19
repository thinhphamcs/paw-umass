// Import
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import ChooseUI from '../../layout/Choose/Choose';
// Export it as a form so we can use it as props
const Choose = () => {
    const history = useHistory();
    useEffect(() => {
        document.body.style.backgroundColor = "#6A150D";
        document.title = "PawUMass";
    }, [history]);
    return (
        <ChooseUI />
    );
}
export default Choose;