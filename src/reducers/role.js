/* eslint-disable prettier/prettier */
import {
    ERROR_RETURN,
    GET_LIST_ROLE,
    GET_DETAILS_ROLE,
    CREATE_ROLE,
    UPDATE_ROLE,
    DELETE_ROLE
} from "../actions/actionTypes";

const DEFAULT_STATE = {
    list: {
        count: 0,
        rows: []
    },
    details: {},
};
const role = (state = DEFAULT_STATE, { type, ...rest }) => {
    switch (type) {
        case GET_LIST_ROLE:
            return {
                ...state,
                ...rest
            };
        case CREATE_ROLE: {
            return {
                ...state,
                ...rest
            };
        }
        case GET_DETAILS_ROLE: {
            return {
                ...state,
                ...rest
            };
        }
        case UPDATE_ROLE: {
            return {
                ...state,
                ...rest
            };
        }
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
            }
        }
        default:
            return state;
    }
};
export default role;