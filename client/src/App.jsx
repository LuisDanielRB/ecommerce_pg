import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import {LOGIN , PRIVATE ,LOGOUT, EVENTS , HOME, REGISTER , CARDDETAIL , CREATEEVENT} from './config/path'
import Home from "./components/Home";
import Register from "./components/Register";
import CreateEvent from "./components/CreateEvent";
import Events from "./components/Events";
import CardDetail from "./components/UI/CardDetail";
import PublicRoute from "./components/router/PublicRoute";
import PrivateRoute from "./components/router/PrivateRoute";

function App() {
  return (
    <div className="App">

        <Routes>
          <Route path="/" element={<PublicRoute/>}>
            <Route path={LOGIN} element={<Login />} />
            <Route path={REGISTER} element={<Register />} />
          </Route>
          <Route path={PRIVATE} element={<PrivateRoute/>}>
            <Route path={HOME} element={<Home />} />
            <Route path={EVENTS} element={<Events />} />
            <Route path={CREATEEVENT} element={<CreateEvent/>} />
            <Route path={CARDDETAIL} element={<CardDetail />} />
          </Route>
        </Routes>

    </div>
  );
}

export default App;