/** @format */

// src/components/Navbar/SubMenuItem.jsx
import React, { useState } from "react";
import ArrowIcon from "./ArrowIcon"; // Adjust path if necessary
import SubMenu from "./SubMenu"; // Adjust path if necessary

const SubMenuItem = ({ item, navigate }) => {
 const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

 const hasChildren = item.children && item.children.length > 0;

 const handleMouseEnter = () => {
  if (hasChildren) {
   setIsSubMenuOpen(true);
  }
 };

 const handleMouseLeave = () => {
  if (hasChildren) {
   setIsSubMenuOpen(false);
  }
 };

 const handleClick = (e) => {
  // Prevent navigating if it's a parent with children and no explicit link to view all
  // If it has children and a link, allow navigating to the parent link (e.g., "All Kameez")
  if (item.link || item.href) {
   // e.stopPropagation(); // Stop propagation if you don't want parent menu to close
   navigate(item.link || item.href);
   // You might want to pass a prop to close all menus here after navigation
   // For now, relies on page load or parent logic to close.
  } else if (hasChildren) {
   // If it's a parent item with children but no direct link, prevent navigation
   // and let the hover open the submenu.
   e.preventDefault();
  }
 };

 return (
  <li
   className={`t4s-menu-item ${hasChildren ? "has--children" : ""} ${
    isSubMenuOpen ? "is--hover" : ""
   }`}
   onMouseEnter={handleMouseEnter}
   onMouseLeave={handleMouseLeave}
  >
   <a href={item.link || item.href || "#"} onClick={handleClick}>
    <span>{item.text || item.title || item.name}</span>
    {hasChildren && <ArrowIcon />}
   </a>
   {hasChildren && isSubMenuOpen && (
    <SubMenu items={item.children} navigate={navigate} />
   )}
  </li>
 );
};

export default SubMenuItem;
