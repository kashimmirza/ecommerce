/** @format */
// import "./App.css";
// import Navbar from "./Components/Navbar/Navbar";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Shop from "./Pages/Shop";
// import ShopCategory from "./Pages/ShopCategory";
// import Product from "./Pages/Product";
// import Cart from "./Pages/Cart";
// import LoginSignup from "./Pages/LoginSignup";
// import Footer from "./Components/Footer/Footer";
// import men_banner from "./Components/Assets/banner_mens.png";
// import women_banner from "./Components/Assets/banner_women.png";
// import kid_banner from "./Components/Assets/banner_kids.png";
// import Admin from "./AdminPages/Admin";
// import React, { useContext, useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";

// function App() {
//  const [role, setRole] = useState(null);

//  useEffect(() => {
//   const savedRole = localStorage.getItem("role");
//   setRole(savedRole);
//   console.log(savedRole);
//  }, []);
//  return (
//   <div>
//    <BrowserRouter>
//     {role !== "admin" && <Navbar />}
//     <Routes>
//      {role === "admin" ? (
//       <Route path="/admin/*" element={<Admin />} />
//      ) : (
//       <>
//        <Route path="/" element={<Shop />} />
//        <Route
//         path="/mens"
//         element={<ShopCategory banner={men_banner} category="men" />}
//        />
//        <Route
//         path="/womens"
//         element={<ShopCategory banner={women_banner} category="women" />}
//        />
//        <Route
//         path="/kids"
//         element={<ShopCategory banner={kid_banner} category="kid" />}
//        />
//        <Route path="/cart" element={<Cart />} />
//        <Route path="/login" element={<LoginSignup />} />
//       </>
//      )}
//      <Route
//       path="*"
//       element={<Navigate to={role === "admin" ? "/admin" : "/"} />}
//      />
//     </Routes>
//     {role !== "admin" && <Footer />}
//    </BrowserRouter>
//   </div>
//  );
// }

// export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./Components/Navbar/Navbar";
// import ShopContextProvider from "./Context/ShopContext";
// import Home from "./Pages/Home";
// import Mens from "./Pages/Mens";
// import Womens from "./Pages/Womens";
// import Kids from "./Pages/Kids";
// import Login from "./Pages/Login";
// import Cart from "./Pages/Cart";
// import Admin from "./Pages/Admin";

// function App() {
//  return (
//   <Router>
//    <ShopContextProvider>
//     <Navbar />
//     <Routes>
//      <Route path="/" element={<Home />} />
//      <Route path="/mens" element={<Mens />} />
//      <Route path="/womens" element={<Womens />} />
//      <Route path="/kids" element={<Kids />} />
//      <Route path="/login" element={<Login />} />
//      <Route path="/cart" element={<Cart />} />
//      <Route path="/admin" element={<Admin />} />
//     </Routes>
//    </ShopContextProvider>
//   </Router>
//  );
// }

// export default App;

//============================conditional routing===================================

// import React, { useEffect, useState } from "react";
// import {
//  BrowserRouter as Router,
//  Routes,
//  Route,
//  Navigate,
// } from "react-router-dom";

// import { useNavigate } from "react-router-dom";
// import Navbar from "./Components/Navbar/Navbar";
// import Footer from "./Components/Footer/Footer";
// import Shop from "./Pages/Shop";
// import Cart from "./Pages/Cart";
// import Product from "./Pages/Product";
// import ShopCategory from "./Pages/ShopCategory";
// import LoginSignup from "./Pages/LoginSignup";
// import Admin from "./AdminPages/Admin";
// import women_banner from "./Components//Assets/banner_women.png";
// import men_banner from "./Components/Assets/banner_mens.png";
// import kid_banner from "./Components/Assets/banner_kids.png";

// function App() {
//  const [role, setRole] = useState(null);

//  useEffect(() => {
//   const savedRole = localStorage.getItem("role");
//   setRole(savedRole);
//   console.log("role in appjs:", savedRole);
//  }, []);

//  return (
//   <div>
//    <Router>
//     {/* Conditionally render Navbar based on role */}
//     {role !== "admin" && <Navbar />}

//     <Routes>
//      {/* Routes for Customers */}
//      {role !== "admin" ? (
//       <>
//        <Route path="/" element={<Shop gender="all" />} />
//        <Route
//         path="/mens"
//         element={<ShopCategory banner={men_banner} category="men" />}
//        />
//        <Route
//         path="/womens"
//         element={<ShopCategory banner={women_banner} category="women" />}
//        />
//        <Route
//         path="/kids"
//         element={<ShopCategory banner={kid_banner} category="kid" />}
//        />
//        <Route path="/product">
//         <Route path=":productId" element={<Product />} />
//        </Route>
//        <Route path="/cart" element={<Cart />} />
//        <Route path="/login" element={<LoginSignup />} />
//        // <Route path="/admin/*" element={<Admin />} />
//       </>
//      ) : (
//       <>
//        {/* Routes for Admin */}
//        <Route path="/admin/*" element={<Admin />} />
//        <Route path="*" element={<Navigate to="/admin" />} />
//       </>
//      )}

//      {/* Redirect based on role if no route matches */}
//      <Route
//       path="*"
//       element={<Navigate to={role === "admin" ? "/admin" : "/"} />}
//      />
//     </Routes>

