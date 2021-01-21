// Import
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
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
    // form onsubmit function
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
                    <label>Email: </label>
                    <input required type="email" id="email" name="email" onChange={loginForm}></input>
                    <br />
                    <label>Password: </label>
                    <input required type="password" id="password" name="password" onChange={loginForm}></input>
                    <br />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;
