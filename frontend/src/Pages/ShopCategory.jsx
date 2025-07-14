/** @format */

import "./CSS/ShopCategory.css";
import "swiper/css"; // Core Swiper styles
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import axios from "axios";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Item from "../Components/Item/Item";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import Breadcrum from "../Components/Breadcrums/Breadcrum";

import React, {
 createContext,
 useState,
 useEffect,
 useContext,
 Component,
} from "react";
import ProductImage from "../Components/ProductImage";
import { Link } from "react-router-dom";
const itemsPerPage = 5;

// export default ShopCategory;

//===============================================

const ShopCategory = (props) => {
 const [products, setProducts] = useState([]);
 const [displayedProducts, setDisplayedProducts] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 useEffect(() => {
  const fetchProductsByCategory = async () => {
   try {
    setLoading(true);
    const response = await axios.get(
     `https://76vgxe9gag.execute-api.us-east-1.amazonaws.com/api/Product/category/${props.category}`,
    );
    console.log("kids section", props.category);
    console.log("kids category data", response.data);
    setProducts(response.data);
    setDisplayedProducts(response.data.slice(0, itemsPerPage));
   } catch (err) {
    setError("Failed to load products. Please try again later.");
   } finally {
    setLoading(false);
   }
  };
  fetchProductsByCategory();
 }, [props.category]);

 const handleSortByPrice = () => {
  const sortedProducts = [...products].sort((a, b) => b.newPrice - a.newPrice);
  setProducts(sortedProducts);
  setDisplayedProducts(sortedProducts.slice(0, currentPage * itemsPerPage));
 };

 const handleLoadMore = () => {
  const startIndex = currentPage * itemsPerPage;
  const nextProducts = products.slice(startIndex, startIndex + itemsPerPage);
  setDisplayedProducts((prev) => [...prev, ...nextProducts]);
  setCurrentPage((prev) => prev + 1);
 };

 const handlePagination = (page) => {
  setCurrentPage(page);
  setDisplayedProducts(
   products.slice((page - 1) * itemsPerPage, page * itemsPerPage),
  );
 };

 const totalPages = Math.ceil(products.length / itemsPerPage);

 return (
  <div className="shop-category">
   <img
    className="shopcategory-banner"
    src={props.banner}
    alt="Category Banner"
   />

   <div className="shopcategory-indexSort">
    <Typography variant="body1">
     Showing {displayedProducts.length} of {products.length} products
    </Typography>
    <div className="shopcategory-sort" onClick={handleSortByPrice}>
     Sort by Price (High to Low)
    </div>
   </div>

   <div className="products-container">
    {loading ? (
     <div className="loading-indicator">
      <CircularProgress />
     </div>
    ) : error ? (
     <Typography color="error">{error}</Typography>
    ) : (
     displayedProducts.map((product) => (
      <div key={product.productId} className="product-card">
       <Link to={`/product/${product.productId}`} className="product-link">
        <div className="product-image-wrapper">
         <ProductImage productId={product.productId} altText={product.name} />
        </div>
       </Link>
       <div className="product-details">
        <p className="product-name">{product.name}</p>
        <div className="item-prices">
         <span className="item-price-new">${product.newPrice}</span>
         <span className="item-price-old">${product.oldPrice}</span>
        </div>
        <p className={product.available ? "in-stock" : "out-of-stock"}>
         {product.available ? "In stock" : "Out of stock"}
        </p>
       </div>
      </div>
     ))
    )}
   </div>

   {displayedProducts.length < products.length && (
    <Button variant="contained" color="primary" onClick={handleLoadMore}>
     Load More
    </Button>
   )}

   <div className="pagination">
    {Array.from({ length: totalPages }, (_, index) => (
     <Button
      key={index}
      className={`pagination-button ${
       currentPage === index + 1 ? "active" : ""
      }`}
      onClick={() => handlePagination(index + 1)}
     >
      {index + 1}
     </Button>
    ))}
   </div>
  </div>
 );
};

export default ShopCategory;

//================
//finalone
