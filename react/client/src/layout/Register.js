import React from 'react'

function RegisterUI({ form: { onChange, registerFormValid } }) {
    return (
        <form>
            <label>First: </label>
            <input required type="text" id="firstName" name="firstName" onChange={onChange}></input>
            <br />
            <label>Last: </label>
            <input required type="text" id="lastName" name="lastName" onChange={onChange}></input>
            <br />
            <label>Email: </label>
            <input required type="email" id="email" name="email" onChange={onChange}></input>
            <br />
            <label>Password: </label>
            <input required type="password" id="password" name="password" onChange={onChange}></input>
            <br />
            <label>Confirm Password: </label>
            <input required type="password" id="passwordConfirm" name="passwordConfirm" onChange={onChange}></input>
            <br />
            <label>Phone: </label>
            <input required type="text" id="phone" name="phone" onChange={onChange}></input>
            <br />
            <button disabled={registerFormValid} type="submit">Register</button>
        </form>
    )
}

export default RegisterUI;
