import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import Button from "@mui/material/Button";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import * as React from "react";
import MDSnackbar from "components/MDSnackbar";
import { useState, memo } from "react";
import { ExportJsonCsv } from "react-export-json-csv";
import { CSVImporter } from "csv-import-react";
import LinearProgress from "@mui/material/LinearProgress";
import { GRID_KEYS } from "./data";

const generateRandomId = () => {
  const randomId = Math.random().toString(36).substr(2, 6);
  return randomId;
};

const getDayCount = (startDateString)=>{

// Convert the start date string to a Date object
var startDate = new Date(startDateString);

// Get the current date
var currentDate = new Date();

// Calculate the time difference in milliseconds
var timeDifference = currentDate.getTime() - startDate.getTime();

// Convert the time difference from milliseconds to days
var dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return dayDifference;
}


function EditToolbar({ setRows, headers, fileName, setRowModesModel, rows, fieldToFocus }: any) {
  
  // let maxID = 1; 
  // if(rows?.rows){
  //   rows.rows.forEach(e => {
  //     if(e.values.id > maxID){
  //       maxID = e.values.id
  //     }
  //   })
  // }else{
  //   maxID = 1;
  // }
  // if(rows && rows.length > 0){
  //   rows.forEach(e => {
  //     if(e.id > maxID){
  //       maxID = e.id
  //     }
  //   })
  // }
  
  
  const gridKeys = headers.map((e) => e.key);
  const [isOpen, setIsOpen] = useState(false);
  
  const handleClick = () => {
    let a = headers;
    let b =fileName;
    let c = rows;
    let d = fieldToFocus;
    let maxID = 0;
    if(rows && rows.length > 0){
      rows.forEach(e => {
        if(e.id > maxID){
          maxID = e.id
        }
      })
    }

    let id = maxID + 1;
    setRows((oldRows) => [...oldRows, { ...GRID_KEYS , id, isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
      <GridToolbarFilterButton />
      <Button
        color="primary"
        startIcon={<FileUploadOutlinedIcon />}
        onClick={() => setIsOpen(true)}
      >
        Import
      </Button>
      <GridToolbarExport
        slotProps={{
          tooltip: { title: "Export data" },
          csvOptions: { fileName: fileName }, 
          printOptions: { fileName: fileName }
        }}

      />
      {/* <Button color="primary" startIcon={<DownloadIcon />}>
        <ExportJsonCsv headers={headers} items={rows}>
          Export
        </ExportJsonCsv>
      </Button> */}
      <CSVImporter
        modalIsOpen={isOpen}
        modalOnCloseTriggered={() => setIsOpen(false)}
        darkMode={false}
        showDownloadTemplateButton={false}
        waitOnComplete={false}
        onComplete={(data) => {
          setRows(data.rows.map((e) => e.values));
          console.log('importing data',data);
          setIsOpen(false);
        }}
        template={{
          columns: headers,
        }}
      />
    </GridToolbarContainer>
  );
}

const GridUI3 = ({ headers, fileName, columns, fieldToFocus, rows, setRows }: any) => {
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [errorSB, setErrorSB] = React.useState(false);
  const [gs, setGs] = useState({
    title: "",
    message: "",
  });

  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const setGlobal = (key, value) => {
    setGs((p) => ({ ...p, [key]: value }));
  };

  columns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      sx: {
        position: "sticky",
      },
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              key={"Save_Button_ID"}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
              key={"CANCEL_Button_ID"}
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
            key={"Edit_Button_ID"}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
            key={"Delete_Button_ID"}
          />,
        ];
      },
    },
    ...columns,
  ];

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title={gs.title}
      content={gs.message}
      // dateTime="11 mins ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );


  function formatDateToTimestamp(date) {
    // Get the Unix timestamp in seconds
    const seconds = Math.floor(date.getTime() / 1000);
    
    // Construct the timestamp string
    const timestampString = `Timestamp(seconds=${seconds}, nanoseconds=0)`;
    
    return timestampString;
  }
  
    


  const processRowUpdate = (newRow) => {
    let updatedRow = { ...newRow, isNew: false };



    for (let i = 0; i < headers.length; i++) {

      if(fileName === 'Deshboard'){
        if(headers[i].key == "status"){
          if(["Completed", "RFP Cancelled"].includes(updatedRow.status)){
            updatedRow.submissionTo = formatDateToTimestamp(new Date());


            
          }else{
            updatedRow.projectLWC = getDayCount(updatedRow.dateReceived);

          }
        }
      }

      if (headers[i].required) {
        if (updatedRow[headers[i].key] == "" || updatedRow[headers[i].key] == 0) {
          setGlobal("title", "Column Error");
          setGlobal("message", `${headers[i].name} can't be empty`);
          openErrorSB();
          return null;
        }
      }
    }
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  return (
    <>
      {renderErrorSB}

      <DataGrid
        rows={rows}
        autoHeight={true}
        checkboxSelection
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
          loadingOverlay: LinearProgress,
        }}
        slotProps={{
          toolbar: { setRows, headers, fileName, setRowModesModel, rows, fieldToFocus },
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
      />
    </>
  );
};

export default memo(GridUI3);
