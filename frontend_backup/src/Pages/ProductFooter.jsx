/** @format */

import React from "react";
import {
 Box,
 Container,
 Grid,
 Typography,
 Link,
 Divider,
 TextField,
 Button,
 IconButton,
} from "@mui/material";
import {
 Facebook as FacebookIcon,
 Instagram as InstagramIcon,
 Twitter as TwitterIcon,
 YouTube as YouTubeIcon,
 Email as EmailIcon,
 Phone as PhoneIcon,
 LocationOn as LocationIcon,
} from "@mui/icons-material";

const footerLinks = [
 {
  title: "Information",
  links: [
   "About Us",
   "Delivery Information",
   "Privacy Policy",
   "Terms & Conditions",
   "Contact Us",
  ],
 },
 {
  title: "Customer Service",
  links: ["My Account", "Order History", "Wish List", "Newsletter", "Returns"],
 },
 {
  title: "Extras",
  links: ["Brands", "Gift Certificates", "Affiliate", "Specials", "Site Map"],
 },
];

const ProductFooter = () => {
 return (
  <Box sx={{ bgcolor: "#f5f5f5", pt: 6, pb: 3, mt: 8 }}>
   <Container maxWidth="lg">
    <Grid container spacing={4}>
     {/* Company Info */}
     <Grid item xs={12} md={4}>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
       BRAND LOGO
      </Typography>
      <Typography variant="body2" paragraph>
       We offer premium quality clothing and accessories for men, women, and
       kids. Our products are made from the finest materials with attention to
       detail and craftsmanship.
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
       <LocationIcon fontSize="small" sx={{ mr: 1 }} />
       <Typography variant="body2">
        123 Fashion Street, Dhaka, Bangladesh
       </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
       <PhoneIcon fontSize="small" sx={{ mr: 1 }} />
       <Typography variant="body2">+880 1713299754</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
       <EmailIcon fontSize="small" sx={{ mr: 1 }} />
       <Typography variant="body2">info@brandshop.com</Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
       <IconButton
        size="small"
        sx={{
         bgcolor: "#3b5998",
         color: "white",
         "&:hover": { bgcolor: "#344e86" },
        }}
       >
        <FacebookIcon fontSize="small" />
       </IconButton>
       <IconButton
        size="small"
        sx={{
         bgcolor: "#1da1f2",
         color: "white",
         "&:hover": { bgcolor: "#0d95e8" },
        }}
       >
        <TwitterIcon fontSize="small" />
       </IconButton>
       <IconButton
        size="small"
        sx={{
         bgcolor: "#c32aa3",
         color: "white",
         "&:hover": { bgcolor: "#b02592" },
        }}
       >
        <InstagramIcon fontSize="small" />
       </IconButton>
       <IconButton
        size="small"
        sx={{
         bgcolor: "#ff0000",
         color: "white",
         "&:hover": { bgcolor: "#e50000" },
        }}
       >
        <YouTubeIcon fontSize="small" />
       </IconButton>
      </Box>
     </Grid>

     {/* Footer Links */}
     {footerLinks.map((section) => (
      <Grid item xs={12} sm={4} md={2} key={section.title}>
       <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
        {section.title}
       </Typography>
       <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
        {section.links.map((link) => (
         <Box component="li" sx={{ mb: 1 }} key={link}>
          <Link href="#" underline="hover" color="inherit" variant="body2">
           {link}
          </Link>
         </Box>
        ))}
       </Box>
      </Grid>
     ))}

     {/* Newsletter */}
     <Grid item xs={12} sm={8} md={4}>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
       Newsletter
      </Typography>
      <Typography variant="body2" paragraph>
       Subscribe to our newsletter and get 10% off your first purchase
      </Typography>
      <Box sx={{ display: "flex" }}>
       <TextField
        variant="outlined"
        placeholder="Your Email"
        size="small"
        fullWidth
        sx={{ bgcolor: "white" }}
       />
       <Button variant="contained" color="primary" sx={{ ml: 1 }}>
        Subscribe
       </Button>
      </Box>
     </Grid>
    </Grid>

    <Divider sx={{ my: 4 }} />

    <Box
     sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}
    >
     <Typography variant="body2" color="text.secondary">
      © {new Date().getFullYear()} Brand Shop. All Rights Reserved.
     </Typography>
     <Box sx={{ display: "flex", gap: 2 }}>
      <img src="/api/placeholder/40/25" alt="Visa" />
      <img src="/api/placeholder/40/25" alt="Mastercard" />
      <img src="/api/placeholder/40/25" alt="PayPal" />
      <img src="/api/placeholder/40/25" alt="bKash" />
     </Box>
    </Box>
   </Container>
  </Box>
 );
};

export default ProductFooter;
