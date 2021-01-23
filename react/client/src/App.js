import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Choose from './components/Choose';
import Login from './components/Login'
// import Nav from './components/Nav';
import Home from './components/Home';
import Register from './components/Register';

function App() {
  return (
    /**
     * BrowserRouter will allow to navigate through different pages with react 
     * Switch will make sure we only render one component per url
     */
    // 
    <>
      <BrowserRouter>
        {/* <Nav /> */}
        <Switch>
          <Route exact path="/" exact component={Choose} />
          <Route exact path="/login" exact component={Login} />
          <Route exact path="/register" exact component={Register} />
          <Route exact path="/home" exact component={Home} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
