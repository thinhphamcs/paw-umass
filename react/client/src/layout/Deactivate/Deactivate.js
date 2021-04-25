// Import
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import * as FaIcons from "react-icons/fa";
import './Deactivate.css';

// This will be the font end with props I can use to display data
function DeactivateUI({ form: { onChange, form, deactivateFormValid, onSubmit, loading, error } }) {
    return (
        <div className="deactivate-container">
            <FaIcons.FaAngleDoubleRight className="deactivate-right-arrow" />
            <div className="deactivate-container-header">
                <Link to="/home" >
                    <div className="deactivate-logo">
                        <img src={Logo} alt="Logo" />
                    </div>
                </Link>
            </div>
            <FaIcons.FaAngleDoubleLeft className="deactivate-left-arrow" />
            <h2 className="deactivate-form-title">Deactivate Your Account</h2>
            <form className="deactivate-form-container">
                {error ? <div className="deactivate-error">{error.message}</div> : null}
                <div className="deactivate-form-group">
                    <input className="deactivate-input"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter Your Password"
                        value={form.password}
                        onChange={onChange}></input>
                </div>
                <button className="deactivate-form-button" type="submit" onClick={onSubmit} disabled={deactivateFormValid || loading} loading={loading.toString()}>Deactivate</button>
            </form>
        </div>
    );
}

export default DeactivateUI;

