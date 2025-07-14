/** @format */

import React from "react";
import { Link } from "react-router-dom";
import "../../styles/global.css";
//import submenu from "../../AdminComponents/Assets/t4s-submenu.css";
import base from "../../AdminComponents/Assets/base.css";
import submenu from "../../Components/Navbar/submenu.css";
import Navbar from "./Navbar.jsx";
import MenuComponent from "./MenuComponent";
//import SiteNavicons from "./SiteNavicons";

// const Header = () => {
//  return (
//   <header
//    className="t4s-header__wrapper t4s-pr t4s-header-layout_logo_left"
//    data-header-options='{"isTransparent": false, "isSticky": true, "hideScroldown": true}'
//   >
//    <div className="t4s-container">
//     <div
//      className="t4s-row t4s-gx-15 t4s-gx-md-30 t4s-align-items-center"
//      data-header-height
//     >
//      <div>
//       <Navbar />
//      </div>
//      {/* Mobile Menu Button */}
//      <div className="t4s-col-md-4 t4s-col-3 t4s-d-lg-none t4s-col-item">
//       <Link
//        to="/"
//        data-menu-drawer
//        data-drawer-options='{"id":"#t4s-menu-drawer"}'
//        className="t4s-push-menu-btn t4s-lh-1 t4s-d-flex t4s-align-items-center"
//       >
//        <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="30"
//         height="16"
//         fill="currentColor"
//        >
//         <rect width="30" height="1.5" />
//         <rect y="7" width="20" height="1.5" />
//         <rect y="14" width="30" height="1.5" />
//        </svg>
//       </Link>
//      </div>

//      {/* Logo */}
//      <div className="t4s-col-lg-2 t4s-col-md-4 t4s-col-6 t4s-text-center t4s-text-lg-start t4s-col-item">
//       <div className="t4s-header__logo t4s-lh-1">
//        <a className="t4s-d-inline-block" href="/">
//         <img
//          src="https://blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=110"
//          srcSet="https://blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=110, //blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=220 2x"
//          className="header__normal-logo t4s-d-none t4s-d-lg-block"
//          width="110"
//          height="38"
//          alt="Blucheez"
//          style={{ width: "110px" }}
//         />
//         <img
//          src="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=95"
//          srcSet="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=95, //blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=190 2x"
//          className="header__sticky-logo t4s-d-none"
//          width="95"
//          height="33"
//          alt="Blucheez"
//          style={{ width: "95px" }}
//         />
//         <img
//          src="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=100"
//          srcSet="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=100, //blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=200 2x"
//          className="header__mobile-logo t4s-d-lg-none"
//          width="100"
//          height="34"
//          alt="Blucheez"
//          style={{ width: "100px" }}
//         />
//        </a>
//       </div>
//      </div>

//      {/* Navigation */}
//      <div className="t4s-col t4s-d-none t4s-d-lg-block t4s-col-item">
//       <nav className="t4s-navigation t4s-text-center t4s-nav__hover_fadein t4s-nav-arrow__false">
//        <ul className="t4s-nav__ul t4s-d-inline-flex t4s-flex-wrap t4s-align-items-center">
//         <li className="t4s-type__simple t4s-menu-item">
//          <a
//           className="t4s-lh-1 t4s-d-flex t4s-align-items-center t4s-pr"
//           href="/collections/newest-products"
//          >
//           NEW IN
//          </a>
//         </li>

//         <li className="t4s-type__drop t4s-menu-item has--children menu-has__offsets menu-pos__right">
//          <a
//           className="t4s-lh-1 t4s-d-flex t4s-align-items-center t4s-pr"
//           href="/collections/accessories"
//          >
//           WOMEN
//           <span className="t4s_lb_nav t4s-pa t4s-op-0">
//            <span style={{ color: "#CE3241" }}>NEW</span>
//           </span>
//          </a>
//         </li>

