// Import
import { useState, useContext, useEffect } from 'react';
// import { donate } from '../../context/actions/user/Donate';
import { GlobalContext } from '../../context/Provider';
import { useHistory } from 'react-router-dom';



// Export it as a form so we can use it as props
export function DonateForm() {
    // Hook

    // const [form, setForm] = useState({
    //     // email: '',
    //     // phone: ''
    // });



    // use history from react-router-dom to redirect
    const history = useHistory();

    // Use this for disabling the button
    // let donateFormValid = true;

    // Dispatch, need to understand this
    const { authDispatch, authState: { auth: { loading, error, data }, }, } = useContext(GlobalContext);

    // useEffect so we can use history to redirect
    useEffect(() => {
        if (data) {
            // if (data.forgot) {
            //     history.push('/change');
            // }
        }
        else {
            history.push('/user/donate');
        }
    }, [data, history]);

    // useEffect(() => {
    //     if (error) {
    //         console.log(error);
    //     }
    // }, [error]);

    // onChange function
    // const onChange = (event) => {
    //     setForm({
    //         ...form,
    //         [event.target.name]: event.target.value
    //     });
    // };

    // Function to check if user have typed something
    // if user input the first/last/email/phone field then we open the button
    // if (form.email.length && !form.phone) {
    //     forgotFormValid = false;
    // }
    // else if (!form.email.length && form.phone) {
    //     forgotFormValid = false;
    // }
    // // if user input nothing then we disabled the button
    // else {
    //     forgotFormValid = true;
    // }

    // onSubmit function that will submit the form and the dispatch


    // Return this so we can use these as props on the UI (front end)
    // form, onChange, donateFormValid, error, loading, 
    return {};
}