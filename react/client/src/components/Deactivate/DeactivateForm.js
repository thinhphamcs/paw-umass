// Import
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthDispatch } from '../../context/auth';
// GraphQL mutation
import { gql, useQuery, useMutation } from '@apollo/client';
// GraphQL mutation
const GET_USER = gql`
    query getUser {
        getUser {
            token
        }
    }
`;
// GraphQL mutation
const DELETE_PROFILE = gql`
    mutation deleteProfile($password: String!) {
        deleteProfile(password: $password) {
            status message
        }
    }
`;
// Export it as a form so we can use it as props
export function DeactivateForm() {
    // Hook
    const [variables, setVariables] = useState({
        password: '',
    });
    const [errors, setErrors] = useState({});
    // use history from react-router-dom to redirect
    const history = useHistory();
    // Use this for disabling the button
    let deactivateFormValid = true;
    // onChange function
    const onChange = (event) => {
        setVariables({
            ...variables,
            [event.target.name]: event.target.value
        });
    };
    // Function to check if user have typed something
    // if user input the first/last/email/phone field then we open the button
    if (variables.password.length) {
        deactivateFormValid = false;
    }
    // if user input nothing then we disabled the button
    else {
        deactivateFormValid = true;
    }
    const dispatch = useAuthDispatch();
    // GraphQL mutation, think of this as global provider    
    const { error } = useQuery(GET_USER);
    const [deleteProfile, { loading }] = useMutation(DELETE_PROFILE, {
        onCompleted(data) {
            dispatch({ type: 'LOGOUT' });
            history.push("/");
        },
        onError(error) {
            setErrors(error.graphQLErrors[0].extensions.errors);
        }
    });
    if (error) {
        dispatch({ type: 'LOGOUT' });
        history.push("/");
    }
    // onSubmit function that will submit the form and the dispatch
    const onSubmit = (event) => {
        event.preventDefault(); // Prevent react from refresh the page and put data on URL
        deleteProfile({ variables }); // GraphQL mutation // Error when it is not named "variables"
    }
    // Return this so we can use these as props on the UI (front end)
    return { variables, loading, errors, deactivateFormValid, onSubmit, onChange };
}