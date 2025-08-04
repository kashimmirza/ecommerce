/** @format */

// import React, { useContext } from "react";
// import "./CartItems.css";
// import { ShopContext } from "../../Context/ShopContext";
// import remove_icon from "../Assets/cart_cross_icon.png";

// const CartItems = () => {
//  const { getTotalCartAmount, all_product, cartItems, removeFromCart } =
//   useContext(ShopContext);
//  return (
//   <div className="cartitems">
//    <div className="cartitems-format-main">
//     <p>Products</p>
//     <p>Title</p>
//     <p>Price</p>
//     <p>Quantity</p>
//     <p>Total</p>
//     <p>Remove</p>
//    </div>
//    <hr />
//    {all_product.map((e) => {
//     if (cartItems[e.id] > 0) {
//      return (
//       <div>
//        <div className="cartitems-format cartitems-format-main">
//         <img src={e.image} alt="" className="carticon-product-icon" />
//         <p>{e.name}</p>
//         <p>${e.new_price}</p>
//         <button className="cartitems-quantity">{cartItems[e.id]}</button>
//         <p>${e.new_price * cartItems[e.id]}</p>
//         <img
//          className="cartitems-remove-icon"
//          src={remove_icon}
//          onClick={() => {
//           removeFromCart(e.id);
//          }}
//          alt=""
//         />
//        </div>
//        <hr />
//       </div>
//      );
//     }
//     return null;
//    })}
//    <div className="cartitems-down">
//     <div className="cartitems-total">
//      <h1>cart Totals</h1>
//      <div>
//       <div className="cartitems-total-item">
//        <p>Subtotal</p>
//        <p>${getTotalCartAmount()}</p>
//       </div>
//       <hr />
//       <div className="cartitems-total-item">
//        <p>Shipping Fee</p>
//        <p>Free</p>
//       </div>
//       <hr />
//       <div className="cartitems-total-item">
//        <h3>Total</h3>
//        <h3>${getTotalCartAmount()}</h3>
//       </div>
//      </div>
//      <button>PROCEED TO CHECKOUT</button>
//     </div>
//     <div className="cartitems-promocode">
//      <p>If you have a promo code, Enter it here</p>
//      <div className="cartitems-promobox">
//       <input type="text" placeholder="promo code" />
//       <button>Submit</button>
//      </div>
//     </div>
//    </div>
//   </div>
//  );
// };

// export default CartItems;

//===================================

// import React, { useContext } from "react";
// import "./CartItems.css";
// import { ShopContext } from "../../Context/ShopContext";
// import remove_icon from "../Assets/cart_cross_icon.png";
// import axios from "axios";

// const CartItems = () => {
//  const { getTotalCartAmount, products, cartItems, removeFromCart } =
//   useContext(ShopContext);

//  const handleCheckout = async () => {
//   const userId = 1; // Replace with actual user ID
//   const cartItemsArray = products
//    .filter((e) => cartItems[e.id] > 0)
//    .map((e) => ({
//     ProductId: e.id,
//     ProductName: e.name,
//     Price: e.newPrice,
//     Quantity: cartItems[e.id],
//    }));

//   try {
//    const response = await axios.post(
//     //"https://ld3ujozidmopbmvu4dkft6hm3i0gpdrb.lambda-url.us-east-1.on.aws/api/Checkout/proceed",
//     "https://localhost:7142/api/Checkout/proceed",
//     {
//      UserId: userId,
//      CartItems: cartItemsArray,
//     },
//    );

//    alert(`Checkout Successful! Order ID: ${response.data.orderId}`);
//   } catch (error) {
//    console.error("Checkout error:", error);
//    alert("Failed to proceed with checkout.");
//   }
//  };

