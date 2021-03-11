// Import
import { LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_LOADING } from '../../../constants/actionTypes';
import { axiosInstance } from '../../../helpers/axiosInstance';

// Login function that will send data to backend with dispatch and axios
export const login = ({
    email,
    password,
    checkBox
}) => (dispatch) => {
    dispatch({
        type: LOGIN_LOADING,
    });
    axiosInstance()
        .post("/auth/login", {
            email,
            password,
            checkBox
        })
        .then(res => {
            if (res.data.checkBox === true) {
                console.log(res);
                localStorage.token = res.data.token;
                localStorage.firstName = res.data.data.firstName[0];
                localStorage.lastName = res.data.data.lastName[0];
                localStorage.email = res.data.data.email[0];
                localStorage.phone = res.data.data.phone[0];
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data,
                });
            }
            else {
                sessionStorage.token = res.data.token;
                sessionStorage.firstName = res.data.data.firstName[0];
                sessionStorage.lastName = res.data.data.lastName[0];
                sessionStorage.email = res.data.data.email[0];
                sessionStorage.phone = res.data.data.phone[0];
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data,
                });
            }
        })
        .catch(err => {
            dispatch({
                type: LOGIN_ERROR,
                payload: err.response ? err.response.data : "COULD NOT CONNECT",
            });
        });
}