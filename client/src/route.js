import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import Game from './containers/game';
import Signup from './containers/signup';
import Login from './containers/login';

function Root() {
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect((() => {
    axios.get('http://localhost:3006/user/', {withCredentials: true}).then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')
        setLoggedIn(true);
        setUsername(response.data.user.username);
      } else {
        console.log('Get user: no user');
        setLoggedIn(false);
        setUsername('');
      }
    })
  }))
  return (
  <Router>
    <div>
    {loggedIn &&
          <p>Join the party, {username}!</p>
        }
      <Route exact path="/" component={Signup} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route path="/game" component={Game} />
    </div>
  </Router>
  );
};

export default Root;