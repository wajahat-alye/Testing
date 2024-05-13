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

export const dp_status = ['Completed','Parked with KAM / Customer','Parked with Vendor / Procurement / Product Team','Feasibilities / Infra-Structure','RFP Cancelled', 'In Progress'];
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

export const GRID_KEYS_LIST =  ['dateReceived',
'projectLWC','status','customer','region','kamOwner','sector',
'pstAssign','requirement']
    
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
  sn: 'S/N'
};


export const GRID_KEYS_Keys = {
    'Date Received': 'dateReceived',
    'Due Date by KAM /Customer': 'dueDateByKAM',
    'Project Level': 'projectLevel',
    'TAT': 'tat',
    'Project Life (Work Days)': 'projectLWC',
    'Status/Dependencies': 'status',
    'Customer': 'customer',
    'Region': 'region',
    'KAM/ Owner': 'kamOwner',
    'Sector': 'sector',
    'Pre-Sales task Assigned to': 'pstAssign',
    'Requirement / Query': 'requirement',
    'Pre-Sales Remarks / Updates': 'psrUpdates',
    'Proposed Solution': 'proposedSolution',
    'Sale/ Rental/ Demo/ In-House/ Other': 'srdiother',
    'Submission to KAM/ Owner': 'submissionTo',
    'Additional Remarks': 'additionR',
   'S/N': 'sn'

  }