// Import
import React, { createContext, useReducer } from 'react';
import AuthInitialState from './initialstates/AuthInitialState';
import ProfileInitialState from './initialstates/ProfileInitialState';
import AssetInitialState from './initialstates/AssetInitialState';
import Auth from './reducers/Auth';
import Profile from './reducers/Profile';
import Asset from './reducers/Asset';

// Need to understand this
export const GlobalContext = createContext({}); // application state and it is empty, need provider

// Need to understand this
export const GlobalProvider = ({ children }) => {
    const [authState, authDispatch] = useReducer(Auth, AuthInitialState);
    const [profileState, profileDispatch] = useReducer(Profile, ProfileInitialState);
    const [assetState, assetDispatch] = useReducer(Asset, AssetInitialState);
    return (
        <GlobalContext.Provider value={{ authState, authDispatch, profileState, profileDispatch, assetState, assetDispatch }}>
            {children}
        </GlobalContext.Provider>
    );
};

