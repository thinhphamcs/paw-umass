// Import
import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

// This will be the font end with props I can use to display data
function RegisterUI({ form: { onChange, form, registerFormValid, onSubmit, loading, error } }) {

    return (
        <div className="register-container">
            <h1 className="register-form-title">Create your account </h1>
            <form className="register-form-container">
                {error ? <div className="register-error">{error.message}</div> : null}
                <div className="register-form-group">
                    <input required className="register-input" type="text" id="firstName" name="firstName" placeholder="First Name" value={form.firstName} onChange={onChange}></input>
                </div>
                <div className="register-form-group">
                    <input required className="register-input" type="text" id="lastName" name="lastName" placeholder="Last Name" value={form.lastName} onChange={onChange}></input>
                </div>
                <div className="register-form-group">
                    <input required className="register-input" type="email" id="email" name="email" placeholder="Email" value={form.email} onChange={onChange}></input>
                </div>
                <div className="register-form-group">
                    <input required className="register-input" type="password" id="password" name="password" placeholder="Password" value={form.password} onChange={onChange}></input>
                </div>
                <div className="register-form-group">
                    <input required className="register-input" type="password" id="passwordConfirm" name="passwordConfirm" placeholder="Password Confirm" value={form.passwordConfirm} onChange={onChange}></input>
                </div>
                <div className="register-form-group">
                    <input required className="register-input" type="text" id="phone" name="phone" placeholder="Phone" value={form.phone} onChange={onChange}></input>
                </div>
                <button className="register-form-button" onClick={onSubmit} disabled={registerFormValid || loading} loading={loading} type="submit">Register</button>
            </form>
            <div className="register-container-footer">
                Already have an account?
                <Link to="/login" className='register-list-items' >
                    Sign in
                </Link>
            </div>
        </div>
    )
}

export default RegisterUI;
