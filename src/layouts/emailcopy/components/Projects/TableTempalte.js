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
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";
import data from './data/index';
import * as reduxData from "context/useGlobalData";
import { useEffect, useState, memo } from 'react';
import { getStartWeekDate, getEndWeekDate } from './../../../../helper/func';
import useData from './../../../dashboard/hook/useData';

// Data

function TableTempalte({ title }:any) {
  const {columns,columns1,columns2 } = data();
  const [controller, dispatch] = reduxData.useGlobalController();



  const [inProgress1, setinProgress] = useState(0);
  const [inParked, setinParked] = useState(0);
  const [rows, setRows] = useState([])
  const [rows1, setRows1] = useState([])
  const [rows2, setRows2] = useState([])


  const {getDeshboardData,gridData,customerListRedux, KMOwnerListRedux,sectorListRedux} = useData();
  
  

  useEffect(()=>{
    const fetch = async ()=>{
     const data = await getDeshboardData()
     setRows(data);
     setDatas(data);
    }
    fetch();
   },[])

  


   const setDatas = (gridd)=>{

const weekStart = getStartWeekDate();
const weekEnd = getStartWeekDate();



const prevStart = getStartWeekDate();
const prevEnd = getStartWeekDate();

    let inP = 0;
    let parked11 = 0;
    let completedOfCurrentWeek = 0;
    let completedOfPrevWeek = 0;

    let newOfCurrentWeek = 0;
    let newOfPrevWeek = 0;

    let rfpOfCurrentWeek = 0;
    let rpfOfPrevWeek = 0;




    let completedOfCurrentMonth = 0;
    let completedOfPrevMonth = 0;

    let newOfCurrentMonth = 0;
    let newOfPrevMonth = 0;

    let rfpOfCurrentMonth = 0;
    let rpfOfPrevMonth = 0;

    const currentDate = new Date();

    
const monthCurrentStart = getStartWeekDate();
const monthCurrentEnd = getStartWeekDate();



const monthPrevStart = getStartWeekDate();
const monthPrevEnd = getStartWeekDate();



    for(let i=0; i < gridd.length; i++){
     


const isBetweenCurrentweek = gridd[i].dateReceived > weekStart && gridd[i].dateReceived < weekEnd;
      if(isBetweenCurrentweek){


        if(gridd[i].status === "In Progress"){
          inP++;
        }
        if(gridd[i].status.includes('Parked')){
          parked11++;
        }


        // if(){  // week#

        // }

          // if(){  // month#

        // }

        if(gridd[i].dateReceived === currentDate){ // new
          newOfCurrentWeek++;
          newOfCurrentMonth++;
        }
        
        if(gridd[i].status.includes('Completed')){ // completed
          completedOfCurrentWeek++;
          completedOfCurrentMonth++;
        }

        if(gridd[i].status.includes('RFP Cancelled')){
          rfpOfCurrentWeek++; // RFP
          rfpOfCurrentMonth++; 
        }

        


        
      //   const isBetweenCurrenMonth = gridd[i].dateReceived > monthCurrentStart && gridd[i].dateReceived < monthCurrentEnd;
      // if(isBetweenCurrenMonth){

      // }


      }else{
        const isBetweenPrevweek = gridd[i].dateReceived > prevStart && gridd[i].dateReceived < prevEnd;
      if(isBetweenPrevweek){


// if(){  // week#

        // }


        // if(){  // new# week

        // }

 // if(){  // month#

        // }


        // if(){  // new# month

        // }


        if(gridd[i].status.includes('Completed')){
          completedOfPrevWeek++;
          completedOfCurrentMonth++;
        }

        if(gridd[i].status.includes('RFP Cancelled')){
          rpfOfPrevWeek++;
          rpfOfPrevMonth++;
        }




      }


      const isBetweenPrevmonth = gridd[i].dateReceived > monthPrevStart && gridd[i].dateReceived < monthPrevEnd;
      if(isBetweenPrevmonth){


        if(gridd[i].status.includes('Completed')){
          completedOfPrevWeek++;
          completedOfPrevMonth++;
        }

        if(gridd[i].status.includes('RFP Cancelled')){
          rpfOfPrevWeek++;
          rpfOfPrevMonth++;
        }


      }

      }





      

    }
    // setinProgress(inP);
    // setinParked(parked)

setRows([{
  deshboard:  <MDTypography variant="caption" color="text" fontWeight="medium">
  Active
</MDTypography>,
  from:  <MDTypography variant="caption" color="text" fontWeight="medium">
              {weekStart}

</MDTypography>,
 to:  <MDTypography variant="caption" color="text" fontWeight="medium">
         {weekEnd}

</MDTypography>,
 inProgress:  <MDTypography variant="caption" color="text" fontWeight="medium">
  {inP}
</MDTypography>,
 parked:  <MDTypography variant="caption" color="text" fontWeight="medium">
 {parked11}
</MDTypography>,
total:  <MDTypography variant="caption" color="text" fontWeight="medium">
{parked11 + inP}
</MDTypography>,
},])


setRows1([{
  week:  <MDTypography variant="caption" color="text" fontWeight="medium">
  Current
</MDTypography>,
 
 from:  <MDTypography variant="caption" color="text" fontWeight="medium">
  {weekStart}
</MDTypography>,


to:  <MDTypography variant="caption" color="text" fontWeight="medium">
 {weekEnd}
</MDTypography>,


weekNum:  <MDTypography variant="caption" color="text" fontWeight="medium">
Current
</MDTypography>,



new:  <MDTypography variant="caption" color="text" fontWeight="medium">
{newOfCurrentWeek}
</MDTypography>,



completed:  <MDTypography variant="caption" color="text" fontWeight="medium">
{completedOfCurrentWeek}
</MDTypography>,


rfpCancelled:  <MDTypography variant="caption" color="text" fontWeight="medium">
{rfpOfCurrentWeek}
</MDTypography>,
 
},{
  week:  <MDTypography variant="caption" color="text" fontWeight="medium">
  Previous
</MDTypography>,
 
 from:  <MDTypography variant="caption" color="text" fontWeight="medium">
  {weekStart}
</MDTypography>,


to:  <MDTypography variant="caption" color="text" fontWeight="medium">
 {weekEnd}
</MDTypography>,


weekNum:  <MDTypography variant="caption" color="text" fontWeight="medium">
Current
</MDTypography>,



new:  <MDTypography variant="caption" color="text" fontWeight="medium">
{newOfPrevWeek}
</MDTypography>,



completed:  <MDTypography variant="caption" color="text" fontWeight="medium">
{completedOfPrevWeek}
</MDTypography>,


rfpCancelled:  <MDTypography variant="caption" color="text" fontWeight="medium">
{rpfOfPrevWeek}
</MDTypography>,
 
},])















setRows2([{
  month:  <MDTypography variant="caption" color="text" fontWeight="medium">
  Current
</MDTypography>,
 
 from:  <MDTypography variant="caption" color="text" fontWeight="medium">
  {prevStart}
</MDTypography>,


to:  <MDTypography variant="caption" color="text" fontWeight="medium">
 {prevEnd}
</MDTypography>,


monthNum:  <MDTypography variant="caption" color="text" fontWeight="medium">
{/* {completedOfCurrentMonth} */}
sdfsdf

</MDTypography>,



new:  <MDTypography variant="caption" color="text" fontWeight="medium">
{newOfCurrentMonth}
</MDTypography>,



completed:  <MDTypography variant="caption" color="text" fontWeight="medium">
{completedOfCurrentMonth}
</MDTypography>,


rfpCancelled:  <MDTypography variant="caption" color="text" fontWeight="medium">
{rfpOfCurrentMonth}
</MDTypography>,
 
},{
  month:  <MDTypography variant="caption" color="text" fontWeight="medium">
  Previous
</MDTypography>,
 
 from:  <MDTypography variant="caption" color="text" fontWeight="medium">
  {prevStart}
</MDTypography>,


to:  <MDTypography variant="caption" color="text" fontWeight="medium">
 {prevEnd}
</MDTypography>,


monthNum:  <MDTypography variant="caption" color="text" fontWeight="medium">
Current
</MDTypography>,



new:  <MDTypography variant="caption" color="text" fontWeight="medium">
{newOfPrevMonth}
</MDTypography>,



completed:  <MDTypography variant="caption" color="text" fontWeight="medium">
{completedOfPrevMonth}
</MDTypography>,


rfpCancelled:  <MDTypography variant="caption" color="text" fontWeight="medium">
{rpfOfPrevMonth}
</MDTypography>,
 
},])











   }






  return (
    <>
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
    asdfasdfasdf
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

    asdfasdfasdfasdf
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


    </>
  );
}

export default TableTempalte;
