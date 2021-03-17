// Import
import { useState, useContext, useEffect } from 'react';
import { login } from '../../context/actions/auth/Login';
import { GlobalContext } from '../../context/Provider';
import { useHistory } from 'react-router-dom';

// Export it as a form so we can use it as props
export function LoginForm() {
    // Hook
    const [form, setForm] = useState({
        email: '',
        password: '',
        checkBox: '',
    });

    // use history from react-router-dom to redirect
    const history = useHistory();

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
            history.push('/login');
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
            [event.target.name]: event.target.value,
            checkBox: event.target.checked
        });
    };

    // Function to check if user have typed everything
    const loginFormValid =
        !form.email?.length ||
        !form.password?.length

    // onSubmit function that will submit the form and the dispatch
    const onSubmit = () => {
        login(form)(authDispatch);
    }

    // Return this so we can use these as props on the UI (front end)
    return { form, loading, loginFormValid, error, onChange, onSubmit };
}