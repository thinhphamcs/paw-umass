// Import
import { useState, useContext, useEffect } from 'react';
import { register } from '../../context/actions/auth/Register';
import { GlobalContext } from '../../context/Provider';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

const REGISTER_USER = gql`
    mutation register($firstName: String! $lastName: String! $email: String! $password: String! $confirmPassword: String! $phone: String!) {
        register(firstName: $firstName lastName: $lastName email: $email password: $password confirmPassword: $confirmPassword phone: $phone) {
            firstName lastName email phone
        }
    }
`;

// Export it as a form so we can use it as props
export function RegisterForm() {
    // Hook
    const [variables, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
    });

    const [errors, setErrors] = useState({})

    // // use history from react-router-dom to redirect
    const history = useHistory();

    // // Dispatch, need to understand this
    // // const { authDispatch, authState: { auth: { loading, error, data }, }, } = useContext(GlobalContext);

    // // useEffect so we can use history to redirect
    // useEffect(() => {
    //     if (data) {
    //         if (data.message) {
    //             history.push('/login');
    //             data.message = "";
    //         }
    //     }
    //     else {
    //         history.push('/register');
    //     }
    // }, [data, history]);



    // useEffect(() => {
    //     if (error) {
    //         console.log(error);
    //     }
    // }, [error]);


    // onChange function
    const onChange = (event) => {
        setForm({
            ...variables,
            [event.target.name]: event.target.value
        });
    };

    // onChange function for child component Phone
    const phoneChange = (value) => {
        setForm({
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


    const [registerUser, { loading, data, error }] = useMutation(REGISTER_USER, {
        update(_, __) {
            // console.log(res);
            history.push("/login");
        },
        onError(error) {
            // console.log(error.graphQLErrors[0].extensions.errors);
            setErrors(error.graphQLErrors[0].extensions.errors);
        }
    });

    // onSubmit function that will submit the form and the dispatch
    const onSubmit = (event) => {
        // register(form)(authDispatch);
        event.preventDefault();
        registerUser({ variables });
    }

    // Return this so we can use these as props on the UI (front end)
    return { variables, errors, loading, registerFormValid, onSubmit, onChange, phoneChange };
}