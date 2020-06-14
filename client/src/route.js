import React, { useState, useEffect, useReducer } from "react";
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import Game from './containers/game';
import Signup from './containers/signup';
import Login from './containers/login';
import SelectRoom from './containers/SelectRoom';
import { getUser } from './actions/Game';

function Root(props) {
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  //const [state, dispatch] = useReducer(GameReducer, {});

  useEffect(() => {
    props.store.dispatch(getUser());
  }, []);

  
  
  return (
  <Provider store={props.store}>
    <Router>
      <div>
      {loggedIn &&
            <p>Join the party, {username}!</p>
          }
        <Route exact path="/" component={Signup} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route path="/game" component={Game} />
        <Route path="/room" component={SelectRoom} />
      </div>
    </Router>
  </Provider>
  );
};

export default Root;