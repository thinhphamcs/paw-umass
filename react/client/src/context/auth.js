import React, { createContext, useReducer, useContext } from 'react';
import jwtDecode from 'jwt-decode';

let user = null;

// Create context
const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

// Check user validation
const token = localStorage.getItem('token');
if (token) {
    const decodedToken = jwtDecode(token);
    const expiresAt = new Date(decodedToken.exp * 1000);
    // Expired token
    if (new Date() > expiresAt) {
        localStorage.removeItem('token');
    }
    else {
        user = decodedToken;
    }
}
// else {
//     throw new Error("No Token Found"); // Throw error here will crash the app
// }

// Create reducer
const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {
                ...state,
                user: null
            }
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}

// Create Provider
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { user })
    return (
        <AuthDispatchContext.Provider value={dispatch}>
            <AuthStateContext.Provider value={state}>
                {children}
            </AuthStateContext.Provider>
        </AuthDispatchContext.Provider>
    )
}

export const useAuthState = () => useContext(AuthStateContext)
export const useAuthDispatch = () => useContext(AuthDispatchContext)