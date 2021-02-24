// Import
import React from 'react';
import './Register.css';
import { Button, Form } from "react-bootstrap";

// This will be the font end with props I can use to display data
function RegisterUI({ form: { onChange, form, registerFormValid, onSubmit, loading, error } }) {

    return (
        <form>
            {error ? <div>{error.message}</div> : null}
            <Form.Label>First: </Form.Label>
            <Form.Control required type="text" id="firstName" name="firstName" value={form.firstName} onChange={onChange}></Form.Control>
            <br />
            <Form.Label>Last: </Form.Label>
            <Form.Control required type="text" id="lastName" name="lastName" value={form.lastName} onChange={onChange}></Form.Control>
            <br />
            <Form.Label>Email: </Form.Label>
            <Form.Control required type="email" id="email" name="email" value={form.email} onChange={onChange}></Form.Control>
            <br />
            <Form.Label>Password: </Form.Label>
            <Form.Control required type="password" id="password" name="password" value={form.password} onChange={onChange}></Form.Control>
            <br />
            <Form.Label>Confirm Password: </Form.Label>
            <Form.Control required type="password" id="passwordConfirm" name="passwordConfirm" value={form.passwordConfirm} onChange={onChange}></Form.Control>
            <br />
            <Form.Label>Phone: </Form.Label>
            <Form.Control required type="text" id="phone" name="phone" value={form.phone} onChange={onChange}></Form.Control>
            <br />
            <Button onClick={onSubmit} disabled={registerFormValid || loading} loading={loading} type="submit">Register</Button>
        </form >
    )
}

export default RegisterUI;
