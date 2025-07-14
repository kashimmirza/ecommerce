/** @format */

import React from "react";

const RecommendationItem = ({
 imageSrcSet,
 placeholder,
 imageAlt = "Product Image",
 productLink,
 productTitle,
 productPrice,
 quickViewDataId = "",
 transformX = 0,
}) => {
 return (
  <div
   className="t4s-minicart-recommendations__item t4s-col-item"
   aria-hidden="true"
   style={{
    position: "absolute",
    left: 0,
    transform: `translateX(${transformX}px)`,
   }}
  >
   <div className="t4s-row t4s-g-0 t4s-align-items-center">
    {/* Image Section */}
    <div className="t4s-col-item t4s-col-auto t4s-minicart-recommendations__item--img">
     <a
      className="t4s-d-block t4s-pr t4s-oh t4s_ratio"
      href={productLink}
      style={{ "--aspect-ratioapt": 0.6666666666666666 }}
     >
      <img
       className="lazyautosizes lazyloadt4sed"
       data-widths="[100,200,400,600,700,800,900,1000,1200,1400,1600]"
       data-optimumx="2"
       data-sizes="auto"
       width="1000"
       height="1500"
       alt={imageAlt}
       sizes="73.33333333333333px"
       src={placeholder || imageSrcSet?.split(" ")[0]}
       srcSet={imageSrcSet}
      />
      <span
       className="lazyloadt4s-loader is-bg-img"
       style={{
        backgroundImage: `url(${placeholder || imageSrcSet?.split(" ")[0]})`,
       }}
      ></span>
     </a>
    </div>

    {/* Title & Price */}
    <div className="t4s-col-item t4s-col t4s-pr t4s-oh">
     <a
      href={productLink}
      className="t4s-d-block t4s-minicart-recommendations__item--title t4s-truncate"
     >
      {productTitle}
     </a>
     <div className="t4s-minicart-recommendations__item--price">
      <span className="money">{productPrice}</span>
     </div>
    </div>

    {/* Quick View Button */}
    <div className="t4s-col-item t4s-col-auto">
     <a
      href={productLink}
      data-id={quickViewDataId}
      data-tooltip="top"
      title="Quick view"
      rel="nofollow"
      className="t4s-minicart-recommendations__item--qv t4s-btn-loading__svg t4s-tooltip-actived"
      data-action-quickview=""
     >
      <svg viewBox="0 0 24 24" className="t4s-btn-op0">
       <use xlinkHref="#t4s-icon-qv"></use>
      </svg>
      <span className="t4s-loading__spinner" hidden>
       <svg
        width="16"
        height="16"
        className="t4s-svg-spinner"
        focusable="false"
        role="presentation"
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
       >
        <circle
         className="t4s-path"
         fill="none"
         strokeWidth="6"
         cx="33"
         cy="33"
         r="30"
        ></circle>
       </svg>
      </span>
     </a>
    </div>
   </div>
  </div>
 );
};

export default RecommendationItem;
