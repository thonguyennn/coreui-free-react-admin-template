/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react'

export const AuthContext = createContext({})
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
 
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
  
}
export default AuthProvider