//  return (
//   <div className="cartitems">
//    <div className="cartitems-format-main">
//     <p>Products</p>
//     <p>Title</p>
//     <p>Price</p>
//     <p>Quantity</p>
//     <p>Total</p>
//     <p>Remove</p>
//    </div>
//    <hr />
//    {products.map((e) => {
//     if (cartItems[e.id] > 0) {
//      return (
//       <div key={e.id}>
//        <div className="cartitems-format cartitems-format-main">
//         <img src={e.image} alt="" className="carticon-product-icon" />
//         <p>{e.name}</p>
//         <p>${e.newPrice}</p>
//         <button className="cartitems-quantity">{cartItems[e.id]}</button>
//         <p>${e.newPrice * cartItems[e.id]}</p>
//         <img
//          className="cartitems-remove-icon"
//          src={remove_icon}
//          onClick={() => {
//           removeFromCart(e.id);
//          }}
//          alt=""
//         />
//        </div>
//        <hr />
//       </div>
//      );
//     }
//     return null;
//    })}
//    <div className="cartitems-down">
//     <div className="cartitems-total">
//      <h1>Cart Totals</h1>
//      <div>
//       <div className="cartitems-total-item">
//        <p>Subtotal</p>
//        <p>${getTotalCartAmount()}</p>
//       </div>
//       <hr />
//       <div className="cartitems-total-item">
//        <p>Shipping Fee</p>
//        <p>Free</p>
//       </div>
//       <hr />
//       <div className="cartitems-total-item">
//        <h3>Total</h3>
//        <h3>${getTotalCartAmount()}</h3>
//       </div>
//      </div>
//      <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
//     </div>
//     <div className="cartitems-promocode">
//      <p>If you have a promo code, enter it here:</p>
//      <div className="cartitems-promobox">
//       <input type="text" placeholder="Promo code" />
//       <button>Submit</button>
//      </div>
//     </div>
//    </div>
//   </div>
//  );
// };

// export default CartItems;

