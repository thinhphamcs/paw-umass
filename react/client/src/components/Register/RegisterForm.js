import { useState, useContext, useEffect } from 'react';
import { register } from '../../context/actions/Register';
import { GlobalContext } from '../../context/Provider';
import { useHistory } from 'react-router-dom';

export default () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
        phone: '',
    });

    const history = useHistory();

    const { authDispatch, authState: { auth: { loading, error, data }, }, } = useContext(GlobalContext);

    useEffect(() => {
        if (data) {
            history.push('/home');
        }
    }, [data]);

    const onChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const registerFormValid =
        !form.firstName?.length ||
        !form.lastName?.length ||
        !form.email?.length ||
        !form.password?.length ||
        !form.passwordConfirm?.length ||
        !form.phone?.length;

    const onSubmit = () => {
        register(form)(authDispatch);
    }

    return { form, onChange, loading, registerFormValid, onSubmit };
}