/** @format */

// src/components/Navbar/SubMenu.jsx
import React from "react";
import SubMenuItem from "./SubMenuItem"; // Adjust path if necessary

const SubMenu = ({ items, navigate }) => {
 console.log(items);
 return (
  <ul className="t4s-sub-menu t4s-sub-menu-2 pa op__0">
   {items.map((item, index) => {
    // Skip the "View All" item if it's the first one, assuming it's handled differently
    // or ensure your data doesn't have "View All" as a direct child if you want it distinct
    // Note: The main MenuItem handles the top-level "View All" display.
    // For nested submenus, "View All" might be a regular item or handled within SubMenuItem if present.
    if (item.title === "View All" && index === 0) return null;
    return <SubMenuItem key={index} item={item} navigate={navigate} />;
   })}
  </ul>
 );
};

export default SubMenu;
