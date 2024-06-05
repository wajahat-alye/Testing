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

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";
import { GlobalControllerProvider } from "context/useGlobalData";
import { NotificationsProvider } from "context/useNotifications";
import { Notifications1Provider } from "context/useNotifications1";
// import { fileURLToPath } from 'node:url';

const container = document.getElementById("app");
const root = createRoot(container);

// const __dirname = fileURLToPath(new URL('.', import.meta.url));
import { LoaderProvider } from 'hook/useLoader';


root.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <GlobalControllerProvider>
<Notifications1Provider >
  <LoaderProvider >
        <App />
  </LoaderProvider >

      </Notifications1Provider >

      </GlobalControllerProvider>

    </MaterialUIControllerProvider>
  </BrowserRouter>
  // ,`${__dirname}/recharts-basic.pdf`
);
