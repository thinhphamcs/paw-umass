// Import
import { useState, useContext, useEffect } from 'react';
import { forgotChange } from '../../context/actions/auth/ForgotChange';
import { GlobalContext } from '../../context/Provider';
import { useHistory } from 'react-router-dom';

// Export it as a form so we can use it as props
export function ForgotChangeForm() {
    // Hook
    const [form, setForm] = useState({
        newPassword: '',
        confirmPassword: '',
    });

    // use history from react-router-dom to redirect
    const history = useHistory();

    // Use this for disabling the button
    let forgotChangeFormValid = true;

    // Dispatch, need to understand this
    const { authDispatch, authState: { auth: { loading, error, data }, }, } = useContext(GlobalContext);

    // useEffect so we can use history to redirect
    useEffect(() => {
        if (data) {
            if (data.auth === false) {
                history.push('/login');
                sessionStorage.clear(); // clear the token for better security
            }
        }
        else {
            history.push('/change');
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
    if (form.newPassword.length && form.confirmPassword.length) {
        forgotChangeFormValid = false;
    }
    // if user input nothing then we disabled the button
    else {
        forgotChangeFormValid = true;
    }

    // onSubmit function that will submit the form and the dispatch
    const onSubmit = () => {
        forgotChange(form)(authDispatch); // change
    }

    // Return this so we can use these as props on the UI (front end)
    return { form, error, loading, forgotChangeFormValid, onSubmit, onChange };
}