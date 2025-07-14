/** @format */

// import React from 'react'
// import './Footer.css'
// import footer_logo from '../Assets/logo_big.png'
// import instagram_icon from '../Assets/instagram_icon.png'
// import pintester_icon from '../Assets/pintester_icon.png'
// import whatsapp_icon from '../Assets/whatsapp_icon.png'

// const Footer = () => {
//   return (
//     <div className='footer'>
//       <div className="footer-logo">
//         <img src={footer_logo} alt="" />
//         <p>SHOPPER</p>
//       </div>
//       <ul className="footer-links">
//         <li>Company</li>
//         <li>Products</li>
//         <li>Offices</li>
//         <li>About</li>
//         <li>Contact</li>
//       </ul>
//       <div className="footer-social-icon">
//         <div className="footer-icons-container">
//             <img src={instagram_icon} alt="" />
//         </div>
//         <div className="footer-icons-container">
//             <img src={pintester_icon} alt="" />
//         </div>
//         <div className="footer-icons-container">
//             <img src={whatsapp_icon} alt="" />
//         </div>
//       </div>
//       <div className="footer-copyright">
//         <hr />
//         <p>Copyright @ 2023 - All Right Reserved.</p>
//       </div>
//     </div>
//   )
// }

// export default Footer

// import React from "react";
// import {
//  Box,
//  Typography,
//  Grid,
//  Link,
//  IconButton,
//  Divider,
// } from "@mui/material";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import PinterestIcon from "@mui/icons-material/Pinterest";
// import WhatsAppIcon from "@mui/icons-material/WhatsApp";
// import footerLogo from "../Assets/logo_big.png";

// const Footer = () => {
//  return (
//   <Box
//    sx={{
//     backgroundColor: "#1a1a1a",
//     color: "#fff",
//     padding: "40px 20px",
//     mt: 5,
//     borderTop: "3px solid #ff6f61",
//    }}
//   >
//    <Grid container spacing={4}>
//     {/* Logo and About Section */}
//     <Grid item xs={12} md={4}>
//      <Box display="flex" alignItems="center" mb={2}>
//       <img
//        src={footerLogo}
//        alt="Anika Fashion House Logo"
//        style={{ width: "50px", marginRight: "10px" }}
//       />
//       <Typography variant="h6" sx={{ fontWeight: "bold", color: "#ff6f61" }}>
//        Anika Fashion House
//       </Typography>
//      </Box>
//      <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
//       Welcome to **Anika Fashion House**, a premier e-commerce platform offering
//       an exclusive collection of clothing for men, women, and kids. Explore the
//       latest trends in fashion, all from the comfort of your home. With a
//       seamless shopping experience and secure payment options, we strive to make
//       every purchase enjoyable and hassle-free. Discover quality, style, and
//       value with us!
//      </Typography>
//     </Grid>

//     {/* Quick Links */}
//     <Grid item xs={12} md={3}>
//      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
//       Quick Links
//      </Typography>
//      <Box component="ul" sx={{ padding: 0, listStyle: "none", margin: 0 }}>
//       <li>
//        <Link href="#" underline="hover" sx={{ color: "#fff" }}>
//         Company
//        </Link>
//       </li>
//       <li>
//        <Link href="#" underline="hover" sx={{ color: "#fff" }}>
//         Products
//        </Link>
//       </li>
//       <li>
//        <Link href="#" underline="hover" sx={{ color: "#fff" }}>
//         Offices
//        </Link>
//       </li>
//       <li>
//        <Link href="#" underline="hover" sx={{ color: "#fff" }}>
//         About
//        </Link>
//       </li>
//       <li>
//        <Link href="#" underline="hover" sx={{ color: "#fff" }}>
//         Contact
//        </Link>
//       </li>
//      </Box>
//     </Grid>

//     {/* Contact Section */}
//     <Grid item xs={12} md={3}>
//      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
//       Contact Us
//      </Typography>
//      <Typography variant="body2" sx={{ mb: 1 }}>
//       <strong>Phone:</strong> +1 (425) 614-5171
//      </Typography>
//      <Typography variant="body2" sx={{ mb: 1 }}>
//       <strong>Email:</strong>{" "}
//       <Link
//        href="mailto:anisaro1112@gmail.com"
//        underline="hover"
//        sx={{ color: "#ff6f61" }}
//       >
//        anisaro1112@gmail.com
//       </Link>
//      </Typography>
//      <Typography variant="body2">
//       <strong>Facebook:</strong>{" "}
//       <Link
//        href="https://www.facebook.com/Saran.Lami"
//        target="_blank"
//        underline="hover"
//        sx={{ color: "#ff6f61" }}
//       >
//        Visit our page
//       </Link>
//      </Typography>
//     </Grid>

