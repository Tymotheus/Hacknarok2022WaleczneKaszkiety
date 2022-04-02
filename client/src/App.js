import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/login";

function App() {
  return (
    <div className="d-flex justify-content-center align-items-center bg-light" style={{height: "100vh", width: "100vw"}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}>
            {/* <Route index element={<Home />} />
            <Route path="teams" element={<Teams />}>
              <Route path=":teamId" element={<Team />} />
              <Route path="new" element={<NewTeamForm />} />
              <Route index element={<LeagueStandings />} />
            </Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
      ,
    </div>
  );
}

export default App;
