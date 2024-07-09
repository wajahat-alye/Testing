import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// import Home from "./pages/home";
import Login from "./pages/login";
// import Signup from "./pages/signup";

import "./llogin.css";

function LLogin() {
  return (
    <div className="App">
    <Login /></div>
    // <Router>
    //   <div className="App">
    //     <h1>My React Firebase Login App</h1>
    //     <Switch>
    //       <Route exact path="/">
    //         <Home />
    //       </Route>
    //       <Route path="/login">
    //         <Login />
    //       </Route>
    //       <Route path="/signup">
    //         <Signup />
    //       </Route>
    //     </Switch>
    //   </div>
    // </Router>
  );
}

export default LLogin;
