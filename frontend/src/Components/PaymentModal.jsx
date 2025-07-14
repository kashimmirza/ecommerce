/** @format */
// import React, { useState, useEffect } from "react";
// import {
//  Modal,
//  Box,
//  Typography,
//  Tabs,
//  Tab,
//  Button,
//  Grid,
//  Paper,
//  SvgIcon,
//  AppBar,
//  Toolbar,
//  IconButton,
// } from "@mui/material";
// import { styled } from "@mui/system";
// import CloseIcon from "@mui/icons-material/Close"; // Material-UI Close Icon
// import AccessTimeIcon from "@mui/icons-material/AccessTime"; // Material-UI Clock Icon
// import LanguageIcon from "@mui/icons-material/Language"; // Material-UI Language Icon

// // --- Styled Components (replacing some original CSS or for custom elements) ---

// const StyledModalContainer = styled(Box)(({ theme }) => ({
//  textAlign: "center",
//  position: "relative",
//  paddingTop: theme.spacing(7.5), // Roughly 60px
//  outline: "none", // Remove focus outline on modal
// }));

// const StyledModalContent = styled(Paper)(({ theme }) => ({
//  position: "relative",
//  maxWidth: 600, // Max width for the modal content
//  margin: "0 auto", // Center the modal
//  padding: theme.spacing(3),
//  borderRadius: theme.shape.borderRadius,
//  boxShadow: theme.shadows[5],
//  outline: "none",
//  [theme.breakpoints.down("sm")]: {
//   margin: theme.spacing(2), // Smaller margin on small screens
//  },
// }));

// const LoadingBarFixed = styled(Box)(({ theme }) => ({
//  position: "absolute", // Changed to absolute within modal for better context
//  top: 0,
//  left: 0,
//  width: "100%",
//  height: 4,
//  backgroundColor: theme.palette.primary.main, // Using primary theme color
//  zIndex: theme.zIndex.modal + 1, // Ensure it's above other modal content
// }));

// const TimerContainer = styled(Box)(({ theme }) => ({
//  display: "flex",
//  alignItems: "center",
//  justifyContent: "center",
//  gap: theme.spacing(0.5), // 5px gap
//  position: "absolute",
//  top: theme.spacing(2),
//  left: theme.spacing(2),
//  color: theme.palette.text.secondary,
//  fontSize: "1.2em",
//  fontWeight: "bold",
// }));

// const EasyLangSwitch = styled(Box)(({ theme }) => ({
//  position: "absolute",
//  top: theme.spacing(1.25), // 10px
//  zIndex: theme.zIndex.modal + 2,
//  "& img": {
//   width: 24, // Adjust size for icons
//   height: 24,
//  },
// }));

// const LogoWrap = styled(Box)({
//  display: "flex",
//  justifyContent: "center",
//  alignItems: "center",
//  marginBottom: (theme) => theme.spacing(1.25), // 10px
// });

// const ClientLogoInner = styled(Box)({
//  display: "flex",
//  justifyContent: "center",
//  alignItems: "center",
// });

// const SslTokenMenu = styled("ul")({
//  display: "flex",
//  justifyContent: "space-around",
//  padding: 0,
//  margin: 0,
//  listStyle: "none",
//  width: "100%", // Ensure it takes full width for spacing
// });

// const SslTokenMenuItem = styled("li")({
//  flexGrow: 1,
//  textAlign: "center",
// });

// const HeaderIconWrap = styled(Box)({
//  width: 25,
//  height: 25,
//  display: "flex",
//  justifyContent: "center",
//  alignItems: "center",
//  marginBottom: (theme) => theme.spacing(0.625), // 5px
//  "& svg path, & svg ellipse": {
//   fill: "#1d1e22", // Default fill color for SVG paths
//  },
// });

// const PaymentItemMobileList = styled("ul")(({ theme }) => ({
//  display: "flex",
//  flexWrap: "wrap",
//  justifyContent: "center",
//  padding: 0,
//  listStyle: "none",
//  marginTop: theme.spacing(2), // Add some top margin
// }));

// const PaymentItemMobileListItem = styled("li")(({ theme }) => ({
//  flex: "0 0 calc(33.333% - 20px)", // 3 items per row, with some margin
//  maxWidth: "calc(33.333% - 20px)",
//  margin: theme.spacing(1.25), // 10px margin
//  boxSizing: "border-box",
//  textAlign: "center",
//  position: "relative",
//  [theme.breakpoints.down("sm")]: {
//   flex: "0 0 calc(50% - 20px)", // 2 items per row on small screens
//   maxWidth: "calc(50% - 20px)",
//  },
// }));

// const PaymentItemMobileLink = styled(Button)(({ theme }) => ({
//  display: "block", // Make the whole area clickable
//  padding: theme.spacing(1.25), // 10px padding
//  border: `1px solid ${theme.palette.divider}`, // Example border
//  borderRadius: theme.shape.borderRadius,
//  textDecoration: "none",
//  color: theme.palette.text.primary,
//  transition: theme.transitions.create(["transform", "box-shadow"], {
//   duration: theme.transitions.duration.shortest,
//  }),
//  "&:hover": {
//   transform: "translateY(-3px)", // Lift effect on hover
//   boxShadow: theme.shadows[4], // Subtle shadow on hover
//   backgroundColor: theme.palette.action.hover,
//  },
// }));

// const MobBankNameImage = styled("img")({
//  maxWidth: "80%",
//  height: "auto",
//  display: "block",
//  margin: "0 auto",
// });

// const LazyFelixDownloadButton = styled(IconButton)(({ theme }) => ({
//  position: "absolute",
//  bottom: theme.spacing(0.625), // 5px
//  right: theme.spacing(0.625), // 5px
//  padding: 0,
//  lineHeight: 1,
//  color: theme.palette.grey[600], // Adjust color
//  "&:hover": {
//   backgroundColor: "transparent",
//   color: theme.palette.grey[900],
//  },
// }));

// const CardSaveMsg = styled(Typography)(({ theme }) => ({
//  fontStyle: "italic",
//  color: theme.palette.text.secondary,
//  padding: theme.spacing(1.25), // 10px
//  border: `1px dashed ${theme.palette.divider}`,
//  borderRadius: theme.shape.borderRadius,
//  display: "inline-block",
//  marginTop: theme.spacing(2),
// }));

// // --- Custom SVG Icon Components (to use with MUI's SvgIcon) ---

// const SupportIcon = (props) => (
//  <SvgIcon {...props} viewBox="0 0 476 476">
//   <path d="M400.9,181v-18.3c0-43.8-15.5-84.5-43.6-114.7C328.5,17,288.9,0,245.6,0h-15.1c-43.2,0-82.8,17-111.6,48c-28.1,30.2-43.6,70.9-43.6,114.7V181c-34.1,2.3-61.2,30.7-61.2,65.4V275c0,36.1,29.4,65.5,65.5,65.5h36.9c6.6,0,12-5.4,12-12V192.8c0-6.6-5.4-12-12-12H99.3v-18.1C99.3,83.6,155.8,24,230.4,24h15.1c74.8,0,131.1,59.6,131.1,138.7v18.1h-17.2c-6.6,0-12,5.4-12,12v135.6c0,6.6,5.4,12,12,12h16.8c-4.9,62.6-48,77.1-68,80.4c-5.5-16.9-21.4-29.1-40.1-29.1h-30c-23.2,0-42.1,18.9-42.1,42.1s18.9,42.2,42.1,42.2h30.1c19.4,0,35.7-13.2,40.6-31c9.8-1.4,25.3-4.9,40.7-13.9c21.7-12.7,47.4-38.6,50.8-90.8c34.3-2.1,61.5-30.6,61.5-65.4v-28.6C462,211.7,435,183.2,400.9,181z M104.8,316.4H79.8c-22.9,0-41.5-18.6-41.5-41.5v-28.6c0-22.9,18.6-41.5,41.5-41.5h24.9V316.4z M268.2,452h-30.1c-10,0-18.1-8.1-18.1-18.1s8.1-18.1,18.1-18.1h30.1c10,0,18.1,8.1,18.1,18.1S278.2,452,268.2,452z M438,274.9c0,22.9-18.6,41.5-41.5,41.5h-24.9V204.8h24.9c22.9,0,41.5,18.6,41.5,41.5V274.9z" />
//  </SvgIcon>
// );

// const FaqIcon = (props) => (
//  <SvgIcon {...props} viewBox="0 0 612 612">
//   <path d="M230.724,181.208c-2.393,2.587-3.95,4.256-5.119,5.508C227.775,184.379,230.724,181.208,230.724,181.208z" />
//   <path d="M336.962,200.875c7.956,9.792,11.906,21.337,11.906,34.634c0,9.514-2.727,18.666-8.151,27.512c-2.977,5.007-6.898,9.848-11.795,14.465l-16.301,16.107c-15.634,15.356-25.732,28.958-30.35,40.865c-4.618,11.878-6.927,27.54-6.927,46.957h36.275c0-17.108,1.947-30.044,5.814-38.807c3.866-8.763,12.323-19.444,25.37-32.102c17.942-17.387,29.849-30.572,35.746-39.53s8.874-20.641,8.874-35.051c0-23.756-8.039-43.285-24.146-58.585c-16.106-15.3-37.526-22.922-64.288-22.922c-28.931,0-51.686,8.929-68.266,26.789s-24.87,41.449-24.87,70.797h36.275c0.667-17.665,3.478-31.184,8.346-40.559c8.679-16.83,24.369-25.259,47.068-25.259C315.875,186.187,329.033,191.083,336.962,200.875z" />
//   <path d="M612,306C612,137.004,474.995,0,306,0C137.004,0,0,137.004,0,306c0,168.995,137.004,306,306,306C474.995,612,612,474.995,612,306z M27.818,306C27.818,152.36,152.36,27.818,306,27.818S584.182,152.36,584.182,306S459.64,584.182,306,584.182S27.818,459.64,27.818,306z" />
//   <rect height="42.367" width="40.559" x="274.51" y="415.214" />
//  </SvgIcon>
// );

// const OffersIcon = (props) => (
//  <SvgIcon {...props} viewBox="0 0 384.1 384.1">
//   <path d="M344,80.1h-72c17.2-18.8,16.8-48-1.6-66c-18.8-18.8-49.2-18.8-67.6,0c-6.8,6.8-13.6,17.2-18.4,29.2c-4.8-12-11.6-22.4-18.4-29.2c-8.8-9.2-21.2-14-34-14s-24.8,4.8-34,14s-14,21.2-14,34c0,12,4.4,23.2,12.4,32H40c-22,0-40,18-40,40v32c0,10.4,6.8,19.2,16,22.8c0,0.4,0,0.8,0,1.2v168c0,22.8,23.2,40,44,40h268c22,0,40-18,40-40V174.9c9.6-3.6,16-12.4,16-22.8v-32C384,98.1,366,80.1,344,80.1z M214.1,25.3c12.4-12.4,32.8-12.4,45.2,0s12.4,32.8,0,45.2c-3.2,3.2-7.2,6-10.8,8.4c-0.8,0.4-1.2,0.8-2,1.6H192c0.8-1.2,1.2-2.8,1.2-4C192.9,59.3,204.1,35.3,214.1,25.3z M109.7,24.9c6-6,14-9.2,22.4-9.2s16.4,3.2,22.4,9.2c10,10,21.2,34,20.8,50.4c0,1.6,0.4,2.8,1.2,4h-54c-0.4,0-1.2-0.4-2.4-1.2c-4-2-7.6-4.8-10.4-8C97.2,57.7,97.2,37.3,109.7,24.9z M176.1,368.1h-116c-12.8,0-28-10.8-28-24v-168h144V368.1z M368,152.1c0,4.4-3.2,7.2-6.4,8c0,0-0.4,0-0.4,0.4c-0.4,0-0.8,0-1.2,0c-4.4,0-8,3.6-8,8v176c0,13.2-10.8,24-24,24H192V176.1h80c4.4,0,8-3.6,8-8s-3.6-8-8-8h-80v-36c0-4.4-3.6-8-8-8s-8,3.6-8,8v36H24c-4.4,0-8-3.6-8-8v-32c0-13.2,10.8-24,24-24h304c13.2,0,24,10.8,24,24V152.1z" />
//   <path d="M320,160.1h-12c-4.4,0-8,3.6-8,8s3.6,8,8,8h12c4.4,0,8-3.6,8-8C328,163.7,324.5,160.1,320,160.1z" />
//  </SvgIcon>
// );

// const LoginIcon = (props) => (
//  <SvgIcon {...props} viewBox="0 0 384.1 384.1">
//   <path d="M136.2,165.5c-3.5,0-6.4,2.9-6.4,6.4v38.4c0,3.5,2.9,6.4,6.4,6.4s6.4-2.9,6.4-6.4v-38.4C142.6,168.4,139.9,165.5,136.2,165.5z" />
//   <path d="M317,185.4h-95.9l20.9-20.9c2.2-2.2,2.2-5.7,0-7.8c-2.2-2.1-5.7-2.1-7.8,0l-30.4,30.4c-0.2,0.2-0.3,0.4-0.4,0.5l-0.1,0.2c-0.1,0.2-0.3,0.4-0.5,0.7l-0.1,0.2c-0.3,0.7-0.5,1.4-0.5,2.3l0,0.6l0,0.1c0.1,0.6,0.2,1.1,0.4,1.6c0.2,0.5,0.6,1.1,1.1,1.7l30.3,30.3c1,1,2.5,1.6,4,1.6c1.5,0,2.9-0.6,4-1.6c2.1-2.2,2.1-5.7,0-7.8l-20.9-20.9H317c3.1,0,5.5-2.5,5.5-5.5C322.5,187.9,320.1,185.4,317,185.4z" />
//   <path d="M147.9,0.8L87.3,25c-17.1,6.3-23.4,14.9-23.4,31.5v268.8c0,16.7,6.4,25.3,23.2,31.5l60.8,24.4c3,1.1,6,1.7,9,1.7c12.9,0,22.1-10.7,22.1-25.5V24.6C179.1,6.5,164.5-5.5,147.9,0.8z M166.4,357.5c0,7.6-3.7,12.8-9.4,12.8c-1.4,0-2.9-0.2-4.3-0.8l-60.8-24.3c-12-4.5-15-8.3-15-19.6V56.7c0-11.3,3-15.2,15.2-19.6l60.4-24.2c1.6-0.6,3-0.8,4.5-0.8c5.7,0,9.4,5.2,9.4,12.8V357.5L166.4,357.5z" />
//   <path d="M313.6,253c-3.5,0-6.4,2.9-6.4,6.4v66.1c0,10.6-8.7,19.3-19.3,19.3h-89.6c-3.5,0-6.4,2.9-6.4,6.4s2.9,6.4,6.4,6.4H288c17.7,0,32-14.3,32-32v-66.1C320,255.9,317.1,253,313.6,253z" />
//   <path d="M197.6,37.4H288c10.6,0,19.3,8.7,19.3,19.3v65.9c0,3.5,2.9,6.4,6.4,6.4s6.4-2.9,6.4-6.4V56.5c0-17.7-14.3-32-32-32h-90.4c-3.5,0-6.4,2.9-6.4,6.4C191.1,34.6,193.9,37.4,197.6,37.4z" />
//  </SvgIcon>
// );

// const LazyFelixIcon = (props) => (
//  <SvgIcon {...props} viewBox="0 0 27 25">
//   <path
//    d="M13.4518 13.0377C11.4186 12.7365 6.4864 16.878 5.39453 21.7726V22.0362C5.48795 24.1899 7.75902 24.9194 10.9292 24.0316C13.0111 23.1639 14.1728 23.1375 16.125 24.0316C17.9698 25.1612 20.41 23.7051 20.643 22.0362C20.3191 18.4517 16.3154 13.1956 13.4518 13.0377Z"
//    fill="#7A7A7A"
//    fillOpacity="0.7"
//   ></path>
//   <ellipse
//    cx="4.85476"
//    cy="11.946"
//    rx="2.97265"
//    ry="4.24369"
//    transform="rotate(-21.5283 4.85476 11.946)"
//    fill="#7A7A7A"
//    fillOpacity="0.7"
//   ></ellipse>
//   <ellipse
//    cx="22.0599"
//    cy="13.5489"
//    rx="2.97265"
//    ry="4.24369"
//    transform="rotate(22.9527 22.0599 13.5489)"
//    fill="#7A7A7A"
//    fillOpacity="0.7"
//   ></ellipse>
//   <ellipse
//    cx="10.1354"
//    cy="5.66514"
//    rx="2.92739"
//    ry="4.7215"
//    transform="rotate(-9.76985 10.1354 5.66514)"
//    fill="#7A7A7A"
//    fillOpacity="0.7"
//   ></ellipse>
//   <ellipse
//    cx="17.552"
//    cy="5.95842"
//    rx="2.92739"
//    ry="4.7215"
//    transform="rotate(14.6303 17.552 5.95842)"
//    fill="#7A7A7A"
//    fillOpacity="0.7"
//   ></ellipse>
//  </SvgIcon>
// );

// // --- Component Definition ---

// // We now accept 'open' and 'onClose' props from the parent
// const PaymentModal = ({ open, onClose }) => {
//  const [activeTab, setActiveTab] = useState("mobileBanking"); // Use descriptive IDs
//  const [timeLeft, setTimeLeft] = useState(4 * 60 + 19); // 4 minutes 19 seconds

//  useEffect(() => {
//   // Only start the timer if the modal is open
//   if (!open) return;

//   // This effect handles the countdown timer
//   const timer = setInterval(() => {
//    setTimeLeft((prevTime) => {
//     if (prevTime <= 0) {
//      clearInterval(timer);
//      // Optionally, close the modal or show an expired message when time runs out
//      onClose(); // Close the modal if the timer expires
//      return 0;
//     }
//     return prevTime - 1;
//    });
//   }, 1000);

//   return () => clearInterval(timer); // Cleanup on component unmount
//  }, [open]); // Re-run effect when 'open' prop changes

//  const formatTime = (seconds) => {
//   const minutes = Math.floor(seconds / 60);
//   const remainingSeconds = seconds % 60;
//   return `<span class="math-inline">\{minutes\.toString\(\)\.padStart\(2, "0"\)\}\:</span>{remainingSeconds
//       .toString()
//       .padStart(2, "0")}`;
//  };

//  const handleTabChange = (event, newValue) => {
//   setActiveTab(newValue);
//  };

