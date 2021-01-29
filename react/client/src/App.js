// Import
import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Choose from './components/Choose';
import Login from './components/Login'
// import Nav from './components/Nav';
import Home from './components/Home';
import Register from './components/Register';

function App() {
  // Hook
  const [user, setUser] = useState({
    auth: '',
    checkBox: '',
    token: ''
  });
  // Token
  const userAuth = localStorage.getItem('auth');
  const userRemember = localStorage.getItem('checkBox');
  const userToken = localStorage.getItem('token');
  // loggedIn handle function
  const LoggedIn = details => {
    console.log("Printing out the details ", details);
    // If the user auth is true and the remember me checked then we store the token
    if (details.data.auth === true && details.data.token !== "") {
      setUser({
        ...user,
        auth: details.data.auth,
        checkBox: details.data.checkBox,
        token: details.data.token
      });

    }
    else {
      setUser({
        ...user,
        auth: '',
        checkBox: '',
        token: ''
      });
    }
  }
  const LoggedOut = () => {
    console.log("Logout");
  }
  console.log(user.checkBox);
  // We store it here
  if (user.checkBox === true) {
    localStorage.setItem('auth', user.auth);
    localStorage.setItem('checkBox', user.checkBox);
    localStorage.setItem('token', user.token);
  }

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
      {((user.auth === true) || (userAuth === 'true' && userRemember === 'true' && userToken !== "")) ? (<Home />) : (<Login LoggedIn={LoggedIn} />)}
    </>
  );
}

export default App;