//     {/* Conditionally render Footer based on role */}
//     {role !== "admin" && <Footer />}
//    </Router>
//   </div>
//  );
// }

// export default App;

//=========================
// import React, { useEffect, useState } from "react";
// import {
//  BrowserRouter as Router,
//  Routes,
//  Route,
//  Navigate,
// } from "react-router-dom";

// import Navbar from "./Components/Navbar/Navbar";
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

// function App() {
//  const [role, setRole] = useState(null);

//  useEffect(() => {
//   const savedRole = localStorage.getItem("role");
//   if (savedRole) {
//    setRole(savedRole);
//    console.log("Role in App.js:", savedRole);
//   }
//  }, []);

//  return (
//   <div>
//    <Router>
//     {/* Conditionally render Navbar */}
//     {role !== "admin" && <Navbar />}
//     <Routes>
//      <Route path="/login" element={<LoginSignup setRole={setRole} />} />
//     </Routes>

//     {/* Render Navbar only if not on admin pages */}
//     {role !== "Admin" && <Navbar />}

//     <Routes>
//      {/* Routes for Customers */}
//      {role !== "Admin" ? (
//       <>
//        <Route path="/" element={<Shop gender="all" />} />
//        <Route
//         path="/mens"
//         element={<ShopCategory banner={men_banner} category="men" />}
//        />
//        <Route
//         path="/womens"
//         element={<ShopCategory banner={women_banner} category="women" />}
//        />
//        <Route
//         path="/kids"
//         element={<ShopCategory banner={kid_banner} category="kid" />}
//        />
//        <Route path="/product">
//         <Route path=":productId" element={<Product />} />
//        </Route>
//        <Route path="/cart" element={<Cart />} />
//       </>
//      ) : (
//       <>
//        {/* Routes for Admin */}
//        <Route path="/admin/*" element={<Admin />} />
//        <Route path="*" element={<Navigate to="/admin" />} />
//       </>
//      )}

//      {/* Redirect based on role if no route matches */}
//      <Route
//       path="*"
//       element={<Navigate to={role === "admin" ? "/admin" : "/"} />}
//      />
//     </Routes>

//     {/* Render Footer only if not on admin pages */}
//     {role !== "Admin" && <Footer />}
//    </Router>
//   </div>
//  );
// }

// export default App;

//============================================
// import {
//  BrowserRouter as Router,
//  Routes,
//  Route,
//  Navigate,
// } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import Navbar from "./Components/Navbar/Navbar";
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

// function App() {
//  const [role, setRole] = useState(null);

//  useEffect(() => {
//   const savedRole = localStorage.getItem("role");
//   setRole(savedRole || "customer"); // Default to "customer" if no role is found
//   console.log("Role in App.js:", savedRole);
//  }, []);

//  if (role === null) {
//   // Render a loading state until the role is determined
//   return <div>Loading...</div>;
//  }

//  return (
//   <div>
//    <Router>
//     {/* Conditionally render Navbar */}
//     {role !== "Admin" && <Navbar />}

//     <Routes>
//      {/* Login Route */}
//      <Route path="/login" element={<LoginSignup setRole={setRole} />} />

//      {/* Role-based Routing */}
//      {role === "Admin" ? (
//       <>
//        <Route path="/admin/*" element={<Admin />} />
//        <Route path="*" element={<Navigate to="/admin" />} />
//        <Route path="/" element={<Shop gender="Shop" />} />
//       </>
//      ) : (
//       <>
//        // <Route path="/" element={<Shop gender="all" />} />
//        <Route path="/" element={<Shop gender="Shop" />} />
//        <Route
//         path="/mens"
//         element={<ShopCategory banner={men_banner} category="men" />}
//        />
//        <Route
//         path="/womens"
//         element={<ShopCategory banner={women_banner} category="women" />}
//        />
//        <Route
//         path="/kids"
//         element={<ShopCategory banner={kid_banner} category="kid" />}
//        />
//        <Route path="/product/:productId" element={<Product />} />
//        <Route path="/cart" element={<Cart />} />
//        <Route path="*" element={<Navigate to="/" />} />
//       </>
//      )}
//     </Routes>

//     {/* Conditionally render Footer */}
//     {role !== "Admin" && <Footer />}
//    </Router>
//   </div>
//  );
// }

// export default App;
//original one
// import {
//  BrowserRouter as Router,
//  Routes,
//  Route,
//  Navigate,
// } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import Navbar from "./Components/Navbar/Navbar";
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

// function App() {
//  const [role, setRole] = useState(null);

//  useEffect(() => {
//   const savedRole = localStorage.getItem("role");
//   setRole(savedRole || "customer"); // Default to "customer" if no role is found
//   console.log("Role in App.js:", savedRole);
//  }, []);

//  const handleLogout = () => {
//   // Clear role and redirect to home page
//   localStorage.removeItem("role");
//   setRole("customer"); // Reset to default "customer" role
//  };

//  if (role === null) {
//   // Render a loading state until the role is determined
//   return <div>Loading...</div>;
//  }

//  return (
//   <div>
//    <Router>
//     {/* Conditionally render Navbar */}
//     {role !== "Admin" && <Navbar />}

//     <Routes>
//      {/* Login Route */}
//      <Route path="/login" element={<LoginSignup setRole={setRole} />} />

