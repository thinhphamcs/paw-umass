// Import
import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthDispatch } from '../../context/auth';
// GraphQL mutation
import { gql, useLazyQuery } from '@apollo/client';

// GraphQL mutation
const CHECK_USER = gql`
    query checkUser($email: String $phone: String) {
        checkUser(email: $email phone: $phone) {
            email phone token
        }
    }
`;


// Export it as a form so we can use it as props
export function ForgotForm() {
    // Hook
    const [variables, setVariables] = useState({
        email: '',
        phone: ''
    });

    const [errors, setErrors] = useState({});

    // use history from react-router-dom to redirect
    const history = useHistory();

    // Use this for disabling the button
    let forgotFormValid = true;

    // onChange function
    const onChange = (event) => {
        setVariables({
            ...variables,
            [event.target.name]: event.target.value
        });
    };

    // onChange function for child component Phone
    const phoneChange = (value) => {
        setVariables({
            ...variables,
            phone: value
        });
    }

    // Function to check if user have typed something
    // if user input the first/last/email/phone field then we open the button
    if (variables.email.length && !variables.phone) {
        forgotFormValid = false;
    }
    else if (!variables.email.length && variables.phone) {
        forgotFormValid = false;
    }
    // if user input nothing then we disabled the button
    else {
        forgotFormValid = true;
    }

    const dispatch = useAuthDispatch();

    // GraphQL mutation, think of this as global provider    
    const [checkUser, { loading }] = useLazyQuery(CHECK_USER, {
        onCompleted(data) {
            dispatch({ type: 'LOGIN', payload: data.checkUser });
            history.push("/change");
        },
        onError(error) {
            setErrors(error.graphQLErrors[0].extensions.errors);
        }
    });

    // onSubmit function that will submit the form and the dispatch
    const onSubmit = (event) => {
        event.preventDefault(); // Prevent react from refresh the page and put data on URL
        checkUser({ variables }); // GraphQL mutation // Error when it is not named "variables"
    }

    // Return this so we can use these as props on the UI (front end)
    return { variables, loading, errors, forgotFormValid, onSubmit, onChange, phoneChange };
}