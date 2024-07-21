/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
// import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes from "routes";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import MyDocument from "./PDF/MyDocument";
import DeshboardScreen from "DeshboardScreen";
import Basic from "layouts/authentication/sign-in";
import MainLogin from "Login/MainLogin";
import Home from "Login/pages/home";
import Login from "Login/pages/login";
import Signup from "Login/pages/signup";
import { authStates } from "Login/components/auth";
import { withAuth } from "Login/components/auth";
// import Basic from "layouts/authentication/sign-in";

function ProtectedRoute({ element: Component, authState, ...rest }:any) {
  return authState === authStates.LOGGED_IN ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" />
  );
}


const App = (props: any) => {


  return <>
    {/* <DeshboardScreen /> */}

    <Routes>
 <Route path="/" element={<Navigate to="/login" />} />
      <Route element={<Login />} path="/login" />
      <Route element={<Signup />} path="/signup" />
      {/* <Route path="/ss" element={<ProtectedRoute element={DeshboardScreen} />} /> */}


    </Routes>
   
{ props.authState === authStates.LOGGED_IN &&  <DeshboardScreen />}
  </>

}


export default withAuth(App)