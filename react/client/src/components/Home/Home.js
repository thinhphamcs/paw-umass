// Import
import React, { useContext, useEffect } from 'react';
import HomeUI from '../../layout/Home/Home';
import { HomeForm } from '../Home/HomeForm';
import { GetProfiles } from '../../context/actions/settings/GetProfiles';
import { GetAssets } from '../../context/actions/settings/GetAssets';
import { useHistory } from 'react-router';
import { GlobalContext } from '../../context/Provider';

// Export it as a form so we can use it as props
const Home = () => {
    const history = useHistory();
    const { profileDispatch, assetDispatch } = useContext(GlobalContext);
    useEffect(() => {
        document.body.style.backgroundColor = "white";
        GetProfiles(history)(profileDispatch);
        GetAssets(history)(assetDispatch);
    }, [history, profileDispatch, assetDispatch]);
    return (
        <HomeUI form={HomeForm()} />
    );
}
export default Home;


