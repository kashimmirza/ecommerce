/** @format */

// import React, { useContext } from "react";
// import "./ProductDisplay.css";
// import star_icon from "../Assets/star_icon.png";
// import star_dull_icon from "../Assets/star_dull_icon.png";
// import { ShopContext } from "../../Context/ShopContext";

// const ProductDisplay = (props) => {
//  const { product } = props;
//  const { addToCart } = useContext(ShopContext);
//  return (
//   <div className="productdisplay">
//    <div className="productdisplay-left">
//     <div className="productdisplay-img-list">
//      <img src={product.image} alt="" />
//      <img src={product.image} alt="" />
//      <img src={product.image} alt="" />
//      <img src={product.image} alt="" />
//     </div>
//     <div className="productdisplay-img">
//      <img className="productdisplay-main-img" src={product.image} alt="" />
//     </div>
//    </div>
//    <div className="productdisplay-right">
//     <h1>{product.name}</h1>
//     <div className="productdisplay-right-stars">
//      <img src={star_icon} alt="" />
//      <img src={star_icon} alt="" />
//      <img src={star_icon} alt="" />
//      <img src={star_icon} alt="" />
//      <img src={star_dull_icon} alt="" />
//      <p>(122)</p>
//     </div>
//     <div className="productdisplay-right-prices">
//      <div className="productdisplay-right-price-old">${product.old_price}</div>
//      <div className="productdisplay-right-price-new">${product.new_price}</div>
//     </div>
//     <div className="productdisplay-right-description">
//      A lightweight, usually knitted, pullover shirt, close-fitting and with a
//      round neckline and short sleeves, worn as an undershirt or outer garment.
//     </div>
//     <div className="productdisplay-right-size">
//      <h1>Select Size</h1>
//      <div className="productdisplay-right-sizes">
//       <div>S</div>
//       <div>M</div>
//       <div>L</div>
//       <div>XL</div>
//       <div>XXl</div>
//      </div>
//     </div>
//     <button
//      onClick={() => {
//       addToCart(product.id);
//      }}
//     >
//      ADD TO CART
//     </button>
//     <p className="productdisplay-right-category">
//      <span>Category :</span>Women , T-Shirt, Crop Top
//     </p>
//     <p className="productdisplay-right-category">
//      <span>Tags :</span>Modern, Latest
//     </p>
//    </div>
//   </div>
//  );
// };

// export default ProductDisplay;

//================trail version ===========
// import React, { useContext } from "react";
// import "./ProductDisplay.css";
// import star_icon from "../Assets/star_icon.png";
// import star_dull_icon from "../Assets/star_dull_icon.png";
// import { ShopContext } from "../../Context/ShopContext";

// const ProductDisplay = (props) => {
//  const { product } = props;
//  const { addToCart } = useContext(ShopContext);
//  return (
//   <div className="productdisplay">
//    <div className="productdisplay-left">
//     <div className="productdisplay-img-list">
//      <img src={product.image} alt="" />
//      <img src={product.image} alt="" />
//      <img src={product.image} alt="" />
//      <img src={product.image} alt="" />
//     </div>
//     <div className="productdisplay-img">
//      <img className="productdisplay-main-img" src={product.image} alt="" />
//     </div>
//    </div>
//    <div className="productdisplay-right">
//     <h1>{product.name}</h1>
//     <div className="productdisplay-right-stars">
//      <img src={star_icon} alt="" />
//      <img src={star_icon} alt="" />
//      <img src={star_icon} alt="" />
//      <img src={star_icon} alt="" />
//      <img src={star_dull_icon} alt="" />
//      <p>(122)</p>
//     </div>
//     <div className="productdisplay-right-prices">
//      <div className="productdisplay-right-price-old">${product.oldPrice}</div>
//      <div className="productdisplay-right-price-new">${product.newPrice}</div>
//     </div>
//     <div className="productdisplay-right-description">
//      A lightweight, usually knitted, pullover shirt, close-fitting and with a
//      round neckline and short sleeves, worn as an undershirt or outer garment.
//     </div>
//     <div className="productdisplay-right-size">
//      <h1>Select Size</h1>
//      <div className="productdisplay-right-sizes">
//       <div>S</div>
//       <div>M</div>
//       <div>L</div>
//       <div>XL</div>
//       <div>XXl</div>
//      </div>
//     </div>
//     <button
//      onClick={() => {
//       addToCart(product.id);
//      }}
//     >
//      ADD TO CART
//     </button>
//     <p className="productdisplay-right-category">
//      <span>Category :</span>Women , T-Shirt, Crop Top
//     </p>
//     <p className="productdisplay-right-category">
//      <span>Tags :</span>Modern, Latest
//     </p>
//    </div>
//   </div>
//  );
// };

