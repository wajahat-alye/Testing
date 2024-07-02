import { useEffect } from "react";
import * as reduxData from "context/useGlobalData";
import { useState, memo } from "react";
import GridUI3 from "layouts/dashboard/components/Projects/GridUI3";
import { makeDate } from "../../../../helper/func";
import useData from "./../../hook/useData";
import { dp_status, dp_region } from "./../../../emailcopy/components/Projects/data/index";
import MultiAutocomplete from "MultiSelectDropdown";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useGridApiContext } from "@mui/x-data-grid";
import {  Box, IconButton, TextField } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import MultiSelectDropdown from "MultiSelectDropdown";
import Autocomplete from "@mui/material/Autocomplete";
import {
  FormControl,
  InputLabel,
  Chip,
  styled
} from "@mui/material";
const names = [
  "Humaira Sims",
  "Santiago Solis",
  "Dawid Floyd",
  "Mateo Barlow",
  "Samia Navarro",
  "Kaden Fields",
  "Genevieve Watkins",
  "Mariah Hickman",
  "Rocco Richardson",
  "Harris Glenn"
];








const Deshboard = ({}: any) => {
  const { getDeshboardData, customerListRedux, KMOwnerListRedux, sectorListRedux } = useData();
  const [controller, dispatch] = reduxData.useGlobalController();
  const [rows, setRows] = useState([]);
  const CustomFormControl = styled(FormControl)({
    minWidth: 120,
    maxWidth: 300,
    margin: "8px"
  });
  useEffect(() => {
    console.log('asdfasdfasdfasdf',rows)
    reduxData.setGridData(dispatch, rows);
  }, [rows]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getDeshboardData();
      setRows(data);
    };
    fetch();
  }, []);







  const columns = [
    { editable: false, field: "id", headerName: "S/N", width: 70 },
    {
      editable: true,
      valueGetter: makeDate,
      type: "date",
      field: "dateReceived",
      headerName: "Date Received",
      width: 130,
    },
    // {
    //   editable: true,
    //   valueGetter: makeDate,
    //   type: "date",
    //   field: "dueDateByKAM",
    //   headerName: "Due Date by KAM /Customer",
    //   width: 130,
    // },
    {
      editable: true,
      valueGetter: makeDate,
      type: "date",
      field: "projectLevel",
      headerName: "Project Level",
      width: 130,
    },
    // { editable: true, field: "tat", headerName: "TAT", width: 130 },
    {
      editable: true,
      type: "number",
      field: "projectLWC",
      headerName: "Project Life (Work Days)",
      width: 130,
    },
    {
      editable: true,
      type: "singleSelect",
      valueOptions: dp_status,
      field: "status",
      headerName: "Status/Dependencies",
      width: 130,
      renderCell: (params) => {
    let backgroundColor = "";
  
        switch (params.value) {
          case 'Completed':
            backgroundColor = '#dcedc8'; // Light green
            break;
          case 'Parked with KAM / Customer':
            backgroundColor = '#ffcc80'; // Light orange
            break;
          case 'Parked with Vendor / Procurement / Product Team':
            backgroundColor = '#ffe0b2'; // Light amber
            break;
          case 'Feasibilities / Infra-Structure':
            backgroundColor = '#b3e5fc'; // Light blue
            break;
          case 'RFP Cancelled':
            backgroundColor = '#ffcdd2'; // Light red
            break;
          case 'In Progress':
            backgroundColor = '#f0f4c3'; // Light yellow
            break;
          default:
            backgroundColor = 'inherit';
        }
        return (
          <Box
            sx={{
              backgroundColor: backgroundColor,
              width: "100%",
              height: "100%"
            }}
          >
            {params.value}
          </Box>
        );
      }
      // renderCell: (params) => {
        
  
      //   let cellStyle = {};
  
      //   switch (selectedStatus) {
      //     case 'Completed':
      //       cellStyle.backgroundColor = '#dcedc8'; // Light green
      //       break;
      //     case 'Parked with KAM / Customer':
      //       cellStyle.backgroundColor = '#ffcc80'; // Light orange
      //       break;
      //     case 'Parked with Vendor / Procurement / Product Team':
      //       cellStyle.backgroundColor = '#ffe0b2'; // Light amber
      //       break;
      //     case 'Feasibilities / Infra-Structure':
      //       cellStyle.backgroundColor = '#b3e5fc'; // Light blue
      //       break;
      //     case 'RFP Cancelled':
      //       cellStyle.backgroundColor = '#ffcdd2'; // Light red
      //       break;
      //     case 'In Progress':
      //       cellStyle.backgroundColor = '#f0f4c3'; // Light yellow
      //       break;
      //     default:
      //       cellStyle.backgroundColor = 'inherit';
      //   }
  
      //   return (
      //     <div style={{ backgroundColor: cellStyle.backgroundColor }}>
      //       <Select
      //         value={selectedStatus}
      //         onChange={handleChange}
      //       >
      //         <MenuItem value="">Select Status</MenuItem>
      //         <MenuItem value="Completed">Completed</MenuItem>
      //         <MenuItem value="Parked with KAM / Customer">Parked with KAM / Customer</MenuItem>
      //         <MenuItem value="Parked with Vendor / Procurement / Product Team">Parked with Vendor / Procurement / Product Team</MenuItem>
      //         <MenuItem value="Feasibilities / Infra-Structure">Feasibilities / Infra-Structure</MenuItem>
      //         <MenuItem value="RFP Cancelled">RFP Cancelled</MenuItem>
      //         <MenuItem value="In Progress">In Progress</MenuItem>
      //       </Select>
      //     </div>
      //   );
      // }
  
    
      
    },
    {
      editable: true,
      // type: "singleSelect",
      // valueOptions: customerListRedux.map((e) => e.customerName),
      field: "customer",
      headerName: "Customer",
      width: 130,
    },
    {
      editable: true,
      type: "singleSelect",
      valueOptions: dp_region,
      field: "region",
      headerName: "Region",
      width: 130,
    },
    {
      editable: true,
      // type: "singleSelect",
      field: "kamOwner",
      // valueOptions: KMOwnerListRedux.map((e) => e.ownerName),
      headerName: "KAM/ Owner",
      width: 130,
    },
    {
      editable: true,
      type: "singleSelect",
      valueOptions: sectorListRedux.map((e) => e.sectorName),
      field: "sector",
      headerName: "Sector",

      width: 130,
    },
    {
      editable: true, 
      // type: "singleSelect",
      // valueOptions: names,
      field: "pstAssign",
      headerName: "Pre-Sales task Assigned to",
      width: 130,
    //   renderCell: (params) => {
    //   const handleChange = (value) => {
    //     const newRows = [...rows];
    //     newRows[params.rowIndex].selectedOptions = value;
    //     setRows(newRows);
    //   };

    //   return (
    //     <MultiSelectDropdown
    //       value={params.value}
    //       onChange={handleChange}
    //       options={['Option 1', 'Option 2', 'Option 3']} // Replace with your options array
    //     />
    //   );
    // },






    },
    { editable: true, field: "requirement", headerName: "Requirement / Query", width: 130 },
    {
      editable: true,
      // type: "number",
      field: "psrUpdates",
      headerName: "Pre-Sales Remarks / Updates",
      width: 130,
    },
    {
      editable: true,
      // type: "number",
      field: "proposedSolution",
      headerName: "Proposed Solution",
      width: 130,
      
    },
    // {
    //   editable: true,
    //   // type: "number",
    //   field: "srdiother",
    //   headerName: "Sale/ Rental/ Demo/ In-House/ Other",
    //   width: 130,
    // },
    {
      editable: true,
      // type: "number",
      valueGetter: makeDate,
      type: "date",
      field: "submissionTo",
      headerName: "Submission to KAM/ Owner",
      width: 130,
    },
    // {
    //   editable: true,
    //   // type: "number",
    //   field: "additionR",e
    //   headerName: "Additional Remarks",
    //   width: 130,
    // },
  ];

  const headers = [
    { key: "id", name: "S/N", required: true },
    {
      key: "dateReceived",
      name: "Date Received",
      required: true,
    },
    // {
    //   key: "dueDateByKAM",
    //   name: "Due Date by KAM /Customer",
    // },
    {
      key: "projectLevel",
      name: "Project Level",
    },
    // { key: "tat", name: "TAT" },
    { key: "projectLWC", name: "Project Life (Work Days)" },
    { key: "status", name: "Status/Dependencies", 
      required: true 
    },
    { key: "customer", name: "Customer",
       required: true 
      },
    { key: "region", name: "Region",
       required: true 

    },
    { key: "kamOwner", name: "KAM/ Owner",
       required: true 
      },
    { key: "sector", name: "Sector", 
      required: true

     },
    { key: "pstAssign", name: "Pre-Sales task Assigned to", 
      // required: true
     },
    { key: "requirement", name: "Requirement / Query",
       required: true 

    },
    { key: "psrUpdates", name: "Pre-Sales Remarks / Updates" },
    { key: "proposedSolution", name: "Proposed Solution" },
    // { key: "srdiother", name: "Sale/ Rental/ Demo/ In-House/ Other" },
    { key: "submissionTo", name: "Submission to KAM/ Owner" },
    // { key: "additionR", name: "Additional Remarks" },
  ];

  return (
      <GridUI3
        headers={headers}
        columns={columns}

        fieldToFocus={"dateReceived"}
        setRows={setRows}
        rows={rows}
        fileName={"Deshboard"}
      />
      // </div>
  );
};

export default memo(Deshboard);
