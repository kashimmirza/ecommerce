/** @format */

import React, { useState, useEffect } from "react";
import "../AdminComponents/Assets/slider-settings.css";
import "../AdminComponents/Assets/base.css";
import "../styles/global.css";

const ProductSlider3 = () => {
 const [isLoaded, setIsLoaded] = useState(false);

 useEffect(() => {
  const timer = setTimeout(() => {
   setIsLoaded(true);
  }, 500);
  return () => clearTimeout(timer);
 }, []);

 const bannerItems = [
  {
   id: "1",
   title: "EXCLUSIVE PANJABI",
   imageSrc:
    "https://blucheez.fashion/cdn/shop/files/Exclusive_Panjabi-1.webp?v=1741109457&width=900",
   link: "/collections/polo-shirt",
   animation: "fadeIn",
  },
  {
   id: "2",
   title: "EXCLUSIVE KAMEEZ",
   imageSrc:
    "https://blucheez.fashion/cdn/shop/files/EXCLUSIVE_KAMEEZ.webp?v=1739818945&width=1000",
   link: "/collections/western-tops",
   animation: "fadeInUp",
  },
  {
   id: "3",
   title: "MEN'S WAISTCOATS",
   imageSrc:
    "https://blucheez.fashion/cdn/shop/files/Men_s_Waistcoats.webp?v=1739818943&width=1000",
   link: "/collections/casual-shirts",
   animation: "fadeInUp",
  },
  {
   id: "4",
   title: "WOMEN'S FUSION WEAR",
   imageSrc:
    "https://blucheez.fashion/cdn/shop/files/FUSION_WEAR_7d1ee4b9-c9a0-40ed-a5b0-24b65238988f.webp?v=1739818944&width=1000",
   link: "/collections/long-dress",
   animation: "fadeInUp",
  },
 ];

 return (
  <div className="product-slider-container">
   <div className={`banner-grid ${isLoaded ? "loaded" : ""}`}>
    {bannerItems.map((item) => (
     <div key={item.id} className="banner-item">
      <div
       className={`banner-inner ${
        isLoaded ? `animation-${item.animation}` : ""
       }`}
      >
       <a href={item.link} className="banner-link" aria-label={item.title}>
        <div className="image-container">
         <img
          src={item.imageSrc}
          alt={item.title}
          className="banner-image"
          onError={(e) => {
           console.error(`Failed to load image: ${item.imageSrc}`);
           e.target.style.display = "none";
          }}
         />
         <div className="banner-content">
          <h2
           className="banner-title"
           style={{
            "--animation": item.animation,
            "--delay-animation": "0s",
            "--text-cl": "#ffffff",
            "--text-op": 1,
            "--text-fs": "24px",
            "--text-fw": 500,
            "--text-lh": "25px",
            "--text-ls": "2px",
            "--text-mgb": "0px",
           }}
          >
           {item.title}
          </h2>
         </div>
        </div>
       </a>
      </div>
     </div>
    ))}
   </div>

   <style jsx>{`
    .product-slider-container {
     width: 100%;
     padding: 10px 0;
    }

    .banner-grid {
     display: grid;
     grid-template-columns: repeat(2, 1fr);
     gap: 8px;
     opacity: 0;
     transition: opacity 0.5s ease;
    }

    .banner-grid.loaded {
     opacity: 1;
    }

    @media (min-width: 768px) {
     .banner-grid {
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
     }
    }

    .banner-item {
     position: relative;
     overflow: hidden;
    }

    .banner-inner {
     position: relative;
     height: 100%;
     opacity: 0;
    }

    .loaded .animation-fadeIn {
     animation: fadeIn 1s forwards;
    }

    .loaded .animation-fadeInUp {
     animation: fadeInUp 1s forwards;
    }

    .banner-link {
     display: block;
     position: relative;
     height: 100%;
     text-decoration: none;
    }

    .image-container {
     position: relative;
     width: 100%;
     height: 320px;
     overflow: hidden;
    }

    @media (min-width: 768px) {
     .image-container {
      height: 420px;
     }
    }

    .banner-image {
     width: 100%;
     height: 100%;
     object-fit: cover;
     transition: transform 0.3s ease;
    }

    .banner-link:hover .banner-image {
     transform: scale(1.05);
    }

    .banner-content {
     position: absolute;
     bottom: 0;
     left: 0;
     width: 100%;
     text-align: center;
     padding: 15px 0;
     background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0)
     );
     pointer-events: none;
     transition: opacity 0.3s ease;
    }

    .banner-title {
     color: var(--text-cl);
     font-size: var(--text-fs);
     font-weight: var(--text-fw);
     letter-spacing: var(--text-ls);
     text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
     margin: 0;
     line-height: var(--text-lh);
     opacity: var(--text-op);
    }

    .banner-link:hover .banner-title {
     opacity: 0;
    }

    @media (min-width: 768px) {
     .banner-title {
      font-size: 24px;
     }
    }

    @keyframes fadeIn {
     to {
      opacity: 1;
     }
    }

    @keyframes fadeInUp {
     from {
      opacity: 0;
      transform: translateY(20px);
     }
     to {
      opacity: 1;
      transform: translateY(0);
     }
    }
   `}</style>
  </div>
 );
};

export default ProductSlider3;
