import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    /**
     * BrowserRouter will allow to navigate through different pages with react 
     * Switch will make sure we only render one component per url
     */
    // 
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Form} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
