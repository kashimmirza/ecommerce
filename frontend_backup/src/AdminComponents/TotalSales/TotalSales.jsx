/** @format */

import React, { useState } from "react";
import axios from "axios";
import {
 TextField,
 Button,
 Typography,
 Grid,
 CircularProgress,
 Alert,
 Box,
 TableContainer,
 Table,
 TableHead,
 TableRow,
 TableCell,
 TableBody,
 Paper,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import DownloadIcon from "@mui/icons-material/Download";
import "./TotalSales.css";

const TotalSales = () => {
 const [startDate, setStartDate] = useState(null);
 const [endDate, setEndDate] = useState(null);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);
 const [salesReport, setSalesReport] = useState([]);

 const fetchSalesReport = async () => {
  if (!startDate || !endDate) {
   setError("Please select both start and end dates.");
   return;
  }
  setLoading(true);
  setError(null);

  try {
   const response = await axios.post(
    "https://76vgxe9gag.execute-api.us-east-1.amazonaws.com/api/Cart/totalsalesReport",
    {
     startDate: dayjs(startDate).toISOString(),
     endDate: dayjs(endDate).toISOString(),
    },
    { headers: { "Content-Type": "application/json" } },
   );
   if (response.data.success) {
    setSalesReport(response.data.totalSales);
   } else {
    setError("Failed to fetch sales report.");
   }
  } catch (err) {
   setError("An error occurred while fetching the sales report.");
  } finally {
   setLoading(false);
  }
 };

 const downloadReport = async (format) => {
  if (!startDate || !endDate) {
   setError("Please select both start and end dates.");
   return;
  }

  try {
   const formattedStartDate = dayjs(startDate).format("YYYY-MM-DD");
   const formattedEndDate = dayjs(endDate).format("YYYY-MM-DD");
   const fileName = `SalesReport_${formattedStartDate}-${formattedEndDate}.${
    format === "Excel" ? "xlsx" : "pdf"
   }`;

   const response = await axios.post(
    `https://76vgxe9gag.execute-api.us-east-1.amazonaws.com/api/Cart/totalsalesReport/export${format}`,
    {
     startDate: dayjs(startDate).toISOString(),
     endDate: dayjs(endDate).toISOString(),
    },
    { responseType: "blob" },
   );
   console.log("export to pdf data", response.data);
   const blob = new Blob([response.data], {
    type:
     format === "Excel"
      ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      : "application/pdf",
   });
   const url = window.URL.createObjectURL(blob);
   const link = document.createElement("a");
   link.href = url;
   link.setAttribute("download", fileName);
   document.body.appendChild(link);
   link.click();
   link.remove();
  } catch (err) {
   setError(`Failed to download ${format} report.`);
  }
 };

 return (
  <Box p={3}>
   <Typography variant="h4" gutterBottom align="center">
    Total Sales Report
   </Typography>
   <Grid container spacing={3} justifyContent="center" alignItems="center">
    <Grid item xs={12} md={4}>
     <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
       label="Start Date"
       value={startDate}
       onChange={(date) => setStartDate(date)}
       renderInput={(params) => (
        <TextField {...params} fullWidth variant="outlined" />
       )}
      />
     </LocalizationProvider>
    </Grid>
    <Grid item xs={12} md={4}>
     <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
       label="End Date"
       value={endDate}
       onChange={(date) => setEndDate(date)}
       renderInput={(params) => (
        <TextField {...params} fullWidth variant="outlined" />
       )}
      />
     </LocalizationProvider>
    </Grid>
    <Grid item xs={12} md={4}>
     <Button
      variant="contained"
      color="primary"
      onClick={fetchSalesReport}
      disabled={loading}
      fullWidth
     >
      {loading ? <CircularProgress size={24} /> : "Fetch Sales Report"}
     </Button>
    </Grid>
   </Grid>
   {error && (
    <Alert severity="error" style={{ marginTop: "16px" }}>
     {error}
    </Alert>
   )}
   {salesReport.length > 0 && (
    <>
     <TableContainer
      component={Paper}
      style={{ marginTop: "24px", maxHeight: 400 }}
     >
      <Table stickyHeader>
       <TableHead>
        <TableRow>
         <TableCell>Date</TableCell>
         <TableCell>Category</TableCell>
         <TableCell>Total Sales</TableCell>
        </TableRow>
       </TableHead>
       <TableBody>
        {salesReport.map((record, index) => (
         <TableRow key={index}>
          <TableCell>{dayjs(record.saleDate).format("MM-DD-YYYY")}</TableCell>
          <TableCell>{record.category}</TableCell>
          <TableCell>{record.totalSales}</TableCell>
         </TableRow>
        ))}
       </TableBody>
      </Table>
     </TableContainer>
     <Grid container spacing={2} style={{ marginTop: "16px" }}>
      <Grid item>
       <Button
        variant="contained"
        color="success"
        startIcon={<DownloadIcon />}
        onClick={() => downloadReport("Excel")}
       >
        Download Excel
       </Button>
      </Grid>
      <Grid item>
       <Button
        variant="contained"
        color="secondary"
        startIcon={<DownloadIcon />}
        onClick={() => downloadReport("Pdf")}
       >
        Download PDF
       </Button>
      </Grid>
     </Grid>
    </>
   )}
  </Box>
 );
};

export default TotalSales;
