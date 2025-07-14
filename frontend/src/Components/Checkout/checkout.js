/** @format */

//latest one under working

// Consolidated React Component for Checkout Page
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./Checkout.css"; // Import the external CSS file for styling

const Checkout = () => {
 const location = useLocation();
 const navigate = useNavigate();
 //const { CartItemsArray = [], total = 0 } = location.state || {};
 const [CartItemsArray, setCartItemsArray] = useState([]);
 const [total, setTotal] = useState(0);
 const [userId, setUserId] = useState(null); // State for userId
 //  CartItemsArray = CartItemsArray.map((item) => ({
 //   ...item,
 //   Price: Number(item.Price),
 //   Quantity: Number(item.Quantity),
 //  }));
 //  total = CartItemsArray.reduce(
 //   (sum, item) => sum + item.Price * item.Quantity,
 //   0,
 //  );

 const [deliveryMethod, setDeliveryMethod] = useState("pickup");
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [userInfo, setUserInfo] = useState({
  email: "",
  password: "",
 });

 const PaymentIcons = () => {
  return (
   <div
    style={{
     display: "flex",
     justifyContent: "center",
     alignItems: "center",
     gap: "15px",
     margin: "20px 0",
    }}
   >
    <img
     srcSet="
          https://static.vecteezy.com/system/resources/previews/006/369/197/non_2x/cash-on-delivery-flat-download-vector.jpg 980w, 
          https://static.vecteezy.com/system/resources/previews/006/369/197/large_2x/cash-on-delivery-flat-download-vector.jpg 1960w
        "
     src="https://static.vecteezy.com/system/resources/previews/006/369/197/non_2x/cash-on-delivery-flat-download-vector.jpg"
     alt="Cash on Delivery"
     width="100"
     height="50"
     title="Cash on Delivery"
     draggable="false"
    />

    <img
     src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
     alt="Visa"
     width="100"
     height="50"
     title="Visa"
    />

    <img
     src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
     alt="MasterCard"
     width="100"
     height="50"
     title="MasterCard"
    />

    <img
     src="https://mir-s3-cdn-cf.behance.net/projects/404/21d3ad88470581.Y3JvcCwxMzgwLDEwODAsMjk3LDA.jpg"
     alt="Nexus Pay"
     width="100"
     height="50"
     title="Nexus Pay"
    />

    <img
     src="https://images.seeklogo.com/logo-png/27/1/bkash-logo-png_seeklogo-273684.png"
     alt="Bkash Logo PNG Vector"
     title="Bkash Logo PNG Vector"
     width="100"
     height="50"
    />
   </div>
  );
 };

 const [shippingAddress, setShippingAddress] = useState({
  name: "",
  address: "",
  city: "",
  zip: "",
  country: "",
  phone: "",
 });
 const [showAddressPopup, setShowAddressPopup] = useState(false);
 const [countries, setCountries] = useState([
  "USA",
  "Canada",
  "Bangladesh",
  "India",
 ]);
 const [marketingConsent, setMarketingConsent] = useState(false);

 // Check login status using userId in localStorage
 useEffect(() => {
  const {
   CartItemsArray = [],
   total = 0,
   userId = null,
  } = location.state || {};
  const processedItems = CartItemsArray.map((item) => ({
   ...item,
   Price: Number(item.Price),
   Quantity: Number(item.Quantity),
  }));
  setCartItemsArray(processedItems);
  setTotal(
   processedItems.reduce((sum, item) => sum + item.Price * item.Quantity, 0),
  );
  setUserId(userId);
 }, [location.state]);

 useEffect(() => {
  const storedUserId = localStorage.getItem("userId");
  if (storedUserId && !userId) {
   setUserId(storedUserId); // Ensure the userId is retrieved and set
  }
  if (userId) {
   setIsLoggedIn(true);
   setUserInfo({
    email: localStorage.getItem("userEmail"), // Assuming email is stored
   });
  }
 }, [userId]);

 const handleSignIn = () => {
  window.location.href = "/loginSignup"; // Redirect to login/signup page
 };

 const handleSignOut = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("userEmail");
  setIsLoggedIn(false);
  setUserInfo({ email: "", password: "" });
 };

 const handleAddressChange = (e) => {
  const { name, value } = e.target;
  setShippingAddress({ ...shippingAddress, [name]: value });
 };

 const handleCountryChange = (e) => {
  const { value } = e.target;
  setShippingAddress({ ...shippingAddress, country: value });

  // Update phone format based on selected country
  if (value === "USA") {
   setShippingAddress({ ...shippingAddress, phone: "+1-" });
  } else if (value === "Canada") {
   setShippingAddress({ ...shippingAddress, phone: "+1-" });
  } else if (value === "Bangladesh") {
   setShippingAddress({ ...shippingAddress, phone: "+880-" });
  } else if (value === "India") {
   setShippingAddress({ ...shippingAddress, phone: "+91-" });
  }
 };

 const handleMarketingConsentChange = (e) => {
  setMarketingConsent(e.target.checked);
 };

 const handleConfirmOrder = async () => {
  const userId = localStorage.getItem("userId");

  // Ensure user is logged in before confirming the order
  if (!userId) {
   alert("Please sign in first!");
   return;
  }

  const orderData = {
   UserId: userId,
   CartItems: CartItemsArray,
   totalAmount: total,
   deliveryMethod,
   addressLine1: shippingAddress.address,
   addressLine2: "", // You can add a second address line if necessary
   city: shippingAddress.city,
   state: "", // Add state field if necessary
   postalCode: shippingAddress.zip,
   country: shippingAddress.country,
   phone: shippingAddress.phone,
   marketingConsent,
  };

  try {
   const response = await axios.post(
    "https://76vgxe9gag.execute-api.us-east-1.amazonaws.com/api/Checkout/saveCheckout",
    orderData,
    { headers: { "Content-Type": "application/json" } },
   );
   console.log("Order Confirmed: ", response.data);
   //alert("Order has been placed successfully!");
   navigate("/OrdersuccessModal", {
    state: { orderId: response.data.orderId },
   });
  } catch (error) {
   console.error("Error confirming order: ", error);
  }
 };

 return (
  <div className="checkout-container">
   {/* Header */}
   <header className="checkout-header">
    <h1>Checkout</h1>
   </header>

   {/* Top Left Login Section */}
   <div className="auth-section">
    {isLoggedIn ? (
     <span>Welcome, {userInfo.email}</span>
    ) : (
     <button className="btn" onClick={handleSignIn}>
      Login / Sign Up
     </button>
    )}
    {isLoggedIn && (
     <button className="btn" onClick={handleSignOut}>
      Sign Out
     </button>
    )}
   </div>

   {/* Delivery Method Selection */}
   <div className="delivery-method">
    <h3>Choose Delivery Method:</h3>
    <div className="delivery-option">
     <label>
      <input
       type="radio"
       name="deliveryMethod"
       value="pickup"
       checked={deliveryMethod === "pickup"}
       onChange={(e) => setDeliveryMethod(e.target.value)}
      />
      Pickup
     </label>
     <label>
      <input
       type="radio"
       name="deliveryMethod"
       value="ship"
       checked={deliveryMethod === "ship"}
       onChange={(e) => {
        setDeliveryMethod(e.target.value);
        setShowAddressPopup(true);
       }}
      />
      Ship
     </label>
    </div>
   </div>

   {/* Shipping Address Popup */}
   {showAddressPopup && deliveryMethod === "ship" && (
    <div className="address-popup">
     <h3>Enter Shipping Address:</h3>
     <div className="address-inputs">
      <input
       type="text"
       name="name"
       placeholder="Full Name"
       value={shippingAddress.name}
       onChange={handleAddressChange}
      />
      <input
       type="text"
       name="address"
       placeholder="Address"
       value={shippingAddress.address}
       onChange={handleAddressChange}
      />
      <input
       type="text"
       name="city"
       placeholder="City"
       value={shippingAddress.city}
       onChange={handleAddressChange}
      />
      <input
       type="text"
       name="zip"
       placeholder="ZIP Code"
       value={shippingAddress.zip}
       onChange={handleAddressChange}
      />
      <select
       name="country"
       value={shippingAddress.country}
       onChange={handleCountryChange}
      >
       {countries.map((country, index) => (
        <option key={index} value={country}>
         {country}
        </option>
       ))}
      </select>
      <input
       type="tel"
       name="phone"
       placeholder="Phone Number"
       value={shippingAddress.phone}
       onChange={handleAddressChange}
      />
      <button onClick={() => setShowAddressPopup(false)} className="btn">
       Save Address for future delivery
      </button>
     </div>
    </div>
   )}

   {/* Marketing Consent Section */}
   <div className="marketing-consent">
    <input
     type="checkbox"
     name="marketingConsent"
     checked={marketingConsent}
     onChange={handleMarketingConsentChange}
    />
    <label htmlFor="marketingConsent">Email me with news and offers</label>
   </div>

   {/* Order Summary */}
   <div className="order-summary">
    <h3>Order Summary:</h3>
    <ul className="cart-items">
     {CartItemsArray.length > 0 ? (
      CartItemsArray.map((item, index) => (
       <li key={index} className="cart-item">
        <span className="item-name">{item.ProductName}</span>
        <span className="item-quantity">
         {item.Quantity} x ${item.Price}
        </span>
       </li>
      ))
     ) : (
      <li>No items in the cart</li>
     )}
    </ul>
    <div className="total">
     <h4>Total: ${total}</h4>
    </div>
   </div>

   {/* Confirm Order Button */}
   <div className="confirm-order-btn">
    <button className="btn" onClick={handleConfirmOrder}>
     Confirm Order
    </button>
   </div>
   <PaymentIcons />
  </div>
 );
};

export default Checkout;
