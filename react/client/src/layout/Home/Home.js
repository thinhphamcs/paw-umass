import React from 'react';
// import React, { useContext, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import GetProfiles from '../../context/actions/profiles/GetProfiles';
// import { GlobalContext } from '../../context/Provider';
import './Home.css';
import Nav from '../../../src/components/Nav/Nav';


function HomeUI() {
    // const context = useContext(GlobalContext);

    // const history = useHistory();

    // useEffect(() => {
    //     GetProfiles(history);
    // }, []);

    return (
        <>
            <Nav />
        </>
    );
}

export default HomeUI;

