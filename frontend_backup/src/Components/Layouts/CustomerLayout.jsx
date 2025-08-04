/** @format */

// src/Components/Layouts/CustomerLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom"; // Outlet is used to render child routes
//import BlucheezHeader from "../../Pages/BlucheezHeader"; // Adjust path as needed
import Footer from "../Footer/Footer"; // Adjust path as needed
import Navbar from "../Navbar/Navbar"; // If you still need Navbar separately, keep it
import BlucheezHeader from "../../Pages/BlucheezHeader";

const CustomerLayout = ({ role, onLogout }) => {
 return (
  <>
   {/* You can choose between BlucheezHeader and Navbar based on your design */}
   {/* If BlucheezHeader includes the navigation functionality, you might not need Navbar here */}
   {/* <Navbar role={role} onLogout={onLogout} /> */}
   <BlucheezHeader />
   {""}
   {/* This will now appear on all routes wrapped by CustomerLayout */}
   <Outlet />{" "}
   {/* This is where the specific route component (e.g., Shop, ShopCategory) will render */}
   <Footer />
  </>
 );
};

export default CustomerLayout;
