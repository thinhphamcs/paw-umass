// Import
import React from 'react';
import Logo from '../../assets/images/logo3.png';
import { Link } from 'react-router-dom';
import './Login.css';
// This will be the font end with props I can use to display data
function LoginUI({ form: { variables, errors, loading, loginFormValid, onSubmit, onChange } }) {
    return (
        <div className="login-container">
            <div className="login-container-header">
                <img src={Logo} alt="Logo" />
            </div>
            <h1 className="login-form-title">Log in to PawUMass </h1>
            <form className="login-form-container">
                <div className="login-form-group">
                    <input required className="login-input" type="email" id="email" name="email" placeholder="Email" value={variables.email} onChange={onChange} ></input>
                </div>
                {errors.message ? <div className="login-error">{errors.message},<br /> don't have an account?
                    <Link to="/register" className='login-list-items'>
                        Sign up
                    </Link> </div> : null}
                <div className="login-form-group">
                    <input required className="login-input" type="password" id="password" name="password" placeholder="Password" value={variables.password} onChange={onChange}></input>
                </div>
                <div className="options">
                    <div className="login-form-check">
                        <input type="checkbox" className="checkBox" id="checkBox" name="checkBox" value={variables.checkBox} onChange={onChange}></input>
                        <label className="login-label">Remember Me</label>
                    </div>
                    <div className="login-forgot">
                        <Link to="/forgot" className='login-list-items'>
                            Forgot Password
                        </Link>
                    </div>
                </div>
                <button className="login-form-button" onClick={onSubmit} disabled={loginFormValid || loading} type="submit" >{loading ? 'Loading...' : 'Login'}</button>
            </form>
            <div className="login-container-footer">
                Already have an account?
                <Link to="/register" className='login-list-items'>
                    Sign up
                </Link>
            </div>
        </div>
    );
}
export default LoginUI;