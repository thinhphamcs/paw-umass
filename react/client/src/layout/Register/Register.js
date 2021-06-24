// Import
import React from 'react';
import { Link } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input/input';
import '../StyleSheets/Other.css';
// This will be the font end with props I can use to display data
function RegisterUI({ form: { variables, errors, loading, registerFormValid, onSubmit, onChange, phoneChange } }) {
    return (
        <div className="other-container register-container">
            <h1 className="other-form-title">Create your account </h1>
            <form className="other-form-container register-form-container">
                {errors.message ? <div className="other-error register-error">{errors.message}</div> : null}
                <div className="register-form-group">
                    <input required className="other-input register-input" type="text" id="firstName" name="firstName" placeholder="First Name" value={variables.firstName} onChange={onChange}></input>
                </div>
                <div className="register-form-group">
                    <input required className="other-input register-input" type="text" id="lastName" name="lastName" placeholder="Last Name" value={variables.lastName} onChange={onChange}></input>
                </div>
                <div className="register-form-group">
                    <input required className="other-input register-input" type="email" id="email" name="email" placeholder="Email" value={variables.email} onChange={onChange}></input>
                </div>
                <div className="register-form-group">
                    <input required className="other-input register-input" type="password" id="password" name="password" placeholder="Password" value={variables.password} onChange={onChange}></input>
                </div>
                <div className="register-form-group">
                    <input required className="other-input register-input" type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" value={variables.confirmPassword} onChange={onChange}></input>
                </div>
                <div className="register-form-group">
                    <PhoneInput
                        className="other-input register-input"
                        id="phone"
                        name="phone"
                        country="US"
                        placeholder="123 456 7890"
                        value={variables.phone}
                        onChange={phoneChange} />
                </div>
                <button className="other-form-button" onClick={onSubmit} disabled={registerFormValid || loading} type="submit">{loading ? 'Loading...' : 'Register'}</button>
            </form>
            <div className="other-container-footer register-container-footer">
                Already have an account?
                <Link to="/login" className='other-list-items'>
                    Sign in
                </Link>
            </div>
        </div>
    );
}
export default RegisterUI;