import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import * as AiIcons from "react-icons/ai";
import GetProfiles from '../../context/actions/profiles/GetProfiles';
import './Profile.css';

function ProfileUI({ form: onChange, form, loginFormValid, onSubmit, loading, error }) {
    useEffect(() => {
        document.body.style.backgroundColor = "white";
        GetProfiles();
    }, []);
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
                <div class="profile-form-group">
                    <div class="profile-data-display">
                        First
                    </div>
                    {/* id="firstName" name="firstName" placeholder="First Name" value={form.firstName} onChange={onChange} */}
                    <input className="profile-input" type="text" ></input>
                </div>
                <div class="profile-form-group">
                    <div class="profile-data-display">
                        Last
                    </div>
                    {/* id="lastName" name="lastName" placeholder="Last Name" value={form.lastName} onChange={onChange} */}
                    <input className="profile-input" type="text" ></input>
                </div>
                <div class="profile-form-group">
                    <div class="profile-data-display">
                        Email
                    </div>
                    {/* id="email" name="email" placeholder="Email" value={form.email} onChange={onChange} */}
                    <input className="profile-input" type="email" ></input>
                </div>
                <div class="profile-form-group">
                    <div class="profile-data-display">
                        Phone
                    </div>
                    {/* id="phone" name="phone" placeholder="Phone" value={form.phone} onChange={onChange} */}
                    <input className="profile-input" type="text" ></input>
                </div>
                {/* onClick={onSubmit} disabled={profileFormValid || loading} loading={loading} */}
                <button className="profile-form-button" type="submit">Update</button>
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

