/** @format */
import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";

const Item = (props) => {
 console.log("props in item for popular", props);
 return (
  <div className="item">
   <Link to={`/product/${props.productId}`}>
    <img onClick={window.scrollTo(0, 0)} src={props.productId} alt="" />
   </Link>
   <p>{props.name}</p>
   <div className="item-prices">
    <div className="item-price-new">${props.newPrice}</div>
    <div className="item-price-old">${props.oldPrice}</div>
   </div>
  </div>
 );
};

export default Item;

// import React, { useState } from "react";
// import "./Item.css";
// import { Link } from "react-router-dom";

// const Item = (props) => {
//  console.log("props in item for popular", props);

//  // State to handle hover image display
//  const [isHovered, setIsHovered] = useState(false);

//  // Handle mouse hover
//  const handleMouseEnter = () => setIsHovered(true);
//  const handleMouseLeave = () => setIsHovered(false);

//  // Determine which image to display
//  const imageToShow =
//   isHovered && props.hoverImage ? props.hoverImages[0] : props.primaryImages[0];

//  return (
//   <div
//    className="item"
//    onMouseEnter={handleMouseEnter}
//    onMouseLeave={handleMouseLeave}
//   >
//    <Link to={`/product/${props.id}`}>
//     <img
//      //  onClick={window.scrollTo(0, 0)}
//      src={imageToShow} // Show hover image if hovered, else show primary image
//      alt={props.name}
//     />
//    </Link>
//    <p>{props.name}</p>
//    <div className="item-prices">
//     <div className="item-price-new">${props.newPrice}</div>
//     <div className="item-price-old">${props.oldPrice}</div>
//    </div>
//   </div>
//  );
// };

// export default Item;
