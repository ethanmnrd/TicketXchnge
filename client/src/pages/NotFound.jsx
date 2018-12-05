// @flow

import React from 'react';
import Helmet from 'react-helmet';

const title = 'Page Not Found';

const NotFoundPage = () => (
  <div>
    <Helmet
      title={title}
      meta={[
        { name: 'description', content: 'Route not found' },
        { property: 'og:title', content: title }
      ]}
    />
    <div className="container align-middle" style={{ marginTop: '50px' }}>
      <h3 style={{ textAlign: 'center' }} className="display-3">
        TicketX
      </h3>
      <h1 style={{ textAlign: 'center' }}> Page Not Found </h1>
    </div>
  </div>
);

export default NotFoundPage;
