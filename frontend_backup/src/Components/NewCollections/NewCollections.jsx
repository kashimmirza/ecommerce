/** @format */

// import React from "react";
// import "./NewCollections.css";
// import new_collection from "../Assets/new_collections";
// import Item from "../Item/Item";

// const NewCollections = () => {
//  return (
//   <div className="new-collections">
//    <h1>NEW COLLECTIONS</h1>
//    <hr />
//    <div className="collections">
//     {new_collection.map((item, i) => {
//      return (
//       <Item
//        key={i}
//        id={item.id}
//        name={item.name}
//        image={item.image}
//        new_price={item.newprice}
//        old_price={item.oldPrice}
//       />
//      );
//     })}
//    </div>
//   </div>
//  );
// };

// export default NewCollections;

//import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Item from "../Item/Item";
import "./NewCollections.css";
import "../../Pages/CSS/ShopCategory.css";
import "swiper/css"; // Core Swiper styles
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
//import { ShopContext } from "Context/ShopContext";
//import dropdown_icon from "Assets/dropdown_icon.png";
import { ShopContext } from "../../Context/ShopContext";
//import dropdown_icon from "../../Assets/dropdown_icon.png";

import Button from "@mui/material/Button";

import ProductDisplay from "../ProductDisplay/ProductDisplay";
import Breadcrum from "../Breadcrums/Breadcrum";

import React, {
 createContext,
 useState,
 useEffect,
 useContext,
 Component,
} from "react";
import ProductImage from "../ProductImage";
import { Link } from "react-router-dom";

const Popular = () => {
 const [data, setData] = useState({ men: [], women: [], kids: [] });
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 useEffect(() => {
  const fetchData = async () => {
   try {
    setLoading(true);
    const response = await axios.get(
     `https://76vgxe9gag.execute-api.us-east-1.amazonaws.com/api/Product/recent`,
    );
    console.log("API Response in most recent:", response.data);

    // Ensure correct structure and handle categorization
    const responseData = response.data; // Adjusted to match the actual structure
    if (Array.isArray(responseData)) {
     const categorizedData = {
      men: responseData.filter((item) => item.category === "men"),
      women: responseData.filter((item) => item.category === "women"),
      kids: responseData.filter((item) => item.category === "kids"),
     };

     setData(categorizedData);
    } else {
     throw new Error("Invalid data format");
    }
   } catch (error) {
    setError("Failed to load popular products. Please try again later.");
    console.error("API Request Failed:", error);
   } finally {
    setLoading(false);
   }
  };

  fetchData();
 }, []);

 if (loading) {
  return (
   <div className="loading-indicator">
    <CircularProgress />
   </div>
  );
 }

 if (error) {
  return <Typography color="error">{error}</Typography>;
 }

 return (
  <div className="popular-section">
   {["women", "kids", "men"].map((category) => (
    <div key={category} className="category-section">
     <div className="category-title animate-title">
      Most recent in {category}
     </div>
     <div className="items-grid">
      {data[category].map((product) => (
       <div
        key={product.productId}
        className="col-md-4 col-sm-6 col-xs-12 mb-4"
       >
        <div className="product-item">
         <Link
          to={{ pathname: `/product/${product.productId}`, state: { product } }}
         >
          <div className="product-image-container">
           <ProductImage productId={product.productId} altText={product.name} />
          </div>
         </Link>
         <div className="product-details">
          <p className="product-name">{product.name}</p>
          <div className="item-prices">
           <div className="item-price-new">${product.newPrice}</div>
           <div className="item-price-old">${product.oldPrice}</div>
          </div>
          <p
           style={{
            color: product.available ? "green" : "red",
            fontWeight: "bold",
           }}
          >
           {product.available ? "In stock" : "Out of stock"}
          </p>
         </div>
        </div>
       </div>
      ))}
     </div>
    </div>
   ))}
  </div>
 );
};

export default Popular;
