import { RESTORE_JWT, SET_JWT, DELETE_JWT } from '../actions/index';

const INITIAL_STATE = { jwt: null };

export default function (state = INITIAL_STATE, action) {
  // initial state is empty array
  switch (action.type) {
    case RESTORE_JWT:
      return action.payload;
    case SET_JWT:
      return action.payload;
    case DELETE_JWT:
      return action.payload;
    default:
      return state;
  }
}
