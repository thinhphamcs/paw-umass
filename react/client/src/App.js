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
    email: '',
    token: '',
    cookie: '',
  });
  const [err, setErr] = useState({

  });

  const LoggedIn = details => {
    if (details.data.message === "LoggedIn") {
      setUser({
        email: details.email,
        token: details.token,
        cookie: details.cookie
      });
      console.log("Yo1", user.email);
    }
    else {
      setUser({
        email: '',
        token: '',
        cookie: ''
      });
      <Redirect to="/login" />
    }
    console.log("Yo2", user.email);
  }
  const LoggedOut = () => {
    console.log("Logout");
  }
  console.log("Yo3", user.email);
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
      {(user.email !== "") ? (
        <Home />
      ) : (<Login LoggedIn={LoggedIn} err={err} />)}
    </>
  );
}

export default App;