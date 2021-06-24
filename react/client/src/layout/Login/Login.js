// Import
import React from 'react';
import Logo from '../../assets/images/logo3.png';
import { Link } from 'react-router-dom';
import '../StyleSheets/Other.css';
// This will be the font end with props I can use to display data
function LoginUI({ form: { variables, errors, loading, loginFormValid, onSubmit, onChange } }) {
    return (
        <div className="other-container login-container">
            <div className="other-container-header login-container-header">
                <img src={Logo} alt="Logo" />
            </div>
            <h1 className="other-form-title">Log in to PawUMass </h1>
            <form className="other-form-container login-form-container">
                <div className="login-form-group">
                    <input required className="other-input login-input" type="email" id="email" name="email" placeholder="Email" value={variables.email} onChange={onChange} ></input>
                </div>
                {errors.message ? <div className="login-error">{errors.message},<br /> don't have an account?
                    <Link to="/register" className='other-list-items'>
                        Sign up
                    </Link> </div> : null}
                <div className="login-form-group">
                    <input required className="other-input login-input" type="password" id="password" name="password" placeholder="Password" value={variables.password} onChange={onChange}></input>
                </div>
                <div className="options">
                    <div className="login-form-check">
                        <input type="checkbox" className="checkBox" id="checkBox" name="checkBox" value={variables.checkBox} onChange={onChange}></input>
                        <label className="login-label">Remember Me</label>
                    </div>
                    <div className="login-forgot">
                        <Link to="/forgot" className='other-list-items'>
                            Forgot Password
                        </Link>
                    </div>
                </div>
                <button className="other-form-button" onClick={onSubmit} disabled={loginFormValid || loading} type="submit" >{loading ? 'Loading...' : 'Login'}</button>
            </form>
            <div className="other-container-footer">
                Already have an account?
                <Link to="/register" className='other-list-items'>
                    Sign up
                </Link>
            </div>
        </div>
    );
}
export default LoginUI;