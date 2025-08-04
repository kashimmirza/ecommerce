/** @format */

import React from "react";
import "../../styles/global.css";
import "./Navbar.css";

const MenuComponent = () => {
 return (
  <div className="t4s-top-bar" id="t4s-top-bar-main">
   <div className="t4s-container">
    <div className="t4s-row t4s-top-bar__wrap t4s-align-items-center">
     {/* Contact Info - Placed on the far left */}
     <div className="t4s-top-bar__contact-info t4s-col-item t4s-col-12 t4s-text-center t4s-col-lg-3 t4s-text-lg-start">
      <a
       className="t4s-ct"
       href="tel:09639-333666"
       aria-describedby="a11y-external-message"
      >
       09639-333666
      </a>
      <svg
       className="ml__15"
       xmlns="http://www.w3.org/2000/svg"
       width="16"
       height="16"
       viewBox="0 0 32 32"
      >
       <path
        d="M28.244 7.47h-25.572v17.060h26.656v-17.060h-1.084zM27.177 8.536l-10.298 10.298c-0.47 0.47-1.289 0.47-1.759 0l-10.3-10.298h22.356zM3.738 8.961l6.923 6.922-6.923 6.923v-13.846zM4.589 23.464l6.827-6.826 2.951 2.95c0.436 0.436 1.016 0.677 1.633 0.677s1.197-0.241 1.633-0.677l2.951-2.951 6.826 6.826h-22.822zM28.262 22.807l-6.923-6.924 6.923-6.924v13.848z"
        fill="currentColor"
       ></path>
      </svg>
      <a
       className="t4s-ct"
       href="mailto:hello@blucheez.com.bd"
       aria-describedby="a11y-external-message"
      >
       hello@blucheez.com.bd
      </a>
     </div>

     {/* Custom HTML with SVG - Middle section */}
     <div
      id="b_top-bar-0"
      className="t4s-top-bar__html t4s-col-item t4s-col-12 t4s-text-center t4s-col-lg-6 t4s-text-lg-start t4s-d-none t4s-d-md-none t4s-d-lg-block"
     >
      <div className="t4s-top-bar-custom__html t4s-rte--list">
       <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 32 32"
        xmlnsXlink="http://www.w3.org/1999/xlink"
       >
        <path
         d="M23.407 30.394c-2.431 0-8.341-3.109-13.303-9.783-4.641-6.242-6.898-10.751-6.898-13.785 0-2.389 1.65-3.529 2.536-4.142l0.219-0.153c0.979-0.7 2.502-0.927 3.086-0.927 1.024 0 1.455 0.599 1.716 1.121 0.222 0.442 2.061 4.39 2.247 4.881 0.286 0.755 0.192 1.855-0.692 2.488l-0.155 0.108c-0.439 0.304-1.255 0.869-1.368 1.557-0.055 0.334 0.057 0.684 0.342 1.068 1.423 1.918 5.968 7.55 6.787 8.314 0.642 0.6 1.455 0.685 2.009 0.218 0.573-0.483 0.828-0.768 0.83-0.772l0.059-0.057c0.048-0.041 0.496-0.396 1.228-0.396 0.528 0 1.065 0.182 1.596 0.541 1.378 0.931 4.487 3.011 4.487 3.011l0.050 0.038c0.398 0.341 0.973 1.323 0.302 2.601-0.695 1.327-2.85 4.066-5.079 4.066z"
         fill="currentColor"
        ></path>
       </svg>
      </div>
     </div>

     {/* Currency Dropdown - Rightmost section */}
     <div className="t4s-top-bar__cur t4s-col-item t4s-col-12 t4s-text-center t4s-col-lg-3 t4s-text-lg-end">
      <div className="t4s-top-bar__currencies t4s-d-inline-block">
       <button
        data-dropdown-open=""
        data-position="bottom-end"
        data-id="dropdown_currenciestop-bar"
       >
        <span data-flagst4s="sm" className="t4s-d-inline-block flagst4s">
         <img
          data-img-current=""
          width="30"
          height="22.5"
          src="//cdn.shopify.com/static/images/flags/bd.svg"
          alt="BDT"
          loading="lazy"
         />
         <span data-current="">BDT</span>
        </span>
        <svg
         className="t4s-ion-select-arrow"
         role="presentation"
         viewBox="0 0 19 12"
        >
         <polyline
          fill="none"
          stroke="currentColor"
          points="17 2 9.5 10 2 2"
          fillRule="evenodd"
          strokeWidth="2"
          strokeLinecap="square"
         ></polyline>
        </svg>
       </button>
       <div
        className="t4s-dropdown__wrapper t4s-currency_type_2 t4s-current-scrollbar is-style-mb--false"
        id="dropdown_currenciestop-bar"
       >
        <div className="t4s-drop-arrow"></div>
        <div className="t4s-dropdown__list">
         <button
          type="button"
          className="t4s-currency-item flagst4s lazyloadt4s t4s-d-none"
          data-currency-temp=""
         >
          <img
           width="30"
           height="22.5"
           src="//cdn.shopify.com/static/images/flags/bd.svg"
           alt="BDT"
           loading="lazy"
          />
          <span>BDT</span>
         </button>
         {/* Additional currency options can be added here */}
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default MenuComponent;
