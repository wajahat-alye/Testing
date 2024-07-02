import React, { useEffect } from "react";
import { PDFViewer, Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import axios from "axios";

import { Modal, Button } from "@mui/material";
import { useState } from "react";
import ReactPDFChart from "react-pdf-charts";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Sector,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import * as reduxData from "context/useGlobalData";
import { MuiThemeProvider, createTheme } from '@mui/material/styles';
import MUIDataTable from 'mui-datatables';


const MyDocument = () => {
  const [open, setOpen] = useState(false);
  const [controller, dispatch] = reduxData.useGlobalController();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  console.log(controller?.currentWeekPie)

  const data = [
    ['John Doe', 'Engineer', 'New York'],
    ['Jane Smith', 'Designer', 'San Francisco'],
    // Add more rows as needed
  ];

  const columns = ['Name', 'Position', 'Location'];

  const options = {
    // Customize options as needed
  };


  const styles = StyleSheet.create({
    section: {
      // marginBottom: 10,
      padding: 2,
      backgroundColor: '#f0f0f0',
      borderRadius: 5,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    cell: {
      flex: 1,
      paddingVertical: 6, // Adjust vertical padding as needed
      paddingHorizontal: 10, // Adjust horizontal padding as needed
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 3,
      backgroundColor: '#fff',
    },
    cellText: {
      fontSize: 10, // Adjust the font size to your preference
      textAlign: 'center', // Center the text horizontally
      color: '#333',
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
    },
    chartContainer: {
      alignItems: 'center',
      marginBottom: 10,
    },
    legendContainer: {
      marginTop: 10,
      alignItems: 'center',
    },
    legendText: {
      fontSize: 10, // Adjust the font size to your preference
      textAlign: 'center', // Center the text horizontally
      color: '#333',
    },
    chart: {
      border: '2px solid #ccc', // Adjust as needed for styling
    },
  });


  const data1 = [
    ['Deshboard', 'From', 'To', 'In-Progress', 'Parked', 'Total'],
    controller.PdfRows1
  ];

  const data2 = [
    ['Week', 'From', 'To', 'Week#', 'New', 'Completed', "RFP Cancelled"],
    ...controller.PdfRows2
  ];

  const data3 = [
    ['Month', 'From', 'To', 'Month#', 'New', 'Completed', "RFP Cancelled"],
    ...controller.PdfRows3

  ];




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
              <Page size="A4" >

                <View >
                  <Text style={styles.cellText}>Dashboard Summary</Text>
                </View>


                <View style={styles.section}>
                  {data1.map((row, rowIndex) => (
                    <View key={`row-${rowIndex}`} style={styles.row}>
                      {row.map((cell, cellIndex) => (
                        <View key={`cell-${rowIndex}-${cellIndex}`} style={styles.cell}>
                          <Text style={styles.cellText}>{cell}</Text>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>


                <View >
                  <Text style={styles.cellText}>Pre-Sales Weekly Summary </Text>
                </View>

                <View style={styles.section}>
                  {data2.map((row, rowIndex) => (
                    <View key={`row-${rowIndex}`} style={styles.row}>
                      {row.map((cell, cellIndex) => (
                        <View key={`cell-${rowIndex}-${cellIndex}`} style={styles.cell}>
                          <Text style={styles.cellText}>{cell}</Text>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>

                <View >
                  <Text style={styles.cellText}>Monthly Summary</Text>
                </View>


                <View style={styles.section}>
                  {data3.map((row, rowIndex) => (
                    <View key={`row-${rowIndex}`} style={styles.row}>
                      {row.map((cell, cellIndex) => (
                        <View key={`cell-${rowIndex}-${cellIndex}`} style={styles.cell}>
                          <Text style={styles.cellText}>{cell}</Text>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>



                <View style={styles.container}>
                  {/* First PieChart */}
                  <View style={styles.chartContainer}>
                    <View style={styles.legendContainer}>
                      <Text style={styles.legendText}>Current Week Work Load Distribution</Text>
                    </View>
                    <ReactPDFChart style={styles.chart}>
                      <PieChart width={200} height={200}>
                        <Pie
                          data={controller?.currentWeekPie}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={renderCustomizedLabel}
                          outerRadius={80}
                          fill="#8884d8"
                          nameKey="label"
                          dataKey="value"
                          animationDuration={0}
                        >
                          {controller?.currentWeekPie.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                      </PieChart>
                    </ReactPDFChart>
                  </View>

                  {/* Second PieChart */}
                  <View style={styles.chartContainer}>
                    <View style={styles.legendContainer}>
                      <Text style={styles.legendText}>Previous Week Work Load Distribution</Text>
                    </View>
                    <ReactPDFChart style={styles.chart}>
                      <PieChart width={200} height={200}>
                        <Pie
                          data={controller?.previousWeekPie}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={renderCustomizedLabel}
                          outerRadius={80}
                          fill="#8884d8"
                          nameKey="label"
                          dataKey="value"
                          animationDuration={0}
                        >
                          {controller?.previousWeekPie.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                      </PieChart>
                    </ReactPDFChart>
                  </View>
                </View>

                <View style={styles.container}>
                  {/* Current Month */}
                  <View style={styles.chartContainer}>
                    <View style={styles.legendContainer}>
                      <Text style={styles.legendText}>Current Month Work Load Distribution</Text>
                    </View>
                    <ReactPDFChart style={styles.chart}>
                      <PieChart width={200} height={200}>
                        <Pie
                          data={controller?.currentMonthPie}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={renderCustomizedLabel}
                          outerRadius={80}
                          fill="#8884d8"
                          nameKey="label"
                          dataKey="value"
                          animationDuration={0}
                        >
                          {controller?.currentMonthPie.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                      </PieChart>
                    </ReactPDFChart>
                  </View>

                  {/* Previous Month */}
                  <View style={styles.chartContainer}>
                    <View style={styles.legendContainer}>
                      <Text style={styles.legendText}>Previous Month Work Load Distribution</Text>
                    </View>
                    <ReactPDFChart style={styles.chart}>
                      <PieChart width={200} height={200}>
                        <Pie
                          data={controller?.previousMonthPie}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={renderCustomizedLabel}
                          outerRadius={80}
                          fill="#8884d8"
                          nameKey="label"
                          dataKey="value"
                          animationDuration={0}
                        >
                          {controller?.previousMonthPie.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                      </PieChart>
                    </ReactPDFChart>
                  </View>
                </View>

              </Page>
            </Document>
          </PDFViewer>
        </div>
      </Modal>
    </div>
  );
};

export default MyDocument;
