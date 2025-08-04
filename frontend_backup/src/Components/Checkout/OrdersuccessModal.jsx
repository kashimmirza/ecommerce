/** @format */

import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, Grid, Paper } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useSpring, animated } from "react-spring"; // For animation

import "./OrderSuccessModal.css"; // Import the CSS file

const OrderSuccessModal = () => {
 const [modalOpen, setModalOpen] = useState(true);
 const navigate = useNavigate();
 const location = useLocation();
 const orderId = location.state?.orderId;

 useEffect(() => {
  setModalOpen(true);
 }, []);

 const handleContinueShopping = () => {
  setModalOpen(false); // Close the modal first
  // Wait for the modal to close before navigating
  setTimeout(() => {
   navigate("/"); // Redirect to the home page after a short delay
  }, 500); // Adjust the delay as needed
 };

 return (
  <Modal
   open={modalOpen}
   onClose={() => setModalOpen(false)}
   aria-labelledby="order-success-modal"
   aria-describedby="order-success-details"
  >
   <Box className="modal-container">
    {/* Banner Section */}
    <Paper className="banner">
     <Typography variant="h5" className="banner-text">
      🎉 Congratulations! Your Order is Confirmed 🎉
     </Typography>
    </Paper>

    {/* Animated Gift Box */}
    <animated.div className="gif-container">
     <img
      src="/path-to-your-gift-box-image.png" // Replace with your own gift box image
      alt="Gift Box"
      className="gif-image"
     />
    </animated.div>

    {/* Order Details */}
    <Typography variant="h6" component="h2" className="order-details">
     Your order ID is <strong>{orderId}</strong>.
    </Typography>

    <Typography variant="body1" className="order-message">
     We're preparing your order and it will be shipped to your address soon.
     Thank you for choosing us!
    </Typography>

    {/* Promotional Section */}
    <Grid container spacing={2} justifyContent="center">
     <Grid item xs={12} md={6}>
      <Paper className="promotional-paper">
       <Typography variant="h6" className="promotional-header">
        Special Offer Just for You!
       </Typography>
       <Typography variant="body2" className="promotional-body">
        Use code <strong>WELCOME10</strong> to get 10% off your next purchase.
       </Typography>
       <Typography variant="body2">
        Don't miss out! Hurry, the offer expires soon.
       </Typography>
      </Paper>
     </Grid>

     <Grid item xs={12} md={6}>
      <Paper className="promotional-paper">
       <Typography variant="h6" className="promotional-header">
        Free Shipping on Orders Over $50!
       </Typography>
       <Typography variant="body2">
        We love our customers. Get free shipping on your next purchase when you
        spend over $50.
       </Typography>
      </Paper>
     </Grid>
    </Grid>

    {/* Call to Action */}
    <Button
     variant="contained"
     color="primary"
     className="button-container"
     onClick={handleContinueShopping}
    >
     Continue Shopping
    </Button>
   </Box>
  </Modal>
 );
};

export default OrderSuccessModal;
