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
            localStorage.token = res.data.token;
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