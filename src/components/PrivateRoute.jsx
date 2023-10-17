import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { isLoggedIn } from '../auth'

// const login = false
const PrivateRoute = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to={'/login'} />
  //   if (isLoggedIn()) {
  //     return <Outlet />
  //   } else {
  //     return <Navigate to={'/login'} />
  //   }
}

export default PrivateRoute
