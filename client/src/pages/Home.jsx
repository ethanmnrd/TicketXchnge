// @flow

import React from 'react';
import Helmet from 'react-helmet';
import { APP_NAME } from '../../util/config';

const HomePage = () => (
  <div>
    <Helmet
      meta={[
        { name: 'description', content: 'At HomePage of Hello App' },
        { property: 'og:title', content: APP_NAME }
      ]}
    />
    HomePage
  </div>
);

export default HomePage;
