/** @format */

// import React from "react";

// const DeliveryMethod = () => {
//  return (
//   <section aria-label="Delivery method" className="delivery-method">
//    <fieldset id="delivery_strategies" className="delivery-options">
//     <legend>Choose a delivery method</legend>
//     <label htmlFor="delivery_ship" className="radio-label">
//      <input
//       type="radio"
//       id="delivery_ship"
//       name="delivery_method"
//       value="ship"
//       className="radio-input"
//       defaultChecked
//      />
//      <span>Ship</span>
//     </label>
//     <label htmlFor="delivery_pickup" className="radio-label">
//      <input
//       type="radio"
//       id="delivery_pickup"
//       name="delivery_method"
//       value="pickup"
//       className="radio-input"
//      />
//      <span>Pickup</span>
//     </label>
//    </fieldset>
//   </section>
//  );
// };

// export default DeliveryMethod;

import React from "react";
import "./DeliveryMethod.css";
import freeDeliveryImage from "../Assets/free-delivery_10737164.png";
import shopping from "../Assets/shopping_1162499.png";

const DeliveryMethod = ({ onChange }) => {
 return (
  <section className="delivery-method">
   <div className="radio-container">
    <div className="radio-container">
     <input
      type="radio"
      name="delivery"
      className="radio-input"
      onChange={onChange}
     />
     <span className="radio-label">Select Delivery Option</span>
    </div>
    <img src={freeDeliveryImage} alt="Free Delivery" className="icon" />
   </div>
   <legend>Choose a delivery method</legend>
   <label className="delivery-option" htmlFor="delivery_ship">
    <input
     type="radio"
     id="delivery_ship"
     name="deliveryMethod"
     value="ship"
     onChange={onChange}
     defaultChecked
    />
    <span className="delivery-text">Ship</span>
    <img
     src={freeDeliveryImage} // Replace with your actual shipping icon path
     alt="Ship Icon"
     className="delivery-icon"
    />
   </label>
   <label className="delivery-option" htmlFor="delivery_pickup">
    <input
     type="radio"
     id="delivery_pickup"
     name="deliveryMethod"
     value="pickup"
     onChange={onChange}
    />
    <span className="delivery-text">Pickup</span>
    <img
     src={shopping} // Replace with your actual pickup icon path
     alt="Pickup Icon"
     className="delivery-icon"
    />
   </label>
  </section>
 );
};

export default DeliveryMethod;
