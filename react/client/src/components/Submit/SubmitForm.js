// Import
import { useState, useContext, useEffect } from 'react';
import { submit } from '../../context/actions/user/Submit';
import { GlobalContext } from '../../context/Provider';
import { useHistory } from 'react-router-dom';

// Export it as a form so we can use it as props
export function SubmitForm() {
    // Hook
    const [form, setForm] = useState({
        petName: '',
        age: '',
        photo: '',
        description: '',
        countdown: '',
        radio: ''
    });

    // use history from react-router-dom to redirect
    const history = useHistory();

    // Use this for disabling the button
    let submitFormValid = true;

    // Dispatch, need to understand this
    const { authDispatch, authState: { auth: { loading, error, data }, }, } = useContext(GlobalContext);

    // useEffect so we can use history to redirect
    useEffect(() => {
        if (data) {
            // if (data.message) {
            history.push('/home');
            // }
        }
        else {
            history.push('/user/submit');
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

    // Function to check if user have typed everything
    if (form.petName.length && form.age.length && form.description.length && form.photo.length &&
        (form.radio === "day" || form.radio === "week" || form.radio === "forever")) {
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
        submit(form)(authDispatch);
    }

    // Return this so we can use these as props on the UI (front end)
    return { form, error, loading, submitFormValid, onSubmit, onChange, limitText };
}