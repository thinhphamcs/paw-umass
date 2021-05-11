// Import
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import PhoneInput from 'react-phone-number-input/input';
import * as FaIcons from "react-icons/fa";
import './Profile.css';

// This will be the font end with props I can use to display data
function ProfileUI({ form: { onChange, form, updateFormValid, onSubmit, loading, error, phoneChange } }) {
    return (
        <div className="profile-container">
            <FaIcons.FaAngleDoubleRight className="profile-right-arrow" />
            <div className="profile-container-header">
                <Link to="/home" >
                    <img src={Logo} alt="Logo" />
                </Link>
            </div>
            <FaIcons.FaAngleDoubleLeft className="profile-left-arrow" />
            <h1 className="profile-form-title">Welcome {sessionStorage ? sessionStorage.firstName : null}{localStorage.firstName ? localStorage.firstName : null}</h1>
            <form className="profile-form-container">
                {error ?
                    [(error.message === "Invalid Email Format" || error.message === "Invalid Phone Format" || error.message === "Please provide valid input") ?
                        <div className="profile-error">{error.message}</div> : null]
                    : null}
                <div className="profile-form-group">
                    <div className="profile-data-display">
                        {sessionStorage ? sessionStorage.firstName : null}
                        {localStorage.firstName ? localStorage.firstName : null}
                    </div>
                    <input className="profile-input" type="text" id="firstName" name="firstName" placeholder="First Name" value={form.firstName} onChange={onChange} ></input>
                </div>
                <div className="profile-form-group">
                    <div className="profile-data-display">
                        {sessionStorage ? sessionStorage.lastName : null}
                        {localStorage.lastName ? localStorage.lastName : null}
                    </div>
                    <input className="profile-input" type="text" id="lastName" name="lastName" placeholder="Last Name" value={form.lastName} onChange={onChange}></input>
                </div>
                <div className="profile-form-group">
                    <div className="profile-data-display">
                        {sessionStorage ? sessionStorage.email : null}
                        {localStorage.email ? localStorage.email : null}
                    </div>
                    <input className="profile-input" type="email" id="email" name="email" placeholder="Email" value={form.email} onChange={onChange}></input>
                </div>
                <div className="profile-form-group">
                    <div className="profile-data-display">
                        {sessionStorage ? sessionStorage.phone : null}
                        {localStorage.phone ? localStorage.phone : null}
                    </div>
                    <PhoneInput
                        className="profile-input"
                        id="phone"
                        name="phone"
                        country="US"
                        placeholder="123 456 7890"
                        value={form.phone}
                        onChange={phoneChange} />
                </div>
                <button className="profile-form-button" type="submit" onClick={onSubmit} disabled={updateFormValid || loading} loading={loading.toString()}>Update</button>
            </form>
        </div>
    );
}

export default ProfileUI;

