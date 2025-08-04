/** @format */

import React from "react";
import "../styles/global.css"; // Assuming you'll keep custom styles here
import "../AdminComponents/Assets/base.css";
import "./CSS/HeadingTestimonials.css";
import "../AdminComponents/Assets/top-head.css";

const HeadingTestimonials = () => {
 return (
  <div
   timeline
   hdt-reveal="slide-in"
   className="t4s-top-heading t4s_des_title_10 t4s-text-center"
   style={{ "--heading-height": "px", "--tophead_mb": "10px" }}
  >
   <div className="heading-testimonials-star">
    <h3 className="t4s-section-title t4s-title">
     <span>UNCOVER LATEST STYLES</span>
    </h3>
   </div>
  </div>
 );
};

export default HeadingTestimonials;