// export default ProductDisplay;

// import React, { useContext, useState } from "react";
// import "./ProductDisplay.css";
// import star_icon from "../Assets/star_icon.png";
// import star_dull_icon from "../Assets/star_dull_icon.png";
// import { ShopContext } from "../../Context/ShopContext";

// const ProductDisplay = (props) => {
//  const { product } = props;
//  console.log("props", props.Image);
//  const { addToCart } = useContext(ShopContext);

//  const [selectedSize, setSelectedSize] = useState(""); // State to track selected size

//  const handleSizeClick = (size) => {
//   setSelectedSize(size); // Set the selected size
//  };

//  const handleAddToCart = () => {
//   if (!selectedSize) {
//    alert("Please select a size before adding to the cart.");
//    return;
//   }
//   addToCart(product.id, selectedSize); // Pass product ID and size to addToCart
//   alert(`Added to cart: ${product.name} (Size: ${selectedSize})`);
//  };

//  return (
//   <div className="productdisplay">
//    <div className="productdisplay-left">
//     <div className="productdisplay-img-list">
//      <img src={product.image} alt="" />
//      <img src={product.image} alt="" />
//      <img src={product.image} alt="" />
//      <img src={product.image} alt="" />
//     </div>
//     <div className="productdisplay-img">
//      <img className="productdisplay-main-img" src={product.image} alt="" />
//     </div>
//    </div>
//    <div className="productdisplay-right">
//     <h1>{product.name}</h1>
//     <div className="productdisplay-right-stars">
//      <img src={star_icon} alt="" />
//      <img src={star_icon} alt="" />
//      <img src={star_icon} alt="" />
//      <img src={star_icon} alt="" />
//      <img src={star_dull_icon} alt="" />
//      <p>(122)</p>
//     </div>
//     <div className="productdisplay-right-prices">
//      <div className="productdisplay-right-price-old">${product.oldPrice}</div>
//      <div className="productdisplay-right-price-new">${product.newPrice}</div>
//     </div>
//     <div className="productdisplay-right-description">
//      <h1>{product.description}</h1>
//     </div>
//     <div className="productdisplay-right-size">
//      <h1>Select Size</h1>
//      <div className="productdisplay-right-sizes">
//       {["S", "M", "L", "XL", "XXL"].map((size) => (
//        <div
//         key={size}
//         className={`size-option ${selectedSize === size ? "selected" : ""}`}
//         onClick={() => handleSizeClick(size)}
//        >
//         {size}
//        </div>
//       ))}
//      </div>
//     </div>
//     <button onClick={handleAddToCart}>ADD TO CART</button>
//     <p className="productdisplay-right-category">
//      <span>Category :</span> Women, T-Shirt, Crop Top
//     </p>
//     <p className="productdisplay-right-category">
//      <span>Tags :</span> Modern, Latest
//     </p>
//    </div>
//   </div>
//  );
// };

// export default ProductDisplay;

//===================
// import React, { useContext, useState } from "react";
// import "./ProductDisplay.css";
// import star_icon from "../Assets/star_icon.png";
// import star_dull_icon from "../Assets/star_dull_icon.png";
// import { ShopContext } from "../../Context/ShopContext";
// import { LazyLoadImage } from "react-lazy-load-image-component";

