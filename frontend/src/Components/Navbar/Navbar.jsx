/** @format */

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import cart_icon from "../Assets/cart_icon.png"; // Adjust the import path as necessary
// import "./Navbar.css";

// const NavBar = () => {
//  const [selectedRole, setSelectedRole] = useState("");
//  const navigate = useNavigate();

//  const handleRoleChange = (e) => {
//   setSelectedRole(e.target.value);
//  };

//  const handleLogin = () => {
//   if (selectedRole === "customer") {
//    navigate("/");
//   } else if (selectedRole === "admin") {
//    navigate("/admin-dashboard");
//   } else {
//    alert("Please select a role before logging in.");
//   }
//  };

//  const getTotalCartItems = () => {
//   // Replace with your logic to get total cart items
//   return 5; // Example count
//  };

//  return (
//   <div className="nav-login-cart">
//    <div className="login-dropdown">
//     <select
//      value={selectedRole}
//      onChange={handleRoleChange}
//      className="role-selector"
//     >
//      <option value="">Select Role</option>
//      <option value="customer">Customer</option>
//      <option value="admin">Admin</option>
//     </select>
//     <button onClick={handleLogin} className="login-button">
//      Login
//     </button>
//    </div>
//    <Link to="/cart">
//     <img src={cart_icon} alt="Cart" className="cart-icon" />
//    </Link>
//    <div className="nav-cart-count">{getTotalCartItems()}</div>
//   </div>
//  );
// };

// export default NavBar;
//original one
// import React, { useEffect, useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ShopContext } from "../../Context/ShopContext";
// import axios from "axios";
// import "./Navbar.css";
// import MenuComponent from "./MenuComponent"; // Adjust the path if it's in a different folder

// import logo from "../Assets/logo.png";
// import cart_icon from "../Assets/cart_icon.png";

// // SVG Gift Card Icon
// const GiftCardSVG = () => (
//  <svg
//   xmlns="http://www.w3.org/2000/svg"
//   width="50"
//   height="50"
//   viewBox="0 0 24 24"
//   fill="none"
//   stroke="currentColor"
//   strokeWidth="2"
//   strokeLinecap="round"
//   strokeLinejoin="round"
//   className="gift-card-svg"
//  >
//   <rect x="2" y="6" width="20" height="12" rx="2" ry="2" />
//   <line x1="2" y1="6" x2="22" y2="6" />
//   <line x1="2" y1="18" x2="22" y2="18" />
//   <circle cx="18" cy="12" r="1" />
//  </svg>
// );

// const Navbar = ({ role, onLogout }) => {
//  const navigate = useNavigate();
//  console.log("ShopContext in bar :", ShopContext);
//  const { getTotalCartItems } = useContext(ShopContext);
//  const [products, setProducts] = useState([]);

//  useEffect(() => {
//   // Fetch product data from API
//   axios
//    .get(
//     "https://76vgxe9gag.execute-api.us-east-1.amazonaws.com/api/Product/all",
//    )
//    .then((response) => {
//     console.log("API Response:", response.data);
//     setProducts(response.data);
//    })
//    .catch((error) => {
//     console.error("Error fetching products:", error);
//    });
//  }, []);

//  return (
//   <div className="navbar t4s-header__wrapper">
//    <div className="nav-logo">
//     <img src={logo} alt="Logo" />
//     <p>Anika Fashion House</p>
//    </div>
//    <ul className="nav-menu t4s-nav__ul">
//     <li className="t4s-menu-item">
//      <Link to="/">Shop</Link>
//     </li>
//     <li className="t4s-menu-item">
//      <Link to="/mens">Men</Link>
//     </li>
//     <li className="t4s-menu-item">
//      <Link to="/womens">Women</Link>
//     </li>
//     <li className="t4s-menu-item">
//      <Link to="/kids">Kids</Link>
//     </li>
//     <li className="t4s-menu-item">
//      <button
//       onClick={() => navigate(`/product-images/${products[0]?.id || 1}`)}
//      >
//       Show Product Images
//      </button>
//     </li>
//    </ul>
//    <div className="nav-login-cart">
//     {role !== "customer" ? (
//      <button onClick={onLogout}>Logout</button>
//     ) : (
//      <Link to="/login">
//       <button>Login</button>
//      </Link>
//     )}
//     <Link to="/cart">
//      <img src={cart_icon} alt="Cart" />
//     </Link>
//     <div className="nav-cart-count">{getTotalCartItems()}</div>

