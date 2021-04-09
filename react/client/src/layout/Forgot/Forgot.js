// Import
import React from 'react';
import Logo from '../../assets/images/logo3.png';
import PhoneInput from 'react-phone-number-input/input';
import './Forgot.css';

// This will be the font end with props I can use to display data
function ForgotUI({ form: { onChange, form, forgotFormValid, onSubmit, loading, error, phoneChange } }) {
    return (
        <div className="forgot-container">
            <div className="forgot-container-header">
                <img src={Logo} alt="Logo" />
            </div>
            <h1 className="forgot-form-title">Find Your Account</h1>
            <form className="forgot-form-container">
                {error ? <div className="forgot-error">{error.message}</div> : null}
                <div className="forgot-form-group">
                    <input className="forgot-input"
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email address"
                        value={form.email}
                        onChange={onChange}></input>
                </div>
                <div className="forgot-line"></div>
                <div className="forgot-form-group">
                    <PhoneInput
                        className="forgot-input"
                        id="phone"
                        name="phone"
                        country="US"
                        placeholder="123 456 7890"
                        value={form.phone}
                        onChange={phoneChange} />
                </div>
                <button className="forgot-form-button" type="submit" onClick={onSubmit} disabled={forgotFormValid || loading} loading={loading.toString()}>Search</button>
            </form>
        </div>
    );
}

export default ForgotUI;
