/** @format */

//final latest working one
import React, { useState, useEffect, forwardRef } from "react";
import { menuItemsData } from "../Components/Navbar/MenuItemsData"; // Ensure this path is correct
import axios from "axios"; // <<<<<<< ADDED AXIOS IMPORT
import {
 Toolbar,
 Typography,
 IconButton,
 InputBase,
 Badge,
 Menu,
 Button,
 Box,
 Grid,
 Drawer,
 Paper,
 Checkbox,
 FormControlLabel,
 TextField,
 // Assuming these are not used in the final render based on your provided code
 // but keeping them imported as they were in your original list.
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchDrawer from "./SearchDrawer"; // Ensure this path is correct
import LoginSignup from "../Pages/LoginSignup"; // Ensure this path is correct
import { Link, useNavigate } from "react-router-dom";

// --- Styled Components ---

const SearchIconWrapper = styled("div")(({ theme }) => ({
 padding: theme.spacing(0, 2),
 height: "100%",
 display: "flex",
 alignItems: "center",
 justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
 color: "inherit",
 "& .MuiInputBase-input": {
  padding: theme.spacing(1, 1, 1, 0),
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  transition: theme.transitions.create("width"),
  width: "100%",
  [theme.breakpoints.up("md")]: {
   width: "20ch",
  },
 },
}));

// --- SVG Icons Component ---
// This is a good way to embed SVG sprites.
const HeaderSvgIcons = () => (
 <svg xmlns="http://www.w3.org/2000/svg" className="t4s-d-none">
  <symbol id="icon-h-search" viewBox="0 0 32 32" fill="currentColor">
   <path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z"></path>
  </symbol>
  <symbol id="icon-h-account" viewBox="0 0 32 32" fill="currentColor">
   <path d="M 16 5 C 12.144531 5 9 8.144531 9 12 C 9 14.410156 10.230469 16.550781 12.09375 17.8125 C 8.527344 19.34375 6 22.882813 6 27 L 8 27 C 8 22.570313 11.570313 19 16 19 C 20.429688 19 24 22.570313 24 27 L 26 27 C 26 22.882813 23.472656 19.34375 19.90625 17.8125 C 21.769531 16.550781 23 14.410156 23 12 C 23 8.144531 19.855469 5 16 5 Z M 16 7 C 18.773438 7 21 9.226563 21 12 C 21 14.773438 18.773438 17 16 17 C 13.226563 17 11 14.773438 11 12 C 11 9.226563 13.226563 7 16 7 Z"></path>
  </symbol>
  <symbol id="icon-h-heart" viewBox="0 0 32 32" fill="currentColor">
   <path d="M 9.5 5 C 5.363281 5 2 8.402344 2 12.5 C 2 13.929688 2.648438 15.167969 3.25 16.0625 C 3.851563 16.957031 4.46875 17.53125 4.46875 17.53125 L 15.28125 28.375 L 16 29.09375 L 16.71875 28.375 L 27.53125 17.53125 C 27.53125 17.53125 30 15.355469 30 12.5 C 30 8.402344 26.636719 5 22.5 5 C 19.066406 5 16.855469 7.066406 16 7.9375 C 15.144531 7.066406 12.933594 5 9.5 5 Z M 9.5 7 C 12.488281 7 15.25 9.90625 15.25 9.90625 L 16 10.75 L 16.75 9.90625 C 16.75 9.90625 19.511719 7 22.5 7 C 25.542969 7 28 9.496094 28 12.5 C 28 14.042969 26.125 16.125 26.125 16.125 L 16 26.25 L 5.875 16.125 C 5.875 16.125 5.390625 15.660156 4.90625 14.9375 C 4.421875 14.214844 4 13.273438 4 12.5 C 4 9.496094 6.457031 7 9.5 7 Z"></path>
  </symbol>
  <symbol id="icon-h-cart" viewBox="0 0 32 32" fill="currentColor">
   <path d="M 16 3 C 13.253906 3 11 5.253906 11 8 L 11 9 L 6.0625 9 L 6 9.9375 L 5 27.9375 L 4.9375 29 L 27.0625 29 L 27 27.9375 L 26 9.9375 L 25.9375 9 L 21 9 L 21 8 C 21 5.253906 18.746094 3 16 3 Z M 16 5 C 17.65625 5 19 6.34375 19 8 L 19 9 L 13 9 L 13 8 C 13 6.34375 14.34375 5 16 5 Z M 7.9375 11 L 11 11 L 11 14 L 13 14 L 13 11 L 19 11 L 19 14 L 21 14 L 21 11 L 24.0625 11 L 24.9375 27 L 7.0625 27 Z"></path>
  </symbol>
 </svg>
);

// Icon component (uses the SVG sprite)
const Icon = ({ icon }) => (
 <svg
  className={`t4s-icon t4s-icon--${icon}`}
  aria-hidden="true"
  focusable="false"
  role="presentation"
 >
  <use href={`#icon-h-${icon}`}></use>
 </svg>
);

// Arrow icon for submenus
const ArrowIcon = ({ direction = "right" }) => (
 <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 256 512"
  width="10"
  height="10"
  fill="currentColor"
  style={{
   transform: direction === "down" ? "rotate(90deg)" : "none",
   transition: "transform 0.2s",
   marginLeft: 6,
  }}
 >
  <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"></path>
 </svg>
);

// --- SubMenu Component ---
// Using forwardRef to allow MenuItem to attach refs for positioning if needed, though not strictly required by current logic.
const SubMenu = forwardRef(({ items, level = 1 }, ref) => {
 if (!items || items.length === 0) return null; // Don't render if no items

 return (
  <ul
   ref={ref}
   className={`t4s-sub-menu t4s-sub-menu-${level} pa op__0`}
   style={{
    left: level === 1 ? "0" : "100%",
    top: level === 1 ? "100%" : "0",
    minWidth: 220,
    position: "absolute",
    zIndex: 100 + level,
    background: "#fff",
    boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
    transition: "opacity 0.3s, visibility 0.3s",
    opacity: 1, // These should be controlled by the parent's hover state for actual visibility
    visibility: "visible", // These should be controlled by the parent's hover state for actual visibility
    padding: 0,
    listStyle: "none", // Added to remove default list styling
    margin: 0, // Added to remove default margin
   }}
  >
   {items.map((item, idx) => {
    const childItems = item.children || item.submenu;
    const hasChildren = childItems && childItems.length > 0;
    const text = item.text || item.title || item.name || "";
    const link = item.link || item.href || "#";
    const image = item.image || item.logo || null;
    const imageAlt = item.imageAlt || item.alt || "";
    const label = item.label || item.tag || "";
    const labelColor = item.labelColor || item.tagColor || "#CE3241";

    return (
     <li
      key={idx}
      className={`t4s-menu-item${hasChildren ? " has--children" : ""}`}
      style={{ position: "relative" }}
     >
      <a
       href={link}
       className="t4s-lh-1 t4s-d-flex t4s-align-items-center t4s-pr"
       style={{
        display: "flex",
        alignItems: "center",
        padding: "8px 15px",
        color: "#333",
        textDecoration: "none",
        cursor: "pointer",
        justifyContent: "space-between",
        whiteSpace: "nowrap", // Prevent text wrapping
       }}
       target={item.target || "_self"}
       rel={item.target === "_blank" ? "noopener noreferrer" : ""} // Added noreferrer for security
      >
       {image ? (
        <img
         style={{ height: item.imageHeight || "1.6rem" }}
         src={image}
         alt={imageAlt}
        />
       ) : (
        <span>{text}</span>
       )}
       {label && (
        <span
         className="t4s_lb_nav t4s-pa t4s-op-0"
         style={{
          backgroundColor: item.labelBg || "rgba(0,0,0,0)",
          color: "#fff", // This seems contradictory with labelColor, check desired effect
          marginLeft: "8px", // Added spacing
         }}
        >
         <span style={{ color: labelColor }}>{label}</span>
        </span>
       )}
       {hasChildren && <ArrowIcon direction="right" />}
      </a>
      {/* The visibility of this nested SubMenu is controlled by the parent's CSS hover state */}
      {hasChildren && <SubMenu items={childItems} level={level + 1} />}
     </li>
    );
   })}
  </ul>
 );
});

// --- Menu Item Component ---
const MenuItem = ({ item }) => {
 const [isOpen, setIsOpen] = useState(false); // State to control submenu visibility

 const childItems = item.children || item.submenu;
 const hasChildren = childItems && childItems.length > 0;

 const text = item.text || item.title || "";
 const link = item.link || item.href || "#";
 const image = item.image || item.logo || null;
 const imageAlt = item.imageAlt || item.alt || "";
 const label = item.label || item.tag || "";
 const labelColor = item.labelColor || item.tagColor || "#CE3241";

 // Use Link from react-router-dom for internal navigation
 const InternalLink = forwardRef((props, ref) => (
  <Link ref={ref} to={link} {...props} />
 ));

 return (
  <li
   id={item.id || `item_${text.toLowerCase().replace(/\s+/g, "_")}`}
   className={`${item.type || "t4s-type__drop"} t4s-menu-item ${
    hasChildren ? "has--children" : ""
   } ${item.extraClasses || ""}`}
   onMouseEnter={() => setIsOpen(true)}
   onMouseLeave={() => setIsOpen(false)}
   style={{ position: "relative" }}
   data-placement={item.placement || "bottom"}
  >
   <ComponentLink
    link={link}
    target={item.target}
    rel={item.target === "_blank" ? "noopener noreferrer" : ""}
    className="t4s-lh-1 t4s-d-flex t4s-align-items-center t4s-pr"
    style={{
     display: "flex",
     alignItems: "center",
     padding: "8px 15px",
     color: "#333",
     textDecoration: "none",
     cursor: "pointer",
    }}
   >
    {image ? (
     <img
      style={{ height: item.imageHeight || "1.6rem" }}
      src={image}
      alt={imageAlt}
     />
    ) : (
     text
    )}
    {label && (
     <span
      className="t4s_lb_nav t4s-pa t4s-op-0"
      style={{
       backgroundColor: item.labelBg || "rgba(0,0,0,0)",
       color: "#fff",
      }}
     >
      <span style={{ color: labelColor }}>{label}</span>
     </span>
    )}
    {hasChildren && <ArrowIcon direction="down" />}
   </ComponentLink>
   {hasChildren && isOpen && (
    <div
     className="submenu-wrapper"
     style={{
      display: "block",
      position: "absolute",
      left: 0,
      top: "100%",
      minWidth: 220,
      zIndex: 100,
     }}
    >
     <SubMenu items={childItems} level={1} />
    </div>
   )}
  </li>
 );
};

// Helper component to conditionally render Link or <a> tag
const ComponentLink = ({ link, target, rel, children, ...props }) => {
 if (link && link.startsWith("/")) {
  // Internal link
  return (
   <Link to={link} target={target} rel={rel} {...props}>
    {children}
   </Link>
  );
 } else {
  // External link or fallback
  return (
   <a href={link} target={target} rel={rel} {...props}>
    {children}
   </a>
  );
 }
};

// --- Data Conversion Function ---
const convertMenuData = (items) => {
 if (!items) return [];
 return items.map((item) => {
  const newItem = {
   id: `item_${(item.title || item.name || "")
    .toLowerCase()
    .replace(/\s+/g, "_")}`,
   type: "t4s-type__drop",
   text: item.title || item.name, // Prioritize title, then name
   link: item.href || item.path || "#", // Prioritize href, then path
   placement: "bottom",
   extraClasses: "menu-has__offsets menu-pos__left",
   handle: (item.title || item.name || "").toLowerCase().replace(/\s+/g, "-"),
   viewAll: false, // Default to false, check if item.children[0].title === "View All" if needed
  };

  if (item.logo) {
   newItem.image = item.logo;
   newItem.imageAlt = item.alt || "";
  }

  if (item.tag) {
   newItem.label = item.tag;
   newItem.labelBg = item.tagBg; // Assuming tagBg might exist in your data
   newItem.labelColor = item.tagColor; // Assuming tagColor might exist in your data
  }

  if (item.children) {
   newItem.children = convertMenuData(item.children); // Recursively convert children
  } else if (item.submenu) {
   newItem.children = convertMenuData(item.submenu); // Recursively convert submenu
  }

  return newItem;
 });
};

// --- Main Header Component ---
const BlucheezHeader = ({ setRole }) => {
 const menuItems = convertMenuData(menuItemsData);

 const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false);
 const [isLoginDrawerOpen, setIsLoginDrawerOpen] = useState(false);
 const navigate = useNavigate();

 // Login related states and functions
 const [formData, setFormData] = useState({
  email: "",
  password: "",
 });
 const [message, setMessage] = useState("");

 const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
 };

 const handleLogin = async () => {
  try {
   // Corrected endpoint based on typical API structure
   const response = await axios.post(
    "https://localhost:7142/api/User/login",
    formData, // Send formData directly
   );
   const { role, token, id } = response.data; // Changed Token to token for common naming
   localStorage.setItem("token", token);
   localStorage.setItem("role", role);
   localStorage.setItem("userId", id);
   setRole(role);
   navigate(role === "Admin" ? "/admin" : "/");
   setIsLoginDrawerOpen(false); // Close the drawer after successful login
   setMessage(""); // Clear message on success
  } catch (error) {
   console.error("Login error:", error);
   setMessage("Login failed. Please check your credentials.");
  }
 };

 const handleSubmit = (e) => {
  e.preventDefault();
  handleLogin();
 };

 // Toggle functions for drawers
 const toggleSearchDrawer = (open) => () => {
  setIsSearchDrawerOpen(open);
 };

 const toggleLoginDrawer = (open) => () => {
  setIsLoginDrawerOpen(open);
  if (open) {
   setMessage(""); // Clear any previous messages when opening the drawer
   setFormData({ email: "", password: "" }); // Reset form on open
  }
 };

 return (
  <>
   <HeaderSvgIcons /> {/* Render SVG symbols once */}
   <div
    className="t4s-header__wrapper t4s-pr t4s-header-layout_logo_left"
    data-header-options={{
     isTransparent: false,
     isSticky: true,
     hideScroldown: true,
    }}
   >
    <div className="t4s-container">
     <div
      className="t4s-row t4s-gx-15 t4s-gx-md-30 t4s-align-items-center"
      data-header-height=""
     >
      {/* Mobile Menu Button */}
      <div className="t4s-col-md-4 t4s-col-3 t4s-d-lg-none t4s-col-item">
       <a
        href="/" // This likely should trigger a mobile menu drawer, not navigate to home
        data-menu-drawer=""
        data-drawer-options={{ id: "#t4s-menu-drawer" }}
        className="t4s-push-menu-btn t4s-lh-1 t4s-d-flex t4s-align-items-center"
       >
        <svg
         xmlns="http://www.w3.org/2000/svg"
         width="30"
         height="16"
         viewBox="0 0 30 16"
         fill="currentColor"
        >
         <rect width="30" height="1.5"></rect>
         <rect y="7" width="20" height="1.5"></rect>
         <rect y="14" width="30" height="1.5"></rect>
        </svg>
       </a>
      </div>

      {/* Logo */}
      <div className="t4s-col-lg-2 t4s-col-md-4 t4s-col-6 t4s-text-center t4s-text-lg-start t4s-col-item">
       <div className="t4s-header__logo t4s-lh-1">
        <Link to="/" className="t4s-d-inline-block">
         <img
          loading="eager"
          srcSet="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=110, //blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=220 2x"
          src="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=110"
          className="header__normal-logo t4s-d-none t4s-d-lg-block"
          width="110"
          height="38"
          alt="Blucheez"
          style={{ width: "110px" }}
         />
         <img
          loading="lazy"
          srcSet="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=95, //blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=190 2x"
          src="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=95"
          className="header__sticky-logo t4s-d-none t4s-d-none"
          width="95"
          height="33"
          alt="Blucheez"
          style={{ width: "95px" }}
         />
         <img
          loading="eager"
          srcSet="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=100, //blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=200 2x"
          src="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=100"
          className="header__mobile-logo t4s-d-lg-none"
          width="100"
          height="34"
          alt="Blucheez"
          style={{ width: "100px" }}
         />
        </Link>
       </div>
      </div>

      {/* Navigation */}
      <div className="t4s-col t4s-d-none t4s-d-lg-block t4s-col-item">
       <nav className="t4s-navigation t4s-text-center t4s-nav__hover_fadein t4s-nav-arrow__false">
        <ul
         id="t4s-nav-ul"
         className="t4s-nav__ul t4s-d-inline-flex t4s-flex-wrap t4s-align-items-center"
         data-menu-nav=""
        >
         {menuItems.map((item, index) => (
          <MenuItem key={index} item={item} />
         ))}
        </ul>
       </nav>
      </div>

      {/* Icons Section */}
      <div className="t4s-col-lg-auto t4s-col-md-4 t4s-col-3 t4s-text-end t4s-col-group_btns t4s-col-item t4s-lh-1">
       <div className="t4s-site-nav__icons t4s-use__line is--hover2 t4s-h-cart__design1 t4s-lh-1 t4s-d-inline-flex t4s-align-items-center">
        {/* Search Icon */}
        <div className="t4s-site-nav__icon t4s-site-nav__search">
         <div onClick={toggleSearchDrawer(true)} style={{ cursor: "pointer" }}>
          <SearchIconWrapper>
           <SearchIcon />
          </SearchIconWrapper>
         </div>
         <Drawer
          anchor="right"
          open={isSearchDrawerOpen}
          onClose={toggleSearchDrawer(false)}
         >
          <Box
           sx={{
            width: { xs: "100%", sm: 350 }, // Responsive width for drawer
            padding: 2,
            position: "relative",
            height: "100%", // Make drawer fill height
            display: "flex",
            flexDirection: "column",
           }}
          >
           <IconButton
            aria-label="close search drawer"
            onClick={toggleSearchDrawer(false)}
            sx={{ position: "absolute", top: 8, right: 8 }}
           >
            <CloseIcon />
           </IconButton>
           <Typography variant="h6" sx={{ mt: 2, mb: 3 }}>
            Search
           </Typography>
           <SearchDrawer closeDrawer={toggleSearchDrawer(false)} />
          </Box>
         </Drawer>
        </div>

        {/* Account Icon */}
        <div className="t4s-site-nav__icon t4s-site-nav__account t4s-pr t4s-d-none t4s-d-md-inline-block">
         <div
          className="t4s-pr"
          onClick={toggleLoginDrawer(true)}
          style={{ cursor: "pointer" }}
         >
          <Icon icon="account" />
         </div>
         <Drawer
          anchor="right"
          open={isLoginDrawerOpen}
          onClose={toggleLoginDrawer(false)}
          PaperProps={{
           sx: { width: { xs: "100%", sm: 400 } },
          }}
         >
          <Box
           sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
           }}
          >
           <Box
            sx={{
             p: 2,
             display: "flex",
             justifyContent: "space-between",
             alignItems: "center",
             borderBottom: 1,
             borderColor: "divider",
            }}
           >
            <Typography variant="h6">Account</Typography>
            <IconButton
             onClick={toggleLoginDrawer(false)}
             aria-label="close login drawer"
            >
             <CloseIcon />
            </IconButton>
           </Box>
           <Box sx={{ p: 3, flexGrow: 1, overflowY: "auto" }}>
            {/* Assuming LoginSignup handles its own form and state for login/signup */}
            <LoginSignup setRole={setRole} onClose={toggleLoginDrawer(false)} />
           </Box>
          </Box>
         </Drawer>
        </div>

        {/* Wishlist Icon */}
        <div className="t4s-site-nav__icon t4s-site-nav__heart t4s-d-none t4s-d-md-inline-block">
         <Link
          to="/search/?view=wishlist" // Use Link for internal navigation
          data-link-wishlist=""
          className="t4s-pr"
         >
          <Icon icon="heart" />
          <span
           data-count-wishlist=""
           className="t4s-pa t4s-op-0 t4s-ts-op t4s-count-box"
          >
           0
          </span>
         </Link>
        </div>

        {/* Cart Icon */}
        <div className="t4s-site-nav__icon t4s-site-nav__cart">
         <Link
          to="/cart" // Use Link for internal navigation
          data-drawer-options={{ id: "#t4s-mini_cart" }}
         >
          <span className="t4s-pr t4s-icon-cart__wrap">
           <Icon icon="cart" />
           <span
            data-cart-count=""
            className="t4s-pa t4s-op-0 t4s-ts-op t4s-count-box"
           >
            1
           </span>
          </span>
          <span className="t4s-h-cart-totals t4s-dn">
           <span className="t4s-h-cart__divider t4s-dn">/</span>
           <span data-cart-tt-price="" className="t4s-h-cart__total"></span>
          </span>
         </Link>
        </div>
       </div>
      </div>
     </div>
    </div>
    {/*
          Moved inline styles to a <style> tag or a CSS module.
          For a large project, prefer CSS modules or styled-components/emotion for scoped styles.
          Inline styles are harder to manage and override.
        */}
    <style jsx>{`
     .t4s-h-cart__design3 .t4s-count-box {
      width: 19px;
      height: 19px;
      line-height: 19px;
      position: static;
      display: inline-block;
     }
     .t4s-h-cart__design2 .t4s-site-nav__icon:last-child,
     .t4s-h-cart__design3 .t4s-site-nav__icon:last-child,
     .t4s-h-cart__design4 .t4s-site-nav__icon:last-child,
     .t4s-h-cart__design5 .t4s-site-nav__icon:last-child {
      padding-right: 0;
     }
     @media (min-width: 768px) {
      .t4s-h-cart__design2 .t4s-site-nav__cart a,
      .t4s-h-cart__design4 .t4s-site-nav__cart a,
      .t4s-h-cart__design5 .t4s-site-nav__cart a {
       display: flex;
       align-items: center;
       justify-content: center;
      }
      .t4s-h-cart__design2 .t4s-h-cart-totals,
      .t4s-h-cart__design4 .t4s-h-cart-totals {
       display: block;
       margin-left: 15px;
      }
      .t4s-h-cart__design4 .t4s-site-nav__cart .t4s-count-box,
      .t4s-h-cart__design5 .t4s-site-nav__cart .t4s-count-box {
       display: none;
      }
      .t4s-h-cart__design4 .t4s-h-cart-totals {
       margin-left: 7px;
      }
      .t4s-h-cart__design5 .t4s-h-cart__divider {
       display: inline-block;
      }
      .t4s-h-cart__design5 .t4s-h-cart-totals {
       display: block;
       margin-left: 7px;
      }
      .t4s-h-cart__design1 .t4s-site-nav__icon.t4s-site-nav__btnMenu {
       padding-right: 0;
      }
     }

     /* Additional styles for dropdown menus */
     .t4s-menu-item.has--children {
      position: relative;
     }

     .t4s-sub-menu {
      position: absolute;
      min-width: 220px;
      background: #fff;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
      z-index: 99;
      transition: opacity 0.3s, visibility 0.3s;
      opacity: 0; /* Hidden by default */
      visibility: hidden; /* Hidden by default */
      padding: 0;
      list-style: none;
      margin: 0;
     }

     /* Show submenu on hover */
     .t4s-menu-item:hover > .submenu-wrapper .t4s-sub-menu,
     .t4s-menu-item:focus-within > .submenu-wrapper .t4s-sub-menu {
      opacity: 1;
      visibility: visible;
     }

     /* Specific style for the submenu-wrapper */
     .t4s-menu-item .submenu-wrapper {
      display: none; /* Hidden by default */
     }
     .t4s-menu-item:hover > .submenu-wrapper,
     .t4s-menu-item:focus-within > .submenu-wrapper {
      display: block; /* Show wrapper on parent hover/focus */
     }

     .t4s-sub-menu .t4s-menu-item {
      display: block;
      width: 100%;
     }

     .t4s-sub-menu .t4s-menu-item a {
      display: flex;
      padding: 8px 15px;
      justify-content: space-between;
      align-items: center;
      text-decoration: none;
      color: #333;
      background: none;
     }

     .t4s-sub-menu .t4s-menu-item a:hover {
      background-color: #f5f5f5;
     }

     .t4s-sub-menu-2 {
      left: 100%;
      top: 0;
     }

     /* Fix for nested menus */
     .t4s-lazy_menu {
      background: #fff;
      padding: 10px 0;
      min-width: 200px;
     }

     .t4s-lazy_menu .t4s-menu-item {
      position: relative;
     }
    `}</style>
   </div>
  </>
 );
};

