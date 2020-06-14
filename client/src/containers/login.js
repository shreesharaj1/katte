// Game.js
import React, { Component, useState, useReducer } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import '../css/uikit.min.css';
import { login } from '../actions/Game';
import { connect } from 'react-redux';

function Login(props, context) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    props.loginAction(email, password);
  }
  return (
    <div> {props.username ? <Redirect to="/game" /> :
      <div className="home-background">
        <div className="layer">
          <div className="uk-grid uk-position-center">
            <form className="uk-form-stacked" onSubmit={(e) => handleSubmit(e)}>
              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="Email">Email</label>
                <div className="uk-form-controls">
                  <input className="uk-input uk-form-width-large" id="Email"
                    type="text"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="Password">Password</label>
                <div className="uk-form-controls">
                  <input className="uk-input uk-form-width-large" id="Password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>
              <button className="uk-button uk-button-primary uk-width-1-1">Login</button>
              {props.loginError &&
                <div className="uk-margin uk-form-width-large">
                  <div className="uk-alert-danger uk-alert" uk-alert="true">
                    <a class="uk-alert-close" uk-close="true"></a>
                    <p>Wrong email ID or Password.</p>
                  </div>
                </div>

              }
            </form>
            <div>
              {/* <img src={Jaggery}/> */}
            </div>
          </div>
        </div>
      </div>
    }
    </div>
  )
}

function mapStateToProps(state) {
  return state.GameReducer;
}

const mapDispatchToProps = dispatch => ({
  loginAction: (email, password) => { dispatch(login(email, password)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
