// Import
import React from 'react';
import './Register.css';

// This will be the font end with props I can use to display data
function RegisterUI({ form: { onChange, form, registerFormValid, onSubmit, loading, error } }) {

    return (
        <form>
            {error ? <div>{error.message}</div> : null}
            <label>First: </label>
            <input required type="text" id="firstName" name="firstName" value={form.firstName} onChange={onChange}></input>
            <br />
            <label>Last: </label>
            <input required type="text" id="lastName" name="lastName" value={form.lastName} onChange={onChange}></input>
            <br />
            <label>Email: </label>
            <input required type="email" id="email" name="email" value={form.email} onChange={onChange}></input>
            <br />
            <label>Password: </label>
            <input required type="password" id="password" name="password" value={form.password} onChange={onChange}></input>
            <br />
            <label>Confirm Password: </label>
            <input required type="password" id="passwordConfirm" name="passwordConfirm" value={form.passwordConfirm} onChange={onChange}></input>
            <br />
            <label>Phone: </label>
            <input required type="text" id="phone" name="phone" value={form.phone} onChange={onChange}></input>
            <br />
            <button onClick={onSubmit} disabled={registerFormValid || loading} loading={loading} type="submit">Register</button>
        </form >
    )
}

export default RegisterUI;
