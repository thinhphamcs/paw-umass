// Import
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import * as AiIcons from "react-icons/ai";
import './Profile.css';

// This will be the font end with props I can use to display data
function ProfileUI({ form: { onChange, form, profileFormValid, onSubmit, loading, error, deleteProfile } }) {
    return (
        <div className="profile-container">
            <AiIcons.AiOutlineArrowRight className="right-arrow" />
            <div className="profile-container-header">
                <Link to="/home" >
                    <img src={Logo} alt="Logo" />
                </Link>
            </div>
            <AiIcons.AiOutlineArrowLeft className="left-arrow" />
            <h1 className="profile-form-title">Welcome {sessionStorage ? sessionStorage.firstName : null}{localStorage.firstName ? localStorage.firstName : null}</h1>
            <form className="profile-form-container">
                {error ? <div className="profile-error">{error.message}</div> : null}
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
                    <input className="profile-input" type="text" id="phone" name="phone" placeholder="Phone" value={form.phone} onChange={onChange}></input>
                </div>
                <button className="profile-form-button" type="submit" onClick={onSubmit} disabled={profileFormValid || loading} loading={loading.toString()}>Update</button>
            </form>
            <div className="profile-container-footer">
                <button className="profile-delete" onClick={deleteProfile}>
                    Deactivate Account
                </button>
                <Link to="/change" className='profile-change' >
                    Change Password
                </Link>
            </div>
        </div>
    );
}

export default ProfileUI;

