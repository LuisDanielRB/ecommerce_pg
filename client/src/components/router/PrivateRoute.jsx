import { Outlet, Navigate } from 'react-router-dom'
import { LOGIN } from '../../config/path'
import { useSelector } from 'react-redux'

export default function PrivateRoute() {

  const isAuthenticated = useSelector((state) => state.isAuthenticated)
  return (
    ! isAuthenticated ? <Navigate to={LOGIN} /> : <Outlet /> 
  )
}
