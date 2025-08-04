/** @format */
// src/Components/HeroContent/VideoBackground.jsx
// import React from "react";
// // Assuming these are your global styles or essential for basic layout
// // If these are not general-purpose, they might be better imported once globally or managed differently.
// import "../AdminComponents/Assets/slider-settings.css";
// import "../AdminComponents/Assets/base.css";
// import "../styles/global.css";
// console.log("backgroundvideosection triggered");

// // You might not need PageDots in a generic video component unless it's an overlay
// // If PageDots is specifically for a carousel, remove this import and its usage.
// // import PageDots from "./PageDots"; // Adjust path if PageDots is somewhere else

// //const BackgroundVideoSection = ({ videoUrl, posterUrl, altText, linkUrl }) =>

// const BackgroundVideoSection = (props) => {
//  console.log("BackgroundVideoSection: Component Rendered!");
//  console.log("BackgroundVideoSection: Props received:", props); // Check this value directly!
//  const { videoUrl, posterUrl, altText, linkUrl } = props;
//  console.log("BackgroundVideoSection: Destructured videoUrl:", videoUrl);
//  console.log("BackgroundVideoSection: Destructured posterUrl:", posterUrl);
//  console.log("BackgroundVideoSection: Destructured altText:", altText);
//  console.log("BackgroundVideoSection: Destructured linkUrl:", linkUrl);
//  //console.log("props are here:", props.data);
//  // If no videoUrl is provided, don't render anything for the video itself
//  //  const { videoUrl, posterUrl, altText, linkUrl } = props;
//  if (!videoUrl) {
//   console.warn("VideoBackground: videoUrl is missing, not rendering video.");
//   return null;
//  }
//  return (
//   <div
//    className="t4s-bg-video t4s-row t4s-row-cols-1 t4s-gx-0 t4s_ratio_cuspx t4scuspx1_true t4scuspx2_true t4scuspx3_true t4s-animate-init t4s_animated"
//    // Added a style to ensure it has some default dimensions if CSS doesn't provide it
//    style={{
//     width: "100%",
//     height: "100%",
//     minHeight: "500px",
//     position: "relative",
//     overflow: "auto",
//    }}
//   >
//    <div className="t4s-col-item t4s-bg-video-item" data-hdt-reveal="slide-in">
//     <div
//      className="t4s-hero-inner t4s-pr t4s-oh t4s_cover t4s-bgvideo-playing"
//      data-video-background=""
//      // Removed data-options as it's for Shopify's JS, we're handling it with React props
//      loaded="true"
//     >
//      {/* Use the provided linkUrl, if any */}
//      <a href={videoUrl || "#"}>
//       <div className="t4s_ratio t4s_position_0">
//        <div className="t4s-video-bg-placeholder t4s-img-video" />
//        <video
//         playsInline
//         autoPlay
//         loop
//         muted
//         preload="auto"
//         className="t4s_bg_vid_html5"
//         aria-label={altText || "Background video"}
//         poster={posterUrl}
//        >
//         <source src={videoUrl} type="video/mp4" />
//         {/* Fallback image if video fails to load or unsupported */}
//         {posterUrl && (
//          <img src={posterUrl} alt={altText || "Video background"} />
//         )}
//         <p>Your browser does not support the video tag.</p>
//        </video>
//       </div>
//      </a>

