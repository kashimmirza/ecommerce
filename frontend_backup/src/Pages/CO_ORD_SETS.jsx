/** @format */
import "../AdminComponents/Assets/base.css";
import "../AdminComponents/Assets/button-style.css";
import "../AdminComponents/Assets/slider-settings.css";
import "../AdminComponents/Assets/custom-effect.css";
import "../AdminComponents/Assets/t4s-animation.css";
import { useEffect, useState } from "react";
import "./CSS/Office_essential_02.css";

// Function to simulate the loadImageT4s behavior
const loadImageT4s = (element) => {
 if (element && element.parentNode) {
  const parent = element.parentNode;
  const loaderElement = parent.querySelector(".lazyloadt4s-loader");
  if (loaderElement) {
   loaderElement.style.display = "none";
  }
 }
};

export default function Showstoppers() {
 const [herHovered, setHerHovered] = useState(false);
 const [himHovered, setHimHovered] = useState(false);

 return (
  <div className="hero-container">
   {/* Background Image - fashion couple with elegant clothing */}
   <img
    src="https://blucheez.fashion/cdn/shop/files/CO-ORD_SETS_2.webp?v=1739818945&width=3000"
    alt="Blucheez fashion model couple"
    className="hero-image"
   />

   {/* Content overlay - positioned on the right side */}
   <div className="content-overlay">
    <div className="content-wrapper">
     {/* Logo */}
     <div className="logo">
      <h1 className="logo-text">
       {/*   <span className="logo-brand">Blucheez</span> | BLACK*/}
      </h1>
     </div>

     {/* Tagline */}
     <p className="tagline">CO-ORD SETS</p>

     {/* Buttons */}
     <div className="buttons-container">
      <a
       href="/collections/womens-black"
       className="cta-button"
       onMouseEnter={() => setHerHovered(true)}
       onMouseLeave={() => setHerHovered(false)}
       style={
        herHovered
         ? {
            backgroundColor: "#ce3241",
            borderColor: "#ce3241",
           }
         : {}
       }
      >
       FIND YOUR FIT
      </a>
     </div>
    </div>
   </div>

   {/* Scroll to top button (visible at bottom right) */}
   <div className="scroll-top-button">
    <button className="scroll-button" aria-label="Scroll to top">
     <svg
      xmlns="http://www.w3.org/2000/svg"
      className="scroll-icon"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
     >
      <path
       strokeLinecap="round"
       strokeLinejoin="round"
       strokeWidth={2}
       d="M5 15l7-7 7 7"
      />
     </svg>
    </button>
   </div>
  </div>
 );
}
