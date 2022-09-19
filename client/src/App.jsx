import React , {lazy } from "react";
import { Route, Navigate , BrowserRouter } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./router/index";
import {AuthGuard} from '../src/auth/index'
import { useSelector } from "react-redux";
import { RoutesWithNotFound } from "./utils/index";
const Login = lazy(() => import('./components/Login'))
const Register = lazy(() => import('./components/Register'))
const Private = lazy(() => import('./components/Private/Private'))
const Home = lazy(() => import('./components/Home'))
const Events = lazy(() => import('./components/Events'))


function App() {

  const user = useSelector((state) => state.userLogin)
  
  return (
    <div className="App">
     
      <BrowserRouter>
        <RoutesWithNotFound>
          <Route path="/" element={<Home/>}/>
          <Route path={PublicRoute.HOME} element={<Home />}/>
          <Route path={PublicRoute.LOGIN} element={<Login />}/>
          <Route path={PublicRoute.REGISTER} element={<Register />}/>
          <Route path={PublicRoute.EVENTS} element={<Events />}/>
            <Route element={<AuthGuard />}>
              <Route path={`${PrivateRoute.PRIVATE}/*`} element={<Private/>}/>
            </Route>
        </RoutesWithNotFound>
        </BrowserRouter>
       
    </div>
  );
}

export default App;