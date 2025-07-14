/** @format */

// import React from "react";
// import "./CSS/Admin.css";
// import Sidebar from "../AdminComponents/Sidebar/Sidebar";
// import AddProduct from "../AdminComponents/AddProduct/AddProduct";
// import { Route, Routes } from "react-router-dom";
// import ListProduct from "../AdminComponents/ListProduct/ListProduct";
// import TotalSales from "../AdminComponents/TotalSales/TotalSales";

// const Admin = () => {
//  return (
//   <div className="admin">
//    <Sidebar />
//    <Routes>
//     <Route path="/addproduct" element={<AddProduct />} />
//     <Route path="/listproduct" element={<ListProduct />} />
//     <Route path="/totalsales" element={<TotalSales />} />
//    </Routes>
//   </div>
//  );
// };

// export default Admin;

// const Admin = () => {
//  return (
//   <div className="admin">
//    <div className="sidebar">
//     <Sidebar />
//    </div>
//    <div className="main-content">
//     <header className="admin-header">
//      <h1 className="admin-title">Admin Dashboard</h1>
//     </header>
//     <Routes>
//      <Route path="/addproduct" element={<AddProduct />} />
//      <Route path="/listproduct" element={<ListProduct />} />
//      <Route path="/totalsales" element={<TotalSales />} />
//     </Routes>
//    </div>
//   </div>
//  );
// };

// export default Admin;

import React from "react";
import { useNavigate } from "react-router-dom";
import {
 AppBar,
 Toolbar,
 Typography,
 IconButton,
 Button,
 Box,
 Container,
 Drawer,
 List,
 ListItem,
 ListItemIcon,
 ListItemText,
} from "@mui/material";
import { ExitToApp, Person, Add, ListAlt, BarChart } from "@mui/icons-material";
import { Route, Routes } from "react-router-dom";
import MenuAdminPage from "../AdminComponents/MenuAdminPage";
import AddProduct from "../AdminComponents/AddProduct/AddProduct";
import ListProduct from "../AdminComponents/ListProduct/ListProduct";
import TotalSales from "../AdminComponents/TotalSales/TotalSales";

const Admin = ({ onLogout }) => {
 const navigate = useNavigate();

 const handleLogout = () => {
  onLogout(); // Call the logout function passed from App.js
  navigate("/"); // Redirect to the homepage after logout
  //localStorage.clear(); // Clear localStorage on logout
  //navigate("/"); // Redirect to the homepage
  //setMessage("Logged out successfully");
  //navigate("/"); // Redirect to home page
  //window.location.href = "/";
 };

 return (
  <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f4f5f7" }}>
   {/* Sidebar */}
   <Drawer
    variant="permanent"
    anchor="left"
    sx={{
     width: 240,
     flexShrink: 0,
     "& .MuiDrawer-paper": {
      width: 240,
      boxSizing: "border-box",
      backgroundColor: "#ffffff",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
     },
    }}
   >
    <Toolbar>
     <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2c3e50" }}>
      Admin Panel
     </Typography>
    </Toolbar>
    <List>
     <ListItem button onClick={() => navigate("/admin/addmenu")}>
      <ListItemIcon>
       <Add color="primary" />
      </ListItemIcon>
      <ListItemText primary="Add Menu" />
     </ListItem>
     <ListItem button onClick={() => navigate("/admin/addproduct")}>
      <ListItemIcon>
       <Add color="primary" />
      </ListItemIcon>
      <ListItemText primary="Add Product" />
     </ListItem>
     <ListItem button onClick={() => navigate("/admin/listproduct")}>
      <ListItemIcon>
       <ListAlt color="primary" />
      </ListItemIcon>
      <ListItemText primary="List Product" />
     </ListItem>
     <ListItem button onClick={() => navigate("/admin/totalsales")}>
      <ListItemIcon>
       <BarChart color="primary" />
      </ListItemIcon>
      <ListItemText primary="Total Sales" />
     </ListItem>
    </List>
   </Drawer>

   {/* Main Content */}
   <Box sx={{ flexGrow: 1, p: 3 }}>
    <AppBar position="static" color="primary" sx={{ borderRadius: 2, mb: 2 }}>
     <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
       Admin Dashboard
      </Typography>
      <IconButton
       sx={{ color: "#ffffff" }}
       onClick={() => alert("Profile clicked!")}
      >
       <Person />
      </IconButton>
      <Button color="inherit" startIcon={<ExitToApp />} onClick={handleLogout}>
       Logout
      </Button>
     </Toolbar>
    </AppBar>
    <Container>
     <Routes>
      <Route path="/addmenu" element={<MenuAdminPage />} />
      <Route path="/addproduct" element={<AddProduct />} />
      <Route path="/listproduct" element={<ListProduct />} />
      <Route path="/totalsales" element={<TotalSales />} />
     </Routes>
    </Container>
   </Box>
  </Box>
 );
};

export default Admin;
