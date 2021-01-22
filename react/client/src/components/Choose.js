// Import
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './Choose.css';

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
            <button onClick={() => setPage("Login")}>
                Login
            </button>
            <br />
            <button onClick={() => setPage("Register")}>
                Register
            </button>
        </div>
    )
}

export default Choose;
