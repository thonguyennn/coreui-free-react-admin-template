/* eslint-disable prettier/prettier */
import {
  ERROR_RETURN,
  GET_LIST_ACION,
  CREATE_ACTION,
  UPDATE_ACTION,
  GET_DETAILS_ACTION,
} from "../actions/actionTypes";

const DEFAULT_STATE = {
  list: {
    count: 0,
    rows: []
  },
  details: {},
};
const action = (state = DEFAULT_STATE, { type, ...rest }) => {

  switch (type) {
    case GET_LIST_ACION:
      return {
        ...state,
        ...rest
      }
    case CREATE_ACTION:
      return {
        ...state,
      };
    case UPDATE_ACTION: {
      return {
        ...state,
        ...rest
      }
    }
    case GET_DETAILS_ACTION: {
      return {
        ...state,
        ...rest
      }
    }
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
export default action;