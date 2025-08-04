/** @format */

import React from "react";
import { Button, Box, Typography, styled } from "@mui/material";
import { useStripe } from "@stripe/react-stripe-js";
import LanguageIcon from "@mui/icons-material/Language"; // Using a generic bank icon for demonstration
import { SvgIcon } from "@mui/material";

// Custom icon for a generic bank (you can replace with a more specific one if needed)
const BankIcon = (props) => (
 <SvgIcon {...props} viewBox="0 0 24 24">
  <path d="M12 2L2 22h20L12 2zm0 3.86L18.82 20H5.18L12 3.86zM11 10h2v7h-2z" />
 </SvgIcon>
);

const PayWithStripeButton = styled(Button)(({ theme }) => ({
 backgroundColor: "#6772e5", // Stripe's primary color
 color: "white",
 padding: "15px 30px",
 border: "none",
 borderRadius: "5px",
 fontSize: "18px",
 cursor: "pointer",
 transition: "background-color 0.3s ease",
 display: "flex",
 alignItems: "center",
 justifyContent: "center",
 margin: "30px auto", // Center the button with some margin
 "&:hover": {
  backgroundColor: "#5469d4",
 },
}));

const BankLogoGrid = styled(Box)(({ theme }) => ({
 display: "grid",
 gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", // Responsive grid for bank logos
 gap: theme.spacing(2),
 marginTop: theme.spacing(3),
 marginBottom: theme.spacing(3),
}));

const BankLogoItem = styled(Button)(({ theme }) => ({
 display: "flex",
 flexDirection: "column",
 alignItems: "center",
 padding: theme.spacing(2),
 border: `1px solid ${theme.palette.divider}`,
 borderRadius: theme.shape.borderRadius,
 textAlign: "center",
 transition: "transform 0.2s, box-shadow 0.2s",
 "&:hover": {
  transform: "translateY(-3px)",
  boxShadow: theme.shadows[4],
  backgroundColor: theme.palette.action.hover,
 },
 "& img": {
  maxWidth: "80px",
  maxHeight: "40px",
  marginBottom: theme.spacing(1),
 },
}));

const NetBankingTabContent = () => {
 const stripe = useStripe();

 const handleStripeNetBanking = async () => {
  if (!stripe) {
   console.error("Stripe.js has not loaded yet.");
   return;
  }

  try {
   // **IMPORTANT:** Replace '/create-checkout-session' with your actual backend endpoint.
   // This endpoint should securely create a Stripe Checkout Session
   // with payment_method_types set to include 'us_bank_account' (for ACH)
   // or other relevant bank redirect methods like 'ideal', 'sofort', 'giropay' etc.
   // based on your target region.
   const response = await fetch(
    "http://localhost:4242/create-checkout-session",
    {
     // Use your backend URL
     method: "POST",
     headers: {
      "Content-Type": "application/json",
     },
     body: JSON.stringify({
      amount: 2500, // Example: $25.00 (in cents/smallest unit)
      currency: "usd", // Or 'eur', 'inr', etc.
      // You can also pass product IDs or other order details here
     }),
    },
   );

   const session = await response.json();

   if (session.error) {
    console.error("Error creating Checkout Session:", session.error);
    alert(`Payment initiation failed: ${session.error}`);
    return;
   }

   // Redirect to Stripe Checkout
   const result = await stripe.redirectToCheckout({
    sessionId: session.id,
   });

   if (result.error) {
    console.error("Error redirecting to Checkout:", result.error.message);
    alert(`Error: ${result.error.message}`);
   }
  } catch (error) {
   console.error("Failed to initiate Stripe Checkout:", error);
   alert("Could not initiate payment. Please try again later.");
  }
 };

 // Example list of banks. In a real scenario, these might come from an API,
 // or you might let Stripe Checkout handle the bank selection entirely.
 // For "Net Banking" experience, often specific banks are listed.
 const popularBanks = [
  {
   name: "Bank A",
   logo: "https://www.svgrepo.com/show/305263/bank-banking-currency.svg",
  },
  {
   name: "Bank B",
   logo: "https://www.svgrepo.com/show/305263/bank-banking-currency.svg",
  },
  {
   name: "Bank C",
   logo: "https://www.svgrepo.com/show/305263/bank-banking-currency.svg",
  },
  {
   name: "Bank D",
   logo: "https://www.svgrepo.com/show/305263/bank-banking-currency.svg",
  },
  {
   name: "Bank E",
   logo: "https://www.svgrepo.com/show/305263/bank-banking-currency.svg",
  },
  // Add more bank logos/names as needed for your region
 ];

 return (
  <Box sx={{ p: 3 }}>
   <Typography variant="body1" sx={{ mb: 2 }}>
    Pay directly from your bank account using Stripe's secure payment gateway.
   </Typography>

   <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
    Popular Banks
   </Typography>
   <BankLogoGrid>
    {popularBanks.map((bank, index) => (
     <BankLogoItem
      key={index}
      onClick={() =>
       alert(`You clicked on ${bank.name}. Payment would proceed via Stripe.`)
      }
     >
      <img src={bank.logo} alt={`${bank.name} Logo`} />
      <Typography variant="body2">{bank.name}</Typography>
     </BankLogoItem>
    ))}
   </BankLogoGrid>

   <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
    Click 'Proceed to Bank Payment' to be redirected to Stripe's secure page
    where you can select your bank and complete the transaction.
   </Typography>

   <PayWithStripeButton onClick={handleStripeNetBanking}>
    <BankIcon sx={{ mr: 1 }} /> {/* Using a generic bank icon */}
    Proceed to Bank Payment
   </PayWithStripeButton>

   <Typography
    variant="caption"
    color="text.secondary"
    sx={{ display: "block", mt: 1 }}
   >
    *Actual bank selection will happen on Stripe's secure checkout page.
   </Typography>
  </Box>
 );
};

export default NetBankingTabContent;