//========================================================
import React, { useContext, useState } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import axios from "axios";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const CartItems = () => {
 const { getTotalCartAmount, products, cartItems, removeFromCart } =
  useContext(ShopContext);

 const [promoCode, setPromoCode] = useState("");
 const [modalOpen, setModalOpen] = useState(false);
 const [orderId, setOrderId] = useState(null);
 const navigate = useNavigate();

 const handlePromoSubmit = async () => {
  try {
   await axios.post("https://localhost:7142/api/Checkout/promocode", {
    promoCode,
    userEmail: "kashimmirza86@gmail.com", // Replace with dynamic user email
    userWhatsApp: "+8801782669276", // Replace with dynamic WhatsApp number
   });
   alert("Promo code sent successfully!");
  } catch (error) {
   console.error("Promo code submission error:", error);
   alert("Failed to send promo code.");
  }
 };

 const handleCheckout = async () => {
  const userId = localStorage.getItem("userId");
  console.log("userid in checkout:", userId);

  if (!userId) {
   alert("User ID not found. Please log in.");
   navigate("/login"); // Navigate to login if not logged in
   return;
  }
  const cartItemsArray = products
   .filter((e) => cartItems[e.productId] > 0)
   .map((e) => ({
    ProductId: e.productId,
    ProductName: e.name,
    Price: e.newPrice,
    Quantity: cartItems[e.productId],
   }));
  const total = cartItemsArray.reduce(
   (sum, item) => sum + item.price * item.quantity,
   0,
  );
  navigate("/checkout", {
   state: {
    CartItemsArray: cartItemsArray,
    total,
    userId,
   },
  });

  //   try {
  //    const response = await axios.post(
  //     "https://localhost:7142/api/Checkout/proceed",
  //     {
  //      UserId: userId,
  //      CartItems: cartItemsArray,
  //     },
  //    );

  //    setOrderId(response.data.orderId);
  //    //navigate("/checkout");
  //    setOrderId(response.data.orderId);

  //    setModalOpen(true); // Open modal on success
  //   } catch (error) {
  //    console.error("Checkout error:", error);
  //    alert("Failed to proceed with checkout.");
  //   }
 };

 return (
  <div className="cartitems">
   <div className="cartitems-format-main">
    <p>Products</p>
    <p>Title</p>
    <p>Price</p>
    <p>Quantity</p>
    <p>Total</p>
    <p>Remove</p>
   </div>
   <hr />
   {products.map((e) => {
    if (cartItems[e.productId] > 0) {
     return (
      <div key={e.productId}>
       <div className="cartitems-format cartitems-format-main">
        <img
         src={e.primaryImages[0]}
         alt=""
         className="carticon-product-icon"
        />
        <p>{e.name}</p>
        <p>${e.newPrice}</p>
        <button className="cartitems-quantity">{cartItems[e.productId]}</button>
        <p>${e.newPrice * cartItems[e.productId]}</p>
        <img
         className="cartitems-remove-icon"
         src={remove_icon}
         onClick={() => {
          removeFromCart(e.productId);
         }}
         alt=""
        />
       </div>
       <hr />
      </div>
     );
    }
    return null;
   })}
   <div className="cartitems-down">
    <div className="cartitems-total">
     <h1>Cart Totals</h1>
     <div>
      <div className="cartitems-total-item">
       <p>Subtotal</p>
       <p>${getTotalCartAmount()}</p>
      </div>
      <hr />
      <div className="cartitems-total-item">
       <p>Shipping Fee</p>
       <p>Free</p>
      </div>
      <hr />
      <div className="cartitems-total-item">
       <h3>Total</h3>
       <h3>${getTotalCartAmount()}</h3>
      </div>
     </div>
     <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
    </div>
    <div className="cartitems-promocode">
     <p>If you have a promo code, enter it here:</p>
     <div className="cartitems-promobox">
      <input
       type="text"
       placeholder="Promo code"
       value={promoCode}
       onChange={(e) => setPromoCode(e.target.value)}
      />
      <button onClick={handlePromoSubmit}>Submit</button>
     </div>
    </div>
   </div>

   {/* Modal for successful checkout */}
   <Modal
    open={modalOpen}
    onClose={() => setModalOpen(false)}
    aria-labelledby="order-success-modal"
    aria-describedby="order-success-details"
   >
    <Box
     sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
      borderRadius: 2,
     }}
    >
     <Typography id="order-success-modal" variant="h6" component="h2">
      🎉 Thank You for Your Order!
     </Typography>
     <Typography id="order-success-details" sx={{ mt: 2 }}>
      Your order ID is <strong>{orderId}</strong>. We hope you enjoy shopping
      with us!
     </Typography>
     <Button
      variant="contained"
      color="primary"
      onClick={() => {
       setModalOpen(false);
       navigate("/"); // Redirect or refresh
      }}
      sx={{ mt: 3 }}
     >
      Continue Shopping
     </Button>
    </Box>
   </Modal>
  </div>
 );
};

export default CartItems;

// import "./CartItems.css";
// import { ShopContext } from "../../Context/ShopContext";

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import axios from "axios";
// import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";

// const CartItems = ({
//  products,
//  cartItems,
//  removeFromCart,
//  getTotalCartAmount,
// }) => {
//  const [promoCode, setPromoCode] = useState("");
//  const [modalOpen, setModalOpen] = useState(false);
//  const [orderId, setOrderId] = useState(null);

//  const navigate = useNavigate(); // Initialize useNavigate

//  const handlePromoSubmit = () => {
//   const whatsappNumber = "14256145171"; // Your WhatsApp number in international format
//   const promoMessage = `I want to redeem promo code: ${promoCode}`;
//   const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
//    promoMessage,
//   )}`;

//   // Open WhatsApp with the promo message
//   window.open(whatsappLink, "_blank");
//  };

//  const handleCheckout = async () => {
//   const userId = localStorage.getItem("userId");
//   console.log("userid in checkout:", userId);

//   if (!userId) {
//    alert("User ID not found. Please log in.");
//    navigate("/login"); // Navigate to login if not logged in
//    return;
//   }
//   console.log("products: in cartitem.js", products);
//   const cartItemsArray = products
//    .filter((e) => cartItems[e.id] > 0)
//    .map((e) => ({
//     ProductId: e.id,
//     ProductName: e.name,
//     Price: e.newPrice,
//     Quantity: cartItems[e.id],
//    }));

