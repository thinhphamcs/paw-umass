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
const SUBMIT_FORM = gql`
    mutation submit($petName: String!, $breed: String!, $file: Upload!, $description: String!, $radio: String!) {
        submit(petName: $petName, breed: $breed, file: $file, description: $description, radio: $radio) {
            status message
        }
    }
`;

// Export it as a form so we can use it as props
export function SubmitForm() {
    // Hook
    const [variables, setVariables] = useState({
        petName: '',
        breed: '',
        file: '',
        description: '',
        countdown: '',
        radio: ''
    });

    // use history from react-router-dom to redirect
    const history = useHistory();

    // Use this for disabling the button
    let submitFormValid = true;

    // onChange function
    const onChange = (event) => {
        const target = event.target;
        const value = target.type === 'file' ? target.files[0] : target.value;
        setVariables({
            ...variables,
            [event.target.name]: value
        });
    };

    // Function to check if user have typed everything
    if (variables.petName.length && variables.breed.length && variables.description.length && variables.file
        && (variables.radio === "for a day" || variables.radio === "for a week" || variables.radio === "up for adoption")) {
        submitFormValid = false;
    }
    // if user input nothing then we disabled the button
    else {
        submitFormValid = true;
    }

    // Function to check for 100 characters in textarea
    const limitText = (limitField, limitNum) => {
        if (limitField.length > limitNum) {
            limitField = limitField.value.substring(0, limitNum);
        } else {
            variables.countdown = limitNum - limitField.length;
        }
    }

    const dispatch = useAuthDispatch();

    // GraphQL mutation, think of this as global provider  
    const { error } = useQuery(GET_USER);
    const [submit, { data: submitData, error: submitError, loading }] = useMutation(SUBMIT_FORM, {
        onCompleted(submitData) {
            history.push("/home");
        },
    });
    if (error) {
        dispatch({ type: 'LOGOUT' });
        history.push("/");
    }
    // onSubmit function that will submit the form and the dispatch
    const onSubmit = (event) => {
        event.preventDefault(); // Prevent react from refresh the page and put data on URL
        submit({ variables }); // GraphQL mutation // Error when it is not named "variables"
    }

    // Return this so we can use these as props on the UI (front end)
    return { variables, loading, submitError, submitFormValid, onChange, onSubmit, limitText };
}