//      {/* Role-based Routing */}
//      {role === "Admin" ? (
//       <>
//        <Route path="/admin/*" element={<Admin onLogout={handleLogout} />} />
//        <Route path="*" element={<Navigate to="/admin" />} />
//       </>
//      ) : (
//       <>
//        <Route path="/" element={<Shop gender="Shop" />} />
//        <Route
//         path="/mens"
//         element={<ShopCategory banner={men_banner} category="men" />}
//        />
//        <Route
//         path="/womens"
//         element={<ShopCategory banner={women_banner} category="women" />}
//        />
//        <Route
//         path="/kids"
//         element={<ShopCategory banner={kid_banner} category="kid" />}
//        />
//        <Route path="/product/:productId" element={<Product />} />
//        <Route path="/cart" element={<Cart />} />
//        <Route path="*" element={<Navigate to="/" />} />
//       </>
//      )}
//     </Routes>

//     {/* Conditionally render Footer */}
//     {role !== "Admin" && <Footer />}
//    </Router>
//   </div>
//  );
// }
// export default App;
//latest edited working fine

// import {
//  BrowserRouter as Router,
//  Routes,
//  Route,
//  Navigate,
// } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import Navbar from "./Components/Navbar/Navbar";
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

// function App() {
//  const [role, setRole] = useState(null);

//  useEffect(() => {
//   const savedRole = localStorage.getItem("role");
//   setRole(savedRole || "customer"); // Default to "customer" if no role found
//  }, []);

//  const handleLogout = () => {
//   localStorage.clear();
//   setRole("customer"); // Reset to default role
//  };

//  if (role === null) {
//   return <div>Loading...</div>; // Render loading state until role is determined
//  }

//  return (
//   <div>
//    <Router>
//     {role !== "Admin" && <Navbar role={role} onLogout={handleLogout} />}
//     <Routes>
//      <Route path="/login" element={<LoginSignup setRole={setRole} />} />
//      {role === "Admin" ? (
//       <>
//        <Route path="/admin/*" element={<Admin onLogout={handleLogout} />} />
//        <Route path="*" element={<Navigate to="/admin" />} />
//       </>
//      ) : (
//       <>
//        <Route path="/" element={<Shop gender="Shop" />} />
//        <Route
//         path="/mens"
//         element={<ShopCategory banner={men_banner} category="men" />}
//        />
//        <Route
//         path="/womens"
//         element={<ShopCategory banner={women_banner} category="women" />}
//        />
//        <Route
//         path="/kids"
//         element={<ShopCategory banner={kid_banner} category="kid" />}
//        />
//        <Route path="/product/:productId" element={<Product />} />
//        <Route path="/cart" element={<Cart />} />
//        <Route path="*" element={<Navigate to="/" />} />
//       </>
//      )}
//     </Routes>
//     {role !== "Admin" && <Footer />}
//    </Router>
//   </div>
//  );
// }

// export default App;

// import {
//  BrowserRouter as Router,
//  Routes,
//  Route,
//  Navigate,
// } from "react-router-dom";

// import React, { useState, useEffect } from "react";

// import Navbar from "./Components/Navbar/Navbar";

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

// import Header from "./Components/Navbar/Header";

// import Checkout from "./Components/Checkout/checkout"; // Import Checkout component

// import NewCollection from "./Components/NewCollections/NewCollections";

// import ProductCard from "./Pages/ProductCard";

// import PromoText from "./Components/sliderOrSwiperOrCouresel/PromoText";

// import ProductGallery from "./Components/Product/ProductGallery";

// import ImageSwiper from "./Components/ImageSwiper";

// import EcommerceWebsite from "./Pages/EcommerceWebsite";

// import ProductDisplaydetails from "./Pages/ProductDisplaydetails";

// import ProductDetailsPage from "./Pages/ProductDetailsPage";

// import ProductData from "./Pages/productData";

// import PaymentGatewayRough from "./Pages/paymentgatewayrough";

// import SearchDrawer from "./Pages/SearchDrawer";

// import paymentgatewayrough from "./Pages/paymentgatewayrough";

// import BlucheezHeader from "./Pages/BlucheezHeader";

// import CustomerLayout from "./Components/Layouts/CustomerLayout";

// import ProductGridPage from "./Pages/ProductGridPage";

// import PaymentModal from "./Components/PaymentModal";

// import BkashPage from "./Components/payments/bkash/BkashPayment";

// function App() {
//  const [role, setRole] = useState(null);

//  useEffect(() => {
//   const savedRole = localStorage.getItem("role");

//   setRole(savedRole || "customer"); // Default to "customer" if no role found
//  }, []);

//  const handleLogout = () => {
//   localStorage.clear();

//   setRole("customer"); // Reset to default role
//  };

//  console.log("role after log in ", role);

//  if (role === null) {
//   return <div>Loading...</div>; // Render loading state until role is determined
//  }

//  return (
//   <div>
//    <Router>
//     {/*{role !== "Admin" && <Navbar role={role} onLogout={handleLogout} />}*/}

//     <Routes>
//      <Route path="/login" element={<LoginSignup setRole={setRole} />} />

//      {role === "Admin" ? (
//       <>
//        <Route path="/admin/*" element={<Admin onLogout={handleLogout} />} />

//        <Route path="*" element={<Navigate to="/admin" />} />
//       </>
//      ) : (
//       <>
//        <Route
//         path="/"
//         element={<CustomerLayout role={role} onLogout={handleLogout} />}
//        >
//         <Route path="/" element={<Shop gender="Shop" />} />

