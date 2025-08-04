/** @format */

import React from "react";
import "../AdminComponents/Assets/base.css";
import "../styles/global.css";
const ProductCard = ({ product }) => {
 console.log("product:", product);
 const { id, name, price, imageSrc, imageAlt, url, badgeText } = product;

 return (
  <div className="t4s-product t4s-pr-grid t4s-pr-style8 t4s-pr-9902684766487 t4s-col-item is-t4s-pr-created t4s_observered is-selected">
   <div className="t4s-product-wrapper" timeline="" hdt-reveal="slide-in">
    <div data-cacl-slide="" className="t4s-product-inner t4s-pr t4s-oh">
     <div
      className="t4s-product-img t4s_ratio hover-lazy-felix"
      data-style="--aspect-ratioapt: 0.6666666666666666"
     >
      <img
       data-pr-img=""
       className="t4s-product-main-img lazyautosizes lazyloadt4sed"
       loading="lazy"
       src={imageSrc}
       alt={imageAlt}
       width="1000"
       height="1500"
       data-srcset={`${imageSrc}?width=100 100w, ${imageSrc}?width=200 200w, ${imageSrc}?width=330 330w, ${imageSrc}?width=400 400w, ${imageSrc}?width=500 500w, ${imageSrc}?width=600 600w, ${imageSrc}?width=700 700w, ${imageSrc}?width=800 800w, ${imageSrc}?width=900 900w`}
      />
      <span className="lazyloadt4s-loader"></span>

      <noscript>
       <img
        className="t4s-product-main-img"
        loading="lazy"
        src={imageSrc}
        alt={imageAlt}
        width="600"
       />
      </noscript>
      <button
       className="lazy-felix lazy-felix-download-btn"
       data-img-link={imageSrc}
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
     <div
      data-product-badge=""
      data-sort="sale,new,soldout,preOrder,custom"
      className="t4s-product-badge"
     >
      {badgeText && <span>{badgeText}</span>}
     </div>

     <div className="t4s-product-btns">
      <a
       href={url}
       data-tooltip="left"
       className="t4s-pr-item-btn t4s-pr-wishlist t4s-tooltip-actived"
      >
       <span className="t4s-svg-pr-icon">
        <svg viewBox="0 0 24 24">
         <use xlinkHref="#t4s-icon-wis"></use>
        </svg>
       </span>
       <span className="t4s-text-pr">Add to Wishlist</span>
      </a>
      <a
       href={url}
       data-tooltip="left"
       className="t4s-pr-item-btn t4s-pr-compare t4s-tooltip-actived"
      >
       <span className="t4s-svg-pr-icon">
        <svg className="t4s-svg-cp" viewBox="0 0 24 24">
         <use xlinkHref="#t4s-icon-cp"></use>
        </svg>
       </span>
       <span className="t4s-text-pr">Compare</span>
      </a>
      <a
       href={url}
       data-tooltip="left"
       className="t4s-pr-item-btn t4s-pr-addtocart t4s-tooltip-actived"
      >
       <span className="t4s-svg-pr-icon">
        <svg viewBox="0 0 24 24">
         <use xlinkHref="#t4s-icon-atc"></use>
        </svg>
       </span>
       <span className="t4s-text-pr">Quick Shop</span>
      </a>
      <a
       href={url}
       data-tooltip="left"
       className="t4s-pr-item-btn t4s-pr-quickview t4s-tooltip-actived"
      >
       <span className="t4s-svg-pr-icon">
        <svg viewBox="0 0 24 24">
         <use xlinkHref="#t4s-icon-qv"></use>
        </svg>
       </span>
       <span className="t4s-text-pr">Quick view</span>
      </a>
     </div>

     <div className="t4s-product-btns2"></div>
     <a className="t4s-full-width-link is--href-replaced" href={url}></a>
    </div>

    <div className="t4s-product-info">
     <div className="t4s-product-info__inner">
      <h3 className="t4s-product-title">
       <a href={url} className="is--href-replaced">
        {name}
       </a>
      </h3>
      <div className="t4s-product-price">
       <span className="money">Tk {price} BDT</span>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default ProductCard;
