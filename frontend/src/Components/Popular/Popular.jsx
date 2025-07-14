/** @format */

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import CircularProgress from "@mui/material/CircularProgress";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";

// const Popular = () => {
//  const [products, setProducts] = useState([]);
//  const [displayedProducts, setDisplayedProducts] = useState([]);
//  const [currentPage, setCurrentPage] = useState(1);
//  const [loading, setLoading] = useState(true);
//  const [error, setError] = useState(null);
//  const itemsPerPage = 10;

//  useEffect(() => {
//   const fetchPopularProducts = async () => {
//    try {
//     setLoading(true);
//     const response = await axios.get(
//      `https://localhost:7142/api/Cart/popularItems`,
//     );

//     // Access the products array properly
//     const productsData = response.data.data; // Adjust 'data' to match the correct property
//     setProducts(productsData);
//     setDisplayedProducts(productsData.slice(0, itemsPerPage));
//    } catch (error) {
//     setError("Failed to load popular products. Please try again later.");
//     console.error("API Request Failed:", error);
//    } finally {
//     setLoading(false);
//    }
//   };

//   fetchPopularProducts();
//  }, []);

//  console.log("Products after API response:", products);

//  const handleSortByPrice = () => {
//   const sortedProducts = [...products].sort((a, b) => b.newPrice - a.newPrice);
//   setProducts(sortedProducts);
//   setDisplayedProducts(sortedProducts.slice(0, currentPage * itemsPerPage));
//  };

//  const handleLoadMore = () => {
//   const startIndex = currentPage * itemsPerPage;
//   const nextProducts = products.slice(startIndex, startIndex + itemsPerPage);
//   setDisplayedProducts((prev) => [...prev, ...nextProducts]);
//   setCurrentPage((prev) => prev + 1);
//  };

//  return (
//   <div className="popular-products">
//    {/* Sorting and Info Section */}
//    <div className="popular-sort">
//     <Typography variant="body1">
//      Showing {displayedProducts.length} of {products.length} products
//     </Typography>
//     <div className="popular-sort-btn" onClick={handleSortByPrice}>
//      Sort by Price (High to Low)
//     </div>
//    </div>

//    {/* Products Grid */}
//    <div className="popular-products-grid">
//     {loading ? (
//      <div className="loading-indicator">
//       <CircularProgress />
//      </div>
//     ) : error ? (
//      <Typography color="error">{error}</Typography>
//     ) : (
//      displayedProducts.map((product) => (
//       <div key={product.productId} className="product-item">
//        <Link
//         to={{
//          pathname: `/product/${product.productId}`,
//          state: { product },
//         }}
//        >
//         <img
//          src={product.image}
//          alt={product.name}
//          onClick={() => window.scrollTo(0, 0)}
//         />
//        </Link>
//        <p>{product.name}</p>
//        <div className="item-prices">
//         <div className="item-price-new">${product.newPrice}</div>
//         <div className="item-price-old">${product.oldPrice}</div>
//        </div>
//        <p
//         style={{
//          color: product.available ? "green" : "red",
//          fontWeight: "bold",
//         }}
//        >
//         {product.available ? "In stock" : "Out of stock"}
//        </p>
//       </div>
//      ))
//     )}
//    </div>

//    {/* Load More Button */}
//    {displayedProducts.length < products.length && (
//     <Button
//      variant="contained"
//      color="primary"
//      onClick={handleLoadMore}
//      className="load-more-button"
//     >
//      Load More
//     </Button>
//    )}
//   </div>
//  );
// };

// export default Popular;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import CircularProgress from "@mui/material/CircularProgress";
// import Typography from "@mui/material/Typography";
// import Item from "../Item/Item";
// import "./Popular.css";

// const Popular = () => {
//  const [data, setData] = useState({ men: [], women: [], kids: [] });
//  const [loading, setLoading] = useState(true);
//  const [error, setError] = useState(null);

//  useEffect(() => {
//   const fetchData = async () => {
//    try {
//     setLoading(true);
//     const response = await axios.get(
//      "https://localhost:7142/api/Cart/popularItems",
//     );
//     console.log("popular in all prorducts in popular", response.data);
//     // Categorize the response data
//     const categorizedData = {
//      men: response.data.data.filter((item) => item.category === "men"),
//      women: response.data.data.filter((item) => item.category === "women"),
//      kids: response.data.data.filter((item) => item.category === "kid"),
//     };

//     setData(categorizedData);
//    } catch (error) {
//     setError("Failed to load popular products. Please try again later.");
//     console.error("API Request Failed:", error);
//    } finally {
//     setLoading(false);
//    }
//   };

//   fetchData();
//  }, []);

//  if (loading) {
//   return (
//    <div className="loading-indicator">
//     <CircularProgress />
//    </div>
//   );
//  }

//  if (error) {
//   return <Typography color="error">{error}</Typography>;
//  }

//  return (
//   <div className="popular-section">
//    {/* Popular in Women */}
//    <div className="category-section">
//     <div className="category-title animate-title">Popular in Women</div>
//     <div className="items-grid">
//      {data.women.map((item) => (
//       <Item
//        key={item.productId}
//        id={item.productId}
//        name={item.name}
//        primaryImages={item.primaryImages || []}
//        hoverImages={item.hoverImages || []}
//        newPrice={item.newPrice}
//        oldPrice={item.oldPrice}
//        available={item.available}
//       />
//      ))}
//     </div>
//    </div>

