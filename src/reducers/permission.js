/* eslint-disable prettier/prettier */
import {
  GET_LIST_PERMISSION,
  UPDATE_PERMISSION,
  ERROR_RETURN
} from "../actions/actionTypes";

const DEFAULT_STATE = {
  list: {
    count: 0,
    rows: []
  },
};
const permission = (state = DEFAULT_STATE, { type, ...rest }) => {
  switch (type) {
    case GET_LIST_PERMISSION:
      return {
        ...state,
        ...rest
      };
    case UPDATE_PERMISSION:
      return {
        ...state,
        // ...rest
      };
    case ERROR_RETURN:
      return {
        ...state,
        list: [],
      }
    default:
      return state;
  }
};
export default permission;