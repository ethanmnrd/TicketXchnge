import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import JWTReducer from './reducer_jwt';

export default history => combineReducers({
  router: connectRouter(history),
  jwt: JWTReducer
});
