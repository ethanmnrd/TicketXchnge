// @flow

export const HOME_PAGE_ROUTE = '/';
export const LOGIN_PAGE_ROUTE = '/login';

export const helloEndpointRoute = (num: ?number) => `/ajax/hello/${num || ':num'}`;
