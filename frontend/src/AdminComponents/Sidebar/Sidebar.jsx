/** @format */

// import React from "react";
// import "../Navbar/Navbar.css";
// import navlogo from "../Assets/nav-logo.svg";
// import navprofileIcon from "../Assets/nav-profile.svg";
// import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
// import { AddBox, FormatListBulleted, BarChart } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";

// const Sidebar = () => {
//  const navigate = useNavigate();

//  // Sidebar navigation options
//  const menuItems = [
//   { label: "Add Product", icon: <AddBox />, route: "/admin/addproduct" },
//   {
//    label: "List Products",
//    icon: <FormatListBulleted />,
//    route: "/admin/listproduct",
//   },
//   { label: "Total Sales", icon: <BarChart />, route: "/admin/totalsales" },
//  ];

//  return (
//   <div className="sidebar">
//    <List>
//     {menuItems.map((item, index) => (
//      <ListItem
//       button
//       key={index}
//       className="sidebar-item"
//       onClick={() => navigate(item.route)}
//      >
//       <ListItemIcon>{item.icon}</ListItemIcon>
//       <ListItemText primary={item.label} />
//      </ListItem>
//     ))}
//    </List>
//   </div>
//  );
// };

// export default Sidebar;

/** @format */

import React from "react";
import "../Navbar/Navbar.css";
import navlogo from "../Assets/nav-logo.svg";
import navprofileIcon from "../Assets/nav-profile.svg";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { AddBox, FormatListBulleted, BarChart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
 const navigate = useNavigate();

 // Sidebar navigation options
 const menuItems = [
  { label: "Add Product", icon: <AddBox />, route: "/admin/addproduct" },
  {
   label: "List Products",
   icon: <FormatListBulleted />,
   route: "/admin/listproduct",
  },
  { label: "Total Sales", icon: <BarChart />, route: "/admin/totalsales" },
 ];

 return (
  <div className="sidebar">
   <List>
    {menuItems.map((item, index) => (
     <ListItem
      button={true}
      key={index}
      className="sidebar-item"
      onClick={() => navigate(item.route)}
     >
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.label} />
     </ListItem>
    ))}
   </List>
  </div>
 );
};

export default Sidebar;