export default BlucheezHeader;

//trial one

//import React, { useState, useEffect } from "react";
// import { menuItemsData } from "../Components/Navbar/MenuItemsData";
// import {
//  AppBar,
//  Toolbar,
//  Typography,
//  IconButton,
//  InputBase,
//  Badge,
//  Menu,
//  // MenuItem,
//  Button,
//  Box,
//  Grid,
//  Drawer,
//  Paper,
// } from "@mui/material";
// import { styled, alpha } from "@mui/material/styles";
// import SearchIcon from "@mui/icons-material/Search";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import SearchDrawer from "./SearchDrawer";
// import LoginSignup from "../Pages/LoginSignup"; // Import LoginSignup

// const Search = styled("div")(({ theme }) => ({
//  position: "relative",
//  borderRadius: theme.shape.borderRadius,
//  backgroundColor: alpha(theme.palette.common.white, 0.15),
//  "&:hover": {
//   backgroundColor: alpha(theme.palette.common.white, 0.25),
//  },
//  marginLeft: 0,
//  width: "100%",
//  [theme.breakpoints.up("sm")]: {
//   marginLeft: theme.spacing(1),
//   width: "auto",
//  },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//  padding: theme.spacing(0, 2),
//  height: "100%",
//  position: "absolute",
//  pointerEvents: "none",
//  display: "flex",
//  alignItems: "center",
//  justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//  color: "inherit",
//  "& .MuiInputBase-input": {
//   padding: theme.spacing(1, 1, 1, 0),
//   paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//   transition: theme.transitions.create("width"),
//   width: "100%",
//   [theme.breakpoints.up("md")]: {
//    width: "20ch",
//   },
//  },
// }));