//   try {
//    const response = await axios.post(
//     "https://localhost:7142/api/Checkout/proceed", // API for checkout
//     {
//      UserId: userId,
//      CartItems: cartItemsArray,
//     },
//    );

//    setOrderId(response.data.orderId);
//    setModalOpen(true); // Open modal on success
//    navigate("/checkout"); // Redirect to the checkout page after successful checkout
//   } catch (error) {
//    console.error("Checkout error:", error);
//    alert("Failed to proceed with checkout.");
//   }
//  };

//  return (
//   <div className="cartitems">
//    <div className="cartitems-format-main">
//     <p>Products</p>
//     <p>Title</p>
//     <p>Price</p>
//     <p>Quantity</p>
//     <p>Total</p>
//     <p>Remove</p>
//    </div>
//    <hr />
//    {products?.map((e) => {
//     if (cartItems[e.id] > 0) {
//      return (
//       <div key={e.id}>
//        <div className="cartitems-format cartitems-format-main">
//         <img src={e.image} alt="" className="carticon-product-icon" />
//         <p>{e.name}</p>
//         <p>${e.newPrice}</p>
//         <button className="cartitems-quantity">{cartItems[e.id]}</button>
//         <p>${e.newPrice * cartItems[e.id]}</p>
//         <img
//          className="cartitems-remove-icon"
//          src={remove_icon}
//          onClick={() => removeFromCart(e.id)}
//          alt=""
//         />
//        </div>
//        <hr />
//       </div>
//      );
//     }

//     return null;
//    })}
//    <div className="cartitems-down">
//     <div className="cartitems-total">
//      <h1>Cart Totals</h1>
//      <div>
//       <div className="cartitems-total-item">
//        <p>Subtotal</p>
//        <p>${getTotalCartAmount()}</p>
//       </div>
//       <hr />
//       <div className="cartitems-total-item">
//        <p>Shipping Fee</p>
//        <p>Free</p>
//       </div>
//       <hr />
//       <div className="cartitems-total-item">
//        <h3>Total</h3>
//        <h3>${getTotalCartAmount()}</h3>
//       </div>
//      </div>
//      <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>{" "}
//      {/* Checkout Button */}
//     </div>
//     <div className="cartitems-promocode">
//      <p>If you have a promo code, enter it here:</p>
//      <div className="cartitems-promobox">
//       <input
//        type="text"
//        placeholder="Promo code"
//        value={promoCode}
//        onChange={(e) => setPromoCode(e.target.value)}
//       />
//       <button onClick={handlePromoSubmit}>Submit</button>
//      </div>
//     </div>
//    </div>
//    {/* Modal for successful checkout */}
//    <Modal
//     open={modalOpen}
//     onClose={() => setModalOpen(false)}
//     aria-labelledby="order-success-modal"
//     aria-describedby="order-success-details"
//    >
//     <Box
//      sx={{
//       position: "absolute",
//       top: "50%",
//       left: "50%",
//       transform: "translate(-50%, -50%)",
//       width: 400,
//       bgcolor: "background.paper",
//       boxShadow: 24,
//       p: 4,
//       borderRadius: 2,
//      }}
//     >
//      <Typography id="order-success-modal" variant="h6" component="h2">
//       🎉 Thank You for Your Order!
//      </Typography>
//      <Typography id="order-success-details" sx={{ mt: 2 }}>
//       Your order ID is <strong>{orderId}</strong>. We hope you enjoy shopping
//       with us!
//      </Typography>
//      <Button
//       variant="contained"
//       color="primary"
//       onClick={() => {
//        setModalOpen(false);
//        navigate("/"); // Redirect to home after order completion
//       }}
//       sx={{ mt: 3 }}
//      >
//       Continue Shopping
//      </Button>
//     </Box>
//    </Modal>
//   </div>
//  );
// };

// export default CartItems;

//latest edited code for the cartItem
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./CartItems.css";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import { useNavigate } from "react-router-dom";

// import Modal from "@mui/material/Modal";
// //import "./Checkout.css"; // Import the external CSS file for styling

