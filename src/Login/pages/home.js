import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { authStates, withAuth } from "../components/auth";
import { signOut } from "../utils/firebase";
import Loader from "../components/loader";
import DeshboardScreen from "DeshboardScreen";
import routes from "routes";



class Home extends React.Component {
  render() {
    /* eslint-disable react/prop-types */
    if (this.props.authState === authStates.INITIAL_VALUE) {
      return <Loader />;
    }
    /* eslint-disable react/prop-types */

    if (this.props.authState === authStates.LOGGED_OUT) {
      return <Navigate to="/login" />;
    }



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


    // return <Navigate to="/dashboard" />;

    return (
    <>
      {/* <Routes>
          {getRoutes(routes)}
         
        </Routes>  */}
      {/* <DeshboardScreen /> */}
    </>
    );
  }
}

export default withAuth(Home);
