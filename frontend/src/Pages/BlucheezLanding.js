/** @format */

// BlucheezLanding.js
import React from "react";
import {
 AppBar,
 Toolbar,
 Typography,
 IconButton,
 InputBase,
 Badge,
 Menu,
 MenuItem,
 Button,
 Box,
 Grid,
 Paper,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircle from "@mui/icons-material/AccountCircle";

const Search = styled("div")(({ theme }) => ({
 position: "relative",
 borderRadius: theme.shape.borderRadius,
 backgroundColor: alpha(theme.palette.common.white, 0.15),
 "&:hover": {
  backgroundColor: alpha(theme.palette.common.white, 0.25),
 },
 marginLeft: 0,
 width: "100%",
 [theme.breakpoints.up("sm")]: {
  marginLeft: theme.spacing(1),
  width: "auto",
 },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
 padding: theme.spacing(0, 2),
 height: "100%",
 position: "absolute",
 pointerEvents: "none",
 display: "flex",
 alignItems: "center",
 justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
 color: "inherit",
 "& .MuiInputBase-input": {
  padding: theme.spacing(1, 1, 1, 0),
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  transition: theme.transitions.create("width"),
  width: "100%",
  [theme.breakpoints.up("md")]: {
   width: "20ch",
  },
 },
}));

const categories = [
 "NEW IN",
 "SUMMER",
 "BLACK",
 "Belwari",
 "MEN",
 "WOMEN",
 "ACCESSORIES",
];

const BlucheezLanding = () => {
 return (
  <Box>
   {/* Announcement Bar */}
   <Box
    sx={{
     backgroundColor: "#f1f1f1",
     display: "flex",
     justifyContent: "space-between",
     px: 2,
     py: 0.5,
    }}
   >
    <Typography variant="body2">📞 09639-333666</Typography>
    <Typography variant="body2">📧 contact@blucheez.fashion</Typography>
   </Box>

   {/* Top Bar */}
   <AppBar
    position="static"
    sx={{ backgroundColor: "#fff", color: "#000", boxShadow: "none" }}
   >
    <Toolbar sx={{ justifyContent: "space-between" }}>
     <Typography variant="h5" sx={{ fontWeight: "bold", color: "#d32f2f" }}>
      Blucheez
     </Typography>

     {/* Navigation Menu */}
     <Box sx={{ display: "flex", gap: 3 }}>
      {categories.map((cat, i) => (
       <Button
        key={i}
        sx={{ color: "#000", fontWeight: i === 0 ? "bold" : "normal" }}
       >
        {cat}{" "}
        {cat === "SUMMER" || cat === "BLACK" ? (
         <sup style={{ color: "red" }}>NEW</sup>
        ) : (
         ""
        )}
       </Button>
      ))}
     </Box>

     {/* Action Icons */}
     <Box sx={{ display: "flex", gap: 2 }}>
      <Search>
       <SearchIconWrapper>
        <SearchIcon />
       </SearchIconWrapper>
       <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
       />
      </Search>
      <IconButton>
       <AccountCircle />
      </IconButton>
      <IconButton>
       <FavoriteBorderIcon />
       <Badge badgeContent={0} color="secondary" />
      </IconButton>
      <IconButton>
       <ShoppingCartIcon />
       <Badge badgeContent={1} color="error" />
      </IconButton>
     </Box>
    </Toolbar>
   </AppBar>

   {/* Hero Banner */}
   <Paper
    sx={{
     backgroundImage:
      'url("https://blucheez.fashion/cdn/shop/collections/EID_WEV_COVER_05.03.24_ALL.webp?v=1739856805&width=1600")', // Replace with actual image
     backgroundSize: "cover",
     backgroundPosition: "center",
     height: "600px",
     color: "#fff",
     display: "flex",
     alignItems: "center",
     justifyContent: "center",
     textAlign: "center",
     px: 4,
    }}
   >
    <Box sx={{ maxWidth: "800px", color: "#000" }}>
     <Typography variant="h2" fontWeight={300} fontFamily="cursive">
      amaris
     </Typography>
     <Typography variant="h6">EID EDIT '25</Typography>
     <Typography mt={2}>
      This Eid-ul-Fitr, Amaris blends tradition with modern elegance. Featuring
      luxurious printed and intricately handworked kameez sets alongside
      elegant, finely detailed panjabis, the collection embodies the spirit of
      Ramadan. Crafted for both comfort and grandeur, each piece ensures
      effortless grace for the festive season.
     </Typography>
    </Box>
   </Paper>

   {/* Footer Section */}
   <Box textAlign="center" py={3}>
    <Typography variant="h6">EID COLLECTION | BLUCHEEZ</Typography>
   </Box>
  </Box>
 );
};

export default BlucheezLanding;
