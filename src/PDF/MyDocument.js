import React from "react";
import { PDFViewer, Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";

import { Bar, Pie } from "react-chartjs-2";
import { Modal, Button } from "@mui/material";
import { useState } from "react";
import ReactPDFChart from "react-pdf-charts";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { PieChart } from "react-minimal-pie-chart";
import PieChartUI from "./PieChartUI";

const MyDocument = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const data11 = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: ["red", "blue", "yellow"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Download PDF
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div style={{ width: "100%", height: "100%" }}>
          <div style={{ display: "flex", justifyContent: "flex-end", backgroundColor: "white" }}>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </div>

          <PDFViewer width="100%" height="100%">
            <Document>
              <Page size="A4">
                {/* <ReactPDFChart> */}
                  {/* <PieChartUI /> */}
                  {/* <LineChart data={data} height={300} width={500}>
        <XAxis dataKey='name' />
        <YAxis />
        <CartesianGrid stroke='#eee' strokeDasharray='5' />
        <Line type='monotone' dataKey='uv' stroke='#8884d8' />
        <Line type='monotone' dataKey='pv' stroke='#82ca9d' />
        
      </LineChart>  */}
                {/* </ReactPDFChart> */}
                <Text>Pie Chart Example</Text>

                {/* <Pie data={data11} /> */}

              </Page>
            </Document>
          </PDFViewer>
        </div>
      </Modal>

    </div>
  );
};

export default MyDocument;
