import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import { AuthProvider } from "./context/authContext";
import CreateEvent from "./components/CreateEvent";
import Events from "./components/Events";
import CardDetail from "./components/UI/CardDetail";
import Cart from "./components/Cart";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={<Events />} />
          <Route path="/createvent" element={<CreateEvent/>} />
          <Route path="/cardDetail" element={<CardDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;