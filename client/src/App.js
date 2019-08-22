import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Dashboard from './components/Dashboard/Dashboard';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    );
  }
}
