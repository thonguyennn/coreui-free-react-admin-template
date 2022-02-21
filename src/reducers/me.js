/* eslint-disable prettier/prettier */
import {
    GET_ME,
} from "../actions/actionTypes";

const DEFAULT_STATE = {
    email: '',
    fullName: '',
    birthday: '',
    avatar: '',
    mobile: '',
    address: '',
    message: '',
    role: null,
    roleId: null,
    actions: [],
};
const me = (state = DEFAULT_STATE, { type, ...rest }) => {
    switch (type) {
        case GET_ME:
            return {
                ...state,
                ...rest,
                actions: rest.role.actions.map(e => e.code)
            };
        default:
            return state;
    }
};
export default me;