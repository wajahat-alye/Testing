import { useEffect } from "react";
import * as reduxData from "context/useGlobalData";
import { useState, memo } from "react";
import GridUI3 from "layouts/dashboard/components/Projects/GridUI3";
import { makeDate } from "../../../../helper/func";
import useData from "./../../hook/useData";
import { dp_status, dp_region } from "./../../../emailcopy/components/Projects/data/index";
import { Box, MenuItem, OutlinedInput, Select, Tooltip } from "@mui/material";
import { FormControl, styled } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { DatePicker } from "@mui/x-date-pickers";
import { getGridDateOperators, GRID_DATE_COL_DEF, GridEditDateCell } from "@mui/x-data-grid";
import moment from "moment";
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const Deshboard = ({ }: any) => {
  const { getDeshboardData, customerListRedux, KMOwnerListRedux, sectorListRedux } = useData();
  const [controller, dispatch] = reduxData.useGlobalController();
  const [rows, setRows] = useState([]);
  const CustomFormControl = styled(FormControl)({
    minWidth: 120,
    maxWidth: 300,
    margin: "8px"
  });
  useEffect(() => {
    console.log('asdfasdfasdfasdf', rows)
    reduxData.setGridData(dispatch, rows);
  }, [rows]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getDeshboardData();
      setRows(data);
    };
    fetch();
  }, []);


  const [open, setOpen] = useState(false);

  const handleDoubleClick = () => {
    setOpen(true); // Open Autocomplete on double click
  };

  const handleClose = () => {
    setOpen(false); // Close Autocomplete when needed
  };




  console.log('KMOwnerListRedux', KMOwnerListRedux)

  function renderRatingEditInputCell(params) {
    console.log("params", params)
    let { id, value, api } = params;

    if (typeof value === "string") {
      if (value) {
        value = value.split("/");
      } else {
        value = []
      }
    }

    return (
      <Select
        multiple
        value={value}
        onChange={(e) => {
          // setSelectedNames(e.target.value)
          api.setEditCellValue({ id, field: 'pstAssign', value: e.target.value.join("/") });
        }}
        sx={{ width: "100%" }}
        input={<OutlinedInput label="Multiple Select" />}
      >
        {KMOwnerListRedux.map((name) => (
          <MenuItem key={name.pstAssign} value={name.pstAssign}>
            {name.pstAssign}
          </MenuItem>
        ))}
      </Select>

    );
  }


  function renderRatingEditInputCell1(params) {
    console.log("params", params)
    const { id, value, api } = params;
    const text = typeof value === "string" ? value : value.join("/");

    return (

      <Tooltip title={text}>
        <div>{text}</div>
      </Tooltip>
    );
  }





  function GridFilterDateInput(
    props: any
  ) {
    const { item, showTime, applyValue, apiRef } = props;

    const Component = showTime ? DateTimePicker : DatePicker;

    const handleFilterChange = (newValue) => {
      applyValue({ ...item, value: newValue });
    };

    return (
      <Component
        value={item.value ? new Date(item.value) : null}
        autoFocus
        label={apiRef.current.getLocaleText('filterPanelInputLabel')}
        slotProps={{
          textField: {
            variant: 'standard',
          },
          inputAdornment: {
            sx: {
              '& .MuiButtonBase-root': {
                marginRight: -1,
              },
            },
          },
        }}
        onChange={handleFilterChange}
      />
    );
  }



  const makeDate1 = (date) => {
    // try {/
    if (!date) return '';
    return date;
  }


  const dateee = {
    resizable: false,
      renderEditCell: (params) => {
        console.log("renderEditCell", params);
        let { id, value, api }: any = params;


        return <GridEditDateCell {...params} />;
      },

      filterOperators: getGridDateOperators(false).map((item) => {
        console.log("filterOperators", item);

        return {
          ...item,
          InputComponent: GridFilterDateInput,
          InputComponentProps: { showTime: false },
        }
      }),
      valueFormatter: (value) => {
        console.log("valueFormatter", value);
        if (value) {
          // return dateAdapter.format(value, 'keyboardDate');
          return value;
        }
        return '';
      },
  }


  const columns = [
    { editable: false, field: "id", headerName: "S/N", width: 70 },
    {
      editable: true,
      // valueGetter: makeDate1,
      ...dateee,
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
      field: "projectLevel",



      ...dateee,

      
      editable: true,
      // valueGetter: makeDate,
      // type: "date",
      headerName: "Project Level",
      width: 130,
    },
    // { editable: true, field: "tat", headerName: "TAT", width: 130 },
    // {
    //   editable: true,
    //   type: "number",
    //   field: "projectLWC",
    //   headerName: "Project Life (Work Days)",
    //   width: 130,
    // },
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
      type: 'string',
      headerName: "Pre-Sales task Assigned to",
      width: 130,
      renderCell: renderRatingEditInputCell1,
      renderEditCell: renderRatingEditInputCell,





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
      // valueGetter: makeDate1,
      ...dateee,

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
    { key: "id", name: "S/N",
       required: true, suggested_mappings: ["S/N"] },
    {
      key: "dateReceived",
      name: "Date Received",
      // required: true,
      suggested_mappings: ["Date Received"]
    },
    // {
    //   key: "dueDateByKAM",
    //   name: "Due Date by KAM /Customer", suggested_mappings: ["Due Date by KAM / Customer"] 
    // },
    {
      key: "projectLevel",
      name: "Project Level", suggested_mappings: ["Project Level"]
    },
    { key: "tat", name: "TAT", suggested_mappings: ["TAT"] },
    { key: "projectLWC", name: "Project Life (Work Days)", suggested_mappings: ["Project Life (Work Days)"] },
    {
      key: "status", name: "Status/Dependencies",
      // required: true,
       suggested_mappings: ["Status/Dependencies"]
    },
    {
      key: "customer", name: "Customer",
      // required: true, 
      suggested_mappings: ["Customer"]
    },
    {
      key: "region", name: "Region",
      // required: true, 
      suggested_mappings: ["Region"]

    },
    {
      key: "kamOwner", name: "KAM/ Owner",
      // required: true,
       suggested_mappings: ["KAM / Owner", "KAM/ Owner"]
    },
    {
      key: "sector", name: "Sector",
      // required: true,
       suggested_mappings: ["Sector"]

    },
    {
      key: "pstAssign",
      //  required: true, 
      name: "Pre-Sales task Assigned to", suggested_mappings: ["Pre-Sales task Assigned to"]
      // required: true
    },
    {
      key: "requirement", name: "Requirement / Query",
      // required: true,
       suggested_mappings: ["Requirement / Query"]

    },
    { key: "psrUpdates", name: "Pre-Sales Remarks / Updates", suggested_mappings: ["Pre-Sales Remarks / Updates"] },
    { key: "proposedSolution", name: "Proposed Solution", suggested_mappings: ["Proposed Solution"] },
    { key: "srdiother", name: "Sale/ Rental/ Demo/ In-House/ Other", suggested_mappings: ["Sale / Rental / Demo / In-House / Other"] },
    { key: "submissionTo", name: "Submission to KAM/ Owner", suggested_mappings: ["Submission to KAM / Owner", "Submission to KAM/ Owner"] },
    { key: "additionR", name: "Additional Remarks", suggested_mappings: ["Additional Remarks"] },
  ];

  return (
    <GridUI3
      headers={headers}
      columns={columns}

      fieldToFocus={"dateReceived"}
      setRows={setRows}
      rows={rows}
      fileName={"Deshboard Entries"}
      vh={true}
    />
    // </div>
  );
};

export default memo(Deshboard);
