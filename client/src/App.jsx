// @flow

import React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import NavMenu from './containers/NavMenu';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CheckoutPage from './pages/CheckoutPage';
import NotFoundPage from './pages/NotFound';
import { APP_NAME } from '../util/config';
import {
  HOME_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  CHECKOUT_PAGE_ROUTE
} from '../util/routes';
import './styles/app.global.css';

const App = () => (
  <div>
    <Helmet titleTemplate={`%s | ${APP_NAME}`} defaultTitle={APP_NAME} />
    <NavMenu />
    <Switch>
      <Route exact path={HOME_PAGE_ROUTE} render={() => <HomePage />} />
      <Route exact path={LOGIN_PAGE_ROUTE} render={() => <LoginPage />} />
      <Route exact path={CHECKOUT_PAGE_ROUTE} render={() => <CheckoutPage />} />
      <Route component={NotFoundPage} />
    </Switch>
  </div>
);

export default App;