//         <li className="t4s-type__drop t4s-menu-item has--children menu-has__offsets menu-pos__right">
//          <a
//           className="t4s-lh-1 t4s-d-flex t4s-align-items-center t4s-pr"
//           href="/collections/summer"
//          >
//           SUMMER{" "}
//           <span className="t4s_lb_nav t4s-pa t4s-op-0">
//            <span style={{ color: "#CE3241" }}>NEW</span>
//           </span>
//          </a>
//         </li>

//         <li className="t4s-type__drop t4s-menu-item has--children menu-has__offsets menu-pos__left">
//          <a
//           className="t4s-lh-1 t4s-d-flex t4s-align-items-center t4s-pr"
//           href="/collections/accessories"
//          >
//           ACCESSORIES
//          </a>
//          <div className="t4s-sub-menu t4s-pa t4s-op-0 t4s-pe-none">
//           <div className="t4s-lazy_menu" data-handle="accessories">
//            <div className="t4s-menu-item">
//             <a href="/collections/accessories">View All</a>
//            </div>
//            <div className="t4s-menu-item has--children">
//             <a href="/collections/jewellery">
//              <span>Jewellery</span>
//              <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 256 512"
//               width="7"
//               fill="currentColor"
//              >
//               <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" />
//              </svg>
//             </a>
//             <ul className="t4s-sub-menu t4s-sub-menu-2 pa op__0">
//              <li className="t4s-menu-item">
//               <a href="/collections/earrings">Earrings</a>
//              </li>
//              <li className="t4s-type__drop t4s-menu-item has--children menu-has__offsets menu-pos__right">
//               <a
//                className="t4s-lh-1 t4s-d-flex t4s-align-items-center t4s-pr"
//                href="/collections/accessories"
//               >
//                WOMEN
//               </a>
//               <div
//                id="content_drop_PcAmLN"
//                className="absolute top-full left-0 w-[300px] bg-white shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 z-50"
//                style={{ left: "858.144px", top: " 100%" }}
//               >
//                <div className="t4s-lazy_menu" data-handle="womens-clothing">
//                 <div className="t4s-menu-item">
//                  <a href="/collections/womens-wear">View All</a>
//                 </div>
//                 <div className="t4s-menu-item has--children">
//                  <a href="#">
//                   <span>Ethnic</span>
//                   <svg
//                    xmlns="http://www.w3.org/2000/svg"
//                    viewBox="0 0 256 512"
//                    width="7"
//                    fill="currentColor"
//                   >
//                    <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"></path>
//                   </svg>
//                  </a>
//                  <ul className="t4s-sub-menu t4s-sub-menu-2 pa op__0">
//                   <li className="t4s-menu-item">
//                    <a href="/collections/kameez-collection">All Kameez</a>
//                   </li>
//                   <li className="t4s-menu-item">
//                    <a href="/collections/kurti-collection">One Pcs Kurti </a>
//                   </li>
//                   <li className="t4s-menu-item">
//                    <a href="/collections/elegant-salwar-kameez">Two Pcs Set</a>
//                   </li>
//                   <li className="t4s-menu-item">
//                    <a href="/collections/exclusive-salwar-kameez">
//                     Three Pcs Set
//                    </a>
//                   </li>
//                   <li className="t4s-menu-item">
//                    <a href="/collections/saree">Saree</a>
//                   </li>
//                   <li className="t4s-menu-item">
//                    <a href="/collections/blouse">Blouse</a>
//                   </li>
//                  </ul>
//                 </div>
//                 <div className="t4s-menu-item has--children">
//                  <a href="#">
//                   <span>Western</span>
//                   <svg
//                    xmlns="http://www.w3.org/2000/svg"
//                    viewBox="0 0 256 512"
//                    width="7"
//                    fill="currentColor"
//                   >
//                    <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"></path>
//                   </svg>
//                  </a>
//                  <ul className="t4s-sub-menu t4s-sub-menu-2 pa op__0">
//                   <li className="t4s-menu-item">
//                    <a href="/collections/western-tops">Western Tops</a>
//                   </li>
//                   <li className="t4s-menu-item">
//                    <a href="/collections/womens-co-ord-sets">Co-ords</a>
//                   </li>
//                   <li className="t4s-menu-item">
//                    <a href="/collections/long-dress">Long Dress</a>
//                   </li>
//                   <li className="t4s-menu-item">
//                    <a href="/collections/womens-tee-shirts">T-Shirts</a>
//                   </li>
//                   <li className="t4s-menu-item">
//                    <a href="/collections/skirt">Skirt</a>
//                   </li>
//                   <li className="t4s-menu-item">
//                    <a href="/collections/outerwear">Outerwear</a>
//                   </li>
//                  </ul>
//                 </div>
//                 <div className="t4s-menu-item">
//                  <a href="/collections/ethnic-fusion-wear">Fusion Wear</a>
//                 </div>
//                 <div className="t4s-menu-item has--children">
//                  <a href="/collections/womens-pant">
//                   <span>Pants</span>
//                   <svg
//                    xmlns="http://www.w3.org/2000/svg"
//                    viewBox="0 0 256 512"
//                    width="7"
//                    fill="currentColor"
//                   >
//                    <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"></path>
//                   </svg>
//                  </a>
//                  <ul className="t4s-sub-menu t4s-sub-menu-2 pa op__0">
//                   <li className="t4s-menu-item">
//                    <a href="/collections/womens-pant">View All</a>
//                   </li>
//                   <li className="t4s-menu-item">
//                    <a href="/collections/women-jeans-pant">Women's Jeans</a>
//                   </li>
//                   <li className="t4s-menu-item">
//                    <a href="/collections/womens-pajama">Women's Pajama</a>
//                   </li>
//                   <li className="t4s-menu-item">
//                    <a href="/collections/womens-trouser">Women's Trouser</a>
//                   </li>
//                  </ul>
//                 </div>
//                 <div className="t4s-menu-item has--children">
//                  <a href="/collections/womens-winter-wear">
//                   <span>Winter Wear</span>
//                   <svg
//                    xmlns="http://www.w3.org/2000/svg"
//                    viewBox="0 0 256 512"
//                    width="7"
//                    fill="currentColor"
//                   >
//                    <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"></path>
//                   </svg>
//                  </a>
//                  <ul className="t4s-sub-menu t4s-sub-menu-2 pa op__0">
//                   <li className="t4s-menu-item">
//                    <a href="/collections/womens-winter-wear">View All</a>
//                   </li>
//                   <li className="t4s-menu-item">
//                    <a href="/collections/womens-sweatshirts">
//                     Sweatshirts &amp; Sweaters
//                    </a>
//                   </li>
//                   <li className="t4s-menu-item">
//                    <a href="/collections/womens-jackets">Women's Jackets</a>
//                   </li>
//                  </ul>
//                 </div>
//                 <div className="t4s-menu-item has--children">
//                  <a href="/collections/jewellery">
//                   <span>Jewellery</span>
//                   <svg
//                    xmlns="http://www.w3.org/2000/svg"
//                    viewBox="0 0 256 512"
//                    width="7"
//                    fill="currentColor"
//                   >
//                    <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"></path>
//                   </svg>
//                  </a>
//                  <ul className="t4s-sub-menu t4s-sub-menu-2 pa op__0">
//                   <li className="t4s-menu-item">
//                    <a href="/collections/earrings">Earrings</a>
//                   </li>
//                  </ul>
//                 </div>
//                </div>
//               </div>
//              </li>
//             </ul>
//            </div>
//           </div>
//          </div>
//         </li>

