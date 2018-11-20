// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createRootReducer from './reducers';

import App from './App';
import { APP_CONTAINER_SELECTOR } from '../util/config';

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR);

// Redux-Dev-Tools
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const history = createBrowserHistory();

const wrapApp = AppComponent => (
  <Provider
    store={createStore(
      createRootReducer(history),
      composeEnhancers(
        applyMiddleware(
          routerMiddleware(history), // for dispatching history actions
          ReduxPromise
        )
      )
    )}
  >
    <ConnectedRouter history={history}>
      <AppContainer>
        <AppComponent />
      </AppContainer>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(wrapApp(App), rootEl);

if (module.hot) {
  // $FlowFixMe
  module.hot.accept('./App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./App').default;
    ReactDOM.render(wrapApp(NextApp), rootEl);
  });
}
