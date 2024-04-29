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
import Projects from "layouts/dashboard/components/Projects";
import { useState } from 'react';
import { GRID_KEYS } from './components/Projects/data/index';
import CustomerUI from './components/Projects/CustomerUI';
import KMOwner from './components/Projects/KMOwner';
import Sector from './components/Projects/Sector';
import Card from '@mui/material/Card';
import MDTypography from 'components/MDTypography';
import Icon from '@mui/material/Icon';

const Template = ({title, children}:any) => {
  return <Card>
  <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
    <MDBox>
      <MDTypography variant="h6" gutterBottom>
        {title}
      </MDTypography>
      
    </MDBox>
 
  </MDBox>
  <MDBox>
 
          
         {children}

  </MDBox>
</Card>
}


function Dashboard() {


  const [isDisable, setDisable] = useState(false);

  const [formData, setFormData] = useState(GRID_KEYS);
  const [gridData, setGridData] = useState([]);
  const [gs, setGs] = useState({
    openSlideout: false
  })



  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const setGsHandler = (name, value) => {
    setGs((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addMemberHandler = () => {
    setGsHandler('openSlideout', true);
  }

  const saveHandler = () => { 
    setGridData(p => ([...p, formData]))
    setGsHandler('openSlideout', false);
    setFormData(GRID_KEYS);
  }

  const onSaveHandler = () => {
    saveGridData(gridData);
  }

  const handleDelete = ()=>{

  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Template><Projects addMemberHandler={addMemberHandler} rows={gridData} setRows={setGridData} handleDelete={handleDelete} /> </Template>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <MDBox py={3}>
        
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
            <Template title={'Customer'}><CustomerUI  /></Template>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
            <Template title={'KAM/Owner'}><KMOwner /></Template>
            </Grid>
          </Grid>
        </MDBox>

      </MDBox>
      <MDBox py={3}>
      <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
            <Template title={'KAM/Owner'}><Sector  /></Template>
            </Grid>
          </Grid>
        </MDBox>
        </MDBox>


      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
