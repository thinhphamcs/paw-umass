// Import
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import * as AiIcons from "react-icons/ai";
import './Change.css';

// This will be the font end with props I can use to display data
function ChangeUI({ form: { onChange, form, changeFormValid, onSubmit, loading, error } }) {
    return (
        <div className="change-container">
            <AiIcons.AiOutlineArrowRight className="change-right-arrow" />
            <div className="change-container-header">
                <Link to="/home" >
                    <div className="change-logo">
                        <img src={Logo} alt="Logo" />
                    </div>
                </Link>
            </div>
            <AiIcons.AiOutlineArrowLeft className="change-left-arrow" />
            <h2 className="change-form-title">Change Your Password</h2>
            <form className="change-form-container">
                {error ? <div className="change-error">{error.message}</div> : null}
                <div className="change-form-group">
                    <input className="change-input"
                        type="password"
                        id="current"
                        name="current"
                        placeholder="Current Password"
                        value={form.current}
                        onChange={onChange}></input>
                </div>
                <div className="line"></div>
                <div className="change-form-group">
                    <input className="change-input"
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        placeholder="New Password"
                        value={form.newPassword}
                        onChange={onChange}></input>
                </div>
                <div className="change-form-group">
                    <input className="change-input"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={form.confirmPassword}
                        onChange={onChange}></input>
                </div>
                <button className="change-form-button" type="submit" onClick={onSubmit} disabled={changeFormValid || loading} loading={loading.toString()}>Change</button>
            </form>
        </div>
    );
}

export default ChangeUI;

