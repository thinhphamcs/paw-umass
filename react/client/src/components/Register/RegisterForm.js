// Import
import { useState, useContext, useEffect } from 'react';
import { register } from '../../context/actions/auth/Register';
import { GlobalContext } from '../../context/Provider';
import { useHistory } from 'react-router-dom';

export default () => {
    // Hook
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
        phone: '',
    });
    // use history from react-router-dom to redirect
    const history = useHistory();

    // Dispatch, need to understand this
    const { authDispatch, authState: { auth: { loading, error, data }, }, } = useContext(GlobalContext);

    // useEffect so we can use history to redirect
    useEffect(() => {
        if (data) {
            history.push('/login');
        }
        else {
            history.push('/register');
        }
    }, [data]);

    // onChange function
    const onChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    // Function to check if user have typed everything
    const registerFormValid =
        !form.firstName?.length ||
        !form.lastName?.length ||
        !form.email?.length ||
        !form.password?.length ||
        !form.passwordConfirm?.length ||
        !form.phone?.length;

    // onSubmit function that will submit the form and the dispatch
    const onSubmit = () => {
        register(form)(authDispatch);
    }

    // Return this so we can use these as props on the UI (front end)
    return { form, onChange, loading, registerFormValid, onSubmit };
}