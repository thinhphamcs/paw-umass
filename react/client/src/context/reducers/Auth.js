import { REGISTER_LOADING, REGISTER_SUCCESS, REGISTER_ERROR } from "../../constants/actionTypes";

const reducerAuth = (state, { payload, type }) => {
    switch (type) {
        case REGISTER_LOADING:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    error: false,
                    loading: true,
                },
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    loading: false,
                    data: payload,
                },
            };
        case REGISTER_ERROR:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    loading: true,
                    error: payload,
                },
            };
        default:
            return state;
    }
}

export default reducerAuth;