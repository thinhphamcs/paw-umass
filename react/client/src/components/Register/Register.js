import React, { useState, useEffect, useContext } from 'react';
import './Register.css';
import axios from 'axios';
import { register } from '../../context/actions/Register';
import { GlobalContext } from '../../context/Provider';

const Register = () => {
    // React hook
    // const [userDetails, setUserDetails] = useState({
    //     firstName: '',
    //     lastName: '',
    //     email: '',
    //     password: '',
    //     passwordConfirm: '',
    //     phone: '',
    //     message: ''
    // });

    // React useEffect
    useEffect(() => {
        register();
    }, []);

    // Event listening function, basically listen to user inputs
    // const formValues = (event) => {
    //     setUserDetails({
    //         ...userDetails,
    //         [event.target.name]: event.target.value
    //     });
    // }

    // This is what will be sending to backend
    // const register = async (event) => {
    //     event.preventDefault(); // when you submit a form by default you are reloading the page or go somewhere so this will prevent it
    //     /**
    //      * One thing to remember
    //      * I don't need JSON.string() since axios already convert to json already
    //      * https://stackoverflow.com/questions/65802652/req-body-is-undefined-react-nodejs
    //      */
    //     const body = {
    //         firstName: userDetails.firstName,
    //         lastName: userDetails.lastName,
    //         email: userDetails.email,
    //         password: userDetails.password,
    //         passwordConfirm: userDetails.passwordConfirm,
    //         phone: userDetails.phone
    //     };
    //     // Using post method to send to database through axios
    //     const response = await axios.post("/auth/register", body, {
    //         header: {
    //             'Content-Type': 'application/json'
    //         }
    //     });

    //     setUserDetails({
    //         ...userDetails,
    //         message: response.data.message
    //     });
    // }

    /**
     * <form onSubmit={register}>
                <label>First: </label>
                <input required type="text" id="firstName" name="firstName" onChange={formValues}></input>
                <br />
                <label>Last: </label>
                <input required type="text" id="lastName" name="lastName" onChange={formValues}></input>
                <br />
                <label>Email: </label>
                <input required type="email" id="email" name="email" onChange={formValues}></input>
                <br />
                <label>Password: </label>
                <input required type="password" id="password" name="password" onChange={formValues}></input>
                <br />
                <label>Confirm Password: </label>
                <input required type="password" id="passwordConfirm" name="passwordConfirm" onChange={formValues}></input>
                <br />
                <label>Phone: </label>
                <input required type="text" id="phone" name="phone" onChange={formValues}></input>
                <br />
                <button type="submit">Register</button>
                {userDetails.message ? <h1 className="result-message">{userDetails.message}</h1> : null}
            </form>
     */
    const context = useContext(GlobalContext);
    console.log("testing ", context);
    return (
        <div className="container">
            <h1 className="title">Register User</h1>

        </div>
    )
}

export default Register;
