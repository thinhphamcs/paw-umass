// Import
import { useState, useContext, useEffect } from 'react';
import { register } from '../../context/actions/auth/Register';
import { GlobalContext } from '../../context/Provider';
import { useHistory } from 'react-router-dom';

// Export it as a form so we can use it as props
export function RegisterForm() {
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
            if (data.message) {
                history.push('/login');
                data.message = "";
            }
        }
        else {
            history.push('/register');
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

    // onChange function for child component Phone
    const phoneChange = (value) => {
        setForm({
            ...form,
            phone: value
        });
    }

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
    return { form, error, loading, registerFormValid, onSubmit, onChange, phoneChange };
}