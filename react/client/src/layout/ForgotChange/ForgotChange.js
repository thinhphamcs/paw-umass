// Import
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo3.png';
import * as FaIcons from "react-icons/fa";
import '../StyleSheets/Other.css';
// This will be the font end with props I can use to display data
function ForgotChangeUI({ form: { variables, errors, loading, forgotChangeFormValid, onSubmit, onChange, goHome } }) {
    return (
        <div className="other-container forgot-change-container">
            <FaIcons.FaAngleDoubleRight className="other-right-arrow forgot-change-right-arrow" />
            <div className="other-container-header forgot-change-container-header">
                <Link to="/login" onClick={goHome} >
                    <img src={Logo} alt="Logo" />
                </Link>
            </div>
            <FaIcons.FaAngleDoubleLeft className="other-left-arrow forgot-change-left-arrow" />
            <h1 className="other-form-title forgot-change-form-title">Your New Password</h1>
            <h3 className="reason">
                Due to security reasons, we will not send the password to you.<br /><br />Instead, we will ask you to renew your password.
            </h3>
            <form className="other-form-container forgot-change-form-container">
                <div className="forgot-change-form-group">
                    <input className="other-input forgot-change-input"
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        placeholder="New Password"
                        value={variables.newPassword}
                        onChange={onChange}></input>
                </div>
                {errors.message ? <div className="other-error forgot-change-error">{errors.message}</div> : null}
                <div className="forgot-change-form-group">
                    <input className="other-input forgot-change-input"
                        type="password"
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        placeholder="Confirm Password"
                        value={variables.confirmNewPassword}
                        onChange={onChange}></input>
                </div>
                <button className="other-form-button forgot-change-form-button" type="submit" onClick={onSubmit} disabled={forgotChangeFormValid || loading}>{loading ? 'Loading...' : 'Save'}</button>
            </form>
        </div>
    );
}
export default ForgotChangeUI;