//  const handleLinkClick = (e, action) => {
//   e.preventDefault(); // Prevent default link behavior
//   console.log(`Link clicked: ${action}`);
//   // In a real app, you'd trigger actual functionality here
//   if (action === "Cancel") {
//    onClose(); // Use the onClose prop to close the modal
//   }
//  };

//  const handlePaymentOptionClick = (e, provider) => {
//   e.preventDefault();
//   console.log(`Payment option clicked: ${provider}`);
//   // Here you would navigate to the payment page or open a payment form
//   // After a successful payment or navigation, you'd typically call onClose()
//   // For now, let's just close the modal for demonstration
//   // onClose();
//  };

//  const paymentOptions = [
//   {
//    name: "Bkash",
//    src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/bkash.png",
//   },
//   {
//    name: "Nagad",
//    src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/nagad.png",
//   },
//   {
//    name: "Upay",
//    src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/upay.png",
//   },
//   {
//    name: "Cellfin",
//    src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/cellfin.png",
//   },
//   {
//    name: "IBBL Mobile",
//    src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/ibblmobile.png",
//   },
//   {
//    name: "Pocket",
//    src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/pocket.png",
//   },
//   {
//    name: "Deshipay",
//    src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/deshipay.png",
//   },
//   {
//    name: "Pathao Pay",
//    src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/pathaopay-logo.svg",
//   },
//   {
//    name: "Rainbow",
//    src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/rainbow.png",
//   },
//   {
//    name: "Mobile Money",
//    src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/mobilemoney.png",
//   },
//   {
//    name: "OK Wallet",
//    src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/okwallet.png",
//   },
//  ];

//  return (
//   <Modal
//    // Use the 'open' prop from the parent
//    open={open}
//    // Use the 'onClose' prop from the parent
//    onClose={onClose}
//    aria-labelledby="payment-modal-title"
//    aria-describedby="payment-modal-description"
//    sx={{
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//    }}
//   >
//    <StyledModalContainer>
//     <StyledModalContent>
//      {/* Loading Bar */}
//      <LoadingBarFixed />

//      {/* Header Section */}
//      <AppBar
//       position="static"
//       color="transparent"
//       elevation={0}
//       sx={{ position: "relative", mb: 2 }}
//      >
//       <Toolbar sx={{ justifyContent: "space-between", padding: 0 }}>
//        <TimerContainer>
//         <AccessTimeIcon />
//         <Typography variant="body1">
//          <span className="count-down">{formatTime(timeLeft)}</span>s
//         </Typography>
//        </TimerContainer>

//        <Box>
//         <EasyLangSwitch sx={{ right: "14px" }}>
//          <IconButton
//           aria-label="cancel transaction"
//           // Call onClose directly
//           onClick={onClose}
//           size="small"
//          >
//           <CloseIcon />
//          </IconButton>
//         </EasyLangSwitch>
//         <EasyLangSwitch sx={{ right: "50px" }}>
//          <IconButton aria-label="change language" size="small">
//           <LanguageIcon /> {/* Using a generic language icon */}
//           {/* If you need the exact image, you can use:
//                               <img alt="translation" src="assets/checkout_assets/img/translation_en.png" />
//                              */}
//          </IconButton>
//         </EasyLangSwitch>
//        </Box>
//       </Toolbar>
//      </AppBar>

//      <LogoWrap>
//       <ClientLogoInner>
//        {/* Client Logo - replace with an actual image source or MUI Avatar */}
//        <img
//         alt="Client Logo"
//         src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAGQAAAAmCAYAAAAycj4zAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAI0UlEQVRoge2be3BTVR7Hn/fvR5M2adIn5VFaitAiRVocyohUtgVBEFZgXWVnfeysM+647NTxsbquqyzugjgio+OIj1FHd32BSJGHiwjyEhRUEIaHgG3B0iZp0jRJnzzP7xwuVtqkvXbIKj5/Jefc++HnnXvPOfce59ybC/nFTRAYAtc1K6aa3ATh++x/pOHBwIML+7FBc6gRSyEkZkmSkDEkyUoYkGSlDkoyUIUlGypAkI2VIkpEyJMlIGZJkpAxJMlKGJBkpQ5KMlCFJRsqQJCNlSJKRMiTJSBmSZKgudQL9xX7jXFRmMx0HvsS7d/+lTueHEYTvPovid2Wi/A16t4YMXfwAuqJh3QcWRcIOJ+079uBYsx4xFB6QfPuKfcEctAX5nHvx9aQ3RGXNoOC+RYiRCBG3B98XXxFxe7DUVtPwyDK5trsAmoI89MWFPXagHzEc88RKLLXVHP39HWI40pjy/0LE5ca9dQcxfwDj5aNJGz8WMRxGjEYTtL1OWb5DR3C++768QUY6mbOmox2cj/HyUiw1V+Na/8HAHsFPkJjPRywQjJvzwUegVJJeVZmg69WQYOMZnGvWJ5Q739tA6YY3EZRKtIMH9djeMu0aDCOL6TzdkGCsqaIcc9UEoj4/zateSaizXleLbvgwBEGg85tG2jZuwbN9d8Kci0LAUjMFy7RqNHm5RDt8tG/fTesba4gFgzKpoFZhnVlLxtVVqHOyiPkD+D4/ROuL7xL69nxC/gq9HtucGZirKlHZMom2e/HuO4DjrbVE2tySLmvhfNSZ1h7HwfPx7njugHffd9Or/9CRBG2/FnUxFJYGJthwpkdd+qQJWKZPpX3n3gRDDGWXkbVwPmGnSzJEUCooeKCOzNnTZVp9SRGWmil4tu3k9P2LZQNtmz8bpcEg06eVl5FePYkTd9QR64xr1bZMClcswTCyWKY1jhmN7YZZnLr3Ydp37ZPKdUMLKFzxGNpBefLY48Zgnzebr++6D//IsYAmzpqGrnBot2MQbnXSWnPJrPY7RhfRqiG5IAfYF18vKBLUGy7RqBJWKYOMZ3Fu2XXRnP0TO3QslMzo+P4irfjNiJIJl6mTMk64kfXIV1pk1ON5ZJ7VRGgwEjp7A8c46xHAY66zppJWXYSwbhW3e9bS8+gYIAsOWPYxhZDFiJIpz7ft0HPgStdWCbf71aAflMfQxhzgy7xbCLQ4UOi2FTy5BOyiPWGcQx1tr8R85hiYvB/uNc1FnWhm2/FGO3PBbYv4Ano924v/qqJRTWkU5mpwsABqXPEG03XvRY9CvIYZRJRhGlXRbF/MHaFq6UjoD/1cUBgNZN88HwLN9N6fu/gtiNAaAa90mcm5fSOD413i27ZK1Cxw/ybFb/kAsGAKgbeOHXLb6ZTS52aSNLaXl1TcwV1ViHDMagIZHlsrWPFf9Zkpefw5NTha2udfx7bMvYZ1Rg7YgH0SRk4v+jHffAUnftulDRv5rFZpsO5baapxr1nP26Repen1xIZba6njs9Zulqepi6dWQiKed0JlvE8o1udmoLBkUrlhC0z/WyM7Y/mIcXYLCoAPoPm5l yWc9p fn5V7dt2r/9YlkBkAsFMJ/8Ci a3GwEtRoAU8W4rsiYphnAcVVeYIci3RBsxPKCuL4+jQxTrzFiZTsZz+FGnGUkY2tknW2MKxSOH770fQqgm3Omi6P3fRph/gBw+w7tvLt28vSSAXFAnx6u7EvmAP+X+6gbeNW/nc8IUpyWnTp0rvXiG8Y7+XnxRcYv3LdhgLXGa/oMpmMML3CYYt1ZnHpHu/VJJOu+/fcpJrWqMfX+2+oGHToAhiNwefPIfvT+4RSK/ZRMxXnKnB2/w6lQJvVAmqvrmNxR+hss1RnLB3Z50u/N4ItDhShpqUnqbowOaOqV+QwwYLtrnRp0yck4tB+nTpVSVeoQuflVhnEHK5FKtOnFJFz2xQAuOp34fl4T79y7ddzLHWWjexb450jSkRcbRdEjYcNN8e3kswxjWS7NQUh5j1yFQChLk3g2NcEG5oAyK+7E02tqaRXmk0UPbuctuH+cIvFtv3LOqOECCtl+HetgN/0m+MHt30XGNZOxTL0KX9c29PzJoNDr0BcX0rZxi6T37t2Pbe5MTOPj8uvayAWViiH/vQdBrSbc4qBp+TN9zlEe3WpRGVXUdo8TlYmCALKjHSErkF3f7STcKsTlTVD0mjycuGzL3Ct/4Cs3yxAodUy4pVncG/eStQfIH3SleiGDwXiiyqAGIvR+M/nGP5UfKt52Vsv4d27HzEcJq2iHFW6GVNFOZ2nvqH13+v6dJD+w0dxrduI9bppWGqmYKoop+OzL0CpwDS+PD5FiSJpl5fi3roD99YdeD/5DNOEK7Df+EvSq6/C9/khFAYdpopyFDodusIhON5Zh+/gYXJuuxl9SREQv3pGvPCUrH/Xhv/w7iK3vr0aotBqUGh7uOERRdxbP6bhb/FnMVGPl6i3A6UpDduca3HVb6LzdAMNjz7O4AfqUKWzcc2bLQvhfG8DjtX10nfvnk85dfdDFDxYhzrTSvrkiVJdzB/g7NPP99mM8zQsfoJIewf2X81BZckgY+pkqS7scNG0bCXurTukYzt590MU3LcI67VT0WTb0dROkfTBprM0Ll6O7+BhDCOLyb7111Kd0mxCaTbJ+u7tpvFChO7+sGOqHJcQ9PvEOoN0njhJqLlFVj7onruk+xbH6vr4/BsKo8nPxTrtGnTDhiCoVYSaz+HZtouO/V92G1+h02KumoC+qBCUCoKnG/Hs2CNbJM0TK1EY9ARPNxA4cUrW3lg2CnW2nYjTlfDHIXWWDfPESrT5ucRCYQLHTtC++1PEUIju0BbkY7pyPJpsO7FAJ/7DR+NXbtdzKH1JUXyL3AvBxjMEjp7oVXOebg3pL8o0I8WrnkQ/YjgAZ554hpbX3h6o8D8LBvQFVbTDx/HfLcK5dgOh5hYcqxOfg6XonQG9Qr6P0mgg6vP/GKF/0vxor3BTZvSP/wK6zEBMS+b7eAAAAABJRU5ErkJggg=="
//        />
//       </ClientLogoInner>
//      </LogoWrap>

//      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
//       Blucheez
//      </Typography>

//      {/* Top Navigation Menu */}
//      <SslTokenMenu>
//       <SslTokenMenuItem>
//        <Button
//         variant="text"
//         color="inherit"
//         startIcon={
//          <HeaderIconWrap>
//           <SupportIcon />
//          </HeaderIconWrap>
//         }
//         onClick={(e) => handleLinkClick(e, "Support")}
//        >
//         Support
//        </Button>
//       </SslTokenMenuItem>
//       <SslTokenMenuItem>
//        <Button
//         variant="text"
//         color="inherit"
//         startIcon={
//          <HeaderIconWrap>
//           <FaqIcon />
//          </HeaderIconWrap>
//         }
//         onClick={(e) => handleLinkClick(e, "FAQ")}
//        >
//         FAQ
//        </Button>
//       </SslTokenMenuItem>
//       <SslTokenMenuItem>
//        <Button
//         variant="text"
//         color="inherit"
//         startIcon={
//          <HeaderIconWrap>
//           <OffersIcon />
//          </HeaderIconWrap>
//         }
//         onClick={(e) => handleLinkClick(e, "Offers")}
//        >
//         Offers
//        </Button>
//       </SslTokenMenuItem>
//       <SslTokenMenuItem>
//        <Button
//         variant="text"
//         color="inherit"
//         startIcon={
//          <HeaderIconWrap>
//           <LoginIcon />
//          </HeaderIconWrap>
//         }
//         onClick={(e) => handleLinkClick(e, "Login")}
//        >
//         Login
//        </Button>
//       </SslTokenMenuItem>
//      </SslTokenMenu>

//      {/* Payment Options Tabs */}
//      <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 3 }}>
//       <Tabs
//        value={activeTab}
//        onChange={handleTabChange}
//        aria-label="Payment options tabs"
//        centered
//       >
//        <Tab label="Cards" value="cards" />
//        <Tab label="Mobile Banking" value="mobileBanking" />
//        <Tab label="Net Banking" value="netBanking" />
//       </Tabs>
//      </Box>

//      <Box
//       sx={{
//        minHeight: "250px",
//        display: "flex",
//        width: "100%",
//        flexDirection: "column",
//       }}
//      >
//       {/* Tab Content for Cards */}
//       {activeTab === "cards" && (
//        <Box sx={{ p: 3 }}>
//         <Typography>Card payment options will appear here.</Typography>
//        </Box>
//       )}

//       {/* Tab Content for Mobile Banking */}
//       {activeTab === "mobileBanking" && (
//        <Box sx={{ p: 3 }}>
//         <Box sx={{ mb: 2 }}>
//          <CardSaveMsg variant="body2">
//           Please login to show your saved wallets
//          </CardSaveMsg>
//         </Box>
//         <PaymentItemMobileList>
//          {paymentOptions.map((option, index) => (
//           <PaymentItemMobileListItem key={option.name}>
//            <PaymentItemMobileLink
//             onClick={(e) => handlePaymentOptionClick(e, option.name)}
//            >
//             <MobBankNameImage alt={option.name} src={option.src} />
//             {/* Only add download button if not Pathao Pay (as it didn't have one in original) */}
//             {option.name !== "Pathao Pay" && (
//              <LazyFelixDownloadButton aria-label="download">
//               <LazyFelixIcon />
//              </LazyFelixDownloadButton>
//             )}
//            </PaymentItemMobileLink>
//           </PaymentItemMobileListItem>
//          ))}
//         </PaymentItemMobileList>
//        </Box>
//       )}

//       {/* Tab Content for Net Banking */}
//       {activeTab === "netBanking" && (
//        <Box sx={{ p: 3 }}>
//         <Typography>Net Banking options will appear here.</Typography>
//        </Box>
//       )}
//      </Box>
//     </StyledModalContent>
//    </StyledModalContainer>
//   </Modal>
//  );
// };

// export default PaymentModal;
//latest good one may be

// import React, { useState, useEffect } from "react";
// import {
//  Modal,
//  Box,
//  Typography,
//  IconButton,
//  Tabs,
//  Tab,
//  Paper,
//  Grid,
//  Button,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import SupportIcon from "@mui/icons-material/Support";
// import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
// import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
// import LoginIcon from "@mui/icons-material/Login";
// import ClockIcon from "@mui/icons-material/WatchLater"; // Using WatchLater for a clock icon

// // --- Sub-components ---

// // Header Component
// const ModalHeader = ({ onClose, companyName, companyLogo, timer }) => {
//  return (
//   <Box
//    sx={{
//     textAlign: "center",
//     padding: "20px 0",
//     position: "relative",
//     borderBottom: "1px solid #eee",
//    }}
//   >
//    {/* Timer */}
//    {timer && (
//     <Box
//      sx={{
//       position: "absolute",
//       top: "15px",
//       left: "15px",
//       display: "flex",
//       alignItems: "center",
//       gap: "5px",
//      }}
//     >
//      <ClockIcon sx={{ fontSize: 20, color: "#555" }} />
//      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//       {timer.minutes.toString().padStart(2, "0")}:
//       {timer.seconds.toString().padStart(2, "0")}s
//      </Typography>
//     </Box>
//    )}

//    {/* Close Button */}
//    <IconButton
//     onClick={onClose}
//     sx={{
//      position: "absolute",
//      top: "10px",
//      right: "10px",
//      zIndex: 1,
//     }}
//    >
//     <CloseIcon />
//    </IconButton>

//    {/* Language Switch (Simplified) */}
//    <IconButton
//     sx={{
//      position: "absolute",
//      top: "10px",
//      right: "50px", // Adjust position
//      zIndex: 1,
//     }}
//     title="Switch Language"
//    >
//     {/* Placeholder for language icon/image */}
//     <img
//      src="https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/flag_en.png"
//      alt="English"
//      style={{ width: "24px", height: "24px" }}
//     />
//    </IconButton>

//    {/* Company Logo and Name */}
//    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//     {companyLogo && (
//      <img
//       src={companyLogo}
//       alt={companyName}
//       style={{ maxWidth: "100px", marginBottom: "10px" }}
//      />
//     )}
//     <Typography variant="h5" component="h4" sx={{ fontWeight: "bold", mb: 2 }}>
//      {companyName}
//     </Typography>
//    </Box>

//    {/* Navigation Menu */}
//    <Box sx={{ display: "flex", justifyContent: "center", gap: "20px", mt: 2 }}>
//     <Button startIcon={<SupportIcon />} size="small" sx={{ color: "#1d1e22" }}>
//      Support
//     </Button>
//     <Button
//      startIcon={<HelpOutlineIcon />}
//      size="small"
//      sx={{ color: "#1d1e22" }}
//     >
//      FAQ
//     </Button>
//     <Button
//      startIcon={<CardGiftcardIcon />}
//      size="small"
//      sx={{ color: "#1d1e22" }}
//     >
//      Offers
//     </Button>
//     <Button startIcon={<LoginIcon />} size="small" sx={{ color: "#1d1e22" }}>
//      Login
//     </Button>
//    </Box>
//   </Box>
//  );
// };

// // Payment Option Card
// const PaymentOptionCard = ({ name, logoSrc, onClick }) => {
//  return (
//   <Grid
//    item
//    xs={6}
//    sm={4}
//    md={3}
//    sx={{ display: "flex", justifyContent: "center", p: 1 }}
//   >
//    <Paper
//     elevation={1}
//     sx={{
//      width: "100%",
//      maxWidth: "120px", // Fixed width for smaller cards
//      padding: "10px",
//      textAlign: "center",
//      cursor: "pointer",
//      "&:hover": {
//       boxShadow: "0 0 8px rgba(0,0,0,0.2)",
//      },
//     }}
//     onClick={onClick}
//    >
//     <img
//      src={logoSrc}
//      alt={name}
//      style={{
//       maxWidth: "100%",
//       height: "auto",
//       maxHeight: "60px",
//       objectFit: "contain",
//      }}
//     />
//     <Typography variant="caption" display="block" mt={1}>
//      {name}
//     </Typography>
//    </Paper>
//   </Grid>
//  );
// };

