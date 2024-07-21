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
import theme from "assets/theme";

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
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {en.GREETINGS.LOGIN}
          </Typography>
          <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
            <Routes>
              {getRoutes(routes)}
            </Routes>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={en.FORM_FIELDS.EMAIL}
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={en.FORM_FIELDS.PASSWORD}
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.handleInputChange}
            />
            {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color: "white" }}
              style={{ color: 'white' }}

            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {en.FORM_FIELDS.LOGIN_ALT_TEXT}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    );
  }
}

export default withAuth(Login);
