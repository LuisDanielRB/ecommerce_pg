import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { PrivateRoute, PublicRoute } from "../router/index"



const PrivateValidationFragment = <Outlet />;
const PublicValidationFragment = <Navigate replace to={PrivateRoute.PRIVATE} />;

const AuthGuard = ({privateValidation}) => {
    const userState = useSelector((state) => state.isAuthenticated)
    console.log(privateValidation);
    return userState ? (
        privateValidation ? (
          PrivateValidationFragment
        ) : (
          PublicValidationFragment
        )
      ) : (
        <Navigate replace to={PublicRoute.LOGIN} />
      );
}

export default AuthGuard