/** @format */

// src/Components/HeroContent/ImageBanner.jsx
import React from "react";
import { Box } from "@mui/material"; // Or just use a plain <div> if no MUI needed

const ImageBanner = ({ imageUrl, altText }) => {
 if (!imageUrl) return null;

 return (
  <Box
   sx={{
    width: "100%",
    height: { xs: "200px", md: "400px" }, // Adjust height as needed
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white", // If you want text overlay
   }}
   aria-label={altText || "Page banner"}
  >
   {/* You can add overlay text or elements here if desired */}
   {/* <Typography variant="h4">{altText}</Typography> */}
  </Box>
 );
};

export default ImageBanner;
