/* eslint-disable prettier/prettier */
import React from 'react'
import {
  AppContent,
  AppHeader,
  AppFooter,
  AppSidebar,
} from './index'
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { setToken, logout } from '../actions'
import { useHistory } from 'react-router-dom'
import jwt_decode from 'jwt-decode';

const TheLayout = () => {
  const history = useHistory()
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  if (!auth.isAuthenticated) {
    const token = localStorage.getItem('accessToken')
    if (token) {
      dispatch(setToken(token, history))
    } else {
      return <Redirect
        to={{
          pathname: "/login",
          state: { from: location }
        }}
      />
    }
  } else {
    const accessToken = auth.accessToken;
    if (accessToken) {
      const { exp } = jwt_decode(accessToken);
      if (exp < (new Date().getTime() + 1) / 1000) {
        dispatch(logout())

        history.push('/login')
      }
    }
  }
  return (
    <div className="c-app c-default-layout">
      <AppSidebar />
      <div className="c-wrapper">
        <AppHeader />
        <div className="c-body">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default TheLayout