//         <Route
//          path="/mens"
//          element={<ShopCategory banner={men_banner} category="men" />}
//         />

//         <Route path="/productdata" element={<ProductData />} />

//         <Route
//          path="/womens"
//          element={<ShopCategory banner={women_banner} category="women" />}
//         />

//         <Route
//          path="/kids"
//          element={<ShopCategory banner={kid_banner} category="kid" />}
//         />

//         <Route path="/product/:productId" element={<Product />} />

//         <Route
//          path="/product-images/:productId"
//          element={<ProductImageRoute />}
//         />

//         <Route path="/paymentmodal" element={<PaymentModal />} />

//         <Route path="/payment/bkash" element={<BkashPage />} />

//         <Route path="/ecommercewebsite" element={<EcommerceWebsite />} />

//         <Route
//          path="/productDisplayDetails"
//          element={<ProductDisplaydetails />}
//         />

//         <Route
//          path="/productDetailsPage/:productId"
//          element={<ProductDetailsPage />}
//         />

//         <Route path="/productgridpage" element={<ProductGridPage />} />

//         <Route path="/paymentgateway" element={<PaymentGatewayRough />} />

//         <Route path="/searchdrawer" element={<SearchDrawer />} />

//         <Route
//          path="/checkout"
//          element={
//           localStorage.getItem("userId") ? (
//            <Checkout />
//           ) : (
//            <Navigate to="/login" /> // Redirect to login if not logged in
//           )
//          }
//         />

//         {/* ProductCard demo route */}

//         <Route path="/cart" element={<Cart />} />

//         <Route path="/imageswiper" element={<ImageSwiper />} />

//         <Route path="*" element={<Navigate to="/" />} />
//        </Route>
//       </>
//      )}
//     </Routes>

//     {role !== "Admin" && <Footer />}
//    </Router>
//   </div>
//  );
// }

// export default App;
//correct version of the app.js file
import {
 BrowserRouter as Router,
 Routes,
 Route,
 Navigate,
} from "react-router-dom";

import React, { useState, useEffect } from "react";

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import ShopCategory from "./Pages/ShopCategory";
import LoginSignup from "./Pages/LoginSignup";
import Admin from "./AdminPages/Admin";
import women_banner from "./Components/Assets/banner_women.png";
import men_banner from "./Components/Assets/banner_mens.png";
import kid_banner from "./Components/Assets/banner_kids.png";
import ProductImageRoute from "./Components/ProductImageRoute";
import Header from "./Components/Navbar/Header";
import Checkout from "./Components/Checkout/checkout";
import NewCollection from "./Components/NewCollections/NewCollections";
import ProductCard from "./Pages/ProductCard";
import PromoText from "./Components/sliderOrSwiperOrCouresel/PromoText";
import ProductGallery from "./Components/Product/ProductGallery";
import ImageSwiper from "./Components/ImageSwiper";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import EcommerceWebsite from "./Pages/EcommerceWebsite";
import ProductDisplaydetails from "./Pages/ProductDisplaydetails";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import ProductData from "./Pages/productData";
import PaymentGatewayRough from "./Pages/paymentgatewayrough";
import SearchDrawer from "./Pages/SearchDrawer";
import PaymentModal from "./Components/PaymentModal";
import CustomerLayout from "./Components/Layouts/CustomerLayout";
import ProductGridPage from "./Pages/ProductGridPage";

const theme = createTheme({});

function App() {
 const [role, setRole] = useState(null);

 useEffect(() => {
  const savedRole = localStorage.getItem("role");
  setRole(savedRole || "customer");
 }, []);

 const handleLogout = () => {
  localStorage.clear();
  setRole("customer");
 };

 console.log("role after log in ", role);

 if (role === null) {
  return <div>Loading...</div>;
 }

 return (
  <ThemeProvider theme={theme}>
   <div>
    <Router>
     <Routes>
      <Route path="/login" element={<LoginSignup setRole={setRole} />} />

      {role === "Admin" ? (
       <>
        <Route path="/admin/*" element={<Admin onLogout={handleLogout} />} />
        <Route path="*" element={<Navigate to="/admin" />} />
       </>
      ) : (
       <>
        <Route
         path="/"
         element={<CustomerLayout role={role} onLogout={handleLogout} />}
        >
         {/* These are the routes that will be rendered inside CustomerLayout */}
         <Route path="/" element={<Shop gender="Shop" />} />{" "}
         {/* Your original way of defining the default route */}
         <Route
          path="/mens"
          element={<ShopCategory banner={men_banner} category="men" />}
         />
         <Route path="/productdata" element={<ProductData />} />
         <Route
          path="/womens"
          element={<ShopCategory banner={women_banner} category="women" />}
         />
         <Route
          path="/kids"
          element={<ShopCategory banner={kid_banner} category="kid" />}
         />
         <Route path="/product/:productId" element={<Product />} />
         <Route
          path="/product-images/:productId"
          element={<ProductImageRoute />}
         />
         <Route path="/ecommercewebsite" element={<EcommerceWebsite />} />
         <Route
          path="/productDisplayDetails"
          element={<ProductDisplaydetails />}
         />
         <Route
          path="/productDetailsPage/:productId"
          element={<ProductDetailsPage />}
         />
         <Route path="/productgridpage" element={<ProductGridPage />} />
         <Route path="/paymentgateway" element={<PaymentGatewayRough />} />
         <Route path="/paymentmodal" element={<PaymentModal />} />
         <Route path="/searchdrawer" element={<SearchDrawer />} />
         <Route
          path="/checkout"
          element={
           localStorage.getItem("userId") ? (
            <Checkout />
           ) : (
            <Navigate to="/login" />
           )
          }
         />
         <Route path="/cart" element={<Cart />} />
         <Route path="/imageswiper" element={<ImageSwiper />} />
         <Route path="*" element={<Navigate to="/" />} />
        </Route>
       </>
      )}
     </Routes>
     {role !== "Admin" && <Footer />}
    </Router>
   </div>
  </ThemeProvider>
 );
}

