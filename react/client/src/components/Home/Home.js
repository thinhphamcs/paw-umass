import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import GetProfiles from '../../context/actions/profiles/GetProfiles';
import { GlobalContext } from '../../context/Provider';
import './Home.css';


function Home() {
    const context = useContext(GlobalContext);

    const history = useHistory();

    useEffect(() => {
        GetProfiles(history);
    }, []);

    return (
        <div className="container">
            <h1 className="title">All users</h1>
            <ul className="users">
                <li><b>Name:</b> Thinh / <b>Email:</b> thinh@gmail.com</li>
                <li><b>Name:</b> Thinh / <b>Email:</b> thinh@gmail.com</li>
            </ul>
        </div>
    );
}

export default Home;

