
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
import Typography from '@mui/material/Typography';
import MDSnackbar from 'components/MDSnackbar';
import useData from './../../hook/useData';

const generateRandomId = () => {
  const randomId = Math.random().toString(36).substr(2, 6);
  return randomId;
};


const Modal = {
  ownerName: '',
  id: '',
  type: ''
}

function EditToolbar({ setKMOwnerList, setRowModesModel }:any) {

  const handleClick = () => {
    const id = generateRandomId();
    setKMOwnerList((oldRows) => [...oldRows, { ...Modal,id }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'ownerName' },
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


function KMOwner() {
  const {KMOwnerList, setKMOwnerList} = useData();
  const [rowModesModel, setRowModesModel] = React.useState({});
 
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
    setKMOwnerList(KMOwnerList.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {

    const editedRow = KMOwnerList.find((row) => row.id === id);

    if(editedRow.ownerName == '' ){
      setMessage(`Owner Name can't be empty`);
      openErrorSB();
      return null
    }
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    if (editedRow.isNew){
      setKMOwnerList(KMOwnerList.filter((row) => row.id !== id));
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



    if(updatedRow.ownerName == '' ){
      setMessage(`Owner Name can't be empty`);
      openErrorSB();
      return null
    }

    setKMOwnerList(KMOwnerList.map((row) => (row.id === newRow.id ? updatedRow : row)));
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
    {
      editable: true, field: 'ownerName', headerName: 'Owner Name', width: 230
    },
   

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
          rows={KMOwnerList}
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
            toolbar: { setKMOwnerList, setRowModesModel },
          }}
        />
    </>
  );
}


export default  KMOwner;

