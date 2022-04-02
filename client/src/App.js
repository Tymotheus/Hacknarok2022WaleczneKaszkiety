import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import {LoginPage, Home} from "./pages";

function App() {
  const { status } = useSelector((state) => state.auth);
  const isLoggedIn = status === "logged";
  return (
    <div
      className="d-flex justify-content-center align-items-center bg-light"
      style={{ height: "100vh", width: "100vw" }}
    >
      <BrowserRouter>
          {isLoggedIn ? (
            <Routes>
              <Route index element={<Home />} />
            </Routes>
          ) : (
            <Routes>
              <Route index element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          )}
      </BrowserRouter>
      ,
    </div>
  );
}

export default App;
