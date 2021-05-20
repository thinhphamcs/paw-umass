// Import
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'; //useHistory
import './App.css';
import routes from './routes/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import ApolloProvider from './ApolloProvider';

// Function to determine authentication
const AuthRoute = (route) => {
  document.title = route.title;
  // const history = useHistory();
  // Checking for both localStorage AND sessionStorage
  if ((route.auth && !(!!localStorage.token)) && (route.auth && !(!!sessionStorage.token))) {
    // if (history) {
    //   history.push("/"); // this causes error but it is the correct way
    // }
    // else {
    //   window.location = "/"; // temporary solution for now
    // }
    window.location = "/"; // temporary solution for now
  }
  // If user have neither then we just return the component at hand
  else {
    return (
      <Route exact path={route.path} render={(props) => <route.component {...props} />}></Route>
    );
  }
}

function App() {
  return (
    /**
     * BrowserRouter will allow to navigate through different pages with react 
     * Switch will make sure we only render one component per url
     * Define routes in a different file then map it
     */
    <ApolloProvider>
      <BrowserRouter>
        <Switch>
          {routes.map(
            (route, index) => (<AuthRoute {...route} key={index} />)
          )}
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;