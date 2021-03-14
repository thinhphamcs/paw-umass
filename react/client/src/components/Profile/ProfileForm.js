// Import
import { useState, useContext, useEffect } from 'react';
import { profile } from '../../context/actions/auth/Profile.js';
import { DeleteProfiles } from '../../context/actions/profiles/DeleteProfiles';
import { GlobalContext } from '../../context/Provider';
import { useHistory } from 'react-router-dom';

// Export it as a form so we can use it as props
export function ProfileForm() {
    // Hook
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });

    // use history from react-router-dom to redirect
    const history = useHistory();

    // Use this for disabling the button
    let profileFormValid = true;

    // Dispatch, need to understand this
    const { authDispatch, authState: { auth: { loading, error, data }, }, } = useContext(GlobalContext);

    // useEffect so we can use history to redirect
    useEffect(() => {
        if (data) {
            if (data.auth) {
                history.push('/profile');
            }
        }
        else {
            history.push('/profile');
        }
    }, [data, history]);

    // useEffect(() => {
    //     if (error) {
    //         console.log(error);
    //     }
    // }, [error]);

    // onChange function
    const onChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    // Function to check if user have typed something
    // if user input the first/last/email/phone field then we open the button
    if (form.firstName.length || form.lastName.length || form.email.length || form.phone.length) {
        // If user input the first name and another other we disabled the button
        if (form.firstName.length && (form.lastName.length || form.email.length || form.phone.length)) {
            // If user input everything then we open the button again
            if (form.firstName.length && form.lastName.length && form.email.length && form.phone.length) {
                profileFormValid = false;
            }
            else {
                profileFormValid = true;
            }
        }
        // If user input the last name and another other we disabled the button
        else if (form.lastName.length && (form.firstName.length || form.email.length || form.phone.length)) {
            // If user input everything then we open the button again
            if (form.firstName.length && form.lastName.length && form.email.length && form.phone.length) {
                profileFormValid = false;
            }
            else {
                profileFormValid = true;
            }
        }
        // If user input the email field and another other we disabled the button
        else if (form.email.length && (form.firstName.length || form.lastName.length || form.phone.length)) {
            // If user input everything then we open the button again
            if (form.firstName.length && form.lastName.length && form.email.length && form.phone.length) {
                profileFormValid = false;
            }
            else {
                profileFormValid = true;
            }
        }
        // If user input the phone field and another other we disabled the button
        else if (form.phone.length && (form.firstName.length || form.lastName.length || form.email.length)) {
            // If user input everything then we open the button again
            if (form.firstName.length && form.lastName.length && form.email.length && form.phone.length) {
                profileFormValid = false;
            }
            else {
                profileFormValid = true;
            }
        }
        else {
            profileFormValid = false;
        }

    }
    // if user input nothing then we disabled the button
    else {
        profileFormValid = true;
    }

    // onSubmit function that will submit the form and the dispatch
    const onSubmit = () => {
        profile(form)(authDispatch);
    }

    // Delete profile function
    const deleteProfile = () => {
        DeleteProfiles();
    }
    // Return this so we can use these as props on the UI (front end)
    return { form, error, loading, profileFormValid, onSubmit, onChange, deleteProfile };
}