// const ProductDisplay = (props) => {
//  const { product } = props; // Destructuring product from props
//  const { addToCart } = useContext(ShopContext); // Add to cart function from context

//  const [selectedSize, setSelectedSize] = useState(""); // Track the selected size
//  const [mainImage, setMainImage] = useState(product.primaryImages[0]); // Track the currently displayed main image

//  // Handle the size click event to update the selected size
//  const handleSizeClick = (size) => {
//   setSelectedSize(size);
//  };

//  // Handle the "Add to Cart" button click
//  const handleAddToCart = () => {
//   if (!selectedSize) {
//    alert("Please select a size before adding to the cart.");
//    return;
//   }
//   addToCart(product.productId, selectedSize); // Add the product to the cart
//   alert(`Added to cart: ${product.name} (Size: ${selectedSize})`);
//  };

//  // Handle changing the main image when a gallery image is clicked
//  const handleImageClick = (image) => {
//   setMainImage(image); // Set the clicked image as the main image
//  };
//  console.log("main image:", mainImage);
//  console.log("hoverImages:", product.hoverImages);

//  return (
//   <div className="productdisplay">
//    <div className="productdisplay-left">
//     {/* Photo Gallery (List of hover images) */}
//     <div className="productdisplay-img-list">
//      {product.hoverImages.map((image, index) => (
//       <div
//        key={index}
//        className="productdisplay-img-item"
//        onClick={() => handleImageClick(image)} // Update main image on click
//       >
//        <LazyLoadImage
//         alt={`Product Hover Image ${index + 1}`}
//         src="data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%201000%201500%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3C%2Fsvg%3E" // Placeholder
//         data-src={image} // Actual hover image URL
//         width="100"
//         height="150"
//         className="lazyload" // Lazy load class
//        />
//       </div>
//      ))}
//     </div>
//    </div>

//    <div className="productdisplay-right">
//     {/* Main Image Gallery */}
//     <div className="productdisplay-img-container">
//      <LazyLoadImage
//       alt={product.name}
//       src="data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%201000%201500%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3C%2Fsvg%3E"
//       data-src={mainImage} // Using the mainImage state for dynamically updating the image
//       data-srcset={`${mainImage}?width=100 100w, ${mainImage}?width=200 200w, ${mainImage}?width=400 400w`}
//       data-sizes="auto"
//       width="1000"
//       height="1500"
//       className="lazyload productdisplay-main-img" // Lazy load and main image class
//      />
//      {/* Zoomed-in Image */}
//      <img
//       src={mainImage} // Main image
//       alt={product.name}
//       className="productdisplay-img-zoom"
//      />
//     </div>
//    </div>

//    {/* Product Information Section */}
//    <div className="productdisplay-right">
//     <h1>{product.name}</h1>
//     <div className="productdisplay-right-stars">
//      {/* Displaying 4 stars and 1 dull star */}
//      <img src={star_icon} alt="Star" />
//      <img src={star_icon} alt="Star" />
//      <img src={star_icon} alt="Star" />
//      <img src={star_icon} alt="Star" />
//      <img src={star_dull_icon} alt="Star" />
//      <p>(122)</p>
//     </div>
//     <div className="productdisplay-right-prices">
//      <div className="productdisplay-right-price-old">${product.oldPrice}</div>
//      <div className="productdisplay-right-price-new">${product.newPrice}</div>
//     </div>
//     <div className="productdisplay-right-description">
//      <h1>{product.description}</h1>
//     </div>
//     <div className="productdisplay-right-size">
//      <h1>Select Size</h1>
//      <div className="productdisplay-right-sizes">
//       {["S", "M", "L", "XL", "XXL"].map((size) => (
//        <div
//         key={size}
//         className={`size-option ${selectedSize === size ? "selected" : ""}`}
//         onClick={() => handleSizeClick(size)} // Set the selected size on click
//        >
//         {size}
//        </div>
//       ))}
//      </div>
//     </div>
//     <button onClick={handleAddToCart}>ADD TO CART</button>
//     <p className="productdisplay-right-category">
//      <span>Category :</span> {product.category}
//     </p>
//     <p className="productdisplay-right-category">
//      <span>Tags :</span> Modern, Latest
//     </p>
//    </div>
//   </div>
//  );
// };

