import React from "react";
import { Navigate } from "react-router-dom";

import { authStates, withAuth } from "../components/auth";
import { signOut } from "../utils/firebase";
import Loader from "../components/loader";
import DeshboardScreen from "DeshboardScreen";



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

    return (
      <DeshboardScreen />
    );
  }
}

export default withAuth(Home);
