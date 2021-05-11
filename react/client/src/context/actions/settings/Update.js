// Import
import { UPDATE_LOADING, UPDATE_SUCCESS, UPDATE_ERROR, CONNECTION_ERROR } from '../../../constants/actionTypes';
import { axiosInstance } from '../../../helpers/axiosInstance';

// Login function that will send data to backend with dispatch and axios
export const update = ({
    firstName,
    lastName,
    email,
    phone
}) => (dispatch) => {
    dispatch({
        type: UPDATE_LOADING,
    });
    axiosInstance()
        .post("/settings/update", {
            firstName,
            lastName,
            email,
            phone
        })
        .then(res => {
            // Determine if user is store data in localStorage or sessionStorage
            // Then change data accordingly
            if (localStorage.checkBox) {
                if (res.data.firstName) {
                    localStorage.firstName = res.data.firstName;
                    dispatch({
                        type: UPDATE_SUCCESS,
                        payload: res.data,
                    });
                }
                if (res.data.lastName) {
                    localStorage.lastName = res.data.lastName;
                    dispatch({
                        type: UPDATE_SUCCESS,
                        payload: res.data,
                    });
                }
                if (res.data.email) {
                    localStorage.email = res.data.email;
                    dispatch({
                        type: UPDATE_SUCCESS,
                        payload: res.data,
                    });
                }
                if (res.data.phone) {
                    localStorage.phone = res.data.phone;
                    dispatch({
                        type: UPDATE_SUCCESS,
                        payload: res.data,
                    });
                }
                if (res.data.firstName && res.data.lastName && res.data.email && res.data.phone) {
                    localStorage.firstName = res.data.firstName;
                    localStorage.lastName = res.data.lastName;
                    localStorage.email = res.data.email;
                    localStorage.phone = res.data.phone;
                    dispatch({
                        type: UPDATE_SUCCESS,
                        payload: res.data,
                    });
                }
            }
            if (sessionStorage.checkBox) {
                if (res.data.firstName) {
                    sessionStorage.firstName = res.data.firstName;
                    dispatch({
                        type: UPDATE_SUCCESS,
                        payload: res.data,
                    });
                }
                if (res.data.lastName) {
                    sessionStorage.lastName = res.data.lastName;
                    dispatch({
                        type: UPDATE_SUCCESS,
                        payload: res.data,
                    });
                }
                if (res.data.email) {
                    sessionStorage.email = res.data.email;
                    dispatch({
                        type: UPDATE_SUCCESS,
                        payload: res.data,
                    });
                }
                if (res.data.phone) {
                    sessionStorage.phone = res.data.phone;
                    dispatch({
                        type: UPDATE_SUCCESS,
                        payload: res.data,
                    });
                }
                if (res.data.firstName && res.data.lastName && res.data.email && res.data.phone) {
                    sessionStorage.firstName = res.data.firstName;
                    sessionStorage.lastName = res.data.lastName;
                    sessionStorage.email = res.data.email;
                    sessionStorage.phone = res.data.phone;
                    dispatch({
                        type: UPDATE_SUCCESS,
                        payload: res.data,
                    });
                }
            }
        })
        .catch(err => {
            dispatch({
                type: UPDATE_ERROR,
                payload: err.response ? err.response.data : CONNECTION_ERROR
            });
        });
}