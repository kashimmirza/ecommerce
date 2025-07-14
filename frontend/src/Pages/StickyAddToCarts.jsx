/** @format */

import React, { useState } from "react";
import {
 Box,
 Typography,
 Avatar,
 Select,
 MenuItem,
 Button,
 IconButton,
 TextField,
 CircularProgress,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const StickyAddToCart = () => {
 const [selectedColor, setSelectedColor] = useState("Silver");
 const [quantity, setQuantity] = useState(1);
 const [isLoading, setIsLoading] = useState(false);

 const handleColorChange = (event) => {
  setSelectedColor(event.target.value);
 };

 const handleDecrease = () => {
  setQuantity((prev) => Math.max(1, prev - 1));
 };

 const handleIncrease = () => {
  setQuantity((prev) => Math.min(35, prev + 1));
 };

 const handleAddToCart = () => {
  setIsLoading(true);
  // Simulate API call
  setTimeout(() => {
   setIsLoading(false);
   alert(`Added ${quantity} item(s) of color ${selectedColor} to cart`);
  }, 1500);
 };

 return (
  <Box
   sx={{
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    bgcolor: "#fff",
    boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
    p: 2,
    zIndex: 1000,
    flexWrap: "wrap",
    gap: 2,
   }}
  >
   {/* Product Image + Info */}
   <Box sx={{ display: "flex", alignItems: "center" }}>
    <Avatar
     src="//blucheez.fashion/cdn/shop/files/BER-019-SILV.webp?v=1742814492&width=65"
     alt="Exclusive Earring"
     variant="rounded"
     sx={{ width: 65, height: 65, mr: 2 }}
    />
    <Box>
     <Typography variant="subtitle1" fontWeight={600}>
      Exclusive Earring
     </Typography>
     <Typography variant="body2" color="text.secondary">
      Tk 1,350.00 BDT
     </Typography>
    </Box>
   </Box>

   {/* Color Selector */}
   <Select
    value={selectedColor}
    onChange={handleColorChange}
    size="small"
    sx={{ minWidth: 100 }}
   >
    <MenuItem value="Silver">Silver</MenuItem>
    {/* More variants can be added */}
   </Select>

   {/* Quantity Selector */}
   <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    <IconButton onClick={handleDecrease} size="small">
     <RemoveIcon />
    </IconButton>
    <TextField
     value={quantity}
     type="number"
     inputProps={{ min: 1, max: 35 }}
     size="small"
     sx={{ width: 50 }}
     onChange={(e) =>
      setQuantity(Math.max(1, Math.min(35, Number(e.target.value))))
     }
    />
    <IconButton onClick={handleIncrease} size="small">
     <AddIcon />
    </IconButton>
   </Box>

   {/* Add to Cart Button */}
   <Button
    variant="contained"
    color="success"
    onClick={handleAddToCart}
    disabled={isLoading}
    startIcon={
     isLoading && <CircularProgress size={16} color="inherit" thickness={5} />
    }
   >
    {isLoading ? "Adding..." : "Add to Cart"}
   </Button>
  </Box>
 );
};

export default StickyAddToCart;
