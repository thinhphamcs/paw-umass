// Import
import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthDispatch } from '../../context/auth';
// GraphQL mutation
import { gql, useMutation } from '@apollo/client';

// GraphQL mutation
const CHANGE_PASSWORD = gql`
    mutation changePassword($newPassword: String! $confirmNewPassword: String!) {
        changePassword(newPassword: $newPassword confirmNewPassword: $confirmNewPassword) {
            password
        }
    }
`;

// Export it as a form so we can use it as props
export function ForgotChangeForm() {
    // Hook
    const [variables, setVariables] = useState({
        newPassword: '',
        confirmNewPassword: '',
    });

    const [errors, setErrors] = useState({});

    // use history from react-router-dom to redirect
    const history = useHistory();

    // Use this for disabling the button
    let forgotChangeFormValid = true;

    // onChange function
    const onChange = (event) => {
        setVariables({
            ...variables,
            [event.target.name]: event.target.value
        });
    };

    // Function to check if user have typed something
    // if user input the first/last/email/phone field then we open the button
    if (variables.newPassword.length && variables.confirmNewPassword.length) {
        forgotChangeFormValid = false;
    }
    // if user input nothing then we disabled the button
    else {
        forgotChangeFormValid = true;
    }

    const dispatch = useAuthDispatch();

    // GraphQL mutation, think of this as global provider    
    const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD, {
        onCompleted(data) {
            dispatch({ type: 'LOGOUT' });
            history.push("/login");
        },
        onError(error) {
            setErrors(error.graphQLErrors[0].extensions.errors);
        }
    });

    // onSubmit function that will submit the form and the dispatch
    const onSubmit = (event) => {
        event.preventDefault(); // Prevent react from refresh the page and put data on URL
        changePassword({ variables }); // GraphQL mutation // Error when it is not named "variables"
    }

    // Return this so we can use these as props on the UI (front end)
    return { variables, errors, loading, forgotChangeFormValid, onSubmit, onChange };
}