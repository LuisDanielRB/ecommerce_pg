
import { Outlet , Navigate } from 'react-router-dom'
import { verifyAuth } from '../../context/authContext'
import { LOGIN } from '../../config/path'

export default function PrivateRoute() {
  const {isAuthenticated} = verifyAuth()

    if(!isAuthenticated) {
      return <Navigate to={LOGIN} />
    }

  return (
    <div>
      <Outlet/>
    </div>
  )
}
