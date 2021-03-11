// Import
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'; //useHistory
import './App.css';
import routes from './routes/Routes';
import { GlobalProvider } from './context/Provider';

// Function to determine authentication
const AuthRoute = (route) => {
  // const history = useHistory();
  // (route.auth === false && localStorage.token === false) || (route.auth === false && sessionStorage.token === false)
  if (route.auth && !(!!localStorage.token)) {
    // history.push("/"); this causes error 
    window.location = "/"; // temporary solution for now
  }
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
    // 
    <GlobalProvider>
      <BrowserRouter>
        <Switch>
          {routes.map(
            (route, index) => (<AuthRoute {...route} key={index} />)
          )}
        </Switch>
      </BrowserRouter>

    </GlobalProvider>
  );
}

export default App;