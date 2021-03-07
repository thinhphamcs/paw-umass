// Import
import React, { useEffect } from 'react';
import ProfileUI from '../../layout/Profile/Profile';
import { ProfileForm } from './ProfileForm';
import { GetProfiles } from '../../context/actions/profiles/GetProfiles';

const Profile = () => {
    useEffect(() => {
        document.body.style.backgroundColor = "white";
        GetProfiles();
    }, []);
    return (
        <ProfileUI form={ProfileForm()} />
    );
}
export default Profile;
