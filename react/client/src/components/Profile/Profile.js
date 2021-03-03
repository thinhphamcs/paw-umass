// Import
import React, { useEffect } from 'react';
import ProfileUI from '../../layout/Profile/Profile';
import ProfileForm from './ProfileForm';

const Profile = () => {
    return (
        <ProfileUI form={ProfileForm()} />
    );
}
export default Profile;
