/* eslint-disable prettier/prettier */
import {
  ERROR_RETURN,
  GET_LIST_APP,
  GET_DETAILS_APP,
  UPDATE_APP,
} from "../actions/actionTypes";

const DEFAULT_STATE = {
  list: [],
  details: {},
};
const apps = (state = DEFAULT_STATE, { type, ...rest }) => {
  switch (type) {
    case GET_LIST_APP:
      return {
        ...state,
        ...rest
      };
    case GET_DETAILS_APP:
      return {
        ...state,
        ...rest
      };
    case UPDATE_APP:
      return {
        ...state,
        ...rest
      };
    case ERROR_RETURN: {
      return {
        ...state,
        detail: {},
        data: [],
      }
    }
    default:
      return state;
  }
};
export default apps;