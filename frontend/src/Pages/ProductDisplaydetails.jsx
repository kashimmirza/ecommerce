/** @format */

import React, { useState } from "react";
import "./CSS/ProductdisplayDetails.css"; // Include CSS for styling

const ProductDisplaydetails = () => {
 const [selectedImage, setSelectedImage] = useState(0);
 const [quantity, setQuantity] = useState(1);
 const [selectedSize, setSelectedSize] = useState("S");
 const [tooltipVisible, setTooltipVisible] = useState(false);

 const images = [
  "/path/to/image1.jpg", // Replace with actual image paths
  "/path/to/image2.jpg",
  "/path/to/image3.jpg",
  "/path/to/image4.jpg",
 ];

 const handleImageClick = (index) => {
  setSelectedImage(index);
 };

 const handleSizeClick = (size) => {
  setSelectedSize(size);
 };

 const handleQuantityChange = (type) => {
  setQuantity((prev) =>
   type === "increment" ? prev + 1 : prev > 1 ? prev - 1 : prev,
  );
 };

 const toggleTooltip = () => {
  setTooltipVisible(!tooltipVisible);
 };

 return (
  <div className="product-page">
   {/* Breadcrumb */}
   <div className="breadcrumb">
    <span>Home</span> &gt; <span>Polo Shirt</span> &gt;{" "}
    <span>Men's Polo Shirt</span>
   </div>

   {/* Product Main Section */}
   <div className="product-main">
    {/* Image Carousel */}
    <div className="image-carousel">
     <div className="thumbnail-list">
      {images.map((img, index) => (
       <img
        key={index}
        src={img}
        alt={`Thumbnail ${index + 1}`}
        className={index === selectedImage ? "active" : ""}
        onClick={() => handleImageClick(index)}
       />
      ))}
     </div>
     <div
      className="selected-image"
      onMouseEnter={toggleTooltip}
      onMouseLeave={toggleTooltip}
     >
      <img
       src={images[selectedImage]}
       alt={`Selected Image ${selectedImage + 1}`}
       className="main-image"
      />
      {tooltipVisible && <div className="tooltip">Zoom View Activated</div>}
     </div>
    </div>

    {/* Product Info and Interactions */}
    <div className="product-info">
     <h1>Men's Polo Shirt</h1>
     <p className="price">Tk 2,695.00 BDT</p>
     <div className="reviews">
      <span className="stars">★★★★★</span> <span>2 reviews</span>
     </div>
     <p className="description">
      The Engineered Stripe Polo is a premium essential, crafted for the
      discerning gentleman. Made using a specialized yarn-dyed auto-striper
      knitting machine, this unique fabric offers a level of precision that
      standard... <span className="read-more">Read more</span>
     </p>

     {/* Color Selection */}
     <div className="color-selection">
      <span>COLOR: WHITE & BLUE</span>
      <div
       className="color-swatch"
       style={{ backgroundColor: "#FFFFFF" }}
      ></div>
     </div>

     {/* Size Selection */}
     <div className="size-selection">
      <span>SIZE:</span>
      {["S", "M", "L", "XL", "XXL"].map((size) => (
       <button
        key={size}
        className={size === selectedSize ? "size-option active" : "size-option"}
        onClick={() => handleSizeClick(size)}
       >
        {size}
       </button>
      ))}
     </div>

     {/* Quantity & Add to Cart */}
     <div className="quantity-add-cart">
      <div className="quantity-selector">
       <button onClick={() => handleQuantityChange("decrement")}>-</button>
       <span>{quantity}</span>
       <button onClick={() => handleQuantityChange("increment")}>+</button>
      </div>
      <button className="add-to-cart">ADD TO CART</button>
     </div>

     {/* Buy it Now */}
     <button className="buy-now">BUY IT NOW</button>
    </div>
   </div>
  </div>
 );
};

export default ProductDisplaydetails;