//     {/* SVG Gift Card Button */}
//     <button className="gift-card-button">
//      <GiftCardSVG />
//     </button>
//    </div>
//    <MenuComponent />
//   </div>
//  );
// };

// export default Navbar;

// import React, { useEffect, useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ShopContext } from "../../Context/ShopContext";
// import axios from "axios";
// import "./Navbar.css";
// import MenuComponent from "./MenuComponent"; // Adjust the path if it's in a different folder

// import logo from "../Assets/logo.png";
// import cart_icon from "../Assets/cart_icon.png";

// // SVG Gift Card Icon
// const GiftCardSVG = () => (
//  <svg
//   xmlns="http://www.w3.org/2000/svg"
//   width="50"
//   height="50"
//   viewBox="0 0 24 24"
//   fill="none"
//   stroke="currentColor"
//   strokeWidth="2"
//   strokeLinecap="round"
//   strokeLinejoin="round"
//   className="gift-card-svg"
//  >
//   <rect x="2" y="6" width="20" height="12" rx="2" ry="2" />
//   <line x1="2" y1="6" x2="22" y2="6" />
//   <line x1="2" y1="18" x2="22" y2="18" />
//   <circle cx="18" cy="12" r="1" />
//  </svg>
// );

// const Navbar = ({ role, onLogout }) => {
//  const navigate = useNavigate();
//  console.log("ShopContext in bar :", ShopContext);
//  const { getTotalCartItems } = useContext(ShopContext);
//  const [products, setProducts] = useState([]);

//  useEffect(() => {
//   // Fetch product data from API
//   axios
//    .get(
//     "https://76vgxe9gag.execute-api.us-east-1.amazonaws.com/api/Product/all",
//    )
//    .then((response) => {
//     console.log("API Response:", response.data);
//     setProducts(response.data);
//    })
//    .catch((error) => {
//     console.error("Error fetching products:", error);
//    });
//  }, []);

//  return (
//   <div className="navbar t4s-header__wrapper">
//    <div className="nav-logo">
//     <img src={logo} alt="Logo" />
//     <p>Anika Fashion House</p>
//    </div>
//    <ul className="nav-menu t4s-nav__ul">
//     <li className="t4s-menu-item">
//      <Link to="/">Shop</Link>
//     </li>
//     <li className="t4s-menu-item">
//      <Link to="/mens">Men</Link>
//     </li>
//     <div className="t4s-type__drop menu-pos__left">
//      {/* Your MenuComponent content */}
//      <MenuComponent />
//     </div>
//     <li className="t4s-menu-item">
//      <Link to="/womens">Women</Link>
//     </li>
//     <li className="t4s-menu-item">
//      <Link to="/kids">Kids</Link>
//     </li>
//     <li className="t4s-menu-item">
//      <button
//       onClick={() => navigate(`/product-images/${products[0]?.id || 1}`)}
//      >
//       Show Product Images
//      </button>
//     </li>
//    </ul>
//    <div className="nav-login-cart t4s-site-nav__icons">
//     {role !== "customer" ? (
//      <button onClick={onLogout}>Logout</button>
//     ) : (
//      <Link to="/login">
//       <button>Login</button>
//      </Link>
//     )}
//     <Link to="/cart" className="t4s-site-nav__cart">
//      <img src={cart_icon} alt="Cart" />
//     </Link>
//     <div className="nav-cart-count t4s-count-box">{getTotalCartItems()}</div>

//     {/* SVG Gift Card Button */}
//     <button className="gift-card-button t4s-site-nav__icon">
//      <GiftCardSVG />
//     </button>
//    </div>
//   </div>
//  );
// };

// export default Navbar;

// import React, { useEffect, useState, useContext } from "react";
// import { ShopContext } from "../../Context/ShopContext";
// import { Link, useNavigate } from "react-router-dom";

// import axios from "axios";
// import "./Navbar.css";
// const Navbar = () => {
//  const [dropdownOpen, setDropdownOpen] = useState({});

//  const toggleDropdown = (id) => {
//   setDropdownOpen((prev) => ({
//    ...prev,
//    [id]: !prev[id],
//   }));
//  };

