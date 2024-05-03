import React, { createContext, useState, useContext } from 'react';
import MDSnackbar from 'components/MDSnackbar';


// const MDSnackbar = (props)=>{
//   return <></>
// }


// Create a context for notifications
const NotificationsContext = createContext();

// Custom hook to access the notifications context
const useNotifications = () => useContext(NotificationsContext);

const NotificationsProvider = ({ children }:any) => {
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

  return (
   <>
       <NotificationsContext.Provider value={value}>
       
        {children}
        {successSB && (
        <MDSnackbar
          color="success"
          icon="check"
          title="Material Dashboard"
          content="Hello, world! This is a success notification message"
          dateTime="11 mins ago"
          open={successSB}
          // onClose={closeSuccessSB}
          // close={closeSuccessSB}
          // bgWhite
        />
        // <h1>asdfasdfasdf</h1>
      )}
      </NotificationsContext.Provider>
      
    

      {/* {infoSB && (
        <MDSnackbar
          icon="notifications"
          title="Material Dashboard"
          content="Hello, world! This is an info notification message"
          dateTime="11 mins ago"
          open={infoSB}
          onClose={closeInfoSB}
          close={closeInfoSB}
        />
      )}

      {warningSB && (
        <MDSnackbar
          color="warning"
          icon="star"
          title="Material Dashboard"
          content="Hello, world! This is a warning notification message"
          dateTime="11 mins ago"
          open={warningSB}
          onClose={closeWarningSB}
          close={closeWarningSB}
          // bgWhite
        />
      )}

      {errorSB && (
        <MDSnackbar
          color="error"
          icon="warning"
          title="Material Dashboard"
          content="Hello, world! This is an error notification message"
          dateTime="11 mins ago"
          open={errorSB}
          onClose={closeErrorSB}
          close={closeErrorSB}
          // bgWhite
        />
      )} */}
  
   </>
  );
};

export { NotificationsProvider, useNotifications };
