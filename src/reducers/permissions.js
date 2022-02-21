/* eslint-disable prettier/prettier */
import {
  GET_ACTIONS,
  GET_PERMISSION,
  GET_ACTION_DETAIL
} from "../actions/actionTypes";

const DEFAULT_STATE = {
  action: [],
  actions: [],
  permissions: []
};
const permissions = (state = DEFAULT_STATE, rest) => {
  switch (rest.type) {
    case GET_ACTIONS:
      return {
        ...state,
        actions: rest.payload.rows,
      };
    case GET_PERMISSION:
      return {
        ...state,
        permissions: rest.payload.rows
      };
    case 'SET_PERMISSION':
      return {
        ...state,
        permissions: rest.payload
      };
    case GET_ACTION_DETAIL:
      return {
        ...state,
        action: rest.payload
      }
    default:
      return state;
  }
};
export default permissions;