// @flow

import React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import { APP_NAME } from '../util/config';
import HomePage from './pages/Home';
import NotFoundPage from './pages/NotFound';
import { HOME_PAGE_ROUTE } from '../util/routes';
import './styles/app.global.css';

const App = () => (
  <div>
    <Helmet titleTemplate={`%s | ${APP_NAME}`} defaultTitle={APP_NAME} />
    <Switch>
      <Route exact path={HOME_PAGE_ROUTE} render={() => <HomePage />} />
      <Route component={NotFoundPage} />
    </Switch>
  </div>
);

export default App;
