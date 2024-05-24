
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Dashboard components
import { useState } from "react";
import { GRID_KEYS } from "./components/Projects/data/index";
import CustomerUI from "./components/Projects/CustomerUI";
import KMOwner from "./components/Projects/KMOwner";
import Sector from "./components/Projects/Sector";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import { Template } from "./../globalcomponents/Templates";
import FooterUI from "./../../examples/Footer/FooterUI";
import useData from "./hook/useData";
import MDSnackbar from "components/MDSnackbar";
import { useEffect } from "react";
import Deshboard from 'layouts/dashboard/components/Projects/Deshboard';
import MyDocument from './../../PDF/MyDocument';

function Dashboard() {
  const { successSB, closeSuccessSB } = useData();
  const {getFromFirebase} = useData();


  // useEffect(()=>{
  //   getFromFirebase()
  // },[])



  return (
    <>


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
        />
      )}

      <DashboardLayout>
        <DashboardNavbar />
        {/* <MDBox py={3}> */}
          {/* <MDBox>
          <Grid item xs={12} md={12} lg={12}>
                <MyDocument />
              </Grid>
          </MDBox> */}
        {/* </MDBox> */}
        
        <MDBox py={3}>
          <MDBox>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Template title={"Deshboard"}>
                  <Deshboard />{" "}
                </Template>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
        <MDBox py={3}>
          <MDBox>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={6}>
                <Template title={"Customer"}>
                  <CustomerUI />
                </Template>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Template title={"KAM/Owner"}>
                  <KMOwner />
                </Template>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
        <MDBox py={3}>
          <MDBox>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={6}>
                <Template title={"Sector"}>
                  <Sector />
                </Template>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
        <FooterUI />
      </DashboardLayout>
    </>
  );
}

export default Dashboard;