export default App;
// import {
//  BrowserRouter as Router,
//  Routes,
//  Route,
//  Navigate,
// } from "react-router-dom";

// import React, { useState, useEffect } from "react";

// import Navbar from "./Components/Navbar/Navbar";

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

// import Header from "./Components/Navbar/Header";

// import Checkout from "./Components/Checkout/checkout"; // Import Checkout component

// import NewCollection from "./Components/NewCollections/NewCollections";

// import ProductCard from "./Pages/ProductCard";

// import PromoText from "./Components/sliderOrSwiperOrCouresel/PromoText";

// import ProductGallery from "./Components/Product/ProductGallery";

// import ImageSwiper from "./Components/ImageSwiper";

// import EcommerceWebsite from "./Pages/EcommerceWebsite";

// import ProductDisplaydetails from "./Pages/ProductDisplaydetails";

// import ProductDetailsPage from "./Pages/ProductDetailsPage";

// import ProductData from "./Pages/productData";

// import PaymentGatewayRough from "./Pages/paymentgatewayrough";

// import SearchDrawer from "./Pages/SearchDrawer";

// import paymentgatewayrough from "./Pages/paymentgatewayrough";

// import BlucheezHeader from "./Pages/BlucheezHeader";

// import CustomerLayout from "./Components/Layouts/CustomerLayout";

// import ProductGridPage from "./Pages/ProductGridPage";

// import PaymentModal from "./Components/PaymentModal";

// import BkashPage from "./Components/payments/bkash/BkashPayment";

// function App() {
//  const [role, setRole] = useState(null);

//  useEffect(() => {
//   const savedRole = localStorage.getItem("role");

//   setRole(savedRole || "customer"); // Default to "customer" if no role found
//  }, []);

//  const handleLogout = () => {
//   localStorage.clear();

//   setRole("customer"); // Reset to default role
//  };

//  console.log("role after log in ", role);

//  if (role === null) {
//   return <div>Loading...</div>; // Render loading state until role is determined
//  }

//  return (
//   <div>
//
//    <Router>
//        {" "}
//     {/*{role !== "Admin" && <Navbar role={role} onLogout={handleLogout} />}*/}
//      {" "}
//     <Routes>
//           <Route path="/login" element={<LoginSignup setRole={setRole} />} />
//
//      {role === "Admin" ? (
//       <>
//
//        <Route path="/admin/*" element={<Admin onLogout={handleLogout} />} />
//               <Route path="*" element={<Navigate to="/admin" />} />     {" "}
//       </>
//      ) : (
//       <>
//
//        <Route
//         path="/"
//         element={<CustomerLayout role={role} onLogout={handleLogout} />}
//        >
//                 <Route path="/" element={<Shop gender="Shop" />} />       {" "}
//         <Route
//          path="/mens"
//          element={<ShopCategory banner={men_banner} category="men" />}
//         />
//                 <Route path="/productdata" element={<ProductData />} />       {" "}
//         <Route
//          path="/womens"
//          element={<ShopCategory banner={women_banner} category="women" />}
//         />
//                {" "}
//         <Route
//          path="/kids"
//          element={<ShopCategory banner={kid_banner} category="kid" />}
//         />
//                 <Route path="/product/:productId" element={<Product />} />
//          {" "}
//         <Route
//          path="/product-images/:productId"
//          element={<ProductImageRoute />}
//         />
//                {" "}
//         <Route path="/ecommercewebsite" element={<EcommerceWebsite />} />       {" "}
//         <Route
//          path="/productDisplayDetails"
//          element={<ProductDisplaydetails />}
//         />
//                {" "}
//         <Route
//          path="/productDetailsPage/:productId"
//          element={<ProductDetailsPage />}
//         />
//                 <Route path="/productgridpage" element={<ProductGridPage />} />
//                 <Route path="/bkashpage" element={<BkashPage />} />       {" "}
//         <Route path="/paymentmodalcheifminister" element={<PaymentModal />} />
//                 <Route path="/bkashpayment" element={<PaymentGatewayRough />} />
//                 <Route path="/searchdrawer" element={<SearchDrawer />} />       {" "}
//         <Route
//          path="/checkout"
//          element={
//           localStorage.getItem("userId") ? (
//            <Checkout />
//           ) : (
//            <Navigate to="/login" /> // Redirect to login if not logged in
//           )
//          }
//         />
//                 {/* ProductCard demo route */}
//                 <Route path="/cart" element={<Cart />} />
//                 <Route path="/imageswiper" element={<ImageSwiper />} />       {" "}
//         {/*<Route path="*" element={<Navigate to="/" />} />*/}       {" "}
//         <Route
//          path="/shop"
//          element={role === "User" ? <Shop /> : <Navigate to="/" />}
//         />
//
//        </Route>
//             {" "}
//       </>
//      )}
//         {" "}
//     </Routes>
//         {role !== "Admin" && <Footer />}
//    </Router>
//     {" "}
//   </div>
//  );
// }

