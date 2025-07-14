/** @format */

import React from "react";
import CustomButton from "./CustomButton";
import "./ButtonRow.css"; // You can optionally style the row here

const ButtonRow = () => {
 return (
  <div className="button-row">
   <CustomButton
    label="FOR HER"
    href="https://blucheez.fashion/cdn/shop/files/ACCESSORIES_f877d054-0cc8-400e-ae05-92d51db9e1e8.webp?v=1729786438&width=2000"
   />
   <CustomButton
    label="FOR HIM"
    href="https://blucheez.fashion/cdn/shop/files/ACCESSORIES_f877d054-0cc8-400e-ae05-92d51db9e1e8.webp?v=1729786438&width=2000"
   />
  </div>
 );
};

export default ButtonRow;
