import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Game from './containers/game';
import Signup from './containers/signup';
import Login from './containers/login';

const Root = () => (
  <Router>
    <div>
      <Route exact path="/" component={Signup} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route path="/game" component={Game} />
    </div>
  </Router>
);

export default Root;