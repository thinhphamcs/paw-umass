// Import
import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './Choose.css';
import Logo from '../logo3.png';


// Function
const Choose = () => {
    // Hook
    const [page, setPage] = useState({
        page: ''
    });
    // If-else statement
    if (page === "Login") {
        return <Redirect to="/login" />
    }
    else if (page === "Register") {
        return <Redirect to="/register" />
    }
    return (
        // Determine which page to redirect
        <div className="container">
            <div className="container-header">
                <img src={Logo} alt="Logo" />
            </div>
            <div className="container-body">
                <h2>See what's going on</h2>
                <br />
                <h4>Join PawUMass today</h4>
                <br />
                <button className="login-button" onClick={() => setPage("Login")}>
                    Login
                </button>
                <button className="register-button" onClick={() => setPage("Register")}>
                    Register
                </button>
            </div>
            <div className="container-footer">

            </div>

        </div>
    )
}

export default Choose;
