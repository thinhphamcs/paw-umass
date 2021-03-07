import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import * as AiIcons from "react-icons/ai";
import './Profile.css';

function ProfileUI({ form: { onChange, form, profileFormValid, onSubmit, loading, error } }) {
    return (
        <div className="profile-container">
            <AiIcons.AiOutlineArrowRight className="right-arrow" />
            <div className="profile-container-header">
                <Link to="/home" >
                    <img src={Logo} alt="Logo" />
                </Link>
            </div>
            <AiIcons.AiOutlineArrowLeft className="left-arrow" />
            <h1 className="profile-form-title">Welcome First</h1>
            <form className="profile-form-container">
                <div className="profile-form-group">
                    <div className="profile-data-display">
                        First
                    </div>
                    <input className="profile-input" type="text" id="firstName" name="firstName" placeholder="First Name" value={form.firstName} onChange={onChange} ></input>
                </div>
                <div className="profile-form-group">
                    <div className="profile-data-display">
                        Last
                    </div>
                    <input className="profile-input" type="text" id="lastName" name="lastName" placeholder="Last Name" value={form.lastName} onChange={onChange}></input>
                </div>
                <div className="profile-form-group">
                    <div className="profile-data-display">
                        Email
                    </div>
                    <input className="profile-input" type="email" id="email" name="email" placeholder="Email" value={form.email} onChange={onChange}></input>
                </div>
                <div className="profile-form-group">
                    <div className="profile-data-display">
                        Phone
                    </div>
                    <input className="profile-input" type="text" id="phone" name="phone" placeholder="Phone" value={form.phone} onChange={onChange}></input>
                </div>
                <button className="profile-form-button" type="submit" onClick={onSubmit} disabled={profileFormValid || loading} loading={loading.toString()}>Update</button>
            </form>
            <div className="profile-container-footer">
                <button className="profile-delete">
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

