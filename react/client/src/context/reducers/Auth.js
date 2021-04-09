// Import
import {
    REGISTER_LOADING, REGISTER_SUCCESS, REGISTER_ERROR,
    LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_ERROR,
    UPDATE_LOADING, UPDATE_SUCCESS, UPDATE_ERROR,
    DEACTIVATE_LOADING, DEACTIVATE_SUCCESS, DEACTIVATE_ERROR,
    CHANGE_LOADING, CHANGE_SUCCESS, CHANGE_ERROR,
    FORGOT_LOADING, FORGOT_SUCCESS, FORGOT_ERROR,
    SUBMIT_LOADING, SUBMIT_SUCCESS, SUBMIT_ERROR
} from "../../constants/actionTypes";

// Reducer function with states and data payload
const reducerAuth = (state, { payload, type }) => {
    switch (type) {
        case REGISTER_LOADING:
        case LOGIN_LOADING:
        case UPDATE_LOADING:
        case DEACTIVATE_LOADING:
        case CHANGE_LOADING:
        case FORGOT_LOADING:
        case SUBMIT_LOADING:
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
        case UPDATE_SUCCESS:
        case DEACTIVATE_SUCCESS:
        case CHANGE_SUCCESS:
        case FORGOT_SUCCESS:
        case SUBMIT_SUCCESS:
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
        case UPDATE_ERROR:
        case DEACTIVATE_ERROR:
        case CHANGE_ERROR:
        case FORGOT_ERROR:
        case SUBMIT_ERROR:
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