//  return (
//   <div>
//    {/* Header Section */}
//    <header
//     className="t4s-header__wrapper t4s-pr t4s-header-layout_logo_left"
//     data-header-options='{"isTransparent": false, "isSticky": true, "hideScroldown": true}'
//    >
//     <div className="t4s-container">
//      <div className="t4s-row t4s-gx-15 t4s-gx-md-30 t4s-align-items-center">
//       {/* Hamburger Menu */}
//       <div className="t4s-col-md-4 t4s-col-3 t4s-d-lg-none t4s-col-item">
//        <a
//         href="/"
//         data-menu-drawer
//         data-drawer-options='{"id":"#t4s-menu-drawer"}'
//         className="t4s-push-menu-btn t4s-lh-1 t4s-d-flex t4s-align-items-center"
//        >
//         <svg
//          xmlns="http://www.w3.org/2000/svg"
//          width="30"
//          height="16"
//          fill="currentColor"
//         >
//          <rect width="30" height="1.5" />
//          <rect y="7" width="20" height="1.5" />
//          <rect y="14" width="30" height="1.5" />
//         </svg>
//        </a>
//       </div>

//       {/* Logo */}
//       <div className="t4s-col-lg-2 t4s-col-md-4 t4s-col-6 t4s-text-center t4s-text-lg-start t4s-col-item">
//        <div className="t4s-header__logo t4s-lh-1">
//         <a className="t4s-d-inline-block" href="/">
//          <img
//           loading="eager"
//           src="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=110"
//           srcSet="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=110, //blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=220 2x"
//           className="header__normal-logo t4s-d-none t4s-d-lg-block"
//           alt="Blucheez"
//           width="110"
//           height="38"
//           style={{ width: "110px" }}
//          />
//          <img
//           loading="lazy"
//           src="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=95"
//           srcSet="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=95, //blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=190 2x"
//           className="header__sticky-logo t4s-d-none"
//           alt="Blucheez"
//           width="95"
//           height="33"
//           style={{ width: "95px" }}
//          />
//          <img
//           loading="eager"
//           src="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=100"
//           srcSet="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=100, //blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=200 2x"
//           className="header__mobile-logo t4s-d-lg-none"
//           alt="Blucheez"
//           width="100"
//           height="34"
//           style={{ width: "100px" }}
//          />
//         </a>
//        </div>
//       </div>

//       {/* Main Navigation */}
//       <div className="t4s-col t4s-d-none t4s-d-lg-block t4s-col-item">
//        <nav className="t4s-navigation t4s-text-center t4s-nav__hover_fadein t4s-nav-arrow__false">
//         <ul
//          id="t4s-nav-ul"
//          className="t4s-nav__ul t4s-d-inline-flex t4s-flex-wrap t4s-align-items-center"
//         >
//          <li className="t4s-type__simple t4s-menu-item">
//           <a href="/collections/newest-products">NEW IN</a>
//          </li>
//          <li className="t4s-type__drop t4s-menu-item has--children">
//           <a href="/collections/summer">
//            SUMMER <span style={{ color: "#CE3241" }}>NEW</span>
//           </a>
//           <div className="t4s-sub-menu">
//            <div className="t4s-lazy_menu">
//             <div className="t4s-menu-item">
//              <a href="/collections/summer">View All</a>
//             </div>
//             <div className="t4s-menu-item">
//              <a href="/collections/mens-summer-collection">Men's</a>
//             </div>
//             <div className="t4s-menu-item">
//              <a href="/collections/womens-summer-collection">Women's</a>
//             </div>
//            </div>
//           </div>
//          </li>
//          {/* Add more menu items here as needed */}
//         </ul>
//        </nav>
//       </div>
//      </div>
//     </div>
//    </header>

//    {/* Additional Menu Section - Vertically stacked main menu items */}

//    {/* SHIRT Dropdown */}
//    <div className="menu t4s-vertical-menu">
//     {/* SHIRT Dropdown */}
//     <div className="t4s-menu-column">
//      <div className="t4s-menu-item has--children">
//       <Link to="/collections/mens-shirt">
//        <span>Shirt</span>
//       </Link>
//       <ul className="t4s-sub-menu">
//        <li>
//         <Link to="/collections/mens-shirt">View All</Link>
//        </li>
//        <li>
//         <Link to="/collections/mens-formal-shirts">Formal Shirt</Link>
//        </li>
//        <li>
//         <Link to="/collections/mens-premium-shirts">Premium Shirt</Link>
//        </li>
//        <li>
//         <Link to="/collections/mens-casual-shirts">Casual Shirt</Link>
//        </li>
//       </ul>
//      </div>
//     </div>

