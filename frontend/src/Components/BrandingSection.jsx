/** @format */

import React from "react";
import { Card, Typography } from "@mui/material";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import Carousel from "react-material-ui-carousel"; // Add this package: npm install react-material-ui-carousel

const BrandingSection = () => {
 const brandingItems = [
  {
   icon: <LoyaltyIcon className="branding-icon" style={{ color: "#FFD700" }} />,
   title: "Loyalty Program",
   description:
    "Earn points on every purchase and redeem for exclusive discounts.",
   bgColor: "#FCE38A",
  },
  {
   icon: <LoyaltyIcon className="branding-icon" style={{ color: "#FF5733" }} />,
   title: "Exclusive Offers",
   description: "Unlock access to special deals and limited-time offers today!",
   bgColor: "#FFBD69",
  },
  {
   icon: <LoyaltyIcon className="branding-icon" style={{ color: "#00C9A7" }} />,
   title: "Premium Membership",
   description:
    "Upgrade to premium and enjoy free shipping, early sales, and more.",
   bgColor: "#A4F9C8",
  },
  {
   icon: <LoyaltyIcon className="branding-icon" style={{ color: "#6A0572" }} />,
   title: "New Arrivals",
   description: "Discover our latest products before everyone else.",
   bgColor: "#C4A3D2",
  },
  {
   icon: <LoyaltyIcon className="branding-icon" style={{ color: "#4285F4" }} />,
   title: "Referral Program",
   description: "Refer friends and earn rewards when they shop with us.",
   bgColor: "#A6C1EE",
  },
  // Add more items as needed
 ];

 return (
  <div
   className="branding-section"
   style={{
    padding: "50px 20px",
    background: "#F9F9F9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
   }}
  >
   <Carousel
    autoPlay
    interval={30000} // 30 seconds per slide
    animation="slide"
    navButtonsAlwaysVisible
    indicators={false}
    className="branding-carousel"
   >
    {brandingItems.map((item, index) => (
     <Card
      key={index}
      className="branding-card"
      style={{
       background: item.bgColor,
       color: "#333",
       padding: "30px",
       borderRadius: "15px",
       display: "flex",
       flexDirection: "column",
       alignItems: "center",
       textAlign: "center",
       boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
       transition: "transform 0.3s ease-in-out",
       overflow: "hidden",
       height: "100%",
       maxWidth: "300px",
      }}
      onMouseOver={(e) => {
       e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseOut={(e) => {
       e.currentTarget.style.transform = "scale(1)";
      }}
     >
      <div
       style={{
        background: "white",
        borderRadius: "50%",
        padding: "15px",
        marginBottom: "20px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
       }}
      >
       {item.icon}
      </div>
      <Typography
       variant="h6"
       className="branding-heading"
       style={{
        fontWeight: "bold",
        marginTop: "10px",
        fontFamily: "'Poppins', sans-serif",
        fontSize: "18px",
       }}
      >
       {item.title}
      </Typography>
      <Typography
       variant="body2"
       className="branding-description"
       style={{
        marginTop: "10px",
        lineHeight: "1.5",
        color: "#333",
        fontFamily: "'Roboto', sans-serif",
        fontSize: "14px",
        textAlign: "center",
        maxWidth: "250px",
       }}
      >
       {item.description}
      </Typography>
     </Card>
    ))}
   </Carousel>
  </div>
 );
};

export default BrandingSection;
