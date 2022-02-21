/* eslint-disable prettier/prettier */
import {
    ERROR_RETURN,
    GET_LIST_ROLE,
    CREATE_ROLE,
    DELETE_ROLE
} from "../actions/actionTypes";

const DEFAULT_STATE = {
    data: [],
    detail: {},
    status: null,
    errorMessage: '',
};
const apps = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case GET_LIST_ROLE:
            return {
                ...state,
                data: action.payload.data.data,
                status: action.payload.status,
                errorMessage: ''
            };
        case CREATE_ROLE: {
            return {
                ...state,
                data: action.payload
            };
        }
        // case GET_ROLE_DETAIL:
        //     return {
        //         ...state,
        //         detail: action.payload.data.data,
        //         status: action.payload.status,
        //         errorMessage: ''
        //     };
        // case UPDATE_APP_DETAIL:
        //     return {
        //         ...state,
        //         detail: action.payload.data.data,
        //         status: action.payload.status,
        //         errorMessage: ''
        //     };
        case DELETE_ROLE: {
            return {
                ...state,
            }
        }
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