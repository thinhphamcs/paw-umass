// Import
import {
    REGISTER_LOADING, REGISTER_SUCCESS, REGISTER_ERROR,
    LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_ERROR,
    PROFILE_LOADING, PROFILE_SUCCESS, PROFILE_ERROR,
    DEACTIVATE_LOADING, DEACTIVATE_SUCCESS, DEACTIVATE_ERROR,
    CHANGE_LOADING, CHANGE_SUCCESS, CHANGE_ERROR,
    FORGOT_LOADING, FORGOT_SUCCESS, FORGOT_ERROR
} from "../../constants/actionTypes";

// Reducer function with states and data payload
const reducerAuth = (state, { payload, type }) => {
    switch (type) {
        case REGISTER_LOADING:
        case LOGIN_LOADING:
        case PROFILE_LOADING:
        case DEACTIVATE_LOADING:
        case CHANGE_LOADING:
        case FORGOT_LOADING:
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
        case DEACTIVATE_SUCCESS:
        case CHANGE_SUCCESS:
        case FORGOT_SUCCESS:
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
        case DEACTIVATE_ERROR:
        case CHANGE_ERROR:
        case FORGOT_ERROR:
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