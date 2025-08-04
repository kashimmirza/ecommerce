/** @format */

import React, { useState } from "react";
import "../AdminComponents/Assets/theme.css";
import "../AdminComponents/Assets/base.css";
import "../styles/global.css";

//import "./SearchDrawer.css"; // Optional: Include relevant styles

const categories = [
 "All Categories",
 "Backpack",
 "Cap",
 "Casual Shirt",
 "Chino",
 "Eid F 25",
 "Elegant Kameez",
 "Elegant Panjabi",
 "Essential Kurti",
 "Essential Panjabi",
 "ETHNIC",
 "Exclusive Panjabi",
 "Exclusive Salwar Kameez",
 "Formal Premium Shirt",
 "Formal Shirt",
 "FUSION WEAR",
 "Gift Box",
 "Gift Cards",
 "Joggers",
 "Kabli",
 "Kids Panjabi",
 "MEN'S FORMAL PANT",
 "Men's Relaxed Wear",
 "Men's Waistcoat",
 "Mens Jeans",
 "Mens Shorts",
 "Pajama",
 "Pantaloon",
 "Polo Shirt",
 "T-shirt",
 "Tie",
 "Tops",
 "Winter",
 "Winter Broken",
 "Winter Sale",
 "Women's Jeans",
 "WOMEN'S ONE PCS KURTI",
 "Women's Pajama",
 "Women's Trouser",
 "womens tee",
];

const quickSearchItems = [
 "Summer collection",
 "Winter Collection",
 "Jamdani Saree",
 "Panjabi",
 "Waistcoat",
 "Shirt",
 "Men's Pant",
 "Women's Pant",
 "Tops",
 "T-Shirt",
 "Polo Shirt",
 "Kurti",
 "Kameez",
 "Blazzer",
 "Jackets",
 "Hoodie",
];

const SearchDrawer = () => {
 const [query, setQuery] = useState("");
 const [category, setCategory] = useState("*");

 const handleSubmit = (e) => {
  e.preventDefault();
  // You can handle the search logic or redirect here
  window.location.href = `/search?q=${encodeURIComponent(
   query,
  )}&product_type=${category}`;
 };

 return (
  <div
   id="t4s-search-hidden"
   className="t4s-drawer t4s-drawer__right is--inted"
   aria-hidden="false"
  >
   <div className="t4s-drawer__header">
    <span className="is--login">Search Our Site</span>
    <button
     className="t4s-drawer__close"
     aria-label="Close Search"
     onClick={() => {
      /* close logic */
     }}
    >
     <svg className="t4s-iconsvg-close" viewBox="0 0 16 14">
      <path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" />
     </svg>
    </button>
   </div>

   <form
    onSubmit={handleSubmit}
    className="t4s-mini-search__frm t4s-pr"
    role="search"
   >
    <div className="t4s-mini-search__cat">
     <select value={category} onChange={(e) => setCategory(e.target.value)}>
      {categories.map((cat, idx) => (
       <option key={idx} value={cat === "All Categories" ? "*" : cat}>
        {cat}
       </option>
      ))}
     </select>
    </div>

    <div className="t4s-mini-search__btns t4s-pr t4s-oh">
     <input
      type="hidden"
      name="resources[options][fields]"
      value="title,product_type,variants.title,vendor,variants.sku,tag"
     />
     <input
      className="t4s-mini-search__input"
      type="text"
      placeholder="Search"
      autoComplete="off"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
     />
     <input
      type="search"
      className="t4s-mini-search__input t4s-d-none"
      name="q"
      value={query}
      readOnly
     />
     <button
      type="submit"
      className="t4s-mini-search__submit t4s-btn-loading__svg"
     >
      <svg className="t4s-btn-op0" viewBox="0 0 18 19" width="16">
       <path
        fill="currentColor"
        d="M11.03 11.68A5.784 5.784 0 112.85 3.5a5.784 5.784 0 018.18 8.18zm.26 1.12a6.78 6.78 0 11.72-.7l5.4 5.4a.5.5 0 11-.71.7l-5.41-5.4z"
       />
      </svg>
      <div className="t4s-loading__spinner t4s-dn">
       <svg
        width="16"
        height="16"
        className="t4s-svg__spinner"
        viewBox="0 0 66 66"
       >
        <circle
         className="t4s-path"
         fill="none"
         strokeWidth="6"
         cx="33"
         cy="33"
         r="30"
        />
       </svg>
      </div>
     </button>
    </div>

    <div className="t4s-mini-search__keys">
     <span className="t4s-mini-search__label">Quick search:</span>
     <ul className="t4s-mini-search__listKey t4s-d-block">
      {quickSearchItems.map((item, idx) => (
       <li key={idx} className="t4s-d-inline-block">
        <a
         href={`/search/suggest?type=product&options[unavailable_products]=&options[prefix]=last&q=${encodeURIComponent(
          item,
         )}`}
        >
         {item},
        </a>
       </li>
      ))}
     </ul>
    </div>
   </form>
  </div>
 );
};

export default SearchDrawer;
