/** @format */

// src/components/Navbar/MenuItem.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubMenu from "./SubMenu"; // Adjust path if necessary
import ArrowIcon from "./ArrowIcon"; // Adjust path if necessary

const MenuItem = ({ item }) => {
 const [isOpen, setIsOpen] = useState(false);
 const navigate = useNavigate();

 const handleMouseEnter = () => {
  if (item.children && item.children.length > 0) {
   setIsOpen(true);
  }
 };

 const handleMouseLeave = () => {
  if (item.children && item.children.length > 0) {
   setIsOpen(false);
  }
 };

 const handleClick = (e) => {
  // Only navigate if it's a direct link or a "View All" link for the current parent
  // If it has children, hovering is the primary way to access them.
  // If it's a parent link (e.g., "Ethnic") with children, you might still want it to navigate to the parent category page.
  if (!hasChildren || item.link || item.href) {
   e.preventDefault(); // Prevent default link behavior if we're handling navigation with react-router
   navigate(item.link || item.href);
  }
  // If it has children and no direct link, don't navigate on click, let hover handle submenu
 };

 const childItems = item.children || [];
 const hasChildren = childItems.length > 0;

 const text = item.text || item.title || "";
 const link = item.link || item.href || "#";
 const image = item.image || item.logo || null;
 const imageAlt = item.imageAlt || item.alt || "";
 const label = item.label || item.tag || "";
 const labelColor = item.labelColor || item.tagColor || "#CE3241";

 return (
  <li
   id={item.id || `item_${text.toLowerCase().replace(/\s+/g, "_")}`}
   className={`${item.type || "t4s-type__drop"} t4s-menu-item ${
    hasChildren ? "has--children" : ""
   } ${item.extraClasses || ""} ${text === "MEN" ? "men-menu-item" : ""}`}
   onMouseEnter={handleMouseEnter}
   onMouseLeave={handleMouseLeave}
   data-placement={item.placement || "bottom"}
  >
   <a
    className="t4s-lh-1 t4s-d-flex t4s-align-items-center t4s-pr"
    href={link}
    onClick={handleClick} // Use onClick for navigation with react-router
    target={item.target || "_self"}
    rel={item.target === "_blank" ? "noopener" : ""}
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
    {/* Only show arrow for top-level items with children */}
    {hasChildren && <ArrowIcon />}
   </a>

   {hasChildren && isOpen && (
    <div
     id={`content_${
      item.id || `item_${text.toLowerCase().replace(/\s+/g, "_")}`
     }`}
     className="t4s-sub-menu t4s-pa t4s-op-0 t4s-pe-none"
     style={{ left: item.left || "0", top: "100%" }}
    >
     <div className="t4s-lazy_menu" data-handle={item.handle}>
      {/* The link to submenu.css should be in your main CSS file, not here */}

      {/* Render "View All" link for the main menu item if applicable */}
      {(item.viewAll ||
       (childItems[0] && childItems[0].title === "View All")) && (
       <div className="t4s-menu-item">
        <a
         href={
          item.viewAllLink || item.link || (childItems[0] && childItems[0].href)
         }
         onClick={(e) => {
          e.preventDefault(); // Prevent default link behavior
          navigate(
           item.viewAllLink ||
            item.link ||
            (childItems[0] && childItems[0].href),
          );
         }}
        >
         View All
        </a>
       </div>
      )}

      <SubMenu items={childItems} navigate={navigate} />
     </div>
    </div>
   )}
  </li>
 );
};

export default MenuItem;
