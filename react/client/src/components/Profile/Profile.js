// Import
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import ProfileUI from '../../layout/Profile/Profile';
import { ProfileForm } from './ProfileForm';
// Export this component with UI for cleaner and more organized way
function Profile() {
    const history = useHistory();
    useEffect(() => {
        document.body.style.backgroundColor = "white";
    }, [history]);
    return (
        <ProfileUI form={ProfileForm()} />
    );
}
export default Profile;
