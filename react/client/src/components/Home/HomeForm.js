// Import
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthDispatch } from '../../context/auth';
// GraphQL mutation
import { gql, useQuery } from '@apollo/client';

// GraphQL mutation
const GET_IMAGES = gql`
    query uploads($Key: String!) {
        uploads(Key: $Key ) {
            File
        }
    }
`;

// Export it as a form so we can use it as props
export function HomeForm() {
    // Hook
    const [variables, setVariables] = useState({
        search: '',
    });

    const [errors, setErrors] = useState({});

    // use history from react-router-dom to redirect
    const history = useHistory();

    // onChange function
    const onChange = (event) => {
        setVariables({
            ...variables,
            search: event.target.value
        });
    };

    const dispatch = useAuthDispatch();

    // GraphQL mutation, think of this as global provider    
    const { loading, data, error } = useQuery(GET_IMAGES);

    console.log(data);

    // onSubmit function that will submit the form and the dispatch
    // const onSubmit = (event) => {
    //     event.preventDefault(); // Prevent react from refresh the page and put data on URL
    //     console.log(variables)
    //     uploadImage({ variables }); // GraphQL mutation // Error when it is not named "variables"
    // }

    // const resetSubmit = () => {
    //     // axiosInstance().post("/user/reset-order").catch(err => { console.log(err); });
    //     // window.location.reload();
    // }

    // Return this so we can use these as props on the UI (front end)
    // resetSubmit
    return { variables, loading, data, error, onChange };
}