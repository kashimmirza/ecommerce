/** @format */

// import React from "react";
// import ProductCard from "./ProductCard";

// const productData = {
//  id: "9902684766487",
//  name: "Exclusive Earring",
//  price: "750.00",
//  imageSrc:
//   "https://blucheez.fashion/cdn/shop/files/BER-023-SILV.webp?v=1742819967",
//  imageAlt: "Exclusive Earring",
//  url: "/collections/newest-products/products/exclusive-earring-32",
//  badgeText: "Sale",
// };

// const App = () => {
//  return (
//   <div>
//    <ProductCard product={productData} />
//   </div>
//  );
// };

// export default App;
import React, { useState } from "react";
import "./CSS/ImageGallery1.css"; // Import your styles here

const images = [
 {
  src: "https://i.ebayimg.com/images/g/3yQAAOSw2Rln~okc/s-l1600.jpg",
  alt: "Item Image 1",
 },
 {
  src: "https://i.ebayimg.com/images/g/QAgAAOSwzaNn~okd/s-l1600.jpg",
  alt: "Item Image 2",
 },
 // Add more image objects here
];

const ProductData = () => {
 const [hoveredImage, setHoveredImage] = useState(null);

 return (
  <div className="image-gallery">
   {images.map((image, index) => (
    <div
     key={index}
     className="imageContainer border border-light"
     onMouseEnter={() => setHoveredImage(index)}
     onMouseLeave={() => setHoveredImage(null)}
    >
     <div
      className="position-relative overflow-hidden"
      style={{ width: "99.5%", height: "99.5%" }}
     >
      <span className="whitespaceCroppedImagePlaceholder d-none">
       <div className="spinner-border text-secondary"></div>
      </span>
      <div
       className={`position-relative overflow-hidden hover-lazy-felix ${
        hoveredImage === index ? "hover" : ""
       }`}
      >
       <img src={image.src} className="position-relative" alt={image.alt} />
       <button
        className="lazy-felix lazy-felix-download-btn"
        data-img-link={image.src}
       >
        <svg
         xmlns="http://www.w3.org/2000/svg"
         className="lazyfelix-icon"
         width="27"
         height="25"
         viewBox="0 0 27 25"
         fill="none"
        >
         <path
          d="M13.4518 13.0377C11.4186 12.7365 6.4864 16.878 5.39453 21.7726V22.0362C5.48795 24.1899 7.75902 24.9194 10.9292 24.0316C13.0111 23.1639 14.1728 23.1375 16.125 24.0316C17.9698 25.1612 20.41 23.7051 20.643 22.0362C20.3191 18.4517 16.3154 13.1956 13.4518 13.0377Z"
          fill="#7A7A7A"
          fill-opacity="0.7"
         ></path>
         <ellipse
          cx="4.85476"
          cy="11.946"
          rx="2.97265"
          ry="4.24369"
          transform="rotate(-21.5283 4.85476 11.946)"
          fill="#7A7A7A"
          fill-opacity="0.7"
         ></ellipse>
         <ellipse
          cx="22.0599"
          cy="13.5489"
          rx="2.97265"
          ry="4.24369"
          transform="rotate(22.9527 22.0599 13.5489)"
          fill="#7A7A7A"
          fill-opacity="0.7"
         ></ellipse>
         <ellipse
          cx="10.1354"
          cy="5.66514"
          rx="2.92739"
          ry="4.7215"
          transform="rotate(-9.76985 10.1354 5.66514)"
          fill="#7A7A7A"
          fill-opacity="0.7"
         ></ellipse>
         <ellipse
          cx="17.552"
          cy="5.95842"
          rx="2.92739"
          ry="4.7215"
          transform="rotate(14.6303 17.552 5.95842)"
          fill="#7A7A7A"
          fill-opacity="0.7"
         ></ellipse>
        </svg>
       </button>
      </div>
     </div>
    </div>
   ))}
  </div>
 );
};

export default ProductData;
