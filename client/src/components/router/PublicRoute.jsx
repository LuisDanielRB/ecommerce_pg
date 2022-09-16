
import { Outlet , Navigate } from 'react-router-dom'
import { verifyAuth } from '../../context/authContext'
import { PRIVATE } from '../../config/path'

export default function PublicRoute() {
    const {isAuthenticated} = verifyAuth()
    
    if(isAuthenticated) {
      return <Navigate to={PRIVATE} />
    }

  return (
    <div>
      <Outlet/>
    </div>
  )
}
