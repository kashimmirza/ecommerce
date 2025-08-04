/** @format */

import { useState } from "react";

// Arrow icon for submenus
const ArrowIcon = () => (
 <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 256 512"
  width="7"
  fill="currentColor"
 >
  <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"></path>
 </svg>
);

// Recursive SubMenu component
const SubMenu = ({ items }) => {
 return (
  <ul className="t4s-sub-menu t4s-sub-menu-2 pa op__0">
   {items.map((item, index) => (
    <li
     key={index}
     className={`t4s-menu-item ${item.children ? "has--children" : ""}`}
    >
     {item.children ? (
      <>
       <a href={item.href}>
        <span>{item.title}</span>
        <ArrowIcon />
       </a>
       <SubMenu items={item.children} />
      </>
     ) : (
      <a href={item.href}>{item.title}</a>
     )}
    </li>
   ))}
  </ul>
 );
};

// Men's Menu Component
const MensMenu = () => {
 const [isOpen, setIsOpen] = useState(false);

 const handleMouseEnter = () => {
  setIsOpen(true);
 };

 const handleMouseLeave = () => {
  setIsOpen(false);
 };

 // Men's menu data based on the provided HTML structure
 const mensMenuData = [
  {
   title: "View All",
   href: "/collections/mens-wear",
  },
  {
   title: "Panjabi",
   href: "/collections/mens-panjabi",
   children: [
    {
     title: "View All",
     href: "/collections/mens-panjabi",
    },
    {
     title: "Essential Panjabi",
     href: "/collections/essential-panjabi-collection",
    },
    {
     title: "Elegant Panjabi",
     href: "/collections/elegant-panjabi-collection",
    },
    {
     title: "Exclusive Panjabi",
     href: "/collections/exclusive-panjabi-collection",
    },
    {
     title: "Kabli",
     href: "/collections/mens-kabli-panjabi",
    },
    {
     title: "Kids Panjabi",
     href: "/collections/kids-panjabi",
    },
   ],
  },
  {
   title: "Waistcoat",
   href: "/collections/mens-waistcoats",
  },
  {
   title: "Pajama",
   href: "/collections/mens-pajama-collection",
  },
  {
   title: "Shirt",
   href: "/collections/mens-shirt",
   children: [
    {
     title: "View All",
     href: "/collections/mens-shirt",
    },
    {
     title: "Formal Shirt",
     href: "/collections/mens-formal-shirts",
    },
    {
     title: "Premium Shirt",
     href: "/collections/mens-premium-shirts",
    },
    {
     title: "Casual Shirt",
     href: "/collections/mens-casual-shirts",
    },
   ],
  },
  {
   title: "Polo Shirt",
   href: "/collections/polo-shirt",
  },
  {
   title: "T-shirt",
   href: "/collections/mens-tshirt",
  },
  {
   title: "Pants",
   href: "/collections/mens-pant",
   children: [
    {
     title: "View All",
     href: "/collections/mens-pant",
    },
    {
     title: "Formal Pant",
     href: "/collections/formal-pants",
    },
    {
     title: "Casual Pant",
     href: "/collections/casual-pants",
    },
    {
     title: "Jeans",
     href: "/collections/denim-jeans-pant",
    },
    {
     title: "Joggers & Cargo",
     href: "/collections/mens-jogger-pants",
    },
    {
     title: "Shorts",
     href: "/collections/mens-shorts-pant",
    },
    {
     title: "Relaxed Wear",
     href: "/collections/mens-relaxed-trouser",
    },
   ],
  },
  {
   title: "Blazer & Suit",
   href: "/collections/mens-blazer",
  },
  {
   title: "Winter Wear",
   href: "/collections/mens-winter-wear",
   children: [
    {
     title: "View All",
     href: "/collections/mens-winter-wear",
    },
    {
     title: "Sweatshirt & Sweater",
     href: "/collections/mens-sweatshirt-sweater",
    },
    {
     title: "Hoodie",
     href: "/collections/mens-hoodies",
    },
    {
     title: "Jacket",
     href: "/collections/mens-jackets-1",
    },
    {
     title: "Overshirt & Hooded Shirt",
     href: "/collections/overshirt",
    },
   ],
  },
  {
   title: "Plus Size",
   href: "/collections/plus-size",
   children: [
    {
     title: "View All",
     href: "/collections/plus-size",
    },
    {
     title: "Panjabi +",
     href: "/collections/extra-large-panjabi",
    },
    {
     title: "Blazer +",
     href: "/collections/mens-blazer-1",
    },
    {
     title: "Casual Shirt +",
     href: "/collections/mens-casual-shirts-1",
    },
    {
     title: "Polo Shirt +",
     href: "/collections/polo-shirt-1",
    },
    {
     title: "T-shirt +",
     href: "/collections/t-shirt-1",
    },
    {
     title: "Boxer +",
     href: "/collections/mens-boxer-1",
    },
   ],
  },
  {
   title: "Men's Accessories",
   href: "#",
   children: [
    {
     title: "Tie",
     href: "/collections/mens-tie",
    },
    {
     title: "Cap",
     href: "/collections/mens-cap",
    },
    {
     title: "Boxer",
     href: "/collections/mens-boxer",
    },
    {
     title: "Pocket Square",
     href: "/collections/pocket-square",
    },
   ],
  },
 ];

 return (
  <div className="menu-example" style={{ padding: "20px" }}>
   <link
    rel="stylesheet"
    href="//blucheez.fashion/cdn/shop/t/142/assets/t4s-submenu.css?v=177196850476384233671728726942"
    media="all"
   />

   <style>
    {`
          /* Styles for dropdown menus */
          .t4s-menu-item.has--children {
            position: relative;
          }

          .t4s-sub-menu {
            position: absolute;
            min-width: 200px;
            background: #fff;
            box-shadow: 0 1px 5px rgba(0,0,0,0.1);
            z-index: 99;
            transition: opacity 0.3s, visibility 0.3s;
            opacity: 0;
            visibility: hidden;
          }

          .t4s-menu-item:hover > .t4s-sub-menu,
          .t4s-menu-item.is--hover > .t4s-sub-menu {
            opacity: 1 !important;
            visibility: visible !important;
            pointer-events: auto !important;
          }

          .t4s-sub-menu .t4s-menu-item {
            display: block;
            width: 100%;
          }

          .t4s-sub-menu .t4s-menu-item a {
            display: flex;
            padding: 8px 15px;
            justify-content: space-between;
            align-items: center;
            text-decoration: none;
            color: #333;
          }

          .t4s-sub-menu .t4s-menu-item a:hover {
            background-color: #f5f5f5;
          }
          
          .t4s-sub-menu-2 {
            left: 100%;
            top: 0;
          }

          /* Fix for nested menus */
          .t4s-lazy_menu {
            background: #fff;
            padding: 10px 0;
            min-width: 200px;
          }

          .t4s-lazy_menu .t4s-menu-item {
            position: relative;
          }
          
          /* Main menu styling */
          .t4s-menu-ul {
            display: flex;
            list-style: none;
            padding: 0;
            margin: 0;
          }
          
          .t4s-menu-ul > li {
            margin-right: 20px;
          }
          
          .t4s-menu-ul > li > a {
            text-decoration: none;
            color: #333;
            font-weight: 500;
            display: block;
            padding: 10px 0;
          }
        `}
   </style>

   <ul className="t4s-menu-ul">
    <li
     id="item_drop_gmEV6R"
     data-placement="bottom"
     className={`t4s-type__drop t4s-menu-item has--children menu-has__offsets menu-pos__left ${
      isOpen ? "is--hover" : "is-action__hover"
     }`}
     onMouseEnter={handleMouseEnter}
     onMouseLeave={handleMouseLeave}
    >
     <a
      className="t4s-lh-1 t4s-d-flex t4s-align-items-center t4s-pr"
      href="/"
      target="_self"
     >
      MEN
     </a>

     {isOpen && (
      <div
       id="content_drop_gmEV6R"
       className="t4s-sub-menu t4s-pa t4s-pe-none"
       style={{ left: "0", top: "100%" }}
      >
       <div className="t4s-lazy_menu" data-handle="mens-clothing">
        {mensMenuData.map((item, index) => (
         <div
          key={index}
          className={`t4s-menu-item ${item.children ? "has--children" : ""}`}
         >
          {item.children ? (
           <>
            <a href={item.href}>
             <span>{item.title}</span>
             <ArrowIcon />
            </a>
            <SubMenu items={item.children} />
           </>
          ) : (
           <a href={item.href}>{item.title}</a>
          )}
         </div>
        ))}
       </div>
      </div>
     )}
    </li>
   </ul>
  </div>
 );
};

export default MensMenu;
