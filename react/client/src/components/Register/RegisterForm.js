import { useState } from 'react';

export default () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
        phone: '',
    });

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

    return { form, onChange, registerFormValid };
}