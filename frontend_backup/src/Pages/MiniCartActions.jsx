/** @format */

import React from "react";

const MiniCartActions = () => {
 return (
  <div className="t4s-mini_cart__actions">
   <div className="t4s-quantity-wrapper t4s-quantity-cart-item">
    <button
     type="button"
     className="t4s-quantity-selector is--minus"
     onClick={() => console.log("Decrease quantity")}
    >
     <svg viewBox="0 0 24 24" width="17">
      <use href="#icon-cart-remove" />
     </svg>
    </button>
    <input
     type="number"
     id="miniupdates_50321590255895:b2f2d1fec2699a59e061c8917ba9c5ed"
     className="t4s-quantity-input"
     step="1"
     min="0"
     max="39"
     name="updates[]"
     value="1"
     size="4"
     pattern="[0-9]*"
     inputMode="numeric"
     onChange={(e) => console.log("Quantity changed", e.target.value)}
    />
    <button
     type="button"
     className="t4s-quantity-selector is--plus"
     onClick={() => console.log("Increase quantity")}
    >
     <svg className="icon icon--plus" viewBox="0 0 10 10" role="presentation">
      <path
       d="M6 4h4v2H6v4H4V6H0V4h4V0h2v4z"
       fill="currentColor"
       fillRule="evenodd"
      />
     </svg>
    </button>
   </div>

   <a
    href="/products/exclusive-earring-32?variant=50321590255895"
    rel="nofollow"
    className="t4s-mini_cart__edit t4s-tooltip-actived"
    data-tooltip="top-start"
    title="Edit this item"
   >
    <svg viewBox="0 0 24 24" width="20" height="20">
     <use href="#icon-cart-edit" />
    </svg>
   </a>

   <a
    href="/cart/change?quantity=0&id=50321590255895:b2f2d1fec2699a59e061c8917ba9c5ed"
    rel="nofollow"
    className="t4s-mini_cart__remove t4s-tooltip-actived"
    data-tooltip="top-start"
    title="Remove this item"
   >
    <svg viewBox="0 0 24 24" width="17">
     <use href="#icon-cart-remove" />
    </svg>
   </a>
  </div>
 );
};

export default MiniCartActions;
