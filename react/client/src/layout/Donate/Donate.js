// Import
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import Logo from '../../assets/images/logo.png';
import { axiosInstance } from '../../helpers/axiosInstance';
// Working with stripe for the first time
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Donate.css';

// This will be the font end with props I can use to display data
// error, loading, donateFormValid, onChange
const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "black",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#87bbfd" }
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
}
function DonateUI() {
    // Hook
    const [success, setSuccess] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    // onSubmit function
    const onSubmit = async (event) => {
        event.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        });
        if (!error) {
            try {
                const { id } = paymentMethod;
                const response = await axiosInstance().post("/user/donate", {
                    amount: 1000, // the amounts will be in cents
                    id
                });
                if (response.data.success) {
                    console.log("Successfully donated");
                    setSuccess(true);
                }
            } catch (error) {
                console.log("Error", error);
            }
        }
        else {
            console.log(error.message);
        }
    }

    return (
        <>
            {!success ?
                <div className="donate-container">
                    <form className="donate-form">
                        <div className="donate-outer">
                            <div className="donate-inner">
                                <input className="donate-1" type="radio" id="1" name="radio" value="$ 1"></input>
                                <label className="donate-1-label" htmlFor="1">$ 1</label>
                            </div>
                            <div className="donate-inner">
                                <input className="donate-5" type="radio" id="5" name="radio" value="$ 5"></input>
                                <label className="donate-5-label" htmlFor="5">$ 5</label>
                            </div>
                            <div className="donate-inner">
                                <input className="donate-10" type="radio" id="10" name="radio" value="$ 10"></input>
                                <label className="donate-10-label" htmlFor="10">$ 10</label>
                            </div>
                        </div>
                        <div className="donate-outer">
                            <div className="donate-inner">
                                <input className="donate-20" type="radio" id="20" name="radio" value="$ 20"></input>
                                <label className="donate-20-label" htmlFor="20">$ 20</label>
                            </div>
                            <div className="donate-inner">
                                <input className="donate-50" type="radio" id="50" name="radio" value="$ 50"></input>
                                <label className="donate-50-label" htmlFor="50">$ 50</label>
                            </div>
                            <div className="donate-inner">
                                <input className="donate-100" type="radio" id="100" name="radio" value="$ 100"></input>
                                <label className="donate-100-label" htmlFor="100">$ 100</label>
                            </div>
                        </div>
                        <fieldset className="donate-form-group">
                            <div className="donate-form-row">
                                <CardElement options={CARD_OPTIONS} />
                            </div>
                        </fieldset>
                        <button className="donate-button" type="submit" onClick={onSubmit}>Donate</button>
                    </form>
                </div>
                :
                <div className="donate-success">
                    <h2>
                        THANK YOU {sessionStorage.firstName} FOR YOUR GENEROUS DONATION AND SUPPORT.
                        THIS WEBSITE WILL NOW BE ABLE TO CONTINUE TO OPERATE ADS FREE ALL THANKS TO YOUR DONATION.
                        SINCERELY,
                        THANK YOU FOR YOUR GENEROSITY.
                        <button className="donate-back">
                            <Link to="/home">
                                Back
                            </Link>
                        </button>
                    </h2>
                </div>
            }
        </>
    );
}

export default DonateUI;
