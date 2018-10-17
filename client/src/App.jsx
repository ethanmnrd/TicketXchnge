// @flow

import React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import HomePage from './pages/Home';
import NotFoundPage from './pages/NotFound';
import NavMenu from './containers/NavMenu';
import LoginPage from './pages/LoginPage';
import { APP_NAME } from '../util/config';
import { HOME_PAGE_ROUTE, LOGIN_PAGE_ROUTE } from '../util/routes';
import './styles/app.global.css';

const App = () => (
  <div>
    <Helmet titleTemplate={`%s | ${APP_NAME}`} defaultTitle={APP_NAME} />
    <NavMenu />
    <Switch>
      <Route exact path={HOME_PAGE_ROUTE} render={() => <HomePage />} />
      <Route exact path={LOGIN_PAGE_ROUTE} render={() => <LoginPage />} />
      <Route component={NotFoundPage} />
    </Switch>
  </div>
);

export default App;
