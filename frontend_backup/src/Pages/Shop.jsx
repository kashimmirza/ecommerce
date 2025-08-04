/** @format */

// import React from "react";
// import Hero from "../Components/Hero/Hero";
// import Popular from "../Components/Popular/Popular";
// import Offers from "../Components/Offers/Offers";
// import Navbar from "../Components/Navbar/Navbar";
// import NewCollections from "../Components/NewCollections/NewCollections";
// import NewsLetter from "../Components/NewsLetter/NewsLetter";

// const Shop = () => {
//  return (
//   <div>
//    <Hero />
//    <Popular />
//    <Offers />
//    <NewCollections />
//    <NewsLetter />
//   </div>
//  );
// };

// export default Shop;

// import React, { useEffect, useState } from "react";
// import Hero from "../Components/Hero/Hero";
// import Popular from "../Components/Popular/Popular";
// import Offers from "../Components/Offers/Offers";
// import NewCollections from "../Components/NewCollections/NewCollections";
// import NewsLetter from "../Components/NewsLetter/NewsLetter";
// import { Typography, Button, Card, CardContent } from "@mui/material";
// import LocalOfferIcon from "@mui/icons-material/LocalOffer";
// import LoyaltyIcon from "@mui/icons-material/Loyalty";
// import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
// import "./CSS/shop.css";
// import BrandingSection from "../Components/BrandingSection";
// import Carousel from "react-material-ui-carousel";
// import BackgroundVideoSection from "../Components/Main/BackgroundVideoSection";
// import PromoText from "../Components/sliderOrSwiperOrCouresel/PromoText";
// import ProductCard from "./ProductCard";
// import ShippingCarousel from "../Components/sliderOrSwiperOrCouresel/ShippingCarousel";
// import ProductGallery from "../Components/Product/ProductGallery";
// import ImageSwiper from "../Components/ImageSwiper";
// import CustomButton from "../Components/CustomButton";

// const productData = {
//  id: "9902684766487",
//  name: "Exclusive Earring",
//  price: "750.00",
//  imageSrc:
//   "https://blucheez.fashion/cdn/shop/files/BER-023-SILV.webp?v=1742819967",
//  imageAlt: "Exclusive Earring",
//  url: "/collections/newest-products/products/exclusive-earring-32",
//  badgeText: "Sale",
// };

// const Shop = () => {
//  const [showButton, setShowButton] = useState(false);

//  useEffect(() => {
//   const handleScroll = () => {
//    const button = document.querySelector(".back-to-top");
//    if (window.scrollY > 300) {
//     setShowButton(true);
//     button?.classList.add("show");
//    } else {
//     setShowButton(false);
//     button?.classList.remove("show");
//    }
//   };
//   window.addEventListener("scroll", handleScroll);
//   return () => window.removeEventListener("scroll", handleScroll);
//  }, []);

//  return (
//   <div>
//    {/*
//    <BackgroundVideoSection />*/}

//    {/* Video Section */}
//    {/*
//    <div className="video-section">
//     <video
//      playsInline
//      autoPlay
//      loop
//      muted
//      preload="auto"
//      className="t4s_bg_vid_html5"
//      poster="//blucheez.fashion/cdn/shop/files/preview_images/b9df2cb1a3f94a5cb9dee57dc416c603.thumbnail.0000000000_1x1.jpg?v=1729776803"
//     >
//      <source
//       src="//blucheez.fashion/cdn/shop/videos/c/vp/b9df2cb1a3f94a5cb9dee57dc416c603/b9df2cb1a3f94a5cb9dee57dc416c603.HD-1080p-2.5Mbps-36984600.mp4?v=0"
//       type="video/mp4"
//      />
//      <img
//       src="//blucheez.fashion/cdn/shop/files/preview_images/b9df2cb1a3f94a5cb9dee57dc416c603.thumbnail.0000000000_1x1.jpg?v=1729776803"
//       alt="Video Fallback"
//      />
//     </video>
//    </div>
//    */}
//    {/*
//    <PromoText />
// /*}
//    <div style={{ border: "1px solid red" }}>
//     <ImageSwiper />
//    </div>
//    <div style={{ border: "1px solid blue" }}>
//     <ProductGallery />
//    </div>

