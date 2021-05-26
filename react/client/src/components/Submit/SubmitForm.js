// Import
import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Export it as a form so we can use it as props
export function SubmitForm() {
    // Hook
    const [form, setForm] = useState({
        petName: '',
        breed: '',
        photo: '',
        description: '',
        countdown: '',
        radio: ''
    });

    // use history from react-router-dom to redirect
    const history = useHistory();

    // Use this for disabling the button
    let submitFormValid = true;

    // onChange function
    const onChange = (event) => {
        const target = event.target;
        const value = target.type === 'file' ? target.files[0] : target.value;
        setForm({
            ...form,
            [event.target.name]: value
        });
    };

    // Function to check if user have typed everything
    if (form.petName.length && form.breed.length && form.description.length && form.photo &&
        (form.radio === "for a day" || form.radio === "for a week" || form.radio === "up for adoption")) {
        submitFormValid = false;
    }
    // if user input nothing then we disabled the button
    else {
        submitFormValid = true;
    }

    // Function to check for 100 characters in textarea
    const limitText = (limitField, limitNum) => {
        if (limitField.length > limitNum) {
            limitField = limitField.value.substring(0, limitNum);
        } else {
            form.countdown = limitNum - limitField.length;
        }
    }

    // onSubmit function that will submit the form and the dispatch
    const onSubmit = () => {

    }

    // Return this so we can use these as props on the UI (front end)
    return { form, submitFormValid, onSubmit, onChange, limitText };
}