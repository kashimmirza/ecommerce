/** @format */

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import "./ImageSwiper.css";
import "../AdminComponents/Assets/base.css";

const images = [
 {
  base: "https://blucheez.fashion/cdn/shop/files/BRLWARI-02.webp?v=1741849833",
  alt: "BRLWARI-02",
 },
 {
  base: "https://blucheez.fashion/cdn/shop/files/BLACK.webp?v=1741849815",
  alt: "BLACK",
 },
 {
  base:
   "https://blucheez.fashion/cdn/shop/files/OFFICE_ESSENTIALS_2.webp?v=1739818945",
  alt: "OFFICE ESSENTIALS",
 },
 {
  base:
   "https://blucheez.fashion/cdn/shop/files/DENIM_DESTINATION_2.webp?v=1739818945",
  alt: "DENIM DESTINATION",
 },
 {
  base:
   "https://blucheez.fashion/cdn/shop/files/SHOWSTOPPER_2.webp?v=1739818945",
  alt: "SHOWSTOPPER",
 },
 {
  base:
   "https://blucheez.fashion/cdn/shop/files/ACCESSORIES_f877d054-0cc8-400e-ae05-92d51db9e1e8.webp?v=1729786438",
  alt: "ACCESSORIES",
 },
];

const sizes = "100vw";
const widths = [375, 550, 750, 1100, 1500, 1780, 2000, 3000, 3840];

const ImageSwiper = () => {
 return (
  <div className="image-swiper-wrapper">
   <Swiper
    modules={[Navigation, Autoplay, EffectFade]}
    navigation
    autoplay={{ delay: 3000, disableOnInteraction: false }}
    effect="fade"
    loop={true}
    speed={800}
   >
    {images.map(({ base, alt }, index) => {
     const srcSet = widths.map((w) => `${base}&width=${w} ${w}w`).join(", ");

     return (
      <SwiperSlide key={index}>
       <img
        className="t4s-img-as-bg t4s-d-none t4s-d-md-block -t4s-lz--fadeIn t4s-slide-zoom-out lazyloadt4sed"
        srcSet={srcSet}
        sizes={sizes}
        src={`${base}&width=1500`}
        alt={alt}
        loading="lazy"
        width="3000"
        height="1333"
       />
      </SwiperSlide>
     );
    })}
   </Swiper>
  </div>
 );
};

export default ImageSwiper;
