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
import data from "layouts/dashboard/components/Projects/data";
// import GridUI3 from 'layouts/dashboard/components/Projects/GridUI3';
import GridUI3 from './GridUI3';
import { GRID_KEYS } from './data/index';

function Projects() {
  const { columns, rows } = data();
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );


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
    <GridUI3 addMemberHandler={addMemberHandler} rows={gridData} setRows={setGridData} handleDelete={handleDelete} />

  );
}

export default Projects;
