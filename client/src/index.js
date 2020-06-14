// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as HotLoaderAppContainer } from 'react-hot-loader';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import './index.css';
import Route from './route';
import GameReducer from './reducers/GameReducer';
import registerServiceWorker from './registerServiceWorker';


const store = createStore(combineReducers({GameReducer}), {"GameReducer":{"username":""}}, applyMiddleware(thunkMiddleware));
// Render the root component allowing hot module reload
const render = (Component) => {
    ReactDOM.render(
        <Component store={store} />,
      document.getElementById('root'),
    );
  };
  
  render(Route);
  
  // Hot Module Replacement API
  if (module.hot) {
    /* eslint-disable global-require */
    module.hot.accept('./route', () => {
      const nextRoot = require('./route');
      render(nextRoot);
    });
    /* eslint-disable global-require */
    module.hot.accept('./reducers/GameReducer', () => {
      const nextReducers = require('./reducers/GameReducer');
      return store.replaceReducer(nextReducers);
    });
}
//registerServiceWorker();