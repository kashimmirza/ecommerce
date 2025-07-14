/** @format */

import React, { useState } from "react";
import "./CSS/StickyAddToCart.css";

const StickyAddToCart = ({ product }) => {
 const [quantity, setQuantity] = useState(1);
 const [variant, setVariant] = useState("Silver");
 const [isDropdownOpen, setIsDropdownOpen] = useState(false);

 const handleQuantityChange = (type) => {
  setQuantity((prev) => {
   if (type === "increase") return Math.min(prev + 1, 35);
   if (type === "decrease") return Math.max(prev - 1, 1);
   return prev;
  });
 };

 if (!product) return null;

 return (
  <div
   className="sticky-add-to-cart"
   style={{ display: "flex", alignItems: "center", padding: 10 }}
  >
   <div
    className="product-info"
    style={{ display: "flex", alignItems: "center" }}
   >
    <img src={product.image} alt={product.name} width="65" height="65" />
    <div style={{ marginLeft: 10 }}>
     <div className="product-title">{product.name}</div>
     <div className="product-price">{product.price}</div>
    </div>

    {/* Variant Dropdown */}
    <div className="variant-dropdown" style={{ marginLeft: 20 }}>
     <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
      <span>{variant}</span>
     </button>
     {isDropdownOpen && (
      <div className="dropdown-content">
       <button onClick={() => setVariant("Silver")}>Silver</button>
      </div>
     )}
    </div>
   </div>

   <div
    className="cart-actions"
    style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
   >
    <div
     className="quantity-selector"
     style={{ display: "flex", alignItems: "center" }}
    >
     <button onClick={() => handleQuantityChange("decrease")}>-</button>
     <input
      type="number"
      value={quantity}
      onChange={(e) => setQuantity(Number(e.target.value))}
      min="1"
      max="35"
      style={{ width: 50, textAlign: "center" }}
     />
     <button onClick={() => handleQuantityChange("increase")}>+</button>
    </div>

    <button className="add-to-cart-button" style={{ marginLeft: 10 }}>
     <span>Add to cart</span>
    </button>
   </div>
  </div>
 );
};

export default StickyAddToCart;
