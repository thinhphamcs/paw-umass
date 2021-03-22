// Import
import { useState, useContext, useEffect } from 'react';
import { change } from '../../context/actions/settings/Change';
import { GlobalContext } from '../../context/Provider';
import { useHistory } from 'react-router-dom';

// Export it as a form so we can use it as props
export function ChangeForm() {
    // Hook
    const [form, setForm] = useState({
        current: '',
        newPassword: '',
        confirmPassword: '',
    });

    // use history from react-router-dom to redirect
    const history = useHistory();

    // Use this for disabling the button
    let changeFormValid = true;

    // Dispatch, need to understand this
    const { authDispatch, authState: { auth: { loading, error, data }, }, } = useContext(GlobalContext);

    // useEffect so we can use history to redirect
    useEffect(() => {
        if (data) {
            if (data.profile) {
                history.push('/settings/profile');
            }
        }
        else {
            history.push('/settings/change');
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
        changeFormValid = false;
    }
    // if user input nothing then we disabled the button
    else {
        changeFormValid = true;
    }

    // onSubmit function that will submit the form and the dispatch
    const onSubmit = () => {
        change(form)(authDispatch); // change
    }

    // Return this so we can use these as props on the UI (front end)
    return { form, error, loading, changeFormValid, onSubmit, onChange };
}