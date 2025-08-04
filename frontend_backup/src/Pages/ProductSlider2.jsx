/** @format */

import React, { useState, useEffect } from "react";
import "../AdminComponents/Assets/slider-settings.css";
import "../AdminComponents/Assets/base.css";
import "../AdminComponents/Assets/banner.css";
import "../styles/global.css";
import PageDots from "./PageDots";

const ProductSlider2 = () => {
 const [isLoaded, setIsLoaded] = useState(false);

 useEffect(() => {
  const timer = setTimeout(() => {
   setIsLoaded(true);
  }, 500);
  return () => clearTimeout(timer);
 }, []);

 const bannerItems = [
  {
   id: "GWc8dn",
   title: "POLO SHIRT",
   imageSrc:
    "https://blucheez.fashion/cdn/shop/files/Polo_Shirt_db95365c-b0a1-4981-82af-93a047f55225.webp?v=1739818945&width=600",
   link: "/collections/polo-shirt",
   animation: "fadeIn",
  },
  {
   id: "fQ4p7p1",
   title: "WESTERN TOPS",
   imageSrc:
    "https://blucheez.fashion/cdn/shop/files/WESTERN_TOPS.webp?v=1739818945&width=900",
   link: "/collections/western-tops",
   animation: "fadeInUp",
  },
  {
   id: "fQ4p7p2",
   title: "Casual Shirts",
   imageSrc:
    "https://blucheez.fashion/cdn/shop/files/Casual_Shirts-01.webp?v=1720374326&width=1000",
   link: "/collections/casual-shirts",
   animation: "fadeInUp",
  },
  {
   id: "fQ4p7p3",
   title: "LONG DRESS",
   imageSrc:
    "https://blucheez.fashion/cdn/shop/files/LONG_DRESS_86e60ef4-f806-497f-b71c-1b57feea6b39.webp?v=1739818940&width=1000",
   link: "/collections/long-dress",
   animation: "fadeInUp",
  },
 ];

 return (
  <div className="product-slider-container">
   <div className={`banner-grid ${isLoaded ? "loaded" : ""}`}>
    {bannerItems.map((item) => (
     <div key={item.id} className="banner-item">
      <div className={`banner-inner animation-${item.animation}`}>
       <a href={item.link} className="banner-link">
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
          <h2 className="banner-title">{item.title}</h2>
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
     height: 420px;
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
     color: #ffffff;
     font-size: 18px;
     font-weight: 500;
     letter-spacing: 2px;
     text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
     margin: 0;
     transition: opacity 0.3s ease;
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

export default ProductSlider2;

// const ProductSlider2 = () => {
//  const products = [
//   {
//    id: "1",
//    handle: "exclusive-earring-33",
//    image:
//     "https://blucheez.fashion/cdn/shop/files/Polo_Shirt_db95365c-b0a1-4981-82af-93a047f55225.webp?v=1739818945&width=600",
//    title: "Exclusive Earring",
//    price: "Tk 1,250.00 BDT",
//   },
//   {
//    id: "2",
//    handle: "exclusive-earring-32",
//    image:
//     "https://blucheez.fashion/cdn/shop/files/WESTERN_TOPS.webp?v=1739818945&width=900",
//    title: "Exclusive Earring Silver",
//    price: "Tk 1,150.00 BDT",
//   },
//   // Repeat products...
//   {
//    id: "3",
//    handle: "exclusive-earring-32",
//    image:
//     "https://blucheez.fashion/cdn/shop/files/Casual_Shirts-01.webp?v=1720374326&width=1000",
//    title: "Exclusive Earring Silver",
//    price: "Tk 1,150.00 BDT",
//   },
//   {
//    id: "4",
//    handle: "exclusive-earring-32",
//    image:
//     "https://blucheez.fashion/cdn/shop/files/LONG_DRESS_86e60ef4-f806-497f-b71c-1b57feea6b39.webp?v=1739818940&width=1000",
//    title: "Exclusive Earring Silver",
//    price: "Tk 1,150.00 BDT",
//   },
//  ];

//  const [currentIndex, setCurrentIndex] = useState(0);
//  const visibleCount = 4;

//  const goToPrev = () => {
//   if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
//  };

//  const goToNext = () => {
//   if (currentIndex < products.length - visibleCount)
//    setCurrentIndex(currentIndex + 1);
//  };

//  const visibleProducts = products.slice(
//   currentIndex,
//   currentIndex + visibleCount,
//  );

//  return (
//   <div
//    className="t4s-banner-content t4s-fullwidth t4s-text-center"
//    style={{ backgroundColor: "#f8f8f8", padding: "40px 0" }}
//   >
//    <h2
//     className="t4s-bl-item t4s-animation-fadeIn"
//     style={{
//      color: "#000",
//      fontSize: "28px",
//      fontWeight: "600",
//      lineHeight: "1.5",
//      marginBottom: "20px",
//      letterSpacing: "1px",
//      animation: "fadeIn 2s ease-in-out",
//     }}
//    >
//     Explore Our Newest Collection
//    </h2>

//    <div
//     className="product-banner-grid"
//     style={{
//      display: "grid",
//      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
//      gap: "20px",
//      justifyContent: "center",
//      padding: "0 20px",
//     }}
//    >
//     {products.map((product) => (
//      <div
//       key={product.id}
//       className="t4s-banner-item"
//       style={{
//        background: "#fff",
//        borderRadius: "8px",
//        overflow: "hidden",
//        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
//        transition: "transform 0.3s",
//       }}
//      >
//       <a href={`/collections/newest-products/products/${product.handle}`}>
//        <img
//         src={product.image}
//         alt={product.title}
//         loading="lazy"
//         style={{ width: "100%", height: "300px", objectFit: "cover" }}
//        />
//        <div style={{ padding: "16px" }}>
//         <h3
//          style={{
//           fontSize: "16px",
//           fontWeight: "500",
//           marginBottom: "8px",
//           color: "#333",
//          }}
//         >
//          {product.title}
//         </h3>
//         <p style={{ fontSize: "14px", fontWeight: "bold", color: "#e53935" }}>
//          {product.price}
//         </p>
//        </div>
//       </a>
//      </div>
//     ))}
//    </div>
//   </div>
//  );
// };

// export default ProductSlider2;