// export default App;
// import {
//  BrowserRouter as Router,
//  Routes,
//  Route,
//  Navigate,
// } from "react-router-dom";
// import React, { useState, useEffect } from "react";
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
// import PaymentModal from "./Components/PaymentModal"; // Keep this import
// import BkashPage from "./Components/payments/bkash/BkashPayment";
// import ProductDisplaydetails from "./Pages/ProductDisplaydetails";
// import ProductDetailsPage from "./Pages/ProductDetailsPage";

// function App() {
//  const [role, setRole] = useState(null);

//  useEffect(() => {
//   const savedRole = localStorage.getItem("role");
//   setRole(savedRole || "customer"); // Default to "customer" if no role found
//  }, []);

//  const handleLogout = () => {
//   localStorage.clear();
//   setRole("customer"); // Reset to default role
//  };

//  console.log("role after log in ", role);

//  if (role === null) {
//   return <div>Loading...</div>; // Render loading state until role is determined
//  }

//  return (
//   <div>
//    <Router>
//     <Routes>
//      <Route path="/login" element={<LoginSignup setRole={setRole} />} />
//      {role === "Admin" ? (
//       <>
//        <Route path="/admin/*" element={<Admin onLogout={handleLogout} />} />
//        <Route path="*" element={<Navigate to="/admin" />} />
//       </>
//      ) : (
//       <>
//        <Route
//         path="/"
//         element={<CustomerLayout role={role} onLogout={handleLogout} />}
//        >
//         <Route path="/" element={<Shop gender="Shop" />} />
//         <Route
//          path="/mens"
//          element={<ShopCategory banner={men_banner} category="men" />}
//         />
//         <Route path="/productdata" element={<ProductData />} />
//         <Route
//          path="/womens"
//          element={<ShopCategory banner={women_banner} category="women" />}
//         />
//         <Route
//          path="/kids"
//          element={<ShopCategory banner={kid_banner} category="kid" />}
//         />
//         <Route path="/product/:productId" element={<Product />} />
//         <Route
//          path="/product-images/:productId"
//          element={<ProductImageRoute />}
//         />
//         <Route
//          path="/productDisplayDetails"
//          element={<ProductDisplaydetails />}
//         />
//         <Route
//          path="/productDetailsPage/:productId"
//          element={<ProductDetailsPage />}
//         />
//         <Route path="/productgridpage" element={<ProductGridPage />} />
//         <Route path="/bkashpage" element={<BkashPage />} />
//         {/* This is where you would typically trigger the PaymentModal */}
//         {/* For example, if your Checkout component has a button that leads to payment */}
//         <Route
//          path="/checkout"
//          element={
//           localStorage.getItem("userId") ? (
//            <Checkout />
//           ) : (
//            <Navigate to="/login" /> // Redirect to login if not logged in
//           )
//          }
//         />
//         <Route path="/searchdrawer" element={<SearchDrawer />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="*" element={<Navigate to="/" />} />{" "}
//         {/* Catch-all for customer */}
//        </Route>
//        {/* PaymentModal can be rendered outside the CustomerLayout if it's a global overlay,
//                     or inside if it's tightly coupled to the customer flow.
//                     For simplicity, I'm keeping it here, assuming it's triggered from within
//                     a customer-facing page like Checkout. */}
//        <Route path="/paymentmodal" element={<PaymentModal />} />
//       </>
//      )}
//     </Routes>
//     {role !== "Admin" && <Footer />}
//    </Router>
//   </div>
//  );
// }

// export default App;
// app.js
// import {
//  BrowserRouter as Router,
//  Routes,
//  Route,
//  Navigate,
// } from "react-router-dom";
// import React, { useState, useEffect } from "react";

// // Import Material-UI ThemeProvider and createTheme
// import { ThemeProvider, createTheme } from "@mui/material/styles";

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

// function App() {
//  const [role, setRole] = useState(null);

//  useEffect(() => {
//   const savedRole = localStorage.getItem("role");
//   setRole(savedRole || "customer"); // Default to "customer" if no role found
//  }, []);

//  const handleLogout = () => {
//   localStorage.clear();
//   setRole("customer"); // Reset to default role
//  };

//  console.log("role after log in ", role);

//  if (role === null) {
//   return <div>Loading...</div>; // Render loading state until role is determined
//  }