// const Checkout = ({ CartItems = [], total }) => {
//  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
//  const [isLoggedIn, setIsLoggedIn] = useState(false);
//  const [userInfo, setUserInfo] = useState({
//   email: "",
//   password: "",
//  });
//  const navigate = useNavigate();
//  const [shippingAddress, setShippingAddress] = useState({
//   name: "",
//   address: "",
//   city: "",
//   zip: "",
//   country: "",
//   phone: "",
//  });
//  const [showAddressPopup, setShowAddressPopup] = useState(false);
//  const [countries, setCountries] = useState([
//   "USA",
//   "Canada",
//   "Bangladesh",
//   "India",
//  ]);
//  const [marketingConsent, setMarketingConsent] = useState(false);

//  // Check login status using userId in localStorage
//  useEffect(() => {
//   const userId = localStorage.getItem("userId");
//   if (userId) {
//    setIsLoggedIn(true);
//    setUserInfo({
//     email: localStorage.getItem("userEmail"), // Assuming email is stored
//    });
//   }
//  }, []);

//  const handleSignIn = () => {
//   window.location.href = "/loginSignup"; // Redirect to login/signup page
//  };

//  const handleSignOut = () => {
//   localStorage.removeItem("userId");
//   localStorage.removeItem("userEmail");
//   setIsLoggedIn(false);
//   setUserInfo({ email: "", password: "" });
//  };

//  const handleAddressChange = (e) => {
//   const { name, value } = e.target;
//   setShippingAddress({ ...shippingAddress, [name]: value });
//  };

//  const handleCountryChange = (e) => {
//   const { value } = e.target;
//   setShippingAddress({ ...shippingAddress, country: value });

//   // Update phone format based on selected country
//   if (value === "USA") {
//    setShippingAddress({ ...shippingAddress, phone: "+1-" });
//   } else if (value === "Canada") {
//    setShippingAddress({ ...shippingAddress, phone: "+1-" });
//   } else if (value === "Bangladesh") {
//    setShippingAddress({ ...shippingAddress, phone: "+880-" });
//   } else if (value === "India") {
//    setShippingAddress({ ...shippingAddress, phone: "+91-" });
//   }
//  };

//  const handleMarketingConsentChange = (e) => {
//   setMarketingConsent(e.target.checked);
//  };
//  const [promoCode, setPromoCode] = useState("");
//  const [modalOpen, setModalOpen] = useState(false);
//  const [orderId, setOrderId] = useState(null);
//  const handleConfirmOrder = async () => {
//   const userId = localStorage.getItem("userId");
//   setModalOpen(true);

//   // Ensure user is logged in before confirming the order
//   if (!userId) {
//    alert("Please sign in first!");
//    return;
//   }

//   const orderData = {
//    userId,
//    totalAmount: total,
//    deliveryMethod,
//    addressLine1: shippingAddress.address,
//    addressLine2: "", // You can add a second address line if necessary
//    city: shippingAddress.city,
//    state: "", // Add state field if necessary
//    postalCode: shippingAddress.zip,
//    country: shippingAddress.country,
//    phone: shippingAddress.phone,
//    marketingConsent,
//   };

//   try {
//    const response = await axios.post(
//     "https://localhost:7142/api/Checkout/saveCheckout",
//     orderData,
//    );
//    console.log("Order Confirmed: ", response.data);
//    alert("Order has been placed successfully!");
//   } catch (error) {
//    console.error("Error confirming order: ", error);
//    alert("Failed to place the order. Please try again.");
//   }
//  };

//  return (
//   <div className="checkout-container">
//    {/* Header */}
//    <header className="checkout-header">
//     <h1>Checkout</h1>
//    </header>

//    {/* Top Left Login Section */}
//    <div className="auth-section">
//     {isLoggedIn ? (
//      <span>Welcome, {userInfo.email}</span>
//     ) : (
//      <button className="btn" onClick={handleSignIn}>
//       Login / Sign Up
//      </button>
//     )}
//     {isLoggedIn && (
//      <button className="btn" onClick={handleSignOut}>
//       Sign Out
//      </button>
//     )}
//    </div>

