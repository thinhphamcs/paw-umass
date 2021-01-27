// Import
import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const Login = ({ LoggedIn }) => {
    // Hook for event listener function 'loginForm'
    const [loginValues, setLoginValues] = useState({
        email: '',
        password: '',
        message: ''
    });
    // Event listener function to update the hook
    const loginForm = (event) => {
        setLoginValues({
            ...loginValues,
            [event.target.name]: event.target.value
        });
    };
    // form onsubmit function handler
    const login = async (event) => {
        event.preventDefault();
        const body = {
            email: loginValues.email,
            password: loginValues.password
        }
        const response = await axios.post("/auth/login", body, {
            header: {
                'Content-type': 'application/json'
            }
        });
        setLoginValues({
            ...loginValues,
            message: response.data.message,
        });
        LoggedIn(response);
    }
    return (
        /**
         * Parent container for everything
         * upper part of the parent container would be the form
         * lower part of the parent container would be the forgot and sign up
         */
        <div className="container">
            <div className="form-container">
                <h1 className="form-title">Login</h1>
                <form onSubmit={login}>
                    <div className="form-inner">
                        <div className="form-group">
                            <label>Email: </label>
                            <input required type="email" id="email" name="email" onChange={loginForm}></input>
                        </div>
                        <br />
                        {/* ERROR */}
                        {loginValues.message ? <h2 className="result-message">{loginValues.message}</h2> : null}
                        <br />
                        <div className="form-group">
                            <label>Password: </label>
                            <input required type="password" id="password" name="password" onChange={loginForm}></input>
                        </div>
                        <button type="submit" >Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login;
