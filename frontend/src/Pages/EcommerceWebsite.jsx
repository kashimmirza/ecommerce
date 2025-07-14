/** @format */

import React, { useState, useEffect } from "react";
import {
 Search,
 Heart,
 User,
 ShoppingCart,
 ChevronDown,
 ChevronUp,
 X,
 Menu,
 ArrowRight,
 ArrowLeft,
} from "lucide-react";

// Main App Component
export default function EcommerceWebsite() {
 const [isLoginDrawerOpen, setIsLoginDrawerOpen] = useState(false);
 const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
 const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 const [activeDropdown, setActiveDropdown] = useState(null);
 const [searchTerm, setSearchTerm] = useState("");
 const [searchResults, setSearchResults] = useState([]);
 const [showSearch, setShowSearch] = useState(false);
 const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
 const [currentSwiperIndex, setCurrentSwiperIndex] = useState(0);
 const [filterOpen, setFilterOpen] = useState(false);
 const [sortOpen, setSortOpen] = useState(false);

 // Sample Data
 const banners = [
  {
   title: "reverie",
   subtitle: "WHISPERS OF THE SUN",
   description:
    "Sun-kissed vibes that embrace summer and mark traditions of witnessing a summer cycle. Beauty, joy, serenity, and contemplation forge body comfort and desire to renew. The warmth, and...",
  },
  {
   title: "Bekuari",
   subtitle: "SUMMER COLLECTION",
   description:
    "Elegant contemporary designs that blend tradition with modern aesthetics. Perfect for any special occasion.",
  },
 ];

 const swiperTexts = [
  "New arrivals every week - check out the latest styles",
  "Free shipping on orders over 2000 TK",
  "Use code WELCOME10 for 10% off your first purchase",
 ];

 const categories = [
  {
   id: 1,
   name: "SUMMER",
   subcategories: ["T-Shirts", "Shorts", "Dresses", "Sandals"],
  },
  {
   id: 2,
   name: "MEN",
   subcategories: ["Shirts", "Pants", "Suits", "Accessories"],
  },
  {
   id: 3,
   name: "WOMEN",
   subcategories: ["Tops", "Skirts", "Dresses", "Sarees", "Jewelry"],
  },
  {
   id: 4,
   name: "ACCESSORIES",
   subcategories: ["Earrings", "Necklaces", "Rings", "Bracelets"],
  },
 ];

 const products = [
  {
   id: 1,
   name: "Exclusive Earring",
   price: 750,
   currency: "BDT",
   image: "/api/placeholder/200/200",
   category: "Silver",
  },
  {
   id: 2,
   name: "Exclusive Earring",
   price: 850,
   currency: "BDT",
   image: "/api/placeholder/200/200",
   category: "Gold",
  },
  {
   id: 3,
   name: "Pearl Ring",
   price: 950,
   currency: "BDT",
   image: "/api/placeholder/200/200",
   category: "Gold",
  },
  {
   id: 4,
   name: "Pearl Stud Earrings",
   price: 650,
   currency: "BDT",
   image: "/api/placeholder/200/200",
   category: "Silver",
  },
  {
   id: 5,
   name: "Pearl Necklace",
   price: 1250,
   currency: "BDT",
   image: "/api/placeholder/200/200",
   category: "Silver",
  },
  {
   id: 6,
   name: "Designer Earrings",
   price: 1150,
   currency: "BDT",
   image: "/api/placeholder/200/200",
   category: "Silver",
  },
 ];

 const searchSuggestions = {
  e: ["earrings", "exclusive", "elegant designs"],
  ea: ["earrings", "earrings gold", "earrings silver"],
  p: ["pearl", "pendant", "pearl necklace"],
  r: ["ring", "rose gold", "ruby"],
  g: ["gold", "gemstone", "gold-plated"],
  s: ["silver", "stud earrings", "statement necklace"],
 };

 // Cart items
 const [cartItems, setCartItems] = useState([
  {
   id: 1,
   name: "Exclusive Earring",
   price: 750,
   currency: "BDT",
   image: "/api/placeholder/200/200",
   category: "Silver",
   quantity: 1,
  },
 ]);

 // Banner auto-rotation
 useEffect(() => {
  const timer = setInterval(() => {
   setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
  }, 5000);
  return () => clearInterval(timer);
 }, [banners.length]);

 // Text swiper
 useEffect(() => {
  const timer = setInterval(() => {
   setCurrentSwiperIndex((prevIndex) => (prevIndex + 1) % swiperTexts.length);
  }, 3000);
  return () => clearInterval(timer);
 }, [swiperTexts.length]);

 // Handle search logic
 useEffect(() => {
  if (searchTerm.length > 0) {
   // Check if we have suggestions for the first letter
   const firstChar = searchTerm.charAt(0).toLowerCase();
   const suggestions = searchSuggestions[firstChar] || [];

   // Filter suggestions that include the search term
   const filteredResults = suggestions.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase()),
   );

   setSearchResults(filteredResults);
  } else {
   setSearchResults([]);
  }
 }, [searchTerm]);

 // Toggle dropdowns
 const toggleDropdown = (id) => {
  if (activeDropdown === id) {
   setActiveDropdown(null);
  } else {
   setActiveDropdown(id);
  }
 };

 // Handle quantity change
 const updateQuantity = (id, change) => {
  setCartItems((prevItems) =>
   prevItems.map((item) =>
    item.id === id
     ? { ...item, quantity: Math.max(1, item.quantity + change) }
     : item,
   ),
  );
 };

 // Calculate cart total
 const cartTotal = cartItems.reduce(
  (total, item) => total + item.price * item.quantity,
  0,
 );

 // Remove item from cart
 const removeFromCart = (id) => {
  setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
 };

 return (
  <div className="flex flex-col min-h-screen bg-white">
   {/* Announcement Bar */}
   <div className="bg-red-600 text-white text-center py-2 text-sm">
    <p className="animate-pulse">
     New collection dropping soon! Sign up for early access
    </p>
   </div>

   {/* Topbar */}
   <div className="bg-white border-b border-gray-200 py-3">
    <div className="container mx-auto px-4 flex justify-between items-center">
     <div className="text-sm text-gray-600">
      Free shipping on orders over 2000 TK
     </div>
     <div className="flex items-center space-x-4 text-sm">
      <a href="#" className="hover:text-red-600">
       Track Order
      </a>
      <a href="#" className="hover:text-red-600">
       Blog
      </a>
      <a href="#" className="hover:text-red-600">
       Contact Us
      </a>
      <a href="#" className="hover:text-red-600">
       Help
      </a>
     </div>
    </div>
   </div>

   {/* Navbar */}
   <div className="bg-white py-4 border-b border-gray-200 sticky top-0 z-40">
    <div className="container mx-auto px-4">
     <div className="flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-bold text-red-600">Bekuari</div>

      {/* Main Navigation - Desktop */}
      <div className="hidden md:flex space-x-6">
       {categories.map((category) => (
        <div key={category.id} className="relative group">
         <button
          className="flex items-center px-2 py-1 hover:text-red-600"
          onClick={() => toggleDropdown(category.id)}
         >
          {category.name}
          {activeDropdown === category.id ? (
           <ChevronUp size={16} className="ml-1" />
          ) : (
           <ChevronDown size={16} className="ml-1" />
          )}
         </button>

         {/* Dropdown Content */}
         {activeDropdown === category.id && (
          <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded py-2 z-50">
           {category.subcategories.map((sub, idx) => (
            <a
             key={idx}
             href="#"
             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
             {sub}
            </a>
           ))}
          </div>
         )}
        </div>
       ))}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
       <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        <Menu size={24} />
       </button>
      </div>

      {/* Right Icons */}
      <div className="flex items-center space-x-4">
       {/* Search */}
       <div className="relative">
        <button
         onClick={() => setShowSearch(!showSearch)}
         className="hover:text-red-600"
        >
         <Search size={20} />
        </button>

        {/* Search Dropdown */}
        {showSearch && (
         <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg overflow-hidden z-50">
          <div className="p-2 flex border-b">
           <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
           />
           <button onClick={() => setShowSearch(false)} className="p-2">
            <X size={16} />
           </button>
          </div>

          {searchResults.length > 0 && (
           <div className="max-h-60 overflow-y-auto">
            {searchResults.map((result, idx) => (
             <div key={idx} className="p-2 hover:bg-gray-100 cursor-pointer">
              {result}
             </div>
            ))}
           </div>
          )}
         </div>
        )}
       </div>

       {/* Wishlist */}
       <button className="hover:text-red-600">
        <Heart size={20} />
       </button>

       {/* User/Login */}
       <button
        onClick={() => setIsLoginDrawerOpen(true)}
        className="hover:text-red-600"
       >
        <User size={20} />
       </button>

       {/* Cart */}
       <button
        onClick={() => setIsCartDrawerOpen(true)}
        className="hover:text-red-600 relative"
       >
        <ShoppingCart size={20} />
        {cartItems.length > 0 && (
         <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {cartItems.length}
         </span>
        )}
       </button>
      </div>
     </div>
    </div>
   </div>

   {/* Mobile Menu */}
   {isMobileMenuOpen && (
    <div className="md:hidden bg-white shadow-lg absolute top-0 left-0 w-full h-screen z-50 overflow-y-auto">
     <div className="p-4 flex justify-between border-b">
      <div className="text-2xl font-bold text-red-600">Bekuari</div>
      <button onClick={() => setIsMobileMenuOpen(false)}>
       <X size={24} />
      </button>
     </div>

     <div className="p-4">
      {categories.map((category) => (
       <div key={category.id} className="mb-4">
        <button
         className="flex items-center justify-between w-full py-2 border-b"
         onClick={() => toggleDropdown(category.id)}
        >
         <span>{category.name}</span>
         {activeDropdown === category.id ? (
          <ChevronUp size={16} />
         ) : (
          <ChevronDown size={16} />
         )}
        </button>

        {activeDropdown === category.id && (
         <div className="ml-4 mt-2">
          {category.subcategories.map((sub, idx) => (
           <a key={idx} href="#" className="block py-2 text-gray-700">
            {sub}
           </a>
          ))}
         </div>
        )}
       </div>
      ))}
     </div>
    </div>
   )}

   {/* Login Drawer */}
   {isLoginDrawerOpen && (
    <div className="fixed inset-0 z-50 overflow-hidden">
     <div
      className="absolute inset-0 bg-black bg-opacity-50"
      onClick={() => setIsLoginDrawerOpen(false)}
     ></div>
     <div className="absolute top-0 right-0 w-full md:w-96 h-full bg-white shadow-xl transform transition-transform duration-300">
      <div className="p-6">
       <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">Login</h2>
        <button onClick={() => setIsLoginDrawerOpen(false)}>
         <X size={24} />
        </button>
       </div>

       <form className="space-y-4">
        <div>
         <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
         </label>
         <input
          type="email"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
          placeholder="Your email"
         />
        </div>
        <div>
         <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
         </label>
         <input
          type="password"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
          placeholder="Your password"
         />
        </div>
        <div className="flex justify-between items-center">
         <div className="flex items-center">
          <input
           id="remember"
           type="checkbox"
           className="h-4 w-4 text-red-600"
          />
          <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
           Remember me
          </label>
         </div>
         <a href="#" className="text-sm text-red-600 hover:underline">
          Forgot password?
         </a>
        </div>
        <button
         type="submit"
         className="w-full py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
        >
         Login
        </button>
       </form>

       <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
         Don't have an account?{" "}
         <a href="#" className="text-red-600 hover:underline">
          Register now
         </a>
        </p>
       </div>
      </div>
     </div>
    </div>
   )}

   {/* Cart Drawer */}
   {isCartDrawerOpen && (
    <div className="fixed inset-0 z-50 overflow-hidden">
     <div
      className="absolute inset-0 bg-black bg-opacity-50"
      onClick={() => setIsCartDrawerOpen(false)}
     ></div>
     <div className="absolute top-0 right-0 w-full md:w-96 h-full bg-white shadow-xl transform transition-transform duration-300 flex flex-col">
      <div className="p-6 border-b">
       <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">SHOPPING CART</h2>
        <button onClick={() => setIsCartDrawerOpen(false)}>
         <X size={20} />
        </button>
       </div>
      </div>

      <div className="flex-grow overflow-y-auto p-6">
       {cartItems.length === 0 ? (
        <div className="text-center py-8">
         <p className="text-gray-600">Your cart is empty</p>
         <button
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          onClick={() => setIsCartDrawerOpen(false)}
         >
          Continue Shopping
         </button>
        </div>
       ) : (
        <div className="space-y-6">
         {cartItems.map((item) => (
          <div key={item.id} className="flex border-b pb-4">
           <div className="w-24 h-24 bg-gray-200 mr-4">
            <img
             src={item.image}
             alt={item.name}
             className="w-full h-full object-cover"
            />
           </div>
           <div className="flex-grow">
            <div className="flex justify-between">
             <h3 className="font-medium">{item.name}</h3>
             <p className="font-medium">
              {item.currency} {item.price.toFixed(2)}
             </p>
            </div>
            <p className="text-sm text-gray-500 mb-2">{item.category}</p>
            <div className="flex items-center border w-24">
             <button
              className="px-2 py-1"
              onClick={() => updateQuantity(item.id, -1)}
             >
              -
             </button>
             <span className="flex-grow text-center">{item.quantity}</span>
             <button
              className="px-2 py-1"
              onClick={() => updateQuantity(item.id, 1)}
             >
              +
             </button>
            </div>
           </div>
           <button
            className="ml-2 text-gray-500 hover:text-red-600"
            onClick={() => removeFromCart(item.id)}
           >
            <X size={16} />
           </button>
          </div>
         ))}
        </div>
       )}
      </div>

      {cartItems.length > 0 && (
       <div className="p-6 border-t">
        <div className="flex justify-between mb-4">
         <span className="font-medium">Subtotal:</span>
         <span className="font-medium">BDT {cartTotal.toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-600 mb-4">
         Taxes and shipping calculated at checkout
        </p>
        <button className="w-full py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 mb-2">
         CHECK OUT
        </button>
        <div className="flex justify-between">
         <div className="flex space-x-2">
          <img src="/api/placeholder/40/24" alt="COD" className="h-6" />
          <img src="/api/placeholder/40/24" alt="Visa" className="h-6" />
          <img src="/api/placeholder/40/24" alt="Mastercard" className="h-6" />
         </div>
        </div>
        <p className="text-xs text-gray-600 mt-4">
         All charges are billed in BDT. While the content of your cart is
         currently displayed in, the checkout will use BDT at the most current
         exchange rate.
        </p>
       </div>
      )}
     </div>
    </div>
   )}

   {/* Main Content */}
   <main className="flex-grow">
    {/* Banner/Hero Section */}
    <section className="relative h-96 overflow-hidden">
     <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url('/api/placeholder/1200/600')` }}
     >
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
     </div>
     <div className="container mx-auto h-full px-4 flex items-center">
      <div className="text-white max-w-xl">
       <h1 className="text-6xl font-light mb-2">
        {banners[currentBannerIndex].title}
       </h1>
       <p className="text-xl mb-4">{banners[currentBannerIndex].subtitle}</p>
       <p className="mb-6">{banners[currentBannerIndex].description}</p>
       <button className="px-6 py-2 bg-white text-gray-900 hover:bg-gray-200 transition duration-200">
        SHOP NOW
       </button>
      </div>
     </div>

     {/* Banner Navigation */}
     <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
      {banners.map((_, index) => (
       <button
        key={index}
        className={`w-2 h-2 rounded-full ${
         currentBannerIndex === index ? "bg-white" : "bg-white bg-opacity-50"
        }`}
        onClick={() => setCurrentBannerIndex(index)}
       ></button>
      ))}
     </div>
    </section>

    {/* Announcement Swiper */}
    <section className="bg-gray-100 py-3 text-center relative overflow-hidden">
     <div className="container mx-auto">
      <div className="relative h-6">
       {swiperTexts.map((text, index) => (
        <div
         key={index}
         className={`absolute inset-0 transition-opacity duration-500 
                    ${
                     currentSwiperIndex === index ? "opacity-100" : "opacity-0"
                    }`}
        >
         {text}
        </div>
       ))}
      </div>
     </div>
    </section>

    {/* Products Section */}
    <section className="py-12">
     <div className="container mx-auto px-4">
      <h2 className="text-center text-2xl font-semibold mb-8">
       DISCOVER LATEST STYLES
      </h2>

      {/* Filters Row */}
      <div className="flex justify-between items-center mb-6">
       {/* Filter Button */}
       <div className="relative">
        <button
         className="flex items-center space-x-2 px-4 py-2 border rounded-md"
         onClick={() => setFilterOpen(!filterOpen)}
        >
         <span>Filter</span>
         {filterOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {filterOpen && (
         <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-md p-4 z-30">
          <div className="mb-4">
           <h3 className="font-medium mb-2">Color</h3>
           <div className="space-y-2">
            <label className="flex items-center">
             <input type="checkbox" className="mr-2" />
             <span>Gold</span>
            </label>
            <label className="flex items-center">
             <input type="checkbox" className="mr-2" />
             <span>Silver</span>
            </label>
            <label className="flex items-center">
             <input type="checkbox" className="mr-2" />
             <span>Rose Gold</span>
            </label>
           </div>
          </div>

          <div className="mb-4">
           <h3 className="font-medium mb-2">Price Range</h3>
           <div className="space-y-2">
            <label className="flex items-center">
             <input type="checkbox" className="mr-2" />
             <span>Under 500 TK</span>
            </label>
            <label className="flex items-center">
             <input type="checkbox" className="mr-2" />
             <span>500 - 1000 TK</span>
            </label>
            <label className="flex items-center">
             <input type="checkbox" className="mr-2" />
             <span>Over 1000 TK</span>
            </label>
           </div>
          </div>

          <button className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
           Apply Filters
          </button>
         </div>
        )}
       </div>

       {/* Sort Button */}
       <div className="relative">
        <button
         className="flex items-center space-x-2 px-4 py-2 border rounded-md"
         onClick={() => setSortOpen(!sortOpen)}
        >
         <span>Sort By: Featured</span>
         {sortOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {sortOpen && (
         <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-30">
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
           Featured
          </button>
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
           Best Selling
          </button>
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
           Price: Low to High
          </button>
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
           Price: High to Low
          </button>
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
           Newest First
          </button>
         </div>
        )}
       </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
       {products.map((product) => (
        <div key={product.id} className="group">
         <div className="relative overflow-hidden mb-4">
          <img
           src={product.image}
           alt={product.name}
           className="w-full aspect-square object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
           <button className="px-4 py-2 bg-white text-gray-900 hover:bg-gray-200 transition duration-200 mx-2">
            View
           </button>
           <button className="p-2 bg-white text-gray-900 hover:bg-gray-200 transition duration-200 rounded-full">
            <Heart size={16} />
           </button>
          </div>
         </div>
         <h3 className="text-sm">{product.name}</h3>
         <p className="text-sm text-gray-500">{product.category}</p>
         <p className="font-medium">
          {product.currency} {product.price.toFixed(2)}
         </p>
        </div>
       ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12">
       <nav className="flex items-center space-x-2">
        <button className="p-2 border rounded">
         <ArrowLeft size={16} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center border rounded bg-red-600 text-white">
         1
        </button>
        <button className="w-8 h-8 flex items-center justify-center border rounded">
         2
        </button>
        <button className="w-8 h-8 flex items-center justify-center border rounded">
         3
        </button>
        <button className="p-2 border rounded">
         <ArrowRight size={16} />
        </button>
       </nav>
      </div>
     </div>
    </section>

    {/* Fashion Collections Section */}
    <section className="py-12 bg-gray-50">
     <div className="container mx-auto px-4">
      <h2 className="text-center text-2xl font-semibold mb-8">
       SEASONAL COLLECTIONS
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
       <div className="relative group overflow-hidden h-96">
        <img
         src="/api/placeholder/600/900"
         alt="Women's Collection"
         className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
         <div className="text-center text-white p-6">
          <h3 className="text-2xl font-semibold mb-2">Women's Collection</h3>
          <button className="mt-4 px-6 py-2 bg-white text-gray-900 hover:bg-gray-200 transition duration-200">
           Shop Now
          </button>
         </div>
        </div>
       </div>

       <div className="relative group overflow-hidden h-96">
        <img
         src="/api/placeholder/600/900"
         alt="Men's Collection"
         className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
         <div className="text-center text-white p-6">
          <h3 className="text-2xl font-semibold mb-2">Men's Collection</h3>
          <button className="mt-4 px-6 py-2 bg-white text-gray-900 hover:bg-gray-200 transition duration-200">
           Shop Now
          </button>
         </div>
        </div>
       </div>

       <div className="relative group overflow-hidden h-96">
        <img
         src="/api/placeholder/600/900"
         alt="Accessories"
         className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
         <div className="text-center text-white p-6">
          <h3 className="text-2xl font-semibold mb-2">Accessories</h3>
          <button className="mt-4 px-6 py-2 bg-white text-gray-900 hover:bg-gray-200 transition duration-200">
           Shop Now
          </button>
         </div>
        </div>
       </div>

       <div className="relative group overflow-hidden h-96">
        <img
         src="/api/placeholder/600/900"
         alt="New Arrivals"
         className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
         <div className="text-center text-white p-6">
          <h3 className="text-2xl font-semibold mb-2">New Arrivals</h3>
          <button className="mt-4 px-6 py-2 bg-white text-gray-900 hover:bg-gray-200 transition duration-200">
           Shop Now
          </button>
         </div>
        </div>
       </div>
      </div>
     </div>
    </section>

    {/* Featured Products */}
    <section className="py-12">
     <div className="container mx-auto px-4">
      <h2 className="text-center text-2xl font-semibold mb-8">
       FEATURED PRODUCTS
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
       {products.slice(0, 4).map((product) => (
        <div key={product.id} className="group">
         <div className="relative overflow-hidden mb-4">
          <img
           src={product.image}
           alt={product.name}
           className="w-full aspect-square object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
           <button className="px-4 py-2 bg-white text-gray-900 hover:bg-gray-200 transition duration-200 mx-2">
            Add to Cart
           </button>
          </div>
         </div>
         <h3 className="text-sm">{product.name}</h3>
         <p className="text-sm text-gray-500">{product.category}</p>
         <p className="font-medium">
          {product.currency} {product.price.toFixed(2)}
         </p>
        </div>
       ))}
      </div>
     </div>
    </section>
   </main>

   {/* Footer */}
   <footer className="bg-gray-900 text-white py-12">
    <div className="container mx-auto px-4">
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div>
       <h3 className="text-xl font-semibold mb-4">Bekuari</h3>
       <p className="text-gray-400 mb-4">
        Discover our exclusive collections of jewelry and accessories designed
        for the modern woman.
       </p>
       <div className="flex space-x-4">
        <a href="#" className="text-gray-400 hover:text-white">
         <span className="sr-only">Facebook</span>
         <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
         </svg>
        </a>
        <a href="#" className="text-gray-400 hover:text-white">
         <span className="sr-only">Instagram</span>
         <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
         </svg>
        </a>
        <a href="#" className="text-gray-400 hover:text-white">
         <span className="sr-only">Twitter</span>
         <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
         </svg>
        </a>
       </div>
      </div>

      <div>
       <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
       <ul className="space-y-2">
        <li>
         <a href="#" className="text-gray-400 hover:text-white">
          Home
         </a>
        </li>
        <li>
         <a href="#" className="text-gray-400 hover:text-white">
          Shop
         </a>
        </li>
        <li>
         <a href="#" className="text-gray-400 hover:text-white">
          About Us
         </a>
        </li>
        <li>
         <a href="#" className="text-gray-400 hover:text-white">
          Contact
         </a>
        </li>
        <li>
         <a href="#" className="text-gray-400 hover:text-white">
          FAQs
         </a>
        </li>
       </ul>
      </div>

      <div>
       <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
       <ul className="space-y-2">
        <li>
         <a href="#" className="text-gray-400 hover:text-white">
          Shipping Policy
         </a>
        </li>
        <li>
         <a href="#" className="text-gray-400 hover:text-white">
          Returns & Refunds
         </a>
        </li>
        <li>
         <a href="#" className="text-gray-400 hover:text-white">
          Privacy Policy
         </a>
        </li>
        <li>
         <a href="#" className="text-gray-400 hover:text-white">
          Terms & Conditions
         </a>
        </li>
        <li>
         <a href="#" className="text-gray-400 hover:text-white">
          Track Order
         </a>
        </li>
       </ul>
      </div>

      <div>
       <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
       <p className="text-gray-400 mb-4">
        Subscribe to our newsletter for the latest updates and exclusive offers.
       </p>
       <form className="flex">
        <input
         type="email"
         placeholder="Your email"
         className="px-4 py-2 w-full text-gray-900 focus:outline-none"
        />
        <button
         type="submit"
         className="bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition duration-200"
        >
         Subscribe
        </button>
       </form>
      </div>
     </div>

     <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
      <p className="text-gray-400">© 2025 Bekuari. All rights reserved.</p>
      <div className="flex space-x-4 mt-4 md:mt-0">
       <img src="/api/placeholder/40/24" alt="Payment Method" className="h-6" />
       <img src="/api/placeholder/40/24" alt="Payment Method" className="h-6" />
       <img src="/api/placeholder/40/24" alt="Payment Method" className="h-6" />
       <img src="/api/placeholder/40/24" alt="Payment Method" className="h-6" />
      </div>
     </div>
    </div>
   </footer>
  </div>
 );
}
