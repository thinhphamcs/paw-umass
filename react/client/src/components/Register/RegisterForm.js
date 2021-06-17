// Import
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
// GraphQL mutation
import { gql, useMutation } from '@apollo/client';

// GraphQL mutation
const REGISTER_USER = gql`
    mutation register($firstName: String! $lastName: String! $email: String! $password: String! $confirmPassword: String! $phone: String!) {
        register(firstName: $firstName lastName: $lastName email: $email password: $password confirmPassword: $confirmPassword phone: $phone) {
            status, message
        }
    }
`;

// Export it as a form so we can use it as props
export function RegisterForm() {
    // Hook
    const [variables, setVariables] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
    });

    const [errors, setErrors] = useState({});

    // use history from react-router-dom to redirect
    const history = useHistory();

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

    // Function to check if user have typed everything
    const registerFormValid =
        !variables.firstName?.length ||
        !variables.lastName?.length ||
        !variables.email?.length ||
        !variables.password?.length ||
        !variables.confirmPassword?.length ||
        !variables.phone?.length;

    // GraphQL mutation, think of this as global provider    
    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, __) {
            history.push("/login");
        },
        onError(error) {
            setErrors(error.graphQLErrors[0].extensions.errors);
        }
    });

    // onSubmit function that will submit the form and the dispatch
    const onSubmit = (event) => {
        event.preventDefault(); // Prevent react from refresh the page and put data on URL
        registerUser({ variables }); // GraphQL mutation // Error when it is not named "variables"
    }

    // Return this so we can use these as props on the UI (front end)
    return { variables, errors, loading, registerFormValid, onSubmit, onChange, phoneChange };
}