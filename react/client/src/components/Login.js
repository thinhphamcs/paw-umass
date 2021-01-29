// Import
import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Link } from 'react-router-dom';
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
         <div className="container">
            <div className="container-header">
                <img src={Logo} alt="Logo" />
            </div>
            <h1 className="form-title">Log in to PawUMass </h1>
            <form className="form-container" onSubmit={login}>
                <div className="form-group">
                    <input required type="email" id="email" name="email" placeholder="Email" onChange={loginForm} ></input>
                </div>
                {/* ERROR */}
                {loginValues.message ? <h2 className="result-message">{loginValues.message}</h2> : null}
                <div className="form-group">
                    <input required type="password" id="password" name="password" placeholder="Password" onChange={loginForm}></input>
                </div>
                <div className="form-check">
                    <input type="checkbox" id="checkBox" name="checkBox" onChange={loginForm}></input>
                    <label>Remember Me</label>
                </div>
                <button type="submit" >Login</button>
            </form>
            <div className="container-footer">
                <BrowserRouter>
                <Link to="#" className='list-items'>
                    
                        Forgot Password
                    
                </Link>
                <Link to="/register" className='list-items'>
                    
                        Sign up
                    
                </Link>
                </BrowserRouter>
            </div>
        </div>
         </>  
    );
}
export default Login;