// // Main Payment Modal Component
// const PaymentModal = ({ open, onClose }) => {
//  const [activeTab, setActiveTab] = useState(0); // 0 for Cards, 1 for Mobile Banking, 2 for Net Banking
//  const [timer, setTimer] = useState({ minutes: 4, seconds: 19 });

//  useEffect(() => {
//   if (!open) return; // Don't run timer if modal is closed

//   const countdown = setInterval(() => {
//    setTimer((prevTimer) => {
//     let { minutes, seconds } = prevTimer;
//     if (seconds > 0) {
//      seconds--;
//     } else {
//      if (minutes > 0) {
//       minutes--;
//       seconds = 59;
//      } else {
//       clearInterval(countdown);
//       // Optionally, handle timer expiry (e.g., close modal, show message)
//       return { minutes: 0, seconds: 0 };
//      }
//     }
//     return { minutes, seconds };
//    });
//   }, 1000);

//   return () => clearInterval(countdown); // Cleanup on unmount or modal close
//  }, [open]);

//  const handleTabChange = (event, newValue) => {
//   setActiveTab(newValue);
//  };

//  // Dummy data for payment options
//  const mobileBankingOptions = [
//   {
//    name: "bKash",
//    logo: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/bkash.png",
//   },
//   {
//    name: "Nagad",
//    logo: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/nagad.png",
//   },
//   {
//    name: "Upay",
//    logo: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/upay.png",
//   },
//   {
//    name: "CellFin",
//    logo: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/cellfin.png",
//   },
//   {
//    name: "IBBL Mobile",
//    logo:
//     "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/ibblmobile.png",
//   },
//   {
//    name: "Pocket",
//    logo: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/pocket.png",
//   },
//   {
//    name: "DeshiPay",
//    logo: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/deshipay.png",
//   },
//   {
//    name: "Pathao Pay",
//    logo:
//     "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/pathaopay-logo.svg",
//   },
//   {
//    name: "Rainbow",
//    logo: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/rainbow.png",
//   },
//   {
//    name: "Mobile Money",
//    logo:
//     "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/mobilemoney.png",
//   },
//   {
//    name: "OK Wallet",
//    logo: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/okwallet.png",
//   },
//  ];

//  const handlePaymentOptionClick = (optionName) => {
//   alert(`You selected ${optionName}`);
//   // In a real application, you would proceed with the payment
//   onClose(); // Close modal after selection for demonstration
//  };

//  return (
//   <Modal
//    open={open}
//    onClose={onClose}
//    aria-labelledby="payment-modal-title"
//    aria-describedby="payment-modal-description"
//    sx={{
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//    }}
//   >
//    <Box
//     sx={{
//      width: { xs: "95%", sm: "80%", md: "60%", lg: "50%" },
//      bgcolor: "background.paper",
//      borderRadius: 2,
//      boxShadow: 24,
//      overflow: "hidden",
//      display: "flex",
//      flexDirection: "column",
//      maxHeight: "90vh",
//      outline: "none", // Remove focus outline
//     }}
//    >
//     {/* Header */}
//     <ModalHeader
//      onClose={onClose}
//      companyName="Blucheez"
//      companyLogo="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAmCAYAAAAycj4zAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAI0UlEQVRoge2be3BTVR7HPzfvR5M2adIn5VFaitAiRVocyohUtgVBEFZgXWVnfeysM+647NTxsbquqyzugjgio+OIj1FHd32BSJGHiwjyEhRUEIaHgG3B0iZp0jRJ87z7R8rVS1rSutyi5vfHnHO+5/n9nu/5nu+ce+9NhP3jpooMAFrbLprpbeoOgP+o/0hDw4MDLPyPByJThYISOWSYJCMkyUgZkmSkDEkyUoYkGSlDkoyUIUlGypAkI2VIkpEyJMlIGZJkpAxJMlKGJBkpQ5KMlCFJRsqQJCNlSJKRMiTJSBmSZKgudQX9xf7jXFRmOxyHvsS79/+lueXHYQzve/DqodnU+gJ9W8NGDv8AXXQo6/4wogxRdDjv3rMPjbfqkcPoA8m7V+4L96AmwP/Yy6+nvRGHPgOG+RYhQiLC98UXxDxebDUVtPwkDN/NrsAmgI/+MWF/HahHjsc8sdJmLbXVP/dHWL40pjw/0LElcf1dQcxPwDjpeNJOz8WYzCMGI0nbXs5y/c5OYLv+fXRF2TImtqG9nAxn2NUsZJk+hrv/gcAewU/wWJ+HzFARu7OBx+AUkl51haDrtZNgYk+x7tmfUP4/l4GqG5cQ9Fq0g4f02N4y7RrMEo0p/P2QoKxpozxzFsSiPj9LqvVpY76vH12w4AgUPi8RjSdvAPbNn81xLg0BqylVgiWbdNo8nIpfvhf37Xv+tsYQywcVs0AsWmdWcvFVG6nO2iLkH/g+PkTn2+8S+vbMhLwVeg3z+ZzMsWpUtpGmbNPt/n0HwzDXWmrsGpuFpehwXjUmdbew+Do+P+6C+9336d3/61GCtn8TNRFUlgQm2/BmR536pBZYpk+lfdfeCMIMZa+QtdA+YadLcnRQAqKHgjoxZ07V6Xo1CSKtpmJdu3f+fsXTQbF2zZ/N+XBIJO/NKy+iXv0iJd9TReQxr1WrcgkcswQKy2CqNY5Zje3Gc7i652Ha9+6TyuqGFnC4YjD0gHz62OPGY583m6/vug//kWMAYM6ajq7gYrdjEG51kuLzaz2O0YX0aohuiQH2BdPjyQS1Bcu0agSVimDjGdzLtyl3RHP+JndsoiZnR8fxNXfGZETJgsUybkTJkuOpeZCr7HMqMZxYJuqgMRjInDuB4511iOAw1lXXSCsuwlpuFLZ91tLzXQAEgGPpGMaIopxxygmdwL/3R0CPj39B079t/g+fQj9kPnyv0R7kyK1+Dha6B4qMDr0AS8UwcsxjjC2mEusMa9XT+b+ZgyK3BvuNc3BnaRm2/FGO3PDbYv4APgDpxv/VVyKptIpyNDlZADQvmCLabs9Fj0KvhhhnkmgQVtJsXcwfoGnptHQG/q8pDAayb54PAGu371P3/g0xmsIAcK1bRO7NixLY+F+PbfukW3IHDwtKAHC5YgrbVp9JkptN6mRaaXt9HxvIrqqyDjHGBAwNLZXtea76zRS9v49JpytbnW/l22dfwjojB2xBPoiKjl70Z777Dkj6Nlq/jR/PqHSb3mprcK1Zz9mnHnR/3iMpvNRYR47Pq5L19Dwi4rRjB/8NlM98o7BkELhiCc3/WCETnTv7i3F0CYoAA/O4H8vGPFOO5uVf7bpt176rEsmsAFgohv/wUXS52QhqNQAmieIsXWMcxfDEJiqrEsMQO27mYvjSuryvjYwHOjHNuMUsM2tmpvz/QjTjqCMpaYuqQglFf/s+hEJOuNWpwv3j+zSE8AOHtO/by7YNLUkoF5QK8uvuxL5hDv0/3aBt45Y+d3whSlOa9Dl0rvXiG0a7+WnyBQu/FFuhwDrjFz2GUplMMr3CoMc6s6ZHvdJklH3PvuUmaY1q/Hvfpiophz63AMRoDO+eT7EvmINCr0czKI+I05WoO39DqlEn1Amqrq5jcVHobLNUZywd2edLvTfCLQ4poaalK4n6A7J6hU5DLBgm6vF06eMnRCzQSdOylQlXq0KnJdYZJHyuRSrTlxSRc9tNALjqN+H5eE+/cu3Xsyx1lo3sW+OdI4pEXG0XRI2HDTfHt5LGMaNkuxVBoyZ9chUAoS5N4NjXBBuaAMivuxNNbrakV5pNFD27nIL7F8nKLxbP9q51RxAwlpfh3rINV/2m+MBt30XGNZOxTL0KX9c29PzJoNDr0BcX0rZxi6T37t2Pbe5MTOPH4uvayAWViiF/vQdBrSbc4qBp+TN9zvE8vV4hGdVXYdp8TlYmCALKjHSErkF3f7STcKsTlTVD0mjycuGzL3Ct/4Cs3yxAodUy4pVncG/eStQfIH3SleiGDwXiiyqAGIvR+M+nGP5UfKt52Vsv4d27HzEcJq2iHFW6GVNFOZ2nvqH132v6dJD+w0dxrduI9bppWGqmYKoop+OzL0CpwDS+PD5FiSJpl5fi3roD99YdeD/5DNOEK7Df+EvSq6/C9/khFAYdpopyFDodusIhON5Zh+/gYXJuuxl9SREQv3pGvPCUrH/Xhv9w7iK3vr0aotBqUGh7uOERRdxbP6bhb/FnMVGPl6i3A6UpDduca3HVb6LzdAMNjz7O4AfqUKXbsc2bLQvhfG8DjtX10nfvnk85dfdDFDxYhzrTSvrkiVJdzB/g7NPP99mM8zQsfoJIewf2X81BZckgY+pkqS7scNG0bCXurTukYzt590MU3LcI67VT0WTb0dROkfTBprM0Ll6O7+BhDCOLyb7111Kd0mzCaTbJ+u7tpvFChO7+sGOqHJcQ9PvEOoN0njhJqLlFVj7onruk+xbH6vr4/BsKo8nPxTrtGnTDhiCoVYSaz+HZtouO/V92G1+h02KumoC+qBCUCoKnG/Hs2CNbJM0TK1EY9ARPNxA4cUrW3lg2CnW2nYjTlfDHIXWWDfPESrT5ucRCYQLHTtC++1PEUIju0BbkY7pyPJpsO7FAJ/7DR+NXbtdzKH1JUXyL3AvBxjMEjp7oVXOebg3pL8o0I8WrnkQ/YjgAZ554hpbX3h6o8D8LBvQFVbTDx/HfLcK5dgOh5hYcqxOfg6XonQG9Qr6P0mgg6vP/GKF/0vxor3BTZvSP/wK6zEBMS+b7eAAAAABJRU5ErkJggg=="
//      timer={timer}
//     />

//     {/* Tab Navigation */}
//     <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//      <Tabs
//       value={activeTab}
//       onChange={handleTabChange}
//       aria-label="Payment Methods"
//       centered
//      >
//       <Tab label="Cards" />
//       <Tab label="Mobile Banking" />
//       <Tab label="Net Banking" />
//      </Tabs>
//     </Box>

//     {/* Payment Options Content */}
//     <Box sx={{ flexGrow: 1, overflowY: "auto", p: 3, minHeight: "250px" }}>
//      {activeTab === 0 && (
//       <Box sx={{ textAlign: "center", py: 4 }}>
//        <Typography variant="h6" color="text.secondary">
//         Card payment options will appear here.
//        </Typography>
//        {/* You would implement your card input forms here */}
//       </Box>
//      )}

//      {activeTab === 1 && (
//       <Box>
//        <Typography
//         variant="body2"
//         color="text.secondary"
//         sx={{ mb: 2, textAlign: "center" }}
//        >
//         Please login to show your saved wallets
//        </Typography>
//        <Grid container spacing={2}>
//         {mobileBankingOptions.map((option) => (
//          <PaymentOptionCard
//           key={option.name}
//           name={option.name}
//           logoSrc={option.logo}
//           onClick={() => handlePaymentOptionClick(option.name)}
//          />
//         ))}
//        </Grid>
//       </Box>
//      )}

//      {activeTab === 2 && (
//       <Box sx={{ textAlign: "center", py: 4 }}>
//        <Typography variant="h6" color="text.secondary">
//         Net Banking options will appear here.
//        </Typography>
//        {/* You would implement net banking options here */}
//       </Box>
//      )}
//     </Box>
//    </Box>
//   </Modal>
//  );
// };

// export default PaymentModal;

// import React, { useState, useEffect } from "react";

// import {
//  Modal,
//  Box,
//  Typography,
//  Tabs,
//  Tab,
//  Button,
//  Grid,
//  Paper,
//  SvgIcon,
//  AppBar,
//  Toolbar,
//  IconButton,
// } from "@mui/material";

// import { styled } from "@mui/system";

// import CloseIcon from "@mui/icons-material/Close"; // Material-UI Close Icon

// import AccessTimeIcon from "@mui/icons-material/AccessTime"; // Material-UI Clock Icon

// import LanguageIcon from "@mui/icons-material/Language"; // Material-UI Language Icon

// // --- Styled Components (replacing some original CSS or for custom elements) ---

// const StyledModalContainer = styled(Box)(({ theme }) => ({
//  textAlign: "center",

//  position: "relative",

//  paddingTop: theme.spacing(7.5), // Roughly 60px

//  outline: "none", // Remove focus outline on modal
// }));

// const StyledModalContent = styled(Paper)(({ theme }) => ({
//  position: "relative",

//  maxWidth: 600, // Max width for the modal content

//  margin: "0 auto", // Center the modal

//  padding: theme.spacing(3),

//  borderRadius: theme.shape.borderRadius,

//  boxShadow: theme.shadows[5],

//  outline: "none",

//  [theme.breakpoints.down("sm")]: {
//   margin: theme.spacing(2), // Smaller margin on small screens
//  },
// }));

// const LoadingBarFixed = styled(Box)(({ theme }) => ({
//  position: "absolute", // Changed to absolute within modal for better context

//  top: 0,

//  left: 0,

//  width: "100%",

//  height: 4,

//  backgroundColor: theme.palette.primary.main, // Using primary theme color

//  zIndex: theme.zIndex.modal + 1, // Ensure it's above other modal content
// }));

// const TimerContainer = styled(Box)(({ theme }) => ({
//  display: "flex",

//  alignItems: "center",

//  justifyContent: "center",

//  gap: theme.spacing(0.5), // 5px gap

//  position: "absolute",

//  top: theme.spacing(2),

//  left: theme.spacing(2),

//  color: theme.palette.text.secondary,

//  fontSize: "1.2em",

//  fontWeight: "bold",
// }));

// const EasyLangSwitch = styled(Box)(({ theme }) => ({
//  position: "absolute",

//  top: theme.spacing(1.25), // 10px

//  zIndex: theme.zIndex.modal + 2,

//  "& img": {
//   width: 24, // Adjust size for icons

//   height: 24,
//  },
// }));

// const LogoWrap = styled(Box)({
//  display: "flex",

//  justifyContent: "center",

//  alignItems: "center",

//  marginBottom: (theme) => theme.spacing(1.25), // 10px
// });

// const ClientLogoInner = styled(Box)({
//  display: "flex",

//  justifyContent: "center",

//  alignItems: "center",
// });

// const SslTokenMenu = styled("ul")({
//  display: "flex",

//  justifyContent: "space-around",

//  padding: 0,

//  margin: 0,

//  listStyle: "none",

//  width: "100%", // Ensure it takes full width for spacing
// });

// const SslTokenMenuItem = styled("li")({
//  flexGrow: 1,

//  textAlign: "center",
// });

// const HeaderIconWrap = styled(Box)({
//  width: 25,

//  height: 25,

//  display: "flex",

//  justifyContent: "center",

//  alignItems: "center",

//  marginBottom: (theme) => theme.spacing(0.625), // 5px

//  "& svg path, & svg ellipse": {
//   fill: "#1d1e22", // Default fill color for SVG paths
//  },
// });

// const PaymentItemMobileList = styled("ul")(({ theme }) => ({
//  display: "flex",

//  flexWrap: "wrap",

//  justifyContent: "center",

//  padding: 0,

//  listStyle: "none",

//  marginTop: theme.spacing(2), // Add some top margin
// }));

// const PaymentItemMobileListItem = styled("li")(({ theme }) => ({
//  flex: "0 0 calc(33.333% - 20px)", // 3 items per row, with some margin

//  maxWidth: "calc(33.333% - 20px)",

//  margin: theme.spacing(1.25), // 10px margin

//  boxSizing: "border-box",

//  textAlign: "center",

//  position: "relative",

//  [theme.breakpoints.down("sm")]: {
//   flex: "0 0 calc(50% - 20px)", // 2 items per row on small screens

//   maxWidth: "calc(50% - 20px)",
//  },
// }));

// const PaymentItemMobileLink = styled(Button)(({ theme }) => ({
//  display: "block", // Make the whole area clickable

//  padding: theme.spacing(1.25), // 10px padding

//  border: `1px solid ${theme.palette.divider}`, // Example border

//  borderRadius: theme.shape.borderRadius,

//  textDecoration: "none",

//  color: theme.palette.text.primary,

//  transition: theme.transitions.create(["transform", "box-shadow"], {
//   duration: theme.transitions.duration.shortest,
//  }),

//  "&:hover": {
//   transform: "translateY(-3px)", // Lift effect on hover

//   boxShadow: theme.shadows[4], // Subtle shadow on hover

//   backgroundColor: theme.palette.action.hover,
//  },
// }));

// const MobBankNameImage = styled("img")({
//  maxWidth: "80%",

//  height: "auto",

//  display: "block",

//  margin: "0 auto",
// });

// const LazyFelixDownloadButton = styled(IconButton)(({ theme }) => ({
//  position: "absolute",

//  bottom: theme.spacing(0.625), // 5px

//  right: theme.spacing(0.625), // 5px

//  padding: 0,

//  lineHeight: 1,

//  color: theme.palette.grey[600], // Adjust color

//  "&:hover": {
//   backgroundColor: "transparent",

//   color: theme.palette.grey[900],
//  },
// }));

// const CardSaveMsg = styled(Typography)(({ theme }) => ({
//  fontStyle: "italic",

//  color: theme.palette.text.secondary,

//  padding: theme.spacing(1.25), // 10px

//  border: `1px dashed ${theme.palette.divider}`,

//  borderRadius: theme.shape.borderRadius,

//  display: "inline-block",

//  marginTop: theme.spacing(2),
// }));

// // --- Custom SVG Icon Components (to use with MUI's SvgIcon) ---

