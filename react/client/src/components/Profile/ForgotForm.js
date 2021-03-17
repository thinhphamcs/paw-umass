// Import
import { useState, useContext, useEffect } from 'react';
import { profile } from '../../context/actions/settings/Profile';
import { DeleteProfiles } from '../../context/actions/settings/DeleteProfiles';
import { GlobalContext } from '../../context/Provider';
import { useHistory } from 'react-router-dom';

// Export it as a form so we can use it as props
export function ForgotForm() {
    // Hook
    const [form, setForm] = useState({
        current: '',
        newPassword: '',
        confirmPassword: '',
    });

    // use history from react-router-dom to redirect
    const history = useHistory();

    // Use this for disabling the button
    let forgotFormValid = true;

    // Dispatch, need to understand this
    const { authDispatch, authState: { auth: { loading, error, data }, }, } = useContext(GlobalContext);

    // useEffect so we can use history to redirect
    useEffect(() => {
        if (data) {
            if (data.auth) {
                history.push('/settings/profile');
            }
        }
        else {
            history.push('/settings/forgot');
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
    if (form.current.length && form.newPassword.length && form.confirmPassword.length) {
        forgotFormValid = false;
    }
    // if user input nothing then we disabled the button
    else {
        forgotFormValid = true;
    }

    // onSubmit function that will submit the form and the dispatch
    const onSubmit = () => {
        profile(form)(authDispatch); // change
    }

    // Return this so we can use these as props on the UI (front end)
    return { form, error, loading, forgotFormValid, onSubmit, onChange };
}