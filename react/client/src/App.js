// Import
import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom'; //useHistory
import DynamicRoute from './routes/DynamicRoute';
import ApolloProvider from './ApolloProvider';
import { AuthProvider } from './context/auth';
import Choose from './components/Choose/Choose';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Deactivate from './components/Deactivate/Deactivate';
import Change from './components/Change/Change';
import Forgot from './components/Forgot/Forgot';
import ForgotChange from './components/ForgotChange/ForgotChange';
import Submit from './components/Submit/Submit';
import Donate from './components/Donate/Donate';
import About from './components/About/About';
import ToS from './components/ToS/ToS';
import Privacy from './components/Privacy/Privacy';
import Cookies from './components/Cookies/Cookies';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    /**
     * BrowserRouter will allow to navigate through different pages with react 
     * Switch will make sure we only render one component per url
     * Define routes in a different file then map it
     */
    <ApolloProvider>
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            {/* Guest Component */}
            <DynamicRoute exact path="/" component={Choose} guest />
            <DynamicRoute exact path="/register" component={Register} guest />
            <DynamicRoute exact path="/login" component={Login} guest />
            <DynamicRoute exact path="/forgot" component={Forgot} guest />
            <DynamicRoute exact path="/about" component={About} guest />
            <DynamicRoute exact path="/tos" component={ToS} guest />
            <DynamicRoute exact path="/privacy" component={Privacy} guest />
            <DynamicRoute exact path="/cookies" component={Cookies} guest />
            {/* Authenticated Component */}
            <DynamicRoute exact path="/change" component={ForgotChange} authenticated />
            <DynamicRoute exact path="/settings/profile" component={Profile} authenticated />
            <DynamicRoute exact path="/settings/change" component={Change} authenticated />
            <DynamicRoute exact path="/settings/deactivate" component={Deactivate} authenticated />
            <DynamicRoute exact path="/home" component={Home} authenticated />
            <DynamicRoute exact path="/user/submit" component={Submit} authenticated />
            <DynamicRoute exact path="/user/donate" component={Donate} authenticated />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;