// const SupportIcon = (props) => (
//  <SvgIcon {...props} viewBox="0 0 476 476">
//    {" "}
//   <path d="M400.9,181v-18.3c0-43.8-15.5-84.5-43.6-114.7C328.5,17,288.9,0,245.6,0h-15.1c-43.2,0-82.8,17-111.6,48c-28.1,30.2-43.6,70.9-43.6,114.7V181c-34.1,2.3-61.2,30.7-61.2,65.4V275c0,36.1,29.4,65.5,65.5,65.5h36.9c6.6,0,12-5.4,12-12V192.8c0-6.6-5.4-12-12-12H99.3v-18.1C99.3,83.6,155.8,24,230.4,24h15.1c74.8,0,131.1,59.6,131.1,138.7v18.1h-17.2c-6.6,0-12,5.4-12,12v135.6c0,6.6,5.4,12,12,12h16.8c-4.9,62.6-48,77.1-68,80.4c-5.5-16.9-21.4-29.1-40.1-29.1h-30c-23.2,0-42.1,18.9-42.1,42.1s18.9,42.2,42.1,42.2h30.1c19.4,0,35.7-13.2,40.6-31c9.8-1.4,25.3-4.9,40.7-13.9c21.7-12.7,47.4-38.6,50.8-90.8c34.3-2.1,61.5-30.6,61.5-65.4v-28.6C462,211.7,435,183.2,400.9,181z M104.8,316.4H79.8c-22.9,0-41.5-18.6-41.5-41.5v-28.6c0-22.9,18.6-41.5,41.5-41.5h24.9V316.4z M268.2,452h-30.1c-10,0-18.1-8.1-18.1-18.1s8.1-18.1,18.1-18.1h30.1c10,0,18.1,8.1,18.1,18.1S278.2,452,268.2,452z M438,274.9c0,22.9-18.6,41.5-41.5,41.5h-24.9V204.8h24.9c22.9,0,41.5,18.6,41.5,41.5V274.9z" />
//
//  </SvgIcon>
// );

// const FaqIcon = (props) => (
//  <SvgIcon {...props} viewBox="0 0 612 612">
//    {" "}
//   <path d="M230.724,181.208c-2.393,2.587-3.95,4.256-5.119,5.508C227.775,184.379,230.724,181.208,230.724,181.208z" />
//    {" "}
//   <path d="M336.962,200.875c7.956,9.792,11.906,21.337,11.906,34.634c0,9.514-2.727,18.666-8.151,27.512c-2.977,5.007-6.898,9.848-11.795,14.465l-16.301,16.107c-15.634,15.356-25.732,28.958-30.35,40.865c-4.618,11.878-6.927,27.54-6.927,46.957h36.275c0-17.108,1.947-30.044,5.814-38.807c3.866-8.763,12.323-19.444,25.37-32.102c17.942-17.387,29.849-30.572,35.746-39.53s8.874-20.641,8.874-35.051c0-23.756-8.039-43.285-24.146-58.585c-16.106-15.3-37.526-22.922-64.288-22.922c-28.931,0-51.686,8.929-68.266,26.789s-24.87,41.449-24.87,70.797h36.275c0.667-17.665,3.478-31.184,8.346-40.559c8.679-16.83,24.369-25.259,47.068-25.259C315.875,186.187,329.033,191.083,336.962,200.875z" />
//    {" "}
//   <path d="M612,306C612,137.004,474.995,0,306,0C137.004,0,0,137.004,0,306c0,168.995,137.004,306,306,306C474.995,612,612,474.995,612,306z M27.818,306C27.818,152.36,152.36,27.818,306,27.818S584.182,152.36,584.182,306S459.64,584.182,306,584.182S27.818,459.64,27.818,306z" />
//     <rect height="42.367" width="40.559" x="274.51" y="415.214" />
//  </SvgIcon>
// );

// const OffersIcon = (props) => (
//  <SvgIcon {...props} viewBox="0 0 384.1 384.1">
//    {" "}
//   <path d="M344,80.1h-72c17.2-18.8,16.8-48-1.6-66c-18.8-18.8-49.2-18.8-67.6,0c-6.8,6.8-13.6,17.2-18.4,29.2c-4.8-12-11.6-22.4-18.4-29.2c-8.8-9.2-21.2-14-34-14s-24.8,4.8-34,14s-14,21.2-14,34c0,12,4.4,23.2,12.4,32H40c-22,0-40,18-40,40v32c0,10.4,6.8,19.2,16,22.8c0,0.4,0,0.8,0,1.2v168c0,22.8,23.2,40,44,40h268c22,0,40-18,40-40V174.9c9.6-3.6,16-12.4,16-22.8v-32C384,98.1,366,80.1,344,80.1z M214.1,25.3c12.4-12.4,32.8-12.4,45.2,0s12.4,32.8,0,45.2c-3.2,3.2-7.2,6-10.8,8.4c-0.8,0.4-1.2,0.8-2,1.6H192c0.8-1.2,1.2-2.8,1.2-4C192.9,59.3,204.1,35.3,214.1,25.3z M109.7,24.9c6-6,14-9.2,22.4-9.2s16.4,3.2,22.4,9.2c10,10,21.2,34,20.8,50.4c0,1.6,0.4,2.8,1.2,4h-54c-0.4,0-1.2-0.4-2.4-1.2c-4-2-7.6-4.8-10.4-8C97.2,57.7,97.2,37.3,109.7,24.9z M176.1,368.1h-116c-12.8,0-28-10.8-28-24v-168h144V368.1z M368,152.1c0,4.4-3.2,7.2-6.4,8c0,0-0.4,0-0.4,0.4c-0.4,0-0.8,0-1.2,0c-4.4,0-8,3.6-8,8v176c0,13.2-10.8,24-24,24H192V176.1h80c4.4,0,8-3.6,8-8s-3.6-8-8-8h-80v-36c0-4.4-3.6-8-8-8s-8,3.6-8,8v36H24c-4.4,0-8-3.6-8-8v-32c0-13.2,10.8-24,24-24h304c13.2,0,24,10.8,24,24V152.1z" />
//    {" "}
//   <path d="M320,160.1h-12c-4.4,0-8,3.6-8,8s3.6,8,8,8h12c4.4,0,8-3.6,8-8C328,163.7,324.5,160.1,320,160.1z" />
//
//  </SvgIcon>
// );

// const LoginIcon = (props) => (
//  <SvgIcon {...props} viewBox="0 0 384.1 384.1">
//    {" "}
//   <path d="M136.2,165.5c-3.5,0-6.4,2.9-6.4,6.4v38.4c0,3.5,2.9,6.4,6.4,6.4s6.4-2.9,6.4-6.4v-38.4C142.6,168.4,139.9,165.5,136.2,165.5z" />
//    {" "}
//   <path d="M317,185.4h-95.9l20.9-20.9c2.2-2.2,2.2-5.7,0-7.8c-2.2-2.1-5.7-2.1-7.8,0l-30.4,30.4c-0.2,0.2-0.3,0.4-0.4,0.5l-0.1,0.2c-0.1,0.2-0.3,0.4-0.5,0.7l-0.1,0.2c-0.3,0.7-0.5,1.4-0.5,2.3l0,0.6l0,0.1c0.1,0.6,0.2,1.1,0.4,1.6c0.2,0.5,0.6,1.1,1.1,1.7l30.3,30.3c1,1,2.5,1.6,4,1.6c1.5,0,2.9-0.6,4-1.6c2.1-2.2,2.1-5.7,0-7.8l-20.9-20.9H317c3.1,0,5.5-2.5,5.5-5.5C322.5,187.9,320.1,185.4,317,185.4z" />
//    {" "}
//   <path d="M147.9,0.8L87.3,25c-17.1,6.3-23.4,14.9-23.4,31.5v268.8c0,16.7,6.4,25.3,23.2,31.5l60.8,24.4c3,1.1,6,1.7,9,1.7c12.9,0,22.1-10.7,22.1-25.5V24.6C179.1,6.5,164.5-5.5,147.9,0.8z M166.4,357.5c0,7.6-3.7,12.8-9.4,12.8c-1.4,0-2.9-0.2-4.3-0.8l-60.8-24.3c-12-4.5-15-8.3-15-19.6V56.7c0-11.3,3-15.2,15.2-19.6l60.4-24.2c1.6-0.6,3-0.8,4.5-0.8c5.7,0,9.4,5.2,9.4,12.8V357.5L166.4,357.5z" />
//    {" "}
//   <path d="M313.6,253c-3.5,0-6.4,2.9-6.4,6.4v66.1c0,10.6-8.7,19.3-19.3,19.3h-89.6c-3.5,0-6.4,2.9-6.4,6.4s2.9,6.4,6.4,6.4H288c17.7,0,32-14.3,32-32v-66.1C320,255.9,317.1,253,313.6,253z" />
//    {" "}
//   <path d="M197.6,37.4H288c10.6,0,19.3,8.7,19.3,19.3v65.9c0,3.5,2.9,6.4,6.4,6.4s6.4-2.9,6.4-6.4V56.5c0-17.7-14.3-32-32-32h-90.4c-3.5,0-6.4,2.9-6.4,6.4C191.1,34.6,193.9,37.4,197.6,37.4z" />
//
//  </SvgIcon>
// );

// const LazyFelixIcon = (props) => (
//  <SvgIcon {...props} viewBox="0 0 27 25">
//    {" "}
//   <path
//    d="M13.4518 13.0377C11.4186 12.7365 6.4864 16.878 5.39453 21.7726V22.0362C5.48795 24.1899 7.75902 24.9194 10.9292 24.0316C13.0111 23.1639 14.1728 23.1375 16.125 24.0316C17.9698 25.1612 20.41 23.7051 20.643 22.0362C20.3191 18.4517 16.3154 13.1956 13.4518 13.0377Z"
//    fill="#7A7A7A"
//    fillOpacity="0.7"
//   ></path>
//    {" "}
//   <ellipse
//    cx="4.85476"
//    cy="11.946"
//    rx="2.97265"
//    ry="4.24369"
//    transform="rotate(-21.5283 4.85476 11.946)"
//    fill="#7A7A7A"
//    fillOpacity="0.7"
//   ></ellipse>
//    {" "}
//   <ellipse
//    cx="22.0599"
//    cy="13.5489"
//    rx="2.97265"
//    ry="4.24369"
//    transform="rotate(22.9527 22.0599 13.5489)"
//    fill="#7A7A7A"
//    fillOpacity="0.7"
//   ></ellipse>
//    {" "}
//   <ellipse
//    cx="10.1354"
//    cy="5.66514"
//    rx="2.92739"
//    ry="4.7215"
//    transform="rotate(-9.76985 10.1354 5.66514)"
//    fill="#7A7A7A"
//    fillOpacity="0.7"
//   ></ellipse>
//    {" "}
//   <ellipse
//    cx="17.552"
//    cy="5.95842"
//    rx="2.92739"
//    ry="4.7215"
//    transform="rotate(14.6303 17.552 5.95842)"
//    fill="#7A7A7A"
//    fillOpacity="0.7"
//   ></ellipse>
//
//  </SvgIcon>
// );

// const PaymentModal = () => {
//  const [activeTab, setActiveTab] = useState("mobileBanking"); // Use descriptive IDs

//  const [timeLeft, setTimeLeft] = useState(4 * 60 + 19); // 4 minutes 19 seconds

//  const [openModal, setOpenModal] = useState(true); // State to control modal visibility

//  useEffect(() => {
//   // This effect handles the countdown timer

//   const timer = setInterval(() => {
//    setTimeLeft((prevTime) => {
//     if (prevTime <= 0) {
//      clearInterval(timer);

//      return 0;
//     }

//     return prevTime - 1;
//    });
//   }, 1000);

//   return () => clearInterval(timer); // Cleanup on component unmount
//  }, []);

//  const formatTime = (seconds) => {
//   const minutes = Math.floor(seconds / 60);

//   const remainingSeconds = seconds % 60;

//   return `${minutes.toString().padStart(2, "0")}:${remainingSeconds

//    .toString()

//    .padStart(2, "0")}`;
//  };

//  const handleTabChange = (event, newValue) => {
//   setActiveTab(newValue);
//  };

//  const handleLinkClick = (e, action) => {
//   e.preventDefault(); // Prevent default link behavior

//   console.log(`Link clicked: ${action}`); // In a real app, you'd trigger actual functionality here

//   if (action === "Cancel") {
//    setOpenModal(false); // Close modal on cancel
//   }
//  };

//  const handlePaymentOptionClick = (e, provider) => {
//   e.preventDefault();

//   console.log(`Payment option clicked: ${provider}`); // Here you would navigate to the payment page or open a payment form
//  };

//  const paymentOptions = [
//   {
//    name: "Bkash",

//    src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/bkash.png",
//   },

//   {
//    name: "Nagad",

//    src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/nagad.png",
//   },

//   {
//    name: "Upay",

//    src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/upay.png",
//   },

//   {
//    name: "Cellfin",

//    src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/cellfin.png",
//   },

//   {
//    name: "IBBL Mobile",

//    src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/ibblmobile.png",
//   },

//   {
//    name: "Pocket",

//    src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/pocket.png",
//   },

//   {
//    name: "Deshipay",

//    src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/deshipay.png",
//   },

//   {
//    name: "Pathao Pay",

//    src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/pathaopay-logo.svg",
//   },

//   {
//    name: "Rainbow",

//    src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/rainbow.png",
//   },

//   {
//    name: "Mobile Money",

//    src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/mobilemoney.png",
//   },

//   {
//    name: "OK Wallet",

//    src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/okwallet.png",
//   },
//  ];

//  return (
//   <Modal
//    open={openModal}
//    onClose={() => setOpenModal(false)}
//    aria-labelledby="payment-modal-title"
//    aria-describedby="payment-modal-description"
//    sx={{
//     display: "flex",

//     alignItems: "center",

//     justifyContent: "center",
//    }}
//   >
//    <StyledModalContainer>
//     {" "}
//     <StyledModalContent>
//      {/* Loading Bar */}
//      <LoadingBarFixed />
//      {/* Header Section */}
//      <AppBar
//       position="static"
//       color="transparent"
//       elevation={0}
//       sx={{ position: "relative", mb: 2 }}
//      >
//            {" "}
//       <Toolbar sx={{ justifyContent: "space-between", padding: 0 }}>
//
//        <TimerContainer>
//                 <AccessTimeIcon />       {" "}
//         <Typography variant="body1">
//                   <span className="count-down">{formatTime(timeLeft)}</span>s
//               {" "}
//         </Typography>
//
//        </TimerContainer>
//
//        <Box>
//                {" "}
//         <EasyLangSwitch sx={{ right: "14px" }}>
//
//          <IconButton
//           aria-label="cancel transaction"
//           onClick={(e) => handleLinkClick(e, "Cancel")}
//           size="small"
//          >
//                     <CloseIcon />
//          </IconButton>
//                 {" "}
//         </EasyLangSwitch>
//                {" "}
//         <EasyLangSwitch sx={{ right: "50px" }}>
//
//          <IconButton aria-label="change language" size="small">
//                     <LanguageIcon /> {/* Using a generic language icon */}
//              {" "}
//           {/* If you need the exact image, you can use:

//                     <img alt="translation" src="assets/checkout_assets/img/translation_en.png" />