//         <li className="t4s-type__drop t4s-menu-item has--children menu-has__offsets menu-pos__right">
//          <a
//           className="t4s-lh-1 t4s-d-flex t4s-align-items-center t4s-pr"
//           href="/collections/black"
//           target="_blank"
//           rel="noopener"
//          >
//           <img
//            style={{ height: "1.6rem" }}
//            src="https://cdn.shopify.com/s/files/1/0585/0077/6131/files/Black_black_logo.svg?v=1741852879"
//            alt="Blucheez | Black Logo"
//           />
//           <span
//            className="t4s_lb_nav t4s-pa t4s-op-0"
//            style={{ color: "#222" }}
//           >
//            <span style={{ color: "#CE3241" }}>NEW</span>
//           </span>
//          </a>
//         </li>

//         <li className="t4s-type__simple t4s-menu-item is--nav__active">
//          <a
//           className="t4s-lh-1 t4s-d-flex t4s-align-items-center t4s-pr"
//           href="/collections/belwari"
//           target="_blank"
//           rel="noopener"
//          >
//           <img
//            style={{ height: "1.8rem" }}
//            src="https://cdn.shopify.com/s/files/1/0585/0077/6131/files/Belwari_Logo_Gold.svg?v=1703618271"
//            alt="Belwari Logo"
//           />
//          </a>
//         </li>

