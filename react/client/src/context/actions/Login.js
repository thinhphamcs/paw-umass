// Import
import { LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_ERROR } from '../../constants/actionTypes';
import axiosInstance from '../../helpers/axios';

// Login function that will send data to backend with dispatch and axios
export const login = ({
    email,
    password,
    checkBox
}) => (dispatch) => {
    dispatch({
        type: LOGIN_LOADING,
    });
    axiosInstance
        .post("/auth/login", {
            email,
            password,
            checkBox
        })
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
        })
        .catch(err => {
            dispatch({
                type: LOGIN_ERROR,
                payload: err.response ? err.response.data : "COULD NOT CONNECT",
            });
        });
}