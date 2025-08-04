/** @format */

import React, { useState } from "react";
import "../AdminComponents/Assets/slider-settings.css";
import "../AdminComponents/Assets/base.css";
import "../styles/global.css";
import PageDots from "./PageDots";

const ProductSlider = () => {
 const products = [
  {
   id: "1",
   handle: "exclusive-earring-33",
   image:
    "https://blucheez.fashion/cdn/shop/files/BER-023-GOLD.webp?v=1742820600&width=600",
   title: "Exclusive Earring",
   price: "Tk 1,250.00 BDT",
  },
  {
   id: "2",
   handle: "exclusive-earring-32",
   image:
    "https://blucheez.fashion/cdn/shop/files/BER-023-SILV.webp?v=1742819967&width=700",
   title: "Exclusive Earring Silver",
   price: "Tk 1,150.00 BDT",
  },
  // Repeat products...
  {
   id: "3",
   handle: "exclusive-earring-32",
   image:
    "https://blucheez.fashion/cdn/shop/files/BER-023-SILV.webp?v=1742819967&width=700",
   title: "Exclusive Earring Silver",
   price: "Tk 1,150.00 BDT",
  },
  {
   id: "4",
   handle: "exclusive-earring-32",
   image:
    "https://blucheez.fashion/cdn/shop/files/BER-023-SILV.webp?v=1742819967&width=700",
   title: "Exclusive Earring Silver",
   price: "Tk 1,150.00 BDT",
  },
  {
   id: "5",
   handle: "exclusive-earring-33",
   image:
    "https://blucheez.fashion/cdn/shop/files/BER-023-GOLD.webp?v=1742820600&width=600",
   title: "Exclusive Earring",
   price: "Tk 1,250.00 BDT",
  },
  {
   id: "6",
   handle: "exclusive-earring-32",
   image:
    "https://blucheez.fashion/cdn/shop/files/BER-023-SILV.webp?v=1742819967&width=700",
   title: "Exclusive Earring Silver",
   price: "Tk 1,150.00 BDT",
  },
  {
   id: "7",
   handle: "exclusive-earring-32",
   image:
    "https://blucheez.fashion/cdn/shop/files/BER-023-SILV.webp?v=1742819967&width=700",
   title: "Exclusive Earring Silver",
   price: "Tk 1,150.00 BDT",
  },
  {
   id: "8",
   handle: "exclusive-earring-32",
   image:
    "https://blucheez.fashion/cdn/shop/files/BER-023-SILV.webp?v=1742819967&width=700",
   title: "Exclusive Earring Silver",
   price: "Tk 1,150.00 BDT",
  },
 ];

 const [currentIndex, setCurrentIndex] = useState(0);
 const visibleCount = 7;

 const goToPrev = () => {
  if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
 };

 const goToNext = () => {
  if (currentIndex < products.length - visibleCount)
   setCurrentIndex(currentIndex + 1);
 };

 const visibleProducts = products.slice(
  currentIndex,
  currentIndex + visibleCount,
 );

 return (
  <div className="t4s-flicky-slider" style={{ position: "relative" }}>
   <div
    className="flickityt4s-viewport"
    style={{ display: "flex", alignItems: "center", position: "relative" }}
   >
    {/* Previous Button */}
    <button
     className="flickityt4s-button flickityt4s-prev-next-button previous"
     onClick={goToPrev}
     disabled={currentIndex === 0}
     aria-label="Previous"
     style={{
      position: "absolute",
      left: "-15px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "white",
      border: "1px solid #ddd",
      padding: "6px",
      borderRadius: "50%",
      zIndex: 2,
      opacity: currentIndex === 0 ? 0.4 : 1,
      cursor: currentIndex === 0 ? "not-allowed" : "pointer",
     }}
    >
     <svg
      className="flickityt4s-button-icon"
      viewBox="0 0 100 100"
      width="24"
      height="24"
     >
      <path
       d="M 10,50 L 60,100 L 65,95 L 20,50  L 65,5 L 60,0 Z"
       className="arrow"
       fill="black"
      ></path>
     </svg>
    </button>

    {/* Product Display */}
    <div
     className="flickityt4s-slider"
     style={{
      display: "flex",
      gap: "16px",
      flex: 1,
      justifyContent: "flex-start",
      overflow: "hidden",
     }}
    >
     {visibleProducts.map((product) => (
      <div
       className="t4s-product t4s-pr-grid t4s-pr-style8"
       key={product.id}
       style={{ width: "250px", flexShrink: 0 }}
      >
       <div className="t4s-product-wrapper">
        <div className="t4s-product-inner t4s-pr">
         <div className="t4s-product-img">
          <img
           className="t4s-product-main-img lazyautosizes"
           loading="lazy"
           src={product.image}
           alt={product.title}
           width="600"
           height="900"
           style={{ objectFit: "cover", width: "100%" }}
          />
         </div>
         <div className="t4s-product-btns">
          <a
           href={`/collections/newest-products/products/${product.handle}`}
           className="t4s-pr-item-btn t4s-pr-wishlist"
          >
           <span>Add to Wishlist</span>
          </a>
          <a
           href={`/collections/newest-products/products/${product.handle}`}
           className="t4s-pr-item-btn t4s-pr-compare"
          >
           <span>Compare</span>
          </a>
          <a
           href={`/collections/newest-products/products/${product.handle}`}
           className="t4s-pr-item-btn t4s-pr-addtocart"
          >
           <span>Quick Shop</span>
          </a>
          <a
           href={`/collections/newest-products/products/${product.handle}`}
           className="t4s-pr-item-btn t4s-pr-quickview"
          >
           <span>Quick view</span>
          </a>
         </div>
         <div className="t4s-product-info">
          <h3 className="t4s-product-title">
           <a href={`/collections/newest-products/products/${product.handle}`}>
            {product.title}
           </a>
          </h3>
          <div className="t4s-product-price">
           <span className="money">{product.price}</span>
          </div>
         </div>
        </div>
       </div>
      </div>
     ))}
    </div>

    {/* Next Button */}
    <button
     className="flickityt4s-button flickityt4s-prev-next-button next"
     onClick={goToNext}
     disabled={currentIndex >= products.length - visibleCount}
     aria-label="Next"
     style={{
      position: "absolute",
      right: "-15px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "white",
      border: "1px solid #ddd",
      padding: "6px",
      borderRadius: "50%",
      zIndex: 2,
      opacity: currentIndex >= products.length - visibleCount ? 0.4 : 1,
      cursor:
       currentIndex >= products.length - visibleCount
        ? "not-allowed"
        : "pointer",
     }}
    >
     <svg
      className="flickityt4s-button-icon"
      viewBox="0 0 100 100"
      width="24"
      height="24"
     >
      <path
       d="M 10,50 L 60,100 L 65,95 L 20,50  L 65,5 L 60,0 Z"
       className="arrow"
       fill="black"
       transform="translate(100, 100) rotate(180)"
      ></path>
     </svg>
    </button>
   </div>
  </div>
 );
};

export default ProductSlider;
