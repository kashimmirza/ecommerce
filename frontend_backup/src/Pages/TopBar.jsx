/** @format */

import React, { useState } from "react";
import "./CSS/TopBar.css"; // Import the CSS file

const TopBar = () => {
 const [dropdownOpen, setDropdownOpen] = useState(false);

 const toggleDropdown = () => {
  setDropdownOpen(!dropdownOpen);
 };

 const handleClickOutside = () => {
  if (dropdownOpen) {
   setDropdownOpen(false);
  }
 };

 React.useEffect(() => {
  document.addEventListener("click", handleClickOutside);
  return () => {
   document.removeEventListener("click", handleClickOutside);
  };
 }, [dropdownOpen]);

 const currencies = [
  { code: "AED", flag: "//cdn.shopify.com/static/images/flags/ae.svg" },
  { code: "AUD", flag: "//cdn.shopify.com/static/images/flags/au.svg" },
  { code: "BDT", flag: "//cdn.shopify.com/static/images/flags/bd.svg" },
  { code: "EUR", flag: "//cdn.shopify.com/static/images/flags/eu.svg" },
  { code: "GBP", flag: "//cdn.shopify.com/static/images/flags/gb.svg" },
 ];

 const [selectedCurrency, setSelectedCurrency] = useState("BDT");

 const handleCurrencyChange = (code) => {
  setSelectedCurrency(code);
  setDropdownOpen(false);
 };

 const handleDropdownClick = (e) => {
  e.stopPropagation();
 };

 return (
  <div className="t4s-row t4s-top-bar__wrap t4s-align-items-center">
   <div className="t4s-top-bar__html t4s-col-item t4s-col-12 t4s-text-center t4s-col-lg-9 t4s-text-lg-start t4s-d-none t4s-d-md-none t4s-d-lg-block">
    <div className="t4s-top-bar-custom__html t4s-rte--list">
     {/* Phone Icon */}
     <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 32 32"
     >
      <path
       d="M23.407 30.394c-2.431 0-8.341-3.109-13.303-9.783-4.641-6.242-6.898-10.751-6.898-13.785 0-2.389 1.65-3.529 2.536-4.142l0.219-0.153c0.979-0.7 2.502-0.927 3.086-0.927 1.024 0 1.455 0.599 1.716 1.121 0.222 0.442 2.061 4.39 2.247 4.881 0.286 0.755 0.192 1.855-0.692 2.488l-0.155 0.108c-0.439 0.304-1.255 0.869-1.368 1.557-0.055 0.334 0.057 0.684 0.342 1.068 1.423 1.918 5.968 7.55 6.787 8.314 0.642 0.6 1.455 0.685 2.009 0.218 0.573-0.483 0.828-0.768 0.83-0.772l0.059-0.057c0.048-0.041 0.496-0.396 1.228-0.396 0.528 0 1.065 0.182 1.596 0.541 1.378 0.931 4.487 3.011 4.487 3.011l0.050 0.038c0.398 0.341 0.973 1.323 0.302 2.601-0.695 1.327-2.85 4.066-5.079 4.066zM9.046 2.672c-0.505 0-1.746 0.213-2.466 0.728l-0.232 0.162c-0.827 0.572-2.076 1.435-2.076 3.265 0 2.797 2.188 7.098 6.687 13.149 4.914 6.609 10.532 9.353 12.447 9.353 1.629 0 3.497-2.276 4.135-3.494 0.392-0.748 0.071-1.17-0.040-1.284-0.36-0.241-3.164-2.117-4.453-2.988-0.351-0.238-0.688-0.358-0.999-0.358-0.283 0-0.469 0.1-0.532 0.14-0.104 0.111-0.39 0.405-0.899 0.833-0.951 0.801-2.398 0.704-3.424-0.254-0.923-0.862-5.585-6.666-6.916-8.459-0.46-0.62-0.641-1.252-0.538-1.877 0.187-1.133 1.245-1.866 1.813-2.26l0.142-0.099c0.508-0.363 0.4-1.020 0.316-1.242-0.157-0.414-1.973-4.322-2.203-4.781-0.188-0.376-0.336-0.533-0.764-0.533z"
       fill="currentColor"
      />
     </svg>
     <a className="t4s-ct" href="tel:09639-333666">
      09639-333666
     </a>

     {/* Email Icon */}
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
      />
     </svg>
     <a className="t4s-ct" href="mailto:contact@blucheez.fashion">
      contact@blucheez.fashion
     </a>
    </div>
   </div>

   {/* Currency Selector */}
   <div className="t4s-top-bar__cur t4s-col-item t4s-col-12 t4s-text-center t4s-col-lg-3 t4s-text-lg-end">
    <div
     className="t4s-top-bar__currencies t4s-d-inline-block"
     onClick={handleDropdownClick}
    >
     <button onClick={toggleDropdown} data-position="bottom-end">
      <span data-flagst4s="sm" className="t4s-d-inline-block flagst4s">
       <img
        data-img-current=""
        width="30"
        height="22.5"
        src={currencies.find((c) => c.code === selectedCurrency)?.flag}
        alt={selectedCurrency}
        loading="lazy"
       />
       <span data-current="">{selectedCurrency}</span>
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
       />
      </svg>
     </button>

     {dropdownOpen && (
      <div className="t4s-dropdown__wrapper t4s-currency_type_2 t4s-current-scrollbar">
       <div className="t4s-drop-arrow"></div>
       <div className="t4s-dropdown__list">
        {currencies.map((currency) => (
         <button
          key={currency.code}
          type="button"
          data-flagst4s="sm"
          className={`t4s-currency-item flagst4s ${
           currency.code === selectedCurrency ? "is--selected" : ""
          }`}
          onClick={() => handleCurrencyChange(currency.code)}
          data-currency={currency.code}
         >
          <img
           width="30"
           height="22.5"
           src={currency.flag}
           alt={currency.code}
           loading="lazy"
          />
          <span>{currency.code}</span>
         </button>
        ))}
       </div>
      </div>
     )}
    </div>
   </div>
  </div>
 );
};

export default TopBar;