//     {/* Polo Shirt */}
//     <div className="t4s-menu-column">
//      <div className="t4s-menu-item">
//       <Link to="/collections/polo-shirt">Polo Shirt</Link>
//      </div>
//     </div>

//     {/* T-shirt */}
//     <div className="t4s-menu-column">
//      <div className="t4s-menu-item">
//       <Link to="/collections/mens-tshirt">T-shirt</Link>
//      </div>
//     </div>

//     {/* Pants Dropdown */}
//     <div className="t4s-menu-column">
//      <div className="t4s-menu-item has--children">
//       <Link to="/collections/mens-pant">
//        <span>Pants</span>
//       </Link>
//       <ul className="t4s-sub-menu">
//        <li>
//         <Link to="/collections/mens-pant">View All</Link>
//        </li>
//        <li>
//         <Link to="/collections/formal-pants">Formal Pant</Link>
//        </li>
//        <li>
//         <Link to="/collections/casual-pants">Casual Pant</Link>
//        </li>
//        <li>
//         <Link to="/collections/denim-jeans-pant">Jeans</Link>
//        </li>
//        <li>
//         <Link to="/collections/mens-jogger-pants">Joggers & Cargo</Link>
//        </li>
//        <li>
//         <Link to="/collections/mens-shorts-pant">Shorts</Link>
//        </li>
//       </ul>
//      </div>
//     </div>
//    </div>
//   </div>
//  );
// };

// export default Navbar;

import React from "react";
import "../../styles/global.css";
import { Link } from "react-router-dom";
//import Navbar from "./Navbar.css";
//import Header from "./Header";
import "./submenu.css";
import MenuComponent from "./MenuComponent";
import SiteNavIcons from "./SiteNavIcons";
import T4sMenu from "./T4sMenu";
import { menuItemsData } from "./MenuItemsData";
import "./Navbar.css";

// const Navbar = () => {
//  return (
//   <nav className="main-nav">
//    <ul className="menus">
//     {menuItemsData.map((menu, index) => {
//      return (
//       <li className="menu-itmes" key={index}>
//        <a href="/#">{menu.title}</a>
//       </li>
//      );
//     })}
//    </ul>
//   </nav>
//  );
// };
// export default Navbar;

const Navbar = () => {
 const renderMenu = (items, isSubmenu = false) => {
  return (
   <ul className={isSubmenu ? "dropdown" : "nav-menu"}>
    {items.map((item, index) => (
     <li key={index} className={item.children ? "has-submenu" : ""}>
      <Link to={item.href || "#"} className="nav-link">
       {item.title}
      </Link>
      {item.children && renderMenu(item.children, true)}
     </li>
    ))}
   </ul>
  );
 };

 return (
  <nav className="navbar">
   <div className="navbar-container">{renderMenu(menuItemsData)}</div>
  </nav>
 );
};

export default Navbar;
//   <div>
//    <MenuComponent />
//    <SiteNavIcons />

