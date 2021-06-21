// Import
import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom'; //useHistory
import DynamicRoute from './routes/DynamicRoute';
import routes from './routes/Routes';
import ApolloProvider from './ApolloProvider';
import { AuthProvider } from './context/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// React APP
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
            {routes.map(
              (route, index) => (<DynamicRoute {...route} key={index} />)
            )}
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
}
export default App;