//         <li className="t4s-type__drop t4s-menu-item has--children menu-has__offsets menu-pos__left">
//          <a
//           className="t4s-lh-1 t4s-d-flex t4s-align-items-center t4s-pr"
//           href="/"
//          >
//           MEN
//          </a>
//         </li>
//        </ul>
//       </nav>
//      </div>

//      <div
//       className="t4s-col-auto t4s-d-none t4s-d-lg-block t4s-col-item"
//       style={{ marginLeft: "auto" }}
//      >
//       <div className="t4s-d-flex t4s-align-items-center">
//        <a
//         href="/account"
//         className="t4s-pr t4s-d-inline-block"
//         data-no-instant=""
//         data-drawer-delay=""
//         data-drawer-options='{"id":"#t4s-login-sidebar"}'
//        >
//         <svg
//          className="t4s-icon t4s-icon--account"
//          aria-hidden="true"
//          focusable="false"
//          role="presentation"
//         >
//          <use href="#icon-h-account" />
//         </svg>
//        </a>
//        <a href="/cart" className="t4s-pl t4s-d-inline-block">
//         Cart
//        </a>
//       </div>
//      </div>
//     </div>
//    </div>
//   </header>
//  );
// };

// export default Header;

const Header = () => {
 return (
  <header
   className="t4s-header__wrapper t4s-pr t4s-header-layout_logo_left"
   data-header-options='{"isTransparent": false, "isSticky": true, "hideScroldown": true}'
  >
   <div className="t4s-container">
    <div
     className="t4s-row t4s-gx-15 t4s-gx-md-30 t4s-align-items-center"
     data-header-height
    >
     {/* Mobile Menu Button */}
     <div className="t4s-col-md-4 t4s-col-3 t4s-d-lg-none t4s-col-item">
      <Link
       to="/"
       data-menu-drawer
       data-drawer-options='{"id":"#t4s-menu-drawer"}'
       className="t4s-push-menu-btn t4s-lh-1 t4s-d-flex t4s-align-items-center"
      >
       <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="16"
        fill="currentColor"
       >
        <rect width="30" height="1.5" />
        <rect y="7" width="20" height="1.5" />
        <rect y="14" width="30" height="1.5" />
       </svg>
      </Link>
     </div>
     <div>
      <MenuComponent />
     </div>

     {/* Logo */}
     <div className="t4s-col-lg-2 t4s-col-md-4 t4s-col-6 t4s-text-center t4s-text-lg-start t4s-col-item">
      <div className="t4s-header__logo t4s-lh-1">
       <a className="t4s-d-inline-block" href="/">
        <img
         src="https://blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=110"
         className="header__normal-logo t4s-d-none t4s-d-lg-block"
         width="110"
         height="38"
         alt="Blucheez"
         style={{ width: "110px" }}
        />
        <img
         src="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=95"
         className="header__sticky-logo t4s-d-none"
         width="95"
         height="33"
         alt="Blucheez"
         style={{ width: "95px" }}
        />
        <img
         src="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=100"
         className="header__mobile-logo t4s-d-lg-none"
         width="100"
         height="34"
         alt="Blucheez"
         style={{ width: "100px" }}
        />
       </a>
      </div>
     </div>

     {/* Navbar */}
     <div className="t4s-col-lg-10 t4s-col-12 t4s-d-none t4s-d-lg-block t4s-col-item">
      <Navbar />
     </div>
    </div>
   </div>
  </header>
 );
};

export default Header;
