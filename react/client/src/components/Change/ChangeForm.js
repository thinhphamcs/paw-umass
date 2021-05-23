// Import
import { useState, useContext, useEffect } from 'react';
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

    }

    // Return this so we can use these as props on the UI (front end)
    return { form, error, loading, changeFormValid, onSubmit, onChange };
}