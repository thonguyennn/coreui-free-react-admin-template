/* eslint-disable prettier/prettier */
import {
    ERROR_RETURN,
    GET_LIST_APP,
    GET_APP_DETAIL,
    UPDATE_APP_DETAIL,
} from "../actions/actionTypes";

const DEFAULT_STATE = {
    data: [],
    detail: {},
    status: null,
    errorMessage: '',
};
const apps = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case GET_LIST_APP:
            return {
                ...state,
                data: action.payload.data.data,
                status: action.payload.status,
                errorMessage: ''
            };
        case GET_APP_DETAIL:
            return {
                ...state,
                detail: action.payload.data.data,
                status: action.payload.status,
                errorMessage: ''
            };
        case UPDATE_APP_DETAIL:
            return {
                ...state,
                detail: action.payload.data.data,
                status: action.payload.status,
                errorMessage: ''
            };
        case ERROR_RETURN: {
            return {
                ...state,
                detail: {},
                data: [],
                status: 500,
                errorMessage: action.payload,
            }
        }
        default:
            return state;
    }
};
export default apps;