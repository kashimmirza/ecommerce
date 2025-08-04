/** @format */

// CollectionPage.jsx
import React from "react";
import "./collection-pages.css"; // move styles from <style> blocks into this file

const CollectionPage = () => {
 return (
  <div className="template-collection">
   {/* Skip to content link for accessibility */}
   <a className="skip-to-content-link visually-hidden" href="#MainContent">
    Skip to content
   </a>

   {/* Overlay div */}
   <div className="t4s-close-overlay t4s-op-0"></div>

   {/* Main wrapper */}
   <div className="t4s-website-wrapper">
    {/* Title config section */}
    <div
     id="shopify-section-title_config"
     className="shopify-section t4s-section t4s-section-config t4s-section-admn-fixed"
    >
     {/* CSS moved to CollectionPage.css */}
    </div>

    {/* Product style config section */}
    <div
     id="shopify-section-pr_item_config"
     className="shopify-section t4s-section t4s-section-config t4s-section-config-product t4s-section-admn-fixed"
    >
     {/* CSS moved to CollectionPage.css */}
    </div>
   </div>
  </div>
 );
};

export default CollectionPage;
