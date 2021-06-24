// Import
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import * as FaIcons from "react-icons/fa";
import '../StyleSheets/CDP.css';
// This will be the font end with props I can use to display data
function ChangeUI({ form: { variables, loading, errors, changeFormValid, onSubmit, onChange } }) {
    return (
        <div className="cdp-container">
            <FaIcons.FaAngleDoubleRight className="cdp-right-arrow change-right" />
            <div className="cdp-container-header change-header">
                <Link to="/home" >
                    <div className="cdp-logo">
                        <img src={Logo} alt="Logo" />
                    </div>
                </Link>
            </div>
            <FaIcons.FaAngleDoubleLeft className="cdp-left-arrow change-left" />
            <h2 className="cdp-form-title">Change Your Password</h2>
            <form className="cdp-form-container">
                {errors.message ? <div className="cdp-error">{errors.message}</div> : null}
                <div className="cdp-form-group">
                    <input className="cdp-input change-input"
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        placeholder="Current Password"
                        value={variables.currentPassword}
                        onChange={onChange}></input>
                </div>
                <div className="change-line"></div>
                <div className="cdp-form-group">
                    <input className="cdp-input change-input"
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        placeholder="New Password"
                        value={variables.newPassword}
                        onChange={onChange}></input>
                </div>
                <div className="cdp-form-group">
                    <input className="cdp-input change-input"
                        type="password"
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        placeholder="Confirm Password"
                        value={variables.confirmNewPassword}
                        onChange={onChange}></input>
                </div>
                <button className="cdp-form-button" type="submit" onClick={onSubmit} disabled={changeFormValid || loading}>{loading ? 'Loading...' : 'Change'}</button>
            </form>
        </div>
    );
}
export default ChangeUI;