// Import
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthDispatch } from '../../context/auth';
// GraphQL mutation
import { gql, useLazyQuery } from '@apollo/client';
// GraphQL mutation
const LOGIN_USER = gql`
    query login($email: String! $password: String!) {
        login(email: $email password: $password) {
            firstName lastName email phone, token, availability, donation
        }
    }
`;
// Export it as a form so we can use it as props
export function LoginForm() {
    // Hook
    const [variables, setVariables] = useState({
        email: '',
        password: '',
        checkBox: '',
    });
    const [errors, setErrors] = useState({});
    // use history from react-router-dom to redirect
    const history = useHistory();
    // onChange function
    const onChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setVariables({
            ...variables,
            [event.target.name]: value
        });
    };
    // Function to check if user have typed everything
    const loginFormValid = !variables.email?.length || !variables.password?.length
    const dispatch = useAuthDispatch();
    // GraphQL mutation, think of this as global provider    
    const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
        onCompleted(data) {
            dispatch({ type: 'LOGIN', payload: data.login });
            history.push("/settings/profile");
        },
        onError(error) {
            setErrors(error.graphQLErrors[0].extensions.errors);
        }
    });
    // onSubmit function that will submit the form and the dispatch
    const onSubmit = (event) => {
        event.preventDefault(); // Prevent react from refresh the page and put data on URL
        loginUser({ variables }); // GraphQL mutation // Error when it is not named "variables"
    }
    // Return this so we can use these as props on the UI (front end)
    return { variables, errors, loading, loginFormValid, onSubmit, onChange };
}