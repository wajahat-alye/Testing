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

/**
  This file is used for controlling the global states of the components,
  you can customize the states for the different components here.
*/

import { createContext, useContext, useReducer, useMemo } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import MDSnackbar from 'components/MDSnackbar';
import {useState} from 'react';

// Material Dashboard 2 React main context
const MaterialUI = createContext();

// Setting custom name for the context which is visible on react dev tools
MaterialUI.displayName = "Notification1";


// Material Dashboard 2 React context provider
function Notifications1Provider({ children }:any) {
  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [message, setMessage] = useState('');

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
  const openWarningSB = () => setWarningSB(true);
  const closeWarningSB = () => setWarningSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);



  const value = {
    successSB,
    infoSB,
    warningSB,
    errorSB,
    openSuccessSB,
    closeSuccessSB,
    openInfoSB,
    closeInfoSB,
    openWarningSB,
    closeWarningSB,
    openErrorSB,
    closeErrorSB,
    message,
    setMessage
  };




  return  (<MaterialUI.Provider value={value}>
       
    {children}
    {successSB && (
    <MDSnackbar
      color="success"
      icon="check"
      title="Material Dashboard"
      content="Hello, world! This is a success notification message"
      dateTime="11 mins ago"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      // bgWhite
    />
    // <h1>asdfasdfasdf</h1>
  )}
  </MaterialUI.Provider>);
}

// Material Dashboard 2 React custom hook for using context
function useNotifications1() {
  const context = useContext(MaterialUI);

  if (!context) {
    throw new Error(
      "useNotifications1 should be used inside the Notifcations1Provider."
    );
  }

  return context;
}




export { Notifications1Provider, useNotifications1 };