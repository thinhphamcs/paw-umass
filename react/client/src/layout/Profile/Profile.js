// Import
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import PhoneInput from 'react-phone-number-input/input';
import * as FaIcons from "react-icons/fa";
import '../StyleSheets/CDP.css';
// This will be the font end with props I can use to display data
function ProfileUI({ form: { variables, loading, data, displayPhone, errors, updateFormValid, onSubmit, onChange, phoneChange } }) {
    return (
        <div className="cdp-container">
            <FaIcons.FaAngleDoubleRight className="cdp-right-arrow profile-right" />
            <div className="cdp-container-header profile-header">
                <Link to="/home" >
                    <img src={Logo} alt="Logo" />
                </Link>
            </div>
            <FaIcons.FaAngleDoubleLeft className="cdp-left-arrow profile-left" />
            <h1 className="cdp-form-title">Welcome {data ? data.firstName : null}</h1>
            <form className="cdp-form-container">
                {errors.message ? <div className="cdp-error profile-error">{errors.message}</div> : null}
                <div className="cdp-form-group">
                    <div className="profile-data-display">
                        {data ? data.getUser.firstName : null}
                    </div>
                    <input className="cdp-input" type="text" id="firstName" name="firstName" placeholder="First Name" value={variables.firstName} onChange={onChange} ></input>
                </div>
                <div className="cdp-form-group">
                    <div className="profile-data-display">
                        {data ? data.getUser.lastName : null}
                    </div>
                    <input className="cdp-input" type="text" id="lastName" name="lastName" placeholder="Last Name" value={variables.lastName} onChange={onChange}></input>
                </div>
                <div className="cdp-form-group">
                    <div className="profile-data-display">
                        {data ? data.getUser.email : null}
                    </div>
                    <input className="cdp-input" type="email" id="email" name="email" placeholder="Email" value={variables.email} onChange={onChange}></input>
                </div>
                <div className="cdp-form-group">
                    <div className="profile-data-display">
                        {data ? displayPhone : null}
                    </div>
                    <PhoneInput
                        className="cdp-input"
                        id="phone"
                        name="phone"
                        country="US"
                        placeholder="123 456 7890"
                        value={variables.phone}
                        onChange={phoneChange} />
                </div>
                <button className="cdp-form-button" type="submit" onClick={onSubmit} disabled={updateFormValid || loading}>{loading ? 'Loading...' : 'Update'}</button>
            </form>
        </div>
    );
}
export default ProfileUI;