/** @format */

// import React, { useContext } from "react";
// import { ShopContext } from "../Context/ShopContext";
// import { useParams } from "react-router-dom";
// import Breadcrum from "../Components/Breadcrums/Breadcrum";
// import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
// import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
// import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";

// const Product = () => {
//  const { products } = useContext(ShopContext);
//  console.log("products:", products);
//  const { productId } = useParams();
//  const product = products.find((e) => e.id === Number(productId));
//  console.log("Product in popular", product);
//  return (
//   <div>
//    <Breadcrum product={product} />
//    <ProductDisplay product={product} />
//    <DescriptionBox />
//    <RelatedProducts />
//   </div>
//  );
// };

// export default Product;

import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";

const Product = () => {
 const context = useContext(ShopContext);
 console.log("ShopContext in product:", context);
 const { products } = useContext(ShopContext);
 console.log("products:", products);
 const { productId } = useParams();
 console.log("product id in Product after click the image", productId);
 const product = products.find((e) => e.productId === Number(productId));
 console.log("Product in product before showing in productdispaly", product);
 return (
  <div>
   <Breadcrum product={product} />
   <ProductDisplay product={product} />
   <DescriptionBox />
   <RelatedProducts />
  </div>
 );
};

export default Product;
