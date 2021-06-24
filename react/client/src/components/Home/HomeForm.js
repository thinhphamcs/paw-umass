// // Import
// import { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import { useAuthDispatch } from '../../context/auth';
// // GraphQL mutation
// import { gql, useQuery, useMutation } from '@apollo/client';
// // GraphQL mutation
// const GET_ASSETS = gql`
//     query getAssets {
//         getAssets {
//             email, phone, photo, petName, breed, description, howLong, date, token, availability
//         }
//     }
// `;
// // GraphQL mutation
// const GET_USER = gql`
//     query getUser {
//         getUser {
//             firstName email phone availability
//         }
//     }
// `;
// // GraphQL mutation
// const ORDER_CHECK = gql`
//     mutation orderCheck($token: String!) {
//         orderCheck(token: $token) {
//             status message
//         }
//     }
// `;
// // GraphQL mutation
// const RESET_ORDER = gql`
//     mutation resetOrder {
//         resetOrder {
//             status message
//         }
//     }
// `;
// // Export it as a form so we can use it as props
// export function HomeForm() {
//     // Hook
//     const [variables, setVariables] = useState({
//         search: '',
//     });
//     let displayPhone = "";
//     // use history from react-router-dom to redirect
//     const history = useHistory();
//     // onChange function
//     const onChange = (event) => {
//         setVariables({
//             ...variables,
//             search: event.target.value
//         });
//     };
//     const dispatch = useAuthDispatch();
//     // GraphQL mutation, think of this as global provider
//     const { data: assetData } = useQuery(GET_ASSETS);
//     const { data: userData, error: userError } = useQuery(GET_USER);
//     if (userData) {
//         displayPhone = userData.getUser.phone.substring(0, 2)
//             .concat(" (" + userData.getUser.phone.substring(2, 5) + ")")
//             .concat(" " + userData.getUser.phone.substring(5, 8))
//             .concat(" - " + userData.getUser.phone.substring(8, 15));

//     }
//     if (userError) {
//         dispatch({ type: 'LOGOUT' });
//         history.push("/");
//     }
//     const [orderCheck] = useMutation(ORDER_CHECK, {
//         onCompleted(data) {
//             if (data) {
//                 window.location.reload();
//             }
//         }
//     });
//     // onSubmit function that will submit the form and the dispatch
//     const onSubmit = (token) => {
//         if (assetData.getAssets && userData.getUser) {
//             assetData.getAssets.filter((value) => {
//                 if (value.token === token) {
//                     if (value.availability === false && userData.getUser.availability === false) {
//                         orderCheck({ variables: { token: token } }); // GraphQL mutation // Error when it is not named "variables"
//                     }
//                 }
//             });
//         }
//     }
//     const [resetOrder] = useMutation(RESET_ORDER, {
//         onCompleted(data) {
//             if (data) {
//                 window.location.reload();
//             }
//         }
//     });
//     const resetSubmit = () => {
//         resetOrder();
//     }
//     // Return this so we can use these as props on the UI (front end)
//     return { variables, assetData, userData, displayPhone, onChange, onSubmit, resetSubmit };
// }