// export default ProductDisplay;

// import React, { useContext, useState, useEffect } from "react";
// import "./ProductDisplay.css";
// import star_icon from "../Assets/star_icon.png";
// import star_dull_icon from "../Assets/star_dull_icon.png";
// import { ShopContext } from "../../Context/ShopContext";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import "react-lazy-load-image-component/src/effects/blur.css";
// import RelatedProducts from "../RelatedProducts/RelatedProducts";
// const ProductDisplay = (props) => {
//  const { product } = props;
//  const { addToCart } = useContext(ShopContext);

//  const [selectedSize, setSelectedSize] = useState("");
//  const [mainImage, setMainImage] = useState("");

//  // Ensure that primaryImages and hoverImages are populated
//  console.log("Primary Image URL:", product.primaryImages[0]);
//  useEffect(() => {
//   if (product.primaryImages && product.primaryImages.length > 0) {
//    setMainImage(product.primaryImages[0]);
//   }
//  }, [product.primaryImages]);
//  console.log("primary images:", mainImage);

//  const handleSizeClick = (size) => {
//   setSelectedSize(size);
//  };

//  const handleAddToCart = () => {
//   if (!selectedSize) {
//    alert("Please select a size before adding to the cart.");
//    return;
//   }
//   addToCart(product.productId, selectedSize);
//   alert(`Added to cart: ${product.name} (Size: ${selectedSize})`);
//  };

//  const handleImageClick = (image) => {
//   setMainImage(image);
//  };

//  const handleProductClick = (relatedProduct) => {
//   setMainImage(relatedProduct.primaryImages[0] || "");
//  };

//  // Conditional rendering for hover images
//  const renderHoverImages = () => {
//   if (!product.hoverImages || product.hoverImages.length === 0) {
//    return <div>No hover images available</div>;
//   }

//   return product.hoverImages.map((image, index) => (
//    <div key={index} onClick={() => handleImageClick(image)}>
//     {/*<LazyLoadImage
//      alt={`Product Hover Image ${index + 1}`}
//      src="data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%201000%201500%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3C%2Fsvg%3E" // Placeholder
//      data-src={image} // Actual hover image URL
//      width="100"
//      height="150"
//      className="lazyload"
//     />
//     */}
//     <img
//      alt={`Product Hover Image ${index + 1}`}
//      src={image}
//      width="100"
//      height="150"
//      className="productdisplay-hover-img"
//     />
//    </div>
//   ));
//  };

//  return (
//   <div className="productdisplay">
//    <div className="productdisplay-img-list">{renderHoverImages()}</div>

//    <div className="productdisplay-right">
//     <div className="productdisplay-img-container">
//      <LazyLoadImage
//       alt={product.name}
//       src={mainImage}
//       data-src={mainImage}
//       data-srcset={`${mainImage}?width=100 100w, ${mainImage}?width=200 200w, ${mainImage}?width=400 400w`}
//       data-sizes="auto"
//       width="2000"
//       height="2500"
//       className="lazyload productdisplay-main-img"
//      />
//      {/*<img
//       src={mainImage}
//       alt={product.name}
//       className="productdisplay-main-img"
//       title={`Main Image: ${product.name}`}
//      />
//      */}
//      {/*<img
//       src={mainImage}
//       alt={product.name}
//       className="productdisplay-img-zoom"
//      />
//      */}
//     </div>
//    </div>

