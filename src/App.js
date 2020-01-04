import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';

import Homepage from './components/Homepage'
import MovieInfo from "./components/MovieInfo";
import Navbar from "./components/Navbar";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Navbar />
          <Switch>
            <Route exact path="/" component={ Homepage } />
            <Route exact pah="/movie:id" component={ MovieInfo } />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
