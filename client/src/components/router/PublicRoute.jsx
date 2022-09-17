
import { Outlet , Navigate } from 'react-router-dom'
import { PRIVATE } from '../../config/path'
import {useSelector} from 'react-redux'
export default function PublicRoute() {
  const isAuthenticated = useSelector((state) => state.isAuthenticated)
    
    if(isAuthenticated) {
      return <Navigate to={PRIVATE} />
    }

  return (
    <div>
      <Outlet/>
    </div>
  )
}