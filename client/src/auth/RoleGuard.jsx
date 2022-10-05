import { Navigate, Outlet } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "../router/index";
import { UserAuth} from '../firebase/context'
import { useSelector } from "react-redux";
 
const RoleGuard = ({rol}) => {
  const {user} = UserAuth()
  const auth = useSelector((state) => state.user)
  console.log(auth.status);
  return auth.status === rol ? <Outlet /> : <Navigate replace to={PublicRoute.HOME} />;
};


export default RoleGuard;
