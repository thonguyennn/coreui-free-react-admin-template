/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const RequireAuth = ({ children, ...rest }) => {
  const { auth } = useAuth()
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return auth.accessToken ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }}
    />
  )
}

export default RequireAuth
