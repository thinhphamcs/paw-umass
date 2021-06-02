// Import
import React from 'react';
import { Link } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input/input';
import Logo from '../../assets/images/logo3.png';
import * as FaIcons from "react-icons/fa";
import './Forgot.css';

// This will be the font end with props I can use to display data
function ForgotUI({ form: { variables, loading, errors, forgotFormValid, onSubmit, onChange, phoneChange } }) {
    return (
        <div className="forgot-container">
            <FaIcons.FaAngleDoubleRight className="forgot-right-arrow" />
            <div className="forgot-container-header">
                <Link to="/login" >
                    <img src={Logo} alt="Logo" />
                </Link>
            </div>
            <FaIcons.FaAngleDoubleLeft className="forgot-left-arrow" />
            <h1 className="forgot-form-title">Find Your Account</h1>
            <form className="forgot-form-container">
                {errors.email ?
                    <div className="forgot-error">{errors.email}</div> : [errors.phone ? <div className="forgot-error">{errors.phone}</div> : null]}
                <div className="forgot-form-group">
                    <input className="forgot-input"
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email address"
                        value={variables.email}
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
                        value={variables.phone}
                        onChange={phoneChange} />
                </div>
                <button className="forgot-form-button" type="submit" onClick={onSubmit} disabled={forgotFormValid || loading} >{loading ? 'Loading...' : 'Search'}</button>
            </form>
        </div>
    );
}

export default ForgotUI;

