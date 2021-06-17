// Import
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import PhoneInput from 'react-phone-number-input/input';
import * as FaIcons from "react-icons/fa";
import './Profile.css';

// This will be the font end with props I can use to display data
function ProfileUI({ form: { variables, loading, data, displayPhone, errors, updateFormValid, onSubmit, onChange, phoneChange } }) {
    return (
        <div className="profile-container">
            <FaIcons.FaAngleDoubleRight className="profile-right-arrow" />
            <div className="profile-container-header">
                <Link to="/home" >
                    <img src={Logo} alt="Logo" />
                </Link>
            </div>
            <FaIcons.FaAngleDoubleLeft className="profile-left-arrow" />
            <h1 className="profile-form-title">Welcome {data ? data.firstName : null}</h1>
            <form className="profile-form-container">
                {errors.email ?
                    <div className="profile-error">{errors.email}</div> : [errors.phone ? <div className="profile-error">{errors.phone}</div> : [errors.update ? <div className="profile-error">{errors.update}</div> : null]]}
                <div className="profile-form-group">
                    <div className="profile-data-display">
                        {data ? data.getUser.firstName : null}
                    </div>
                    <input className="profile-input" type="text" id="firstName" name="firstName" placeholder="First Name" value={variables.firstName} onChange={onChange} ></input>
                </div>
                <div className="profile-form-group">
                    <div className="profile-data-display">
                        {data ? data.getUser.lastName : null}
                    </div>
                    <input className="profile-input" type="text" id="lastName" name="lastName" placeholder="Last Name" value={variables.lastName} onChange={onChange}></input>
                </div>
                <div className="profile-form-group">
                    <div className="profile-data-display">
                        {data ? data.getUser.email : null}
                    </div>
                    <input className="profile-input" type="email" id="email" name="email" placeholder="Email" value={variables.email} onChange={onChange}></input>
                </div>
                <div className="profile-form-group">
                    <div className="profile-data-display">
                        {data ? displayPhone : null}
                    </div>
                    <PhoneInput
                        className="profile-input"
                        id="phone"
                        name="phone"
                        country="US"
                        placeholder="123 456 7890"
                        value={variables.phone}
                        onChange={phoneChange} />
                </div>
                <button className="profile-form-button" type="submit" onClick={onSubmit} disabled={updateFormValid || loading}>{loading ? 'Loading...' : 'Update'}</button>
            </form>
        </div>
    );
}

export default ProfileUI;

