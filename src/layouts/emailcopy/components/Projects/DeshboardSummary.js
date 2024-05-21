
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
import {useNotifications} from 'context/useNotifications';
import { useEffect, useState } from 'react';
import useData from './../../hook/useData';
import {DeshboardSummaryDataDummy} from './data';
import * as reduxData from "context/useGlobalData";


function DeshboardSummary({ addMemberHandler }: any) {
  // const { openErrorSB, closeErrorSB } = useNotifications();
  const {saveSummaryData,getSummaryData} = useData();
  const [gridData, setGridData] = useState([]);
  const [controller, dispatch] = reduxData.useGlobalController();



  useEffect(()=>{
    const data = getSummaryData();
    setGridData(DeshboardSummaryDataDummy);
    // openErrorSB();
  },[]);

  const columns= [
    { field: 'deshboard', headerName: 'Deshboard', flex: 1  },
    {  field: 'from', headerName: 'From', flex: 1  },
    {  field: 'to', headerName: 'To', flex: 1  },
    { type: 'number',  field: 'inProgress', headerName: 'In-Progress', flex: 1  },
    {  type: 'number', field: 'parked', headerName: 'Parked', flex: 1  },
    {  type: 'number', field: 'total', headerName: 'Total', flex: 1, valueGetter: (_,rowData)=>{
      return rowData.inProgress + rowData.parked;
    }  },
  ];


  return (
    <>
    <DataGrid
          rows={gridData}
          autoHeight={true}
          columns={columns}
          
        />
    </>
  );
}


export default  DeshboardSummary;

