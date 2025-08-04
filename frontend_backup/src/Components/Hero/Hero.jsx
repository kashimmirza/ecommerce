/** @format */

import React from "react";
import "./Hero.css";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/hero_image.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import NewCollection from "../NewCollections/NewCollections";

const Hero = () => {
 const [showNewCollection, setShowNewCollection] = useState(false);
 const navigate = useNavigate();

 const handleNavigation = () => {
  setShowNewCollection(true); // Toggle to show NewCollection component
 };

 if (showNewCollection) {
  return <NewCollection />; // Render NewCollection component directly
 }
 return (
  <div className="hero">
   <div className="hero-left">
    <h2>NEW ARRIVALS ONLY</h2>
    <div>
     <div className="hero-hand-icon">
      <p>new</p>
      <img src={hand_icon} alt="" />
     </div>
     <p>collections</p>
     <p>for everyone</p>
    </div>
    <div className="hero-latest-btn" onClick={handleNavigation}>
     <div>Latest Collection</div>
     <img src={arrow_icon} alt="" />
    </div>
   </div>
   <div className="hero-right">
    <img src={hero_image} alt="" />
   </div>
  </div>
 );
};

export default Hero;
