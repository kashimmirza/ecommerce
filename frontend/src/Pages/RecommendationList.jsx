/** @format */

import React from "react";
import RecommendationItem from "./RecommendationItem";

const RecommendationList = () => {
 return (
  <div style={{ position: "relative" }}>
   <RecommendationItem
    imageSrcSet="//blucheez.fashion/cdn/shop/files/BER-019-GOLD.webp?...width=1600 1600w"
    placeholder="//blucheez.fashion/cdn/shop/files/BER-019-GOLD.webp?width=1"
    productLink="/products/exclusive-earring-25?...&pr_seq=uniform"
    productTitle="Exclusive Earring"
    productPrice="Tk 1,350.00 BDT"
    transformX={295}
   />
   <RecommendationItem
    imageSrcSet="//blucheez.fashion/cdn/shop/files/BER-011-GOLD.webp?...width=1600 1600w"
    placeholder="//blucheez.fashion/cdn/shop/files/BER-011-GOLD.webp?width=1"
    productLink="/products/exclusive-earring-15?...&pr_seq=uniform"
    productTitle="Exclusive Earring"
    productPrice="Tk 1,250.00 BDT"
    transformX={590}
   />
  </div>
 );
};

export default RecommendationList;
