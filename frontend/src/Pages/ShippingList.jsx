/** @format */

import React from "react";
import "../AdminComponents/Assets/icon-social.css";
import "../AdminComponents/Assets/shipping.css"; // optional, for custom styles

import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import LockIcon from "@mui/icons-material/Lock";

const shippingFeatures = [
 {
  icon: <LocalShippingIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
  title: "FREE SHIPPING",
  description:
   "Free shipping for items over 1,000 Taka. Shipping charge applied for items below 1,000 Taka.",
 },
 {
  icon: <SupportAgentIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
  title: "SUPPORT 24/7",
  description: "Contact us 24 hours a day, 7 days a week.",
 },
 {
  icon: <SwapHorizIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
  title: "EASY EXCHANGE",
  description:
   "Changed your mind? FREE exchange within 7 days available for all products.",
 },
 {
  icon: <LockIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
  title: "100% PAYMENT SECURE",
  description: "We ensure secure payment with SSL protection.",
 },
];

const ShippingItem = ({ icon, title, description }) => (
 <div className="t4s-shipping t4s-shipping-item t4s-col-item">
  <div className="t4s-shipping-inner" timeline="" hdt-reveal="slide-in">
   <div className="t4s-col-auto t4s-shipping-icon t4s-shipping-icon-themes">
    {icon}
   </div>
   <div className="t4s-col t4s-shipping-content">
    <h3 className="t4s-shipping-title">{title}</h3>
    <div className="t4s-shipping-des t4s-rte--list">
     <p>{description}</p>
    </div>
   </div>
  </div>
 </div>
);

const ShippingList = () => {
 return (
  <Box sx={{ p: 4, backgroundColor: "#f5f5f5" }}>
   <Grid container spacing={3} justifyContent="center">
    {shippingFeatures.map((feature, index) => (
     <Grid item xs={12} sm={6} md={3} key={index}>
      <Card
       elevation={3}
       sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 2,
        p: 2,
        height: "100%",
        borderRadius: 2,
       }}
      >
       <Box>{feature.icon}</Box>
       <CardContent sx={{ p: 0 }}>
        <Typography variant="h6" component="div" gutterBottom>
         {feature.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {feature.description}
        </Typography>
       </CardContent>
      </Card>
     </Grid>
    ))}
   </Grid>
  </Box>
 );
};

export default ShippingList;