//    {/* Delivery Method Selection */}
//    <div className="delivery-method">
//     <h3>Choose Delivery Method:</h3>
//     <div className="delivery-option">
//      <label>
//       <input
//        type="radio"
//        name="deliveryMethod"
//        value="pickup"
//        checked={deliveryMethod === "pickup"}
//        onChange={(e) => setDeliveryMethod(e.target.value)}
//       />
//       Pickup
//      </label>
//      <label>
//       <input
//        type="radio"
//        name="deliveryMethod"
//        value="ship"
//        checked={deliveryMethod === "ship"}
//        onChange={(e) => {
//         setDeliveryMethod(e.target.value);
//         setShowAddressPopup(true);
//        }}
//       />
//       Ship
//      </label>
//     </div>
//    </div>

//    {/* Shipping Address Popup */}
//    {showAddressPopup && deliveryMethod === "ship" && (
//     <div className="address-popup">
//      <h3>Enter Shipping Address:</h3>
//      <div className="address-inputs">
//       <input
//        type="text"
//        name="name"
//        placeholder="Full Name"
//        value={shippingAddress.name}
//        onChange={handleAddressChange}
//       />
//       <input
//        type="text"
//        name="address"
//        placeholder="Address"
//        value={shippingAddress.address}
//        onChange={handleAddressChange}
//       />
//       <input
//        type="text"
//        name="city"
//        placeholder="City"
//        value={shippingAddress.city}
//        onChange={handleAddressChange}
//       />
//       <input
//        type="text"
//        name="zip"
//        placeholder="ZIP Code"
//        value={shippingAddress.zip}
//        onChange={handleAddressChange}
//       />
//       <select
//        name="country"
//        value={shippingAddress.country}
//        onChange={handleCountryChange}
//       >
//        {countries.map((country, index) => (
//         <option key={index} value={country}>
//          {country}
//         </option>
//        ))}
//       </select>
//       <input
//        type="tel"
//        name="phone"
//        placeholder="Phone Number"
//        value={shippingAddress.phone}
//        onChange={handleAddressChange}
//       />
//       <button onClick={() => setShowAddressPopup(false)} className="btn">
//        Save Address
//       </button>
//      </div>
//     </div>
//    )}

//    {/* Marketing Consent Section */}
//    <div className="marketing-consent">
//     <input
//      type="checkbox"
//      name="marketingConsent"
//      checked={marketingConsent}
//      onChange={handleMarketingConsentChange}
//     />
//     <label htmlFor="marketingConsent">Email me with news and offers</label>
//    </div>

//    {/* Order Summary */}
//    <div className="order-summary">
//     <h3>Order Summary:</h3>
//     <ul className="cart-items">
//      {Array.isArray(CartItems) && CartItems.length > 0 ? (
//       CartItems.map((item, index) => (
//        <li key={index} className="cart-item">
//         <span className="item-name">{item.name}</span>
//         <span className="item-quantity">
//          {item.quantity} x ${item.price}
//         </span>
//        </li>
//       ))
//      ) : (
//       <li>No items in the cart</li>
//      )}
//     </ul>
//     <div className="total">
//      <h4>Total: ${total}</h4>
//     </div>
//    </div>

//    {/* Confirm Order Button */}
//    <div className="confirm-order-btn">
//     <button className="btn" onClick={handleConfirmOrder}>
//      Confirm Order
//     </button>
//    </div>
//    {/* Modal for successful checkout */}
//    <Modal
//     open={modalOpen}
//     onClose={() => setModalOpen(false)}
//     aria-labelledby="order-success-modal"
//     aria-describedby="order-success-details"
//    >
//     <Box
//      sx={{
//       position: "absolute",
//       top: "50%",
//       left: "50%",
//       transform: "translate(-50%, -50%)",
//       width: 400,
//       bgcolor: "background.paper",
//       boxShadow: 24,
//       p: 4,
//       borderRadius: 2,
//      }}
//     >
//      <Typography id="order-success-modal" variant="h6" component="h2">
//       🎉 Thank You for Your Order!
//      </Typography>
//      <Typography id="order-success-details" sx={{ mt: 2 }}>
//       Your order ID is <strong>{orderId}</strong>. We hope you enjoy shopping
//       with us!
//      </Typography>
//      <Button
//       variant="contained"
//       color="primary"
//       onClick={() => {
//        setModalOpen(false);
//        navigate("/"); // Redirect to home after order completion
//       }}
//       sx={{ mt: 3 }}
//      >
//       Continue Shopping
//      </Button>
//     </Box>
//    </Modal>
//   </div>
//  );
// };

