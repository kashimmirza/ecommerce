/** @format */

import React from "react";
import global from "../../styles/global.css";
import Navbar from "./Navbar.css";

const SiteNavIcons = () => {
 return (
  <div className="t4s-site-nav__icons t4s-use__line is--hover2 t4s-h-cart__design1 t4s-lh-1 t4s-d-inline-flex t4s-align-items-center">
   {/* Search Icon */}
   <div className="t4s-site-nav__icon t4s-site-nav__search">
    <a
     className="t4s-pr"
     href="/search"
     data-drawer-delay=""
     data-drawer-options='{"id":"#t4s-search-hidden"}'
    >
     <svg
      className="t4s-icon t4s-icon--search"
      aria-hidden="true"
      focusable="false"
      role="presentation"
     >
      <use href="#icon-h-search" />
     </svg>
    </a>
   </div>

   {/* Account Icon */}
   <div className="t4s-site-nav__icon t4s-site-nav__account t4s-pr t4s-d-none t4s-d-md-inline-block">
    <a
     className="t4s-pr"
     href="/account"
     data-no-instant=""
     data-drawer-delay=""
     data-drawer-options='{"id":"#t4s-login-sidebar"}'
    >
     <svg
      className="t4s-icon t4s-icon--account"
      aria-hidden="true"
      focusable="false"
      role="presentation"
     >
      <use href="#icon-h-account" />
     </svg>
    </a>
   </div>

   {/* Wishlist Icon */}
   <div className="t4s-site-nav__icon t4s-site-nav__heart t4s-d-none t4s-d-md-inline-block">
    <a className="t4s-pr" href="/search/?view=wishlist" data-link-wishlist="">
     <svg
      className="t4s-icon t4s-icon--heart"
      aria-hidden="true"
      focusable="false"
      role="presentation"
     >
      <use href="#icon-h-heart" />
     </svg>
     <span
      data-count-wishlist=""
      className="t4s-pa t4s-op-0 t4s-ts-op t4s-count-box"
     >
      0
     </span>
    </a>
   </div>

   {/* Cart Icon */}
   <div className="t4s-site-nav__icon t4s-site-nav__cart">
    <a
     href="/cart"
     data-drawer-delay=""
     data-drawer-options='{"id":"#t4s-mini_cart"}'
    >
     <span className="t4s-pr t4s-icon-cart__wrap">
      <svg
       className="t4s-icon t4s-icon--cart"
       aria-hidden="true"
       focusable="false"
       role="presentation"
      >
       <use href="#icon-h-cart" />
      </svg>
      <span
       data-cart-count=""
       className="t4s-pa t4s-op-0 t4s-ts-op t4s-count-box"
      >
       0
      </span>
     </span>
     <span className="t4s-h-cart-totals t4s-dn">
      <span className="t4s-h-cart__divider t4s-dn">/</span>
      <span data-cart-tt-price="" className="t4s-h-cart__total">
       <span className="money">Tk 0.00</span>
      </span>
     </span>
    </a>
   </div>
  </div>
 );
};

export default SiteNavIcons;