//    <div className="product-section">
//     <ProductCard product={productData} />
//    </div>

//    {/* Hero Section */}
//   <div style={{display: "flex",gap: "20px"}}
//   <CustomButton label="FOR HER" href="/collections/womens-showstopper" />
//   <CustomButton label="FOR HIM" href="/collections/mens-showstopper" />
//   </div>
//    <ImageSwiper />
//    <ProductGallery />
//    <Hero />

//    {/* Popular Section */}
//    <Popular />

//    {/* Offers Section */}
//    <Offers />

//    {/* Branding Section */}
//    <BrandingSection />

//    {/* WhatsApp Floating Button */}
//    <a
//     href="https://wa.me/8801782669276"
//     className="whatsapp-float"
//     target="_blank"
//     rel="noopener noreferrer"
//     aria-label="Chat on WhatsApp"
//    >
//     <img
//      src="https://img.icons8.com/ios-filled/50/ffffff/whatsapp.png"
//      alt="WhatsApp"
//     />
//    </a>

//    <div className="container">
//     {/* Back to Top Button */}
//     {showButton && (
//      <button
//       className="back-to-top"
//       onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//       aria-label="Back to top"
//      >
//       <svg
//        xmlns="http://www.w3.org/2000/svg"
//        viewBox="9.98 12.06 12.05 6.79"
//        width="40"
//        height="40"
//        fill="white"
//       >
//        <path d="M16.767 12.809l-0.754-0.754-6.035 6.035 0.754 0.754 5.281-5.281 5.256 5.256 0.754-0.754-3.013-3.013z" />
//       </svg>
//      </button>
//     )}
//    </div>

//    {/* Newsletter */}
//    <NewsLetter />
//   </div>
//  );
// };

// export default Shop;

/** @format */

// import React, { useEffect, useState } from "react";

// import Hero from "../Components/Hero/Hero";
// import Popular from "../Components/Popular/Popular";
// import Offers from "../Components/Offers/Offers";
// import NewCollections from "../Components/NewCollections/NewCollections";
// import NewsLetter from "../Components/NewsLetter/NewsLetter";
// import BrandingSection from "../Components/BrandingSection";
// import ImageSwiper from "../Components/ImageSwiper";
// import ProductGallery from "../Components/Product/ProductGallery";
// import ProductCard from "./ProductCard";
// import CustomButton from "../Components/CustomButton";
// import BlucheezLanding from "./BlucheezLanding";
// import ProductGridPage from "./ProductGridPage";
// import ProductDetailsPage from "./ProductDetailsPage";
// import ProductHeader from "./ProductHeader";
// import ProductFooter from "./ProductFooter";
// import TopBar from "./TopBar";
// import BlucheezHeader from "./BlucheezHeader";
// import BackgroundVideoSection from "../Components/Main/BackgroundVideoSection";
// import ShippingCarousel from "../Components/sliderOrSwiperOrCouresel/ShippingCarousel";
// import PromoText from "../Components/sliderOrSwiperOrCouresel/PromoText";
// import HeadingTestimonials from "./HeadingTestimonials";
// import ProductSlider from "./ProductSlider";
// import PageDots from "./PageDots";
// import { Divider, Box, Typography } from "@mui/material";
// import "./CSS/shop.css";
// import HeroBanner from "../Components/HeroBanner";
// import "../AdminComponents/Assets/base.css";
// import "../AdminComponents/Assets/button-style.css";
// import "../AdminComponents/Assets/slider-settings.css";
// import "../AdminComponents/Assets/custom-effect.css";
// import "../AdminComponents/Assets/t4s-animation.css";
// import HeroSection from "./HeroSection";

