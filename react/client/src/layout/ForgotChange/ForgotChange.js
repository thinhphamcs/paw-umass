// Import
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo3.png';
import * as FaIcons from "react-icons/fa";
import './ForgotChange.css';

// This will be the font end with props I can use to display data
function ForgotChangeUI({ form: { variables, errors, loading, forgotChangeFormValid, onSubmit, onChange, goHome } }) {
    return (
        <div className="forgot-change-container">
            <FaIcons.FaAngleDoubleRight className="forgot-change-right-arrow" />
            <div className="forgot-change-container-header">
                {/*  */}
                <Link to="/login" onClick={goHome} >
                    <img src={Logo} alt="Logo" />
                </Link>
            </div>
            <FaIcons.FaAngleDoubleLeft className="forgot-change-left-arrow" />
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
                        value={variables.newPassword}
                        onChange={onChange}></input>
                </div>
                {errors.password ? <div className="forgot-change-error">{errors.password}</div> : [errors.update ? <div className="forgot-change-error">{errors.update}</div> : null]}
                <div className="forgot-change-form-group">
                    <input className="forgot-change-input"
                        type="password"
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        placeholder="Confirm Password"
                        value={variables.confirmNewPassword}
                        onChange={onChange}></input>
                </div>
                <button className="forgot-change-form-button" type="submit" onClick={onSubmit} disabled={forgotChangeFormValid || loading}>{loading ? 'Loading...' : 'Save'}</button>
            </form>
        </div>
    );
}

export default ForgotChangeUI;

