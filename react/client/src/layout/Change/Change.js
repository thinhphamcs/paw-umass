// Import
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import * as FaIcons from "react-icons/fa";
import './Change.css';
// This will be the font end with props I can use to display data
function ChangeUI({ form: { variables, loading, errors, changeFormValid, onSubmit, onChange } }) {
    return (
        <div className="change-container">
            <FaIcons.FaAngleDoubleRight className="change-right-arrow" />
            <div className="change-container-header">
                <Link to="/home" >
                    <div className="change-logo">
                        <img src={Logo} alt="Logo" />
                    </div>
                </Link>
            </div>
            <FaIcons.FaAngleDoubleLeft className="change-left-arrow" />
            <h2 className="change-form-title">Change Your Password</h2>
            <form className="change-form-container">
                {errors.message ? <div className="change-error">{errors.message}</div> : null}
                <div className="change-form-group">
                    <input className="change-input"
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        placeholder="Current Password"
                        value={variables.currentPassword}
                        onChange={onChange}></input>
                </div>
                <div className="change-line"></div>
                <div className="change-form-group">
                    <input className="change-input"
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        placeholder="New Password"
                        value={variables.newPassword}
                        onChange={onChange}></input>
                </div>
                <div className="change-form-group">
                    <input className="change-input"
                        type="password"
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        placeholder="Confirm Password"
                        value={variables.confirmNewPassword}
                        onChange={onChange}></input>
                </div>
                <button className="change-form-button" type="submit" onClick={onSubmit} disabled={changeFormValid || loading}>{loading ? 'Loading...' : 'Change'}</button>
            </form>
        </div>
    );
}
export default ChangeUI;