// const productData = {
//  id: "9902684766487",
//  name: "Exclusive Earring",
//  price: "750.00",
//  imageSrc:
//   "https://blucheez.fashion/cdn/shop/files/BER-023-SILV.webp?v=1742819967",
//  imageAlt: "Exclusive Earring",
//  url: "/collections/newest-products/products/exclusive-earring-32",
//  badgeText: "Sale",
// };

// const Shop = () => {
//  const [showButton, setShowButton] = useState(false);
//  const [hovered, setHovered] = useState(false);

//  useEffect(() => {
//   const handleScroll = () => {
//    const button = document.querySelector(".back-to-top");
//    if (window.scrollY > 300) {
//     setShowButton(true);
//     button?.classList.add("show");
//    } else {
//     setShowButton(false);
//     button?.classList.remove("show");
//    }
//   };
//   window.addEventListener("scroll", handleScroll);
//   return () => window.removeEventListener("scroll", handleScroll);
//  }, []);

//  return (
//   <div>
//    <TopBar />
//    <BlucheezHeader />
//    <Divider />

//    <BackgroundVideoSection />
//    <Divider />

//    <Box
//     className="t4s-section-inner"
//     sx={{
//      "--bg-color": "#CE3241",
//      "--pd-top": "15px",
//      "--pd-right": "15px",
//      "--pd-bottom": "15px",
//      "--pd-left": "15px",
//     }}
//    >
//     <PromoText />
//    </Box>
//    <Divider />

//    <HeadingTestimonials />
//    <Divider />

//    <ProductSlider />

//    <Divider />
//    <ImageSwiper />

//    {/*<Box sx={{ border: "1px solid blue" }}>
//     <ProductGallery />
//    </Box>
//    <Divider />*/}
//    <div>
//     <div style={{ position: "relative", margin: "20px 0" }}>
//      {/* Background image as div */}
//      <div
//       className="lazyloadt4s-loader is-bg-img t4s-d-none t4s-d-md-block"
//       style={{
//        backgroundImage:
//         "url(https://blucheez.fashion/cdn/shop/files/BRLWARI-02.webp?crop=center&format=jpg&height=1&v=1741849833&width=1)",
//       }}
//      ></div>

//      {/* Content wrapper */}
//      <div
//       className="t4s-content-wrap t4s-pe-none t4s-full-width-link t4s-z-100"
//       style={{
//        position: "absolute",
//        top: "50%",
//        left: "5%",
//        transform: "translateY(-50%)",
//        color: "#ffffff",
//       }}
//      >
//       {/* Logo */}
//       <img
//        className="belwari-logo-custom"
//        src="https://cdn.shopify.com/s/files/1/0585/0077/6131/files/belwari_logo_white_wiith_by_blucheez.svg?v=1703754987"
//        alt="Belwari Logo"
//       />

//       {/* Text */}
//       <p
//        style={{
//         opacity: 0.8,
//         fontSize: "22px",
//         fontWeight: 300,
//         lineHeight: "24px",
//         marginBottom: "25px",
//        }}
//       >
//        Immerse in timeless luxury
//        <br />
//        with elegant Jamdani sarees,
//        <br />
//        blending tradition and style
//        <br />
//        for every special occasion.
//       </p>

//       {/* Button */}
//       <a
//        href="/collections/belwari"
//        target="_self"
//        className="t4s-btn t4s-btn-custom t4s-btn-style-default t4s-btn-effect-overlay-run"
//        style={{
//         "--pri-cl": "#FFFFFF55",
//         "--second-cl": "#ffffff",
//         "--pri-cl-hover": "#ce3241", // red on hover
//         "--second-cl-hover": "#ffffff",
//         "--button-fs": "24px",
//         "--button-fw": 500,
//         "--button-pd-lr": "35px",
//         "--button-bdr": "2px",
//         "--button-mh": "50px",
//         color: "var(--second-cl)",
//         backgroundColor: "var(--pri-cl)",
//         border: "2px solid #ffffff",
//         textDecoration: "none",
//         display: "inline-block",
//         transition: "all 0.3s ease",
//        }}
//       >
//        Indulge in Belwari
//       </a>
//      </div>

