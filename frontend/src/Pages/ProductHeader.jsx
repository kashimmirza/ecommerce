/** @format */

import React, { useState } from "react";
import {
 AppBar,
 Toolbar,
 Typography,
 Box,
 IconButton,
 Badge,
 InputBase,
 Drawer,
 List,
 ListItem,
 ListItemText,
 ListItemIcon,
 Collapse,
 Divider,
 Container,
} from "@mui/material";
import {
 Menu as MenuIcon,
 Search as SearchIcon,
 ShoppingCart as ShoppingCartIcon,
 Favorite as FavoriteIcon,
 Person as PersonIcon,
 ExpandMore as ExpandMoreIcon,
 ExpandLess as ExpandLessIcon,
 Home as HomeIcon,
 Category as CategoryIcon,
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";

// Styled search bar
const Search = styled("div")(({ theme }) => ({
 position: "relative",
 borderRadius: theme.shape.borderRadius,
 backgroundColor: alpha(theme.palette.common.white, 0.15),
 "&:hover": {
  backgroundColor: alpha(theme.palette.common.white, 0.25),
 },
 marginRight: theme.spacing(2),
 marginLeft: 0,
 width: "100%",
 [theme.breakpoints.up("sm")]: {
  marginLeft: theme.spacing(3),
  width: "auto",
 },
 border: "1px solid #e0e0e0",
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

// Categories for the drawer
const categories = [
 {
  name: "Men",
  subcategories: ["T-Shirts", "Shirts", "Polo Shirts", "Pants", "Jeans"],
 },
 {
  name: "Women",
  subcategories: ["Dresses", "Tops", "Skirts", "Pants", "Accessories"],
 },
 {
  name: "Kids",
  subcategories: ["Boys", "Girls", "Infants", "Accessories"],
 },
 {
  name: "Accessories",
  subcategories: ["Watches", "Bags", "Sunglasses", "Belts"],
 },
];

const ProductHeader = () => {
 const [drawerOpen, setDrawerOpen] = useState(false);
 const [expandedCategories, setExpandedCategories] = useState({});

 const toggleDrawer = (open) => (event) => {
  if (
   event.type === "keydown" &&
   (event.key === "Tab" || event.key === "Shift")
  ) {
   return;
  }
  setDrawerOpen(open);
 };

 const toggleCategory = (category) => {
  setExpandedCategories((prev) => ({
   ...prev,
   [category]: !prev[category],
  }));
 };

 return (
  <>
   <AppBar
    position="static"
    color="default"
    elevation={0}
    sx={{ borderBottom: "1px solid #e0e0e0" }}
   >
    <Container maxWidth="lg">
     <Toolbar disableGutters>
      <IconButton
       edge="start"
       color="inherit"
       aria-label="menu"
       sx={{ mr: 2, display: { xs: "block", md: "none" } }}
       onClick={toggleDrawer(true)}
      >
       <MenuIcon />
      </IconButton>

      <Typography
       variant="h6"
       noWrap
       component="div"
       sx={{ display: { xs: "none", sm: "block" }, fontWeight: "bold" }}
      >
       BRAND LOGO
      </Typography>

      <Search
       sx={{
        flexGrow: 1,
        maxWidth: { xs: "100%", sm: 400 },
        mx: { xs: 1, md: 2 },
       }}
      >
       <SearchIconWrapper>
        <SearchIcon />
       </SearchIconWrapper>
       <StyledInputBase
        placeholder="Search products…"
        inputProps={{ "aria-label": "search" }}
       />
      </Search>

      <Box sx={{ display: { xs: "none", md: "flex" }, ml: "auto" }}>
       <IconButton color="inherit">
        <Badge badgeContent={0} color="error">
         <FavoriteIcon />
        </Badge>
       </IconButton>
       <IconButton color="inherit">
        <Badge badgeContent={1} color="error">
         <ShoppingCartIcon />
        </Badge>
       </IconButton>
       <IconButton color="inherit">
        <PersonIcon />
       </IconButton>
      </Box>

      <Box sx={{ display: { xs: "flex", md: "none" }, ml: "auto" }}>
       <IconButton color="inherit">
        <Badge badgeContent={1} color="error">
         <ShoppingCartIcon />
        </Badge>
       </IconButton>
      </Box>
     </Toolbar>
    </Container>
   </AppBar>

   {/* Category Navigation */}
   <Box
    sx={{
     display: { xs: "none", md: "block" },
     borderBottom: "1px solid #e0e0e0",
    }}
   >
    <Container maxWidth="lg">
     <Box component="nav" sx={{ display: "flex", py: 1 }}>
      {categories.map((category) => (
       <Typography
        key={category.name}
        variant="body2"
        sx={{
         mr: 4,
         py: 1,
         cursor: "pointer",
         "&:hover": { color: "primary.main" },
         position: "relative",
        }}
       >
        {category.name}
       </Typography>
      ))}
     </Box>
    </Container>
   </Box>

   {/* Navigation Drawer */}
   <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
    <Box
     sx={{ width: 280 }}
     role="presentation"
     onKeyDown={toggleDrawer(false)}
    >
     <List>
      <ListItem button>
       <ListItemIcon>
        <HomeIcon />
       </ListItemIcon>
       <ListItemText primary="Home" />
      </ListItem>
      <Divider />

      {categories.map((category) => (
       <React.Fragment key={category.name}>
        <ListItem button onClick={() => toggleCategory(category.name)}>
         <ListItemIcon>
          <CategoryIcon />
         </ListItemIcon>
         <ListItemText primary={category.name} />
         {expandedCategories[category.name] ? (
          <ExpandLessIcon />
         ) : (
          <ExpandMoreIcon />
         )}
        </ListItem>
        <Collapse
         in={expandedCategories[category.name]}
         timeout="auto"
         unmountOnExit
        >
         <List component="div" disablePadding>
          {category.subcategories.map((subCategory) => (
           <ListItem key={subCategory} button sx={{ pl: 4 }}>
            <ListItemText primary={subCategory} />
           </ListItem>
          ))}
         </List>
        </Collapse>
       </React.Fragment>
      ))}
     </List>
    </Box>
   </Drawer>
  </>
 );
};

export default ProductHeader;
