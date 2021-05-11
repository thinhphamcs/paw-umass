// Import
import { DONATE_LOADING, DONATE_SUCCESS, DONATE_ERROR, CONNECTION_ERROR } from '../../../constants/actionTypes';
import { axiosInstance } from '../../../helpers/axiosInstance';

// Register function that will send data to backend with dispatch and axios
export const donate = ({
    // email,
    // phone
}) => (dispatch) => {
    dispatch({
        type: DONATE_LOADING,
    });
    axiosInstance()
        .post("/user/donate", {
            // email,
            // phone
        })
        .then(res => {
            dispatch({
                type: DONATE_SUCCESS,
                payload: res.data,
            });
        })
        .catch(err => {
            dispatch({
                type: DONATE_ERROR,
                payload: err.response ? err.response.data : CONNECTION_ERROR
            });
        });
}