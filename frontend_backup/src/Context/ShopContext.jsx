/** @format */

// import React, { createContext, useState } from "react";
// import all_product from "../Components/Assets/all_product";

// export const ShopContext = createContext(null);

// const getDefaultCart = () => {
//  let cart = {};
//  for (let index = 0; index < all_product.length + 1; index++) {
//   cart[index] = 0;
//  }
//  return cart;
// };

// const ShopContextProvider = (props) => {
//  const [cartItems, setCartItems] = useState(getDefaultCart());

//  const addToCart = (itemId) => {
//   //   setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//   //   console.log(cartItems);
//   setCartItems((prev) => {
//    const updatedCart = { ...prev, [itemId]: prev[itemId] + 1 };
//    console.log(updatedCart); // Logs the updated state
//    return updatedCart;
//   });
//  };

//  const removeFromCart = (itemId) => {
//   setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//  };

//  const getTotalCartAmount = () => {
//   let totalAmount = 0;
//   for (const item in cartItems) {
//    if (cartItems[item] > 0) {
//     let itemInfo = all_product.find((product) => product.id === Number(item));
//     totalAmount += cartItems[item] * itemInfo.new_price;
//    }
//   }
//   return totalAmount;
//  };

//  const getTotalCartItems = () => {
//   let totalItem = 0;
//   for (const item in cartItems) {
//    if (cartItems[item] > 0) {
//     totalItem += cartItems[item];
//    }
//   }
//   return totalItem;
//  };

//  const contextValue = {
//   getTotalCartItems,
//   getTotalCartAmount,
//   all_product,
//   cartItems,
//   addToCart,
//   removeFromCart,
//  };
//  return (
//   <ShopContext.Provider value={contextValue}>
//    {props.children}
//   </ShopContext.Provider>
//  );
// };

// export default ShopContextProvider;

// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";

// // Create the context
// export const ShopContext = createContext(null);

// // Default cart initialization
// const getDefaultCart = (products) => {
//  let cart = {};
//  for (let index = 0; index < products.length; index++) {
//   cart[index] = 0;
//  }
//  return cart;
// };

// const ShopContextProvider = (props) => {
//  const [products, setProducts] = useState([]);
//  const [cartItems, setCartItems] = useState({});

//  // Fetch products in useEffect
//  useEffect(() => {
//   axios
//    .get(
//     //"https://ld3ujozidmopbmvu4dkft6hm3i0gpdrb.lambda-url.us-east-1.on.aws/api/Product/all",
//     "https://localhost:7142/api/Product/all",
//    )
//    .then((response) => {
//     console.log("API Response:", response.data);
//     setProducts(response.data);
//     setCartItems(getDefaultCart(response.data)); // Initialize cart with products
//    })
//    .catch((error) => {
//     console.error("Error fetching products:", error);
//    });
//  }, []);

//  console.log("shopcontext:", products);

//  const addToCart = (itemId) => {
//   setCartItems((prev) => ({
//    ...prev,
//    [itemId]: (prev[itemId] || 0) + 1,
//   }));
//  };

//  const removeFromCart = (itemId) => {
//   setCartItems((prev) => ({
//    ...prev,
//    [itemId]: prev[itemId] > 0 ? prev[itemId] - 1 : 0,
//   }));
//  };

//  const getTotalCartAmount = () => {
//   let totalAmount = 0;
//   for (const item in cartItems) {
//    if (cartItems[item] > 0) {
//     const itemInfo = products.find((product) => product.id === Number(item));
//     totalAmount += cartItems[item] * (itemInfo?.newPrice || 0);
//    }
//   }
//   return totalAmount;
//  };

//  const getTotalCartItems = () => {
//   let totalItem = 0;
//   for (const item in cartItems) {
//    totalItem += cartItems[item];
//   }
//   return totalItem;
//  };

//  const contextValue = {
//   products,
//   cartItems,
//   addToCart,
//   removeFromCart,
//   getTotalCartAmount,
//   getTotalCartItems,
//  };

//  return (
//   <ShopContext.Provider value={contextValue}>
//    {props.children}
//   </ShopContext.Provider>
//  );
// };

// export default ShopContextProvider;
//recent latest
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const ShopContext = createContext(null);

// ShopContextProvider Component
const ShopContextProvider = ({ children }) => {
 const [products, setProducts] = useState([]);
 const [cartItems, setCartItems] = useState({});

 // Fetch products with images on mount
 useEffect(() => {
  const fetchProducts = async () => {
   try {
    const response = await axios.get(
     "https://76vgxe9gag.execute-api.us-east-1.amazonaws.com/api/Product/GetProductImages",
    );
    console.log("Image API Response:", response.data);

    // Transform the response to include image bindings
    const productsWithImages = response.data.map((product) => ({
     ...product,
     images: {
      primary: product.primaryImages || [],
      hover: product.hoverImages || [],
     },
    }));

    console.log("Products with Bound Images:", productsWithImages);
    setProducts(productsWithImages);
   } catch (error) {
    console.error("Error fetching product images:", error);
   }
  };

  fetchProducts();
 }, []);

 // Add item to cart
 const addToCart = (itemId) => {
  setCartItems((prev) => ({
   ...prev,
   [itemId]: (prev[itemId] || 0) + 1,
  }));
 };

 // Remove item from cart
 const removeFromCart = (itemId) => {
  setCartItems((prev) => ({
   ...prev,
   [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
  }));
 };

 // Calculate total cart amount
 console.log("products:", products);
 const getTotalCartAmount = () => {
  return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
   const product = products.find((p) => p.productId === Number(itemId));
   return total + quantity * (product?.newPrice || 0);
  }, 0);
 };

 // Calculate total cart items
 const getTotalCartItems = () => {
  return Object.values(cartItems).reduce(
   (total, quantity) => total + quantity,
   0,
  );
 };

 // Context value
 const contextValue = {
  products,
  cartItems,
  addToCart,
  removeFromCart,
  getTotalCartAmount,
  getTotalCartItems,
 };

 return (
  <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
 );
};

export default ShopContextProvider;
