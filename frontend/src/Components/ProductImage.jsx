/** @format */
// Updated ProductImage Component
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductImage.css";

const ProductImage = ({ productId, altText }) => {
 const [images, setImages] = useState({ mainImage: "", hoverImages: [] });

 useEffect(() => {
  const fetchProductImages = async () => {
   try {
    const response = await axios.get(
     `https://76vgxe9gag.execute-api.us-east-1.amazonaws.com/api/product/GetProductImages/${productId}`,
    );

    console.log("in product image:", response.data);
    const mainImage =
     response.data.find((img) => img.imageType.toLowerCase() === "primary")
      ?.imageUrl || "";
    const hoverImages = response.data
     .filter((img) => img.imageType.toLowerCase() === "hover")
     .map((img) => img.imageUrl);

    setImages({ mainImage, hoverImages });
   } catch (error) {
    console.error("Error fetching product images:", error);
   }
  };

  fetchProductImages();
 }, [productId]);

 return (
  <div className="product-image-container">
   <img
    className="product-main-img img-fluid" // Bootstrap's `img-fluid` class makes the image responsive
    src={images.mainImage || "/path/to/placeholder-image.jpg"}
    alt={altText}
   />
   {images.hoverImages[0] && (
    <img
     className="product-hover-img img-fluid"
     src={images.hoverImages[0]}
     alt={`Hover view of ${altText}`}
    />
   )}
  </div>
 );
};

export default ProductImage;
