/** @format */

import React, { useState } from "react";
import {
 X,
 Minus,
 Plus,
 Edit3,
 Trash2,
 ShoppingBag,
 Truck,
 Tag,
} from "lucide-react";

// Mock cart item data
const cartItem = {
 id: 1,
 name: "3D Embroidered Cotton Kameez",
 color: "Navy",
 size: "XS",
 originalPrice: 2595.0,
 salePrice: 1557.0,
 quantity: 1,
 image: "/api/placeholder/120/150",
};

const MiniCartDrawer = () => {
 const [isOpen, setIsOpen] = useState(false);
 const [quantity, setQuantity] = useState(cartItem.quantity);
 const [cartItems, setCartItems] = useState([cartItem]); // Array to manage cart items

 const toggleDrawer = () => {
  setIsOpen(!isOpen);
 };

 const handleQuantityChange = (newQuantity) => {
  if (newQuantity >= 1) {
   setQuantity(newQuantity);
  }
 };

 const removeFromCart = (itemId) => {
  setCartItems(cartItems.filter((item) => item.id !== itemId));
  setQuantity(0);
 };

 const totalItems = cartItems.reduce(
  (total, item) => total + (item.id === cartItem.id ? quantity : item.quantity),
  0,
 );
 const subtotal = cartItems.length > 0 ? cartItem.salePrice * quantity : 0;

 return (
  <div>
   {/* Trigger Button */}
   <button
    onClick={toggleDrawer}
    className="fixed top-5 right-5 z-50 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg transition-colors"
   >
    <div className="relative">
     <ShoppingBag size={20} />
     <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
      {totalItems}
     </span>
    </div>
    Open Cart
   </button>

   {/* Overlay */}
   {isOpen && (
    <div
     className="fixed inset-0 bg-black bg-opacity-50 z-40"
     onClick={toggleDrawer}
    />
   )}

   {/* Drawer */}
   <div
    className={`fixed top-0 right-0 h-full w-96 max-w-[90vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${
     isOpen ? "translate-x-0" : "translate-x-full"
    }`}
   >
    {/* Header */}
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
     <h2 className="text-lg font-bold uppercase tracking-wide">
      Shopping Cart
     </h2>
     <button
      onClick={toggleDrawer}
      className="p-1 hover:bg-gray-100 rounded transition-colors"
     >
      <X size={20} />
     </button>
    </div>

    {/* Cart Content */}
    <div className="flex-1 flex flex-col">
     {cartItems.length === 0 ? (
      /* Empty Cart State */
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
       <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <ShoppingBag size={40} className="text-gray-400" />
       </div>
       <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Your cart is empty
       </h3>
       <p className="text-gray-600 text-center mb-6">
        You don't have any products in the cart
       </p>
       <div className="text-center">
        <p className="text-2xl font-bold text-gray-400 mb-2">0</p>
        <p className="text-sm text-gray-500">Items • Tk 0.00 BDT</p>
       </div>
       <button
        onClick={toggleDrawer}
        className="mt-8 px-6 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors"
       >
        Continue Shopping
       </button>
      </div>
     ) : (
      /* Cart Items */
      <>
       {/* Product Item */}
       <div className="p-4">
        <div className="flex gap-3">
         {/* Product Image */}
         <div className="flex-shrink-0">
          <div className="w-24 h-32 bg-gray-100 rounded overflow-hidden">
           <img
            src={cartItem.image}
            alt={cartItem.name}
            className="w-full h-full object-cover"
           />
          </div>
         </div>

         {/* Product Details */}
         <div className="flex-1 flex flex-col">
          <h3 className="font-medium text-sm leading-tight mb-2">
           {cartItem.name}
          </h3>

          <p className="text-sm text-gray-600 mb-2">
           {cartItem.color} / {cartItem.size}
          </p>

          {/* Price */}
          <div className="mb-3">
           <p className="text-sm text-gray-500 line-through">
            Tk {cartItem.originalPrice.toFixed(2)} BDT
           </p>
           <p className="text-red-600 font-bold">
            Tk {cartItem.salePrice.toFixed(2)} BDT
           </p>
          </div>

          {/* Quantity Controls and Actions */}
          <div className="flex items-center justify-between mt-auto">
           {/* Quantity Controls */}
           <div className="flex items-center border border-gray-300 rounded overflow-hidden">
            <button
             onClick={() => handleQuantityChange(quantity - 1)}
             className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
             <Minus size={14} />
            </button>
            <span className="w-10 h-8 flex items-center justify-center font-medium text-sm border-x border-gray-300">
             {quantity}
            </span>
            <button
             onClick={() => handleQuantityChange(quantity + 1)}
             className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
             <Plus size={14} />
            </button>
           </div>

           {/* Action Icons */}
           <div className="flex gap-2">
            <button className="p-1 text-gray-500 hover:text-gray-700 transition-colors">
             <Edit3 size={16} />
            </button>
            <button
             onClick={() => removeFromCart(cartItem.id)}
             className="p-1 text-gray-500 hover:text-red-600 transition-colors"
            >
             <Trash2 size={16} />
            </button>
           </div>
          </div>
         </div>
        </div>
       </div>

       {/* Service Icons */}
       <div className="flex justify-around py-4 border-t border-b border-gray-100 bg-gray-50">
        <div className="flex flex-col items-center">
         <ShoppingBag size={24} className="text-gray-600 mb-1" />
         <span className="text-xs text-gray-600">Easy Return</span>
        </div>
        <div className="flex flex-col items-center">
         <Truck size={24} className="text-gray-600 mb-1" />
         <span className="text-xs text-gray-600">Free Shipping</span>
        </div>
        <div className="flex flex-col items-center">
         <Tag size={24} className="text-gray-600 mb-1" />
         <span className="text-xs text-gray-600">Best Deals</span>
        </div>
       </div>

       {/* Footer Section */}
       <div className="mt-auto p-4">
        {/* Subtotal */}
        <div className="flex justify-between items-center mb-2">
         <span className="font-medium">Subtotal:</span>
         <span className="text-xl font-bold">Tk {subtotal.toFixed(2)} BDT</span>
        </div>

        <p className="text-xs text-gray-600 mb-4">
         Taxes and shipping calculated at checkout
        </p>

        {/* Action Buttons */}
        <div className="space-y-2 mb-4">
         <button className="w-full py-3 border border-gray-300 text-gray-800 font-medium uppercase tracking-wide hover:bg-gray-50 transition-colors rounded">
          View Cart
         </button>
         <button className="w-full py-3 bg-red-600 text-white font-bold uppercase tracking-wide hover:bg-red-700 transition-colors rounded">
          Check Out
         </button>
        </div>

        {/* Additional Info */}
        <p className="text-xs text-gray-600 text-center leading-relaxed mb-4">
         All charges are billed in BDT. While the content of your cart is
         currently displayed in , the checkout will use BDT at the most current
         exchange rate.
        </p>

        {/* Payment Icons */}
        <div className="flex justify-center gap-1 flex-wrap">
         {["COD", "VISA", "MC", "NEXUS", "bKash", "Nagad", "Rocket"].map(
          (method) => (
           <div
            key={method}
            className="w-8 h-5 bg-gray-100 border border-gray-300 rounded-sm flex items-center justify-center text-xs font-bold text-gray-600"
           >
            {method}
           </div>
          ),
         )}
        </div>
       </div>
      </>
     )}
    </div>
   </div>
  </div>
 );
};

export default MiniCartDrawer;
