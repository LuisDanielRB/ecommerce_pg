import { lazy } from "react"
import { Navigate, Route } from "react-router-dom"
import { PrivateRoute } from "../../router/index"
import { RoutesWithNotFound } from "../../utils/index"

const Home = lazy(() => import ('../Home') )
const CreateEvent = lazy(() => import ('../CreateEvent') )
const Cart = lazy(() => import ('../UI/Cart') )
const EventDetail = lazy(() => import ('../UI/CardDetail') )
const Events = lazy(() => import ('../Events') )


function Private() {
  return (
    <RoutesWithNotFound>
        <Route path="/" element={<Navigate to={PrivateRoute.HOME} />}/>
        <Route path={PrivateRoute.HOME} element={<Home/>}/>
        <Route path={PrivateRoute.CREATEEVENT} element={<CreateEvent />}/>
        <Route path={PrivateRoute.EVENTS} element={<Events/>}/>
        <Route path={PrivateRoute.EVENTDETAIL} element={<EventDetail />}/>
        <Route path={PrivateRoute.CART} element={<Cart />}/>
    </RoutesWithNotFound>
  )
}

export default Private