//    <Header />
//    <T4sMenu />
//    <li
//     id="item_drop_PcAmLN"
//     data-placement="bottom"
//     className="t4s-type__drop t4s-menu-item has--children menu-has__offsets menu-pos__left"
//    >
//     <a
//      className="t4s-lh-1 t4s-d-flex t4s-align-items-center t4s-pr"
//      href="/"
//      target="_self"
//     >
//      WOMEN
//     </a>
//     <div
//      id="content_drop_PcAmLN"
//      className="t4s-sub-menu t4s-pa t4s-op-0 t4s-pe-none"
//      style={{ left: "858.144px", top: "100%" }}
//     >
//      <div className="t4s-lazy_menu" data-handle="womens-clothing">
//       <div className="t4s-menu-item">
//        <a href="/collections/womens-wear">View All</a>
//       </div>
//       <div className="t4s-menu-item has--children">
//        <a href="#">
//         <span>Ethnic</span>
//         <svg
//          xmlns="http://www.w3.org/2000/svg"
//          viewBox="0 0 256 512"
//          width="7"
//          fill="currentColor"
//         >
//          <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"></path>
//         </svg>
//        </a>
//        <ul className="t4s-sub-menu t4s-sub-menu-2 pa op__0">
//         <li className="t4s-menu-item">
//          <a href="/collections/kameez-collection">All Kameez</a>
//         </li>
//         <li className="t4s-menu-item">
//          <a href="/collections/kurti-collection">One Pcs Kurti </a>
//         </li>
//         <li className="t4s-menu-item">
//          <a href="/collections/elegant-salwar-kameez">Two Pcs Set</a>
//         </li>
//         <li className="t4s-menu-item">
//          <a href="/collections/exclusive-salwar-kameez">Three Pcs Set</a>
//         </li>
//         <li className="t4s-menu-item">
//          <a href="/collections/saree">Saree</a>
//         </li>
//         <li className="t4s-menu-item">
//          <a href="/collections/blouse">Blouse</a>
//         </li>
//        </ul>
//       </div>
//       <div className="t4s-menu-item has--children">
//        <a href="#">
//         <span>Western</span>
//         <svg
//          xmlns="http://www.w3.org/2000/svg"
//          viewBox="0 0 256 512"
//          width="7"
//          fill="currentColor"
//         >
//          <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"></path>
//         </svg>
//        </a>
//        <ul className="t4s-sub-menu t4s-sub-menu-2 pa op__0">
//         <li className="t4s-menu-item">
//          <a href="/collections/western-tops">Western Tops</a>
//         </li>
//         <li className="t4s-menu-item">
//          <a href="/collections/womens-co-ord-sets">Co-ords</a>
//         </li>
//         <li className="t4s-menu-item">
//          <a href="/collections/long-dress">Long Dress</a>
//         </li>
//         <li className="t4s-menu-item">
//          <a href="/collections/womens-tee-shirts">T-Shirts</a>
//         </li>
//         <li className="t4s-menu-item">
//          <a href="/collections/skirt">Skirt</a>
//         </li>
//         <li className="t4s-menu-item">
//          <a href="/collections/outerwear">Outerwear</a>
//         </li>
//        </ul>
//       </div>
//       <div className="t4s-menu-item">
//        <a href="/collections/ethnic-fusion-wear">Fusion Wear</a>
//       </div>
//       <div className="t4s-menu-item has--children">
//        <a href="/collections/womens-pant">
//         <span>Pants</span>
//         <svg
//          xmlns="http://www.w3.org/2000/svg"
//          viewBox="0 0 256 512"
//          width="7"
//          fill="currentColor"
//         >
//          <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"></path>
//         </svg>
//        </a>
//        <ul className="t4s-sub-menu t4s-sub-menu-2 pa op__0">
//         <li className="t4s-menu-item">
//          <a href="/collections/womens-pant">View All</a>
//         </li>
//         <li className="t4s-menu-item">
//          <a href="/collections/women-jeans-pant">Women's Jeans</a>
//         </li>
//         <li className="t4s-menu-item">
//          <a href="/collections/womens-pajama">Women's Pajama</a>
//         </li>
//         <li className="t4s-menu-item">
//          <a href="/collections/womens-trouser">Women's Trouser</a>
//         </li>
//        </ul>
//       </div>
//       <div className="t4s-menu-item has--children">
//        <a href="/collections/womens-winter-wear">
//         <span>Winter Wear</span>
//         <svg
//          xmlns="http://www.w3.org/2000/svg"
//          viewBox="0 0 256 512"
//          width="7"
//          fill="currentColor"
//         >
//          <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"></path>
//         </svg>
//        </a>
//        <ul className="t4s-sub-menu t4s-sub-menu-2 pa op__0">
//         <li className="t4s-menu-item">
//          <a href="/collections/womens-winter-wear">View All</a>
//         </li>
//         <li className="t4s-menu-item">
//          <a href="/collections/womens-sweatshirts">
//           Sweatshirts &amp; Sweaters
//          </a>
//         </li>
//         <li className="t4s-menu-item">
//          <a href="/collections/womens-jackets">Women's Jackets</a>
//         </li>
//        </ul>
//       </div>
//       <div className="t4s-menu-item has--children">
//        <a href="/collections/jewellery">
//         <span>Jewellery</span>
//         <svg
//          xmlns="http://www.w3.org/2000/svg"
//          viewBox="0 0 256 512"
//          width="7"
//          fill="currentColor"
//         >
//          <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"></path>
//         </svg>
//        </a>
//        <ul className="t4s-sub-menu t4s-sub-menu-2 pa op__0">
//         <li className="t4s-menu-item">
//          <a href="/collections/earrings">Earrings</a>
//         </li>
//        </ul>
//       </div>
//      </div>
//     </div>
//    </li>
//   </div>
//  );
// };

//export default TopBar;
