/** @format */

import React from "react";
import "../AdminComponents/Assets/slider-settings.css";
import "../AdminComponents/Assets/base.css";
import "../styles/global.css";
import PageDots from "./PageDots";
import { useEffect, useState } from "react";

const belowarivideobackground = () => {
 const [isLoaded, setIsLoaded] = useState(false);

 useEffect(() => {
  const timer = setTimeout(() => {
   setIsLoaded(true);
  }, 500);
  return () => clearTimeout(timer);
 }, []);
 return (
  <div
   data-t4s-animate=""
   className="t4s-bg-video t4s-row t4s-row-cols-1 t4s-gx-0 t4s_ratio_cuspx t4scuspx1_true t4scuspx2_true t4scuspx3_true t4s-animate-init t4s_animated"
  >
   <div className="t4s-col-item t4s-bg-video-item" data-hdt-reveal="slide-in">
    <div
     className="t4s-hero-inner t4s-pr t4s-oh t4s_cover t4s-bgvideo-playing"
     data-video-background=""
     data-options={JSON.stringify({
      type: "html5",
      vid: "",
      requestHost: "blucheez.fashion",
      srcDefault:
       "https://cdn.shopify.com/s/files/1/0610/5209/2628/files/Share_your_brand_story_by_adding_a_video_to_your_store.mp4?v=1641630446",
      mute: "true",
      id: "#tmp-video-template--23380577124631__background_video_widQGq",
     })}
     loaded="true"
    >
     <a href="/collections/belwari">
      <div className="t4s_ratio t4s_position_0">
       <div className="t4s-video-bg-placeholder t4s-img-video" />
       <video
        playsInline
        autoPlay
        loop
        muted
        preload="auto"
        className="t4s_bg_vid_html5"
        aria-label="Eid Video | Belwari"
        poster="https://blucheez.fashion/cdn/shop/files/preview_images/fc81ac9d289346f4b5726e3e977a8d7d.thumbnail.0000000000_1x1.jpg?v=1741896382"
       >
        <source
         src="https://blucheez.fashion/cdn/shop/videos/c/vp/fc81ac9d289346f4b5726e3e977a8d7d/fc81ac9d289346f4b5726e3e977a8d7d.HD-1080p-3.3Mbps-44134512.mp4?v=0"
         type="video/mp4"
        />
        <img
         alt="Eid Video | Belwari"
         src="https://blucheez.fashion/cdn/shop/files/preview_images/fc81ac9d289346f4b5726e3e977a8d7d.thumbnail.0000000000_1x1.jpg?v=1741896382"
        />
       </video>
       {/* Template tag can't be used directly in React */}
      </div>
     </a>

     <div className="t4s-content-wrap t4s-pe-none t4s-full-width-link t4s-z-100">
      <div
       className="t4s-content-position t4s-container t4s-pa t4s-text-md-center t4s-text-center t4s-bg-content-true t4s-br-content-false"
       style={{
        "--time-animation": "2s",
        "--p-left": "50%",
        "--p-hx": "-50%",
        "--p-bottom": "calc(100% - 75%)",
        "--p-vy": "calc(100% - 75%)",
        "--p-left-mb": "50%",
        "--p-hx-mb": "-50%",
        "--p-bottom-mb": "calc(100% - 75%)",
        "--p-vy-mb": "calc(100% - 75%)",
        "--bg-content": "rgba(255, 255, 255, 0.0)",
        "--content-pd": "200px 200px",
        "--content-pd-mb": "10px 10px",
       }}
      >
       <div
        className="t4s-bl-item t4s-animation-fadeIn t4s-raw-html t4s-rte--list t4s-hidden-mobile-false hover-lazy-felix"
        style={{ "--animation": "fadeIn", "--delay-animation": "0s" }}
       >
        <img
         className="my-element"
         src="https://cdn.shopify.com/s/files/1/0585/0077/6131/files/belwari_logo_white_wiith_by_blucheez_with_border.svg?v=1703755184"
         alt="monson Logo"
         style={{ width: "50%", height: "auto", marginBottom: "30px" }}
        />
        <button
         className="lazy-felix lazy-felix-download-btn"
         data-img-link="https://cdn.shopify.com/s/files/1/0585/0077/6131/files/belwari_logo_white_wiith_by_blucheez_with_border.svg?v=1703755184"
        >
         <svg
          xmlns="http://www.w3.org/2000/svg"
          className="lazyfelix-icon"
          width="27"
          height="25"
          viewBox="0 0 27 25"
          fill="none"
         >
          <path
           d="M13.4518 13.0377C11.4186 12.7365 6.4864 16.878 5.39453 21.7726V22.0362C5.48795 24.1899 7.75902 24.9194 10.9292 24.0316C13.0111 23.1639 14.1728 23.1375 16.125 24.0316C17.9698 25.1612 20.41 23.7051 20.643 22.0362C20.3191 18.4517 16.3154 13.1956 13.4518 13.0377Z"
           fill="#7A7A7A"
           fillOpacity="0.7"
          />
          <ellipse
           cx="4.85476"
           cy="11.946"
           rx="2.97265"
           ry="4.24369"
           transform="rotate(-21.5283 4.85476 11.946)"
           fill="#7A7A7A"
           fillOpacity="0.7"
          />
          <ellipse
           cx="22.0599"
           cy="13.5489"
           rx="2.97265"
           ry="4.24369"
           transform="rotate(22.9527 22.0599 13.5489)"
           fill="#7A7A7A"
           fillOpacity="0.7"
          />
          <ellipse
           cx="10.1354"
           cy="5.66514"
           rx="2.92739"
           ry="4.7215"
           transform="rotate(-9.76985 10.1354 5.66514)"
           fill="#7A7A7A"
           fillOpacity="0.7"
          />
          <ellipse
           cx="17.552"
           cy="5.95842"
           rx="2.92739"
           ry="4.7215"
           transform="rotate(14.6303 17.552 5.95842)"
           fill="#7A7A7A"
           fillOpacity="0.7"
          />
         </svg>
        </button>
       </div>
      </div>
     </div>

     <a
      href=""
      target=""
      className="t4s-full-width-link t4s-pe-none"
      style={{ "--bg-overlay": "rgba(0, 0, 0, 0.0)" }}
     />
    </div>
   </div>
  </div>
 );
};

export default belowarivideobackground;
