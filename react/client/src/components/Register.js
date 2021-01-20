import React, { useState } from 'react';
import './Register.css';
const Register = () => {
    const [userDetails, setUserDetails] = useState({
        userName: '',
        userEmail: '',
        message: ''
    });

    const formValues = (event) => {
        setUserDetails({
            ...userDetails,
            [event.target.name]: event.target.value
        });
    }
    return (
        <div className="container">
            <h1 className="title">Register User</h1>
            <form>
                <label>Name: </label>
                <input required type="text" id="userName" name="userName" onChange={formValues}></input>
                <br />
                <label>Email: </label>
                <input required type="email" id="userEmail" name="userEmail" onChange={formValues}></input>
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;