// // SVG Icons component
// const HeaderIcons = () => (
//  <svg xmlns="http://www.w3.org/2000/svg" className="t4s-d-none">
//   <symbol id="icon-h-search" viewBox="0 0 32 32" fill="currentColor">
//    <path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z"></path>
//   </symbol>
//   <symbol id="icon-h-account" viewBox="0 0 32 32" fill="currentColor">
//    <path
//     xmlns="http://www.w3.org/2000/svg"
//     d="M 16 5 C 12.144531 5 9 8.144531 9 12 C 9 14.410156 10.230469 16.550781 12.09375 17.8125 C 8.527344 19.34375 6 22.882813 6 27 L 8 27 C 8 22.570313 11.570313 19 16 19 C 20.429688 19 24 22.570313 24 27 L 26 27 C 26 22.882813 23.472656 19.34375 19.90625 17.8125 C 21.769531 16.550781 23 14.410156 23 12 C 23 8.144531 19.855469 5 16 5 Z M 16 7 C 18.773438 7 21 9.226563 21 12 C 21 14.773438 18.773438 17 16 17 C 13.226563 17 11 14.773438 11 12 C 11 9.226563 13.226563 7 16 7 Z"
//    ></path>
//   </symbol>
//   <symbol id="icon-h-heart" viewBox="0 0 32 32" fill="currentColor">
//    <path
//     xmlns="http://www.w3.org/2000/svg"
//     d="M 9.5 5 C 5.363281 5 2 8.402344 2 12.5 C 2 13.929688 2.648438 15.167969 3.25 16.0625 C 3.851563 16.957031 4.46875 17.53125 4.46875 17.53125 L 15.28125 28.375 L 16 29.09375 L 16.71875 28.375 L 27.53125 17.53125 C 27.53125 17.53125 30 15.355469 30 12.5 C 30 8.402344 26.636719 5 22.5 5 C 19.066406 5 16.855469 7.066406 16 7.9375 C 15.144531 7.066406 12.933594 5 9.5 5 Z M 9.5 7 C 12.488281 7 15.25 9.90625 15.25 9.90625 L 16 10.75 L 16.75 9.90625 C 16.75 9.90625 19.511719 7 22.5 7 C 25.542969 7 28 9.496094 28 12.5 C 28 14.042969 26.125 16.125 26.125 16.125 L 16 26.25 L 5.875 16.125 C 5.875 16.125 5.390625 15.660156 4.90625 14.9375 C 4.421875 14.214844 4 13.273438 4 12.5 C 4 9.496094 6.457031 7 9.5 7 Z"
//    ></path>
//   </symbol>
//   <symbol id="icon-h-cart" viewBox="0 0 32 32" fill="currentColor">
//    <path
//     xmlns="http://www.w3.org/2000/svg"
//     d="M 16 3 C 13.253906 3 11 5.253906 11 8 L 11 9 L 6.0625 9 L 6 9.9375 L 5 27.9375 L 4.9375 29 L 27.0625 29 L 27 27.9375 L 26 9.9375 L 25.9375 9 L 21 9 L 21 8 C 21 5.253906 18.746094 3 16 3 Z M 16 5 C 17.65625 5 19 6.34375 19 8 L 19 9 L 13 9 L 13 8 C 13 6.34375 14.34375 5 16 5 Z M 7.9375 11 L 11 11 L 11 14 L 13 14 L 13 11 L 19 11 L 19 14 L 21 14 L 21 11 L 24.0625 11 L 24.9375 27 L 7.0625 27 Z"
//    ></path>
//   </symbol>
//  </svg>
// );

// // Icon component
// const Icon = ({ icon }) => (
//  <svg
//   className={`t4s-icon t4s-icon--${icon}`}
//   aria-hidden="true"
//   focusable="false"
//   role="presentation"
//  >
//   <use href={`#icon-h-${icon}`}></use>
//  </svg>
// );

// // Arrow icon for submenus
// const ArrowIcon = () => (
//  <svg
//   xmlns="http://www.w3.org/2000/svg"
//   viewBox="0 0 256 512"
//   width="7"
//   fill="currentColor"
//  >
//   <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"></path>
//  </svg>
// );

// // Recursive SubMenu component
// const SubMenu = ({ items }) => {
//  return (
//   <ul className="t4s-sub-menu t4s-sub-menu-2 pa op__0">
//    {items.map((item, index) => (
//     <li
//      key={index}
//      className={`t4s-menu-item ${item.children ? "has--children" : ""}`}
//     >
//      {item.children ? (
//       <>
//        <a href={item.link || item.href || "#"}>
//         <span>{item.text || item.title || item.name}</span>
//         <ArrowIcon />
//        </a>
//        <SubMenu items={item.children} />
//       </>
//      ) : (
//       <a href={item.link || item.href || "#"}>
//        {item.text || item.title || item.name}
//       </a>
//      )}
//     </li>
//    ))}
//   </ul>
//  );
// };

// // Menu Item component
// const MenuItem = ({ item }) => {
//  const [isOpen, setIsOpen] = useState(false);

//  const handleMouseEnter = () => {
//   if (item.children || (item.submenu && item.submenu.length)) {
//    setIsOpen(true);
//   }
//  };

//  const handleMouseLeave = () => {
//   if (item.children || (item.submenu && item.submenu.length)) {
//    setIsOpen(false);
//   }
//  };

//  // Determine children based on item structure
//  const childItems = item.children || item.submenu || [];
//  const hasChildren = childItems && childItems.length > 0;

//  // Determine item properties based on which data structure is used
//  const text = item.text || item.title || "";
//  const link = item.link || item.href || "#";
//  const image = item.image || item.logo || null;
//  const imageAlt = item.imageAlt || item.alt || "";
//  const label = item.label || item.tag || "";
//  const labelColor = item.labelColor || item.tagColor || "#CE3241";

//  return (
//   <li
//    id={item.id || `item_${text.toLowerCase().replace(/\s+/g, "_")}`}
//    className={`${item.type || "t4s-type__drop"} t4s-menu-item ${
//     hasChildren ? "has--children" : ""
//    } ${item.extraClasses || ""}`}
//    onMouseEnter={handleMouseEnter}
//    onMouseLeave={handleMouseLeave}
//    data-placement={item.placement || "bottom"}
//   >
//    <a
//     className="t4s-lh-1 t4s-d-flex t4s-align-items-center t4s-pr"
//     href={link}
//     target={item.target || "_self"}
//     rel={item.target === "_blank" ? "noopener" : ""}
//    >
//     {image ? (
//      <img
//       style={{ height: item.imageHeight || "1.6rem" }}
//       src={image}
//       alt={imageAlt}
//      />
//     ) : (
//      text
//     )}
//     {label && (
//      <span
//       className="t4s_lb_nav t4s-pa t4s-op-0"
//       style={{
//        backgroundColor: item.labelBg || "rgba(0,0,0,0)",
//        color: "#fff",
//       }}
//      >
//       <span style={{ color: labelColor }}>{label}</span>
//      </span>
//     )}
//    </a>

