// Import
import React from 'react';
import Logo from '../../assets/images/logo3.png';
import './ForgotChange.css';

// This will be the font end with props I can use to display data
function ForgotChangeUI({ form: { onChange, form, forgotChangeFormValid, onSubmit, loading, error } }) {
    return (
        <div className="forgot-change-container">
            <div className="change-container-header">
                <img src={Logo} alt="Logo" />
            </div>
            <h1 className="forgot-change-form-title">Your New Password</h1>
            <h3 className="reason">
                Due to security reasons, we will not send the password to you.<br /><br />Instead, we will ask you to renew your password.
            </h3>
            <form className="forgot-change-form-container">
                <div className="forgot-change-form-group">
                    <input className="forgot-change-input"
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        placeholder="New Password"
                        value={form.newPassword}
                        onChange={onChange}></input>
                </div>
                {error ? <div className="forgot-change-error">{error.message}</div> : null}
                <div className="forgot-change-form-group">
                    <input className="forgot-change-input"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={form.confirmPassword}
                        onChange={onChange}></input>
                </div>
                <button className="forgot-change-form-button" type="submit" onClick={onSubmit} disabled={forgotChangeFormValid || loading} loading={loading.toString()}>Save</button>
            </form>
        </div>
    );
}

export default ForgotChangeUI;
