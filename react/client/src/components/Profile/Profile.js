// Import
import React, { useContext, useEffect } from 'react';
import ProfileUI from '../../layout/Profile/Profile';
import { ProfileForm } from './ProfileForm';
import { GetProfiles } from '../../context/actions/settings/GetProfiles';
import { GlobalContext } from '../../context/Provider';
import { useHistory } from 'react-router';

// Export this component with UI for cleaner and more organized way
function Profile() {
    const history = useHistory();
    const { profileDispatch } = useContext(GlobalContext);
    useEffect(() => {
        document.body.style.backgroundColor = "white";
        GetProfiles(history)(profileDispatch);
    }, [history, profileDispatch]);
    return (
        <ProfileUI form={ProfileForm()} />
    );
}
export default Profile;