//    {hasChildren && isOpen && (
//     <div
//      id={`content_${
//       item.id || `item_${text.toLowerCase().replace(/\s+/g, "_")}`
//      }`}
//      className="t4s-sub-menu t4s-pa t4s-op-0 t4s-pe-none"
//      style={{ left: item.left || "0", top: "100%" }}
//     >
//      <div className="t4s-lazy_menu" data-handle={item.handle}>
//       <link
//        rel="stylesheet"
//        href="//blucheez.fashion/cdn/shop/t/142/assets/t4s-submenu.css?v=177196850476384233671728726942"
//        media="all"
//       />

//       {(item.viewAll ||
//        (childItems[0] && childItems[0].title === "View All")) && (
//        <div className="t4s-menu-item">
//         <a
//          href={
//           item.viewAllLink || item.link || (childItems[0] && childItems[0].href)
//          }
//         >
//          View All
//         </a>
//        </div>
//       )}

//       {childItems.map((child, idx) => {
//        // Skip the "View All" item if it's the first one since we already rendered it
//        if (idx === 0 && child.title === "View All") return null;

//        return (
//         <div
//          key={idx}
//          className={`t4s-menu-item ${child.children ? "has--children" : ""}`}
//         >
//          {child.children ? (
//           <div>
//            <a href={child.link || child.href || "#"}>
//             <span>{child.text || child.title || child.name}</span>
//             <ArrowIcon />
//            </a>
//            <SubMenu items={child.children} />
//           </>
//          ) : (
//           <a href={child.link || child.href || "#"}>
//            {child.text || child.title || child.name}
//           </a>
//          )}
//         </div>
//        );
//       })}
//      </div>
//     </div>
//    )}
//   </li>
//  );
// };

// // Convert menuItemsData to the format used by original MenuItems
// const convertMenuData = (items) => {
//  return items.map((item) => {
//   const newItem = {
//    id: `item_${item.title.toLowerCase().replace(/\s+/g, "_")}`,
//    type: "t4s-type__drop",
//    text: item.title,
//    link: item.href || "#",
//    placement: "bottom",
//    extraClasses: "menu-has__offsets menu-pos__left",
//    handle: item.title.toLowerCase().replace(/\s+/g, "-"),
//    viewAll:
//     item.children && item.children[0] && item.children[0].title === "View All",
//   };

//   if (item.logo) {
//    newItem.image = item.logo;
//    newItem.imageAlt = item.alt || "";
//   }

//   if (item.tag) {
//    newItem.label = item.tag;
//   }

//   if (item.children) {
//    newItem.children = item.children;
//   } else if (item.submenu) {
//    newItem.children = item.submenu.map((subItem) => ({
//     text: subItem.name,
//     link: subItem.path,
//    }));
//   }

//   return newItem;
//  });
// };

// // Main header component
// const BlucheezHeader = ({ setRole }) => {
//  // Define main menu items - use either the original menuItems or the converted menuItemsData
//  const menuItems = convertMenuData(menuItemsData);

//  // State for the search drawer
//  const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false);
//  // State for the account drawer (LoginSignup)
//  const [isAccountDrawerOpen, setIsAccountDrawerOpen] = useState(false);

//  // Function to toggle the search drawer
//  const toggleSearchDrawer = (open) => () => {
//   setIsSearchDrawerOpen(open);
//  };

//  // Function to toggle the account drawer
//  const toggleAccountDrawer = (open) => () => {
//   setIsAccountDrawerOpen(open);
//  };

//  return (
//   <div
//    className="t4s-header__wrapper t4s-pr t4s-header-layout_logo_left"
//    data-header-options={{
//     isTransparent: false,
//     isSticky: true,
//     hideScroldown: true,
//    }}
//   >
//    <div className="t4s-container">
//     <div
//      className="t4s-row t4s-gx-15 t4s-gx-md-30 t4s-align-items-center"
//      data-header-height=""
//     >
//      {/* Mobile Menu Button */}
//      <div className="t4s-col-md-4 t4s-col-3 t4s-d-lg-none t4s-col-item">
//       <a
//        href="/"
//        data-menu-drawer=""
//        data-drawer-options={{ id: "#t4s-menu-drawer" }}
//        className="t4s-push-menu-btn t4s-lh-1 t4s-d-flex t4s-align-items-center"
//       >
//        <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="30"
//         height="16"
//         viewBox="0 0 30 16"
//         fill="currentColor"
//        >
//         <rect width="30" height="1.5"></rect>
//         <rect y="7" width="20" height="1.5"></rect>
//         <rect y="14" width="30" height="1.5"></rect>
//        </svg>
//       </a>
//      </div>

//      {/* Logo */}
//      <div className="t4s-col-lg-2 t4s-col-md-4 t4s-col-6 t4s-text-center t4s-text-lg-start t4s-col-item">
//       <div className="t4s-header__logo t4s-lh-1">
//        <a className="t4s-d-inline-block" href="/">
//         <img
//          loading="eager"
//          srcSet="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=110, //blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=220 2x"
//          src="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=110"
//          className="header__normal-logo t4s-d-none t4s-d-lg-block"
//          width="110"
//          height="38"
//          alt="Blucheez"
//          style={{ width: "110px" }}
//         />
//         <img
//          loading="lazy"
//          srcSet="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=95, //blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=190 2x"
//          src="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=95"
//          className="header__sticky-logo t4s-d-none t4s-d-none"
//          width="95"
//          height="33"
//          alt="Blucheez"
//          style={{ width: "95px" }}
//         />
//         <img
//          loading="eager"
//          srcSet="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=100, //blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=200 2x"
//          src="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=100"
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
//        <ul
//         id="t4s-nav-ul"
//         className="t4s-nav__ul t4s-d-inline-flex t4s-flex-wrap t4s-align-items-center"
//         data-menu-nav=""
//        >
//         {menuItems.map((item, index) => (
//          <MenuItem key={index} item={item} />
//         ))}
//        </ul>
//       </nav>
//      </div>

//      {/* Icons Section */}
//      <div className="t4s-col-lg-auto t4s-col-md-4 t4s-col-3 t4s-text-end t4s-col-group_btns t4s-col-item t4s-lh-1">
//       <HeaderIcons />
//       <div className="t4s-site-nav__icons t4s-use__line is--hover2 t4s-h-cart__design1 t4s-lh-1 t4s-d-inline-flex t4s-align-items-center">
//        {/* Search Icon */}
//        <div className="t4s-site-nav__icon t4s-site-nav__search">
//         <Search
//          onClick={toggleSearchDrawer(true)}
//          style={{ cursor: "pointer" }}
//         >
//          <SearchIconWrapper>
//           <SearchIcon />
//          </SearchIconWrapper>
//          <StyledInputBase
//           placeholder="Search…"
//           inputProps={{ "aria-label": "search" }}
//          />
//         </Search>

//         <Drawer
//          anchor="right"
//          open={isSearchDrawerOpen}
//          onClose={toggleSearchDrawer(false)}
//         >
//          <SearchDrawer closeDrawer={toggleSearchDrawer(false)} />
//         </Drawer>
//        </div>

//        {/* Account Icon */}
//        <div className="t4s-site-nav__icon t4s-site-nav__account t4s-pr t4s-d-none t4s-d-md-inline-block">
//         <div
//          className="t4s-pr"
//          onClick={toggleAccountDrawer(true)}
//          style={{ cursor: "pointer" }}
//         >
//          <Icon icon="account" />
//         </div>
//         <Drawer
//          anchor="right"
//          open={isAccountDrawerOpen}
//          onClose={toggleAccountDrawer(false)}
//         >
//          <div style={{ width: 350, padding: 16 }}>
//           <LoginSignup setRole={setRole} />
//          </div>
//         </Drawer>
//        </div>

//        {/* Wishlist Icon */}
//        <div className="t4s-site-nav__icon t4s-site-nav__heart t4s-d-none t4s-d-md-inline-block">
//         <a
//          data-link-wishlist=""
//          className="t4s-pr"
//          href="/search/?view=wishlist"
//         >
//          <Icon icon="heart" />
//          <span
//           data-count-wishlist=""
//           className="t4s-pa t4s-op-0 t4s-ts-op t4s-count-box"
//          >
//           0
//          </span>
//         </a>
//        </div>

//        {/* Cart Icon */}
//        <div className="t4s-site-nav__icon t4s-site-nav__cart">
//         <a href="/cart" data-drawer-options={{ id: "#t4s-mini_cart" }}>
//          <span className="t4s-pr t4s-icon-cart__wrap">
//           <Icon icon="cart" />
//           <span
//            data-cart-count=""
//            className="t4s-pa t4s-op-0 t4s-ts-op t4s-count-box"
//           >
//            1
//           </span>
//          </span>
//          <span className="t4s-h-cart-totals t4s-dn">
//           <span className="t4s-h-cart__divider t4s-dn">/</span>
//           <span data-cart-tt-price="" className="t4s-h-cart__total">
//            <span className="money">Tk 750.00</span>
//           </span>
//          </span>
//         </a>
//        </div>
//       </div>

//       {/* Header Cart Styles */}
//       <style>
//        {`
//                   .t4s-h-cart__design3 .t4s-count-box {
//                     width: 19px;
//                     height: 19px;
//                     line-height: 19px;
//                     position: static;
//                     display: inline-block;
//                   }
//                   .t4s-h-cart__design2 .t4s-site-nav__icon:last-child,
//                   .t4s-h-cart__design3 .t4s-site-nav__icon:last-child,
//                   .t4s-h-cart__design4 .t4s-site-nav__icon:last-child,
//                   .t4s-h-cart__design5 .t4s-site-nav__icon:last-child {
//                     padding-right: 0;
//                   }
//                   @media (min-width: 768px) {
//                     .t4s-h-cart__design2 .t4s-site-nav__cart a,
//                     .t4s-h-cart__design4 .t4s-site-nav__cart a,
//                     .t4s-h-cart__design5 .t4s-site-nav__cart a {
//                       display: flex;
//                       align-items: center;
//                       justify-content: center;
//                     }
//                     .t4s-h-cart__design2 .t4s-h-cart-totals,
//                     .t4s-h-cart__design4 .t4s-h-cart-totals {
//                       display: block;
//                       margin-left: 15px;
//                     }
//                     .t4s-h-cart__design4 .t4s-site-nav__cart .t4s-count-box,
//                     .t4s-h-cart__design5 .t4s-site-nav__cart .t4s-count-box {
//                       display: none
//                     }
//                     .t4s-h-cart__design4 .t4s-h-cart-totals {
//                       margin-left: 7px;
//                     }
//                     .t4s-h-cart__design5 .t4s-h-cart__divider {
//                       display: inline-block;
//                     }
//                     .t4s-h-cart__design5 .t4s-h-cart-totals {
//                       display: block;
//                       margin-left: 7px;
//                     }
//                     .t4s-h-cart__design1 .t4s-site-nav__icon.t4s-site-nav__btnMenu {
//                       padding-right: 0;
//                     }
//                   }

