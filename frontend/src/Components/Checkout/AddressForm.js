/** @format */

// import React, { useState } from "react";
// import "./AddressForm.css";

// const AddressForm = () => {
//  const [formData, setFormData] = useState({
//   lastName: "",
//   address: "",
//  });

//  const handleInputChange = (e) => {
//   const { name, value } = e.target;
//   setFormData({
//    ...formData,
//    [name]: value,
//   });
//  };

//  const handleSubmit = (e) => {
//   e.preventDefault();
//   console.log(formData);
//   // Handle form submission
//  };

//  return (
//   <section className="address-form">
//    <form id="Form1" onSubmit={handleSubmit}>
//     <div className="address-field">
//      <label htmlFor="last_name">Last Name</label>
//      <input
//       type="text"
//       id="last_name"
//       name="lastName"
//       value={formData.lastName}
//       onChange={handleInputChange}
//       required
//      />
//     </div>
//     <div className="address-field">
//      <label htmlFor="address">Address</label>
//      <input
//       type="text"
//       id="address"
//       name="address"
//       value={formData.address}
//       onChange={handleInputChange}
//       required
//      />
//     </div>
//     <button type="submit" className="submit-button">
//      Submit
//     </button>
//    </form>
//   </section>
//  );
// };

// export default AddressForm;

// import React from "react";
// import "./AddressForm.css";

// const AddressForm = ({ onChange }) => {
//  const handleInputChange = (e) => {
//   const { name, value } = e.target;
//   onChange({ [name]: value });
//  };

//  const handleRadioChange = (e) => {
//   const { name, value } = e.target;
//   onChange({ [name]: value });

//   // Handle free delivery logic based on inside/outside city selection
//   if (name === "deliveryLocation") {
//    if (value === "inside") {
//     onChange({ freeDelivery: true }); // Free delivery for inside the city
//    } else {
//     onChange({ freeDelivery: false }); // No free delivery for outside the city
//    }
//   }
//  };

//  return (
//   <section className="address-form">
//    <label htmlFor="first_name">First Name</label>
//    <input
//     type="text"
//     id="first_name"
//     name="firstName"
//     onChange={handleInputChange}
//     required
//    />

//    <label htmlFor="last_name">Last Name</label>
//    <input
//     type="text"
//     id="last_name"
//     name="lastName"
//     onChange={handleInputChange}
//     required
//    />

//    <label htmlFor="phone_number">Phone Number</label>
//    <input
//     type="tel"
//     id="phone_number"
//     name="phoneNumber"
//     onChange={handleInputChange}
//     required
//    />

//    <label htmlFor="address">Address</label>
//    <input
//     type="text"
//     id="address"
//     name="address"
//     onChange={handleInputChange}
//     required
//    />

//    <label htmlFor="city">City</label>
//    <input
//     type="text"
//     id="city"
//     name="city"
//     onChange={handleInputChange}
//     required
//    />

//    <label htmlFor="country">Country/Region</label>
//    <select id="country" name="country" onChange={handleInputChange} required>
//     <option value="bangladesh">Bangladesh</option>
//     <option value="india">India</option>
//     <option value="usa">USA</option>
//     {/* Add more countries/regions as needed */}
//    </select>

//    <div>
//     <label>Delivery Location</label>
//     <div>
//      <input
//       type="radio"
//       id="inside"
//       name="deliveryLocation"
//       value="inside"
//       onChange={handleRadioChange}
//      />
//      <label htmlFor="inside">Inside the city</label>
//     </div>
//     <div>
//      <input
//       type="radio"
//       id="outside"
//       name="deliveryLocation"
//       value="outside"
//       onChange={handleRadioChange}
//      />
//      <label htmlFor="outside">Outside the city</label>
//     </div>
//    </div>

//    <div>
//     <label>
//      {`Delivery Option: ${
//       !handleRadioChange.freeDelivery ? "Paid Delivery" : "Free Delivery"
//      }`}
//     </label>
//    </div>
//   </section>
//  );
// };

// export default AddressForm;
//==============
import React from "react";
import "./AddressForm.css";

const AddressForm = ({ onChange, formData }) => {
 const handleInputChange = (e) => {
  const { name, value } = e.target;
  onChange({ [name]: value });
 };

 const handleRadioChange = (e) => {
  const { name, value } = e.target;
  onChange({ [name]: value });

  // Handle free delivery logic based on inside/outside city selection
  if (name === "deliveryLocation") {
   if (value === "inside") {
    onChange({ freeDelivery: true }); // Free delivery for inside the city
   } else {
    onChange({ freeDelivery: false }); // No free delivery for outside the city
   }
  }
 };

 return (
  <section className="address-form">
   <label htmlFor="first_name">First Name</label>
   <input
    type="text"
    id="first_name"
    name="firstName"
    value={formData.firstName || ""}
    onChange={handleInputChange}
    required
   />

   <label htmlFor="last_name">Last Name</label>
   <input
    type="text"
    id="last_name"
    name="lastName"
    value={formData.lastName || ""}
    onChange={handleInputChange}
    required
   />

   <label htmlFor="phone_number">Phone Number</label>
   <input
    type="tel"
    id="phone_number"
    name="phoneNumber"
    value={formData.phoneNumber || ""}
    onChange={handleInputChange}
    required
   />

   <label htmlFor="address">Address</label>
   <input
    type="text"
    id="address"
    name="address"
    value={formData.address || ""}
    onChange={handleInputChange}
    required
   />

   <label htmlFor="city">City</label>
   <input
    type="text"
    id="city"
    name="city"
    value={formData.city || ""}
    onChange={handleInputChange}
    required
   />

   <label htmlFor="country">Country/Region</label>
   <select
    id="country"
    name="country"
    value={formData.country || ""}
    onChange={handleInputChange}
    required
   >
    <option value="bangladesh">Bangladesh</option>
    <option value="india">India</option>
    <option value="usa">USA</option>
   </select>

   <div>
    <label>Delivery Location</label>
    <div>
     <input
      type="radio"
      id="inside"
      name="deliveryLocation"
      value="inside"
      checked={formData.deliveryLocation === "inside"}
      onChange={handleRadioChange}
     />
     <label htmlFor="inside">Inside the city</label>
    </div>
    <div>
     <input
      type="radio"
      id="outside"
      name="deliveryLocation"
      value="outside"
      checked={formData.deliveryLocation === "outside"}
      onChange={handleRadioChange}
     />
     <label htmlFor="outside">Outside the city</label>
    </div>
   </div>

   <div>
    <label>
     {`Delivery Option: ${
      formData.freeDelivery ? "Free Delivery" : "Paid Delivery"
     }`}
    </label>
   </div>
  </section>
 );
};

export default AddressForm;
