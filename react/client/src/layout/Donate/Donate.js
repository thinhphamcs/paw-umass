// Import
import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
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
                <form className="donate-form">
                    <fieldset className="donate-form-group">
                        <div className="donate-form-row">
                            <CardElement options={CARD_OPTIONS} />
                        </div>
                    </fieldset>
                    <button className="donate-button" type="submit" onClick={onSubmit}>Donate</button>
                </form>
                :
                <div className="donate-success">
                    <h2>
                        THANK YOU {sessionStorage.firstName} FOR YOUR GENEROUS DONATION AND SUPPORT.
                        THIS WEBSITE WILL NOW BE ABLE TO CONTINUE TO OPERATE ADS FREE ALL THANKS TO YOUR DONATION.
                        SINCERELY,
                        THANK YOU FOR YOUR GENEROSITY.
                    </h2>
                </div>
            }
        </>
    );
}

export default DonateUI;
