import React from "react";
import { Link, Navigate, Route, Routes  } from "react-router-dom";

import { authStates, withAuth } from "../components/auth";
import en from "../utils/i18n";
import Loader from "../components/loader";
import { signIn } from "../utils/firebase";
import { validateEmailPassword } from "../utils/helpers";
import { Avatar, Button, TextField, Grid, Box, Typography, Container, CssBaseline, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import "../styles/login.css";
import routes from "routes";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      retype: "",
      error: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      error: "",
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.error) {
      return;
    }

    //Validate email & password
    const errorMsg = validateEmailPassword(
      this.state.email,
      this.state.password
    );

    if (errorMsg) {
      this.setState({
        error: errorMsg,
      });
      return;
    }

    signIn(this.state.email, this.state.password)
      .then(() => {
        console.log("Signed In");
      })
      .catch(e => {
        console.log("Error signing in", e);
        this.setState({
          error: "Incorrect email/password",
        });
      });
  }
  render() {
    /* eslint-disable react/prop-types */
    if (this?.props?.authState === authStates.INITIAL_VALUE) {
      return <Loader />;
    }
/* eslint-disable react/prop-types */
    if (this?.props?.authState === authStates.LOGGED_IN) {
      console.log("come to login")
      return <Navigate  to="/dashboard" />;
    }

    const errorMsg = this.state.error;
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
      <form onSubmit={this.handleSubmit}>
         <Routes>
          {getRoutes(routes)}
         
        </Routes>  
        <div className="container">
          <h2>{en.GREETINGS.LOGIN}</h2>

          <input
            type="text"
            placeholder={en.FORM_FIELDS.EMAIL}
            name="email"
            onChange={this.handleInputChange}
            required
            className="UInput"

          />

          <input
            type="password"
            placeholder={en.FORM_FIELDS.PASSWORD}
            name="password"
            onChange={this.handleInputChange}
            required
            className="UInput"
          />
          {errorMsg && <p className="error">{errorMsg}</p>}
          <button className="Ubutton" id="login-button" type="submit">
            Login
          </button>

          <p>{en.FORM_FIELDS.LOGIN_ALT_TEXT}</p>
          <Link to="/signup">Sign up</Link>
        </div>
      </form>
    );
  }
}

export default withAuth(Login);
