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

// Data
import reportsBarChartData from "layouts/summary/data/reportsBarChartData";
import reportsLineChartData from "layouts/summary/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/summary/components/Projects";
import { Card } from "@mui/material";
import DataTable from "examples/Tables/DataTable";
import EmailCopy from "layouts/emailcopy";

function Summary() {
  const { sales, tasks } = reportsLineChartData;

  return (
   <EmailCopy isShowGraph={false}  isShowDownload={false}/>
  );
}

export default Summary;
