// Import
import React from 'react';
import Logo from '../../assets/images/logo3.png';
import { Link } from 'react-router-dom';
import './Login.css';

function LoginUI({ form: { onChange, form, loginFormValid, onSubmit, loading, error } }) {
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
                {error.message ? null : null}
                {error ? <div className="login-error">{error.message}</div> : null}
                <div className="login-form-group">
                    <input required className="login-input" type="password" id="password" name="password" placeholder="Password" value={form.password} onChange={onChange}></input>
                </div>
                <div className="options">
                    <div className="login-form-check">
                        <input type="checkbox" className="checkBox" id="checkBox" name="checkBox" value={form.checkBox} onChange={onChange}></input>
                        <label className="login-label">Remember Me</label>
                    </div>
                    <div className="login-forgot">
                        <Link to="/forgot" className='login-list-items'>
                            Forgot Password
                        </Link>
                    </div>
                </div>
                <button className="login-form-button" onClick={onSubmit} disabled={loginFormValid || loading} loading={loading} type="submit" >Login</button>
            </form>
            <div className="login-container-footer">
                Already have an account?
                <Link to="/register" className='login-list-items' >
                    Sign up
                </Link>
            </div>
        </div>
    )
}

export default LoginUI;