// export default Checkout;

//latest merging one
// import React, { useContext, useState } from "react";
// import { ShopContext } from "../../Context/ShopContext";
// import remove_icon from "../Assets/cart_cross_icon.png";
// import axios from "axios";
// import Modal from "@mui/material/Modal";
// import {
//  Box,
//  Typography,
//  Button,
//  TextField,
//  Radio,
//  RadioGroup,
//  FormControlLabel,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import "./CartItems.css";

// const CartItems = () => {
//  const navigate = useNavigate();
//  const { getTotalCartAmount, products, cartItems, removeFromCart } =
//   useContext(ShopContext);

//  const [promoCode, setPromoCode] = useState("");
//  const [modalOpen, setModalOpen] = useState(false);
//  const [orderId, setOrderId] = useState(null);
//  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
//  const [shippingAddress, setShippingAddress] = useState({
//   name: "",
//   address: "",
//   city: "",
//   zip: "",
//   country: "",
//  });
//  const [showAddressPopup, setShowAddressPopup] = useState(false);

//  const handlePromoSubmit = () => {
//   const whatsappNumber = "14256145171"; // Your WhatsApp number in international format
//   const promoMessage = `I want to redeem promo code: ${promoCode}`;
//   const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
//    promoMessage,
//   )}`;

//   // Open WhatsApp with the promo message
//   window.open(whatsappLink, "_blank");
//  };

//  const handleCheckout = async () => {
//   const userId = localStorage.getItem("userId");
//   if (!userId) {
//    alert("User ID not found. Please log in.");
//    return;
//   }

//   const cartItemsArray = products
//    .filter((e) => cartItems[e.id] > 0)
//    .map((e) => ({
//     ProductId: e.id,
//     ProductName: e.name,
//     Price: e.newPrice,
//     Quantity: cartItems[e.id],
//    }));

//   try {
//    const response = await axios.post(
//     "https://localhost:7142/api/Checkout/proceed",
//     {
//      UserId: userId,
//      CartItems: cartItemsArray,
//     },
//    );
//    setOrderId(response.data.orderId);
//    setModalOpen(true); // Open modal on success
//   } catch (error) {
//    console.error("Checkout error:", error);
//    alert("Failed to proceed with checkout.");
//   }
//  };

//  const handleAddressChange = (e) => {
//   const { name, value } = e.target;
//   setShippingAddress({ ...shippingAddress, [name]: value });
//  };

//  return (
//   <div className="cartitems">
//    <div className="cartitems-format-main">
//     <p>Products</p>
//     <p>Title</p>
//     <p>Price</p>
//     <p>Quantity</p>
//     <p>Total</p>
//     <p>Remove</p>
//    </div>
//    <hr />
//    {products.map((e) => {
//     if (cartItems[e.id] > 0) {
//      return (
//       <div key={e.id}>
//        <div className="cartitems-format cartitems-format-main">
//         <img src={e.image} alt="" className="carticon-product-icon" />
//         <p>{e.name}</p>
//         <p>${e.newPrice}</p>
//         <button className="cartitems-quantity">{cartItems[e.id]}</button>
//         <p>${e.newPrice * cartItems[e.id]}</p>
//         <img
//          className="cartitems-remove-icon"
//          src={remove_icon}
//          onClick={() => removeFromCart(e.id)}
//          alt=""
//         />
//        </div>
//        <hr />
//       </div>
//      );
//     }
//     return null;
//    })}