//                   /* Additional styles for dropdown menus */
//                   .t4s-menu-item.has--children {
//                     position: relative;
//                   }

//                   .t4s-sub-menu {
//                     position: absolute;
//                     min-width: 200px;
//                     background: #fff;
//                     box-shadow: 0 1px 5px rgba(0,0,0,0.1);
//                     z-index: 99;
//                     transition: opacity 0.3s, visibility 0.3s;
//                     opacity: 0;
//                     visibility: hidden;
//                   }

//                   .t4s-menu-item:hover > .t4s-sub-menu {
//                     opacity: 1 !important;
//                     visibility: visible !important;
//                     pointer-events: auto !important;
//                   }

//                   .t4s-sub-menu .t4s-menu-item {
//                     display: block;
//                     width: 100%;
//                   }

//                   .t4s-sub-menu .t4s-menu-item a {
//                     display: flex;
//                     padding: 8px 15px;
//                     justify-content: space-between;
//                     align-items: center;
//                     text-decoration: none;
//                     color: #333;
//                   }

//                   .t4s-sub-menu .t4s-menu-item a:hover {
//                     background-color: #f5f5f5;
//                   }
//                   .t4s-sub-menu-2 {
//                     left: 100%;
//                     top: 0;
//                   }

//                   /* Fix for nested menus */
//                   .t4s-lazy_menu {
//                     background: #fff;
//                     padding: 10px 0;
//                     min-width: 200px;
//                   }

//                   .t4s-lazy_menu .t4s-menu-item {
//                     position: relative;
//                   }
//                 `}
//       </style>
//      </div>
//     </div>
//    </div>
//   </div>
//  );
// };

// export default BlucheezHeader;

// import React, { useState, useEffect } from "react";
// import { menuItemsData } from "../Components/Navbar/MenuItemsData";

// import {
//  AppBar,
//  Toolbar,
//  Typography,
//  IconButton,
//  InputBase,
//  Badge,
//  Menu,
//  //  MenuItem,
//  Button,
//  Box,
//  Grid,
//  Drawer,
//  Paper,
// } from "@mui/material";
// import { styled, alpha } from "@mui/material/styles";
// import SearchIcon from "@mui/icons-material/Search";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import SearchDrawer from "./SearchDrawer";
// import LoginSignup from "../Pages/LoginSignup"; // Import LoginSignup
// const Search = styled("div")(({ theme }) => ({
//  position: "relative",
//  borderRadius: theme.shape.borderRadius,
//  backgroundColor: alpha(theme.palette.common.white, 0.15),
//  "&:hover": {
//   backgroundColor: alpha(theme.palette.common.white, 0.25),
//  },
//  marginLeft: 0,
//  width: "100%",
//  [theme.breakpoints.up("sm")]: {
//   marginLeft: theme.spacing(1),
//   width: "auto",
//  },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//  padding: theme.spacing(0, 2),
//  height: "100%",
//  position: "absolute",
//  pointerEvents: "none",
//  display: "flex",
//  alignItems: "center",
//  justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//  color: "inherit",
//  "& .MuiInputBase-input": {
//   padding: theme.spacing(1, 1, 1, 0),
//   paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//   transition: theme.transitions.create("width"),
//   width: "100%",
//   [theme.breakpoints.up("md")]: {
//    width: "20ch",
//   },
//  },
// }));

// const categories = [
//  "NEW IN",
//  "SUMMER",
//  "BLACK",
//  "Belwari",
//  "MEN",
//  "WOMEN",
//  "ACCESSORIES",
// ];
// // SVG Icons component
// const HeaderIcons = () => (
//  <svg xmlns="http://www.w3.org/2000/svg" className="t4s-d-none">
//   <symbol id="icon-h-search" viewBox="0 0 32 32" fill="currentColor">
//    <path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z"></path>
//   </symbol>
//   <symbol id="icon-h-account" viewBox="0 0 32 32" fill="currentColor">
//    <path
//     xmlns="http://www.w3.org/2000/svg"
//     d="M 16 5 C 12.144531 5 9 8.144531 9 12 C 9 14.410156 10.230469 16.550781 12.09375 17.8125 C 8.527344 19.34375 6 22.882813 6 27 L 8 27 C 8 22.570313 11.570313 19 16 19 C 20.429688 19 24 22.570313 24 27 L 26 27 C 26 22.882813 23.472656 19.34375 19.90625 17.8125 C 21.769531 16.550781 23 14.410156 23 12 C 23 8.144531 19.855469 5 16 5 Z M 16 7 C 18.773438 7 21 9.226563 21 12 C 21 14.773438 18.773438 17 16 17 C 13.226563 17 11 14.773438 11 12 C 11 9.226563 13.226563 7 16 7 Z"
//    ></path>
//   </symbol>
//   <symbol id="icon-h-heart" viewBox="0 0 32 32" fill="currentColor">
//    <path
//     xmlns="http://www.w3.org/2000/svg"
//     d="M 9.5 5 C 5.363281 5 2 8.402344 2 12.5 C 2 13.929688 2.648438 15.167969 3.25 16.0625 C 3.851563 16.957031 4.46875 17.53125 4.46875 17.53125 L 15.28125 28.375 L 16 29.09375 L 16.71875 28.375 L 27.53125 17.53125 C 27.53125 17.53125 30 15.355469 30 12.5 C 30 8.402344 26.636719 5 22.5 5 C 19.066406 5 16.855469 7.066406 16 7.9375 C 15.144531 7.066406 12.933594 5 9.5 5 Z M 9.5 7 C 12.488281 7 15.25 9.90625 15.25 9.90625 L 16 10.75 L 16.75 9.90625 C 16.75 9.90625 19.511719 7 22.5 7 C 25.542969 7 28 9.496094 28 12.5 C 28 14.042969 26.125 16.125 26.125 16.125 L 16 26.25 L 5.875 16.125 C 5.875 16.125 5.390625 15.660156 4.90625 14.9375 C 4.421875 14.214844 4 13.273438 4 12.5 C 4 9.496094 6.457031 7 9.5 7 Z"
//    ></path>
//   </symbol>
//   <symbol id="icon-h-cart" viewBox="0 0 32 32" fill="currentColor">
//    <path
//     xmlns="http://www.w3.org/2000/svg"
//     d="M 16 3 C 13.253906 3 11 5.253906 11 8 L 11 9 L 6.0625 9 L 6 9.9375 L 5 27.9375 L 4.9375 29 L 27.0625 29 L 27 27.9375 L 26 9.9375 L 25.9375 9 L 21 9 L 21 8 C 21 5.253906 18.746094 3 16 3 Z M 16 5 C 17.65625 5 19 6.34375 19 8 L 19 9 L 13 9 L 13 8 C 13 6.34375 14.34375 5 16 5 Z M 7.9375 11 L 11 11 L 11 14 L 13 14 L 13 11 L 19 11 L 19 14 L 21 14 L 21 11 L 24.0625 11 L 24.9375 27 L 7.0625 27 Z"
//    ></path>
//   </symbol>
//  </svg>
// );

// // Icon component
// const Icon = ({ icon }) => (
//  <svg
//   className={`t4s-icon t4s-icon--${icon}`}
//   aria-hidden="true"
//   focusable="false"
//   role="presentation"
//  >
//   <use href={`#icon-h-${icon}`}></use>
//  </svg>
// );

// // Arrow icon for submenus
// const ArrowIcon = () => (
//  <svg
//   xmlns="http://www.w3.org/2000/svg"
//   viewBox="0 0 256 512"
//   width="7"
//   fill="currentColor"
//  >
//   <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"></path>
//  </svg>
// );

// // Recursive SubMenu component
// const SubMenu = ({ items }) => {
//  return (
//   <ul className="t4s-sub-menu t4s-sub-menu-2 pa op__0">
//    {items.map((item, index) => (
//     <li
//      key={index}
//      className={`t4s-menu-item ${item.children ? "has--children" : ""}`}
//     >
//      {item.children ? (
//       <>
//        <a href={item.link || item.href || "#"}>
//         <span>{item.text || item.title || item.name}</span>
//         <ArrowIcon />
//        </a>
//        <SubMenu items={item.children} />
//       </>
//      ) : (
//       <a href={item.link || item.href || "#"}>
//        {item.text || item.title || item.name}
//       </a>
//      )}
//     </li>
//    ))}
//   </ul>
//  );
// };

// // Menu Item component
// const MenuItem = ({ item }) => {
//  const [isOpen, setIsOpen] = useState(false);

//  const handleMouseEnter = () => {
//   if (item.children || (item.submenu && item.submenu.length)) {
//    setIsOpen(true);
//   }
//  };

//  const handleMouseLeave = () => {
//   if (item.children || (item.submenu && item.submenu.length)) {
//    setIsOpen(false);
//   }
//  };

//  // Determine children based on item structure
//  const childItems = item.children || item.submenu || [];
//  const hasChildren = childItems && childItems.length > 0;

//  // Determine item properties based on which data structure is used
//  const text = item.text || item.title || "";
//  const link = item.link || item.href || "#";
//  const image = item.image || item.logo || null;
//  const imageAlt = item.imageAlt || item.alt || "";
//  const label = item.label || item.tag || "";
//  const labelColor = item.labelColor || item.tagColor || "#CE3241";

//  return (
//   <li
//    id={item.id || `item_${text.toLowerCase().replace(/\s+/g, "_")}`}
//    className={`${item.type || "t4s-type__drop"} t4s-menu-item ${
//     hasChildren ? "has--children" : ""
//    } ${item.extraClasses || ""}`}
//    onMouseEnter={handleMouseEnter}
//    onMouseLeave={handleMouseLeave}
//    data-placement={item.placement || "bottom"}
//   >
//    <a
//     className="t4s-lh-1 t4s-d-flex t4s-align-items-center t4s-pr"
//     href={link}
//     target={item.target || "_self"}
//     rel={item.target === "_blank" ? "noopener" : ""}
//    >
//     {image ? (
//      <img
//       style={{ height: item.imageHeight || "1.6rem" }}
//       src={image}
//       alt={imageAlt}
//      />
//     ) : (
//      text
//     )}
//     {label && (
//      <span
//       className="t4s_lb_nav t4s-pa t4s-op-0"
//       style={{
//        backgroundColor: item.labelBg || "rgba(0,0,0,0)",
//        color: "#fff",
//       }}
//      >
//       <span style={{ color: labelColor }}>{label}</span>
//      </span>
//     )}
//    </a>