//  return (
//   // Wrap your entire application (specifically the Router) with ThemeProvider
//   <ThemeProvider theme={theme}>
//    <div>
//     <Router>
//      <Routes>
//       <Route path="/login" element={<LoginSignup setRole={setRole} />} />
//       {role === "Admin" ? (
//        <>
//         <Route path="/admin/*" element={<Admin onLogout={handleLogout} />} />
//         <Route path="*" element={<Navigate to="/admin" />} />
//        </>
//       ) : (
//        <>
//         <Route
//          path="/"
//          element={<CustomerLayout role={role} onLogout={handleLogout} />}
//         >
//          <Route path="/" element={<Shop gender="Shop" />} />
//          <Route
//           path="/mens"
//           element={<ShopCategory banner={men_banner} category="men" />}
//          />
//          <Route path="/productdata" element={<ProductData />} />
//          <Route
//           path="/womens"
//           element={<ShopCategory banner={women_banner} category="women" />}
//          />
//          <Route
//           path="/kids"
//           element={<ShopCategory banner={kid_banner} category="kid" />}
//          />
//          <Route path="/product/:productId" element={<Product />} />
//          <Route
//           path="/product-images/:productId"
//           element={<ProductImageRoute />}
//          />
//          <Route
//           path="/productDisplayDetails"
//           element={<ProductDisplaydetails />}
//          />
//          <Route
//           path="/productDetailsPage/:productId"
//           element={<ProductDetailsPage />}
//          />
//          <Route path="/productgridpage" element={<ProductGridPage />} />
//          <Route path="/bkashpage" element={<BkashPage />} />

//          <Route
//           path="/checkout"
//           element={
//            localStorage.getItem("userId") ? (
//             <Checkout />
//            ) : (
//             <Navigate to="/login" /> // Redirect to login if not logged in
//            )
//           }
//          />
//          <Route path="/searchdrawer" element={<SearchDrawer />} />
//          <Route path="/cart" element={<Cart />} />
//          <Route path="*" element={<Navigate to="/" />} />
//         </Route>
//         {/* The PaymentModal route here will also receive the theme */}
//         <Route path="/paymentmodal" element={<PaymentModal />} />
//        </>
//       )}
//      </Routes>
//      {role !== "Admin" && <Footer />}
//     </Router>
//    </div>
//   </ThemeProvider>
//  );
// }

// export default App;

// import {
//  BrowserRouter as Router,
//  Routes,
//  Route,
//  Navigate,
// } from "react-router-dom";

// import React, { useState, useEffect } from "react";

// import Navbar from "./Components/Navbar/Navbar";

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

// import Header from "./Components/Navbar/Header";

// import Checkout from "./Components/Checkout/checkout"; // Import Checkout component

// import NewCollection from "./Components/NewCollections/NewCollections";

// import ProductCard from "./Pages/ProductCard";

// import PromoText from "./Components/sliderOrSwiperOrCouresel/PromoText";

// import ProductGallery from "./Components/Product/ProductGallery";

// import ImageSwiper from "./Components/ImageSwiper";

// import EcommerceWebsite from "./Pages/EcommerceWebsite";

// import ProductDisplaydetails from "./Pages/ProductDisplaydetails";

// import ProductDetailsPage from "./Pages/ProductDetailsPage";

// import ProductData from "./Pages/productData";

// import PaymentGatewayRough from "./Pages/paymentgatewayrough";

// import SearchDrawer from "./Pages/SearchDrawer";

// import paymentgatewayrough from "./Pages/paymentgatewayrough";

// import BlucheezHeader from "./Pages/BlucheezHeader";

// import CustomerLayout from "./Components/Layouts/CustomerLayout";

// import ProductGridPage from "./Pages/ProductGridPage";

// import PaymentModal from "./Components/PaymentModal";

// import BkashPage from "./Components/payments/bkash/BkashPayment";

// function App() {
//  const [role, setRole] = useState(null);

//  useEffect(() => {
//   const savedRole = localStorage.getItem("role");

//   setRole(savedRole || "customer"); // Default to "customer" if no role found
//  }, []);

//  const handleLogout = () => {
//   localStorage.clear();

//   setRole("customer"); // Reset to default role
//  };

//  console.log("role after log in ", role);

//  if (role === null) {
//   return <div>Loading...</div>; // Render loading state until role is determined
//  }

//  return (
//   <div>
//    <Router>
//     {/*{role !== "Admin" && <Navbar role={role} onLogout={handleLogout} />}*/}

//     <Routes>
//      <Route
//       path="/shop"
//       element={role === "User" ? <Shop /> : <Navigate to="/" />}
//      />
//      <Route path="/login" element={<LoginSignup setRole={setRole} />} />

//      {role === "Admin" ? (
//       <>
//        <Route path="/admin/*" element={<Admin onLogout={handleLogout} />} />

//        <Route path="*" element={<Navigate to="/admin" />} />
//       </>
//      ) : (
//       <>
//        <Route
//         path="/"
//         element={<CustomerLayout role={role} onLogout={handleLogout} />}
//        >
//         <Route path="/" element={<Shop gender="Shop" />} />

//         <Route
//          path="/mens"
//          element={<ShopCategory banner={men_banner} category="men" />}
//         />

//         <Route path="/productdata" element={<ProductData />} />

//         <Route
//          path="/womens"
//          element={<ShopCategory banner={women_banner} category="women" />}
//         />

//         <Route
//          path="/kids"
//          element={<ShopCategory banner={kid_banner} category="kid" />}
//         />

//         <Route path="/product/:productId" element={<Product />} />

//         <Route
//          path="/product-images/:productId"
//          element={<ProductImageRoute />}
//         />

//         <Route path="/paymentmodal" element={<PaymentModal />} />

//         <Route path="/payment/bkash" element={<BkashPage />} />

//         <Route path="/ecommercewebsite" element={<EcommerceWebsite />} />

//         <Route
//          path="/productDisplayDetails"
//          element={<ProductDisplaydetails />}
//         />

//         <Route
//          path="/productDetailsPage/:productId"
//          element={<ProductDetailsPage />}
//         />

