/* eslint-disable prettier/prettier */
import {
    GET_LIST_USER,
    GET_USER_DETAIL,
    UPDATE_USER
} from "../actions/actionTypes";

const DEFAULT_STATE = {
    data: [],
    detail: {}
};
const user = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case GET_LIST_USER:
            return {
                ...state,
                data: action.payload,
            };
        case GET_USER_DETAIL:
            return {
                ...state,
                detail: action.payload,
            };
        case UPDATE_USER:
            return {
                ...state,
                detail: action.payload,
            };
        default:
            return state;
    }
};
export default user;