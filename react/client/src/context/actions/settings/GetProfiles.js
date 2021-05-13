// Import
import { CONNECTION_ERROR, PROFILE_ERROR, PROFILE_LOADING, PROFILE_SUCCESS } from "../../../constants/actionTypes";
import { axiosInstance } from "../../../helpers/axiosInstance";

// Using interceptor (response interceptor)
export const GetProfiles = (history) => (dispatch) => {
    dispatch({
        type: PROFILE_LOADING
    });
    axiosInstance(history)
        .get('/settings/profile')
        .then((res) => {
            if (localStorage.checkBox) {
                localStorage.firstName = res.data.data.firstName[0];
                localStorage.lastName = res.data.data.lastName[0];
                localStorage.email = res.data.data.email[0];
                localStorage.phone = res.data.data.phone[0].substring(0, 2)
                    .concat(" (" + res.data.data.phone[0].substring(2, 5) + ")")
                    .concat(" " + res.data.data.phone[0].substring(5, 8))
                    .concat(" - " + res.data.data.phone[0].substring(8, 15));
                localStorage.donation = res.data.data.donation[0];
                localStorage.availability = res.data.data.availability[0];
            }
            if (sessionStorage.checkBox) {
                sessionStorage.firstName = res.data.data.firstName[0];
                sessionStorage.lastName = res.data.data.lastName[0];
                sessionStorage.email = res.data.data.email[0];
                sessionStorage.phone = res.data.data.phone[0].substring(0, 2)
                    .concat(" (" + res.data.data.phone[0].substring(2, 5) + ")")
                    .concat(" " + res.data.data.phone[0].substring(5, 8))
                    .concat(" - " + res.data.data.phone[0].substring(8, 15));
                sessionStorage.donation = res.data.data.donation[0];
                sessionStorage.availability = res.data.data.availability[0];
            }
            dispatch({
                type: PROFILE_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: PROFILE_ERROR,
                payload: err.response ? err.response.data : CONNECTION_ERROR
            });
        });
}