import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import { PrivateRoute } from "../../router/index";
import { RoutesWithNotFound } from "../../utils/index";

const CreateEvent = lazy(() => import("../CreateEvent"));
const Cart = lazy(() => import("../UI/Cart"));
const EventDetail = lazy(() => import("../UI/CardDetail"));
const Events = lazy(() => import("../Events"));
const AdminDashboard = lazy(() => import("../AdminDashboard"));
const Checkout = lazy(() => import('../UI/Checkout'))

function Private() {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={PrivateRoute.EVENTS} />} />
      <Route path={PrivateRoute.CREATEEVENT} element={<CreateEvent />} />
      <Route path={PrivateRoute.EVENTS} element={<Events />} />
      <Route path={PrivateRoute.EVENTDETAIL} element={<EventDetail />} />
      <Route path={PrivateRoute.CART} element={<Cart />} />
      <Route path={PrivateRoute.ADMIN_DASHBOARD} element={<AdminDashboard />} />
      <Route path={PrivateRoute.CHECKOUT} element={<Checkout />} />
    </RoutesWithNotFound>
  );
}


export default Private;

