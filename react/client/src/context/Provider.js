// Import
import React, { createContext, useReducer, children } from 'react';
import AuthInitialState from './initialstates/AuthInitialState';
import ProfileInitialState from './initialstates/ProfileInitialState';
import Auth from './reducers/Auth';
import Profile from './reducers/Profile';

// Need to understand this
export const GlobalContext = createContext({}); // application state and it is empty, need provider

// Need to understand this
export const GlobalProvider = ({ children }) => {
    const [authState, authDispatch] = useReducer(Auth, AuthInitialState);
    const [profileState, profileDispatch] = useReducer(Profile, ProfileInitialState);

    return (
        <GlobalContext.Provider value={{ authState, authDispatch, profileState, profileDispatch }}>
            {children}
        </GlobalContext.Provider>
    );
};

