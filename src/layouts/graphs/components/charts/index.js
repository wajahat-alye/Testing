import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import Grid from "@mui/material/Grid";
import { dp_TPYRWChartData } from "./data/chatdata";
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import useGraph from './hook/useGraph';
import { Template } from './../../../globalcomponents/Templates';

const minMaxYear = (min, max) => {
  const years = [];
  for (let i = min; i <= max; i++) {
    years.push(new Date(i, 1, 1));
  }
  return years;
};

export const TPYRWChart = ({ min, max, series }: any) => {
  return (
    <BarChart
      series={series}
      grid={{ horizontal: true }}
      height={300}
      xAxis={[
        {
          scaleType: "band",
          data: minMaxYear(min, max),
          valueFormatter: (value) => value.getFullYear().toString(),
        },
      ]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
};

export function MRWSChart({ dataset }: any) {
  return (
    <BarChart
      dataset={dataset}
      yAxis={[{ scaleType: "band", dataKey: "direction" }]}
      series={[{ dataKey: "value", valueFormatter: (value: number | null) => `${value}mm` }]}
      layout="horizontal"
      width={500}
      height={400}
    />
  );
}

export function TQRRWChart({ series }: any) {
  return <PieChart series={series} width={400} height={200} />;
}

export const MVWSChart = ({ series }: any) => {
  return (
    <BarChart
      series={series}
      grid={{ horizontal: true }}
      height={300}
      xAxis={[{ scaleType: "band", data: ["a", "b", "c", "d"] }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
};

export const TVSChart = ({ series }: any) => {
  return (
    <BarChart
      series={series}
      grid={{ horizontal: true }}
      height={300}
      xAxis={[{ scaleType: "band", data: ["a", "b", "c", "d"] }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
};

export const MAPYWSChart = ({ series }: any) => {
  return (
    <BarChart
      series={series}
      grid={{ horizontal: true }}
      height={300}
      xAxis={[{ scaleType: "band", data: ["a", "b", "c", "d"] }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
};



export const MWTPS = ({ series }: any) => {
  return (
    <BarChart
    series={series}
    grid={{ horizontal: true }}
    height={300}
    xAxis={[{ scaleType: "band", data: ["a", "b", "c", "d"] }]}
    margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
  />
  );
};

export const ACDPPPY = ({ series }: any) => {
  return (
    <BarChart
    series={series}
    grid={{ horizontal: true }}
    height={300}
    xAxis={[{ scaleType: "band", data: ["a", "b", "c", "d"] }]}
    margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
  />
  );
};


export const TPYW = ({ series }: any) => {
  return (
    <BarChart
    series={series}
    grid={{ horizontal: true }}
    height={300}
    xAxis={[{ scaleType: "band", data: ["a", "b", "c", "d"] }]}
    margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
  />
  );
};





const Charts = () => {

  const { TPYRWChartData, TQRRWChartData,MVWSChartData,MRWSChartData,TVSChartData,MAPYWSChartData } = useGraph();


  return (
    <>

<MDBox py={3}>
        
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
            <Template title={'Customer'}> 
          <MVWSChart  series={MVWSChartData} />
            
            </Template>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
            <Template title={'KAM/Owner'}>
            <MRWSChart dataset={MRWSChartData} />
            </Template>
            </Grid>
          </Grid>
        </MDBox>

      </MDBox>


      <MDBox py={3}>
        
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
            <Template title={'Customer'}> 
            <TQRRWChart  series={TQRRWChartData}/>
            
            </Template>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
            <Template title={'KAM/Owner'}>
            <TPYRWChart min={2019} max={2024} series={TPYRWChartData}/>

            </Template>
            </Grid>
          </Grid>
        </MDBox>

      </MDBox>




      <MDBox py={3}>
        
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
            <Template title={'Customer'}> 
            <TVSChart series={TVSChartData}/>

            </Template>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
            <Template title={'KAM/Owner'}>
            <MWTPS series={MVWSChartData}/>
            </Template>
            </Grid>
          </Grid>
        </MDBox>

      </MDBox>


  

      <MDBox py={3}>
        
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
            <Template title={'Customer'}> 
            <MAPYWSChart series={MAPYWSChartData}/>

            </Template>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
            <Template title={'KAM/Owner'}>
            <ACDPPPY series={MAPYWSChartData}/>

            </Template>
            </Grid>
          </Grid>
        </MDBox>

      </MDBox>




      <MDBox py={3}>
        
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
            <Template title={'Customer'}> 
            <TPYW series={MAPYWSChartData}/>


            </Template>
            </Grid>
            
          </Grid>
        </MDBox>

      </MDBox>



    </>
  );
};

export default Charts;