//    <div className="productdisplay-right">
//     <h1>{product.name}</h1>
//     <div className="productdisplay-right-stars">
//      <img src={star_icon} alt="Star" />
//      <img src={star_icon} alt="Star" />
//      <img src={star_icon} alt="Star" />
//      <img src={star_icon} alt="Star" />
//      <img src={star_dull_icon} alt="Star" />
//      <p>(122)</p>
//     </div>
//     <div className="productdisplay-right-prices">
//      <div className="productdisplay-right-price-old">${product.oldPrice}</div>
//      <div className="productdisplay-right-price-new">${product.newPrice}</div>
//     </div>
//     <div className="productdisplay-right-description">
//      <h1>{product.description}</h1>
//     </div>
//     <div className="productdisplay-right-size">
//      <h1>Select Size</h1>
//      <div className="productdisplay-right-sizes">
//       {["S", "M", "L", "XL", "XXL"].map((size) => (
//        <div
//         key={size}
//         className={`size-option ${selectedSize === size ? "selected" : ""}`}
//         onClick={() => handleSizeClick(size)}
//        >
//         {size}
//        </div>
//       ))}
//      </div>
//     </div>
//     <button onClick={handleAddToCart}>ADD TO CART</button>
//     <p className="productdisplay-right-category">
//      <span>Category :</span> {product.category}
//     </p>
//     <p className="productdisplay-right-category">
//      <span>Tags :</span> Modern, Latest
//     </p>
//    </div>
//    <RelatedProducts
//     productId={product.productId}
//     category={product.category}
//     onProductClick={handleProductClick}
//    />
//   </div>
//  );
// };

// export default ProductDisplay;

//===================================second trial with image hover=====================

// import React, { useContext, useState } from "react";
// import "./ProductDisplay.css";
// import star_icon from "../Assets/star_icon.png";
// import star_dull_icon from "../Assets/star_dull_icon.png";
// import { ShopContext } from "../../Context/ShopContext";

// const ProductDisplay = (props) => {
//  const { product } = props;
//  const { addToCart } = useContext(ShopContext);

//  const [selectedSize, setSelectedSize] = useState(""); // State to track selected size
//  const [isHovered, setIsHovered] = useState(false); // State to track hover

//  const primaryImage = product.images.find((img) => img.imageType === "primary");
//  const hoverImage = product.images.find((img) => img.imageType === "hover");

//  const mainImage =
//   isHovered && hoverImage ? hoverImage.imageUrl : primaryImage.imageUrl;

//  const handleSizeClick = (size) => {
//   setSelectedSize(size); // Set the selected size
//  };

//  const handleAddToCart = () => {
//   if (!selectedSize) {
//    alert("Please select a size before adding to the cart.");
//    return;
//   }
//   addToCart(product.id, selectedSize); // Pass product ID and size to addToCart
//   alert(`Added to cart: ${product.name} (Size: ${selectedSize})`);
//  };

//  return (
//   <div className="productdisplay">
//    <div className="productdisplay-left">
//     {/* Thumbnails */}
//     <div className="productdisplay-img-list">
//      {product.images.map((img, index) => (
//       <img key={index} src={img.imageUrl} alt="" />
//      ))}
//     </div>
//     {/* Main Image */}
//     <div
//      className="productdisplay-img"
//      onMouseEnter={() => setIsHovered(true)}
//      onMouseLeave={() => setIsHovered(false)}
//     >
//      <img
//       className="productdisplay-main-img"
//       src={mainImage}
//       alt={product.name}
//      />
//     </div>
//    </div>
//    <div className="productdisplay-right">
//     <h1>{product.name}</h1>
//     <div className="productdisplay-right-stars">
//      <img src={star_icon} alt="" />
//      <img src={star_icon} alt="" />
//      <img src={star_icon} alt="" />
//      <img src={star_icon} alt="" />
//      <img src={star_dull_icon} alt="" />
//      <p>(122)</p>
//     </div>
//     <div className="productdisplay-right-prices">
//      <div className="productdisplay-right-price-old">${product.oldPrice}</div>
//      <div className="productdisplay-right-price-new">${product.newPrice}</div>
//     </div>
//     <div className="productdisplay-right-description">
//      <h1>{product.description}</h1>
//     </div>
//     <div className="productdisplay-right-size">
//      <h1>Select Size</h1>
//      <div className="productdisplay-right-sizes">
//       {["S", "M", "L", "XL", "XXL"].map((size) => (
//        <div
//         key={size}
//         className={`size-option ${selectedSize === size ? "selected" : ""}`}
//         onClick={() => handleSizeClick(size)}
//        >
//         {size}
//        </div>
//       ))}
//      </div>
//     </div>
//     <button onClick={handleAddToCart}>ADD TO CART</button>
//     <p className="productdisplay-right-category">
//      <span>Category :</span> Women, T-Shirt, Crop Top
//     </p>
//     <p className="productdisplay-right-category">
//      <span>Tags :</span> Modern, Latest
//     </p>
//    </div>
//   </div>
//  );
// };

