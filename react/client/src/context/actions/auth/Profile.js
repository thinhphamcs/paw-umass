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
        .post("/auth/profile", {
            firstName,
            lastName,
            email,
            phone
        })
        .then(res => {
            dispatch({
                type: PROFILE_SUCCESS,
                payload: res.data,
            });
        })
        .catch(err => {
            dispatch({
                type: PROFILE_ERROR,
                payload: err.response ? err.response.data : "COULD NOT CONNECT",
            });
        });
}