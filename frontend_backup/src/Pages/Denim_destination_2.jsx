/** @format */

// /** @format */
// // import "../AdminComponents/Assets/base.css";
// // import "../AdminComponents/Assets/button-style.css";
// // import "../AdminComponents/Assets/slider-settings.css";
// // import "../AdminComponents/Assets/custom-effect.css";
// // import "../AdminComponents/Assets/t4s-animation.css";
// import { useEffect, useState } from "react";
// import "./CSS/Denim_destination_02.css";

// // Function to simulate the loadImageT4s behavior
// const loadImageT4s = (element) => {
//  if (element && element.parentNode) {
//   const parent = element.parentNode;
//   const loaderElement = parent.querySelector(".lazyloadt4s-loader");
//   if (loaderElement) {
//    loaderElement.style.display = "none";
//   }
//  }
// };

// export default function DENIM_DESTINATION_2() {
//  const [herHovered, setHerHovered] = useState(false);
//  const [himHovered, setHimHovered] = useState(false);

//  return (
//   <div className="hero-container">
//    {/* Background Image - fashion couple with elegant clothing */}
//    <img
//     src="https://blucheez.fashion/cdn/shop/files/DENIM_DESTINATION_2.webp?v=1739818945&width=3000"
//     alt="Blucheez fashion model couple"
//     className="hero-image"
//    />

//    {/* Content overlay - positioned on the right side */}
//    <div className="content-overlay">
//     <div className="content-wrapper">
//      {/* Logo */}
//      <div className="logo">
//       <h1 className="logo-text">
//        <span className="logo-brand">Blucheez</span> | BLACK
//       </h1>
//      </div>

//      {/* Tagline */}
//      <p className="tagline">Redefining Luxury, Exclusively</p>

//      {/* Buttons */}
//      <div className="buttons-container">
//       <a
//        href="/collections/womens-black"
//        className="cta-button"
//        onMouseEnter={() => setHerHovered(true)}
//        onMouseLeave={() => setHerHovered(false)}
//        style={
//         herHovered
//          ? {
//             backgroundColor: "#ce3241",
//             borderColor: "#ce3241",
//            }
//          : {}
//        }
//       >
//        FOR HER
//       </a>

//       <a
//        href="/collections/mens-black"
//        className="cta-button"
//        onMouseEnter={() => setHimHovered(true)}
//        onMouseLeave={() => setHimHovered(false)}
//        style={
//         himHovered
//          ? {
//             backgroundColor: "#ce3241",
//             borderColor: "#ce3241",
//            }
//          : {}
//        }
//       >
//        FOR HIM
//       </a>
//      </div>
//     </div>
//    </div>

//    {/* Scroll to top button (visible at bottom right) */}
//    <div className="scroll-top-button">
//     <button className="scroll-button" aria-label="Scroll to top">
//      <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="scroll-icon"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//      >
//       <path
//        strokeLinecap="round"
//        strokeLinejoin="round"
//        strokeWidth={2}
//        d="M5 15l7-7 7 7"
//       />
//      </svg>
//     </button>
//    </div>
//   </div>
//  );
// }

/** @format */
import "../AdminComponents/Assets/base.css";
import "../AdminComponents/Assets/button-style.css";
import "../AdminComponents/Assets/slider-settings.css";
import "../AdminComponents/Assets/custom-effect.css";
import "../AdminComponents/Assets/t4s-animation.css";
import { Box } from "@mui/material";
import "./CSS/HeroSection.css";
import "./CSS/BelwariCTASection.css";

export default function DENIM_DESTINATION_2() {
 return (
  <div className="cta-wrapper" style={{ position: "relative", width: "100%" }}>
   <img
    src="https://blucheez.fashion/cdn/shop/files/DENIM_DESTINATION_2.webp?v=1739818945&width=3000"
    alt="Banner"
    style={{
     width: "100%",
     height: "auto",
     objectFit: "cover",
     display: "block",
    }}
   />

   <Box
    className="cta-content"
    sx={{
     position: "absolute",
     top: "50%",
     left: "5%",
     transform: "translateY(-50%)",
     color: "#fff",
     zIndex: 2,
     display: "flex",
     flexDirection: "column",
     gap: 2,
     maxWidth: "90%",
    }}
   >
    {/* Paragraph */}
    <p className="cta-text fadeIn">
     explore
     <br />
     Denim,
     <br />
     blending tradition and style
     <br />
     for every special occasion.
    </p>

    {/* Button */}

    {/* For Him and For Her buttons */}
    <div className="cta-buttons-container fadeInUp">
     <a href="https:/collections/for-him" className="cta-button-for-him">
      For Him
     </a>
     <a href="/collections/for-her" className="cta-button-for-her">
      For Her
     </a>
    </div>
   </Box>
  </div>
 );
}
