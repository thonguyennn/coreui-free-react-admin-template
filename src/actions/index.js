/* eslint-disable prettier/prettier */
import {
  GET_ME,
  SET_TOKEN,

  // auth
  AUTH_FAILED,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,

  // user
  GET_LIST_USER,
  GET_DETAILS_USER,
  UPDATE_USER,

  // role
  GET_LIST_ROLE,
  GET_DETAILS_ROLE,
  UPDATE_ROLE,
  CREATE_ROLE,
  DELETE_ROLE,

  // app
  UPDATE_APP,

  // action
  GET_LIST_ACION,
  CREATE_ACTION,
  UPDATE_ACTION,
  GET_DETAILS_ACTION,

  // permission
  GET_LIST_PERMISSION,
  UPDATE_PERMISSION,

  // toast
  ADD_TOAST,
  ERROR_RETURN,
} from './actionTypes';

import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthHeader from '../utils/setAuthHeader'

export const login = ({ accessToken }) => async dispatch => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_HOST}/login`, {
      accessToken
    });
    localStorage.setItem("accessToken", res.data.accessToken);
    setAuthHeader(res.data.accessToken)
    dispatch({
      type: LOGIN_REQUEST,
      accessToken: res.data.accessToken
    })
  } catch (error) {
    const res = error.response;
    const status = res.status;
    const { message } = res.data;
    setAuthHeader()
    localStorage.removeItem("accessToken");
    dispatch({
      type: AUTH_FAILED,
    });
    return dispatch(addToast({ status, message }))
  }
}

export const setToken = (accessToken, history) => dispatch => {
  const { exp } = jwt_decode(accessToken);
  if (exp < (new Date().getTime() + 1) / 1000) {
    localStorage.removeItem("accessToken");
    setAuthHeader()
    dispatch({
      type: AUTH_FAILED,
    });
    history.push('/login')
    dispatch(addToast({ message: 'Authorized Failed' }))
    return;
  } else {
    setAuthHeader(accessToken)
    dispatch({
      type: SET_TOKEN,
      accessToken
    })
  }
}

export const logout = _ => async dispatch => {
  localStorage.removeItem("accessToken");
  setAuthHeader()
  dispatch({
    type: LOGOUT_REQUEST,
  })
  // window.location.href = `${process.env.REACT_APP_API_HOST}/login`
  console.log('log out')
}

export const getMe = _ => async dispatch => {
  try {
    // const accessToken = localStorage.getItem("accessToken");
    // const { exp } = jwt_decode(accessToken);
    // if (exp < (new Date().getTime() + 1) / 1000) {
    //   setAuthHeader()
    //   localStorage.removeItem("accessToken");
    //   dispatch({
    //     type: AUTH_FAILED,
    //   });
    // }
    const res = await axios.get(`${process.env.REACT_APP_API_HOST}/me`)
    const { data: me } = res.data;
    return dispatch({
      type: GET_ME,
      ...me
    })
  } catch (error) {
    // const res = error.response;
    // const status = res.status;
    // const { message } = res.data
    setAuthHeader()
    localStorage.removeItem("accessToken");
    dispatch({
      type: AUTH_FAILED,
    })
    // return dispatch(addToast({ status, message }))
  }
}

// USER action

export const getListUser = (size, page) => async dispatch => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_HOST}/user`, {
      params: {
        size, page
      }
    })
    const { data: list } = res.data;
    return dispatch({
      type: GET_LIST_USER,
      list
    })
  } catch (error) {
    const res = error.response;
    const status = res.status;
    const { message } = res.data
    return dispatch(addToast({ status, message }))
  }


}

export const getUserById = (id) => async dispatch => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_HOST}/user/${id}`)
    const { data: details } = res.data;
    dispatch({
      type: GET_DETAILS_USER,
      details
    })

  } catch (error) {
    const res = error.response;
    const status = res.status;
    const { message } = res.data;
    return dispatch(addToast({ status, message }))
  }
}

export const updateUserById = (id, values) => async dispatch => {
  try {
    const res = await axios.patch(`${process.env.REACT_APP_API_HOST}/user/${id}`, {
      ...values
    });
    const status = res.status;
    const { data: details, message } = res.data;
    dispatch({
      type: UPDATE_USER,
      details
    })
    return dispatch(addToast({ status, message }))
  } catch (error) {
    const res = error.response;
    const status = res.status;
    const { message } = res.data;
    dispatch({ type: ERROR_RETURN })
    return dispatch(addToast({ status, message }))
  }

}

// APP action

export const getListApp = async (size, page, filter = '', fields) => {
  const res = await axios.get(`${process.env.REACT_APP_API_HOST}/app`, {
    params: {
      size, page, filter, fields
    }
  })
  return res.data.data;


}

export const getAppById = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API_HOST}/app/${id}`);
  return res.data.data;
}