//      {/* Style for logo */}
//      <style>{`
//     .belwari-logo-custom {
//       height: 75px;
//       width: auto;
//       padding-top: 10px;
//       padding-bottom: 10px;
//     }

//     @media (min-width: 768px) {
//       .belwari-logo-custom {
//         height: 110px;
//       }
//     }
//   `}</style>
//     </div>
//     <Divider />
//     <div>
//      <HeroSection />
//     </div>
//     <div style={{ position: "relative", margin: "20px 0" }}>
//      <img
//       src="https://blucheez.fashion/cdn/shop/files/BRLWARI-02.webp?v=1741849833"
//       alt="Banner"
//       style={{ width: "100%", height: "auto", objectFit: "cover" }}
//      />
//      <Box
//       sx={{
//        position: "absolute",
//        top: "50%",
//        left: "50%",
//        transform: "translate(-50%, -50%)",
//        display: "flex",
//        gap: "20px",
//        justifyContent: "center",
//       }}
//      >
//       <CustomButton label="FOR HER" href="/collections/womens-showstopper" />
//       <CustomButton label="FOR HIM" href="/collections/mens-showstopper" />
//      </Box>
//     </div>
//    </div>
//    <Divider />

//    <Hero />
//    <Divider />

//    <Popular />
//    <Divider />

//    <Offers />
//    <Divider />

//    <NewCollections />
//    <Divider />

//    <BrandingSection />
//    <Divider />

//    <a
//     href="https://wa.me/8801782669276"
//     className="whatsapp-float"
//     target="_blank"
//     rel="noopener noreferrer"
//     aria-label="Chat on WhatsApp"
//    >
//     <img
//      src="https://img.icons8.com/ios-filled/50/ffffff/whatsapp.png"
//      alt="WhatsApp"
//     />
//    </a>

//    {showButton && (
//     <button
//      className="back-to-top"
//      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//      aria-label="Back to top"
//     >
//      <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="9.98 12.06 12.05 6.79"
//       width="40"
//       height="40"
//       fill="white"
//      >
//       <path d="M16.767 12.809l-0.754-0.754-6.035 6.035 0.754 0.754 5.281-5.281 5.256 5.256 0.754-0.754-3.013-3.013z" />
//      </svg>
//     </button>
//    )}
//    <Divider />

//    <NewsLetter />
//   </div>
//  );
// };

// export default Shop;

import React, { useEffect, useState } from "react";
import { Divider, Box } from "@mui/material";

import TopBar from "./TopBar";
import BlucheezHeader from "./BlucheezHeader";
import HeroSection from "./HeroSection";
import BackgroundVideoSection from "../Components/Main/BackgroundVideoSection";
import PromoText from "../Components/sliderOrSwiperOrCouresel/PromoText";
import HeadingTestimonials from "./HeadingTestimonials";
import ProductSlider from "./ProductSlider";
import ImageSwiper from "../Components/ImageSwiper";
import Hero from "../Components/Hero/Hero";
import Popular from "../Components/Popular/Popular";
import Offers from "../Components/Offers/Offers";
import NewCollections from "../Components/NewCollections/NewCollections";
import BrandingSection from "../Components/BrandingSection";
import NewsLetter from "../Components/NewsLetter/NewsLetter";
import CustomButton from "../Components/CustomButton";
import Office_essential from "./Office_essential";

