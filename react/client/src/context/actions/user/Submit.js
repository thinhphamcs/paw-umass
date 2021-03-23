// Import
import { SUBMIT_SUCCESS, SUBMIT_ERROR, SUBMIT_LOADING } from '../../../constants/actionTypes';
import { axiosInstance } from '../../../helpers/axiosInstance';

// Register function that will send data to backend with dispatch and axios
export const submit = ({
    petName,
    age,
    photo,
    description,
    day,
    week,
    forever
}) => (dispatch) => {
    dispatch({
        type: SUBMIT_LOADING,
    });
    axiosInstance()
        .post("/user/submit", {
            petName,
            age,
            photo,
            description,
            day,
            week,
            forever
        })
        .then(res => {
            dispatch({
                type: SUBMIT_SUCCESS,
                payload: res.data,
            });
        })
        .catch(err => {
            dispatch({
                type: SUBMIT_ERROR,
                payload: err.response ? err.response.data : "COULD NOT CONNECT",
            });
        });
}