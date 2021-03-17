// Import
import { DEACTIVATE_LOADING, DEACTIVATE_SUCCESS, DEACTIVATE_ERROR } from '../../../constants/actionTypes';
import { axiosInstance } from '../../../helpers/axiosInstance';

// Login function that will send data to backend with dispatch and axios
export const deactivate = ({
    password,
}) => (dispatch) => {
    dispatch({
        type: DEACTIVATE_LOADING,
    });
    axiosInstance()
        .post("/settings/deactivate", {
            password
        })
        .then(res => {
            dispatch({
                type: DEACTIVATE_SUCCESS,
                payload: res.data,
            });
        })
        .catch(err => {
            dispatch({
                type: DEACTIVATE_ERROR,
                payload: err.response ? err.response.data : "COULD NOT CONNECT",
            });
        });
}