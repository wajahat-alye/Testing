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

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Dashboard components
import MDTypography from "components/MDTypography";
import * as reduxData from "context/useGlobalData";
import { useState } from "react";
import FooterUI from "./../../examples/Footer/FooterUI";
import MyDocument from "./../../PDF/MyDocument";
import { Template } from "./../globalcomponents/Templates";
import { TQRRWChart } from "./../graphs/components/charts/index";
import TableTempalte from "./components/Projects/TableTempalte";

function EmailCopy({isShowGraph=true, isShowSummary=true, isShowDownload=true}:any) {
  const [controller, dispatch] = reduxData.useGlobalController();



  let currentDate = new Date().toJSON().slice(0, 10);


  const makeFormatter = (payload) => {
    const make = [
      {
        data: payload,
      },
    ];
    return make;
  };



  return (
    <DashboardLayout>
      <DashboardNavbar />
        {isShowSummary && <MDBox>
        <MDTypography variant="h6" gutterBottom>
          Current Date: {currentDate}
        </MDTypography>
      </MDBox>}
      {isShowDownload && <MDBox>
        <Grid item xs={12} md={12} lg={12}>
          <MyDocument />
        </Grid>
      </MDBox>}
      <TableTempalte title={"Deshboard Summary"} isShow={isShowSummary}/>
     
      {isShowGraph && <MDBox py={3}>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <Template title={"Current Week Work Load Distribution"}>
                <TQRRWChart series={makeFormatter(controller?.currentWeekPie || [])} />
              </Template>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Template title={"Previous Week Work Load Distribution"}>
                <TQRRWChart series={makeFormatter(controller?.previousWeekPie || [])} />
  
              </Template>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Template title={"Current Month Work Load Distribution"}>
                <TQRRWChart series={makeFormatter(controller?.currentMonthPie || [])} />
               
              </Template>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Template title={"Previous Month Work Load Distribution"}>
                <TQRRWChart series={makeFormatter(controller?.previousMonthPie || [])} />
          
              </Template>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>}
      <FooterUI />
    </DashboardLayout>
  );
}

export default EmailCopy;
