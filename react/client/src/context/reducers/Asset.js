import { ASSET_LOADING, ASSET_SUCCESS, ASSET_ERROR } from "../../constants/actionTypes";

// Reducer for profile with state and action as props for now
const assetAuth = (state, { payload, type }) => {
    switch (type) {
        case ASSET_LOADING: {
            return {
                ...state,
                assets: {
                    ...state.assets,
                    loading: true,
                    error: false
                }
            }
        }
        case ASSET_SUCCESS: {
            return {
                ...state,
                assets: {
                    ...state.assets,
                    loading: false,
                    data: payload
                }
            }
        }
        case ASSET_ERROR: {
            return {
                ...state,
                assets: {
                    ...state.assets,
                    loading: false,
                    error: payload
                }
            }
        }
        default:
            return state;
    }
}

export default assetAuth;