//     {/* Social Media */}
//     <Grid item xs={12} md={2}>
//      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
//       Follow Us
//      </Typography>
//      <Box>
//       <IconButton
//        href="https://www.instagram.com"
//        target="_blank"
//        sx={{ color: "#fff", "&:hover": { color: "#ff6f61" } }}
//       >
//        <InstagramIcon />
//       </IconButton>
//       <IconButton
//        href="https://www.pinterest.com"
//        target="_blank"
//        sx={{ color: "#fff", "&:hover": { color: "#ff6f61" } }}
//       >
//        <PinterestIcon />
//       </IconButton>
//       <IconButton
//        href="https://wa.me/14256145171"
//        target="_blank"
//        sx={{ color: "#fff", "&:hover": { color: "#25D366" } }}
//       >
//        <WhatsAppIcon />
//       </IconButton>
//      </Box>
//     </Grid>
//    </Grid>

//    {/* Footer Bottom */}
//    <Divider sx={{ my: 3, backgroundColor: "#fff" }} />
//    <Typography variant="body2" align="center">
//     © 2023 Anika Fashion House. All Rights Reserved.
//    </Typography>
//   </Box>
//  );
// };

// export default Footer;
import React from "react";

const Footer = () => {
 return (
  <footer id="t4s-footer">
   <section
    id="shopify-section-footer"
    className="shopify-section t4s-section t4s-section-footer t4s_tp_cdt t4s-footer"
   >
    {/* Link to Stylesheets */}
    <link
     href="//blucheez.fashion/cdn/shop/t/142/assets/section.css?v=19467530681101428381728726942"
     rel="stylesheet"
     type="text/css"
     media="all"
    />
    <link
     href="//blucheez.fashion/cdn/shop/t/142/assets/general-block.css?v=150686520342659195481730543576"
     rel="stylesheet"
     type="text/css"
     media="all"
    />
    <link
     href="//blucheez.fashion/cdn/shop/t/142/assets/newsletter.css?v=165884532886393985211728726942"
     rel="stylesheet"
     type="text/css"
     media="all"
    />
    <link
     href="//blucheez.fashion/cdn/shop/t/142/assets/icon-social.css?v=136327891455956828311728726942"
     rel="stylesheet"
     type="text/css"
     media="all"
    />
    <link
     href="//blucheez.fashion/cdn/shop/t/142/assets/footer.css?v=182528786293904792471728726942"
     rel="stylesheet"
     type="text/css"
     media="all"
    />
    <div
     className="t4s-section-inner t4s_nt_se_footer t4s_se_footer t4s-container-fluid t4s-footer-has-border t4s-footer-border-in"
     style={{
      backgroundColor: "#f6f6f8",
      borderColor: "#e6e6e6",
      marginTop: "50px",
      marginRight: "0",
      marginBottom: "0",
      marginLeft: "0",
      paddingTop: "75px",
      paddingRight: "5%",
      paddingBottom: "75px",
      paddingLeft: "10%",
     }}
    >
     <div
      className="t4s-footer-wrap t4s-row is--footer-sticky-false is--footer-collapse-true t4s-gx-lg-30 t4s-gy-lg-30 t4s-gx-md-30 t4s-gy-md-20 t4s-gx-0 t4s-gy-20"
      style={{
       "--heading-fs": "18px",
       "--heading-fw": "400",
       "--heading-lh": "22px",
       "--heading-cl": "#222222",
       "--text-fs": "14px",
       "--text-fw": "400",
       "--text-cl": "#878787",
       "--link-cl": "#878787",
       "--link-hover-cl": "#CE3241",
       "--link-active-cl": "#222222",
       "--border-cl": "#e6e6e6",
       "--heading-mgb": "30px",
       "--heading-mgbm": "20px",
      }}
     >
      <div className="t4s-custom-col t4s-col-border-none t4s-col-item t4s-col-lg-3 t4s-col-md-6 t4s-col-12">
       <div className="t4s-col-inner">
        <div className="t4s-footer-heading">
         <h3 className="t4s-col-heading">Blucheez Outfitters</h3>
        </div>
        <div className="t4s-footer-content">
         <div className="t4s-footer-raw-html">
          <p>
           <span className="svg-icon icon-location" aria-hidden="true"></span>
           <span>
            <a href="https://blucheez.fashion/pages/blucheez-office">
             Blucheez Office
            </a>
           </span>
          </p>
          <p>
           <span className="svg-icon icon-map" aria-hidden="true"></span>
           <span>
            <a href="https://blucheez.fashion/pages/blucheez-outlets">
             Blucheez Outlets
            </a>
           </span>
          </p>
          <p>
           <span className="svg-icon icon-mail" aria-hidden="true"></span>
           <span>
            <a href="mailto:hello@blucheez.com.bd">hello@blucheez.com.bd</a>
           </span>
          </p>
          <p>
           <span className="svg-icon icon-call" aria-hidden="true"></span>
           <span>
            <a href="tel:09639-333666">09639-333666</a>
           </span>
          </p>
         </div>
        </div>
       </div>
      </div>

      {/* Quick Links */}
      <div className="t4s-custom-col t4s-col-border-none t4s-col-item t4s-col-lg-2 t4s-col-md-6 t4s-col-12">
       <div className="t4s-col-inner">
        <div className="t4s-footer-heading">
         <h3 className="t4s-col-heading">Quick Links</h3>
        </div>
        <div className="t4s-footer-content">
         <ul className="t4s-footer-linklist">
          <li>
           <a href="/pages/blucheez-club" className="t4s-footer-link">
            Blucheez Club Card
           </a>
          </li>
          <li>
           <a href="/pages/who-we-are" className="t4s-footer-link">
            Who We Are
           </a>
          </li>
          <li>
           <a href="/blogs/news" className="t4s-footer-link">
            News feed
           </a>
          </li>
          <li>
           <a href="/pages/manifesto" className="t4s-footer-link">
            Manifesto
           </a>
          </li>
          <li>
           <a
            href="https://blucheez.com.bd/pages/contact-us"
            className="t4s-footer-link"
           >
            Contact Us
           </a>
          </li>
          <li>
           <a
            href="https://blucheez.fashion/pages/blucheez-career"
            className="t4s-footer-link"
           >
            Career
           </a>
          </li>
         </ul>
        </div>
       </div>
      </div>

      {/* Policies */}
      <div className="t4s-custom-col t4s-col-border-none t4s-col-item t4s-col-lg-2 t4s-col-md-6 t4s-col-12">
       <div className="t4s-col-inner">
        <div className="t4s-footer-heading">
         <h3 className="t4s-col-heading">Policies</h3>
        </div>
        <div className="t4s-footer-content">
         <ul className="t4s-footer-linklist">
          <li>
           <a href="/pages/privacy-policy" className="t4s-footer-link">
            Privacy Policy
           </a>
          </li>
          <li>
           <a href="/pages/refund-policy" className="t4s-footer-link">
            Refund Policy
           </a>
          </li>
          <li>
           <a href="/pages/shipping-policy" className="t4s-footer-link">
            Shipping Policy
           </a>
          </li>
          <li>
           <a href="/pages/refund-policy" className="t4s-footer-link">
            Exchange Policies
           </a>
          </li>
          <li>
           <a href="/pages/terms-conditions" className="t4s-footer-link">
            Terms & Conditions
           </a>
          </li>
         </ul>
        </div>
       </div>
      </div>

      {/* Account */}
      <div className="t4s-custom-col t4s-col-border-none t4s-col-item t4s-col-lg-2 t4s-col-md-6 t4s-col-12">
       <div className="t4s-col-inner">
        <div className="t4s-footer-heading">
         <h3 className="t4s-col-heading">Account</h3>
        </div>
        <div className="t4s-footer-content">
         <ul className="t4s-footer-linklist">
          <li>
           <a
            href="https://blucheez.fashion/account"
            className="t4s-footer-link"
           >
            My Profile
           </a>
          </li>
          <li>
           <a
            href="https://blucheez.fashion/search/?view=wish"
            className="t4s-footer-link"
           >
            My Wishlist
           </a>
          </li>
         </ul>
        </div>
       </div>
      </div>
     </div>
    </div>
   </section>
  </footer>
 );
};

export default Footer;
