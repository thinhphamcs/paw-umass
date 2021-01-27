// Import
import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './Choose.css';
import Logo from '../logo3.png';
import * as FaIcons from 'react-icons/fa';
import axios from 'axios';

// Function
const Choose = () => {
    // Hooks
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
        <>
            <div className="container-header">
                <img src={Logo} alt="Logo" />
            </div>
            <div className="container-body">
                <div className="intro">
                    <h2>See what's going on</h2>
                    <br />
                    <h4>Join PawUMass today</h4>
                    <br />
                </div>
                <div className="buttons">
                    <button className="login-button" onClick={() => setPage("Login")}>
                        Login
                    </button>
                    <button className="register-button" onClick={() => setPage("Register")}>
                        Register
                    </button>
                </div>
            </div>
            <div className="container-footer">
                <Link to="#" className='list-items'>
                    
                        About
                    
                </Link>
                <Link to="#" className='list-items'>
                    
                        Terms of Service
                    
                </Link>
                <Link to="#" className='list-items'>
                    
                        Privacy Policy
                    
                </Link>
                <Link to="#" className='list-items'>
                    
                        Cookie Policy
                    
                </Link>
                <p>
                    <FaIcons.FaRegCopyright /> 2021 PawUMass
                </p>
            </div>
        </>
    );
}

export default Choose;
