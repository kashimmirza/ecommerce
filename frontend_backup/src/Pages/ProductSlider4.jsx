/** @format */

import React, { useState, useEffect } from "react";
import "../AdminComponents/Assets/slider-settings.css";
import "../AdminComponents/Assets/base.css";
import "../styles/global.css";
import "./CSS/ProductSlider4.css"; // Add custom styles here

const ProductSlider4 = () => {
 const [isLoaded, setIsLoaded] = useState(false);

 useEffect(() => {
  const timer = setTimeout(() => {
   setIsLoaded(true);
  }, 500);
  return () => clearTimeout(timer);
 }, []);

 const bannerItems = [
  {
   id: "1",
   title: "PREMIUM SHIRTS",
   imageSrc:
    "https://blucheez.fashion/cdn/shop/files/PREMIUM_SHIRTS_04eed772-59a6-44bd-a4e2-1814406bb4c5.webp?v=1739818944&width=1200",
   link: "/collections/polo-shirt",
   animation: "fadeIn",
  },
  {
   id: "2",
   title: "KURTI ONE PIECE",
   imageSrc:
    "https://blucheez.fashion/cdn/shop/files/Kurti_One_Piece_-1.webp?v=1741109460&width=1200",
   link: "/collections/western-tops",
   animation: "fadeInUp",
  },
  {
   id: "3",
   title: "BOYS PANJABI",
   imageSrc:
    "https://blucheez.fashion/cdn/shop/files/BOYS_PANJABI.webp?v=1739818943&width=1200",
   link: "/collections/casual-shirts",
   animation: "fadeInUp",
  },
  {
   id: "4",
   title: "WOMEN'S FUSION WEAR",
   imageSrc:
    "https://blucheez.fashion/cdn/shop/files/FUSION_WEAR_7d1ee4b9-c9a0-40ed-a5b0-24b65238988f.webp?v=1739818944&width=1000",
   link: "/collections/long-dress",
   animation: "fadeInUp",
  },
 ];

 return (
  <div className={`banner-grid ${isLoaded ? "loaded" : ""}`}>
   {bannerItems.map((item) => (
    <div key={item.id} className="banner-item">
     <a href={item.link} className="banner-link" aria-label={item.title}>
      <div
       className={`banner-inner ${
        isLoaded ? `animation-${item.animation}` : ""
       }`}
      >
       <img src={item.imageSrc} alt={item.title} className="banner-image" />
       <div className="banner-content">
        <h2 className="banner-title">{item.title}</h2>
       </div>
      </div>
     </a>
    </div>
   ))}
  </div>
 );
};

export default ProductSlider4;
