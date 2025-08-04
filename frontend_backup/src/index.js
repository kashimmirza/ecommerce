/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./styles/global.css";
import "./styles/main.css";

import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
//import theme from "./theme"; // Assuming you saved it in theme.js
import ShopContextProvider from "./Context/ShopContext";
const theme = createTheme({
 // You might want to define custom palette, typography, spacing, etc.
 // For now, the default Material-UI theme will provide the necessary
 // 'shadows' and 'palette.grey' values that your PaymentModal component uses.
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 <ShopContextProvider>
  <App />
 </ShopContextProvider>,
);

// import Footer from "./Components/Footer/Footer";
// import Shop from "./Pages/Shop";
// import Cart from "./Pages/Cart";
// import Product from "./Pages/Product";
// import ShopCategory from "./Pages/ShopCategory";
// import LoginSignup from "./Pages/LoginSignup";
// import Admin from "./AdminPages/Admin";
// import women_banner from "./Components/Assets/banner_women.png";
// import men_banner from "./Components/Assets/banner_mens.png";
// import kid_banner from "./Components/Assets/banner_kids.png";
// import ProductImageRoute from "./Components/ProductImageRoute";
// import Checkout from "./Components/Checkout/checkout";
// import ProductData from "./Pages/productData";
// import SearchDrawer from "./Pages/SearchDrawer";
// import CustomerLayout from "./Components/Layouts/CustomerLayout";
// import ProductGridPage from "./Pages/ProductGridPage";
// import PaymentModal from "./Components/PaymentModal";
// import BkashPage from "./Components/payments/bkash/BkashPayment";
// import ProductDisplaydetails from "./Pages/ProductDisplaydetails";
// import ProductDetailsPage from "./Pages/ProductDetailsPage";

// // Define your Material-UI theme here
// // You can customize it further as needed.
// const theme = createTheme({
//  // You might want to define custom palette, typography, spacing, etc.
//  // For now, the default Material-UI theme will provide the necessary
//  // 'shadows' and 'palette.grey' values that your PaymentModal component uses.
// });
