// Import
import React from 'react';
import { useAuthState } from '../context/auth';
import { Route, Redirect } from 'react-router-dom';
// Export the function
export default function DynamicRoute(route) {
    document.title = route.title;
    const { user } = useAuthState();
    // No user and authenticated route
    if (route.authenticated && !user) {
        return <Redirect to="/login" />
    }
    // User but it's a guest route
    else if (route.guest && user) {
        return <Redirect to="/home" />
    }
    else {
        // return <Route component={props.component} {...props} />
        return (
            <Route exact path={route.path} render={(props) => <route.component {...props} />} />
        );
    }
}