//                     */}
//
//          </IconButton>
//                 {" "}
//         </EasyLangSwitch>
//
//        </Box>
//             {" "}
//       </Toolbar>
//
//      </AppBar>
//
//      <LogoWrap>
//            {" "}
//       <ClientLogoInner>
//
//        {/* Client Logo - replace with an actual image source or MUI Avatar */}
//
//        <img
//         alt="Client Logo"
//         src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAGQAAAAmCAYAAAAycj4zAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAI0UlEQVRoge2be3BTVR7Hn/fvR5M2adIn5VFaitAiRVocyohUtgVBEFZgXWVnfeysM+647NTxsbquqyzugjgio+OIj1FHd32BSJGHiwjyEhRUEIaHgG3B0iZp0jRJnzzP7xwuVtqkvXbIKj5/Jefc++HnnXvPOfce59ybC/nFTRAYAtc1K6aa3ATh++x/pOHBwIML+7FBc6gRSyEkZkmSkDEkyUoYkGSlDkoyUIUlGypAkI2VIkpEyJMlIGZJkpAxJMlKGJBkpQ5KMlCFJRsqQJCNlSJKRMiTJSBmSZKgudQL9xX7jXFRmMx0HvsS7d/+lTueHEYTvPovid2Wi/A16t4YMXfwAuqJh3QcWRcIOJ+079uBYsx4xFB6QfPuKfcEctAX5nHvx9aQ3RGXNoOC+RYiRCBG3B98XXxFxe7DUVtPwyDK5trsAmoI89MWFPXagHzEc88RKLLXVHP39HWI40pjy/0LE5ca9dQcxfwDj5aNJGz8WMRxGjEYTtL1OWb5DR3C++768QUY6mbOmox2cj/HyUiw1V+Na/8HAHsFPkJjPRywQjJvzwUegVJJeVZmg69WQYOMZnGvWJ5Q739tA6YY3EZRKtIMH9djeMu0aDCOL6TzdkGCsqaIcc9UEoj4/zateSaizXleLbvgwBEGg85tG2jZuwbN9d8Kci0LAUjMFy7RqNHm5RDt8tG/fTesba4gFgzKpoFZhnVlLxtVVqHOyiPkD+D4/ROuL7xL69nxC/gq9HtucGZirKlHZMom2e/HuO4DjrbVE2tySLmvhfNSZ1h7HwfPx7njugHffd9Or/9CRBG2/FnUxFJYGJthwpkdd+qQJWKZPpX3n3gRDDGWXkbVwPmGnSzJEUCooeKCOzNnTZVp9SRGWmil4tu3k9P2LZQNtmz8bpcEg06eVl5FePYkTd9QR64xr1bZMClcswTCyWKY1jhmN7YZZnLr3Ydp37ZPKdUMLKFzxGNpBefLY48Zgnzebr++6D//IsYAmzpqGrnBot2MQbnXSWnPJrPY7RhfRqiG5IAfYF18vKBLUGy7RqBJWKYOMZ3Fu2XXRnP0TO3QslMzo+P4irfjNiJIJl6mTMk64kfXIV1pk1ON5ZJ7VRGgwEjp7A8c46xHAY66zppJWXYSwbhW3e9bS8+gYIAsOWPYxhZDFiJIpz7ft0HPgStdWCbf71aAflMfQxhzgy7xbCLQ4UOi2FTy5BOyiPWGcQx1tr8R85hiYvB/uNc1FnWhm2/FGO3PBbYv4Ano924v/qqJRTWkU5mpwsABqXPEG03XvRY9CvIYZRJRhGlXRbF/MHaFq6UjoD/1cUBgNZN88HwLN9N6fu/gtiNAaAa90mcm5fSOD413i27ZK1Cxw/ybFb/kAsGAKgbeOHXLb6ZTS52aSNLaXl1TcwV1ViHDMagIZHlsrWPFf9Zkpefw5NTha2udfx7bMvYZ1Rg7YgH0SRk4v+jHffAUnftulDRv5rFZpsO5baapxr1nP26Repen1xIZba6njs9Zulqepi6dWQiKed0JlvE8o1udmoLBkUrlhC0z/WyM7Y/mIcXYLCoAPoPm5l yWc9p fn5V7dt2r/9YlkBkAsFMJ/8Ci a3GwEtRoAU8W4rsiYphnAcVVeYIci3RBsxPKCuL4+jQxTrzFiZTsZz+FGnGUkY2tknW2MKxSOH770fQqgm3Omi6P3fRph/gBw+w7tvLt28vSSAXFAnx6u7EvmAP+X+6gbeNW/nc8IUpyWnTp0rvXiG8Y7+XnxRcYv3LdhgLXGa/oMpmMML3CYYt1ZnHpHu/VJJOu+/fcpJrWqMfX+2+oGHToAhiNwefPIfvT+4RSK/ZRMxXnKnB2/w6lQJvVAmqvrmNxR+hss1RnLB3Z50u/N4ItDhShpqUnqbowOaOqV+QwwYLtrnRp0yck4tB+nTpVSVeoQuflVhnEHK5FKtOnFJFz2xQAuOp34fl4T79y7ddzLHWWjexb450jSkRcbRdEjYcNN8e3kswxjWS7NQUh5j1yFQChLk3g2NcEG5oAyK+7E02tqaRXmk0UPbuctuH+cIvFtv3LOqOECCtl+HetgN/0m+MHt30XGNZOxTL0KX9c29PzJoNDr0BcX0rZxi6T37t2Pbe5MTOPj8uvayAWViiH/vQdBrSbc4qBp+TN9zlEe3WpRGVXUdo8TlYmCALKjHSErkF3f7STcKsTlTVD0mjycuGzL3Ct/4Cs3yxAodUy4pVncG/eStQfIH3SleiGDwXiiyqAGIvR+M/nGP5UfKt52Vsv4d27HzEcJq2iHFW6GVNFOZ2nvqH13+v6dJD+w0dxrduI9bppWGqmYKoop+OzL0CpwDS+PD5FiSJpl5fi3roD99YdeD/5DNOEK7Df+EvSq6/C9/khFAYdpopyFDodusIhON5Zh+/gYXJuuxl9SREQv3pGvPCUrH/Xhv/w7iK3vr0aotBqUGh7uOERRdxbP6bhb/FnMVGPl6i3A6UpDduca3HVb6LzdAMNjz7O4AfqUKWzcc2bLQvhfG8DjtX10nfvnk85dfdDFDxYhzrTSvrkiVJdzB/g7NPP99mM8zQsfoJIewf2X81BZckgY+pkqS7scNG0bCXurTukYzt590MU3LcI67VT0WTb0dROkfTBprM0Ll6O7+BhDCOLyb7111Kd0mxCaTbJ+u7tpvFChO7+sGOqHJcQ9PvEOoN0njhJqLlFVj7onruk+xbH6vr4/BsKo8nPxTrtGnTDhiCoVYSaz+HZtouO/V92G1+h02KumoC+qBCUCoKnG/Hs2CNbJM0TK1EY9ARPNxA4cUrW3lg2CnW2nYjTlfDHIXWWDfPESrT5ucRCYQLHTtC++1PEUIju0BbkY7pyPJpsO7FAJ/7DR+NXbtdzKH1JUXyL3AvBxjMEjp7oVXOebg3pL8o0I8WrnkQ/YjgAZ554hpbX3h6o8D8LBvQFVbTDx/HfLcK5dgOh5hYcqxOfg6XonQG9Qr6P0mgg6vP/GKF/0vxor3BTZvSP/wK6zEBMS+b7eAAAAABJRU5ErkJggg=="
//        />
//             {" "}
//       </ClientLogoInner>
//
//      </LogoWrap>
//
//      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
//             Blucheez
//      </Typography>
//           {/* Top Navigation Menu */}
//      <SslTokenMenu>
//            {" "}
//       <SslTokenMenuItem>
//
//        <Button
//         variant="text"
//         color="inherit"
//         startIcon={
//          <HeaderIconWrap>
//                     <SupportIcon />
//          </HeaderIconWrap>
//         }
//         onClick={(e) => handleLinkClick(e, "Support")}
//        >
//                 Support
//        </Button>
//             {" "}
//       </SslTokenMenuItem>
//            {" "}
//       <SslTokenMenuItem>
//
//        <Button
//         variant="text"
//         color="inherit"
//         startIcon={
//          <HeaderIconWrap>
//                     <FaqIcon />
//          </HeaderIconWrap>
//         }
//         onClick={(e) => handleLinkClick(e, "FAQ")}
//        >
//                 FAQ
//        </Button>
//             {" "}
//       </SslTokenMenuItem>
//            {" "}
//       <SslTokenMenuItem>
//
//        <Button
//         variant="text"
//         color="inherit"
//         startIcon={
//          <HeaderIconWrap>
//                     <OffersIcon />
//          </HeaderIconWrap>
//         }
//         onClick={(e) => handleLinkClick(e, "Offers")}
//        >
//                 Offers
//        </Button>
//             {" "}
//       </SslTokenMenuItem>
//            {" "}
//       <SslTokenMenuItem>
//
//        <Button
//         variant="text"
//         color="inherit"
//         startIcon={
//          <HeaderIconWrap>
//                     <LoginIcon />
//          </HeaderIconWrap>
//         }
//         onClick={(e) => handleLinkClick(e, "Login")}
//        >
//                 Login
//        </Button>
//             {" "}
//       </SslTokenMenuItem>
//
//      </SslTokenMenu>
//           {/* Payment Options Tabs */}
//      <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 3 }}>
//            {" "}
//       <Tabs
//        value={activeTab}
//        onChange={handleTabChange}
//        aria-label="Payment options tabs"
//        centered
//       >
//               <Tab label="Cards" value="cards" />
//               <Tab label="Mobile Banking" value="mobileBanking" />
//               <Tab label="Net Banking" value="netBanking" />     {" "}
//       </Tabs>
//
//      </Box>
//
//      <Box
//       sx={{
//        minHeight: "250px",

//        display: "flex",

//        width: "100%",

//        flexDirection: "column",
//       }}
//      >
//             {/* Tab Content for Cards */}     {" "}
//       {activeTab === "cards" && (
//        <Box sx={{ p: 3 }}>
//                 <Typography>Card payment options will appear here.</Typography>
//
//        </Box>
//       )}
//             {/* Tab Content for Mobile Banking */}     {" "}
//       {activeTab === "mobileBanking" && (
//        <Box sx={{ p: 3 }}>
//                {" "}
//         <Box sx={{ mb: 2 }}>
//
//          <CardSaveMsg variant="body2">
//                     Please login to show your saved wallets
//          </CardSaveMsg>
//                 {" "}
//         </Box>
//                {" "}
//         <PaymentItemMobileList>
//
//          {paymentOptions.map((option, index) => (
//           <PaymentItemMobileListItem key={option.name}>
//
//            <PaymentItemMobileLink
//             onClick={(e) => handlePaymentOptionClick(e, option.name)}
//            >
//                         <MobBankNameImage alt={option.name} src={option.src} />
//                      {" "}
//             {/* Only add download button if not Pathao Pay (as it didn't have one in original) */}
//                        {" "}
//             {option.name !== "Pathao Pay" && (
//              <LazyFelixDownloadButton aria-label="download">
//                             <LazyFelixIcon />
//              </LazyFelixDownloadButton>
//             )}
//
//            </PaymentItemMobileLink>
//                     {" "}
//           </PaymentItemMobileListItem>
//          ))}
//                 {" "}
//         </PaymentItemMobileList>
//
//        </Box>
//       )}
//             {/* Tab Content for Net Banking */}     {" "}
//       {activeTab === "netBanking" && (
//        <Box sx={{ p: 3 }}>
//                 <Typography>Net Banking options will appear here.</Typography>
//
//        </Box>
//       )}
//
//      </Box>
//         {" "}
//     </StyledModalContent>
//
//    </StyledModalContainer>
//     {" "}
//   </Modal>
//  );
// };

// export default PaymentModal;

import React, { useState, useEffect } from "react";
import {
 Modal,
 Box,
 Typography,
 Tabs,
 Tab,
 Button,
 Paper,
 SvgIcon,
 AppBar,
 Toolbar,
 IconButton,
 TextField,
 FormControl,
 FormControlLabel,
 Grid, // <--- ADDED IMPORT
 Checkbox, // <--- ADDED IMPORT
 InputAdornment, // <--- ADDED IMPORT
} from "@mui/material";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close"; // Material-UI Close Icon
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // Material-UI Clock Icon
import LanguageIcon from "@mui/icons-material/Language"; // Material-UI Language Icon
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import NetBankingTabContent from "./payments/NetBankingTabContent";
// **IMPORTANT:** Replace with your actual Stripe Publishable Key (pk_test_ or pk_live_)
const stripePromise = loadStripe("YOUR_STRIPE_PUBLISHABLE_KEY");

// --- Styled Components (replacing some original CSS or for custom elements) ---

const StyledModalContainer = styled(Box)(({ theme }) => ({
 textAlign: "center",
 position: "relative",
 paddingTop: theme.spacing(7.5), // Roughly 60px
 outline: "none", // Remove focus outline on modal
}));

const StyledModalContent = styled(Paper)(({ theme }) => ({
 position: "relative",
 maxWidth: 600, // Max width for the modal content
 margin: "0 auto", // Center the modal
 padding: theme.spacing(3),
 borderRadius: theme.shape.borderRadius,
 boxShadow: theme.shadows[5],
 outline: "none",
 [theme.breakpoints.down("sm")]: {
  margin: theme.spacing(2), // Smaller margin on small screens
 },
}));

const LoadingBarFixed = styled(Box)(({ theme }) => ({
 position: "absolute", // Changed to absolute within modal for better context
 top: 0,
 left: 0,
 width: "100%",
 height: 4,
 backgroundColor: theme.palette.primary.main, // Using primary theme color
 zIndex: theme.zIndex.modal + 1, // Ensure it's above other modal content
}));

const TimerContainer = styled(Box)(({ theme }) => ({
 display: "flex",
 alignItems: "center",
 justifyContent: "center",
 gap: theme.spacing(0.5), // 5px gap
 color: theme.palette.text.secondary,
 fontSize: "1.2em",
 fontWeight: "bold",
}));

// Adjusted EasyLangSwitch to be a flex container for buttons,
// removing absolute positioning as it's now inside Toolbar
const EasyLangSwitch = styled(Box)(({ theme }) => ({
 display: "flex",
 alignItems: "center",
 "& img": {
  width: 24, // Adjust size for icons
  height: 24,
 },
}));

const LogoWrap = styled(Box)({
 display: "flex",
 justifyContent: "center",
 alignItems: "center",
 marginBottom: (theme) => theme.spacing(1.25), // 10px
});

const ClientLogoInner = styled(Box)({
 display: "flex",
 justifyContent: "center",
 alignItems: "center",
});

const SslTokenMenu = styled("ul")({
 display: "flex",
 justifyContent: "space-around",
 padding: 0,
 margin: 0,
 listStyle: "none",
 width: "100%", // Ensure it takes full width for spacing
});

const SslTokenMenuItem = styled("li")({
 flexGrow: 1,
 textAlign: "center",
});

const HeaderIconWrap = styled(Box)({
 width: 25,
 height: 25,
 display: "flex",
 justifyContent: "center",
 alignItems: "center",
 marginBottom: (theme) => theme.spacing(0.625), // 5px
 "& svg path, & svg ellipse": {
  fill: "#1d1e22", // Default fill color for SVG paths
 },
});

const PaymentItemMobileList = styled("ul")(({ theme }) => ({
 display: "flex",
 flexWrap: "wrap",
 justifyContent: "center",
 padding: 0,
 listStyle: "none",
 marginTop: theme.spacing(2), // Add some top margin
}));

const PaymentItemMobileListItem = styled("li")(({ theme }) => ({
 flex: "0 0 calc(33.333% - 20px)", // 3 items per row, with some margin
 maxWidth: "calc(33.333% - 20px)",
 margin: theme.spacing(1.25), // 10px margin
 boxSizing: "border-box",
 textAlign: "center",
 position: "relative",
 [theme.breakpoints.down("sm")]: {
  flex: "0 0 calc(50% - 20px)", // 2 items per row on small screens
  maxWidth: "calc(50% - 20px)",
 },
}));

const PaymentItemMobileLink = styled(Button)(({ theme }) => ({
 display: "block", // Make the whole area clickable
 padding: theme.spacing(1.25), // 10px padding
 border: `1px solid ${theme.palette.divider}`, // Example border
 borderRadius: theme.shape.borderRadius,
 textDecoration: "none",
 color: theme.palette.text.primary,
 transition: theme.transitions.create(["transform", "box-shadow"], {
  duration: theme.transitions.duration.shortest,
 }),
 "&:hover": {
  transform: "translateY(-3px)", // Lift effect on hover
  boxShadow: theme.shadows[4], // Subtle shadow on hover
  backgroundColor: theme.palette.action.hover,
 },
}));

const MobBankNameImage = styled("img")({
 maxWidth: "80%",
 height: "auto",
 display: "block",
 margin: "0 auto",
});

const LazyFelixDownloadButton = styled(IconButton)(({ theme }) => ({
 position: "absolute",
 bottom: theme.spacing(0.625), // 5px
 right: theme.spacing(0.625), // 5px
 padding: 0,
 lineHeight: 1,
 color: theme.palette.grey[600], // Adjust color
 "&:hover": {
  backgroundColor: "transparent",
  color: theme.palette.grey[900],
 },
}));

const CardSaveMsg = styled(Typography)(({ theme }) => ({
 fontStyle: "italic",
 color: theme.palette.text.secondary,
 padding: theme.spacing(1.25), // 10px
 border: `1px dashed ${theme.palette.divider}`,
 borderRadius: theme.shape.borderRadius,
 display: "inline-block",
 marginTop: theme.spacing(2),
}));

// --- Custom SVG Icon Components (to use with MUI's SvgIcon) ---

const SupportIcon = (props) => (
 <SvgIcon {...props} viewBox="0 0 476 476">
  {" "}
  <path d="M400.9,181v-18.3c0-43.8-15.5-84.5-43.6-114.7C328.5,17,288.9,0,245.6,0h-15.1c-43.2,0-82.8,17-111.6,48c-28.1,30.2-43.6,70.9-43.6,114.7V181c-34.1,2.3-61.2,30.7-61.2,65.4V275c0,36.1,29.4,65.5,65.5,65.5h36.9c6.6,0,12-5.4,12-12V192.8c0-6.6-5.4-12-12-12H99.3v-18.1C99.3,83.6,155.8,24,230.4,24h15.1c74.8,0,131.1,59.6,131.1,138.7v18.1h-17.2c-6.6,0-12,5.4-12,12v135.6c0,6.6,5.4,12,12,12h16.8c-4.9,62.6-48,77.1-68,80.4c-5.5-16.9-21.4-29.1-40.1-29.1h-30c-23.2,0-42.1,18.9-42.1,42.1s18.9,42.2,42.1,42.2h30.1c19.4,0,35.7-13.2,40.6-31c9.8-1.4,25.3-4.9,40.7-13.9c21.7-12.7,47.4-38.6,50.8-90.8c34.3-2.1,61.5-30.6,61.5-65.4v-28.6C462,211.7,435,183.2,400.9,181z M104.8,316.4H79.8c-22.9,0-41.5-18.6-41.5-41.5v-28.6c0-22.9,18.6-41.5,41.5-41.5h24.9V316.4z M268.2,452h-30.1c-10,0-18.1-8.1-18.1-18.1s8.1-18.1,18.1-18.1h30.1c10,0,18.1,8.1,18.1,18.1S278.2,452,268.2,452z M438,274.9c0,22.9-18.6,41.5-41.5,41.5h-24.9V204.8h24.9c22.9,0,41.5,18.6,41.5,41.5V274.9z" />
 </SvgIcon>
);

const FaqIcon = (props) => (
 <SvgIcon {...props} viewBox="0 0 612 612">
  {" "}
  <path d="M230.724,181.208c-2.393,2.587-3.95,4.256-5.119,5.508C227.775,184.379,230.724,181.208,230.724,181.208z" />{" "}
  <path d="M336.962,200.875c7.956,9.792,11.906,21.337,11.906,34.634c0,9.514-2.727,18.666-8.151,27.512c-2.977,5.007-6.898,9.848-11.795,14.465l-16.301,16.107c-15.634,15.356-25.732,28.958-30.35,40.865c-4.618,11.878-6.927,27.54-6.927,46.957h36.275c0-17.108,1.947-30.044,5.814-38.807c3.866-8.763,12.323-19.444,25.37-32.102c17.942-17.387,29.849-30.572,35.746-39.53s8.874-20.641,8.874-35.051c0-23.756-8.039-43.285-24.146-58.585c-16.106-15.3-37.526-22.922-64.288-22.922c-28.931,0-51.686,8.929-68.266,26.789s-24.87,41.449-24.87,70.797h36.275c0.667-17.665,3.478-31.184,8.346-40.559c8.679-16.83,24.369-25.259,47.068-25.259C315.875,186.187,329.033,191.083,336.962,200.875z" />{" "}
  <path d="M612,306C612,137.004,474.995,0,306,0C137.004,0,0,137.004,0,306c0,168.995,137.004,306,306,306C474.995,612,612,474.995,612,306z M27.818,306C27.818,152.36,152.36,27.818,306,27.818S584.182,152.36,584.182,306S459.64,584.182,306,584.182S27.818,459.64,27.818,306z" />{" "}
  <rect height="42.367" width="40.559" x="274.51" y="415.214" />
 </SvgIcon>
);