// export default ProductDisplay;

import React, { useState } from "react";
import "./ProductDisplay.css";
import {
 CreditCard,
 Smartphone,
 Monitor,
 Headphones,
 HelpCircle,
 Gift,
 LogIn,
 X,
 MessageCircle,
 Mail,
 Phone,
 ChevronDown,
 ChevronUp,
 Play,
 CheckCircle,
 Flag,
} from "lucide-react";

const ProductDisplay = () => {
 const [isOpen, setIsOpen] = useState(true);
 const [activeTab, setActiveTab] = useState("cards");
 const [cardNumber, setCardNumber] = useState("");
 const [expiryDate, setExpiryDate] = useState("");
 const [cvv, setCvv] = useState("");
 const [cardHolderName, setCardHolderName] = useState("");
 const [mobileNumber, setMobileNumber] = useState("");
 const [saveCard, setSaveCard] = useState(false);
 const [showSupport, setShowSupport] = useState(false);
 const [showOffers, setShowOffers] = useState(false);
 const [showFAQ, setShowFAQ] = useState(false);
 const [showMobileVerification, setShowMobileVerification] = useState(false);
 const [expandedFAQ, setExpandedFAQ] = useState(null);

 const amount = "885.00 BDT";

 const handlePayment = () => {
  if (activeTab === "mobile" && !showMobileVerification) {
   setShowMobileVerification(true);
   return;
  }
  console.log("Processing payment...");
 };

 const handleMobileVerify = () => {
  console.log("Verifying mobile number...");
 };

 const faqItems = [
  {
   question: "Is it safe to save my card information here?",
   answer:
    "Yes, we use industry-standard encryption and security measures to protect your card information. Your data is stored securely and complies with PCI DSS standards.",
  },
  {
   question: "When will my saved cards be used for transactions?",
   answer:
    "Saved cards will only be used when you explicitly select them for future transactions. We will never use your saved cards without your consent.",
  },
  {
   question: "How do you ensure that my saved card is used only by me?",
   answer:
    "We implement multiple security layers including device recognition, transaction monitoring, and verification prompts to ensure only you can use your saved cards.",
  },
 ];

 if (!isOpen) return null;

 return (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
   <div className="bg-white rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
    {/* Header */}
    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-t-lg relative">
     <div className="text-center">
      <div className="w-16 h-16 bg-red-700 rounded-full flex items-center justify-center mx-auto mb-2">
       <span className="text-white font-bold text-sm">Blucheez</span>
      </div>
      <h2 className="text-xl font-bold">Blucheez</h2>
      <span className="text-sm opacity-90">4:25</span>
     </div>
     <button
      onClick={() => setIsOpen(false)}
      className="absolute top-4 right-4 text-white hover:bg-red-700 rounded-full p-1"
     >
      <X size={20} />
     </button>
    </div>

    {/* Action Buttons */}
    <div className="p-4 border-b">
     <div className="flex justify-around">
      <button
       onClick={() => setShowSupport(!showSupport)}
       className="flex flex-col items-center text-blue-500 hover:text-blue-700"
      >
       <Headphones size={24} />
       <span className="text-xs mt-1">Support</span>
      </button>
      <button
       onClick={() => setShowFAQ(!showFAQ)}
       className="flex flex-col items-center text-blue-500 hover:text-blue-700"
      >
       <HelpCircle size={24} />
       <span className="text-xs mt-1">FAQ</span>
      </button>
      <button
       onClick={() => setShowOffers(!showOffers)}
       className="flex flex-col items-center text-blue-500 hover:text-blue-700"
      >
       <Gift size={24} />
       <span className="text-xs mt-1">Offers</span>
      </button>
      <button className="flex flex-col items-center text-blue-500 hover:text-blue-700">
       <LogIn size={24} />
       <span className="text-xs mt-1">Login</span>
      </button>
     </div>
    </div>

    {/* Support Panel */}
    {showSupport && (
     <div className="p-4 bg-gray-50 border-b">
      <p className="text-sm text-gray-700 mb-4">
       We are here to help you with any information and problems through our
       contact center
      </p>
      <div className="space-y-2">
       <button className="w-full bg-white p-3 rounded-lg shadow-sm flex items-center hover:bg-blue-50">
        <MessageCircle className="text-blue-500 mr-3" size={20} />
        <span className="text-sm">Click here for messenger live chat</span>
       </button>
       <button className="w-full bg-white p-3 rounded-lg shadow-sm flex items-center hover:bg-orange-50">
        <Mail className="text-orange-500 mr-3" size={20} />
        <span className="text-sm">Click here to email us</span>
       </button>
       <button className="w-full bg-white p-3 rounded-lg shadow-sm flex items-center hover:bg-green-50">
        <Phone className="text-green-500 mr-3" size={20} />
        <span className="text-sm">Customer Care Representative 16444</span>
       </button>
      </div>
     </div>
    )}

    {/* Offers Panel */}
    {showOffers && (
     <div className="p-4 bg-gray-50 border-b text-center">
      <p className="text-gray-600">
       At present, there are no offers available. Please check back later.
      </p>
     </div>
    )}

    {/* FAQ Panel */}
    {showFAQ && (
     <div className="p-4 bg-gray-50 border-b">
      <div className="mb-4">
       <p className="text-sm font-medium mb-2">
        For clear instructions, watch this
       </p>
       <div className="bg-white p-4 rounded-lg text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
         <Play className="text-red-500" size={24} />
        </div>
        <p className="text-xs text-gray-600">PC UI Before Save SS...</p>
       </div>
      </div>
      <div className="space-y-2">
       {faqItems.map((item, index) => (
        <div key={index} className="bg-white rounded-lg overflow-hidden">
         <button
          onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
          className="w-full p-3 text-left flex justify-between items-center hover:bg-gray-50"
         >
          <span className="text-sm font-medium">{item.question}</span>
          {expandedFAQ === index ? (
           <ChevronUp size={16} />
          ) : (
           <ChevronDown size={16} />
          )}
         </button>
         {expandedFAQ === index && (
          <div className="px-3 pb-3">
           <p className="text-xs text-gray-600">{item.answer}</p>
          </div>
         )}
        </div>
       ))}
      </div>
     </div>
    )}

    {/* Payment Tabs */}
    <div className="flex">
     <button
      onClick={() => setActiveTab("cards")}
      className={`flex-1 py-3 px-2 text-xs font-medium flex items-center justify-center ${
       activeTab === "cards"
        ? "bg-red-500 text-white"
        : "bg-red-300 text-white hover:bg-red-400"
      }`}
     >
      <CreditCard size={16} className="mr-1" />
      CARDS
     </button>
     <button
      onClick={() => setActiveTab("mobile")}
      className={`flex-1 py-3 px-2 text-xs font-medium flex items-center justify-center ${
       activeTab === "mobile"
        ? "bg-red-500 text-white"
        : "bg-red-300 text-white hover:bg-red-400"
      }`}
     >
      <Smartphone size={16} className="mr-1" />
      MOBILE BANKING
     </button>
     <button
      onClick={() => setActiveTab("net")}
      className={`flex-1 py-3 px-2 text-xs font-medium flex items-center justify-center ${
       activeTab === "net"
        ? "bg-red-500 text-white"
        : "bg-red-300 text-white hover:bg-red-400"
      }`}
     >
      <Monitor size={16} className="mr-1" />
      NET BANKING
     </button>
    </div>

    {/* Tab Content */}
    <div className="p-4">
     {/* Cards Tab */}
     {activeTab === "cards" && (
      <div className="space-y-4">
       {/* Card Logos */}
       <div className="flex justify-center gap-2 mb-4">
        <div className="w-12 h-8 bg-blue-800 rounded flex items-center justify-center">
         <span className="text-white text-xs font-bold">VISA</span>
        </div>
        <div className="w-12 h-8 bg-red-500 rounded flex items-center justify-center">
         <span className="text-white text-xs font-bold">MC</span>
        </div>
        <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
         <span className="text-white text-xs font-bold">AMEX</span>
        </div>
        <div className="w-12 h-8 bg-blue-700 rounded flex items-center justify-center">
         <span className="text-white text-xs font-bold">DCI</span>
        </div>
       </div>

       <div className="relative">
        <input
         type="text"
         placeholder="Enter Card Number"
         value={cardNumber}
         onChange={(e) => setCardNumber(e.target.value)}
         className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 pl-10"
        />
        <CreditCard
         className="absolute left-3 top-3.5 text-gray-400"
         size={20}
        />
       </div>

       <div className="grid grid-cols-2 gap-4">
        <input
         type="text"
         placeholder="MM/YY"
         value={expiryDate}
         onChange={(e) => setExpiryDate(e.target.value)}
         className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <input
         type="password"
         placeholder="CVC/CVV"
         value={cvv}
         onChange={(e) => setCvv(e.target.value)}
         className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
       </div>

       <input
        type="text"
        placeholder="Card Holder Name"
        value={cardHolderName}
        onChange={(e) => setCardHolderName(e.target.value)}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
       />

       <label className="flex items-center">
        <input
         type="checkbox"
         checked={saveCard}
         onChange={(e) => setSaveCard(e.target.checked)}
         className="mr-2"
        />
        <span className="text-sm text-gray-700">Save card & remember me</span>
       </label>

       <p className="text-xs text-gray-600">
        By checking this pay button you agree to our{" "}
        <span className="text-blue-500 cursor-pointer">Terms of Service</span>{" "}
        which is limited to facilitating...
       </p>
      </div>
     )}

     {/* Mobile Banking Tab */}
     {activeTab === "mobile" && (
      <div>
       {!showMobileVerification ? (
        <div className="bg-blue-50 p-4 rounded-lg">
         <p className="text-sm text-blue-700">
          Select your mobile banking provider and follow the instructions.
         </p>
        </div>
       ) : (
        <div className="space-y-4">
         <h3 className="text-lg font-semibold">
          Please verify your mobile number.
         </h3>
         <div className="relative">
          <input
           type="text"
           placeholder="Mobile Number"
           value={mobileNumber}
           onChange={(e) => setMobileNumber(e.target.value)}
           className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 pl-10 pr-20"
          />
          <Flag className="absolute left-3 top-3.5 text-green-600" size={20} />
          <button
           onClick={handleMobileVerify}
           className="absolute right-2 top-2 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
          >
           Verify
          </button>
         </div>
         <p className="text-sm text-gray-600">Ex. 01XXXXXXXXX</p>
         <button
          onClick={() => setShowMobileVerification(false)}
          className="text-orange-500 hover:text-orange-700 text-sm"
         >
          Skip This Step
         </button>
        </div>
       )}
      </div>
     )}

     {/* Net Banking Tab */}
     {activeTab === "net" && (
      <div className="bg-blue-50 p-4 rounded-lg">
       <p className="text-sm text-blue-700">
        Net banking options will be displayed here. Select your bank to proceed.
       </p>
      </div>
     )}
    </div>

    {/* Payment Button */}
    <div className="p-4 bg-gray-50 border-t">
     <button
      onClick={handlePayment}
      className="w-full bg-gray-600 hover:bg-gray-700 text-white py-4 rounded-lg font-semibold text-lg flex items-center justify-center"
     >
      <CheckCircle className="mr-2" size={20} />
      PAY {amount}
     </button>
    </div>
   </div>
  </div>
 );
};

export default ProductDisplay;