//      {/* This section appears to be an overlay with a logo and button */}
//      {/* It's tightly coupled to the Belwari brand. If this needs to be dynamic,
//               you'd pass children or specific logo/button props. For now, keeping it as is,
//               but consider if this truly belongs inside a generic VideoBackground. */}
//      <div className="t4s-content-wrap t4s-pe-none t4s-full-width-link t4s-z-100">
//       <div
//        className="t4s-content-position t4s-container t4s-pa t4s-text-md-center t4s-text-center t4s-bg-content-true t4s-br-content-false"
//        style={{
//         "--time-animation": "2.5s",
//         "--p-left": "50%",
//         "--p-hx": "-50%",
//         "--p-bottom": "calc(100% - 80%)",
//        }}
//       >
//        <div>
//         <img
//          className="my-element"
//          src="https://cdn.shopify.com/s/files/1/0585/0077/6131/files/belwari_logo_white_wiith_by_blucheez_with_border.svg?v=1703755184"
//          alt="monson Logo"
//          width="200"
//         />
//         <button
//          className="lazy-felix lazy-felix-download-btn"
//          data-img-link="https://cdn.shopify.com/s/files/1/0585/0077/6131/files/belwari_logo_white_wiith_by_blucheez_with_border.svg?v=1703755184"
//         >
//          {/* SVG Icon */}
//          <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="lazyfelix-icon"
//           width="27"
//           height="25"
//           viewBox="0 0 27 25"
//           fill="none"
//          >
//           <path
//            d="M13.4518 13.0377C11.4186 12.7365 6.4864 16.878 5.39453 21.7726V22.0362C5.48795 24.1899 7.75902 24.9194 10.9292 24.0316C13.0111 23.1639 14.1728 23.1375 16.125 24.0316C17.9698 25.1612 20.41 23.7051 20.643 22.0362C20.3191 18.4517 16.3154 13.1956 13.4518 13.0377Z"
//            fill="#7A7A7A"
//            fillOpacity="0.7"
//           ></path>
//           <ellipse
//            cx="4.85476"
//            cy="11.946"
//            rx="2.97265"
//            ry="4.24369"
//            transform="rotate(-21.5283 4.85476 11.946)"
//            fill="#7A7A7A"
//            fillOpacity="0.7"
//           ></ellipse>
//           <ellipse
//            cx="22.0599"
//            cy="13.5489"
//            rx="2.97265"
//            ry="4.24369"
//            transform="rotate(22.9527 22.0599 13.5489)"
//            fill="#7A7A7A"
//            fillOpacity="0.7"
//           ></ellipse>
//           <ellipse
//            cx="10.1354"
//            cy="5.66514"
//            rx="2.92739"
//            ry="4.7215"
//            transform="rotate(-9.76985 10.1354 5.66514)"
//            fill="#7A7A7A"
//            fillOpacity="0.7"
//           ></ellipse>
//           <ellipse
//            cx="17.552"
//            cy="5.95842"
//            rx="2.92739"
//            ry="4.7215"
//            transform="rotate(14.6303 17.552 5.95842)"
//            fill="#7A7A7A"
//            fillOpacity="0.7"
//           ></ellipse>
//          </svg>
//         </button>
//        </div>
//       </div>
//      </div>
//     </div>
//    </div>
//   </div>
//  );
// };

// export default BackgroundVideoSection;

import React from "react";
import "../AdminComponents/Assets/slider-settings.css";
import "../AdminComponents/Assets/base.css";
import "../styles/global.css";
import PageDots from "./PageDots";

