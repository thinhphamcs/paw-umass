// Import
import { CHANGE_LOADING, CHANGE_SUCCESS, CHANGE_ERROR } from '../../../constants/actionTypes';
import { axiosInstance } from '../../../helpers/axiosInstance';

// Login function that will send data to backend with dispatch and axios
export const change = ({
    current,
    newPassword,
    confirmPassword,
}) => (dispatch) => {
    dispatch({
        type: CHANGE_LOADING,
    });
    axiosInstance()
        .post("/settings/change", {
            current,
            newPassword,
            confirmPassword,
        })
        .then(res => {
            dispatch({
                type: CHANGE_SUCCESS,
                payload: res.data,
            });
        })
        .catch(err => {
            dispatch({
                type: CHANGE_ERROR,
                payload: err.response ? err.response.data : "COULD NOT CONNECT",
            });
        });
}