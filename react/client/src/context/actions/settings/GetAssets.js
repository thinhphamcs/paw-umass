// Import
import { CONNECTION_ERROR, ASSET_ERROR, ASSET_LOADING, ASSET_SUCCESS } from "../../../constants/actionTypes";
import { axiosInstance } from "../../../helpers/axiosInstance";

// Using interceptor (response interceptor)
export const GetAssets = (history) => (dispatch) => {
    dispatch({
        type: ASSET_LOADING
    });
    axiosInstance(history)
        .get('/settings/asset')
        .then((res) => {
            dispatch({
                type: ASSET_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: ASSET_ERROR,
                payload: err.response ? err.response.data : CONNECTION_ERROR
            });
        });
}