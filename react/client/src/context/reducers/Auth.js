// Import
import {
    REGISTER_LOADING,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    PROFILE_LOADING,
    PROFILE_SUCCESS,
    PROFILE_ERROR
} from "../../constants/actionTypes";

// Reducer function with states and data payload
const reducerAuth = (state, { payload, type }) => {
    switch (type) {
        case REGISTER_LOADING:
        case LOGIN_LOADING:
        case PROFILE_LOADING:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    error: false,
                    loading: true,
                },
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
        case PROFILE_SUCCESS:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    loading: false,
                    data: payload,
                },
            };
        case REGISTER_ERROR:
        case LOGIN_ERROR:
        case PROFILE_ERROR:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    loading: false,
                    error: payload,
                },
            };
        default:
            return state;
    }
}

export default reducerAuth;