//         <Route path="/productgridpage" element={<ProductGridPage />} />

//         <Route path="/paymentgateway" element={<PaymentGatewayRough />} />

//         <Route path="/searchdrawer" element={<SearchDrawer />} />

//         <Route
//          path="/checkout"
//          element={
//           localStorage.getItem("userId") ? (
//            <Checkout />
//           ) : (
//            <Navigate to="/login" /> // Redirect to login if not logged in
//           )
//          }
//         />

//         {/* ProductCard demo route */}

//         <Route path="/cart" element={<Cart />} />

//         <Route path="/imageswiper" element={<ImageSwiper />} />

//         <Route path="*" element={<Navigate to="/" />} />
//        </Route>
//       </>
//      )}
//     </Routes>

//     {role !== "Admin" && <Footer />}
//    </Router>
//   </div>
//  );
// }

// export default App;
// import React, { useState, useEffect } from "react";
// import {
//  BrowserRouter as Router,
//  Routes,
//  Route,
//  Navigate,
// } from "react-router-dom";

// // Components and Pages
// import Footer from "./Components/Footer/Footer";
// import Navbar from "./Components/Navbar/Navbar";
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
// import ProductDisplay from "./Components/ProductDisplay/ProductDisplay";

// function App() {
//  const [role, setRole] = useState(null);

//  useEffect(() => {
//   const savedRole = localStorage.getItem("role");
//   setRole(savedRole || "customer");
//  }, []);

//  const handleLogout = () => {
//   localStorage.clear();
//   setRole("customer");
//  };

//  if (role === null) {
//   return <div>Loading role...</div>;
//  }

//  return (
//   <Router>
//    <Navbar role={role} handleLogout={handleLogout} />
//    <Routes>
//     {/* Login Page */}
//     <Route path="/login" element={<LoginSignup setRole={setRole} />} />

//     {/* Admin Pages */}
//     {role === "Admin" ? (
//      <>
//       <Route path="/admin/*" element={<Admin onLogout={handleLogout} />} />
//       <Route path="*" element={<Navigate to="/admin" replace />} />
//      </>
//     ) : (
//      <>
//       <Route
//        path="/"
//        element={<CustomerLayout role={role} onLogout={handleLogout} />}
//       >
//        <Route index element={<Shop gender="Shop" />} />
//        <Route path="shop" element={<Shop gender="Shop" />} />
//        <Route
//         path="mens"
//         element={<ShopCategory banner={men_banner} category="men" />}
//        />
//        <Route
//         path="womens"
//         element={<ShopCategory banner={women_banner} category="women" />}
//        />
//        <Route
//         path="kids"
//         element={<ShopCategory banner={kid_banner} category="kid" />}
//        />
//        <Route path="productdata" element={<ProductData />} />
//        <Route path="product/:productId" element={<Product />} />
//        <Route
//         path="product-images/:productId"
//         element={<ProductImageRoute />}
//        />
//        <Route path="productdisplay" element={<ProductDisplay />} />
//        <Route
//         path="productDisplayDetails"
//         element={<ProductDisplaydetails />}
//        />
//        <Route
//         path="productDetailsPage/:productId"
//         element={<ProductDetailsPage />}
//        />
//        <Route path="productgridpage" element={<ProductGridPage />} />
//        <Route path="bkashpage" element={<BkashPage />} />
//        <Route path="searchdrawer" element={<SearchDrawer />} />
//        <Route path="cart" element={<Cart />} />
//        <Route
//         path="checkout"
//         element={
//          localStorage.getItem("userId") ? (
//           <Checkout />
//          ) : (
//           <Navigate to="/login" replace />
//          )
//         }
//        />
//        <Route path="*" element={<Navigate to="/" replace />} />
//       </Route>

//       {/* Global modal route */}
//       <Route path="/paymentmodal" element={<PaymentModal />} />
//      </>
//     )}
//    </Routes>
//    {/* Show footer only if not admin */}
//    {/*{role !== "Admin" && <Footer />*/}
//   </Router>
//  );
// }

// export default App;

// import {
//  BrowserRouter as Router,
//  Routes,
//  Route,
//  Navigate,
// } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import Navbar from "./Components/Navbar/Navbar";
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

// function App() {
//  const [role, setRole] = useState("guest"); // Default role is "guest"

//  // Fetch role from localStorage on app load
//  useEffect(() => {
//   const savedRole = localStorage.getItem("role");
//   setRole(savedRole || "guest");
//  }, []);

//  // Logout function to reset the role and clear data
//  const handleLogout = () => {
//   localStorage.clear();
//   setRole("guest"); // Reset role to "guest" on logout
//  };

//  return (
//   <Router>
//    <Navbar role={role} handleLogout={handleLogout} />
//    <Routes>
//     <Route path="/" element={<Shop gender="Shop" />} />
//     <Route
//      path="/mens"
//      element={<ShopCategory banner={men_banner} category="men" />}
//     />
//     <Route
//      path="/admin"
//      element={role === "Admin" ? <Admin /> : <Navigate to="/" />}
//     />
//     <Route
//      path="/shop"
//      element={role === "User" ? <Shop /> : <Navigate to="/" />}
//     />
//     <Route path="/login" element={<LoginSignup setRole={setRole} />} />
//    </Routes>
//   </Router>
//  );
// }

// export default App;
