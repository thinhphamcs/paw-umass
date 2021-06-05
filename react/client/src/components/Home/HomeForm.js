// Import
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthDispatch } from '../../context/auth';
// GraphQL mutation
import { gql, useQuery } from '@apollo/client';

// GraphQL mutation
const GET_ASSETS = gql`
    query getAssets {
        getAssets {
            email, phone petName, breed, description, howLong, date
        }
    }
`;

// GraphQL mutation
const GET_IMAGES = gql`
    query getImages {
        getImages {
            url
        }
    }
`;

// GraphQL mutation
const GET_USER = gql`
    query getUser {
        getUser {
            email
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
    // const queryMultiple = () => {
    //     const assets = useQuery(GET_ASSETS);
    //     const images = useQuery(GET_IMAGES);
    //     return assets, images;
    // }
    const { data: assetData, error: assetError } = useQuery(GET_ASSETS);
    const { data: imageData } = useQuery(GET_IMAGES);

    console.log(assetData);
    console.log(imageData);
    const { error } = useQuery(GET_USER);
    if (error) {
        dispatch({ type: 'LOGOUT' });
        history.push("/");
    }
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

    return { variables, error, onChange };
}