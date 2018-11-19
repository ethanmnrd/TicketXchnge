import { RESTORE_JWT, SET_JWT } from '../actions/index';

const INITIAL_STATE = { jwt: null };

export default function (state = INITIAL_STATE, action) {
  // initial state is empty array
  console.log('In reducer');
  console.dir(action);
  switch (action.type) {
    case RESTORE_JWT:
      return action.payload;
    case SET_JWT:
      return action.payload;
    default:
      return state;
  }
}