//    {hasChildren && isOpen && (
//     <div
//      id={`content_${
//       item.id || `item_${text.toLowerCase().replace(/\s+/g, "_")}`
//      }`}
//      className="t4s-sub-menu t4s-pa t4s-op-0 t4s-pe-none"
//      style={{ left: item.left || "0", top: "100%" }}
//     >
//      <div className="t4s-lazy_menu" data-handle={item.handle}>
//       <link
//        rel="stylesheet"
//        href="//blucheez.fashion/cdn/shop/t/142/assets/t4s-submenu.css?v=177196850476384233671728726942"
//        media="all"
//       />

//       {(item.viewAll ||
//        (childItems[0] && childItems[0].title === "View All")) && (
//        <div className="t4s-menu-item">
//         <a
//          href={
//           item.viewAllLink || item.link || (childItems[0] && childItems[0].href)
//          }
//         >
//          View All
//         </a>
//        </div>
//       )}

//       {childItems.map((child, idx) => {
//        // Skip the "View All" item if it's the first one since we already rendered it
//        if (idx === 0 && child.title === "View All") return null;

//        return (
//         <div
//          key={idx}
//          className={`t4s-menu-item ${child.children ? "has--children" : ""}`}
//         >
//          {child.children ? (
//           <>
//            <a href={child.link || child.href || "#"}>
//             <span>{child.text || child.title || child.name}</span>
//             <ArrowIcon />
//            </a>
//            <SubMenu items={child.children} />
//           </>
//          ) : (
//           <a href={child.link || child.href || "#"}>
//            {child.text || child.title || child.name}
//           </a>
//          )}
//         </div>
//        );
//       })}
//      </div>
//     </div>
//    )}
//   </li>
//  );
// };

// // Convert menuItemsData to the format used by original MenuItems
// const convertMenuData = (items) => {
//  return items.map((item) => {
//   const newItem = {
//    id: `item_${item.title.toLowerCase().replace(/\s+/g, "_")}`,
//    type: "t4s-type__drop",
//    text: item.title,
//    link: item.href || "#",
//    placement: "bottom",
//    extraClasses: "menu-has__offsets menu-pos__left",
//    handle: item.title.toLowerCase().replace(/\s+/g, "-"),
//    viewAll:
//     item.children && item.children[0] && item.children[0].title === "View All",
//   };

//   if (item.logo) {
//    newItem.image = item.logo;
//    newItem.imageAlt = item.alt || "";
//   }

//   if (item.tag) {
//    newItem.label = item.tag;
//   }

//   if (item.children) {
//    newItem.children = item.children;
//   } else if (item.submenu) {
//    newItem.children = item.submenu.map((subItem) => ({
//     text: subItem.name,
//     link: subItem.path,
//    }));
//   }

//   return newItem;
//  });
// };

// // Main header component
// const BlucheezHeader = () => {
//  // Define main menu items - use either the original menuItems or the converted menuItemsData
//  const menuItems = convertMenuData(menuItemsData);

//  // State for the search drawer
//  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

//  // Function to toggle the search drawer
//  const toggleDrawer = (open) => () => {
//   setIsDrawerOpen(open);
//  };

//  return (
//   <div
//    className="t4s-header__wrapper t4s-pr t4s-header-layout_logo_left"
//    data-header-options={{
//     isTransparent: false,
//     isSticky: true,
//     hideScroldown: true,
//    }}
//   >
//    <div className="t4s-container">
//     <div
//      className="t4s-row t4s-gx-15 t4s-gx-md-30 t4s-align-items-center"
//      data-header-height=""
//     >
//      {/* Mobile Menu Button */}
//      <div className="t4s-col-md-4 t4s-col-3 t4s-d-lg-none t4s-col-item">
//       <a
//        href="/"
//        data-menu-drawer=""
//        data-drawer-options={{ id: "#t4s-menu-drawer" }}
//        className="t4s-push-menu-btn t4s-lh-1 t4s-d-flex t4s-align-items-center"
//       >
//        <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="30"
//         height="16"
//         viewBox="0 0 30 16"
//         fill="currentColor"
//        >
//         <rect width="30" height="1.5"></rect>
//         <rect y="7" width="20" height="1.5"></rect>
//         <rect y="14" width="30" height="1.5"></rect>
//        </svg>
//       </a>
//      </div>

//      {/* Logo */}
//      <div className="t4s-col-lg-2 t4s-col-md-4 t4s-col-6 t4s-text-center t4s-text-lg-start t4s-col-item">
//       <div className="t4s-header__logo t4s-lh-1">
//        <a className="t4s-d-inline-block" href="/">
//         <img
//          loading="eager"
//          srcSet="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=110, //blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=220 2x"
//          src="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=110"
//          className="header__normal-logo t4s-d-none t4s-d-lg-block"
//          width="110"
//          height="38"
//          alt="Blucheez"
//          style={{ width: "110px" }}
//         />
//         <img
//          loading="lazy"
//          srcSet="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=95, //blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=190 2x"
//          src="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=95"
//          className="header__sticky-logo t4s-d-none t4s-d-none"
//          width="95"
//          height="33"
//          alt="Blucheez"
//          style={{ width: "95px" }}
//         />
//         <img
//          loading="eager"
//          srcSet="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=100, //blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=200 2x"
//          src="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=100"
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
//        <ul
//         id="t4s-nav-ul"
//         className="t4s-nav__ul t4s-d-inline-flex t4s-flex-wrap t4s-align-items-center"
//         data-menu-nav=""
//        >
//         {menuItems.map((item, index) => (
//          <MenuItem key={index} item={item} />
//         ))}
//        </ul>
//       </nav>
//      </div>

//      {/* Icons Section */}
//      <div className="t4s-col-lg-auto t4s-col-md-4 t4s-col-3 t4s-text-end t4s-col-group_btns t4s-col-item t4s-lh-1">
//       <HeaderIcons />
//       <div className="t4s-site-nav__icons t4s-use__line is--hover2 t4s-h-cart__design1 t4s-lh-1 t4s-d-inline-flex t4s-align-items-center">
//        {/* Search Icon */}
//        <div className="t4s-site-nav__icon t4s-site-nav__search">
//         <Search onClick={toggleDrawer(true)} style={{ cursor: "pointer" }}>
//          <SearchIconWrapper>
//           <SearchIcon />
//          </SearchIconWrapper>
//          <StyledInputBase
//           placeholder="Search…"
//           inputProps={{ "aria-label": "search" }}
//          />
//         </Search>

//         <Drawer
//          anchor="right"
//          open={isDrawerOpen}
//          onClose={toggleDrawer(false)}
//         >
//          <SearchDrawer closeDrawer={toggleDrawer(false)} />
//         </Drawer>
//        </div>

//        {/* Account Icon */}
//        <div className="t4s-site-nav__icon t4s-site-nav__account t4s-pr t4s-d-none t4s-d-md-inline-block">
//         <div
//          className="t4s-pr"
//          onClick={toggleAccountDrawer(true)}
//          style={{ cursor: "pointer" }}
//         >
//          <Icon icon="account" />
//         </div>
//         <Drawer
//          anchor="right"
//          open={isAccountDrawerOpen}
//          onClose={toggleAccountDrawer(false)}
//         >
//          <div style={{ width: 350, padding: 16 }}>
//           <LoginSignup setRole={setRole} />
//          </div>
//         </Drawer>
//        </div>

//        {/* Wishlist Icon */}
//        <div className="t4s-site-nav__icon t4s-site-nav__heart t4s-d-none t4s-d-md-inline-block">
//         <a
//          data-link-wishlist=""
//          className="t4s-pr"
//          href="/search/?view=wishlist"
//         >
//          <Icon icon="heart" />
//          <span
//           data-count-wishlist=""
//           className="t4s-pa t4s-op-0 t4s-ts-op t4s-count-box"
//          >
//           0
//          </span>
//         </a>
//        </div>

//        {/* Cart Icon */}
//        <div className="t4s-site-nav__icon t4s-site-nav__cart">
//         <a href="/cart" data-drawer-options={{ id: "#t4s-mini_cart" }}>
//          <span className="t4s-pr t4s-icon-cart__wrap">
//           <Icon icon="cart" />
//           <span
//            data-cart-count=""
//            className="t4s-pa t4s-op-0 t4s-ts-op t4s-count-box"
//           >
//            1
//           </span>
//          </span>
//          <span className="t4s-h-cart-totals t4s-dn">
//           <span className="t4s-h-cart__divider t4s-dn">/</span>
//           <span data-cart-tt-price="" className="t4s-h-cart__total">
//            <span className="money">Tk 750.00</span>
//           </span>
//          </span>
//         </a>
//        </div>
//       </div>

//       {/* Header Cart Styles */}
//       <style>
//        {`
//                  .t4s-h-cart__design3 .t4s-count-box {
//                     width: 19px;
//                     height: 19px;
//                     line-height: 19px;
//                     position: static;
//                     display: inline-block;
//                  }
//                  .t4s-h-cart__design2 .t4s-site-nav__icon:last-child,
//                  .t4s-h-cart__design3 .t4s-site-nav__icon:last-child,
//                  .t4s-h-cart__design4 .t4s-site-nav__icon:last-child,
//                  .t4s-h-cart__design5 .t4s-site-nav__icon:last-child {
//                     padding-right: 0;
//                  }
//                  @media (min-width: 768px) {
//                     .t4s-h-cart__design2 .t4s-site-nav__cart a,
//                     .t4s-h-cart__design4 .t4s-site-nav__cart a,
//                     .t4s-h-cart__design5 .t4s-site-nav__cart a {
//                       display: flex;
//                       align-items: center;
//                       justify-content: center;
//                     }
//                     .t4s-h-cart__design2 .t4s-h-cart-totals,
//                     .t4s-h-cart__design4 .t4s-h-cart-totals {
//                       display: block;
//                       margin-left: 15px;
//                     }
//                     .t4s-h-cart__design4 .t4s-site-nav__cart .t4s-count-box,
//                     .t4s-h-cart__design5 .t4s-site-nav__cart .t4s-count-box {
//                       display: none
//                     }
//                     .t4s-h-cart__design4 .t4s-h-cart-totals {
//                       margin-left: 7px;
//                     }
//                     .t4s-h-cart__design5 .t4s-h-cart__divider {
//                       display: inline-block;
//                     }
//                     .t4s-h-cart__design5 .t4s-h-cart-totals {
//                       display: block;
//                       margin-left: 7px;
//                     }
//                     .t4s-h-cart__design1 .t4s-site-nav__icon.t4s-site-nav__btnMenu {
//                       padding-right: 0;
//                     }
//                  }

//                  /* Additional styles for dropdown menus */
//                  .t4s-menu-item.has--children {
//                     position: relative;
//                  }

//                  .t4s-sub-menu {
//                     position: absolute;
//                     min-width: 200px;
//                     background: #fff;
//                     box-shadow: 0 1px 5px rgba(0,0,0,0.1);
//                     z-index: 99;
//                     transition: opacity 0.3s, visibility 0.3s;
//                     opacity: 0;
//                     visibility: hidden;
//                  }

