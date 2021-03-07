// Import
import { useState, useContext, useEffect } from 'react';
import { profile } from '../../context/actions/auth/Profile.js';
import { GlobalContext } from '../../context/Provider';
import { useHistory } from 'react-router-dom';

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
    if (form.firstName.length ||
        form.lastName.length ||
        form.email.length ||
        form.phone.length) {
        profileFormValid = false;
    }
    else {
        profileFormValid = true;
    }

    // onSubmit function that will submit the form and the dispatch
    const onSubmit = () => {
        profile(form)(authDispatch);
    }

    /**
     * if (response.data.checkBox === true) {
            localStorage.setItem('auth', response.data.auth);
            localStorage.setItem('checkBox', response.data.checkBox);
            localStorage.setItem('token', response.data.token);
        }
        localStorage.setItem('token', response.data.token);
     */

    // Return this so we can use these as props on the UI (front end)
    return { form, error, loading, profileFormValid, onSubmit, onChange, };
}