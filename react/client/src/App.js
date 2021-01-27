import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Choose from './components/Choose';
import Login from './components/Login'
// import Nav from './components/Nav';
import Home from './components/Home';
import Register from './components/Register';

function App() {
  const [user, setUser] = useState({
    token: ''
  });

  const LoggedIn = details => {
    if (details.data.auth === true && details.data.email !== "" && details.data.token !== "") {
      setUser({
        ...user,
        token: details.data.token
      });

    }
    else {
      setUser({
        ...user,
        token: ''
      });
      <Redirect to="/login" />
    }
  }
  const LoggedOut = () => {
    console.log("Logout");
  }

  if (user.token !== "") {
    localStorage.setItem('token', user.token);
  }
  const userToken = window.localStorage.getItem('token');
  return (
    /**
     * BrowserRouter will allow to navigate through different pages with react 
     * Switch will make sure we only render one component per url
     * <BrowserRouter>
        <Nav />
        <Switch>
          <Route exact path="/" exact component={Choose} />
          <Route exact path="/login" exact component={Login} />
          <Route exact path="/register" exact component={Register} />
          <Route exact path="/home" exact component={Home} />
        </Switch>
      </BrowserRouter>
     */
    // 
    <>
      {(userToken !== null) ? (
        <Home />
      ) : (<Login LoggedIn={LoggedIn} />)}
    </>
  );
}

export default App;