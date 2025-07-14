/** @format */

import React from "react";
import { useParams } from "react-router-dom";
import ProductImage from "./ProductImage";

const ProductImageRoute = () => {
 const { productId } = useParams(); // Extract productId from URL

 return (
  <div>
   <h1>Product Images</h1>
   <ProductImage productId={4006} altText={`Product ${4006}`} />
  </div>
 );
};

export default ProductImageRoute;
