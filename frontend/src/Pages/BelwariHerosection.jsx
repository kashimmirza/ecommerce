/** @format */
import "../AdminComponents/Assets/base.css";
import "../AdminComponents/Assets/button-style.css";
import "../AdminComponents/Assets/slider-settings.css";
import "../AdminComponents/Assets/custom-effect.css";
import "../AdminComponents/Assets/t4s-animation.css";
import { Box } from "@mui/material";
import "./CSS/HeroSection.css";
import "./CSS/BelwariCTASection.css";
import { Link } from "react-router-dom";
import BelwariPagefooter from "./BelwariPagefooter";
import BelowariVideoBackground from "./belowarivideobackground";

export default function BelwariHerosection() {
 return (
  <div className="cta-wrapper" style={{ position: "relative", width: "100%" }}>
   <img
    src="https://blucheez.fashion/cdn/shop/files/BRLWARI-02.webp?v=1741849833"
    alt="Banner"
    style={{
     width: "100%",
     height: "auto",
     objectFit: "cover",
     display: "block",
    }}
   />

   <Box
    className="cta-content"
    sx={{
     position: "absolute",
     top: "50%",
     left: "5%",
     transform: "translateY(-50%)",
     color: "#fff",
     zIndex: 2,
     display: "flex",
     flexDirection: "column",
     gap: 2,
     maxWidth: "90%",
    }}
   >
    {/* Logo */}
    <img
     className="belwari-logo-custom fadeInDown"
     src="https://cdn.shopify.com/s/files/1/0585/0077/6131/files/belwari_logo_white_wiith_by_blucheez.svg?v=1703754987"
     alt="Belwari Logo"
    />
    {/* Paragraph */}
    <p className="cta-text fadeIn">
     Immerse in timeless luxury
     <br />
     with elegant Jamdani sarees,
     <br />
     blending tradition and style
     <br />
     for every special occasion.
    </p>
    {/* Button */}

    {/*<a href="/productgridpage" className="cta-button fadeInUp">
     Indulge in Belwari
    </a>*/}
    {/*<Link to="/productgridpage?title=Belwari" className="cta-button fadeInUp">
     Indulge in Belwari
    </Link>*/}
    <Link
     to="/productgridpage?title=Belwari"
     className="cta-button fadeInUp"
     state={{
      footerType: "belwari",
      heroContent: {
       // <--- This is the heroContent object
       type: "video", // We want a video here
       videoUrl:
        "https://blucheez.fashion/cdn/shop/videos/c/vp/fc81ac9d289346f4b5726e3e977a8d7d/fc81ac9d289346f4b5726e3e977a8d7d.HD-1080p-3.3Mbps-44134512.mp4?v=0",
       posterUrl: "https://blucheez.fashion/cdn/shop/files/preview_images/...",
       altText: "Belwari Collection Video",
       linkUrl: "/collections/belwari",
      },
      promoText: "Exclusive offers for Belwari collection!",
     }}
    >
     Indulge in Belwari
    </Link>
   </Box>
  </div>
 );
}
