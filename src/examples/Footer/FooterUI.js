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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React base styles
import typography from "assets/theme/base/typography";
import AppBar from "@mui/material/AppBar";

import { importExportBtnStyle } from './../../layouts/dashboard/components/styles.js/TablesStyles';


// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";
import Button from "@mui/material/Button";
import MDButton from "components/MDButton";
import useData from "./../../layouts/dashboard/hook/useData";
import Card from "@mui/material/Card";
import * as reduxData from "context/useGlobalData";
import { useLoader } from './../../hook/useLoader';

function FooterUI({}) {
  const { saveToFirebase, saveSectorToFirebase, saveKMOwnerToFirebase, saveCustomerToFirebase } =
    useData();
  const [controller, dispatch] = reduxData.useGlobalController();
  const { showLoader, hideLoader } = useLoader();

  const saveData = async () => {
    try{
      showLoader();
      await saveToFirebase();
      await saveCustomerToFirebase();
      await saveKMOwnerToFirebase();
      await saveSectorToFirebase();
      reduxData.setDeshboardToast(dispatch, true);
    }catch(e){

    }finally{
      hideLoader();
    }
  };

  return (
   <>
    <AppBar position={"sticky"} color="inherit" style={{ bottom: "0.75rem" }}>
      <Card>
        <MDBox
          width="100%"
          display="flex"
          flexDirection={{ xs: "column", lg: "row" }}
          justifyContent="end"
          alignItems="end"
          px={1.5}
        >
          <MDBox p={2} mt="auto">
            <Button
              variant="contained"
              sx={importExportBtnStyle}
              component="Button"
              target="_blank"
              rel="noreferrer"
              onClick={saveData}
              fullWidth
            >
              Save
            </Button>
          </MDBox>
        </MDBox>
      </Card>
    </AppBar>
   </>
  );
}

export default FooterUI;
