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

export default function data() {
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <MDAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  const Company = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "companies", accessor: "companies", width: "45%", align: "left" },
      { Header: "members", accessor: "members", width: "10%", align: "left" },
      { Header: "budget", accessor: "budget", align: "center" },
      { Header: "completion", accessor: "completion", align: "center" },
    ],

    rows: [
      {
        companies: <Company image={logoXD} name="Material UI XD Version" />,
        members: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team1, "Ryan Tompson"],
              [team2, "Romina Hadid"],
              [team3, "Alexander Smith"],
              [team4, "Jessica Doe"],
            ])}
          </MDBox>
        ),
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            $14,000
          </MDTypography>
        ),
        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={60} color="info" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        companies: <Company image={logoAtlassian} name="Add Progress Track" />,
        members: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team2, "Romina Hadid"],
              [team4, "Jessica Doe"],
            ])}
          </MDBox>
        ),
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            $3,000
          </MDTypography>
        ),
        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={10} color="info" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        companies: <Company image={logoSlack} name="Fix Platform Errors" />,
        members: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team1, "Ryan Tompson"],
              [team3, "Alexander Smith"],
            ])}
          </MDBox>
        ),
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Not set
          </MDTypography>
        ),
        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={100} color="success" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        companies: <Company image={logoSpotify} name="Launch our Mobile App" />,
        members: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team4, "Jessica Doe"],
              [team3, "Alexander Smith"],
              [team2, "Romina Hadid"],
              [team1, "Ryan Tompson"],
            ])}
          </MDBox>
        ),
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            $20,500
          </MDTypography>
        ),
        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={100} color="success" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        companies: <Company image={logoJira} name="Add the New Pricing Page" />,
        members: (
          <MDBox display="flex" py={1}>
            {avatars([[team4, "Jessica Doe"]])}
          </MDBox>
        ),
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            $500
          </MDTypography>
        ),
        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={25} color="info" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        companies: <Company image={logoInvesion} name="Redesign New Online Shop" />,
        members: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team1, "Ryan Tompson"],
              [team4, "Jessica Doe"],
            ])}
          </MDBox>
        ),
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            $2,000
          </MDTypography>
        ),
        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={40} color="info" variant="gradient" label={false} />
          </MDBox>
        ),
      },
    ],
  };
}



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