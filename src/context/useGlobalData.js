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

// Material Dashboard 2 React main context
const MaterialUI = createContext();

// Setting custom name for the context which is visible on react dev tools
MaterialUI.displayName = "GlobalContext";

// Material Dashboard 2 React reducer
function reducer(state, action) {
  switch (action.type) {

    case "GET_CUSTOMER_LIST": {
        return { ...state, customerList: action.value };
      }
      case "GET_KMOWNER_LIST": {
        return { ...state, KMOwnerList: action.value };
      }
      case "GET_SECTOR_LIST": {
        return { ...state, sectorList: action.value };
      }case "GET_GRID_DATA": {
        return { ...state, gridData: action.value };
      }
  
  
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Material Dashboard 2 React context provider
function GlobalControllerProvider({ children }) {
  const initialState = {
    customerList: [],
    KMOwnerList: [],
    sectorList: [],
    gridData: [],
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <MaterialUI.Provider value={value}>{children}</MaterialUI.Provider>;
}

// Material Dashboard 2 React custom hook for using context
function useGlobalController() {
  const context = useContext(MaterialUI);

  if (!context) {
    throw new Error(
      "useGlobalController should be used inside the GlobalControllerProvider."
    );
  }

  return context;
}

// Typechecking props for the GlobalControllerProvider
GlobalControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Context module functions
const setCustomerList = (dispatch, value) => dispatch({ type: "GET_CUSTOMER_LIST", value });
const setKMOwnerList = (dispatch, value) => dispatch({ type: "GET_KMOWNER_LIST", value });
const setSectorList = (dispatch, value) => dispatch({ type: "GET_SECTOR_LIST", value });
const setGridData = (dispatch, value) => dispatch({ type: "GET_GRID_DATA", value });

export {
  GlobalControllerProvider,
  useGlobalController,
  setCustomerList,
  setKMOwnerList,
  setSectorList,
  setGridData
};