//                  .t4s-menu-item:hover > .t4s-sub-menu {
//                     opacity: 1 !important;
//                     visibility: visible !important;
//                     pointer-events: auto !important;
//                  }

//                  .t4s-sub-menu .t4s-menu-item {
//                     display: block;
//                     width: 100%;
//                  }

//                  .t4s-sub-menu .t4s-menu-item a {
//                     display: flex;
//                     padding: 8px 15px;
//                     justify-content: space-between;
//                     align-items: center;
//                     text-decoration: none;
//                     color: #333;
//                  }

//                  .t4s-sub-menu .t4s-menu-item a:hover {
//                     background-color: #f5f5f5;
//                  }

//                  .t4s-sub-menu-2 {
//                     left: 100%;
//                     top: 0;
//                  }

//                  /* Fix for nested menus */
//                  .t4s-lazy_menu {
//                     background: #fff;
//                     padding: 10px 0;
//                     min-width: 200px;
//                  }

//                  .t4s-lazy_menu .t4s-menu-item {
//                     position: relative;
//                  }
//               `}
//       </style>
//      </div>
//     </div>
//    </div>
//   </div>
//  );
// };

// export default BlucheezHeader;

// import React, { useState } from "react";
// import { menuItemsData } from "../Components/Navbar/MenuItemsData";

// import {
//  AppBar,
//  Toolbar,
//  Typography,
//  IconButton,
//  InputBase,
//  Badge,
//  Menu,
//  //  MenuItem,
//  Button,
//  Box,
//  Grid,
//  Paper,
// } from "@mui/material";
// import { styled, alpha } from "@mui/material/styles";
// import SearchIcon from "@mui/icons-material/Search";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import SearchDrawer from "./SearchDrawer";
// const Search = styled("div")(({ theme }) => ({
//  position: "relative",
//  borderRadius: theme.shape.borderRadius,
//  backgroundColor: alpha(theme.palette.common.white, 0.15),
//  "&:hover": {
//   backgroundColor: alpha(theme.palette.common.white, 0.25),
//  },
//  marginLeft: 0,
//  width: "100%",
//  [theme.breakpoints.up("sm")]: {
//   marginLeft: theme.spacing(1),
//   width: "auto",
//  },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//  padding: theme.spacing(0, 2),
//  height: "100%",
//  position: "absolute",
//  pointerEvents: "none",
//  display: "flex",
//  alignItems: "center",
//  justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//  color: "inherit",
//  "& .MuiInputBase-input": {
//   padding: theme.spacing(1, 1, 1, 0),
//   paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//   transition: theme.transitions.create("width"),
//   width: "100%",
//   [theme.breakpoints.up("md")]: {
//    width: "20ch",
//   },
//  },
// }));

// const categories = [
//  "NEW IN",
//  "SUMMER",
//  "BLACK",
//  "Belwari",
//  "MEN",
//  "WOMEN",
//  "ACCESSORIES",
// ];
// // SVG Icons component
// const HeaderIcons = () => (
//  <svg xmlns="http://www.w3.org/2000/svg" className="t4s-d-none">
//   <symbol id="icon-h-search" viewBox="0 0 32 32" fill="currentColor">
//    <path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z"></path>
//   </symbol>
//   <symbol id="icon-h-account" viewBox="0 0 32 32" fill="currentColor">
//    <path
//     xmlns="http://www.w3.org/2000/svg"
//     d="M 16 5 C 12.144531 5 9 8.144531 9 12 C 9 14.410156 10.230469 16.550781 12.09375 17.8125 C 8.527344 19.34375 6 22.882813 6 27 L 8 27 C 8 22.570313 11.570313 19 16 19 C 20.429688 19 24 22.570313 24 27 L 26 27 C 26 22.882813 23.472656 19.34375 19.90625 17.8125 C 21.769531 16.550781 23 14.410156 23 12 C 23 8.144531 19.855469 5 16 5 Z M 16 7 C 18.773438 7 21 9.226563 21 12 C 21 14.773438 18.773438 17 16 17 C 13.226563 17 11 14.773438 11 12 C 11 9.226563 13.226563 7 16 7 Z"
//    ></path>
//   </symbol>
//   <symbol id="icon-h-heart" viewBox="0 0 32 32" fill="currentColor">
//    <path
//     xmlns="http://www.w3.org/2000/svg"
//     d="M 9.5 5 C 5.363281 5 2 8.402344 2 12.5 C 2 13.929688 2.648438 15.167969 3.25 16.0625 C 3.851563 16.957031 4.46875 17.53125 4.46875 17.53125 L 15.28125 28.375 L 16 29.09375 L 16.71875 28.375 L 27.53125 17.53125 C 27.53125 17.53125 30 15.355469 30 12.5 C 30 8.402344 26.636719 5 22.5 5 C 19.066406 5 16.855469 7.066406 16 7.9375 C 15.144531 7.066406 12.933594 5 9.5 5 Z M 9.5 7 C 12.488281 7 15.25 9.90625 15.25 9.90625 L 16 10.75 L 16.75 9.90625 C 16.75 9.90625 19.511719 7 22.5 7 C 25.542969 7 28 9.496094 28 12.5 C 28 14.042969 26.125 16.125 26.125 16.125 L 16 26.25 L 5.875 16.125 C 5.875 16.125 5.390625 15.660156 4.90625 14.9375 C 4.421875 14.214844 4 13.273438 4 12.5 C 4 9.496094 6.457031 7 9.5 7 Z"
//    ></path>
//   </symbol>
//   <symbol id="icon-h-cart" viewBox="0 0 32 32" fill="currentColor">
//    <path
//     xmlns="http://www.w3.org/2000/svg"
//     d="M 16 3 C 13.253906 3 11 5.253906 11 8 L 11 9 L 6.0625 9 L 6 9.9375 L 5 27.9375 L 4.9375 29 L 27.0625 29 L 27 27.9375 L 26 9.9375 L 25.9375 9 L 21 9 L 21 8 C 21 5.253906 18.746094 3 16 3 Z M 16 5 C 17.65625 5 19 6.34375 19 8 L 19 9 L 13 9 L 13 8 C 13 6.34375 14.34375 5 16 5 Z M 7.9375 11 L 11 11 L 11 14 L 13 14 L 13 11 L 19 11 L 19 14 L 21 14 L 21 11 L 24.0625 11 L 24.9375 27 L 7.0625 27 Z"
//    ></path>
//   </symbol>
//  </svg>
// );

// // Icon component
// const Icon = ({ icon }) => (
//  <svg
//   className={`t4s-icon t4s-icon--${icon}`}
//   aria-hidden="true"
//   focusable="false"
//   role="presentation"
//  >
//   <use href={`#icon-h-${icon}`}></use>
//  </svg>
// );

// // Arrow icon for submenus
// const ArrowIcon = () => (
//  <svg
//   xmlns="http://www.w3.org/2000/svg"
//   viewBox="0 0 256 512"
//   width="7"
//   fill="currentColor"
//  >
//   <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"></path>
//  </svg>
// );

// // Recursive SubMenu component
// const SubMenu = ({ items }) => {
//  return (
//   <ul className="t4s-sub-menu t4s-sub-menu-2 pa op__0">
//    {items.map((item, index) => (
//     <li
//      key={index}
//      className={`t4s-menu-item ${item.children ? "has--children" : ""}`}
//     >
//      {item.children ? (
//       <>
//        <a href={item.link || item.href || "#"}>
//         <span>{item.text || item.title || item.name}</span>
//         <ArrowIcon />
//        </a>
//        <SubMenu items={item.children} />
//       </>
//      ) : (
//       <a href={item.link || item.href || "#"}>
//        {item.text || item.title || item.name}
//       </a>
//      )}
//     </li>
//    ))}
//   </ul>
//  );
// };

// // Menu Item component
// const MenuItem = ({ item }) => {
//  const [isOpen, setIsOpen] = useState(false);

//  const handleMouseEnter = () => {
//   if (item.children || (item.submenu && item.submenu.length)) {
//    setIsOpen(true);
//   }
//  };

//  const handleMouseLeave = () => {
//   if (item.children || (item.submenu && item.submenu.length)) {
//    setIsOpen(false);
//   }
//  };

//  // Determine children based on item structure
//  const childItems = item.children || item.submenu || [];
//  const hasChildren = childItems && childItems.length > 0;

//  // Determine item properties based on which data structure is used
//  const text = item.text || item.title || "";
//  const link = item.link || item.href || "#";
//  const image = item.image || item.logo || null;
//  const imageAlt = item.imageAlt || item.alt || "";
//  const label = item.label || item.tag || "";
//  const labelColor = item.labelColor || item.tagColor || "#CE3241";

//  return (
//   <li
//    id={item.id || `item_${text.toLowerCase().replace(/\s+/g, "_")}`}
//    className={`${item.type || "t4s-type__drop"} t4s-menu-item ${
//     hasChildren ? "has--children" : ""
//    } ${item.extraClasses || ""}`}
//    onMouseEnter={handleMouseEnter}
//    onMouseLeave={handleMouseLeave}
//    data-placement={item.placement || "bottom"}
//   >
//    <a
//     className="t4s-lh-1 t4s-d-flex t4s-align-items-center t4s-pr"
//     href={link}
//     target={item.target || "_self"}
//     rel={item.target === "_blank" ? "noopener" : ""}
//    >
//     {image ? (
//      <img
//       style={{ height: item.imageHeight || "1.6rem" }}
//       src={image}
//       alt={imageAlt}
//      />
//     ) : (
//      text
//     )}
//     {label && (
//      <span
//       className="t4s_lb_nav t4s-pa t4s-op-0"
//       style={{
//        backgroundColor: item.labelBg || "rgba(0,0,0,0)",
//        color: "#fff",
//       }}
//      >
//       <span style={{ color: labelColor }}>{label}</span>
//      </span>
//     )}
//    </a>

//    {hasChildren && isOpen && (
//     <div
//      id={`content_${
//       item.id || `item_${text.toLowerCase().replace(/\s+/g, "_")}`
//      }`}
//      className="t4s-sub-menu t4s-pa t4s-op-0 t4s-pe-none"
//      style={{ left: item.left || "0", top: "100%" }}
//     >
//      <div className="t4s-lazy_menu" data-handle={item.handle}>
//       <link
//        rel="stylesheet"
//        href="//blucheez.fashion/cdn/shop/t/142/assets/t4s-submenu.css?v=177196850476384233671728726942"
//        media="all"
//       />

//       {(item.viewAll ||
//        (childItems[0] && childItems[0].title === "View All")) && (
//        <div className="t4s-menu-item">
//         <a
//          href={
//           item.viewAllLink || item.link || (childItems[0] && childItems[0].href)
//          }
//         >
//          View All
//         </a>
//        </div>
//       )}

