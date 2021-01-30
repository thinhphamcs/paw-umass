// Import
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';
import Logo from '../logo3.png';

const Login = ({ LoggedIn }) => {
    // Hook for event listener function 'loginForm'
    const [loginValues, setLoginValues] = useState({
        email: '',
        password: '',
        checkBox: false,
        message: ''
    });
    // Event listener function to update the hook
    const loginForm = (event) => {
        setLoginValues({
            ...loginValues,
            [event.target.name]: event.target.value,
            checkBox: event.target.checked
        });
    };
    // Form onsubmit function handler
    const login = async (event) => {
        event.preventDefault(); // Prevent page to go have params on the url
        const body = {
            email: loginValues.email,
            password: loginValues.password,
            checkBox: loginValues.checkBox
        }
        // Send the body of front end to backend using axios
        const response = await axios.post("/auth/login", body, {
            header: {
                'Content-type': 'application/json'
            }
        });
        // Get the message to display
        setLoginValues({
            ...loginValues,
            message: response.data.message,
        });
        // Get the data to implement logic
        LoggedIn(response);
    }
    return (
        /**
         * Parent container for everything
         * upper part of the parent container would be the form
         * lower part of the parent container would be the forgot and sign up
         */
        <>
            <div className="login-container">
                <div className="login-container-header">
                    <img src={Logo} alt="Logo" />
                </div>
                <h1 className="login-form-title">Log in to PawUMass </h1>
                <form className="login-form-container" onSubmit={login}>
                    <div className="login-form-group">
                        <input required className="login-input" type="email" id="email" name="email" placeholder="Email" onChange={loginForm} ></input>
                    </div>
                    {/* ERROR */}
                    {loginValues.message ? <h2 className="result-message">{loginValues.message}</h2> : null}
                    <div className="login-form-group">
                        <input required className="login-input" type="password" id="password" name="password" placeholder="Password" onChange={loginForm}></input>
                    </div>
                    <div className="login-form-check">
                        <input type="checkbox" id="checkBox" name="checkBox" onChange={loginForm}></input>
                        <label className="login-label">Remember Me</label>
                    </div>
                    <button className="login-form-button" type="submit" >Login</button>
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
        </>
    );
}
export default Login;
