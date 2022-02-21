/* eslint-disable prettier/prettier */

import {
	AUTH_FAILED,
	LOGIN_REQUEST,
	LOGOUT_REQUEST,
	SET_TOKEN
} from "../actions/actionTypes";

const DEFAULT_STATE = {
	isAuthenticated: false,
	accessToken: "",
};
const auth = (state = DEFAULT_STATE, { type, ...rest }) => {
	switch (type) {
		case LOGIN_REQUEST:
			return {
				...state,
				...rest,
				isAuthenticated: true,
			};
		case SET_TOKEN:
			return {
				...state,
				...rest,
				isAuthenticated: true,
			};
		case AUTH_FAILED:
			return {
				...state,
				isAuthenticated: false,
				accessToken: ""
			};
		case LOGOUT_REQUEST:
			return {
				...state,
				...rest,
				isAuthenticated: false,
				accessToken: ""
			};
		default:
			return state;
	}
};
export default auth;