export const updateAppById = (id, values) => async dispatch => {
  try {
    const res = await axios.patch(`${process.env.REACT_APP_API_HOST}/app/${id}`, {
      ...values
    });
    const status = res.status;
    const { data: details, message } = res.data;
    dispatch({
      type: UPDATE_APP,
      details
    });
    return dispatch(addToast({ status, message }))
  } catch (error) {
    const res = error.response;
    const status = res.status;
    const { message } = res.data;
    return dispatch(addToast({ status, message }))
  }
}

export const postWorker = (id, values) => async dispatch => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_HOST}/app/${id}/worker`, {
      ...values
    });

    const status = res.status;
    const { message } = res.data;
    return dispatch(addToast({ status, message }))
  } catch (error) {
    const res = error.response;
    const status = res.status;
    const { message } = res.data;
    return dispatch(addToast({ status, message }))
  }
}

export const getListWorker = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API_HOST}/app/${id}/worker`);
  return res.data.data;
}

export const switchApp = async (id) => {
  await axios.post(`${process.env.REACT_APP_API_HOST}/app/${id}/onoff`);
}

export const getLiveVideo = async () => {
  // await axios.post(`${process.env.REACT_APP_API_HOST}/app/${id}/onoff`);

}

// Processes action
export const getListProcess = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_HOST}/process`);
  return res.data.data;
}

export const restartProcess = async (name) => {
  return await axios.post(`${process.env.REACT_APP_API_HOST}/process/restart`, {
    name
  });
}

export const restartAllProcess = async () => {
  return await axios.post(`${process.env.REACT_APP_API_HOST}/process/restartall`);
}

// PERMISSION action

export const getPermissions = (size, page) => async dispatch => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_HOST}/permission`, {
      params: {
        size, page
      }
    });
    const { data: list } = res.data;
    return dispatch({
      type: GET_LIST_PERMISSION,
      list,
    })
  } catch (error) {
    const res = error.response;
    const status = res.status;
    const { message } = res.data;
    return dispatch(addToast({ status, message }))
  }
}

export const updatePermissions = (permissions) => async dispatch => {
  try {
    const res = await axios.patch(`${process.env.REACT_APP_API_HOST}/permission`, permissions)
    const status = res.status;
    const { message } = res.data;
    dispatch({
      type: UPDATE_PERMISSION,
    });
    return dispatch(addToast({ status, message }))
  } catch (error) {
    const res = error.response;
    const status = res.status;
    const { message } = res.data;
    return dispatch(addToast({ status, message }))
  }
}

// ACTION action

export const getListAction = _ => async dispatch => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_HOST}/action`);
    const { data: list } = res.data;
    return dispatch({
      type: GET_LIST_ACION,
      list
    })
  } catch (error) {
    alert('Can list an action')
    const res = error.response;
    const status = res.status;
    const { message } = res.data;
    return dispatch(addToast({ status, message }))
  }
}

export const getActionById = id => async dispatch => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_HOST}/action/${id}`)
    const { data: details } = res.data;
    return dispatch({
      type: GET_DETAILS_ACTION,
      details
    })
  } catch (error) {
    const res = error.response;
    const status = res.status;
    const { message } = res.data;
    return dispatch(addToast({ status, message }))
  }
}

export const createAction = (values) => async dispatch => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_HOST}/action`, {
      ...values
    });
    const status = res.status;
    const { message } = res.data;
    dispatch({
      type: CREATE_ACTION,
    })
    return dispatch(addToast({ status, message }))
  } catch (error) {
    const res = error.response;
    const status = res.status;
    const { message } = res.data;
    return dispatch(addToast({ status, message }))
  }
}

export const updateActionById = (id, values) => async dispatch => {
  try {
    const res = await axios.patch(`${process.env.REACT_APP_API_HOST}/action/${id}`, {
      ...values
    });
    const status = res.status;
    const { data: details, message } = res.data;
    dispatch({
      type: UPDATE_ACTION,
      details
    })
    return dispatch(addToast({ status, message }))
  } catch (error) {
    const res = error.response;
    const status = res.status;
    const { message } = res.data;
    return dispatch(addToast({ status, message }))
  }
}

// ROLE action

export const getListRole = (size, page, filter = '') => async dispatch => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_HOST}/role`, {
      params: {
        size, page, filter
      }
    })
    const { data: list } = res.data;

    return dispatch({
      type: GET_LIST_ROLE,
      list
    })
  } catch (error) {
    const res = error.response;
    const status = res.status;
    const { message } = res.data;
    return dispatch(addToast({ status, message }))
  }
}

