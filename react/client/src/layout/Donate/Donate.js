// Import
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import * as FaIcons from "react-icons/fa";
import { useHistory } from 'react-router-dom';
import './Donate.css';
// Working with stripe for the first time
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useAuthDispatch } from '../../context/auth';
// GraphQL mutation
import { gql, useQuery, useMutation } from '@apollo/client';

// GraphQL mutation
const GET_USER = gql`
    query getUser {
        getUser {
            firstName donation availability
        }
    }
`;

// GraphQL mutation
const STRIPE_SUBMIT = gql`
    mutation stripeSubmit($id: String! $amount: String!) {
        stripeSubmit(id: $id amount: $amount ) {
            donation
        }
    }
`;

// This will be the font end with props I can use to display data
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
// { form: { form, donateFormValid, loading, onChange } }
function DonateUI() {
    // Hook
    const [variables, setVariables] = useState({
        id: '',
        nameOnCard: '',
        radio: '',
        amount: '',
    });
    const [consent, setConsent] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();

    // Use this for disabling the button
    let donateFormValid = true;

    // onChange function
    const onChange = (event) => {
        setVariables({
            ...variables,
            [event.target.name]: event.target.value,
        });
    };

    // Function to check if user have typed everything
    if (variables.nameOnCard &&
        (variables.radio === "100" || variables.radio === "500" || variables.radio === "1000" ||
            variables.radio === "2000" || variables.radio === "5000" || variables.radio === "10000")) {
        donateFormValid = false;
    }
    // if user input nothing then we disabled the button
    else {
        donateFormValid = true;
    }

    const dispatch = useAuthDispatch();

    console.log(dispatch);

    // GraphQL mutation, think of this as global provider    
    const { data } = useQuery(GET_USER);
    const [stripeSubmit, { loading }] = useMutation(STRIPE_SUBMIT, {
        onCompleted(data) {
            window.location.reload();
        },
    });

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
                stripeSubmit({ variables: { id: id, amount: variables.radio } }); // GraphQL mutation // Error when it is not named "variables"
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
            {data ? [((data.getUser.donation === false) && !consent) ? <div className="consent-container" key='14'>
                <p className="read-text">
                    <b>Please read carefully: </b>The page is created to show the employer I could work on the payment system.
                    Therefore, this page does work.<br /><br />
                    <b>PLEASE DO NOT GIVE YOUR INFORMATION.</b><br /><br />
                    (If you want to see how it works, test it with 4242 4242 4242 4242 Any Date / Zip)
                </p>
                <button className="consent-button" onClick={() => { setConsent(true) }}>
                    I acknowledge
                </button>
            </div> : [(data.getUser.donation === false) ?
                <div className="donate-container" key='15'>
                    <FaIcons.FaAngleDoubleRight className="donate-right-arrow" />
                    <div className="donate-container-header" key='16'>
                        <Link to="/home" >
                            <div className="donate-logo">
                                <img src={Logo} alt="Logo" />
                            </div>
                        </Link>
                    </div>
                    <FaIcons.FaAngleDoubleLeft className="donate-left-arrow" />
                    <form className="donate-form">
                        <label className="donate-label-top">
                            <span className="donate-label-text">Donation amount (USD)</span>
                        </label>
                        <div className="donate-outer" key='1'>
                            <div className="donate-inner" key='2'>
                                <input className="donate-1" type="radio" id="1" name="radio" value="100" onChange={onChange}></input>
                                <label className="donate-amount-label" htmlFor="1">$ 1</label>
                            </div>
                            <div className="donate-inner" key='3'>
                                <input className="donate-5" type="radio" id="5" name="radio" value="500" onChange={onChange}></input>
                                <label className="donate-amount-label" htmlFor="5">$ 5</label>
                            </div>
                            <div className="donate-inner" key='4'>
                                <input className="donate-10" type="radio" id="10" name="radio" value="1000" onChange={onChange}></input>
                                <label className="donate-amount-label" htmlFor="10">$ 10</label>
                            </div>
                            <div className="donate-inner" key='5'>
                                <input className="donate-20" type="radio" id="20" name="radio" value="2000" onChange={onChange}></input>
                                <label className="donate-amount-label" htmlFor="20">$ 20</label>
                            </div>
                            <div className="donate-inner" key='6'>
                                <input className="donate-50" type="radio" id="50" name="radio" value="5000" onChange={onChange}></input>
                                <label className="donate-amount-label" htmlFor="50">$ 50</label>
                            </div>
                            <div className="donate-inner" key='7'>
                                <input className="donate-100" type="radio" id="100" name="radio" value="10000" onChange={onChange}></input>
                                <label className="donate-amount-label" htmlFor="100">$ 100</label>
                            </div>
                        </div>
                        <div className="donate-label-outer" key='8'>
                            <label className="donate-label">
                                <span className="donate-label-text">Name on card</span>
                            </label>
                            <input required className="donate-input" type="text" id="nameOnCard" name="nameOnCard" maxLength="30"
                                value={variables.nameOnCard} onChange={onChange}></input>
                            <label className="donate-label">
                                <span className="donate-label-text">Card information</span>
                            </label>
                            <fieldset className="donate-form-group">
                                <div className="donate-form-row" key='9'>
                                    <CardElement options={CARD_OPTIONS} key='10' />
                                </div>
                            </fieldset>
                        </div>
                        <div className="donate-button-container" key='11'>
                            <button className="donate-form-button" type="submit" onClick={onSubmit}
                                disabled={donateFormValid || loading}>{loading ? 'Loading...' : 'Donate'}</button>
                        </div>
                    </form>
                    <br />
                    <div className="donate-footer" key='12'>
                        <p>
                            <b>Note:</b> Due to security reasons, we will not allow you to donate more than once per account.
                            We sincerely thank you for considering donating to us, but we want to make sure your information is secured.
                            Therefore, once you donated, your account will be locked out for donation.
                        </p>
                    </div>
                </div>
                :
                <div className="footer-container" key='13'>
                    <p className="footer-text">
                        THANK YOU {data.getUser.firstName ? data.getUser.firstName.toUpperCase() : null} FOR YOUR GENEROUS DONATION AND SUPPORT.<br /><br />
                        THIS WEBSITE WILL NOW BE ABLE TO CONTINUE TO OPERATE ADS FREE ALL THANKS TO YOUR DONATION.<br /><br />
                        SINCERELY,<br /><br />
                        THANK YOU FOR YOUR GENEROSITY.<br /><br />
                        <button className="footer-button" onClick={() => { history.push('/home') }}>
                            BACK
                        </button>
                    </p>
                </div>
            ]] : null}
        </>
    );
}

export default DonateUI;
