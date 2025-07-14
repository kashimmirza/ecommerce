/** @format */

import React, { useEffect } from "react";

const ShopifyScripts = () => {
 useEffect(() => {
  // Script 1: Load installed.js
  const loadInstalledScript = () => {
   const urls = [
    "https://cdn1.judge.me/assets/installed.js?shop=blucheez-outfitters.myshopify.com",
   ];
   urls.forEach((url) => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = url;
    document.head.appendChild(script);
   });
  };

  // Script 2: Shopify initial config
  const shopifyConfig = () => {
   const script = document.createElement("script");
   script.id = "__st";
   script.innerHTML = `var __st={"a":58500776131,"offset":21600,"reqid":"964c8026-af8f-4d81-bf3c-e7f259228829-1744823988","pageurl":"blucheez.fashion/collections/belwari","u":"7bceb4817223","p":"collection","rtyp":"collection","rid":467597984023};`;
   document.head.appendChild(script);
  };

  // Script 3: Shopify Paypal V4 Tracking
  const shopifyPaypalTracking = () => {
   const script = document.createElement("script");
   script.innerHTML = "window.ShopifyPaypalV4VisibilityTracking = true;";
   document.head.appendChild(script);
  };

  // Script 4: Form persister
  const formPersister = () => {
   const script = document.createElement("script");
   script.innerHTML = `!function() {...}();`; // Your persister script content
   document.head.appendChild(script);
  };

  // Load all scripts
  loadInstalledScript();
  shopifyConfig();
  shopifyPaypalTracking();
  formPersister();

  // Load Shopify JS features
  const loadShopifyFeatures = () => {
   const script = document.createElement("script");
   script.integrity = "sha256-EGCDRYTvIEOXsReXgqGwkAR+5Dl8tickSrieA/ZcQwc=";
   script.src =
    "//blucheez.fashion/cdn/shopifycloud/shopify/assets/storefront/load_feature-1060834584ef204397b1179782a1b090047ee4397cb627244ab89e03f65c4307.js";
   script.defer = true;
   document.head.appendChild(script);
  };

  loadShopifyFeatures();

  // Shopify payment button
  const loadPaymentButton = () => {
   const script = document.createElement("script");
   script.innerHTML = `var Shopify=Shopify||{};Shopify.PaymentButton=Shopify.PaymentButton||{...};`;
   document.head.appendChild(script);
  };

  loadPaymentButton();

  // Shopify dynamic checkout
  const dynamicCheckout = () => {
   const script = document.createElement("script");
   script.innerHTML = `document.addEventListener("DOMContentLoaded", (function() {...}));`;
   document.head.appendChild(script);
  };

  dynamicCheckout();

  // Handle performance mark
  const performanceMark = () => {
   const script = document.createElement("script");
   script.innerHTML =
    "window.performance && window.performance.mark && window.performance.mark('shopify.content_for_header.end');";
   document.head.appendChild(script);
  };

  performanceMark();
 }, []);

 return null; // No UI is rendered by this component
};

export default ShopifyScripts;
