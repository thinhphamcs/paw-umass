import React from 'react';

const Register = () => {
    return (
        <div className="container">
            <h1 className="title">Register User</h1>
            <form>
                <label>Name: </label>
                <input required type="text" id="userName" name="userName"></input>
                <label>Email: </label>
                <input required type="email" id="userEmail" name="userEmail"></input>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;