const OffersIcon = (props) => (
 <SvgIcon {...props} viewBox="0 0 384.1 384.1">
  {" "}
  <path d="M344,80.1h-72c17.2-18.8,16.8-48-1.6-66c-18.8-18.8-49.2-18.8-67.6,0c-6.8,6.8-13.6,17.2-18.4,29.2c-4.8-12-11.6-22.4-18.4-29.2c-8.8-9.2-21.2-14-34-14s-24.8,4.8-34,14s-14,21.2-14,34c0,12,4.4,23.2,12.4,32H40c-22,0-40,18-40,40v32c0,10.4,6.8,19.2,16,22.8c0,0.4,0,0.8,0,1.2v168c0,22.8,23.2,40,44,40h268c22,0,40-18,40-40V174.9c9.6-3.6,16-12.4,16-22.8v-32C384,98.1,366,80.1,344,80.1z M214.1,25.3c12.4-12.4,32.8-12.4,45.2,0s12.4,32.8,0,45.2c-3.2,3.2-7.2,6-10.8,8.4c-0.8,0.4-1.2,0.8-2,1.6H192c0.8-1.2,1.2-2.8,1.2-4C192.9,59.3,204.1,35.3,214.1,25.3z M109.7,24.9c6-6,14-9.2,22.4-9.2s16.4,3.2,22.4,9.2c10,10,21.2,34,20.8,50.4c0,1.6,0.4,2.8,1.2,4h-54c-0.4,0-1.2-0.4-2.4-1.2c-4-2-7.6-4.8-10.4-8C97.2,57.7,97.2,37.3,109.7,24.9z M176.1,368.1h-116c-12.8,0-28-10.8-28-24v-168h144V368.1z M368,152.1c0,4.4-3.2,7.2-6.4,8c0,0-0.4,0-0.4,0.4c-0.4,0-0.8,0-1.2,0c-4.4,0-8,3.6-8,8v176c0,13.2-10.8,24-24,24H192V176.1h80c4.4,0,8-3.6,8-8s-3.6-8-8-8h-80v-36c0-4.4-3.6-8-8-8s-8,3.6-8,8v36H24c-4.4,0-8-3.6-8-8v-32c0-13.2,10.8-24,24-24h304c13.2,0,24,10.8,24,24V152.1z" />{" "}
  <path d="M320,160.1h-12c-4.4,0-8,3.6-8,8s3.6,8,8,8h12c4.4,0,8-3.6,8-8C328,163.7,324.5,160.1,320,160.1z" />
 </SvgIcon>
);

const LoginIcon = (props) => (
 <SvgIcon {...props} viewBox="0 0 384.1 384.1">
  {" "}
  <path d="M136.2,165.5c-3.5,0-6.4,2.9-6.4,6.4v38.4c0,3.5,2.9,6.4,6.4,6.4s6.4-2.9,6.4-6.4v-38.4C142.6,168.4,139.9,165.5,136.2,165.5z" />{" "}
  <path d="M317,185.4h-95.9l20.9-20.9c2.2-2.2,2.2-5.7,0-7.8c-2.2-2.1-5.7-2.1-7.8,0l-30.4,30.4c-0.2,0.2-0.3,0.4-0.4,0.5l-0.1,0.2c-0.1,0.2-0.3,0.4-0.5,0.7l-0.1,0.2c-0.3,0.7-0.5,1.4-0.5,2.3l0,0.6l0,0.1c0.1,0.6,0.2,1.1,0.4,1.6c0.2,0.5,0.6,1.1,1.1,1.7l30.3,30.3c1,1,2.5,1.6,4,1.6c1.5,0,2.9-0.6,4-1.6c2.1-2.2,2.1-5.7,0-7.8l-20.9-20.9H317c3.1,0,5.5-2.5,5.5-5.5C322.5,187.9,320.1,185.4,317,185.4z" />{" "}
  <path d="M147.9,0.8L87.3,25c-17.1,6.3-23.4,14.9-23.4,31.5v268.8c0,16.7,6.4,25.3,23.2,31.5l60.8,24.4c3,1.1,6,1.7,9,1.7c12.9,0,22.1-10.7,22.1-25.5V24.6C179.1,6.5,164.5-5.5,147.9,0.8z M166.4,357.5c0,7.6-3.7,12.8-9.4,12.8c-1.4,0-2.9-0.2-4.3-0.8l-60.8-24.3c-12-4.5-15-8.3-15-19.6V56.7c0-11.3,3-15.2,15.2-19.6l60.4-24.2c1.6-0.6,3-0.8,4.5-0.8c5.7,0,9.4,5.2,9.4,12.8V357.5L166.4,357.5z" />{" "}
  <path d="M313.6,253c-3.5,0-6.4,2.9-6.4,6.4v66.1c0,10.6-8.7,19.3-19.3,19.3h-89.6c-3.5,0-6.4,2.9-6.4,6.4s2.9,6.4,6.4,6.4H288c17.7,0,32-14.3,32-32v-66.1C320,255.9,317.1,253,313.6,253z" />{" "}
  <path d="M197.6,37.4H288c10.6,0,19.3,8.7,19.3,19.3v65.9c0,3.5,2.9,6.4,6.4,6.4s6.4-2.9,6.4-6.4V56.5c0-17.7-14.3-32-32-32h-90.4c-3.5,0-6.4,2.9-6.4,6.4C191.1,34.6,193.9,37.4,197.6,37.4z" />
 </SvgIcon>
);

const LazyFelixIcon = (props) => (
 <SvgIcon {...props} viewBox="0 0 27 25">
  {" "}
  <path
   d="M13.4518 13.0377C11.4186 12.7365 6.4864 16.878 5.39453 21.7726V22.0362C5.48795 24.1899 7.75902 24.9194 10.9292 24.0316C13.0111 23.1639 14.1728 23.1375 16.125 24.0316C17.9698 25.1612 20.41 23.7051 20.643 22.0362C20.3191 18.4517 16.3154 13.1956 13.4518 13.0377Z"
   fill="#7A7A7A"
   fillOpacity="0.7"
  ></path>{" "}
  <ellipse
   cx="4.85476"
   cy="11.946"
   rx="2.97265"
   ry="4.24369"
   transform="rotate(-21.5283 4.85476 11.946)"
   fill="#7A7A7A"
   fillOpacity="0.7"
  ></ellipse>{" "}
  <ellipse
   cx="22.0599"
   cy="13.5489"
   rx="2.97265"
   ry="4.24369"
   transform="rotate(22.9527 22.0599 13.5489)"
   fill="#7A7A7A"
   fillOpacity="0.7"
  ></ellipse>{" "}
  <ellipse
   cx="10.1354"
   cy="5.66514"
   rx="2.92739"
   ry="4.7215"
   transform="rotate(-9.76985 10.1354 5.66514)"
   fill="#7A7A7A"
   fillOpacity="0.7"
  ></ellipse>{" "}
  <ellipse
   cx="17.552"
   cy="5.95842"
   rx="2.92739"
   ry="4.7215"
   transform="rotate(14.6303 17.552 5.95842)"
   fill="#7A7A7A"
   fillOpacity="0.7"
  ></ellipse>
 </SvgIcon>
);

