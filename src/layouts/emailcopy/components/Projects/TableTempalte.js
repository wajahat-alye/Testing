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
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import * as reduxData from "context/useGlobalData";
import DataTable from "examples/Tables/DataTable";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import {
  convertToDate,
  getCurrentDate,
  getCurrentMonthEndDate,
  getCurrentMonthStartDate,
  getCurrentWeekEndDate,
  getCurrentWeekStartDate,
  getPreviousMonthEndDate,
  getPreviousMonthStartDate,
  getPreviousWeekEndDate,
  getPreviousWeekStartDate,
  makeDate,
} from "./../../../../helper/func";
import useData from "./../../../dashboard/hook/useData";
import data from "./data/index";
// Data

function TableTempalte({ title, isShow = true }: any) {
  const { columns, columns1, columns2 } = data();
  const [controller, dispatch] = reduxData.useGlobalController();
  const [rows, setRows] = useState([]);
  const [rows1, setRows1] = useState([]);
  const [rows2, setRows2] = useState([]);

  const { getDeshboardData } =
    useData();

  useEffect(() => {
    const fetch = async () => {
      const data = await getDeshboardData();
      setRows(data);
      setDatas(data);
    };
    fetch();
  }, []);


  const [currentWeekPie, setcurrentWeekPie] = useState([]);
  const [previousWeekPie, setpreviousWeekPie] = useState([]);
  const [currentMonthPie, setcurrentMonthPie] = useState([]);
  const [previousMonthPie, setpreviousMonthPie] = useState([]);



  const [PdfRows1, setPdfRows1] = useState([]);
  const [PdfRows2, setPdfRows2] = useState([]);
  const [PdfRows3, setPdfRows3] = useState([]);

  useEffect(() => {
    reduxData.setPdfRows1(dispatch, PdfRows1);
  }, [PdfRows1]);
  useEffect(() => {
    reduxData.setPdfRows2(dispatch, PdfRows2);
  }, [PdfRows2]);
  useEffect(() => {
    reduxData.setPdfRows3(dispatch, PdfRows3);
  }, [PdfRows3]);


  useEffect(() => {
    reduxData.setcurrentWeekPie(dispatch, currentWeekPie);
  }, [currentWeekPie]);

  useEffect(() => {
    reduxData.setpreviousWeekPie(dispatch, previousWeekPie);
  }, [previousWeekPie]);


  useEffect(() => {
    reduxData.setcurrentMonthPie(dispatch, currentMonthPie);
  }, [currentMonthPie]);


  useEffect(() => {
    reduxData.setpreviousMonthPie(dispatch, previousMonthPie);
  }, [previousMonthPie]);



  const setDatas = (gridd) => {


    let current_week_new_counter = 0;
    let current_week_completed_counter = 0;
    let current_week_rfp_cancelled_counter = 0;

    let previous_week_new_counter = 0;
    let previous_week_completed_counter = 0;
    let previous_week_rpf_cancelled_counter = 0;


    let current_week_in_progress_counter = 0;
    let current_week_parked_counter = 0;



    let current_month_new_counter = 0;
    let current_month_completed_counter = 0;
    let current_month_rfp_cancelled_counter = 0;

    let previous_month_new_counter = 0;
    let previous_month_completed_counter = 0;
    let previous_month_rfp_cancelled_counter = 0;



    const currentDate = getCurrentDate();


    const current_week_start = getCurrentWeekStartDate();
    const current_week_end = getCurrentWeekEndDate();

    const previous_week_start = getPreviousWeekStartDate();
    const previous_week_end = getPreviousWeekEndDate();

    const current_month_start = getCurrentMonthStartDate();
    const current_month_end = getCurrentMonthEndDate();

    const previous_month_start = getPreviousMonthStartDate();
    const previous_month_end = getPreviousMonthEndDate();



    let current_month_kamOwnerKV = {}
    let previous_month_kamOwnerKV = {}

    let current_week_kamOwnerKV = {}
    let previous_week_kamOwnerKV = {}

    for (let i = 0; i < gridd.length; i++) {
      // const dateReceived = moment(new Date(gridd[i].dateReceived));
      const dateReceived = convertToDate(gridd[i].dateReceived);
      const isBetweenCurrentweek = (dateReceived >= current_week_start && dateReceived <= current_week_end);

      const pstAssign = gridd[i].pstAssign.split("/");
      const pstCount = pstAssign.length - 1;
      const pstApply = pstAssign.length > 1;

      if (isBetweenCurrentweek) {
        if (gridd[i].status === "In Progress") {
          current_week_in_progress_counter++;
          if (pstApply) {
            current_week_in_progress_counter += pstCount
          }
        }
        if (gridd[i].status.includes("Parked")) {
          current_week_parked_counter++;
          if (pstApply) {
            current_week_parked_counter += pstCount
          }
        }
        if (dateReceived.isSame(currentDate)) { // New
          current_week_new_counter++;
          if (pstApply) {
            current_week_new_counter += pstCount
          }
        }
        if (gridd[i].status.includes("Completed")) {
          // completed
          current_week_completed_counter++;
          if (pstApply) {
            current_week_completed_counter += pstCount
          }
        }
        if (gridd[i].status.includes("RFP Cancelled")) {
          current_week_rfp_cancelled_counter++; // RFP
          if (pstApply) {
            current_week_rfp_cancelled_counter += pstCount
          }
        }

        pstAssign?.forEach((item) => {
          if (current_week_kamOwnerKV[item]) {
            current_week_kamOwnerKV[item].value++;
          } else {
            current_week_kamOwnerKV[item] = { value: 1, label: item }
          }
        })




      } else if (dateReceived >= previous_week_start && dateReceived <= previous_week_end) {
        if (gridd[i].status.includes("Completed")) {
          previous_week_completed_counter++;
          if (pstApply) {
            previous_week_completed_counter += pstCount
          }
        }
        if (gridd[i].status.includes("RFP Cancelled")) {
          previous_week_rpf_cancelled_counter++;
          if (pstApply) {
            previous_week_rpf_cancelled_counter += pstCount
          }
        }

        pstAssign?.forEach((item) => {
          if (previous_week_kamOwnerKV[item]) {
            previous_week_kamOwnerKV[item].value++;
          } else {
            previous_week_kamOwnerKV[item] = { value: 1, label: item }
          }
        })


      }
      const isBetweenCurrentMonth = (dateReceived >= current_month_start && dateReceived <= current_month_end);
      if (isBetweenCurrentMonth) {
        if (dateReceived.isSame(currentDate)) { // New
          current_month_new_counter++;
          if (pstApply) {
            current_month_new_counter += pstCount
          }
        }
        if (gridd[i].status.includes("Completed")) {
          // completed
          current_month_completed_counter++;
          if (pstApply) {
            current_month_completed_counter += pstCount
          }
        }
        if (gridd[i].status.includes("RFP Cancelled")) {
          current_month_rfp_cancelled_counter++; // RFP
          if (pstApply) {
            current_month_rfp_cancelled_counter += pstCount
          }
        }



        pstAssign?.forEach((item) => {
          if (current_month_kamOwnerKV[item]) {
            current_month_kamOwnerKV[item].value++;
          } else {
            current_month_kamOwnerKV[item] = { value: 1, label: item }
          }
        })



      } else if (dateReceived >= previous_month_start && dateReceived <= previous_month_end) {
        if (gridd[i].status.includes("Completed")) {
          previous_month_completed_counter++;
          if (pstApply) {
            previous_month_completed_counter += pstCount
          }
        }
        if (gridd[i].status.includes("RFP Cancelled")) {
          previous_month_rfp_cancelled_counter++;
          if (pstApply) {
            previous_month_rfp_cancelled_counter += pstCount
          }
        }



        pstAssign?.forEach((item) => {
          if (previous_month_kamOwnerKV[item]) {
            previous_month_kamOwnerKV[item].value++;
          } else {
            previous_month_kamOwnerKV[item] = { value: 1, label: item }
          }
        })





      }
    }

    current_month_kamOwnerKV = Object.values(current_month_kamOwnerKV);
    previous_month_kamOwnerKV = Object.values(previous_month_kamOwnerKV);
    current_week_kamOwnerKV = Object.values(current_week_kamOwnerKV);
    previous_week_kamOwnerKV = Object.values(previous_week_kamOwnerKV);
    setcurrentMonthPie(current_month_kamOwnerKV);
    setpreviousMonthPie(previous_month_kamOwnerKV);
    setcurrentWeekPie(current_week_kamOwnerKV);
    setpreviousWeekPie(previous_week_kamOwnerKV);

    let _current_week_start = current_week_start.format('MM/DD/YYYY');
    let _current_week_end = current_week_end.format('MM/DD/YYYY');
    setPdfRows1(['Active', _current_week_start, _current_week_end, current_week_in_progress_counter, current_week_parked_counter, current_week_parked_counter + current_week_in_progress_counter])
    setRows([
      {
        deshboard: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Active
          </MDTypography>
        ),
        from: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {_current_week_start}
          </MDTypography>
        ),
        to: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {_current_week_end}
          </MDTypography>
        ),
        inProgress: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {current_week_in_progress_counter}
          </MDTypography>
        ),
        parked: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {current_week_parked_counter}
          </MDTypography>
        ),
        total: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {current_week_parked_counter + current_week_in_progress_counter}
          </MDTypography>
        ),
      },
    ]);


    _current_week_start = current_week_start.format('MM/DD/YYYY')
    _current_week_end = current_week_end.format('MM/DD/YYYY')


    let _previous_week_start = previous_week_start.format('MM/DD/YYYY')
    let _previous_week_end = previous_week_end.format('MM/DD/YYYY')

    setPdfRows2([['Current', _current_week_start, _current_week_end,
      'Current', current_week_new_counter, current_week_completed_counter, current_week_rfp_cancelled_counter],

    ['Previous', _previous_week_start, _previous_week_end,
      'Current', previous_week_new_counter, previous_week_completed_counter, previous_week_rpf_cancelled_counter]
    ]
    )

    setRows1([
      {
        week: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Current
          </MDTypography>
        ),

        from: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {current_week_start.format('MM/DD/YYYY')}
          </MDTypography>
        ),

        to: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {current_week_end.format('MM/DD/YYYY')}
          </MDTypography>
        ),

        weekNum: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Current
          </MDTypography>
        ),

        new: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {current_week_new_counter}
          </MDTypography>
        ),

        completed: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {current_week_completed_counter}
          </MDTypography>
        ),

        rfpCancelled: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {current_week_rfp_cancelled_counter}
          </MDTypography>
        ),
      },
      {
        week: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Previous
          </MDTypography>
        ),

        from: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {previous_week_start.format('MM/DD/YYYY')}
          </MDTypography>
        ),

        to: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {previous_week_end.format('MM/DD/YYYY')}
          </MDTypography>
        ),

        weekNum: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Current
          </MDTypography>
        ),

        new: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {previous_week_new_counter}
          </MDTypography>
        ),

        completed: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {previous_week_completed_counter}
          </MDTypography>
        ),

        rfpCancelled: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {previous_week_rpf_cancelled_counter}
          </MDTypography>
        ),
      },
    ]);

    let _current_month_start = current_month_start.format('MM/DD/YYYY');
    let _current_month_end = current_month_end.format('MM/DD/YYYY');


    let _previous_month_start = previous_month_start.format('MM/DD/YYYY');
    let _previous_month_end = previous_month_end.format('MM/DD/YYYY');
    setPdfRows3([['Current', _current_month_start, _current_month_end,
      'sdfsdf', current_month_new_counter, current_month_completed_counter, current_month_rfp_cancelled_counter],

    ['Previous', _previous_month_start, _previous_month_end,
      'Current', previous_month_new_counter, previous_month_completed_counter, previous_month_rfp_cancelled_counter]
    ]
    )


    setRows2([
      {
        month: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Current
          </MDTypography>
        ),

        from: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {current_month_start.format('MM/DD/YYYY')}
          </MDTypography>
        ),

        to: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {current_month_end.format('MM/DD/YYYY')}
          </MDTypography>
        ),

        monthNum: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {/* {current_month_completed_counter} */}
            sdfsdf
          </MDTypography>
        ),

        new: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {current_month_new_counter}
          </MDTypography>
        ),

        completed: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {current_month_completed_counter}
          </MDTypography>
        ),

        rfpCancelled: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {current_month_rfp_cancelled_counter}
          </MDTypography>
        ),
      },
      {
        month: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Previous
          </MDTypography>
        ),

        from: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {previous_month_start.format('MM/DD/YYYY')}
          </MDTypography>
        ),

        to: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {previous_month_end.format('MM/DD/YYYY')}
          </MDTypography>
        ),

        monthNum: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Current
          </MDTypography>
        ),

        new: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {previous_month_new_counter}
          </MDTypography>
        ),

        completed: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {previous_month_completed_counter}
          </MDTypography>
        ),

        rfpCancelled: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {previous_month_rfp_cancelled_counter}
          </MDTypography>
        ),
      },
    ]);
  };


  return isShow ? <>
    Dashboard Summary
    <Card>
      <MDBox>
        <DataTable
          table={{ columns, rows }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
    Pre-Sales Weekly Summary
    <Card>
      <MDBox>
        <DataTable
          table={{ columns: columns1, rows: rows1 }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
    Monthly Summary
    <Card>
      <MDBox>
        <DataTable
          table={{ columns: columns2, rows: rows2 }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
  </> : <></>

}

export default TableTempalte;
