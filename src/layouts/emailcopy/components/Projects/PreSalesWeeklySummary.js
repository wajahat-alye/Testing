
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
import {WeekSummaryDataDummy} from './data';

function PreSalesWeeklySummary({ addMemberHandler }: any) {
  // const { openErrorSB, closeErrorSB } = useNotifications();
  const {saveSummaryData,getSummaryData} = useData();
  const [gridData, setGridData] = useState([]);




  useEffect(()=>{
    const data = getSummaryData();
    setGridData(WeekSummaryDataDummy);
    // openErrorSB();
  },[]);

  const columns= [
    { field: 'week', headerName: 'Week', flex: 1  },
    {  field: 'from', headerName: 'From', flex: 1  },
    {  field: 'to', headerName: 'To', flex: 1  },
    { type: 'number',  field: 'weekNum', headerName: 'Week#', flex: 1  },
    {  type: 'number', field: 'new', headerName: 'New', flex: 1  },
    {  type: 'number', field: 'completed', headerName: 'Completed', flex: 1  },
    {  type: 'number', field: 'rfpCancel', headerName: 'RFP Cancelled', flex: 1  },
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





export default  PreSalesWeeklySummary;

