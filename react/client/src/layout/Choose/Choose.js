// Import
import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './Choose.css';
import Logo from '../../assets/images/logo3.png';
import * as FaIcons from 'react-icons/fa';
// This will be the font end with props I can use to display data
const ChooseUI = () => {
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
            <div className="choose-container-header">
                <img src={Logo} alt="Logo" />
            </div>
            <div className="choose-container-body">
                <div className="intro">
                    <h1 className="texts">See what's going on</h1>
                    <br />
                    <h3 className="texts">Join PawUMass today</h3>
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
            <div className="choose-container-footer">
                <Link to="/about" className='choose-list-items'>
                    About
                </Link>
                <Link to="/tos" className='choose-list-items'>
                    Terms of Service
                </Link>
                <Link to="/privacy" className='choose-list-items'>
                    Privacy Policy
                </Link>
                <Link to="/cookies" className='choose-list-items'>
                    Cookie Policy
                </Link>
                <p className="copyright">
                    <FaIcons.FaRegCopyright /> 2021 PawUMass
                </p>
            </div>
        </>
    );
}
export default ChooseUI;