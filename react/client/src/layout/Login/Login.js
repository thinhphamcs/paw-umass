// Import
import React from 'react';
import Logo from '../../assets/images/logo3.png';
import { Link } from 'react-router-dom';
import './Login.css';

function LoginUI({ form: { onChange, form, loginFormValid, onSubmit, loading } }) {
    return (
        <div className="login-container">
            <div className="login-container-header">
                <img src={Logo} alt="Logo" />
            </div>
            <h1 className="login-form-title">Log in to PawUMass </h1>
            <form className="login-form-container">
                <div className="login-form-group">
                    <input required className="login-input" type="email" id="email" name="email" placeholder="Email" value={form.email} onChange={onChange} ></input>
                </div>
                {/* ERROR */}
                {/* {loginValues.message ? <h2 className="result-message">{loginValues.message}</h2> : null} */}
                <div className="login-form-group">
                    <input required className="login-input" type="password" id="password" name="password" placeholder="Password" value={form.password} onChange={onChange}></input>
                </div>
                <div className="login-form-check">
                    <input type="checkbox" id="checkBox" name="checkBox" value={form.checkBox} onChange={onChange}></input>
                    <label className="login-label">Remember Me</label>
                </div>
                <button className="login-form-button" onClick={onSubmit} disabled={loginFormValid || loading} loading={loading} type="submit" >Login</button>
            </form>
            <div className="login-container-footer">
                <Link to="/forgot" className='login-list-items'>
                    Forgot Password
                </Link>
                <Link to="/register" className='login-list-items' >
                    Sign up
                </Link>
            </div>
        </div>
    )
}

export default LoginUI;