const PaymentModal = () => {
 const [activeTab, setActiveTab] = useState("mobileBanking"); // Use descriptive IDs
 const [timeLeft, setTimeLeft] = useState(4 * 60 + 19); // 4 minutes 19 seconds
 const [openModal, setOpenModal] = useState(true); // State to control modal visibility

 useEffect(() => {
  // This effect handles the countdown timer
  const timer = setInterval(() => {
   setTimeLeft((prevTime) => {
    if (prevTime <= 0) {
     clearInterval(timer);
     return 0;
    }
    return prevTime - 1;
   });
  }, 1000);

  return () => clearInterval(timer); // Cleanup on component unmount
 }, []);

 const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
   .toString()
   .padStart(2, "0")}`;
 };

 const handleTabChange = (event, newValue) => {
  setActiveTab(newValue);
 };
 const [formData, setFormData] = useState({
  cardNumber: "",
  cardExpiry: "",
  cardCVC: "",
  cardHolder: "",
  saveCard: false,
 });

 // --- ADDED: Handler for form input changes ---
 const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  setFormData((prevData) => ({
   ...prevData,
   [name]: type === "checkbox" ? checked : value,
  }));
 };

 const handleLinkClick = (e, action) => {
  e.preventDefault(); // Prevent default link behavior
  console.log(`Link clicked: ${action}`); // In a real app, you'd trigger actual functionality here
  if (action === "Cancel") {
   setOpenModal(false); // Close modal on cancel
  }
 };

 const handlePaymentOptionClick = (e, provider) => {
  e.preventDefault();
  console.log(`Payment option clicked: ${provider}`); // Here you would navigate to the payment page or open a payment form
 };

 const paymentOptions = [
  {
   name: "Bkash",
   src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/bkash.png",
  },
  {
   name: "Nagad",
   src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/nagad.png",
  },
  {
   name: "Upay",
   src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/upay.png",
  },
  {
   name: "Cellfin",
   src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/cellfin.png",
  },
  {
   name: "IBBL Mobile",
   src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/ibblmobile.png",
  },
  {
   name: "Pocket",
   src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/pocket.png",
  },
  {
   name: "Deshipay",
   src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/deshipay.png",
  },
  {
   name: "Pathao Pay",
   src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/pathaopay-logo.svg",
  },
  {
   name: "Rainbow",
   src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/rainbow.png",
  },
  {
   name: "Mobile Money",
   src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/mobilemoney.png",
  },
  {
   name: "OK Wallet",
   src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/okwallet.png",
  },
 ];

 return (
  <Modal
   open={openModal}
   onClose={() => setOpenModal(false)}
   aria-labelledby="payment-modal-title"
   aria-describedby="payment-modal-description"
   sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
   }}
  >
   <StyledModalContainer>
    <StyledModalContent>
     {/* Loading Bar */}
     <LoadingBarFixed />
     {/* Header Section */}
     <AppBar
      position="static"
      color="transparent"
      elevation={0}
      // Removed mb: 2 as it was causing extra space after fixing the header layout
      sx={{ position: "relative" }}
     >
      <Toolbar sx={{ justifyContent: "space-between", padding: 0 }}>
       <TimerContainer>
        <AccessTimeIcon />{" "}
        <Typography variant="body1">
         <span className="count-down">{formatTime(timeLeft)}</span>s{" "}
        </Typography>
       </TimerContainer>

       <EasyLangSwitch>
        <IconButton
         aria-label="change language"
         size="small"
         // You can add an onClick handler here for language switching
        >
         <LanguageIcon /> {/* Using a generic language icon */}
         {/* If you need the exact image, you can use:
                  <img alt="translation" src="assets/checkout_assets/img/translation_en.png" />
                  */}
        </IconButton>
        <IconButton
         aria-label="cancel transaction"
         onClick={(e) => handleLinkClick(e, "Cancel")}
         size="small"
        >
         <CloseIcon />
        </IconButton>
       </EasyLangSwitch>
      </Toolbar>
     </AppBar>

     <LogoWrap>
      <ClientLogoInner>
       {/* Client Logo - replace with an actual image source or MUI Avatar */}
       <img
        alt="Client Logo"
        src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAGQAAAAmCAYAAAAycj4zAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAI0UlEQVRoge2be3BTVR7Hn/fvR5M2adIn5VFaitAiRVocyohUtgVBEFZgXWVnfeysM+647NTxsbquqyzugjgio+OIj1FHd32BSJGHiwjyEhRUEIaHgG3B0iZp0jRJnzzP7xwuVtqkvXbIKj5/Jefc++HnnXvPOfce59ybC/nFTRAYAtc1K6aa3ATh++x/pOHBwIML+7FBc6gRSyEkZkmSkDEkyUoYkGSlDkoyUIUlGypAkI2VIkpEyJMlIGZJkpAxJMlKGJBkpQ5KMlCFJRsqQJCNlSJKRMiTJSBmSZKgudQL9xX7jXFRmMx0HvsS7d/+lTueHEYTvPovid2Wi/A16t4YMXfwAuqJh3QcWRcIOJ+079uBYsx4xFB6QfPuKfcEctAX5nHvx9aQ3RGXNoOC+RYiRCBG3B98XXxFxe7DUVtPwyDK5trsAmoI89MWFPXagHjEc88RKLLXVHP39HWI40pjy/0LE5ca9dQcxfwDj5aNJGz8WMRxGjEYTtL1OWb5DR3C++768QUY6mbOmox2cj/HnUiw1V+Na/8HAHsFPkJjPRywQjJvzwUegVJJeVZmg69WQYOMZnGvWJ5Q739tA6YY3EZRKtIMH9djeMu0aDCOL6TzdkGCsqaIcc9UEoj4/zateSaizXleLbvgwBEGg85tG2jZuwbN9d8Kci0LAUjMFy7RqNHm5RDt8tG/fTesba4gFgzKpoFZhnVlLxtVVqHOyiPkD+D4/ROuL7xL69nxC/gq9HtucGZirKlHZmom2e/HuO4DjrbVE2tySLmvhfNSZ1h7HwfPx7njugHffd9Or/9CRBG2/FnUxFJYGJthwpkdd+qQJWKZPpX3n3gRDDGWXkbVwPmGnSzJEUCooeKCOzNnTZVp9SRGWmil4tu3k9P2LZQNtmz8bpcEg06eVl5FePYkTd9QR64xr1bZMClcswTCyWKY1jhmN7YZZnLr3Ydp37ZPKdUMLKFzxGNpBefLY48Zgnzebr++6D//IsYAmzpqGrnBot2MQbnXSWnPJrPY7RhfRqiG5IAfYF18vKBLUGy7RqBJWKYOMZ3Fu2XXRnP0TO3QslMzo+P4irfjNiJIJl6mTMk64kfXIV1pk1ON5ZJ7VRGgwEjp7A8c46xHAY66zppJWXYSwbhW3e9bS8+gYIAsOWPYxhZDFiJIpz7ft0HPgStdWCbf71aAflMfQxhzgy7xbCLQ4UOi2FTy5BOyiPWGcQx1tr8R85hiYvB/uNc1FnWhm2/FGO3PBbYv4Ano924v/qqJRTWkU5mpwsABqXPEG03XvRY9CvIYZRJRhGlXRbF/MHaFq6UjoD/1cUBgNZN88HwLN9N6fu/gtiNAaAa90mcm5fSOD413i27ZK1Cxw/ybFb/kAsGAKgbeOHXLb6ZTS52aSNLaXl1TcwV1ViHDMagIZHlsrWPFf9Zkpefw5NTha2udfx7bMvYZ1Rg7YgH0SRk4v+jHffAUnftulDRn5rFZpsO5baapxr1nP26Repen1xIZba6njs9Zulqepi6dWQiKed0JlvE8o1udmoLBkUrlhC0z/WyM7Y/mIcXYLCoAPoPm5l yWc9p fn5V7dt2r/9YlkBkAsFMJ/8Ci a3GwEtRoAU8W4rsiYphnAcVVeYIci3RBsxPKCuL4+jQxTrzFiZTsZz+FGnGUkY2tknW2MKxSOH770fQqgm3Omi6P3dph/gBw+w7tvLt28vSSAXFAnx6u7EvmAP+X+6gbeNW/nc8IUpyWnTp0rvXiG8Y7+XnxRcYv3LdhgLXGa/oMpmMML3CYYt1ZnHpHu/VJJOu+/fcpJrWqMfX+2+oGHToAhiNwefPIfvT+4RSK/ZRMxXnKnB2/w2lQJvVAmqvrmNxR+hss1RnLB3Z50u/N4ItDhShpqUnqbowOaOqV+QwwYLtrnRp0yck4tB+nTpVSVeoQuflVhnEHK5FKtOnFJFz2xQAuOp34fl4T79y7ddzLHWWjexb450jSkRcbRdEjYcNN8e3kswxjWS7NQUh5j1yFQChLk3g2NcEG5oAyK+7E02tqaRXmk0UPbuctuH+cIvFtv3LOqOECCtl+HetgN/0m+MHt30XGNZOxTL0KX9c29PzJoNDr0BcX0rZxi6T37t2Pbe5MTOPj8uvayAWViiH/vQdBrSbc4qBp+TN9zlEe3WpRGVXUdo8TlYmCALKjHSErkF3f7STcKsTlTVD0mjycuGzL3Ct/4Cs3yxAodUy4pVncG/eStQfIH3SleiGDwXiiyqAGIvR+M/nGP5UfKt52Vsv4d27HzEcJq2iHFW6GVNFOZ2nvqH13+v6dJD+w0dxrduI9bppWGqmYKoop+OzL0CpwDPMHh8XpIiKUtLqvXWH7XrvH3/IsYDsB4/iXroDnu089sH+i2mYpqpUFNn0hUNwtX+K5+gXQBEw11iG/xL1O3Xj3npr0h72K9aodjJgRjS9/4D06u/D9/khFAYdpopyFDodusIhON5Zh+/gYXJuuxl9SREQv3pGvPCUrH/3hv/wbiK3vr0aotBqUGh7uOERRdxbP6bhb/FnMVGPl6i3A6UpDduca3HVb6LzdAMNjh/nB+oBfUoUsnD/8E+R9A+4f+5eU+oJg6J4hW3Xz4tWw/e1vEUPRxxzlyM/F+sC6a71x7w9Q+B+BgX2tXl2W9N71g4307h/vQxQ8WAX8oF1KFTmUvV799wzL/eZ+00Yk4937zNtv+iI/lGf7dO9CFFyVCX5Qp8lXh0mP7j7g+8L7lHqfQ/R31RCNgAAACAASUVORK5CYII="
       />
      </ClientLogoInner>
     </LogoWrap>

     <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
      Blucheez
     </Typography>
     {/* Top Navigation Menu */}
     <SslTokenMenu>
      <SslTokenMenuItem>
       <Button
        variant="text"
        color="inherit"
        startIcon={
         <HeaderIconWrap>
          <SupportIcon />
         </HeaderIconWrap>
        }
        onClick={(e) => handleLinkClick(e, "Support")}
       >
        Support
       </Button>
      </SslTokenMenuItem>
      <SslTokenMenuItem>
       <Button
        variant="text"
        color="inherit"
        startIcon={
         <HeaderIconWrap>
          <FaqIcon />
         </HeaderIconWrap>
        }
        onClick={(e) => handleLinkClick(e, "FAQ")}
       >
        FAQ
       </Button>
      </SslTokenMenuItem>
      <SslTokenMenuItem>
       <Button
        variant="text"
        color="inherit"
        startIcon={
         <HeaderIconWrap>
          <OffersIcon />
         </HeaderIconWrap>
        }
        onClick={(e) => handleLinkClick(e, "Offers")}
       >
        Offers
       </Button>
      </SslTokenMenuItem>
      <SslTokenMenuItem>
       <Button
        variant="text"
        color="inherit"
        startIcon={
         <HeaderIconWrap>
          <LoginIcon />
         </HeaderIconWrap>
        }
        onClick={(e) => handleLinkClick(e, "Login")}
       >
        Login
       </Button>
      </SslTokenMenuItem>
     </SslTokenMenu>
     {/* Payment Options Tabs */}
     <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 3 }}>
      <Tabs
       value={activeTab}
       onChange={handleTabChange}
       aria-label="Payment options tabs"
       centered
      >
       <Tab label="Cards" value="cards" />
       <Tab label="Mobile Banking" value="mobileBanking" />
       <Tab label="Net Banking" value="netBanking" />{" "}
      </Tabs>
     </Box>

     <Box
      sx={{
       minHeight: "250px",
       display: "flex",
       width: "100%",
       flexDirection: "column",
      }}
     >
      {/* Tab Content for Cards */}
      {activeTab === "cards" && (
       <Box>
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
         <img
          src="https://securepay.sslcommerz.com/gwprocess/v4/image/card_visa.png"
          alt="Visa"
          width="40"
          height="25"
         />
         <img
          src="https://securepay.sslcommerz.com/gwprocess/v4/image/card_master.png"
          alt="Mastercard"
          width="40"
          height="25"
         />
         <img
          src="https://securepay.sslcommerz.com/gwprocess/v4/image/card_amex.png"
          alt="Amex"
          width="40"
          height="25"
         />
         <img
          src="https://securepay.sslcommerz.com/gwprocess/v4/image/card_diners.png"
          alt="Diners"
          width="40"
          height="25"
         />
        </Box>

        <TextField
         required
         fullWidth
         name="cardNumber"
         label="Card Number"
         value={formData.cardNumber}
         onChange={handleChange}
         margin="normal"
        />

        <Grid container spacing={2}>
         <Grid item xs={12} sm={6}>
          <TextField
           required
           fullWidth
           name="cardExpiry"
           label="MM/YY"
           value={formData.cardExpiry}
           onChange={handleChange}
           margin="normal"
          />
         </Grid>
         <Grid item xs={12} sm={6}>
          <TextField
           required
           fullWidth
           name="cardCVC"
           label="CVC/CVV"
           value={formData.cardCVC}
           onChange={handleChange}
           margin="normal"
           InputProps={{
            endAdornment: (
             <InputAdornment position="end">
              <img src="/api/placeholder/24/16" alt="CVC" />
             </InputAdornment>
            ),
           }}
          />
         </Grid>
        </Grid>

        <TextField
         required
         fullWidth
         name="cardHolder"
         label="Card Holder Name"
         value={formData.cardHolder}
         onChange={handleChange}
         margin="normal"
        />

        <FormControlLabel
         control={
          <Checkbox
           name="saveCard"
           color="primary"
           checked={formData.saveCard}
           onChange={handleChange}
          />
         }
         label="Save card & remember me"
        />

        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
         After clicking the 'Pay now' button, you will be redirected to the
         issuer to complete your purchase securely.
        </Typography>
       </Box>
      )}
      {/* Tab Content for Mobile Banking */}
      {activeTab === "mobileBanking" && (
       <Box sx={{ p: 3 }}>
        <Box sx={{ mb: 2 }}>
         <CardSaveMsg variant="body2">
          Please login to show your saved wallets
         </CardSaveMsg>
        </Box>
        <PaymentItemMobileList>
         {paymentOptions.map((option) => (
          <PaymentItemMobileListItem key={option.name}>
           <PaymentItemMobileLink
            onClick={(e) => handlePaymentOptionClick(e, option.name)}
           >
            <MobBankNameImage alt={option.name} src={option.src} />
            {/* Only add download button if not Pathao Pay (as it didn't have one in original) */}
            {option.name !== "Pathao Pay" && (
             <LazyFelixDownloadButton aria-label="download">
              <LazyFelixIcon />
             </LazyFelixDownloadButton>
            )}
           </PaymentItemMobileLink>
          </PaymentItemMobileListItem>
         ))}
        </PaymentItemMobileList>
       </Box>
      )}
      {/* Tab Content for Net Banking */}
      {activeTab === "netBanking" && (
       <Box sx={{ p: 3 }}>
        <Elements stripe={stripePromise}>
         <NetBankingTabContent />
        </Elements>
       </Box>
      )}
     </Box>
    </StyledModalContent>
   </StyledModalContainer>
  </Modal>
 );
};

export default PaymentModal;
// import React, { useState, useEffect } from "react";
// import {
//  Modal,
//  Box,
//  Typography,
//  Tabs,
//  Tab,
//  Button,
//  Grid,
//  Paper,
//  SvgIcon,
//  AppBar,
//  Toolbar,
//  IconButton,
// } from "@mui/material";
// import { styled } from "@mui/system";
// import CloseIcon from "@mui/icons-material/Close"; // Material-UI Close Icon
// import AccessTimeIcon from "@mui/icons-material/AccessTime"; // Material-UI Clock Icon
// import LanguageIcon from "@mui/icons-material/Language"; // Material-UI Language Icon

// // --- Styled Components (replacing some original CSS or for custom elements) ---

// const StyledModalContainer = styled(Box)(({ theme }) => ({
//  textAlign: "center",
//  position: "relative",
//  paddingTop: theme.spacing(7.5), // Roughly 60px
//  outline: "none", // Remove focus outline on modal
// }));

// const StyledModalContent = styled(Paper)(({ theme }) => ({
//  position: "relative",
//  maxWidth: 600, // Max width for the modal content
//  margin: "0 auto", // Center the modal
//  padding: theme.spacing(3),
//  borderRadius: theme.shape.borderRadius,
//  boxShadow: theme.shadows[5],
//  outline: "none",
//  [theme.breakpoints.down("sm")]: {
//   margin: theme.spacing(2), // Smaller margin on small screens
//  },
// }));

// const LoadingBarFixed = styled(Box)(({ theme }) => ({
//  position: "absolute", // Changed to absolute within modal for better context
//  top: 0,
//  left: 0,
//  width: "100%",
//  height: 4,
//  backgroundColor: theme.palette.primary.main, // Using primary theme color
//  zIndex: theme.zIndex.modal + 1, // Ensure it's above other modal content
// }));

// const TimerContainer = styled(Box)(({ theme }) => ({
//  display: "flex",
//  alignItems: "center",
//  justifyContent: "center",
//  gap: theme.spacing(0.5), // 5px gap
//  position: "absolute",
//  top: theme.spacing(2),
//  left: theme.spacing(2),
//  color: theme.palette.text.secondary,
//  fontSize: "1.2em",
//  fontWeight: "bold",
// }));

// const EasyLangSwitch = styled(Box)(({ theme }) => ({
//  position: "absolute",
//  top: theme.spacing(1.25), // 10px
//  zIndex: theme.zIndex.modal + 2,
//  "& img": {
//   width: 24, // Adjust size for icons
//   height: 24,
//  },
// }));

// const LogoWrap = styled(Box)({
//  display: "flex",
//  justifyContent: "center",
//  alignItems: "center",
//  marginBottom: (theme) => theme.spacing(1.25), // 10px
// });

// const ClientLogoInner = styled(Box)({
//  display: "flex",
//  justifyContent: "center",
//  alignItems: "center",
// });

// const SslTokenMenu = styled("ul")({
//  display: "flex",
//  justifyContent: "space-around",
//  padding: 0,
//  margin: 0,
//  listStyle: "none",
//  width: "100%", // Ensure it takes full width for spacing
// });

// const SslTokenMenuItem = styled("li")({
//  flexGrow: 1,
//  textAlign: "center",
// });

// const HeaderIconWrap = styled(Box)({
//  width: 25,
//  height: 25,
//  display: "flex",
//  justifyContent: "center",
//  alignItems: "center",
//  marginBottom: (theme) => theme.spacing(0.625), // 5px
//  "& svg path, & svg ellipse": {
//   fill: "#1d1e22", // Default fill color for SVG paths
//  },
// });

// const PaymentItemMobileList = styled("ul")(({ theme }) => ({
//  display: "flex",
//  flexWrap: "wrap",
//  justifyContent: "center",
//  padding: 0,
//  listStyle: "none",
//  marginTop: theme.spacing(2), // Add some top margin
// }));

// const PaymentItemMobileListItem = styled("li")(({ theme }) => ({
//  flex: "0 0 calc(33.333% - 20px)", // 3 items per row, with some margin
//  maxWidth: "calc(33.333% - 20px)",
//  margin: theme.spacing(1.25), // 10px margin
//  boxSizing: "border-box",
//  textAlign: "center",
//  position: "relative",
//  [theme.breakpoints.down("sm")]: {
//   flex: "0 0 calc(50% - 20px)", // 2 items per row on small screens
//   maxWidth: "calc(50% - 20px)",
//  },
// }));

// const PaymentItemMobileLink = styled(Button)(({ theme }) => ({
//  display: "block", // Make the whole area clickable
//  padding: theme.spacing(1.25), // 10px padding
//  border: `1px solid ${theme.palette.divider}`, // Example border
//  borderRadius: theme.shape.borderRadius,
//  textDecoration: "none",
//  color: theme.palette.text.primary,
//  transition: theme.transitions.create(["transform", "box-shadow"], {
//   duration: theme.transitions.duration.shortest,
//  }),
//  "&:hover": {
//   transform: "translateY(-3px)", // Lift effect on hover
//   boxShadow: theme.shadows[4], // Subtle shadow on hover
//   backgroundColor: theme.palette.action.hover,
//  },
// }));

// const MobBankNameImage = styled("img")({
//  maxWidth: "80%",
//  height: "auto",
//  display: "block",
//  margin: "0 auto",
// });

// const LazyFelixDownloadButton = styled(IconButton)(({ theme }) => ({
//  position: "absolute",
//  bottom: theme.spacing(0.625), // 5px
//  right: theme.spacing(0.625), // 5px
//  padding: 0,
//  lineHeight: 1,
//  color: theme.palette.grey[600], // Adjust color
//  "&:hover": {
//   backgroundColor: "transparent",
//   color: theme.palette.grey[900],
//  },
// }));

// const CardSaveMsg = styled(Typography)(({ theme }) => ({
//  fontStyle: "italic",
//  color: theme.palette.text.secondary,
//  padding: theme.spacing(1.25), // 10px
//  border: `1px dashed ${theme.palette.divider}`,
//  borderRadius: theme.shape.borderRadius,
//  display: "inline-block",
//  marginTop: theme.spacing(2),
// }));

// // --- Custom SVG Icon Components (to use with MUI's SvgIcon) ---

// const SupportIcon = (props) => (
//  <SvgIcon {...props} viewBox="0 0 476 476">
//   <path d="M400.9,181v-18.3c0-43.8-15.5-84.5-43.6-114.7C328.5,17,288.9,0,245.6,0h-15.1c-43.2,0-82.8,17-111.6,48c-28.1,30.2-43.6,70.9-43.6,114.7V181c-34.1,2.3-61.2,30.7-61.2,65.4V275c0,36.1,29.4,65.5,65.5,65.5h36.9c6.6,0,12-5.4,12-12V192.8c0-6.6-5.4-12-12-12H99.3v-18.1C99.3,83.6,155.8,24,230.4,24h15.1c74.8,0,131.1,59.6,131.1,138.7v18.1h-17.2c-6.6,0-12,5.4-12,12v135.6c0,6.6,5.4,12,12,12h16.8c-4.9,62.6-48,77.1-68,80.4c-5.5-16.9-21.4-29.1-40.1-29.1h-30c-23.2,0-42.1,18.9-42.1,42.1s18.9,42.2,42.1,42.2h30.1c19.4,0,35.7-13.2,40.6-31c9.8-1.4,25.3-4.9,40.7-13.9c21.7-12.7,47.4-38.6,50.8-90.8c34.3-2.1,61.5-30.6,61.5-65.4v-28.6C462,211.7,435,183.2,400.9,181z M104.8,316.4H79.8c-22.9,0-41.5-18.6-41.5-41.5v-28.6c0-22.9,18.6-41.5,41.5-41.5h24.9V316.4z M268.2,452h-30.1c-10,0-18.1-8.1-18.1-18.1s8.1-18.1,18.1-18.1h30.1c10,0,18.1,8.1,18.1,18.1S278.2,452,268.2,452z M438,274.9c0,22.9-18.6,41.5-41.5,41.5h-24.9V204.8h24.9c22.9,0,41.5,18.6,41.5,41.5V274.9z" />
//  </SvgIcon>
// );

// const FaqIcon = (props) => (
//  <SvgIcon {...props} viewBox="0 0 612 612">
//   <path d="M230.724,181.208c-2.393,2.587-3.95,4.256-5.119,5.508C227.775,184.379,230.724,181.208,230.724,181.208z" />
//   <path d="M336.962,200.875c7.956,9.792,11.906,21.337,11.906,34.634c0,9.514-2.727,18.666-8.151,27.512c-2.977,5.007-6.898,9.848-11.795,14.465l-16.301,16.107c-15.634,15.356-25.732,28.958-30.35,40.865c-4.618,11.878-6.927,27.54-6.927,46.957h36.275c0-17.108,1.947-30.044,5.814-38.807c3.866-8.763,12.323-19.444,25.37-32.102c17.942-17.387,29.849-30.572,35.746-39.53s8.874-20.641,8.874-35.051c0-23.756-8.039-43.285-24.146-58.585c-16.106-15.3-37.526-22.922-64.288-22.922c-28.931,0-51.686,8.929-68.266,26.789s-24.87,41.449-24.87,70.797h36.275c0.667-17.665,3.478-31.184,8.346-40.559c8.679-16.83,24.369-25.259,47.068-25.259C315.875,186.187,329.033,191.083,336.962,200.875z" />
//   <path d="M612,306C612,137.004,474.995,0,306,0C137.004,0,0,137.004,0,306c0,168.995,137.004,306,306,306C474.995,612,612,474.995,612,306z M27.818,306C27.818,152.36,152.36,27.818,306,27.818S584.182,152.36,584.182,306S459.64,584.182,306,584.182S27.818,459.64,27.818,306z" />
//   <rect height="42.367" width="40.559" x="274.51" y="415.214" />
//  </SvgIcon>
// );

// const OffersIcon = (props) => (
//  <SvgIcon {...props} viewBox="0 0 384.1 384.1">
//   <path d="M344,80.1h-72c17.2-18.8,16.8-48-1.6-66c-18.8-18.8-49.2-18.8-67.6,0c-6.8,6.8-13.6,17.2-18.4,29.2c-4.8-12-11.6-22.4-18.4-29.2c-8.8-9.2-21.2-14-34-14s-24.8,4.8-34,14s-14,21.2-14,34c0,12,4.4,23.2,12.4,32H40c-22,0-40,18-40,40v32c0,10.4,6.8,19.2,16,22.8c0,0.4,0,0.8,0,1.2v168c0,22.8,23.2,40,44,40h268c22,0,40-18,40-40V174.9c9.6-3.6,16-12.4,16-22.8v-32C384,98.1,366,80.1,344,80.1z M214.1,25.3c12.4-12.4,32.8-12.4,45.2,0s12.4,32.8,0,45.2c-3.2,3.2-7.2,6-10.8,8.4c-0.8,0.4-1.2,0.8-2,1.6H192c0.8-1.2,1.2-2.8,1.2-4C192.9,59.3,204.1,35.3,214.1,25.3z M109.7,24.9c6-6,14-9.2,22.4-9.2s16.4,3.2,22.4,9.2c10,10,21.2,34,20.8,50.4c0,1.6,0.4,2.8,1.2,4h-54c-0.4,0-1.2-0.4-2.4-1.2c-4-2-7.6-4.8-10.4-8C97.2,57.7,97.2,37.3,109.7,24.9z M176.1,368.1h-116c-12.8,0-28-10.8-28-24v-168h144V368.1z M368,152.1c0,4.4-3.2,7.2-6.4,8c0,0-0.4,0-0.4,0.4c-0.4,0-0.8,0-1.2,0c-4.4,0-8,3.6-8,8v176c0,13.2-10.8,24-24,24H192V176.1h80c4.4,0,8-3.6,8-8s-3.6-8-8-8h-80v-36c0-4.4-3.6-8-8-8s-8,3.6-8,8v36H24c-4.4,0-8-3.6-8-8v-32c0-13.2,10.8-24,24-24h304c13.2,0,24,10.8,24,24V152.1z" />
//   <path d="M320,160.1h-12c-4.4,0-8,3.6-8,8s3.6,8,8,8h12c4.4,0,8-3.6,8-8C328,163.7,324.5,160.1,320,160.1z" />
//  </SvgIcon>
// );

// const LoginIcon = (props) => (
//  <SvgIcon {...props} viewBox="0 0 384.1 384.1">
//   <path d="M136.2,165.5c-3.5,0-6.4,2.9-6.4,6.4v38.4c0,3.5,2.9,6.4,6.4,6.4s6.4-2.9,6.4-6.4v-38.4C142.6,168.4,139.9,165.5,136.2,165.5z" />
//   <path d="M317,185.4h-95.9l20.9-20.9c2.2-2.2,2.2-5.7,0-7.8c-2.2-2.1-5.7-2.1-7.8,0l-30.4,30.4c-0.2,0.2-0.3,0.4-0.4,0.5l-0.1,0.2c-0.1,0.2-0.3,0.4-0.5,0.7l-0.1,0.2c-0.3,0.7-0.5,1.4-0.5,2.3l0,0.6l0,0.1c0.1,0.6,0.2,1.1,0.4,1.6c0.2,0.5,0.6,1.1,1.1,1.7l30.3,30.3c1,1,2.5,1.6,4,1.6c1.5,0,2.9-0.6,4-1.6c2.1-2.2,2.1-5.7,0-7.8l-20.9-20.9H317c3.1,0,5.5-2.5,5.5-5.5C322.5,187.9,320.1,185.4,317,185.4z" />
//   <path d="M147.9,0.8L87.3,25c-17.1,6.3-23.4,14.9-23.4,31.5v268.8c0,16.7,6.4,25.3,23.2,31.5l60.8,24.4c3,1.1,6,1.7,9,1.7c12.9,0,22.1-10.7,22.1-25.5V24.6C179.1,6.5,164.5-5.5,147.9,0.8z M166.4,357.5c0,7.6-3.7,12.8-9.4,12.8c-1.4,0-2.9-0.2-4.3-0.8l-60.8-24.3c-12-4.5-15-8.3-15-19.6V56.7c0-11.3,3-15.2,15.2-19.6l60.4-24.2c1.6-0.6,3-0.8,4.5-0.8c5.7,0,9.4,5.2,9.4,12.8V357.5L166.4,357.5z" />
//   <path d="M313.6,253c-3.5,0-6.4,2.9-6.4,6.4v66.1c0,10.6-8.7,19.3-19.3,19.3h-89.6c-3.5,0-6.4,2.9-6.4,6.4s2.9,6.4,6.4,6.4H288c17.7,0,32-14.3,32-32v-66.1C320,255.9,317.1,253,313.6,253z" />
//   <path d="M197.6,37.4H288c10.6,0,19.3,8.7,19.3,19.3v65.9c0,3.5,2.9,6.4,6.4,6.4s6.4-2.9,6.4-6.4V56.5c0-17.7-14.3-32-32-32h-90.4c-3.5,0-6.4,2.9-6.4,6.4C191.1,34.6,193.9,37.4,197.6,37.4z" />
//  </SvgIcon>
// );

// const LazyFelixIcon = (props) => (
//  <SvgIcon {...props} viewBox="0 0 27 25">
//   <path
//    d="M13.4518 13.0377C11.4186 12.7365 6.4864 16.878 5.39453 21.7726V22.0362C5.48795 24.1899 7.75902 24.9194 10.9292 24.0316C13.0111 23.1639 14.1728 23.1375 16.125 24.0316C17.9698 25.1612 20.41 23.7051 20.643 22.0362C20.3191 18.4517 16.3154 13.1956 13.4518 13.0377Z"
//    fill="#7A7A7A"
//    fillOpacity="0.7"
//   ></path>
//   <ellipse
//    cx="4.85476"
//    cy="11.946"
//    rx="2.97265"
//    ry="4.24369"
//    transform="rotate(-21.5283 4.85476 11.946)"
//    fill="#7A7A7A"
//    fillOpacity="0.7"
//   ></ellipse>
//   <ellipse
//    cx="22.0599"
//    cy="13.5489"
//    rx="2.97265"
//    ry="4.24369"
//    transform="rotate(22.9527 22.0599 13.5489)"
//    fill="#7A7A7A"
//    fillOpacity="0.7"
//   ></ellipse>
//   <ellipse
//    cx="10.1354"
//    cy="5.66514"
//    rx="2.92739"
//    ry="4.7215"
//    transform="rotate(-9.76985 10.1354 5.66514)"
//    fill="#7A7A7A"
//    fillOpacity="0.7"
//   ></ellipse>
//   <ellipse
//    cx="17.552"
//    cy="5.95842"
//    rx="2.92739"
//    ry="4.7215"
//    transform="rotate(14.6303 17.552 5.95842)"
//    fill="#7A7A7A"
//    fillOpacity="0.7"
//   ></ellipse>
//  </SvgIcon>
// );

// const PaymentModal = () => {
//  const [activeTab, setActiveTab] = useState("mobileBanking"); // Use descriptive IDs
//  const [timeLeft, setTimeLeft] = useState(4 * 60 + 19); // 4 minutes 19 seconds
//  const [openModal, setOpenModal] = useState(true); // State to control modal visibility

//  useEffect(() => {
//   // This effect handles the countdown timer
//   const timer = setInterval(() => {
//    setTimeLeft((prevTime) => {
//     if (prevTime <= 0) {
//      clearInterval(timer);
//      return 0;
//     }
//     return prevTime - 1;
//    });
//   }, 1000);

//   return () => clearInterval(timer); // Cleanup on component unmount
//  }, []);

//  const formatTime = (seconds) => {
//   const minutes = Math.floor(seconds / 60);
//   const remainingSeconds = seconds % 60;
//   return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
//    .toString()
//    .padStart(2, "0")}`;
//  };

