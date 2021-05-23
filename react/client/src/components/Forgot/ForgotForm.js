// Import
import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Export it as a form so we can use it as props
export function ForgotForm() {
    // Hook
    const [form, setForm] = useState({
        email: '',
        phone: ''
    });

    // use history from react-router-dom to redirect
    const history = useHistory();

    // Use this for disabling the button
    let forgotFormValid = true;

    // onChange function
    const onChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    // onChange function for child component Phone
    const phoneChange = (value) => {
        setForm({
            ...form,
            phone: value
        });
    }

    // Function to check if user have typed something
    // if user input the first/last/email/phone field then we open the button
    if (form.email.length && !form.phone) {
        forgotFormValid = false;
    }
    else if (!form.email.length && form.phone) {
        forgotFormValid = false;
    }
    // if user input nothing then we disabled the button
    else {
        forgotFormValid = true;
    }

    // onSubmit function that will submit the form and the dispatch
    const onSubmit = () => {

    }

    // Return this so we can use these as props on the UI (front end)
    return { form, forgotFormValid, onSubmit, onChange, phoneChange };
}