import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { LoginPage, Home, Issue } from "./pages";
import Devices from "./pages/devices";
import Locations from "./pages/locations";

function App() {
  const { status } = useSelector((state) => state.auth);
  const isLoggedIn = status === "logged";
  return (
    <div
      className="d-flex justify-content-center align-items-center bg-light"
      style={{ height: "100vh", width: "100vw" }}
    >
      <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            {/* <Route path="/issue/:id" element={<Issue />} /> */}
            <Route path="/locations" element={<Locations />} />
            <Route path="/issue/:id" element={<Devices />} />
            <Route path="*" element={<Navigate to="/" />} />
            {/* <Route path="*" element={<Navigate to="/locations" />} /> */}
          </Routes>
      </BrowserRouter>
      ,
    </div>
  );
}

export default App;
