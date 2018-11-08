// @flow

import React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import NavMenu from './containers/NavMenu';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CheckoutPage from './pages/CheckoutPage';
import SellPage from './pages/SellPage';
import CreateEvent from './containers/CreateEvent';
import NotFoundPage from './pages/NotFound';
import { APP_NAME } from '../util/config';
import {
  HOME_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  CHECKOUT_PAGE_ROUTE,
  SELL_PAGE,
  CREATE_EVENT_PAGE
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
      <Route exact path={SELL_PAGE} render={() => <SellPage />} />
      <Route exact path={CREATE_EVENT_PAGE} render={() => <CreateEvent />} />
      <Route component={NotFoundPage} />
    </Switch>
  </div>
);

export default App;
