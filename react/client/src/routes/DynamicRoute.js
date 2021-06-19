// Import
import React from 'react';
import { useAuthState } from '../context/auth';
import { Route, Redirect } from 'react-router-dom';
// Export the function
export default function DynamicRoute(props) {
    const { user } = useAuthState();
    // No user and authenticated route
    if (props.authenticated && !user) {
        return <Redirect to="/login" />
    }
    // User but it's a guest route
    else if (props.guest && user) {
        return <Redirect to="/home" />
    }
    else {
        return <Route component={props.component} {...props} />
    }
}