/* eslint-disable prettier/prettier */
import {
    GET_LIST_USER,
    GET_DETAILS_USER,
    UPDATE_USER,
    ERROR_RETURN,
} from "../actions/actionTypes";

const DEFAULT_STATE = {
    list: {
        count: 0,
        rows: []
    },
    details: {}
};
const user = (state = DEFAULT_STATE, { type, ...rest }) => {
    switch (type) {
        case GET_LIST_USER:
            return {
                ...state,
                ...rest
            };
        case GET_DETAILS_USER:
            return {
                ...state,
                ...rest
            };
        case UPDATE_USER:
            return {
                ...state,
                ...rest
            };
        case ERROR_RETURN:
            return {
                ...DEFAULT_STATE
            };
        default:
            return state;
    }
};
export default user;