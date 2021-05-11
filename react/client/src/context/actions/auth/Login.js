// Import
import { LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_ERROR, CONNECTION_ERROR } from '../../../constants/actionTypes';
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
            // Determine if user want to store data in localStorage or sessionStorage
            if (res.data.checkBox === true) {
                localStorage.checkBox = true;
                localStorage.token = res.data.token;
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data,
                });
            }
            else {
                sessionStorage.checkBox = false;
                sessionStorage.token = res.data.token;
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data,
                });
            }
        })
        .catch(err => {
            dispatch({
                type: LOGIN_ERROR,
                payload: err.response ? err.response.data : CONNECTION_ERROR
            });
        });
}