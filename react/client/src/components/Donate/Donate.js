// Import
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import DonateUI from '../../layout/Donate/Donate';
// Working with stripe for the first time
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const PUBLIC_KEY = "pk_test_51InV80FfDd5uE1gz2xsi7IQnd86nAef3wG4wwNrM3fXY9nVTr3QVSM1rE0nJJ8aeUKJGCpbPmFpUVlPzO3wm6LD300F5eVcmZl";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

// Export this component with UI for cleaner and more organized way
function Donate() {
    const history = useHistory();
    useEffect(() => {
        document.body.style.backgroundColor = "white";
    }, [history]);
    return (
        <Elements stripe={stripeTestPromise}>
            <DonateUI />
        </Elements>
    );
}
export default Donate;
