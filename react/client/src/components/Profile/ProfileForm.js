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
            firstName lastName email phone
        }
    }
`;

// GraphQL mutation
const UPDATE_USER = gql`
    mutation profileUpdate($firstName: String! $lastName: String! $email: String! $phone: String!) {
        profileUpdate(firstName: $firstName lastName: $lastName email: $email phone: $phone) {
            firstName lastName email phone
        }
    }
`;

// Export it as a form so we can use it as props
export function ProfileForm() {
    // Hook
    const [variables, setVariables] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });
    const [errors, setErrors] = useState({});
    let displayPhone = "";
    // use history from react-router-dom to redirect
    const history = useHistory();

    // Use this for disabling the button
    let updateFormValid = true;

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
    if (variables.firstName.length || variables.lastName.length || variables.email.length || variables.phone) {
        // If user input the first name and another other we disabled the button
        if (variables.firstName.length && (variables.lastName.length || variables.email.length || variables.phone)) {
            // If user input everything then we open the button again
            if (variables.firstName.length && variables.lastName.length && variables.email.length && variables.phone) {
                updateFormValid = false;
            }
            else {
                updateFormValid = true;
            }
        }
        // If user input the last name and another other we disabled the button
        else if (variables.lastName.length && (variables.firstName.length || variables.email.length || variables.phone)) {
            // If user input everything then we open the button again
            if (variables.firstName.length && variables.lastName.length && variables.email.length && variables.phone) {
                updateFormValid = false;
            }
            else {
                updateFormValid = true;
            }
        }
        // If user input the email field and another other we disabled the button
        else if (variables.email.length && (variables.firstName.length || variables.lastName.length || variables.phone)) {
            // If user input everything then we open the button again
            if (variables.firstName.length && variables.lastName.length && variables.email.length && variables.phone) {
                updateFormValid = false;
            }
            else {
                updateFormValid = true;
            }
        }
        // If user input the phone field and another other we disabled the button
        else if (variables.phone && (variables.firstName.length || variables.lastName.length || variables.email.length)) {
            // If user input everything then we open the button again
            if (variables.firstName.length && variables.lastName.length && variables.email.length && variables.phone) {
                updateFormValid = false;
            }
            else {
                updateFormValid = true;
            }
        }
        else {
            updateFormValid = false;
        }

    }
    // if user input nothing then we disabled the button
    else {
        updateFormValid = true;
    }

    const dispatch = useAuthDispatch();

    // GraphQL mutation, think of this as global provider    
    const { loading, data, error } = useQuery(GET_USER);
    const [updateUser] = useMutation(UPDATE_USER, {
        onCompleted(data) {
            if (data) {
                window.location.reload();
            }
        },
        onError(error) {
            setErrors(error.graphQLErrors[0].extensions.errors);
        }
    });
    if (error) {
        dispatch({ type: 'LOGOUT' });
        history.push('/login');
    }
    if (data) {
        displayPhone = data.getUser.phone.substring(0, 2)
            .concat(" (" + data.getUser.phone.substring(2, 5) + ")")
            .concat(" " + data.getUser.phone.substring(5, 8))
            .concat(" - " + data.getUser.phone.substring(8, 15));
    }
    // onSubmit function that will submit the form and the dispatch
    const onSubmit = (event) => {
        event.preventDefault(); // Prevent react from refresh the page and put data on URL
        updateUser({ variables }); // GraphQL mutation // Error when it is not named "variables"
    }
    // Return this so we can use these as props on the UI (front end)
    return { variables, loading, data, displayPhone, errors, updateFormValid, onSubmit, onChange, phoneChange };
}