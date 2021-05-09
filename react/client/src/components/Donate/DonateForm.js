// Import
import { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/Provider';
import { useHistory } from 'react-router-dom';

// Export it as a form so we can use it as props
export function DonateForm() {
    // Hook
    const [form, setForm] = useState({
        nameOnCard: '',
        radio: ''
    });

    // use history from react-router-dom to redirect
    const history = useHistory();

    // Use this for disabling the button
    let donateFormValid = true;

    // Dispatch, need to understand this
    const { authDispatch, authState: { auth: { loading, error, data }, }, } = useContext(GlobalContext);

    // useEffect so we can use history to redirect
    useEffect(() => {
        if (data) {
            if (data.success) {
                history.push('/user/donate');
            }
        }
        else {
            history.push('/user/donate');
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
    if (form.nameOnCard.length &&
        (form.radio === "100" || form.radio === "500" || form.radio === "1000" ||
            form.radio === "2000" || form.radio === "5000" || form.radio === "10000")) {
        donateFormValid = false;
    }
    // if user input nothing then we disabled the button
    else {
        donateFormValid = true;
    }

    // Return this so we can use these as props on the UI (front end)
    return { form, donateFormValid, loading, onChange };
}