//       {childItems.map((child, idx) => {
//        // Skip the "View All" item if it's the first one since we already rendered it
//        if (idx === 0 && child.title === "View All") return null;

//        return (
//         <div
//          key={idx}
//          className={`t4s-menu-item ${child.children ? "has--children" : ""}`}
//         >
//          {child.children ? (
//           <>
//            <a href={child.link || child.href || "#"}>
//             <span>{child.text || child.title || child.name}</span>
//             <ArrowIcon />
//            </a>
//            <SubMenu items={child.children} />
//           </>
//          ) : (
//           <a href={child.link || child.href || "#"}>
//            {child.text || child.title || child.name}
//           </a>
//          )}
//         </div>
//        );
//       })}
//      </div>
//     </div>
//    )}
//   </li>
//  );
// };

// // Convert menuItemsData to the format used by original MenuItems
// const convertMenuData = (items) => {
//  return items.map((item) => {
//   const newItem = {
//    id: `item_${item.title.toLowerCase().replace(/\s+/g, "_")}`,
//    type: "t4s-type__drop",
//    text: item.title,
//    link: item.href || "#",
//    placement: "bottom",
//    extraClasses: "menu-has__offsets menu-pos__left",
//    handle: item.title.toLowerCase().replace(/\s+/g, "-"),
//    viewAll:
//     item.children && item.children[0] && item.children[0].title === "View All",
//   };

//   if (item.logo) {
//    newItem.image = item.logo;
//    newItem.imageAlt = item.alt || "";
//   }

//   if (item.tag) {
//    newItem.label = item.tag;
//   }

//   if (item.children) {
//    newItem.children = item.children;
//   } else if (item.submenu) {
//    newItem.children = item.submenu.map((subItem) => ({
//     text: subItem.name,
//     link: subItem.path,
//    }));
//   }

//   return newItem;
//  });
// };

// // Main header component
// const BlucheezHeader = () => {
//  // Define main menu items - use either the original menuItems or the converted menuItemsData
//  const menuItems = convertMenuData(menuItemsData);

//  // Original menu items can be used as an alternative
//  // const menuItems = [
//  //   {
//  //     id: "item_base_hegRwJ",
//  //     type: "t4s-type__simple",
//  //     text: "NEW IN",
//  //     link: "/collections/newest-products",
//  //   },
//  //   // ... etc.
//  // ];

//  return (
//   <div
//    className="t4s-header__wrapper t4s-pr t4s-header-layout_logo_left"
//    data-header-options={{
//     isTransparent: false,
//     isSticky: true,
//     hideScroldown: true,
//    }}
//   >
//    <div className="t4s-container">
//     <div
//      className="t4s-row t4s-gx-15 t4s-gx-md-30 t4s-align-items-center"
//      data-header-height=""
//     >
//      {/* Mobile Menu Button */}
//      <div className="t4s-col-md-4 t4s-col-3 t4s-d-lg-none t4s-col-item">
//       <a
//        href="/"
//        data-menu-drawer=""
//        data-drawer-options={{ id: "#t4s-menu-drawer" }}
//        className="t4s-push-menu-btn t4s-lh-1 t4s-d-flex t4s-align-items-center"
//       >
//        <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="30"
//         height="16"
//         viewBox="0 0 30 16"
//         fill="currentColor"
//        >
//         <rect width="30" height="1.5"></rect>
//         <rect y="7" width="20" height="1.5"></rect>
//         <rect y="14" width="30" height="1.5"></rect>
//        </svg>
//       </a>
//      </div>

//      {/* Logo */}
//      <div className="t4s-col-lg-2 t4s-col-md-4 t4s-col-6 t4s-text-center t4s-text-lg-start t4s-col-item">
//       <div className="t4s-header__logo t4s-lh-1">
//        <a className="t4s-d-inline-block" href="/">
//         <img
//          loading="eager"
//          srcSet="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=110, //blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=220 2x"
//          src="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=110"
//          className="header__normal-logo t4s-d-none t4s-d-lg-block"
//          width="110"
//          height="38"
//          alt="Blucheez"
//          style={{ width: "110px" }}
//         />
//         <img
//          loading="lazy"
//          srcSet="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=95, //blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=190 2x"
//          src="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=95"
//          className="header__sticky-logo t4s-d-none t4s-d-none"
//          width="95"
//          height="33"
//          alt="Blucheez"
//          style={{ width: "95px" }}
//         />
//         <img
//          loading="eager"
//          srcSet="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=100, //blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=200 2x"
//          src="//blucheez.fashion/cdn/shop/files/Blucheez-Red_Blucheez_logo.svg?v=1695752867&width=100"
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
//        <ul
//         id="t4s-nav-ul"
//         className="t4s-nav__ul t4s-d-inline-flex t4s-flex-wrap t4s-align-items-center"
//         data-menu-nav=""
//        >
//         {menuItems.map((item, index) => (
//          <MenuItem key={index} item={item} />
//         ))}
//        </ul>
//       </nav>
//      </div>

//      {/* Icons Section */}
//      <div className="t4s-col-lg-auto t4s-col-md-4 t4s-col-3 t4s-text-end t4s-col-group_btns t4s-col-item t4s-lh-1">
//       <HeaderIcons />
//       <div className="t4s-site-nav__icons t4s-use__line is--hover2 t4s-h-cart__design1 t4s-lh-1 t4s-d-inline-flex t4s-align-items-center">
//        {/* Search Icon */}
//        <div className="t4s-site-nav__icon t4s-site-nav__search">
//         <Search>
//          <SearchIconWrapper>
//           <SearchIcon />
//          </SearchIconWrapper>
//          <StyledInputBase
//           placeholder="Search…"
//           inputProps={{ "aria-label": "search" }}
//          />
//         </Search>
//        </div>

//        {/* Account Icon */}
//        <div className="t4s-site-nav__icon t4s-site-nav__account t4s-pr t4s-d-none t4s-d-md-inline-block">
//         <a
//          className="t4s-pr"
//          href="/account"
//          data-no-instant=""
//          data-drawer-options={{ id: "#t4s-login-sidebar" }}
//         >
//          <Icon icon="account" />
//         </a>
//        </div>

//        {/* Wishlist Icon */}
//        <div className="t4s-site-nav__icon t4s-site-nav__heart t4s-d-none t4s-d-md-inline-block">
//         <a
//          data-link-wishlist=""
//          className="t4s-pr"
//          href="/search/?view=wishlist"
//         >
//          <Icon icon="heart" />
//          <span
//           data-count-wishlist=""
//           className="t4s-pa t4s-op-0 t4s-ts-op t4s-count-box"
//          >
//           0
//          </span>
//         </a>
//        </div>

//        {/* Cart Icon */}
//        <div className="t4s-site-nav__icon t4s-site-nav__cart">
//         <a href="/cart" data-drawer-options={{ id: "#t4s-mini_cart" }}>
//          <span className="t4s-pr t4s-icon-cart__wrap">
//           <Icon icon="cart" />
//           <span
//            data-cart-count=""
//            className="t4s-pa t4s-op-0 t4s-ts-op t4s-count-box"
//           >
//            1
//           </span>
//          </span>
//          <span className="t4s-h-cart-totals t4s-dn">
//           <span className="t4s-h-cart__divider t4s-dn">/</span>
//           <span data-cart-tt-price="" className="t4s-h-cart__total">
//            <span className="money">Tk 750.00</span>
//           </span>
//          </span>
//         </a>
//        </div>
//       </div>

//       {/* Header Cart Styles */}
//       <style>
//        {`
//                 .t4s-h-cart__design3 .t4s-count-box {
//                   width: 19px;
//                   height: 19px;
//                   line-height: 19px;
//                   position: static;
//                   display: inline-block;
//                 }
//                 .t4s-h-cart__design2 .t4s-site-nav__icon:last-child,
//                 .t4s-h-cart__design3 .t4s-site-nav__icon:last-child,
//                 .t4s-h-cart__design4 .t4s-site-nav__icon:last-child,
//                 .t4s-h-cart__design5 .t4s-site-nav__icon:last-child {
//                   padding-right: 0;
//                 }
//                 @media (min-width: 768px) {
//                   .t4s-h-cart__design2 .t4s-site-nav__cart a,
//                   .t4s-h-cart__design4 .t4s-site-nav__cart a,
//                   .t4s-h-cart__design5 .t4s-site-nav__cart a {
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                   }
//                   .t4s-h-cart__design2 .t4s-h-cart-totals,
//                   .t4s-h-cart__design4 .t4s-h-cart-totals {
//                     display: block;
//                     margin-left: 15px;
//                   }
//                   .t4s-h-cart__design4 .t4s-site-nav__cart .t4s-count-box,
//                   .t4s-h-cart__design5 .t4s-site-nav__cart .t4s-count-box {
//                     display: none
//                   }
//                   .t4s-h-cart__design4 .t4s-h-cart-totals {
//                     margin-left: 7px;
//                   }
//                   .t4s-h-cart__design5 .t4s-h-cart__divider {
//                     display: inline-block;
//                   }
//                   .t4s-h-cart__design5 .t4s-h-cart-totals {
//                     display: block;
//                     margin-left: 7px;
//                   }
//                   .t4s-h-cart__design1 .t4s-site-nav__icon.t4s-site-nav__btnMenu {
//                     padding-right: 0;
//                   }
//                 }

//                 /* Additional styles for dropdown menus */
//                 .t4s-menu-item.has--children {
//                   position: relative;
//                 }

//                 .t4s-sub-menu {
//                   position: absolute;
//                   min-width: 200px;
//                   background: #fff;
//                   box-shadow: 0 1px 5px rgba(0,0,0,0.1);
//                   z-index: 99;
//                   transition: opacity 0.3s, visibility 0.3s;
//                   opacity: 0;
//                   visibility: hidden;
//                 }

//                 .t4s-menu-item:hover > .t4s-sub-menu {
//                   opacity: 1 !important;
//                   visibility: visible !important;
//                   pointer-events: auto !important;
//                 }

//                 .t4s-sub-menu .t4s-menu-item {
//                   display: block;
//                   width: 100%;
//                 }

//                 .t4s-sub-menu .t4s-menu-item a {
//                   display: flex;
//                   padding: 8px 15px;
//                   justify-content: space-between;
//                   align-items: center;
//                   text-decoration: none;
//                   color: #333;
//                 }

//                 .t4s-sub-menu .t4s-menu-item a:hover {
//                   background-color: #f5f5f5;
//                 }

//                 .t4s-sub-menu-2 {
//                   left: 100%;
//                   top: 0;
//                 }

//                 /* Fix for nested menus */
//                 .t4s-lazy_menu {
//                   background: #fff;
//                   padding: 10px 0;
//                   min-width: 200px;
//                 }

//                 .t4s-lazy_menu .t4s-menu-item {
//                   position: relative;
//                 }
//               `}
//       </style>
//      </div>
//     </div>
//    </div>
//   </div>
//  );
// };

// export default BlucheezHeader;
