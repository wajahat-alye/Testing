import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";

import "./MainLogin.css";
import DeshboardScreen from "DeshboardScreen";
import routes from "routes";

function MainLogin() {

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    // <Router>
    // <div className="App">
    //   <h1>My React Firebase Login App</h1>
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Login />} path="/login" />
      <Route element={<Signup />} path="/signup" />
        {/* {getRoutes(routes)} */}
        <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
    // </div>
    // </Router>
  );
}

export default MainLogin;
