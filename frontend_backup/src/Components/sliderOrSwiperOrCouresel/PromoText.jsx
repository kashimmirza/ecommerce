/** @format */

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "./PromoText.css";

// Array of promo messages
const promoMessages = [
 "🔥 Big Sale This Week Only!",
 "🎉 New Arrivals Just Dropped!",
 "🛍️ Buy 1 Get 1 Free on Select Items!",
 "🚚 Free Shipping on Orders Over $50!",
 "⭐ Limited Edition Items In Stock Now!",
];

const PromoText = () => {
 return (
  <div
   className="t4s-section-inner t4s_nt_se_template--23380577550615__promo_text_93DiQt t4s-container-fluid"
   style={{
    "--bg-color": "#CE3241",
    "--pd-top": "15px",
    "--pd-right": "15px",
    "--pd-bottom": "15px",
    "--pd-left": "15px",
   }}
  >
   <div className="t4s-row t4s-text-center">
    <Swiper
     modules={[Autoplay]}
     slidesPerView={1}
     loop={true}
     autoplay={{ delay: 4000, disableOnInteraction: false }}
     speed={1000}
    >
     {promoMessages.map((msg, index) => (
      <SwiperSlide key={index}>
       <div
        className="t4s-col-item t4s-col-12 t4s-gx-10 t4s-prt-text t4s-rte"
        style={{
         color: "#ffffff",
         fontSize: "16px",
         fontWeight: "500",
         position: "relative",
         textAlign: "center",
        }}
       >
        <p>{msg}</p>
       </div>
      </SwiperSlide>
     ))}
    </Swiper>
   </div>
  </div>
 );
};

export default PromoText;