//    {/* Popular in Kids */}
//    <div className="category-section">
//     <div className="category-title animate-title">Popular in Kids</div>
//     <div className="items-grid">
//      {data.kids.map((item) => (
//       <Item
//        key={item.productId}
//        id={item.productId}
//        name={item.name}
//        primaryImages={item.primaryImages || []}
//        newPrice={item.newPrice}
//        oldPrice={item.oldPrice}
//        available={item.available}
//       />
//      ))}
//     </div>
//    </div>

//    {/* Popular in Men */}
//    <div className="category-section">
//     <div className="category-title animate-title">Popular in Men</div>
//     <div className="items-grid">
//      {data.men.map((item) => (
//       <Item
//        key={item.productId}
//        id={item.productId}
//        name={item.name}
//        primaryImages={item.primaryImages || []}
//        newPrice={item.newPrice}
//        oldPrice={item.oldPrice}
//        available={item.available}
//       />
//      ))}
//     </div>
//    </div>
//   </div>
//  );
// };

// export default Popular;
//using hover image
import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import ProductImage from "../../Components/ProductImage"; // Assuming a ProductImages component for rendering images
import "./Popular.css";

const Popular = () => {
 const [data, setData] = useState({ men: [], women: [], kids: [] });
 const [products, setProducts] = useState([]); // Full product list
 const [displayedProducts, setDisplayedProducts] = useState([]); // Paginated product list
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 const itemsPerPage = 10; // Number of items to display per page

 useEffect(() => {
  const fetchData = async () => {
   try {
    setLoading(true);
    const response = await axios.get(
     `https://76vgxe9gag.execute-api.us-east-1.amazonaws.com/api/Cart/popularItems`,
    );
    console.log("API Response in popular:", response.data);

    // Categorize the response data
    const categorizedData = {
     men: response.data.data.filter((item) => item.category === "Men"),
     women: response.data.data.filter((item) => item.category === "women"),
     kids: response.data.data.filter((item) => item.category === "kids"),
    };

    setData(categorizedData);
    setProducts(response.data.data); // Store the full product list
    setDisplayedProducts(response.data.data.slice(0, itemsPerPage)); // Initialize displayed products
   } catch (error) {
    setError("Failed to load popular products. Please try again later.");
    console.error("API Request Failed:", error);
   } finally {
    setLoading(false);
   }
  };

  fetchData();
 }, []);

 if (loading) {
  return (
   <div className="loading-indicator">
    <CircularProgress />
   </div>
  );
 }

 if (error) {
  return <Typography color="error">{error}</Typography>;
 }

 return (
  <div className="shop-category">
   {" "}
   {/* Updated class name */}
   {/* Display Paginated Products */}
   <div className="products-container">
    {" "}
    {/* Updated class name */}
    {displayedProducts.map((product) => (
     <div key={product.productId} className="product-card">
      {" "}
      {/* Updated class name */}
      <Link
       to={{
        pathname: `/product/${product.productId}`,
        state: { product }, // Passing product object to the product page
       }}
      >
       <div className="product-image-wrapper">
        {" "}
        {/* Updated class name */}
        <ProductImage productId={product.productId} altText={product.name} />
       </div>
      </Link>
      <p className="product-name">{product.name}</p> {/* Updated class name */}
      <div className="item-prices">
       <div className="item-price-new">${product.newPrice}</div>
       <div className="item-price-old">${product.oldPrice}</div>
      </div>
      <p className={product.available ? "in-stock" : "out-of-stock"}>
       {product.available ? "In stock" : "Out of stock"}
      </p>
     </div>
    ))}
   </div>
   {/* Categories */}
   {["women", "kids", "men"].map((category) => (
    <div className="category-section" key={category}>
     <div className="category-title animate-title">
      Popular in {category.charAt(0).toUpperCase() + category.slice(1)}
     </div>
     <div className="products-container">
      {" "}
      {/* Updated class name */}
      {data[category].map((item) => {
       const primaryImage = item.primaryImages?.[0] || ""; // Access first primary image
       const hoverImage = item.hoverImages?.[0] || ""; // Access first hover image

       return (
        <div key={item.productId} className="product-card">
         {" "}
         {/* Updated class name */}
         <Link
          to={{
           pathname: `/product/${item.productId}`,
           state: { product: item }, // Pass the product object
          }}
         >
          <div className="product-image-wrapper">
           {" "}
           {/* Updated class name */}
           <img src={primaryImage} alt={item.name} />
          </div>
         </Link>
         <p className="product-name">{item.name}</p> {/* Updated class name */}
         <div className="item-prices">
          <div className="item-price-new">${item.newPrice}</div>
          <div className="item-price-old">${item.oldPrice}</div>
         </div>
         <p className={item.available ? "in-stock" : "out-of-stock"}>
          {item.available ? "In stock" : "Out of stock"}
         </p>
        </div>
       );
      })}
     </div>
    </div>
   ))}
  </div>
 );
};

export default Popular;
