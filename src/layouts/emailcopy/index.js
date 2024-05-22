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
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Dashboard components
import { useState } from "react";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import { Template } from "./../globalcomponents/Templates";
import MonthlySummary from "./components/Projects/MonthlySummary";
import PreSalesWeeklySummary from "./components/Projects/PreSalesWeeklySummary";
import DeshboardSummary from "./components/Projects/DeshboardSummary";
import { GRID_KEYS } from "./../dashboard/components/Projects/data/index";
import { TQRRWChart } from "./../graphs/components/charts/index";
import TableTempalte from "./components/Projects/TableTempalte";
import FooterUI from "./../../examples/Footer/FooterUI";
import MyDocument from "./../../PDF/MyDocument";
import * as reduxData from "context/useGlobalData";

function EmailCopy() {
  const [controller, dispatch] = reduxData.useGlobalController();
  const [isDisable, setDisable] = useState(false);

  const [formData, setFormData] = useState(GRID_KEYS);
  const [gridData, setGridData] = useState([]);
  const [gs, setGs] = useState({
    openSlideout: false,
  });

  const setGsHandler = (name, value) => {
    setGs((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addMemberHandler = () => {
    setGsHandler("openSlideout", true);
  };

  let currentDate = new Date().toJSON().slice(0, 10);

  const TQRRWChartData = [
    {
      data: [
        { value: 3, label: "South" },
        { value: 4, label: "North" },
        { value: 5, label: "Central" },
      ],
    },
  ];

  const makeFormatter = (payload) => {
    const make = [
      {
        data: payload,
      },
    ];
    return make;
  };

  // console.log(
  //   "controller?.currentWeekPie",
  //   controller?.currentWeekPie,
  //   controller?.previousWeekPie,
  //   controller?.currentMonthPie,
  //   controller?.previousMonthPie,
  //   makeFormatter(controller?.previousWeekPie )
  // );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <MDTypography variant="h6" gutterBottom>
          Current Date: {currentDate}
        </MDTypography>
      </MDBox>

      <MDBox>
        <Grid item xs={12} md={12} lg={12}>
          <MyDocument />
        </Grid>
      </MDBox>

      <TableTempalte title={"Deshboard Summary"} />

      {/* <MDBox py={3}>
        
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Template title={'Deshboard Summary'}><DeshboardSummary addMemberHandler={addMemberHandler}  /> </Template>
            </Grid>
          <Grid item xs={12} md={6} lg={6}>
          <Template  title={'Pre-Sales Weekly Summary'}><PreSalesWeeklySummary /></Template>

            </Grid>
            
            <Grid item xs={12} md={6} lg={6}>
            <Template title={'Monthly Summary'}><MonthlySummary  /></Template>

            </Grid>
            
          </Grid>
        </MDBox>

      </MDBox> */}

      <MDBox py={3}>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <Template title={"Current Week Work Load Distribution"}>
                <TQRRWChart series={makeFormatter(controller?.currentWeekPie || [])} />
                {/* <TQRRWChart series={aaaa} /> */}
              </Template>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Template title={"Previous Week Work Load Distribution"}>
                <TQRRWChart series={makeFormatter(controller?.previousWeekPie || [])} />
                {/* <TQRRWChart series={TQRRWChartData} /> */}
              </Template>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Template title={"Current Month Work Load Distribution"}>
                <TQRRWChart series={makeFormatter(controller?.currentMonthPie || [])} />
                {/* <TQRRWChart series={TQRRWChartData} /> */}
              </Template>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Template title={"Previous Month Work Load Distribution"}>
                <TQRRWChart series={makeFormatter(controller?.previousMonthPie || [])} />
                {/* <TQRRWChart series={TQRRWChartData} /> */}
              </Template>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>

      <FooterUI
        company={{ href: "https://www.creative-tim.com/", name: "Creative Tim" }}
        links={[
          { href: "https://www.creative-tim.com/", name: "Creative Tim" },
          { href: "https://www.creative-tim.com/presentation", name: "About Us" },
          { href: "https://www.creative-tim.com/blog", name: "Blog" },
          { href: "https://www.creative-tim.com/license", name: "License" },
        ]}
      />

      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default EmailCopy;
