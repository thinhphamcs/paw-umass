// Import
import { SUBMIT_LOADING, SUBMIT_SUCCESS, SUBMIT_ERROR, CONNECTION_ERROR } from '../../../constants/actionTypes';
import { axiosInstance } from '../../../helpers/axiosInstance';

// Register function that will send data to backend with dispatch and axios
export const submit = ({
    petName,
    breed,
    photo,
    description,
    radio
}) => (dispatch) => {
    let formData = new FormData();
    formData.append("petName", petName);
    formData.append("breed", breed);
    formData.append("photo", photo);
    formData.append("description", description);
    formData.append("radio", radio);
    dispatch({
        type: SUBMIT_LOADING,
    });
    axiosInstance()
        .post("/user/submit", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
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
                payload: err.response ? err.response.data : CONNECTION_ERROR
            });
        });
}