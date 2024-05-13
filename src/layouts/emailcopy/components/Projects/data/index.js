/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// @mui material components
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { getStartWeekDate, getEndWeekDate } from './../../../../../helper/func';

import * as reduxData from "context/useGlobalData";
import { useEffect, useState, memo } from 'react';


export const TABLE_HEAD = ["S/N", "Date Received", "Due Date by KAM /Customer", "Project Level", "TAT", "Project Life (Work Days)", "Status/Dependencies", "Customer", "Region", "KAM/ Owner", "Sector", "Pre-Sales task Assigned to", "Requirement / Query", "Pre-Sales Remarks / Updates", "Proposed Solution", 'Sale/ Rental/ Demo/ In-House/ Other', 'Submission to KAM/ Owner', 'Additional Remarks'];
export const TABLE_ROWS = [
    {
        sn: 0,
        dateReceived: '',
        dueDateByKAM: '',
        projectLevel: '',
        tat: '',
        projectLWC: 0,
        status: '',
        customer: '',
        region: '',
        kamOwner: '',
        sector: '',
        pstAssign: '',
        requirement: '',
        psrUpdates: 0,
        proposedSolution: 0,
        srdiother: 0,
        submissionTo: '',
        additionR: 0,
    },
    {
        sn: 0,
        dateReceived: '',
        dueDateByKAM: '',
        projectLevel: '',
        tat: '',
        projectLWC: 0,
        status: '',
        customer: '',
        region: '',
        kamOwner: '',
        sector: '',
        pstAssign: '',
        requirement: '',
        psrUpdates: 0,
        proposedSolution: 0,
        srdiother: 0,
        submissionTo: '',
        additionR: 0,
    }, {
        sn: 0,
        dateReceived: '',
        dueDateByKAM: '',
        projectLevel: '',
        tat: '',
        projectLWC: 0,
        status: '',
        customer: '',
        region: '',
        kamOwner: '',
        sector: '',
        pstAssign: '',
        requirement: '',
        psrUpdates: 0,
        proposedSolution: 0,
        srdiother: 0,
        submissionTo: '',
        additionR: 0,
    }, {
        sn: 0,
        dateReceived: '',
        dueDateByKAM: '',
        projectLevel: '',
        tat: '',
        projectLWC: 0,
        status: '',
        customer: '',
        region: '',
        kamOwner: '',
        sector: '',
        pstAssign: '',
        requirement: '',
        psrUpdates: 0,
        proposedSolution: 0,
        srdiother: 0,
        submissionTo: '',
        additionR: 0,
    }, {
        sn: 0,
        dateReceived: '',
        dueDateByKAM: '',
        projectLevel: '',
        tat: '',
        projectLWC: 0,
        status: '',
        customer: '',
        region: '',
        kamOwner: '',
        sector: '',
        pstAssign: '',
        requirement: '',
        psrUpdates: 0,
        proposedSolution: 0,
        srdiother: 0,
        submissionTo: '',
        additionR: 0,
    }
];

export const dp_status = ['In Progress','End Progress', 'Parked with'];
export const dp_customer = [];
export const dp_region = ['Central','North','South'];
export const dp_kamOwner = [];
export const dp_sector = ['Enterprise', 'Security','B2G'];
export const dp_pstAssign = [];
export const h_screen = 'h-screen-89';

export const GRID_KEYS = {
  id: 0,
  sn: 0,
  dateReceived: '', // date
  dueDateByKAM: '', // date
  projectLevel: '', // date
  tat: '',
  projectLWC: 0,
  status: '', // dropdown
  customer: '', // dropdown
  region: '', // dropdown
  kamOwner: '', // dropdown
  sector: '', // dropdown
  pstAssign: '', // dropdown
  requirement: '',
  psrUpdates: 0,
  proposedSolution: 0,
  srdiother: 0,
  submissionTo: '', // date
  additionR: 0,
};

export const GRID_KEYS_LIST =  ['dateReceived','dueDateByKAM','projectLevel','tat',
'projectLWC','status','customer','region','kamOwner','sector',
'pstAssign','requirement','psrUpdates','proposedSolution','srdiother','submissionTo',
'additionR']
    
export const GRID_KEYS_Values = {
  dateReceived: 'Date Received', // date
  dueDateByKAM: 'Due Date by KAM /Customer', // date
  projectLevel: 'Project Level', // date
  tat: 'TAT',
  projectLWC: 'Project Life (Work Days)',
  status: 'Status/Dependencies', // dropdown
  customer: 'Customer', // dropdown
  region: 'Region', // dropdown
  kamOwner: 'KAM/ Owner', // dropdown
  sector: 'Sector', // dropdown
  pstAssign: 'Pre-Sales task Assigned to', // dropdown
  requirement: 'Requirement / Query',
  psrUpdates: 'Pre-Sales Remarks / Updates',
  proposedSolution: 'Proposed Solution',
  srdiother: 'Sale/ Rental/ Demo/ In-House/ Other',
  submissionTo: 'Submission to KAM/ Owner', // date
  additionR: 'Additional Remarks',
};


