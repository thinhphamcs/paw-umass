// Import
import React, { useContext, useEffect } from 'react';
import DonateUI from '../../layout/Donate/Donate';
import { DonateForm } from './DonateForm';
import { GetProfiles } from '../../context/actions/settings/GetProfiles';
import { useHistory } from 'react-router';
import { GlobalContext } from '../../context/Provider';
// Working with stripe for the first time
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const PUBLIC_KEY = "pk_test_51InV80FfDd5uE1gz2xsi7IQnd86nAef3wG4wwNrM3fXY9nVTr3QVSM1rE0nJJ8aeUKJGCpbPmFpUVlPzO3wm6LD300F5eVcmZl";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

// Export this component with UI for cleaner and more organized way
function Donate() {
    const history = useHistory();
    const { profileDispatch } = useContext(GlobalContext);
    useEffect(() => {
        document.body.style.backgroundColor = "white";
        GetProfiles(history)(profileDispatch);
    }, [history, profileDispatch]);
    return (
        <Elements stripe={stripeTestPromise}>
            <DonateUI form={DonateForm()} />
        </Elements>
    );
}
export default Donate;
