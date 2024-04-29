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

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";

// Data
import data from "layouts/summary/components/Projects/data";
import TableTempalte from './TableTempalte';

function Projects() {
  const { columns, rows } = data();
  
  return (
    <>
    <TableTempalte title={'asdfasdf'}/>
    <TableTempalte title={'asdfasdf'}/>
    <TableTempalte title={'asdfasdf'}/>
    </>
  );
}

export default Projects;
