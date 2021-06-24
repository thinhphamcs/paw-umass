// Import
import React from 'react';
import { Link } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input/input';
import Logo from '../../assets/images/logo3.png';
import * as FaIcons from "react-icons/fa";
import '../StyleSheets/Other.css';
// This will be the font end with props I can use to display data
function ForgotUI({ form: { variables, loading, errors, forgotFormValid, onSubmit, onChange, phoneChange } }) {
    return (
        <div className="other-container forgot-container">
            <FaIcons.FaAngleDoubleRight className="other-right-arrow forgot-right-arrow" />
            <div className="other-container-header forgot-container-header">
                <Link to="/login" >
                    <img src={Logo} alt="Logo" />
                </Link>
            </div>
            <FaIcons.FaAngleDoubleLeft className="other-left-arrow forgot-left-arrow" />
            <h1 className="other-form-title">Find Your Account</h1>
            <form className="other-form-container forgot-form-container">
                {errors.message ? <div className="other-error forgot-error">{errors.message}</div> : null}
                <div className="forgot-form-group">
                    <input className="other-input forgot-input"
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
                        className="other-input forgot-input"
                        id="phone"
                        name="phone"
                        country="US"
                        placeholder="123 456 7890"
                        value={variables.phone}
                        onChange={phoneChange} />
                </div>
                <button className="other-form-button forgot-form-button" type="submit" onClick={onSubmit} disabled={forgotFormValid || loading} >{loading ? 'Loading...' : 'Search'}</button>
            </form>
        </div>
    );
}
export default ForgotUI;