const BackgroundVideoSection = (props) => {
 console.log("BackgroundVideoSection: Component Rendered!");
 console.log("BackgroundVideoSection: Props received:", props); // Check this value directly!
 const { videoUrl, posterUrl, altText, linkUrl } = props;
 console.log("BackgroundVideoSection: Destructured videoUrl:", videoUrl);
 console.log("BackgroundVideoSection: Destructured posterUrl:", posterUrl);
 console.log("BackgroundVideoSection: Destructured altText:", altText);
 console.log("BackgroundVideoSection: Destructured linkUrl:", linkUrl);
 //console.log("props are here:", props.data);
 // If no videoUrl is provided, don't render anything for the video itself
 //  const { videoUrl, posterUrl, altText, linkUrl } = props;
 if (!videoUrl) {
  console.warn("VideoBackground: videoUrl is missing, not rendering video.");
  return null;
 }
 return (
  <main
   id="MainContent"
   className="content-for-layout focus-none"
   role="main"
   tabIndex="-1"
  >
   <section
    id="shopify-section-template--23380577550615__background_video_BKaDTF"
    className="shopify-section t4s-section t4s-section-all t4s_tp_cd t4s-hero-video t4s_tp_bgvideo"
   >
    <link
     href="//blucheez.fashion/cdn/shop/t/142/assets/section.css?v=19467530681101428381728726942"
     rel="stylesheet"
     type="text/css"
     media="all"
    />
    <link
     href="//blucheez.fashion/cdn/shop/t/142/assets/hero.css?v=67821380257764625341728726942"
     rel="stylesheet"
     type="text/css"
     media="all"
    />
    <link
     href="//blucheez.fashion/cdn/shop/t/142/assets/content-position.css?v=152632918731751904791729940501"
     rel="stylesheet"
     type="text/css"
     media="all"
    />
    <div
     className="t4s-section-inner t4s_nt_se_template--23380577550615__background_video_BKaDTF t4s_nt_se_template--23380577550615__background_video_BKaDTF t4s-container-fluid"
     style={{
      "--aspect-ratioapt": "2",
      "--aspect-ratio-cusdt": "800px",
      "--aspect-ratio-cusmb": "700px",
     }}
    >
     <div className="t4s-bg-video t4s-row t4s-row-cols-1 t4s-gx-0 t4s_ratio_cuspx t4scuspx1_true t4scuspx2_true t4scuspx3_true t4s-animate-init t4s_animated">
      <div className="t4s-col-item t4s-bg-video-item" hdt-reveal="slide-in">
       <div
        className="t4s-hero-inner t4s-pr t4s-oh t4s_cover t4s-bgvideo-playing"
        data-video-background=""
        data-options='{"type":"html5","vid":"","requestHost":"blucheez.fashion","srcDefault":"https:\/\/cdn.shopify.com\/s\/files\/1\/0610\/5209\/2628\/files\/Share_your_brand_story_by_adding_a_video_to_your_store.mp4?v=1641630446","mute":"true","id":"#tmp-video-template--23380577550615__background_video_BKaDTF"}'
        loaded="true"
       >
        <a href="/collections/eid">
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
           poster={posterUrl}
           //poster="//blucheez.fashion/cdn/shop/files/preview_images/fc81ac9d289346f4b5726e3e977a8d7d.thumbnail.0000000000_1x1.jpg?v=1741896382"
          >
           <source
            src={videoUrl} // <--- DYNAMICALLY ASSIGNED
            type="video/mp4"
           />
           <img
            src="//blucheez.fashion/cdn/shop/files/preview_images/f1230e6320e04f29bd2394bf5fa59be5.thumbnail.0000000000_1x1.jpg?v=1722056902"
            alt="Video Preview"
           />
          </video>
         </div>
        </a>
        <div className="t4s-content-wrap t4s-pe-none t4s-full-width-link t4s-z-100">
         <div
          className="t4s-content-position t4s-container t4s-pa t4s-text-md-center t4s-text-center t4s-bg-content-true t4s-br-content-false"
          style={{
           "--time-animation": "2.5s",
           "--p-left": "50%",
           "--p-hx": "-50%",
           "--p-bottom": "calc(100% - 80%)",
          }}
         >
          {/* New Logo and Download Button */}
          <div>
           <img
            className="my-element"
            src="https://cdn.shopify.com/s/files/1/0585/0077/6131/files/belwari_logo_white_wiith_by_blucheez_with_border.svg?v=1703755184"
            alt="monson Logo"
            width="200"
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
             ></path>
             <ellipse
              cx="4.85476"
              cy="11.946"
              rx="2.97265"
              ry="4.24369"
              transform="rotate(-21.5283 4.85476 11.946)"
              fill="#7A7A7A"
              fillOpacity="0.7"
             ></ellipse>
             <ellipse
              cx="22.0599"
              cy="13.5489"
              rx="2.97265"
              ry="4.24369"
              transform="rotate(22.9527 22.0599 13.5489)"
              fill="#7A7A7A"
              fillOpacity="0.7"
             ></ellipse>
             <ellipse
              cx="10.1354"
              cy="5.66514"
              rx="2.92739"
              ry="4.7215"
              transform="rotate(-9.76985 10.1354 5.66514)"
              fill="#7A7A7A"
              fillOpacity="0.7"
             ></ellipse>
             <ellipse
              cx="17.552"
              cy="5.95842"
              rx="2.92739"
              ry="4.7215"
              transform="rotate(14.6303 17.552 5.95842)"
              fill="#7A7A7A"
              fillOpacity="0.7"
             ></ellipse>
            </svg>
           </button>
          </div>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   </section>
  </main>
 );
};

export default BackgroundVideoSection;
