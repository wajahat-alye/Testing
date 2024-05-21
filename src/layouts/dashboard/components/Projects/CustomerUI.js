
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { exportToCSV } from './../../../../helper/ExportCSVHelper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { importExportBtnStyle } from './../styles.js/TablesStyles';
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
import Grid from '@mui/material/Grid';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import MDSnackbar from 'components/MDSnackbar';
import useData from './../../hook/useData';
import { useGlobalController } from 'context/useGlobalData';
import { useCallback, useEffect, useRef, useState } from 'react';
import SymbolAccordion from 'layouts/globalcomponents/SymbolAccordionRowView';
import * as reduxData from "context/useGlobalData";



const generateRandomId = () => {
  const randomId = Math.random().toString(36).substr(2, 6);
  return randomId;
};

const Modal = {
  customerName: '',
  id: '',
}

function EditToolbar({ setCustomerList, setRowModesModel }:any) {
	// const symbolAccordionRef = useRef(null);

  const handleClick = ()=>{
    const id = generateRandomId();
      setCustomerList((oldRows) => [...oldRows, { ...Modal,id }]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: 'customerName' },
      }));
  }

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
      {/* <SymbolAccordion columns={['Id','Customer Name']} fileName={'Customer'} ref={symbolAccordionRef} /> */}
    </GridToolbarContainer>
  );
}





function CustomerUI() {
  const [controller, dispatch] = useGlobalController();

  const [rowModesModel, setRowModesModel] = React.useState({});
  const {getFromFirebase} = useData();
  const [customerList, setCustomerList] = useState([]);
  
  useEffect(() => {
    reduxData.setCustomerList(dispatch, customerList);
  }, [customerList]);

  useEffect(()=>{
    const fetch = async ()=>{
     const data = await getFromFirebase()
     setCustomerList(data);
    }
    fetch();
   },[])
 


 
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
    setCustomerList(customerList.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
   

    

    const editedRow = customerList.find((row) => row.id === id);

    if(editedRow.customerName == '' ){
      setMessage(`Customer Name can't be empty`);
      openErrorSB();
      return null
    }
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    if (editedRow.isNew){
      setCustomerList(customerList.filter((row) => row.id !== id));
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



    if(updatedRow.customerName == '' ){
      setMessage(`Customer Name can't be empty`);
      openErrorSB();
      return null
    }

    setCustomerList(customerList.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };




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
      editable: true, field: 'customerName', headerName: 'Customer Name', width: 230
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


	const symbolAccordionRef = useRef(null);

  return (
    <>

    {renderErrorSB}
  <SymbolAccordion gridType={2} getData={setCustomerList}  data={customerList}  ref={symbolAccordionRef} />
     
    <DataGrid
          rows={customerList}
          autoHeight={true}
          columns={columns}
          editMode='row'
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar 
          }}
          slotProps={{
            toolbar: { setCustomerList, setRowModesModel },
          }}
        />
    </>
  );
}


export default  CustomerUI;