export const DeshboardSummaryData = {
    id: 0,
    deshboard: '',
    from: '', // date
    to: '', // date
    inProgress: 0,
    parked: 0,
    total: 0,
}



export const DeshboardSummaryDataDummy = [{
    id: 1,
    deshboard: '1',
    from: '2000/01/01',
    to: '2000/01/01',
    inProgress: 1,
    parked: 1,
    total: 1,
}
,{
    id: 2,

    deshboard: '1',
    from: '2000/01/01',
    to: '2000/01/01',
    inProgress: 1,
    parked: 1,
    total: 1,
}
,{
    id: 3,

    deshboard: '1',
    from: '2000/01/01',
    to: '2000/01/01',
    inProgress: 1,
    parked: 1,
    total: 1,
}
]


export const WeekSummaryData = {
    id: 0,
    week: '',
    from: '', // date
    to: '', // date
    weekNum: 0,
    new: 0,
    completed: 0,
    rfpCancel: 0,
}



export const WeekSummaryDataDummy = [
    {
        id: 1,
        week: '1',
        from: '1', // date
        to: '1', // date
        weekNum: 0,
        new: 0,
        completed: 0,
        rfpCancel: 0,
    },
    {
        id: 2,
        week: '1',
        from: '1', // date
        to: '1', // date
        weekNum: 0,
        new: 0,
        completed: 0,
        rfpCancel: 0,
    },{
        id: 3,
        week: '1',
        from: '1', // date
        to: '1', // date
        weekNum: 0,
        new: 0,
        completed: 0,
        rfpCancel: 0,
    }
]


export const MonthlySummaryData = {
    id: 0,
    month: '',
    from: '', // date
    to: '', // date
    monthNum: 0,
    new: 0,
    completed: 0,
    rfpCancel: 0,
}



export const MonthlySummaryDataDummy = [
    {
        id: 1,
        month: '1',
        from: '1', // date
        to: '1', // date
        monthNum: 0,
        new: 0,
        completed: 0,
        rfpCancel: 0,
    },
    {
        id: 2,
        month: '1',
        from: '1', // date
        to: '1', // date
        monthNum: 0,
        new: 0,
        completed: 0,
        rfpCancel: 0,
    },{
        id: 3,
        month: '1',
        from: '1', // date
        to: '1', // date
        monthNum: 0,
        new: 0,
        completed: 0,
        rfpCancel: 0,
    }
]




 const data = () => {
  // const [controller, dispatch] = reduxData.useGlobalController();

  // // const customerListRedux = controller.customerList;
  // // const KMOwnerListRedux = controller.KMOwnerList;
  // // const sectorListRedux = controller.sectorList;
  // // const successSB = controller.deshboardToast;

  // // status


  // const [inProgress1, setinProgress] = useState(0);
  // const [inParked, setinParked] = useState(0);

  // useEffect(()=>{
  //   let inP = 0;
  //   let parked = 0;
  //   for(let i=0; i < gridData.length; i++){
  //     if(gridData[i].status === "In Progress"){
  //       inP++;
  //     }
  //     if(gridData[i].status.includes('Parked')){
  //       parked++;
  //     }
  //   }
  //   setinProgress(inP);
  //   setinParked(parked)
  // },[gridData])

  // console.log(inParked, inProgress1, gridData);

  return {
    columns: [
      { Header: "Deshboard", accessor: "deshboard", width: "45%", align: "left" },
      { Header: "From", accessor: "from", width: "10%", align: "left" },
      { Header: "To", accessor: "to", align: "center" },
      { Header: "In-Progress", accessor: "inProgress", align: "center" },
      { Header: "Parked", accessor: "parked", align: "center" },
      { Header: "Total", accessor: "total", align: "center" },
    ],

    columns1: [
      { Header: "Week", accessor: "week", width: "45%", align: "left" },
      { Header: "From", accessor: "from", width: "10%", align: "left" },
      { Header: "To", accessor: "to", align: "center" },
      { Header: "Week#", accessor: "weekNum", align: "center" },
      { Header: "New", accessor: "new", align: "center" },
      { Header: "Completed", accessor: "completed", align: "center" },
      { Header: "RFP Cancelled", accessor: "rfpCancelled", align: "center" },
    
    ],
    columns2: [
      { Header: "Month", accessor: "month", width: "45%", align: "left" },
      { Header: "From", accessor: "from", width: "10%", align: "left" },
      { Header: "To", accessor: "to", align: "center" },
      { Header: "Month#", accessor: "monthNum", align: "center" },
      { Header: "New", accessor: "new", align: "center" },
      { Header: "Completed", accessor: "completed", align: "center" },
      { Header: "RFP Cancelled", accessor: "rfpCancelled", align: "center" },
    
    ],
  };
}

export default data;