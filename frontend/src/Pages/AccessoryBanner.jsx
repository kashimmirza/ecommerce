/** @format */
import React from "react";
// import arrow_icon from "../Assets/arrow.png";
import arrow_icon from "../Components/Assets/arrow.png";
import "../AdminComponents/Assets/base.css";
import "../AdminComponents/Assets/button-style.css";
import "../AdminComponents/Assets/slider-settings.css";
import "../AdminComponents/Assets/custom-effect.css";
import "../AdminComponents/Assets/t4s-animation.css";
import "./CSS/Office_essential_02.css";

export default function AccessoryBanner() {
 const handleNavigation = () => {
  window.location.href = "/collections/accessories";
 };

 return (
  <div
   className="hero-container"
   style={{
    position: "relative",
    width: "100%",
    overflow: "hidden",
   }}
  >
   {/* Background Image */}
   <img
    src="https://blucheez.fashion/cdn/shop/files/ACCESSORIES_f877d054-0cc8-400e-ae05-92d51db9e1e8.webp?v=1729786438&width=1500"
    alt="Accessories Banner"
    className="hero-image"
    style={{
     width: "100%",
     height: "auto",
     display: "block",
     objectFit: "cover",
    }}
   />

   {/* Overlay Content */}
   <div
    className="content-overlay"
    style={{
     position: "absolute",
     top: 0,
     left: 0,
     width: "100%",
     height: "100%",
     display: "flex",
     justifyContent: "center",
     alignItems: "center",
     flexDirection: "column",
     background: "rgba(0, 0, 0, 0.3)",
     color: "#fff",
     textAlign: "center",
     padding: "20px",
    }}
   >
    {/* Title */}
    <h2
     style={{
      fontSize: "48px",
      fontWeight: "bold",
      marginBottom: "30px",
      textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
     }}
    >
     ACCESSORIES
    </h2>

    {/* CTA Button */}
    <div
     className="hero-latest-btn"
     onClick={handleNavigation}
     style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "14px 28px",
      backgroundColor: "#ce3241",
      borderRadius: "6px",
      color: "#fff",
      fontSize: "20px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.3s ease-in-out",
     }}
     onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = "#fff";
      e.currentTarget.style.color = "#ce3241";
     }}
     onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = "#ce3241";
      e.currentTarget.style.color = "#fff";
     }}
    >
     <div>Complete Your Look</div>
     <img
      src={arrow_icon}
      alt="arrow"
      style={{ width: "26px", height: "26px" }}
     />
    </div>
   </div>
  </div>
 );
}