//    <div className="cartitems-down">
//     <div className="cartitems-total">
//      <h1>Cart Totals</h1>
//      <div>
//       <div className="cartitems-total-item">
//        <p>Subtotal</p>
//        <p>${getTotalCartAmount()}</p>
//       </div>
//       <hr />
//       <div className="cartitems-total-item">
//        <p>Shipping Fee</p>
//        <p>Free</p>
//       </div>
//       <hr />
//       <div className="cartitems-total-item">
//        <h3>Total</h3>
//        <h3>${getTotalCartAmount()}</h3>
//       </div>
//      </div>
//      <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
//     </div>

//     <div className="cartitems-promocode">
//      <p>If you have a promo code, enter it here:</p>
//      <div className="cartitems-promobox">
//       <input
//        type="text"
//        placeholder="Promo code"
//        value={promoCode}
//        onChange={(e) => setPromoCode(e.target.value)}
//       />
//       <button onClick={handlePromoSubmit}>Submit</button>
//      </div>
//     </div>
//    </div>

//    {/* Delivery Method and Shipping Address */}
//    <div className="checkout-container">
//     <div className="delivery-method">
//      <h3>Choose Delivery Method:</h3>
//      <RadioGroup
//       value={deliveryMethod}
//       onChange={(e) => {
//        setDeliveryMethod(e.target.value);
//        if (e.target.value === "ship") setShowAddressPopup(true);
//        else setShowAddressPopup(false);
//       }}
//      >
//       <FormControlLabel value="pickup" control={<Radio />} label="Pickup" />
//       <FormControlLabel value="ship" control={<Radio />} label="Ship" />
//      </RadioGroup>
//     </div>

//     {showAddressPopup && deliveryMethod === "ship" && (
//      <div className="address-popup">
//       <h3>Enter Shipping Address:</h3>
//       <TextField
//        label="Full Name"
//        name="name"
//        value={shippingAddress.name}
//        onChange={handleAddressChange}
//        fullWidth
//       />
//       <TextField
//        label="Address"
//        name="address"
//        value={shippingAddress.address}
//        onChange={handleAddressChange}
//        fullWidth
//       />
//       <TextField
//        label="City"
//        name="city"
//        value={shippingAddress.city}
//        onChange={handleAddressChange}
//        fullWidth
//       />
//       <TextField
//        label="ZIP Code"
//        name="zip"
//        value={shippingAddress.zip}
//        onChange={handleAddressChange}
//        fullWidth
//       />
//       <TextField
//        label="Country"
//        name="country"
//        value={shippingAddress.country}
//        onChange={handleAddressChange}
//        fullWidth
//       />
//       <Button
//        onClick={() => setShowAddressPopup(false)}
//        variant="contained"
//        color="primary"
//       >
//        Save Address
//       </Button>
//      </div>
//     )}
//    </div>

//    {/* Modal for successful checkout */}
//    <Modal
//     open={modalOpen}
//     onClose={() => setModalOpen(false)}
//     aria-labelledby="order-success-modal"
//     aria-describedby="order-success-details"
//    >
//     <Box
//      sx={{
//       position: "absolute",
//       top: "50%",
//       left: "50%",
//       transform: "translate(-50%, -50%)",
//       width: 400,
//       bgcolor: "background.paper",
//       boxShadow: 24,
//       p: 4,
//       borderRadius: 2,
//      }}
//     >
//      <Typography id="order-success-modal" variant="h6" component="h2">
//       🎉 Thank You for Your Order!
//      </Typography>
//      <Typography id="order-success-details" sx={{ mt: 2 }}>
//       Your order ID is <strong>{orderId}</strong>. We hope you enjoy shopping
//       with us!
//      </Typography>
//      <Button
//       variant="contained"
//       color="primary"
//       onClick={() => {
//        setModalOpen(false);
//        navigate("/");
//       }}
//       sx={{ mt: 3 }}
//      >
//       Continue Shopping
//      </Button>
//     </Box>
//    </Modal>
//   </div>
//  );
// };

// export default CartItems;
