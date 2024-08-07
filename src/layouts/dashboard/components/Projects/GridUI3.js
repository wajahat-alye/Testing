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
import { db } from "layouts/authentication/firebase/firebase";
import { Timestamp } from "@firebase/firestore";
import moment from "moment/moment";
import { convertToDate } from "helper/func";

const generateRandomId = () => {
  const randomId = Math.random().toString(36).substr(2, 6);
  return randomId;
};


function excelSerialNumberToFirebaseTimestamp(serial) {
  const utcDays = Math.floor(serial - 25569);
  const utcValue = utcDays * 86400; // Convert days to seconds
  const dateInfo = new Date(utcValue * 1000);

  const fraction = serial - Math.floor(serial);
  const milliseconds = Math.round(fraction * 86400000);

  dateInfo.setUTCMilliseconds(milliseconds);

  // Convert JavaScript Date to Firebase Timestamp
  const timestamp = moment(new Date(dateInfo)).format("MM-DD-YYYY");

  return timestamp;
}


const getDayCount = (startDateString) => {

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




function EditToolbar({ setRows, headers, fileName, setRowModesModel, rows, fieldToFocus, handleDeleteSelected }: any) {

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {

    let maxID = 0;
    if (rows && rows.length > 0) {
      rows.forEach(e => {
        if (e.id > maxID) {
          maxID = +e.id
        }
      })
    }

    let id = maxID + 1;
    setRows((oldRows) => [{ ...GRID_KEYS, id, isNew: true }, ...oldRows]);
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

        }}
        csvOptions={{ fileName: fileName }}
        printOptions={{ fileName: fileName }}
      />
      <Button
        color="primary"
        startIcon={<DeleteIcon  />}
        onClick={handleDeleteSelected}
      >
        Delete Records
      </Button>
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
          // submissionTo
          // projectLevel
          // dateReceived
          setRows(data.rows.map((e) => {
            let submissionTo = e.values.submissionTo;
            if (typeof submissionTo === 'number') {
              submissionTo = excelSerialNumberToFirebaseTimestamp(submissionTo);
            } else if (["", "-"].includes(submissionTo)) {
              submissionTo = '';

            } else {
              // submissionTo = Timestamp.fromDate(new Date(submissionTo))

            }

            if (e?.values?.projectLevel) {
              let projectLevel = e.values.projectLevel;
              if (typeof projectLevel === 'number') {
                projectLevel = excelSerialNumberToFirebaseTimestamp(projectLevel);

              } else if (["", "-"].includes(projectLevel)) {
                projectLevel = '';

              } else {
                // projectLevel = Timestamp.fromDate(new Date(projectLevel))

              }
            }



            let dateReceived = e.values.dateReceived;
            if (typeof dateReceived === 'number') {
              dateReceived = excelSerialNumberToFirebaseTimestamp(dateReceived);

            } else if (["", "-"].includes(dateReceived)) {
              dateReceived = '';

            } else {
              // dateReceived = Timestamp.fromDate(new Date(dateReceived))

            }
            let final = { ...e.values, submissionTo, dateReceived };
            return final;
          }));
          console.log('importing data', data);
          setIsOpen(false);
        }}
        template={{
          columns: headers,
        }}
      />
    </GridToolbarContainer>
  );
}




const GridUI3 = ({ headers, fileName, columns, fieldToFocus, rows, setRows, vh = false }: any) => {
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [errorSB, setErrorSB] = React.useState(false);
  const [gs, setGs] = useState({
    title: "",
    message: "",
  });
  const classes = {
    root: {
      height: '77vh',  // Set height to full viewport height
      // width: '100%',    // Ensure it takes full width of the page
      // display: 'flex',
      // flexDirection: 'column',
    },
    dataGridContainer: {
      // height: "250px",
      // flexGrow: 1,       // Ensure the container expands to fill available space
      // marginTop: '20px', // Example margin top for spacing
    },
  }
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

      if (updatedRow.submissionTo) {
        updatedRow.submissionTo = convertToDate(updatedRow.submissionTo).format("MM-DD-YYYY")
      }
      if (updatedRow.projectLevel) {
        updatedRow.projectLevel = convertToDate(updatedRow.projectLevel).format("MM-DD-YYYY")
      }
      if (updatedRow.dateReceived) {
        updatedRow.dateReceived = convertToDate(updatedRow.dateReceived).format("MM-DD-YYYY")
      }
      if (fileName === 'Deshboard Entries') {
        if (headers[i].key == "status") {
          if (["Completed", "RFP Cancelled"].includes(updatedRow.status)) {
            updatedRow.submissionTo = moment().format("MM-DD-YYYY");
            updatedRow.projectLWC = updatedRow?.dateReceived ? getDayCount(updatedRow.dateReceived) : "";



          } else {
            updatedRow.projectLWC = 0;

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

  const handleCellEditCommit = (params) => {
    const { id, field, value, api } = params;
    api.setEditCellValue({ id, field, value });
  };


  const [selectionModel, setSelectionModel] = useState([]);

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
  };

  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

  const handleDeleteSelected = () => {
    // Implement logic to delete selected rows
    const updatedRows = rows.filter((row) => !rowSelectionModel.includes(row.id));
    // Optionally perform API calls or other operations here

    // Update state with remaining rows and clear selection
    setRows(rows.filter((row) => !rowSelectionModel.includes(row.id)));

    // Update your data source with updatedRows or perform deletion logic
  };


  console.log("rowSelectionModel",rowSelectionModel)


  return (
    <>
      {/* <div style={{ height: '100vh', width: '100%' }}> */}

      {renderErrorSB}
      {/* <div className={classes.root}> */}
      {/* Container for the DataGrid */}
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
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelectionModel}

        slots={{
          toolbar: EditToolbar,
          loadingOverlay: LinearProgress,
        }}
        slotProps={{
          toolbar: { setRows, headers, fileName, setRowModesModel, rows, fieldToFocus, handleDeleteSelected },
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        style={vh ? classes.root : classes.dataGridContainer}
        onCellEditCommit={handleCellEditCommit}


      />
      {/* </div> */}
      {/* </div> */}
    </>
  );
};

export default memo(GridUI3);
