// Import
import { FORGOT_LOADING, FORGOT_SUCCESS, FORGOT_ERROR } from '../../../constants/actionTypes';
import { axiosInstance } from '../../../helpers/axiosInstance';

// Login function that will send data to backend with dispatch and axios
export const forgot = ({
    input
}) => (dispatch) => {
    dispatch({
        type: FORGOT_LOADING,
    });
    axiosInstance()
        .post("/auth/forgot", {
            input
        })
        .then(res => {
            sessionStorage.token = res.data.token; // Temporary token
            dispatch({
                type: FORGOT_SUCCESS,
                payload: res.data,
            });
        })
        .catch(err => {
            dispatch({
                type: FORGOT_ERROR,
                payload: err.response ? err.response.data : "COULD NOT CONNECT",
            });
        });
}