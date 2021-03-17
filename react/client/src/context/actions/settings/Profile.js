// Import
import { PROFILE_SUCCESS, PROFILE_ERROR, PROFILE_LOADING } from '../../../constants/actionTypes';
import { axiosInstance } from '../../../helpers/axiosInstance';

// Login function that will send data to backend with dispatch and axios
export const profile = ({
    firstName,
    lastName,
    email,
    phone
}) => (dispatch) => {
    dispatch({
        type: PROFILE_LOADING,
    });
    axiosInstance()
        .post("/settings/update", {
            firstName,
            lastName,
            email,
            phone
        })
        .then(res => {
            if (localStorage.checkBox) {
                if (res.data.firstName) {
                    localStorage.firstName = res.data.firstName;
                    dispatch({
                        type: PROFILE_SUCCESS,
                        payload: res.data,
                    });
                }
                if (res.data.lastName) {
                    localStorage.lastName = res.data.lastName;
                    dispatch({
                        type: PROFILE_SUCCESS,
                        payload: res.data,
                    });
                }
                if (res.data.email) {
                    localStorage.email = res.data.email;
                    dispatch({
                        type: PROFILE_SUCCESS,
                        payload: res.data,
                    });
                }
                if (res.data.phone) {
                    localStorage.phone = res.data.phone;
                    dispatch({
                        type: PROFILE_SUCCESS,
                        payload: res.data,
                    });
                }
                if (res.data.firstName && res.data.lastName && res.data.email && res.data.phone) {
                    localStorage.firstName = res.data.firstName;
                    localStorage.lastName = res.data.lastName;
                    localStorage.email = res.data.email;
                    localStorage.phone = res.data.phone;
                    dispatch({
                        type: PROFILE_SUCCESS,
                        payload: res.data,
                    });
                }
            }
            if (sessionStorage.checkBox) {
                if (res.data.firstName) {
                    sessionStorage.firstName = res.data.firstName;
                    dispatch({
                        type: PROFILE_SUCCESS,
                        payload: res.data,
                    });
                }
                if (res.data.lastName) {
                    sessionStorage.lastName = res.data.lastName;
                    dispatch({
                        type: PROFILE_SUCCESS,
                        payload: res.data,
                    });
                }
                if (res.data.email) {
                    sessionStorage.email = res.data.email;
                    dispatch({
                        type: PROFILE_SUCCESS,
                        payload: res.data,
                    });
                }
                if (res.data.phone) {
                    sessionStorage.phone = res.data.phone;
                    dispatch({
                        type: PROFILE_SUCCESS,
                        payload: res.data,
                    });
                }
                if (res.data.firstName && res.data.lastName && res.data.email && res.data.phone) {
                    sessionStorage.firstName = res.data.firstName;
                    sessionStorage.lastName = res.data.lastName;
                    sessionStorage.email = res.data.email;
                    sessionStorage.phone = res.data.phone;
                    dispatch({
                        type: PROFILE_SUCCESS,
                        payload: res.data,
                    });
                }
            }
        })
        .catch(err => {
            dispatch({
                type: PROFILE_ERROR,
                payload: err.response ? err.response.data : "COULD NOT CONNECT",
            });
        });
}