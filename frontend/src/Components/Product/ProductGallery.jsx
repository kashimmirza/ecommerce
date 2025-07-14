/** @format */

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./ProductGallery.css";

const ProductGallery = ({ images = [] }) => {
 console.log("image", images);

 return (
  <div className="t4s-product">
   <div className="t4s-product__media t4s_ratio">
    <Swiper
     spaceBetween={10}
     slidesPerView={1}
     loop={true}
     style={{
      width: "100%",
      height: "400px", // 👈 Add height here
     }}
    >
     {images.map((img, index) => (
      <SwiperSlide key={index}>
       <img
        src={img}
        alt={`Product ${index}`}
        style={{
         width: "100%",
         height: "100%",
         objectFit: "cover", // 👈 Make sure image fills nicely
        }}
       />
      </SwiperSlide>
     ))}
    </Swiper>
   </div>

   <div className="t4s-product__info-container">
    <h1 className="t4s-product__title">
     <a href="/">Sample Product Title</a>
    </h1>
    <p className="t4s-price__unit">$49.99</p>
   </div>
  </div>
 );
};

export default ProductGallery;
