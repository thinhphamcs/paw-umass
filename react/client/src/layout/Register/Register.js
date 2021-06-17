// Import
import React from 'react';
import { Link } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input/input';
import './Register.css';

// This will be the font end with props I can use to display data
function RegisterUI({ form: { variables, errors, loading, registerFormValid, onSubmit, onChange, phoneChange } }) {

    return (
        <div className="register-container">
            <h1 className="register-form-title">Create your account </h1>
            <form className="register-form-container">
                {errors.confirmPassword ? <div className="register-error">{errors.confirmPassword}</div> : [errors.email ? <div className="register-error">{errors.email}</div> : [errors.phone ? <div className="register-error">{errors.phone}</div> : [errors.create ? <div className="register-error">{errors.create}</div> : null]]]}
                <div className="register-form-group">
                    <input required className="register-input" type="text" id="firstName" name="firstName" placeholder="First Name" value={variables.firstName} onChange={onChange}></input>
                </div>
                <div className="register-form-group">
                    <input required className="register-input" type="text" id="lastName" name="lastName" placeholder="Last Name" value={variables.lastName} onChange={onChange}></input>
                </div>
                <div className="register-form-group">
                    <input required className="register-input" type="email" id="email" name="email" placeholder="Email" value={variables.email} onChange={onChange}></input>
                </div>
                <div className="register-form-group">
                    <input required className="register-input" type="password" id="password" name="password" placeholder="Password" value={variables.password} onChange={onChange}></input>
                </div>
                <div className="register-form-group">
                    <input required className="register-input" type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" value={variables.confirmPassword} onChange={onChange}></input>
                </div>
                <div className="register-form-group">
                    <PhoneInput
                        className="register-input"
                        id="phone"
                        name="phone"
                        country="US"
                        placeholder="123 456 7890"
                        value={variables.phone}
                        onChange={phoneChange} />
                </div>
                <button className="register-form-button" onClick={onSubmit} disabled={registerFormValid || loading} type="submit">{loading ? 'Loading...' : 'Register'}</button>
            </form>
            <div className="register-container-footer">
                Already have an account?
                <Link to="/login" className='register-list-items'>
                    Sign in
                </Link>
            </div>
        </div>
    );
}

export default RegisterUI;
