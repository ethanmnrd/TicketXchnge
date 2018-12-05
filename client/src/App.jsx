// @flow

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Switch, withRouter } from 'react-router';
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
  SELL_PAGE_ROUTE,
  CREATE_EVENT_PAGE
} from '../util/routes';
import './styles/app.global.css';

const App = props => (
  <div>
    <Helmet titleTemplate={`%s | ${APP_NAME}`} defaultTitle={APP_NAME} />
    <NavMenu />
    <Switch>
      <Route exact path={HOME_PAGE_ROUTE} component={HomePage} />
      {props.jwt === null ? (
        <Route exact path={LOGIN_PAGE_ROUTE} component={LoginPage} />
      ) : (
        <Fragment>
          <Route exact path={CHECKOUT_PAGE_ROUTE} component={CheckoutPage} />
          <Route exact path={SELL_PAGE_ROUTE} component={SellPage} />
          <Route exact path={CREATE_EVENT_PAGE} component={CreateEvent} />
        </Fragment>
      )}
      <Route component={NotFoundPage} />
    </Switch>
  </div>
);

const mapStateToProps = state => ({
  jwt: state.jwt
});

export default withRouter(connect(mapStateToProps)(App));