import "../AdminComponents/Assets/base.css";
import "../AdminComponents/Assets/button-style.css";
import "../AdminComponents/Assets/slider-settings.css";
import "../AdminComponents/Assets/custom-effect.css";
import "../AdminComponents/Assets/t4s-animation.css";
import "./CSS/shop.css";
import BelwariHerosection from "./BelwariHerosection";
import DENIM_DESTINATION_2 from "./Denim_destination_2";
import Showstoppers from "./Showstoppers";
import CO_ORD_SETS from "./CO_ORD_SETS";
import AccessoryBanner from "./AccessoryBanner";
import ProductSlider2 from "./ProductSlider2";
import ProductSlider3 from "./ProductSlider3";
import ProductSlider4 from "./ProductSlider4";
import ShippingList from "./ShippingList";
import ProductGridPage from "./ProductGridPage";
//import ChatBot from "./ChatBot";

const Shop = () => {
 const [showButton, setShowButton] = useState(false);

 useEffect(() => {
  const handleScroll = () => {
   const button = document.querySelector(".back-to-top");
   if (window.scrollY > 300) {
    setShowButton(true);
    button?.classList.add("show");
   } else {
    setShowButton(false);
    button?.classList.remove("show");
   }
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
 }, []);

 return (
  <div>
   {/* Top sections */}
   <TopBar />
   {/*<BlucheezHeader />*/}
   <Divider />
   <BackgroundVideoSection />
   <Divider />

   {/* Promo Banner */}
   <Box
    className="t4s-section-inner"
    sx={{
     "--bg-color": "#CE3241",
     "--pd-top": "15px",
     "--pd-right": "15px",
     "--pd-bottom": "15px",
     "--pd-left": "15px",
    }}
   >
    <PromoText />
   </Box>
   <Divider />

   {/* Testimonials and Sliders */}
   <HeadingTestimonials />
   <Divider />
   <ProductSlider />

   {/*<ImageSwiper />
   <Divider />*/}

   {/* Hero section */}
   <div style={{ position: "relative", margin: "20px 0" }}>
    <HeroSection />
   </div>

   <div style={{ position: "relative", margin: "20px 0" }}>
    <BelwariHerosection />
   </div>

   <div style={{ position: "relative", margin: "20px 0" }}>
    <ProductSlider2 />
   </div>

   <div style={{ position: "relative", margin: "20px 0" }}>
    <Office_essential />
   </div>

   <div style={{ position: "relative", margin: "20px 0" }}>
    <DENIM_DESTINATION_2 />
   </div>
   <div style={{ position: "relative", margin: "20px 0" }}>
    <ProductSlider4 />
   </div>
   <div style={{ position: "relative", margin: "20px 0" }}>
    <Showstoppers />
   </div>
   <div style={{ position: "relative", margin: "20px 0" }}>
    <CO_ORD_SETS />
   </div>

   <div style={{ position: "relative", margin: "20px 0" }}>
    <ProductSlider3 />
   </div>
   <div style={{ position: "relative", margin: "20px 0" }}>
    <AccessoryBanner />
   </div>

   <div style={{ position: "relative", margin: "20px 0" }}>
    <ShippingList />
   </div>
   {/* Banner with buttons */}

   {/* Main Feature Sections */}
   {/*<Hero />
   <Divider />
   <Popular />
   <Divider />
   <Offers />
   <Divider />
   <NewCollections />
   <Divider />
   <BrandingSection />
   <Divider />
   */}

   {/* WhatsApp floating button */}
   <a
    href="https://wa.me/8801782669276"
    className="whatsapp-float"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
   >
    <img
     src="https://img.icons8.com/ios-filled/50/ffffff/whatsapp.png"
     alt="WhatsApp"
    />
   </a>

   {/* Back to Top Button */}
   {showButton && (
    <button
     className="back-to-top"
     onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
     aria-label="Back to top"
    >
     <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="9.98 12.06 12.05 6.79"
      width="40"
      height="40"
      fill="white"
     >
      <path d="M16.767 12.809l-0.754-0.754-6.035 6.035 0.754 0.754 5.281-5.281 5.256 5.256 0.754-0.754-3.013-3.013z" />
     </svg>
    </button>
   )}
   {/*  <ChatBot />*/}
   {/* Newsletter */}
   <NewsLetter />
  </div>
 );
};

export default Shop;
