// Import
import React from 'react';
import Logo from '../../assets/images/logo3.png';
import './Forgot.css';

// This will be the font end with props I can use to display data
function ForgotUI({ form: { onChange, form, forgotFormValid, onSubmit, loading, error } }) {
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
                        id="input"
                        name="input"
                        placeholder="Enter Email or Phone"
                        value={form.input}
                        onChange={onChange}></input>
                </div>
                <button className="forgot-form-button" type="submit" onClick={onSubmit} disabled={forgotFormValid || loading} loading={loading.toString()}>Search</button>
            </form>
        </div>
    );
}

export default ForgotUI;

