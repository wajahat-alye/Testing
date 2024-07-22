import React from "react";
import { Link, Navigate } from "react-router-dom";

import { authStates, withAuth } from "../components/auth";
import en from "../utils/i18n";
import { createNewUser } from "../utils/firebase";
import Loader from "../components/loader";
import { validateEmailPassword } from "../utils/helpers";
import { Avatar, Button, TextField, Grid, Box, Typography, Container, CssBaseline, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import "../styles/login.css";
import theme from "assets/theme";

class SignUp extends React.Component {
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

    //Verify that password fields match
    if (target.type === "password") {
      this.setState(function (state) {
        if (state.password !== state.retype) {
          return {
            error: en.ERRORS.PASSWORD_MISMATCH,
          };
        }
      });
    }
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

    createNewUser(this.state.email, this.state.password)
      .then(() => {
        console.log("Signed Up!");
      })
      .catch(e => {
        console.log("Error signing up", e);
        if (e.code === "auth/email-already-in-use") {
          this.setState({
            error: "Email already in use",
          });
        }else{
          this.setState({
            error: `${e}`,
          });
        }
      });
  }

  render() {
    /* eslint-disable react/prop-types */

    if (this.props.authState === authStates.INITIAL_VALUE) {
      return <Loader />;
    }
    /* eslint-disable react/prop-types */

    if (this.props.authState === authStates.LOGGED_IN) {
      return <Navigate to="/" />;
    }

    const errorMsg = this.state.error;

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
              {en.GREETINGS.SIGNUP}
            </Typography>
            <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="retype"
                label={en.FORM_FIELDS.RETYPE_PASSWORD}
                type="password"
                id="retype"
                autoComplete="current-password"
                onChange={this.handleInputChange}
              />
              {errorMsg && <Alert severity="error">Error: {errorMsg}</Alert>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, color: "white" }}
                style={{ color: 'white' }}

              >
                Signup
              </Button>



              <Grid container>
                <Grid item xs>
                  <Link
                   style={{ color: 'rgb(73, 80, 87)', fontSize: '16px' }}
                  
                  to="#"
                  //  variant="body2"
                  
                  >
                    Already a member?
                  </Link>
                </Grid>
                <Grid item>
                  <Link 
                   style={{ color: 'rgb(73, 80, 87)', fontSize: '16px' }}
                  
                  to="/login" >
                    Login
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

export default withAuth(SignUp);
