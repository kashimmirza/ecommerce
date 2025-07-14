/** @format */

import React from "react";

const MiniCartTools = () => {
 return (
  <div className="t4s-when-cart-emty t4s-mini_cart__tool t4s-mini_cart__tool_icon t4s-text-center">
   <div
    title="Add Order Note"
    className="mini_cart_tool_btn is--note is--addNote t4s-tooltip-actived"
   >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
     <path d="M 16 3 C 14.742188 3 13.847656 3.890625..." />
    </svg>
   </div>
   <div
    title="Edit Order Note"
    className="mini_cart_tool_btn is--note is--editNote t4s-d-none t4s-tooltip-actived"
   >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
     <path d="M 16 2 C 14.74 2 13.850156 2.89..." />
    </svg>
   </div>
   <div
    title="Estimate"
    className="mini_cart_tool_btn is--rates t4s-tooltip-actived"
   >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
     <path d="M 1 4 L 1 25 L 4.15625 25 C..." />
    </svg>
   </div>
   <div
    title="Add A Coupon"
    className="mini_cart_tool_btn is--discount t4s-tooltip-actived"
   >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
     <path d="M 16 5 L 15.6875 5.28125..." />
    </svg>
   </div>
  </div>
 );
};

export default MiniCartTools;