export const getRoleById = (id) => async dispatch => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_HOST}/role/${id}`)
    const { data: details } = res.data;
    return dispatch({
      type: GET_DETAILS_ROLE,
      details
    })
  } catch (error) {
    const res = error.response;
    const status = res.status;
    const { message } = res.data;
    return dispatch(addToast({ status, message }))
  }
}

export const createRole = (values) => async dispatch => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_HOST}/role`, {
      ...values
    });
    const status = res.status;
    const { data: details, message } = res.data;

    dispatch({
      type: CREATE_ROLE,
      details
    })
    return dispatch(addToast({ status, message }))
  } catch (error) {
    const res = error.response;
    const status = res.status;
    const { message } = res.data;
    return dispatch(addToast({ status, message }))
  }
}

export const updateRoleById = (id, values) => async dispatch => {
  try {
    const res = await axios.patch(`${process.env.REACT_APP_API_HOST}/role/${id}`, {
      ...values
    });
    const status = res.status;
    const { data: details, message } = res.data;
    dispatch({
      type: UPDATE_ROLE,
      details
    })
    return dispatch(addToast({ status, message }))
  } catch (error) {
    const res = error.response;
    const status = res.status;
    const { message } = res.data;
    return dispatch(addToast({ status, message }))
  }
}

export const deleteRole = (id) => async dispatch => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_API_HOST}/role/${id}`);
    const status = res.status;
    const { message } = res.data;
    dispatch({
      type: DELETE_ROLE,
    })
    return dispatch(addToast({ status, message }))
  } catch (error) {
    const res = error.response;
    const status = res.status;
    const { message } = res.data;
    return dispatch(addToast({ status, message }))
  }
}

// TOAST action
export const addToast = (toast = {}) => {
  return {
    type: ADD_TOAST,
    ...toast,
  };
}

// Chart
export const getVideoCallLog = async (period) => {
  const params = {
    period,
    // sessionId,
    // userId
  }
  const res = await axios.get(`${process.env.REACT_APP_API_HOST}/statistic`, {
    params
  });
  return res.data.data;
}

// Live Video
export const getLiveVideos = async (page, size, filter) => {
  const params = {
    page,
    size,
    filter
  }
  const res = await axios.get(`${process.env.REACT_APP_API_HOST}/livevideo`, {
    params
  });
  return res.data.data;
}

export const createLiveVideos = (values) => async dispatch => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_HOST}/livevideo`, {
      ...values
    });
    const status = res.status;
    const { message } = res.data;

    return dispatch(addToast({ status, message }))
  } catch (error) {
    const res = error.response;
    const status = res.status;
    const { message } = res.data;
    return dispatch(addToast({ status, message }))
  }
}

export const onairVideo = (id) => async dispatch => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_HOST}/livevideo/${id}/onair`);
    const status = res.status;
    const { data: details, message } = res.data;

    dispatch({
      type: CREATE_ROLE,
      details
    })
    return dispatch(addToast({ status, message }))
  } catch (error) {
    const res = error.response;
    const status = res.status;
    const { message } = res.data;
    return dispatch(addToast({ status, message }))
  }
}

export const deleteLiveVideo = (id) => async dispatch => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_API_HOST}/livevideo/${id}`);
    const status = res.status;
    const { message } = res.data;
    return dispatch(addToast({ status, message }))
  } catch (error) {
    const res = error.response;
    const status = res.status;
    const { message } = res.data;
    return dispatch(addToast({ status, message }))
  }
}

export const downloadExcelVideoCall = async (period) => {
  const params = {
    period,
  }
  const res = await axios.get(`${process.env.REACT_APP_API_HOST}/export/excel/videocall`, {
    params,
    headers:{
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    }
  });
  return res
}