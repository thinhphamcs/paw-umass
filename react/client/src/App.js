import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login'
import Nav from './components/Nav';
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
        <Nav />
        <Switch>
          <Route exact path="/" exact component={Login} />
          <Route exact path="/home" exact component={Home} />
          <Route exact path="/register" exact component={Register} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
