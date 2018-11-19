import { combineReducers } from 'redux';
import JWTReducer from './reducer_jwt';

const rootReducer = combineReducers({
  /* IMPORTANT */
  jwt: JWTReducer
});
export default rootReducer;
