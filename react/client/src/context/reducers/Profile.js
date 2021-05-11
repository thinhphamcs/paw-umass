import { PROFILE_LOADING, PROFILE_SUCCESS, PROFILE_ERROR } from "../../constants/actionTypes";

// Reducer for profile with state and action as props for now
const profileAuth = (state, { payload, type }) => {
    switch (type) {
        case PROFILE_LOADING: {
            return {
                ...state,
                profile: {
                    ...state.contacts,
                    loading: true,
                    error: false
                }
            }
        }
        case PROFILE_SUCCESS: {
            return {
                ...state,
                profile: {
                    ...state.contacts,
                    loading: false,
                    data: payload
                }
            }
        }
        case PROFILE_ERROR: {
            return {
                ...state,
                profile: {
                    ...state.contacts,
                    loading: false,
                    error: payload
                }
            }
        }
        default:
            return state;
    }
}

export default profileAuth;