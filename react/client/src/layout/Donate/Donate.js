// Import
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import { axiosInstance } from '../../helpers/axiosInstance';
import * as FaIcons from "react-icons/fa";
// Working with stripe for the first time
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Donate.css';

// This will be the font end with props I can use to display data
// error, loading, donateFormValid, onChange
const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#6A150D",
            color: "black",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "15px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#6A150D" },
            "::placeholder": { color: "#6A150D" }
        },
        invalid: {
            iconColor: "#a26254",
            color: "#a26254"
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
                    <FaIcons.FaAngleDoubleRight className="donate-right-arrow" />
                    <div className="donate-container-header">
                        <Link to="/home" >
                            <div className="donate-logo">
                                <img src={Logo} alt="Logo" />
                            </div>

                        </Link>
                    </div>
                    <FaIcons.FaAngleDoubleLeft className="donate-left-arrow" />
                    <form className="donate-form">
                        <label className="donate-label-top">
                            <span className="donate-label-text">
                                Donation amount (USD)
                                </span>
                        </label>
                        <div className="donate-outer">
                            <div className="donate-inner">
                                <input className="donate-1" type="radio" id="1" name="radio" value="$ 1"></input>
                                <label className="donate-amount-label" htmlFor="1">$ 1</label>
                            </div>
                            <div className="donate-inner">
                                <input className="donate-5" type="radio" id="5" name="radio" value="$ 5"></input>
                                <label className="donate-amount-label" htmlFor="5">$ 5</label>
                            </div>
                            <div className="donate-inner">
                                <input className="donate-10" type="radio" id="10" name="radio" value="$ 10"></input>
                                <label className="donate-amount-label" htmlFor="10">$ 10</label>
                            </div>
                            <div className="donate-inner">
                                <input className="donate-20" type="radio" id="20" name="radio" value="$ 20"></input>
                                <label className="donate-amount-label" htmlFor="20">$ 20</label>
                            </div>
                            <div className="donate-inner">
                                <input className="donate-50" type="radio" id="50" name="radio" value="$ 50"></input>
                                <label className="donate-amount-label" htmlFor="50">$ 50</label>
                            </div>
                            <div className="donate-inner">
                                <input className="donate-100" type="radio" id="100" name="radio" value="$ 100"></input>
                                <label className="donate-amount-label" htmlFor="100">$ 100</label>
                            </div>
                        </div>
                        <div className="donate-label-outer">
                            <label className="donate-label">
                                <span className="donate-label-text">
                                    Name on card
                                </span>
                            </label>
                            {/*   value={form.petName} onChange={onChange} */}
                            <input required className="donate-input" type="text" id="nameOnCard" name="nameOnCard" maxLength="30"></input>
                            <label className="donate-label">
                                <span className="donate-label-text">
                                    Card information
                                </span>
                            </label>
                            <fieldset className="donate-form-group">
                                <div className="donate-form-row">
                                    <CardElement options={CARD_OPTIONS} />
                                </div>
                            </fieldset>
                        </div>
                        <div className="donate-button-container">
                            <button className="donate-form-button" type="submit" onClick={onSubmit}>Donate</button>
                        </div>
                    </form>
                    <br />
                    <div className="donate-footer">
                        <p>
                            <b>Note:</b> Due to security reasons, we will not allow you to donate more than once per account.
                            We sincerely thank you for considering donating to us, but we want to make sure your information is secured.
                            Therefore, once you donated, your account will be locked out for donation.
                        </p>
                    </div>
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
