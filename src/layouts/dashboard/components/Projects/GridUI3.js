
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridSlots,
  GridToolbarContainer,
} from '@mui/x-data-grid';

import * as React from 'react';
import { dp_customer, dp_kamOwner, GRID_KEYS_LIST, dp_pstAssign, dp_region, dp_sector, dp_status, GRID_KEYS, GRID_KEYS_Values } from './data/index';
import Typography from '@mui/material/Typography';
import MDSnackbar from 'components/MDSnackbar';
import useData from './../../hook/useData';




const roles = ['Market', 'Finance', 'Development'];

const generateRandomId = () => {
  const randomId = Math.random().toString(36).substr(2, 6);
  return randomId;
};

function EditToolbar({ setRows, setRowModesModel }:any) {

  const handleClick = () => {
    const id = generateRandomId();
    setRows((oldRows) => [...oldRows, { ...GRID_KEYS, id,sn: id }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'dateReceived' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}



function GridUI3({ addMemberHandler }: any) {
  const [rowModesModel, setRowModesModel] = React.useState({});
  const {customerListRedux,rows,setRows, KMOwnerListRedux,sectorListRedux} = useData();


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
    if (editedRow.isNew){
      setRows(rows.filter((row) => row.id !== id));
    }
  };
  const [errorSB, setErrorSB] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Column Can't be empty Error"
      content={message}
      // dateTime="11 mins ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );
  

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };



for(let i=0; i< GRID_KEYS_LIST.length; i++){
  if(updatedRow[GRID_KEYS_LIST[i]] == '' || updatedRow[GRID_KEYS_LIST[i]] == 0){
    setMessage(`${GRID_KEYS_Values[GRID_KEYS_LIST[i]]} can't be empty`);
    openErrorSB();
    return null
  }
}

    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };


  const makeDate = (date) => {
    if (date?.seconds) {
      return date.toDate();
    }
    return date;
  }

  const valueGetter  = (e)=>{
    console.log('valuevaluevaluevalueGetter',e);
  }

  const valueSetter  = (e)=>{
    console.log('valuevaluevaluevalueSetter',e);
  }

  const columns= [
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              key={'111'}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
              key={'1111'}

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
            key={'111111'}

          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
            key={'111111'}

          />,
        ];
      },
    },
    { editable: false, field: 'sn', headerName: 'S/N', width: 70 },
    {
      editable: true, valueGetter: makeDate, type: 'date', field: 'dateReceived', headerName: 'Date Received', width: 130
    },
    {
      editable: true, valueGetter: makeDate, type: 'date', field: 'dueDateByKAM', headerName: 'Due Date by KAM /Customer', width: 130
    },
    {
      editable: true, valueGetter: makeDate, type: 'date', field: 'projectLevel', headerName: 'Project Level', width: 130
    },
    { editable: true, field: 'tat', headerName: 'TAT', width: 130 },
    { editable: true, type: 'number', field: 'projectLWC', headerName: 'Project Life (Work Days)', width: 130 },
    { editable: true, type: 'singleSelect', valueOptions: dp_status, field: 'status', headerName: 'Status/Dependencies', width: 130 },
    { editable: true,  type: 'singleSelect', valueOptions: customerListRedux.map(e => e.customerName), field: 'customer', headerName: 'Customer', width: 130 },
    { editable: true, type: 'singleSelect', valueOptions: dp_region, field: 'region', headerName: 'Region', width: 130 },
    {editable: true, type: 'singleSelect',field: 'kamOwner', valueOptions: KMOwnerListRedux.map(e => e.ownerName), headerName: 'KAM/ Owner', width: 130 },
    { editable: true, type: 'singleSelect', valueOptions: sectorListRedux.map(e => e.sectorName), field: 'sector', headerName: 'Sector', width: 130 },
    { editable: true, type: 'singleSelect', valueOptions: KMOwnerListRedux.map(e => e.ownerName), field: 'pstAssign', headerName: 'Pre-Sales task Assigned to', width: 130 },
    { editable: true, field: 'requirement', headerName: 'Requirement / Query', width: 130 },
    { editable: true, type: 'number', field: 'psrUpdates', headerName: 'Pre-Sales Remarks / Updates', width: 130 },
    { editable: true,  type: 'number', field: 'proposedSolution', headerName: 'Proposed Solution', width: 130 },
    { editable: true,   type: 'number',field: 'srdiother', headerName: 'Sale/ Rental/ Demo/ In-House/ Other', width: 130 },
    { editable: true,  type: 'number', valueGetter: makeDate, type: 'date', field: 'submissionTo', headerName: 'Submission to KAM/ Owner', width: 130 },
    { editable: true, type: 'number', field: 'additionR', headerName: 'Additional Remarks', width: 130 },

  ];

  const boxClasses = {

    margin: '10px 0px 0px 0px',
    width: '100%',
    '& .actions': {
      color: 'text.secondary',
    },
    '& .textPrimary': {
      color: 'text.primary',
    },
  };

  return (
    <>
    {renderErrorSB}
    <DataGrid
          rows={rows}
          autoHeight={true}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar 
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
    </>
  );
}


export default  GridUI3;

