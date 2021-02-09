import { REGISTER_LOADING, REGISTER_SUCCESS, REGISTER_ERROR } from '../../constants/actionTypes';
import axiosInstance from '../../helpers/axios';

export const register = ({
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
    phone
}) => (dispatch) => {
    dispatch({
        type: REGISTER_LOADING,
    });
    axiosInstance
        .post("/auth/register", {
            firstName,
            lastName,
            email,
            password,
            passwordConfirm,
            phone
        })
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });
        })
        .catch(err => {
            dispatch({
                type: REGISTER_ERROR,
                payload: err.response.data,
            });
        });
}