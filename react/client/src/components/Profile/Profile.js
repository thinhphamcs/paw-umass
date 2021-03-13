// Import
import React, { useEffect } from 'react';
import ProfileUI from '../../layout/Profile/Profile';
import { ProfileForm } from './ProfileForm';
import { GetProfiles } from '../../context/actions/profiles/GetProfiles';

// Export this component with UI for cleaner and more organized way
function Profile() {
    useEffect(() => {
        document.body.style.backgroundColor = "white";
        GetProfiles();
    }, []);
    return (
        <ProfileUI form={ProfileForm()} />
    );
}
export default Profile;
