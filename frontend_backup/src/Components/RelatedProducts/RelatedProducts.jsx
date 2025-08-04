/** @format */

import React, { useEffect, useState } from "react";
import "./RelatedProducts.css";
import Item from "../Item/Item";

const RelatedProducts = ({ productId, category, onProductClick }) => {
 const [relatedProducts, setRelatedProducts] = useState([]);

 useEffect(() => {
  if (productId && category) {
   fetch(
    `https://localhost:7142/api/Product/related?category=${category}&productId=${productId}`,
   )
    .then((response) => response.json())
    .then((data) => {
     setRelatedProducts(data);
    })
    .catch((error) => console.error("Error fetching related products:", error));
  }
 }, [productId, category]);

 return (
  <div className="related-products">
   <h2>Related Products</h2>
   <hr />
   <div className="related-products-list">
    {relatedProducts.length > 0 ? (
     relatedProducts.map((item) => (
      <Item
       key={item.productId}
       id={item.productId}
       name={item.name}
       image={item.primaryImages[0]}
       newprice={item.newPrice}
       oldprice={item.oldPrice}
       onClick={() => onProductClick(item)} // Capturing Click Event
      />
     ))
    ) : (
     <p>No related products found.</p>
    )}
   </div>
  </div>
 );
};

export default RelatedProducts;
