import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import { AuthProvider } from "./context/authContext";
import Dashboard from "./components/Dashboard";
import CreateEvent from "./components/CreateEvent";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/createvent" element={<CreateEvent/>} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
