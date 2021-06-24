// Import
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import * as FaIcons from "react-icons/fa";
import '../StyleSheets/CDP.css';
// This will be the font end with props I can use to display data
function DeactivateUI({ form: { variables, loading, errors, deactivateFormValid, onSubmit, onChange } }) {
    return (
        <div className="cdp-container">
            <FaIcons.FaAngleDoubleRight className="cdp-right-arrow deactivate-right" />
            <div className="cdp-container-header deactivate-header">
                <Link to="/home" >
                    <div className="cdp-logo">
                        <img src={Logo} alt="Logo" />
                    </div>
                </Link>
            </div>
            <FaIcons.FaAngleDoubleLeft className="cdp-left-arrow deactivate-left" />
            <h2 className="cdp-form-title">Deactivate Your Account</h2>
            <form className="cdp-form-container">
                {errors.message ? <div className="cdp-error">{errors.message}</div> : null}
                <div className="cdp-form-group">
                    <input className="cdp-input"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter Your Password"
                        value={variables.password}
                        onChange={onChange}></input>
                </div>
                <button className="cdp-form-button" type="submit" onClick={onSubmit} disabled={deactivateFormValid || loading}>{loading ? 'Loading...' : 'Deactivate'}</button>
            </form>
        </div>
    );
}
export default DeactivateUI;