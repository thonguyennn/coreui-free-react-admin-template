/* eslint-disable prettier/prettier */
import React from 'react'
import {
  CButton,
  CContainer,
  CRow,
} from '@coreui/react'
import { Redirect, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from '../../../actions'
const Login = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const token = localStorage.getItem('accessToken')
  if (token) {
    dispatch(setToken(token))
  }
  const authState = useSelector(state => state.auth)
  return authState.isAuthenticated ?
    <Redirect
      to={{
        pathname: "/",
        state: { from: location }
      }}
    />
    :
    (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CButton
              color="primary"
              className="px-4"
              href={`${process.env.REACT_APP_API_HOST}/auth/callback`}
            >
              Login With VietID
            </CButton>
          </CRow>
        </CContainer>
      </div>
    )
}


export default Login