//  const handleTabChange = (event, newValue) => {
//   setActiveTab(newValue);
//  };

//  const handleLinkClick = (e, action) => {
//   e.preventDefault(); // Prevent default link behavior
//   console.log(`Link clicked: ${action}`);
//   // In a real app, you'd trigger actual functionality here
//   if (action === "Cancel") {
//    setOpenModal(false); // Close modal on cancel
//   }
//  };

//  const handlePaymentOptionClick = (e, provider) => {
//   e.preventDefault();
//   console.log(`Payment option clicked: ${provider}`);
//   // Here you would navigate to the payment page or open a payment form
//  };

//  const paymentOptions = [
//   {
//    name: "Bkash",
//    src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/bkash.png",
//   },
//   {
//    name: "Nagad",
//    src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/nagad.png",
//   },
//   {
//    name: "Upay",
//    src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/upay.png",
//   },
//   {
//    name: "Cellfin",
//    src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/cellfin.png",
//   },
//   {
//    name: "IBBL Mobile",
//    src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/ibblmobile.png",
//   },
//   {
//    name: "Pocket",
//    src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/pocket.png",
//   },
//   {
//    name: "Deshipay",
//    src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/deshipay.png",
//   },
//   {
//    name: "Pathao Pay",
//    src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/pathaopay-logo.svg",
//   },
//   {
//    name: "Rainbow",
//    src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/rainbow.png",
//   },
//   {
//    name: "Mobile Money",
//    src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/mobilemoney.png",
//   },
//   {
//    name: "OK Wallet",
//    src: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw2/okwallet.png",
//   },
//  ];

//  return (
//   <Modal
//    open={openModal}
//    onClose={() => setOpenModal(false)}
//    aria-labelledby="payment-modal-title"
//    aria-describedby="payment-modal-description"
//    sx={{
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//    }}
//   >
//    <StyledModalContainer>
//     <StyledModalContent>
//      {/* Loading Bar */}
//      <LoadingBarFixed />

//      {/* Header Section */}
//      <AppBar
//       position="static"
//       color="transparent"
//       elevation={0}
//       sx={{ position: "relative", mb: 2 }}
//      >
//       <Toolbar sx={{ justifyContent: "space-between", padding: 0 }}>
//        <TimerContainer>
//         <AccessTimeIcon />
//         <Typography variant="body1">
//          <span className="count-down">{formatTime(timeLeft)}</span>s
//         </Typography>
//        </TimerContainer>

//        <Box>
//         <EasyLangSwitch sx={{ right: "14px" }}>
//          <IconButton
//           aria-label="cancel transaction"
//           onClick={(e) => handleLinkClick(e, "Cancel")}
//           size="small"
//          >
//           <CloseIcon />
//          </IconButton>
//         </EasyLangSwitch>
//         <EasyLangSwitch sx={{ right: "50px" }}>
//          <IconButton aria-label="change language" size="small">
//           <LanguageIcon /> {/* Using a generic language icon */}
//           {/* If you need the exact image, you can use:
//                     <img alt="translation" src="assets/checkout_assets/img/translation_en.png" />
//                     */}
//          </IconButton>
//         </EasyLangSwitch>
//        </Box>
//       </Toolbar>
//      </AppBar>

//      <LogoWrap>
//       <ClientLogoInner>
//        {/* Client Logo - replace with an actual image source or MUI Avatar */}
//        <img
//         alt="Client Logo"
//         src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAGQAAAAmCAYAAAAycj4zAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAI0UlEQVRoge2be3BTVR7Hn/fvR5M2adIn5VFaitAiRVocyohUtgVBEFZgXWVnfeysM+647NTxsbquqyzugjgio+OIj1FHd32BSJGHiwjyEhRUEIaHgG3B0iZp0jRJnzzP7xwuVtqkvXbIKj5/Jefc++HnnXvPOfce59ybC/nFTRAYAtc1K6aa3ATh++x/pOHBwIML+7FBc6gRSyEkZkmSkDEkyUoYkGSlDkoyUIUlGypAkI2VIkpEyJMlIGZJkpAxJMlKGJBkpQ5KMlCFJRsqQJCNlSJKRMiTJSBmSZKgudQL9xX7jXFRmMx0HvsS7d/+lTueHEYTvPovid2Wi/A16t4YMXfwAuqJh3QcWRcIOJ+079uBYsx4xFB6QfPuKfcEctAX5nHvx9aQ3RGXNoOC+RYiRCBG3B98XXxFxe7DUVtPwyDK5trsAmoI89MWFPXagHzEc88RKLLXVHP39HWI40pjy/0LE5ca9dQcxfwDj5aNJGz8WMRxGjEYTtL1OWb5DR3C++768QUY6mbOmox2cj/HyUiw1V+Na/8HAHsFPkJjPRywQjJvzwUegVJJeVZmg69WQYOMZnGvWJ5Q739tA6YY3EZRKtIMH9djeMu0aDCOL6TzdkGCsqaIcc9UEoj4/zateSaizXleLbvgwBEGg85tG2jZuwbN9d8Kci0LAUjMFy7RqNHm5RDt8tG/fTesba4gFgzKpoFZhnVlLxtVVqHOyiPkD+D4/ROuL7xL69nxC/gq9HtucGZirKlHZMom2e/HuO4DjrbVE2tySLmvhfNSZ1h7HwfPx7njugHffd9Or/9CRBG2/FnUxFJYGJthwpkdd+qQJWKZPpX3n3gRDDGWXkbVwPmGnSzJEUCooeKCOzNnTZVp9SRGWmil4tu3k9P2LZQNtmz8bpcEg06eVl5FePYkTd9QR64xr1bZMClcswTCyWKY1jhmN7YZZnLr3Ydp37ZPKdUMLKFzxGNpBefLY48Zgnzebr++6D//IsYAmzpqGrnBot2MQbnXSWnPJrPY7RhfRqiG5IAfYF18vKBLUGy7RqBJWKYOMZ3Fu2XXRnP0TO3QslMzo+P4irfjNiJIJl6mTMk64kfXIV1pk1ON5ZJ7VRGgwEjp7A8c46xHAY66zppJWXYSwbhW3e9bS8+gYIAsOWPYxhZDFiJIpz7ft0HPgStdWCbf71aAflMfQxhzgy7xbCLQ4UOi2FTy5BOyiPWGcQx1tr8R85hiYvB/uNc1FnWhm2/FGO3PBbYv4Ano924v/qqJRTWkU5mpwsABqXPEG03XvRY9CvIYZRJRhGlXRbF/MHaFq6UjoD/1cUBgNZN88HwLN9N6fu/gtiNAaAa90mcm5fSOD413i27ZK1Cxw/ybFb/kAsGAKgbeOHXLb6ZTS52aSNLaXl1TcwV1ViHDMagIZHlsrWPFf9Zkpefw5NTha2udfx7bMvYZ1Rg7YgH0SRk4v+jHffAUnftulDRv5rFZpsO5baapxr1nP26Repen1xIZba6njs9Zulqepi6dWQiKed0JlvE8o1udmoLBkUrlhC0z/WyM7Y/mIcXYLCoAPoPm5l yWc9p fn5V7dt2r/9YlkBkAsFMJ/8Ci a3GwEtRoAU8W4rsiYphnAcVVeYIci3RBsxPKCuL4+jQxTrzFiZTsZz+FGnGUkY2tknW2MKxSOH770fQqgm3Omi6P3fRph/gBw+w7tvLt28vSSAXFAnx6u7EvmAP+X+6gbeNW/nc8IUpyWnTp0rvXiG8Y7+XnxRcYv3LdhgLXGa/oMpmMML3CYYt1ZnHpHu/VJJOu+/fcpJrWqMfX+2+oGHToAhiNwefPIfvT+4RSK/ZRMxXnKnB2/w6lQJvVAmqvrmNxR+hss1RnLB3Z50u/N4ItDhShpqUnqbowOaOqV+QwwYLtrnRp0yck4tB+nTpVSVeoQuflVhnEHK5FKtOnFJFz2xQAuOp34fl4T79y7ddzLHWWjexb450jSkRcbRdEjYcNN8e3kswxjWS7NQUh5j1yFQChLk3g2NcEG5oAyK+7E02tqaRXmk0UPbuctuH+cIvFtv3LOqOECCtl+HetgN/0m+MHt30XGNZOxTL0KX9c29PzJoNDr0BcX0rZxi6T37t2Pbe5MTOPj8uvayAWViiH/vQdBrSbc4qBp+TN9zlEe3WpRGVXUdo8TlYmCALKjHSErkF3f7STcKsTlTVD0mjycuGzL3Ct/4Cs3yxAodUy4pVncG/eStQfIH3SleiGDwXiiyqAGIvR+M/nGP5UfKt52Vsv4d27HzEcJq2iHFW6GVNFOZ2nvqH13+v6dJD+w0dxrduI9bppWGqmYKoop+OzL0CpwDS+PD5FiSJpl5fi3roD99YdeD/5DNOEK7Df+EvSq6/C9/khFAYdpopyFDodusIhON5Zh+/gYXJuuxl9SREQv3pGvPCUrH/Xhv/w7iK3vr0aotBqUGh7uOERRdxbP6bhb/FnMVGPl6i3A6UpDduca3HVb6LzdAMNjz7O4AfqUKWzcc2bLQvhfG8DjtX10nfvnk85dfdDFDxYhzrTSvrkiVJdzB/g7NPP99mM8zQsfoJIewf2X81BZckgY+pkqS7scNG0bCXurTukYzt590MU3LcI67VT0WTb0dROkfTBprM0Ll6O7+BhDCOLyb7111Kd0mxCaTbJ+u7tpvFChO7+sGOqHJcQ9PvEOoN0njhJqLlFVj7onruk+xbH6vr4/BsKo8nPxTrtGnTDhiCoVYSaz+HZtouO/V92G1+h02KumoC+qBCUCoKnG/Hs2CNbJM0TK1EY9ARPNxA4cUrW3lg2CnW2nYjTlfDHIXWWDfPESrT5ucRCYQLHTtC++1PEUIju0BbkY7pyPJpsO7FAJ/7DR+NXbtdzKH1JUXyL3AvBxjMEjp7oVXOebg3pL8o0I8WrnkQ/YjgAZ554hpbX3h6o8D8LBvQFVbTDx/HfLcK5dgOh5hYcqxOfg6XonQG9Qr6P0mgg6vP/GKF/0vxor3BTZvSP/wK6zEBMS+b7eAAAAABJRU5ErkJggg=="
//        />
//       </ClientLogoInner>
//      </LogoWrap>

//      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
//       Blucheez
//      </Typography>

//      {/* Top Navigation Menu */}
//      <SslTokenMenu>
//       <SslTokenMenuItem>
//        <Button
//         variant="text"
//         color="inherit"
//         startIcon={
//          <HeaderIconWrap>
//           <SupportIcon />
//          </HeaderIconWrap>
//         }
//         onClick={(e) => handleLinkClick(e, "Support")}
//        >
//         Support
//        </Button>
//       </SslTokenMenuItem>
//       <SslTokenMenuItem>
//        <Button
//         variant="text"
//         color="inherit"
//         startIcon={
//          <HeaderIconWrap>
//           <FaqIcon />
//          </HeaderIconWrap>
//         }
//         onClick={(e) => handleLinkClick(e, "FAQ")}
//        >
//         FAQ
//        </Button>
//       </SslTokenMenuItem>
//       <SslTokenMenuItem>
//        <Button
//         variant="text"
//         color="inherit"
//         startIcon={
//          <HeaderIconWrap>
//           <OffersIcon />
//          </HeaderIconWrap>
//         }
//         onClick={(e) => handleLinkClick(e, "Offers")}
//        >
//         Offers
//        </Button>
//       </SslTokenMenuItem>
//       <SslTokenMenuItem>
//        <Button
//         variant="text"
//         color="inherit"
//         startIcon={
//          <HeaderIconWrap>
//           <LoginIcon />
//          </HeaderIconWrap>
//         }
//         onClick={(e) => handleLinkClick(e, "Login")}
//        >
//         Login
//        </Button>
//       </SslTokenMenuItem>
//      </SslTokenMenu>

//      {/* Payment Options Tabs */}
//      <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 3 }}>
//       <Tabs
//        value={activeTab}
//        onChange={handleTabChange}
//        aria-label="Payment options tabs"
//        centered
//       >
//        <Tab label="Cards" value="cards" />
//        <Tab label="Mobile Banking" value="mobileBanking" />
//        <Tab label="Net Banking" value="netBanking" />
//       </Tabs>
//      </Box>

//      <Box
//       sx={{
//        minHeight: "250px",
//        display: "flex",
//        width: "100%",
//        flexDirection: "column",
//       }}
//      >
//       {/* Tab Content for Cards */}
//       {activeTab === "cards" && (
//        <Box sx={{ p: 3 }}>
//         <Typography>Card payment options will appear here.</Typography>
//        </Box>
//       )}

//       {/* Tab Content for Mobile Banking */}
//       {activeTab === "mobileBanking" && (
//        <Box sx={{ p: 3 }}>
//         <Box sx={{ mb: 2 }}>
//          <CardSaveMsg variant="body2">
//           Please login to show your saved wallets
//          </CardSaveMsg>
//         </Box>
//         <PaymentItemMobileList>
//          {paymentOptions.map((option, index) => (
//           <PaymentItemMobileListItem key={option.name}>
//            <PaymentItemMobileLink
//             onClick={(e) => handlePaymentOptionClick(e, option.name)}
//            >
//             <MobBankNameImage alt={option.name} src={option.src} />
//             {/* Only add download button if not Pathao Pay (as it didn't have one in original) */}
//             {option.name !== "Pathao Pay" && (
//              <LazyFelixDownloadButton aria-label="download">
//               <LazyFelixIcon />
//              </LazyFelixDownloadButton>
//             )}
//            </PaymentItemMobileLink>
//           </PaymentItemMobileListItem>
//          ))}
//         </PaymentItemMobileList>
//        </Box>
//       )}

//       {/* Tab Content for Net Banking */}
//       {activeTab === "netBanking" && (
//        <Box sx={{ p: 3 }}>
//         <Typography>Net Banking options will appear here.</Typography>
//        </Box>
//       )}
//      </Box>
//     </StyledModalContent>
//    </StyledModalContainer>
//   </Modal>
//  );
// };

// export default PaymentModal;
