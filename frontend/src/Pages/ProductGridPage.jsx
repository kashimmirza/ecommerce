/** @format */
import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import {
 Box,
 Button,
 Grid,
 IconButton,
 Typography,
 Tooltip,
 styled,
 LinearProgress,
 Drawer,
 FormGroup,
 FormControlLabel,
 Checkbox,
 MenuItem,
 Snackbar, // Import Snackbar for messages
 Alert, // Import Alert for Snackbar content
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "@mui/material/Slider";
import "../AdminComponents/Assets/base.css";
import "../styles/global.css";
import BelwariPagefooter from "./BelwariPagefooter";
import BackgroundVideoSection from "./BackgroundVideoSection";
import axios from "axios";
import DefaultFooter from "../Components/Footer/Footer";
import DefaultHeroVideo from "./BackgroundVideoSection";
import ImageBanner from "../Components/HeroContent/ImageBanner";

// Styled components (retained for styling)
const LayoutSwitch = styled(Box)(({ theme }) => ({
 display: "flex",
 gap: theme.spacing(0.5),
}));

const LayoutButton = styled(IconButton)(({ theme, active }) => ({
 padding: theme.spacing(0.5),
 border: `1px solid ${theme.palette.divider}`,
 backgroundColor: active ? theme.palette.action.selected : "transparent",
 "&:hover": {
  backgroundColor: theme.palette.action.hover,
 },
}));

const ProductItem = styled(Box)(({ theme }) => ({
 position: "relative",
 border: `1px solid ${theme.palette.divider}`,
 borderRadius: theme.shape.borderRadius,
 overflow: "hidden",
 cursor: "pointer", // Indicate clickability
}));

const ProductImageWrapper = styled(Box)({
 position: "relative",
 width: "100%",
 aspectRatio: "2/3", // Based on the data-style attribute
 overflow: "hidden",
});

const ProductImage = styled("img")({
 width: "100%",
 height: "100%",
 objectFit: "cover",
 transition: "opacity 0.3s ease-in-out",
});

const ProductHoverImage = styled("img")({
 position: "absolute",
 top: 0,
 left: 0,
 width: "100%",
 height: "100%",
 objectFit: "cover",
 opacity: 0,
 transition: "opacity 0.3s ease-in-out",
 "&:hover": {
  opacity: 1,
 },
});

const ProductInfo = styled(Box)(({ theme }) => ({
 padding: theme.spacing(1.5),
}));

const ProductTitle = styled(Typography)(({ theme }) => ({
 fontWeight: theme.typography.fontWeightMedium,
 marginBottom: theme.spacing(0.5),
}));

const ProductPrice = styled(Typography)(({ theme }) => ({
 color: theme.palette.primary.main,
 fontWeight: theme.typography.fontWeightBold,
 marginBottom: theme.spacing(1),
}));

const ProductActions = styled(Box)(({ theme }) => ({
 display: "flex",
 gap: theme.spacing(0.5),
 marginTop: theme.spacing(1),
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
 padding: theme.spacing(0.75),
 border: `1px solid ${theme.palette.divider}`,
 borderRadius: theme.shape.borderRadius,
 "&:hover": {
  backgroundColor: theme.palette.action.hover,
 },
}));

const DropdownButton = styled(Button)(({ theme }) => ({
 display: "flex",
 alignItems: "center",
 gap: theme.spacing(0.5),
 padding: theme.spacing(1),
 border: `1px solid ${theme.palette.divider}`,
 borderRadius: theme.shape.borderRadius,
}));

const DropdownMenu = styled(Box)(({ theme }) => ({
 position: "absolute",
 top: "100%",
 right: 0,
 zIndex: 1,
 backgroundColor: theme.palette.background.paper,
 border: `1px solid ${theme.palette.divider}`,
 borderRadius: theme.shape.borderRadius,
 marginTop: theme.spacing(0.5),
 minWidth: "100%",
 boxShadow: theme.shadows[2],
}));

const DropdownMenuItem = styled(MenuItem)(({ theme }) => ({
 padding: theme.spacing(1.5),
 "&:hover": {
  backgroundColor: theme.palette.action.hover,
 },
}));

const LoadMoreWrapper = styled(Box)(({ theme }) => ({
 textAlign: "center",
 padding: theme.spacing(2),
}));

const LoadMoreBar = styled(Box)(({ theme }) => ({
 backgroundColor: theme.palette.grey[300],
 borderRadius: theme.shape.borderRadius,
 padding: theme.spacing(1),
 marginBottom: theme.spacing(1),
}));

const LoadMoreProgressBar = styled(Box)(({ theme }) => ({
 backgroundColor: theme.palette.primary.main,
 borderRadius: theme.shape.borderRadius,
 height: "100%",
}));

const LoadMoreButton = styled(Button)(({ theme }) => ({
 padding: theme.spacing(1.5, 3),
 borderRadius: theme.shape.borderRadius,
 fontWeight: theme.typography.fontWeightMedium,
 "&:hover": {},
}));

const LoadingSpinner = styled(Box)(({ theme }) => ({
 display: "inline-flex",
 alignItems: "center",
 justifyContent: "center",
 marginLeft: theme.spacing(1),
}));

const FilterDrawerHeader = styled(Box)(({ theme }) => ({
 display: "flex",
 justifyContent: "space-between",
 alignItems: "center",
 padding: theme.spacing(2),
 borderBottom: `1px solid ${theme.palette.divider}`,
}));

const FilterDrawerContent = styled(Box)(({ theme }) => ({
 padding: theme.spacing(2),
 display: "flex",
 flexDirection: "column",
 gap: theme.spacing(2),
}));

const FilterGroup = styled(Box)(({ theme }) => ({
 marginBottom: theme.spacing(2),
}));

const FilterTitle = styled(Typography)(({ theme }) => ({
 fontWeight: theme.typography.fontWeightMedium,
 marginBottom: theme.spacing(1),
}));

const ColorBox = styled(Box)(({ theme, color }) => ({
 width: 16,
 height: 16,
 borderRadius: "50%",
 backgroundColor: color,
 border: `1px solid ${theme.palette.divider}`,
 marginRight: theme.spacing(0.5),
}));

const StockStatusNote = styled(Box)(({ theme, isInStock }) => ({
 position: "absolute",
 top: theme.spacing(1),
 left: theme.spacing(1),
 backgroundColor: isInStock ? "rgba(0, 128, 0, 0.8)" : "rgba(255, 0, 0, 0.8)",
 color: theme.palette.common.white,
 padding: theme.spacing(0.5, 1),
 borderRadius: theme.shape.borderRadius,
 fontSize: theme.typography.caption.fontSize,
 fontWeight: theme.typography.fontWeightMedium,
 zIndex: 1,
}));

function valuetext(value) {
 return `Tk ${value}`;
}

function ProductGridPage(props) {
 const location = useLocation();
 const navigate = useNavigate(); // Initialize useNavigate
 const {
  footerType, // Will be "belwari" or undefined
  heroVideoType, // Will be "belwari" or undefined
  promoText,
  heroContent,
 } = location.state || {}; // Added || {} for safety

 const [layout, setLayout] = useState("grid");
 const [gridColumns, setGridColumns] = useState(5);
 const [sortBy, setSortBy] = useState("created-descending");
 const [isSortByOpen, setIsSortByOpen] = useState(false);
 const [isFilterOpen, setIsFilterOpen] = useState(false);
 const [allProducts, setAllProducts] = useState([]); // Store all fetched products
 const [filteredProducts, setFilteredProducts] = useState([]); // Products to display after filtering
 const [viewedProductsCount, setViewedProductsCount] = useState(20);
 const [totalProductsCount, setTotalProductsCount] = useState(0); // Initialize to 0
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const [nextPageUrl] = useState(null); // You might need to handle pagination from the API
 const [priceRange, setPriceRange] = useState([0, 0]); // Initialize with actual min/max
 const [selectedColors, setSelectedColors] = useState([]);
 const [selectedAvailability, setSelectedAvailability] = useState([]);
 const [uniqueColors, setUniqueColors] = useState([]);
 const [priceBounds, setPriceBounds] = useState({ min: 0, max: 0 });

 // State for Snackbar messages
 const [snackbarOpen, setSnackbarOpen] = useState(false);
 const [snackbarMessage, setSnackbarMessage] = useState("");
 const [snackbarSeverity, setSnackbarSeverity] = useState("info"); // 'success', 'error', 'warning', 'info'
 const [preOrderProductId, setPreOrderProductId] = useState(null); // To store product ID for pre-order prompt

 const queryParams = new URLSearchParams(location.search);
 const initialKeyword = queryParams.get("keyword") || ""; // From BlucheezHeader
 const initialCategoryFromUrl = queryParams.get("category") || ""; // From BlucheezHeader
 const initialTitleFromUrl = queryParams.get("title") || ""; // From other pages

 const [currentFilterTerm, setCurrentFilterTerm] = useState(
  initialKeyword || initialTitleFromUrl,
 );
 const [currentCategoryFilter, setCurrentCategoryFilter] = useState(
  initialCategoryFromUrl,
 );

 useEffect(() => {
  const newQueryParams = new URLSearchParams(location.search);
  const newKeyword = newQueryParams.get("keyword") || "";
  const newTitle = newQueryParams.get("title") || "";
  const newCategory = newQueryParams.get("category") || "";
  setCurrentFilterTerm(newKeyword || newTitle);
  setCurrentCategoryFilter(newCategory);
 }, [location.search]);

 let HeroComponentToRender = null;
 console.log("herocontent:", heroContent);
 if (heroContent) {
  if (heroContent.type === "video") {
   console.log("Video URL:", heroContent.videoUrl);
   console.log("hey i am here for video rendering");
   HeroComponentToRender = (
    <BackgroundVideoSection
     videoUrl={heroContent.videoUrl}
     posterUrl={heroContent.posterUrl}
     altText={heroContent.altText}
     linkUrl={heroContent.linkUrl}
    />
   );
  } else if (heroContent.type === "image") {
   HeroComponentToRender = (
    <ImageBanner
     imageUrl={heroContent.imageUrl}
     altText={heroContent.altText}
     linkUrl={heroContent.linkUrl}
    />
   );
  } else {
   HeroComponentToRender = <DefaultHeroVideo />;
  }
 }
 const isBelwariPage =
  currentFilterTerm && currentFilterTerm.toLowerCase() === "belwari";

 let CurrentFooterComponent = DefaultFooter; // Default
 if (footerType === "belwari") {
  CurrentFooterComponent = BelwariPagefooter;
 }

 useEffect(() => {
  const fetchProducts = async () => {
   setLoading(true);
   setError(null);
   try {
    const response = await axios.get(
     "https://localhost:7142/api/Product/GetProductImages",
    );

    setAllProducts(response.data);
    console.log("response data:", response.data);
    console.log("all products:", allProducts);
    setTotalProductsCount(response.data.length); // Set total count
    setLoading(false);
   } catch (err) {
    setError(err.message);
    setLoading(false);
   }
  };

  fetchProducts();
 }, []);

 useEffect(() => {
  console.log("all products updated:", allProducts);
 }, [allProducts]);

 useEffect(() => {
  if (allProducts.length > 0) {
   const colors = [
    ...new Set(allProducts.map((product) => product.color).filter(Boolean)),
   ].sort();
   setUniqueColors(colors);

   const prices = allProducts.map((product) => product.newPrice);
   const minPrice = Math.min(...prices);
   const maxPrice = Math.max(...prices);
   setPriceBounds({ min: minPrice, max: maxPrice });
   setPriceRange([minPrice, maxPrice]); // Initialize price range
  }
 }, [allProducts]);

 // UPDATED FILTERING LOGIC FOR PRODUCTGRIDPAGE
 useEffect(() => {
  let filtered = [...allProducts];
  console.log("all filtered product", filtered);

  // Priority 1: URL keyword parameter (from menu navigation)
  if (currentFilterTerm) {
   filtered = filtered.filter((product) => {
    const searchTerm = currentFilterTerm.toLowerCase();

    return (
     (product.title && product.title.toLowerCase().includes(searchTerm)) ||
     (product.category &&
      product.category.toLowerCase().includes(searchTerm)) ||
     (product.handle && product.handle.toLowerCase().includes(searchTerm)) ||
     (product.tags && product.tags.toLowerCase().includes(searchTerm))
    );
   });
  }

  // Priority 2: URL category parameter (for more specific filtering)
  if (currentCategoryFilter && currentCategoryFilter !== currentFilterTerm) {
   filtered = filtered.filter((product) => {
    const categoryTerm = currentCategoryFilter.toLowerCase();

    return (
     (product.category &&
      product.category.toLowerCase().includes(categoryTerm)) ||
     (product.title && product.title.toLowerCase().includes(categoryTerm))
    );
   });
  }

  // Priority 3: Props-based filtering (fallback)
  if (!currentFilterTerm && !currentCategoryFilter) {
   if (props.title) {
    filtered = filtered.filter(
     (product) =>
      product.title &&
      product.title.toLowerCase().includes(props.title.toLowerCase()),
    );
   }

   if (props.category) {
    filtered = filtered.filter(
     (product) =>
      product.category &&
      product.category.toLowerCase().includes(props.category.toLowerCase()),
    );
   }
  }

  // Filter by price
  filtered = filtered.filter(
   (product) =>
    product.newPrice >= priceRange[0] && product.newPrice <= priceRange[1],
  );

  // Filter by color
  if (selectedColors.length > 0) {
   filtered = filtered.filter((product) =>
    selectedColors.includes(product.color),
   );
  }

  // Filter by availability (Is_In_Stock is a string)
  if (selectedAvailability.length > 0) {
   filtered = filtered.filter((product) => {
    const isInStock =
     product.is_In_Stock && product.is_In_Stock.toLowerCase() === "yes";
    return selectedAvailability.includes(isInStock);
   });
  }

  setFilteredProducts(filtered);
  setViewedProductsCount(Math.min(20, filtered.length)); // Reset viewed count on filter
 }, [
  allProducts,
  currentFilterTerm,
  currentCategoryFilter,
  props.title,
  props.category,
  priceRange,
  selectedColors,
  selectedAvailability,
 ]);

 const handleLayoutChange = (newLayout, columns) => {
  setLayout(newLayout);
  setGridColumns(columns);
 };

 const handleSortByChange = (event) => {
  setSortBy(event.target.value);
  setIsSortByOpen(false);
  let sortedProducts = [...filteredProducts];
  switch (event.target.value) {
   case "price-ascending":
    sortedProducts.sort((a, b) => a.newPrice - b.newPrice);
    break;
   case "price-descending":
    sortedProducts.sort((a, b) => b.newPrice - a.newPrice);
    break;
   case "title-ascending":
    sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    break;
   case "title-descending":
    sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    break;
   case "created-ascending":
    sortedProducts.sort((a, b) => new Date(a.Date) - new Date(b.Date));
    break;
   case "created-descending":
   default:
    sortedProducts.sort((a, b) => new Date(b.Date) - new Date(a.Date));
    break;
  }
  setFilteredProducts(sortedProducts);
 };

 const toggleSortBy = () => {
  setIsSortByOpen(!isSortByOpen);
 };

 const closeSortBy = () => {
  setIsSortByOpen(false);
 };

 const toggleFilter = () => {
  setIsFilterOpen(!isFilterOpen);
 };

 const closeFilter = () => {
  setIsFilterOpen(false);
 };

 const handlePriceChange = (event, newValue) => {
  setPriceRange(newValue);
 };

 const handleColorChange = (event) => {
  const colorValue = event.target.value;
  if (event.target.checked) {
   setSelectedColors([...selectedColors, colorValue]);
  } else {
   setSelectedColors(selectedColors.filter((color) => color !== colorValue));
  }
 };

 const handleAvailabilityChange = (event) => {
  const availabilityValue = event.target.value === "in_stock";
  if (event.target.checked) {
   setSelectedAvailability([...selectedAvailability, availabilityValue]);
  } else {
   setSelectedAvailability(
    selectedAvailability.filter((value) => value !== availabilityValue),
   );
  }
 };

 const handleApplyFilters = useCallback(() => {
  setIsFilterOpen(false);
 }, []);

 const handleClearFilters = useCallback(() => {
  setPriceRange([priceBounds.min, priceBounds.max]);
  setSelectedColors([]);
  setSelectedAvailability([]);
 }, [priceBounds.min, priceBounds.max]);

 const handleLoadMore = async () => {
  const nextCount = viewedProductsCount + 20;
  setViewedProductsCount(Math.min(nextCount, filteredProducts.length));
 };

 const progress =
  totalProductsCount > 0 ? (viewedProductsCount / totalProductsCount) * 100 : 0;

 const uniqueAvailabilityOptions = [
  { label: "In Stock", value: true },
  { label: "Out of Stock", value: false },
 ];

 const hasFiltersApplied =
  priceRange[0] > priceBounds.min ||
  priceRange[1] < priceBounds.max ||
  selectedColors.length > 0 ||
  selectedAvailability.length > 0;

 // Function to handle product clicks and action button clicks

 const handleProductAction = (product, actionType = "view") => {
  const isInStock =
   product.is_In_Stock && product.is_In_Stock.toLowerCase() === "yes";

  if (!isInStock) {
   setPreOrderProductId(product.productId); // Store product ID for pre-order
   setSnackbarMessage(
    `This product is currently out of stock. Do you want to pre-order?`,
   );
   setSnackbarSeverity("warning");
   setSnackbarOpen(true);
  } else {
   // Navigate to product details page
   navigate(`/productDetailsPage/${product.productId}`, {
    state: { productDetails: product, action: actionType },
   });
  }
 };

 const handlePreOrderConfirmation = () => {
  setSnackbarOpen(false); // Close the current snackbar
  if (preOrderProductId) {
   // Navigate to product details page with pre-order intent
   navigate(`/productDetailsPage/${preOrderProductId}`, {
    state: {
     productDetails: allProducts.find((p) => p.productId === preOrderProductId),
     preOrderIntent: true,
    },
   });
   setPreOrderProductId(null); // Clear the pre-order product ID
  }
 };

 const handleSnackbarClose = (event, reason) => {
  if (reason === "clickaway") {
   return;
  }
  setSnackbarOpen(false);
  setPreOrderProductId(null); // Clear product ID if user closes snackbar
 };

 if (loading) {
  return <LinearProgress />;
 }

 if (error) {
  return <Typography color="error">Error loading products: {error}</Typography>;
 }

 const productsToRender = filteredProducts.slice(0, viewedProductsCount);

 return (
  <div>
   {HeroComponentToRender}
   {promoText && (
    <Box sx={{ my: 2, p: 2, bgcolor: "info.light", textAlign: "center" }}>
     <Typography variant="h6" color="info.contrastText">
      {promoText}
     </Typography>
    </Box>
   )}

   <Box>
    <Drawer
     anchor="left"
     open={isFilterOpen}
     onClose={closeFilter}
     aria-labelledby="filter-drawer-title"
    >
     <FilterDrawerHeader>
      <Typography id="filter-drawer-title">Filter</Typography>
      <IconButton onClick={closeFilter} aria-label="Close filter">
       <CloseIcon />
      </IconButton>
     </FilterDrawerHeader>
     <FilterDrawerContent>
      <FilterGroup>
       <FilterTitle>Price</FilterTitle>
       <Slider
        getAriaLabel={() => "Price range"}
        value={priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={priceBounds.min}
        max={priceBounds.max}
        step={100}
       />
       <Typography id="price-range-label">
        Price: Tk {priceRange[0]} - Tk {priceRange[1]} BDT
       </Typography>
      </FilterGroup>

      <FilterGroup>
       <FilterTitle>Color</FilterTitle>
       <FormGroup>
        {uniqueColors.map((color) => (
         <FormControlLabel
          key={color}
          control={
           <Checkbox
            value={color}
            checked={selectedColors.includes(color)}
            onChange={handleColorChange}
           />
          }
          label={
           <Box sx={{ display: "flex", alignItems: "center" }}>
            <ColorBox color={color} />
            <Typography>{color}</Typography>
           </Box>
          }
         />
        ))}
       </FormGroup>
      </FilterGroup>

      <FilterGroup>
       <FilterTitle>Availability</FilterTitle>
       <FormGroup>
        {uniqueAvailabilityOptions.map((availability) => (
         <FormControlLabel
          key={availability.value}
          control={
           <Checkbox
            value={availability.value}
            checked={selectedAvailability.includes(availability.value)}
            onChange={handleAvailabilityChange}
           />
          }
          label={availability.label}
         />
        ))}
       </FormGroup>
      </FilterGroup>

      <Button variant="contained" color="primary" onClick={handleApplyFilters}>
       Apply Filters
      </Button>
      {hasFiltersApplied && (
       <Button onClick={handleClearFilters} sx={{ mt: 1 }}>
        Clear Filters
       </Button>
      )}
     </FilterDrawerContent>
    </Drawer>

    <Box
     sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: (theme) => theme.spacing(1, 1),
     }}
    >
     <Box>
      <Button
       startIcon={<FilterListIcon />}
       aria-label="Show filters"
       onClick={toggleFilter}
       sx={{ mr: 1 }}
      >
       Filter
      </Button>
     </Box>
     <Box sx={{ display: "flex", alignItems: "center" }}>
      <LayoutSwitch sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
       <LayoutButton
        active={layout === "list"}
        onClick={() => handleLayoutChange("list", 1)}
       >
        <ViewListIcon />
       </LayoutButton>
       <LayoutButton
        active={layout === "grid" && gridColumns === 2}
        onClick={() => handleLayoutChange("grid", 2)}
       >
        <GridViewIcon />
       </LayoutButton>
       <LayoutButton
        active={layout === "grid" && gridColumns === 5}
        onClick={() => handleLayoutChange("grid", 5)}
       >
        <GridViewIcon sx={{ fontSize: 20 }} />
       </LayoutButton>
      </LayoutSwitch>
      <LayoutSwitch sx={{ display: { xs: "none", lg: "flex" }, mr: 1 }}>
       <LayoutButton
        active={layout === "list"}
        onClick={() => handleLayoutChange("list", 1)}
       >
        <ViewListIcon />
       </LayoutButton>
       <LayoutButton
        active={layout === "grid" && gridColumns === 2}
        onClick={() => handleLayoutChange("grid", 2)}
       >
        <GridViewIcon sx={{ fontSize: 20 }} />
       </LayoutButton>
       <LayoutButton
        active={layout === "grid" && gridColumns === 3}
        onClick={() => handleLayoutChange("grid", 3)}
       >
        <GridViewIcon sx={{ fontSize: 20 }} />
       </LayoutButton>
       <LayoutButton
        active={layout === "grid" && gridColumns === 4}
        onClick={() => handleLayoutChange("grid", 4)}
       >
        <GridViewIcon sx={{ fontSize: 20 }} />
       </LayoutButton>
       <LayoutButton
        active={layout === "grid" && gridColumns === 5}
        onClick={() => handleLayoutChange("grid", 5)}
       >
        <GridViewIcon sx={{ fontSize: 20 }} />
       </LayoutButton>
       <LayoutButton
        active={layout === "grid" && gridColumns === 6}
        onClick={() => handleLayoutChange("grid", 6)}
       >
        <GridViewIcon sx={{ fontSize: 20 }} />
       </LayoutButton>
      </LayoutSwitch>
      <Box sx={{ position: "relative" }}>
       <DropdownButton onClick={toggleSortBy} endIcon={<ArrowDropDownIcon />}>
        <Typography sx={{ display: { xs: "none", md: "block" } }}>
         {sortBy === "manual" && "Featured"}
         {sortBy === "best-selling" && "Best selling"}
         {sortBy === "title-ascending" && "Alphabetically, A-Z"}
         {sortBy === "title-descending" && "Alphabetically, Z-A"}
         {sortBy === "price-ascending" && "Price, low to high"}
         {sortBy === "price-descending" && "Price, high to low"}
         {sortBy === "created-ascending" && "Date, old to new"}
         {sortBy === "created-descending" && "Date, new to old"}
        </Typography>
        <Typography sx={{ display: { xs: "block", md: "none" } }}>
         Sort
        </Typography>
       </DropdownButton>
       {isSortByOpen && (
        <DropdownMenu>
         <Box
          sx={{
           display: "flex",
           justifyContent: "space-between",
           alignItems: "center",
           padding: 1,
          }}
         >
          <Typography>Sort by:</Typography>
          <IconButton size="small" onClick={closeSortBy}>
           <CloseIcon />
          </IconButton>
         </Box>
         <DropdownMenuItem value="manual" onClick={handleSortByChange}>
          Featured
         </DropdownMenuItem>
         <DropdownMenuItem value="best-selling" onClick={handleSortByChange}>
          Best selling
         </DropdownMenuItem>
         <DropdownMenuItem value="title-ascending" onClick={handleSortByChange}>
          - Alphabetically, A-Z
         </DropdownMenuItem>
         <DropdownMenuItem
          value="title-descending"
          onClick={handleSortByChange}
         >
          Alphabetically, Z-A
         </DropdownMenuItem>
         <DropdownMenuItem value="price-ascending" onClick={handleSortByChange}>
          Price, low to high
         </DropdownMenuItem>
         <DropdownMenuItem
          value="price-descending"
          onClick={handleSortByChange}
         >
          Price, high to low
         </DropdownMenuItem>
         <DropdownMenuItem
          value="created-ascending"
          onClick={handleSortByChange}
         >
          Date, old to new
         </DropdownMenuItem>
         <DropdownMenuItem
          value="created-descending"
          onClick={handleSortByChange}
         >
          Date, new to old
         </DropdownMenuItem>
        </DropdownMenu>
       )}
      </Box>
     </Box>
    </Box>

    {layout === "grid" && (
     <Grid container spacing={2} sx={{ mt: 2 }}>
      {productsToRender.map((product) => (
       <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={12 / gridColumns}
        key={product.productId}
       >
        <ProductItem onClick={() => handleProductAction(product, "view")}>
         {" "}
         {/* Make product item clickable */}
         <StockStatusNote
          isInStock={
           product.is_In_Stock && product.is_In_Stock.toLowerCase() === "yes"
          }
         >
          {product.is_In_Stock && product.is_In_Stock.toLowerCase() === "yes"
           ? "In Stock"
           : "Out of Stock"}
         </StockStatusNote>
         <ProductImageWrapper>
          <ProductImage
           src={product.primaryImages && product.primaryImages[0]}
           alt={product.title}
           loading="lazy"
          />
          <ProductHoverImage
           src={product.hoverImages && product.hoverImages[0]}
           alt={product.title}
           loading="lazy"
          />
         </ProductImageWrapper>
         <ProductInfo>
          <ProductTitle variant="h6" component="h3">
           {product.title}
          </ProductTitle>
          <ProductPrice>
           Tk {product.newPrice && product.newPrice.toLocaleString()} BDT
          </ProductPrice>
          <ProductActions>
           <Tooltip title="Add to Wishlist">
            <ActionButton
             onClick={(e) => {
              e.stopPropagation();
              handleProductAction(product, "wishlist");
             }}
            >
             {" "}
             {/* Prevent parent click */}
             <FavoriteBorderIcon />
            </ActionButton>
           </Tooltip>
           <Tooltip title="Compare">
            <ActionButton
             onClick={(e) => {
              e.stopPropagation();
              handleProductAction(product, "compare");
             }}
            >
             <CompareArrowsIcon />
            </ActionButton>
           </Tooltip>
           <Tooltip title="Quick Shop">
            <ActionButton
             onClick={(e) => {
              e.stopPropagation();
              handleProductAction(product, "quickshop");
             }}
            >
             <ShoppingCartIcon />
            </ActionButton>
           </Tooltip>
           <Tooltip title="Quick View">
            <ActionButton
             onClick={(e) => {
              e.stopPropagation();
              handleProductAction(product, "quickview");
             }}
            >
             <VisibilityIcon />
            </ActionButton>
           </Tooltip>
          </ProductActions>
         </ProductInfo>
        </ProductItem>
       </Grid>
      ))}
     </Grid>
    )}

    {/* List layout implementation - similar onClick handlers needed */}
    {layout === "list" && (
     <Box sx={{ mt: 2 }}>
      {productsToRender.map((product) => (
       <Box
        key={product.productId}
        sx={{
         display: "flex",
         gap: 2,
         mb: 2,
         border: `1px solid`, // Simplified for brevity
         borderRadius: `8px`,
         p: 2,
         cursor: "pointer",
        }}
        onClick={() => handleProductAction(product, "view")} // Make list item clickable
       >
        <Box
         sx={{
          minWidth: 150,
          maxWidth: 150,
          aspectRatio: "2/3",
          overflow: "hidden",
         }}
        >
         <img
          src={product.primaryImages && product.primaryImages[0]}
          alt={product.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
         />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
         <Typography variant="h6">{product.title}</Typography>
         <Typography variant="body2" color="text.secondary">
          {product.category}
         </Typography>
         <Typography variant="h6" color="primary.main">
          Tk {product.newPrice && product.newPrice.toLocaleString()} BDT
         </Typography>
         <StockStatusNote
          isInStock={
           product.is_In_Stock && product.is_In_Stock.toLowerCase() === "yes"
          }
          sx={{ position: "static", mt: 1 }} // Adjust position for list layout
         >
          {product.is_In_Stock && product.is_In_Stock.toLowerCase() === "yes"
           ? "In Stock"
           : "Out of Stock"}
         </StockStatusNote>
         <ProductActions sx={{ mt: 1 }}>
          <Tooltip title="Add to Wishlist">
           <ActionButton
            onClick={(e) => {
             e.stopPropagation();
             handleProductAction(product, "wishlist");
            }}
           >
            <FavoriteBorderIcon />
           </ActionButton>
          </Tooltip>
          <Tooltip title="Compare">
           <ActionButton
            onClick={(e) => {
             e.stopPropagation();
             handleProductAction(product, "compare");
            }}
           >
            <CompareArrowsIcon />
           </ActionButton>
          </Tooltip>
          <Tooltip title="Quick Shop">
           <ActionButton
            onClick={(e) => {
             e.stopPropagation();
             handleProductAction(product, "quickshop");
            }}
           >
            <ShoppingCartIcon />
           </ActionButton>
          </Tooltip>
          <Tooltip title="Quick View">
           <ActionButton
            onClick={(e) => {
             e.stopPropagation();
             handleProductAction(product, "quickview");
            }}
           >
            <VisibilityIcon />
           </ActionButton>
          </Tooltip>
         </ProductActions>
        </Box>
       </Box>
      ))}
     </Box>
    )}

    {viewedProductsCount < filteredProducts.length && (
     <LoadMoreWrapper>
      <LoadMoreBar>
       <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ height: 10, borderRadius: 5 }}
       />
       <Typography variant="caption" sx={{ mt: 1 }}>
        Showing {viewedProductsCount} of {filteredProducts.length} products
       </Typography>
      </LoadMoreBar>
      <LoadMoreButton variant="contained" onClick={handleLoadMore}>
       Load More
       {loading && (
        <LoadingSpinner>
         <span className="spinner-border spinner-border-sm"></span>
        </LoadingSpinner>
       )}
      </LoadMoreButton>
     </LoadMoreWrapper>
    )}
   </Box>
   {/* Snackbar for notifications */}
   <Snackbar
    open={snackbarOpen}
    autoHideDuration={6000}
    onClose={handleSnackbarClose}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
   >
    <Alert
     onClose={handleSnackbarClose}
     severity={snackbarSeverity}
     variant="filled"
     sx={{ width: "100%" }}
     action={
      preOrderProductId && (
       <Button
        color="inherit"
        size="small"
        onClick={handlePreOrderConfirmation}
       >
        Pre-order
       </Button>
      )
     }
    >
     {snackbarMessage}
    </Alert>
   </Snackbar>
   <CurrentFooterComponent />
  </div>
 );
}

export default ProductGridPage;
// import React, { useState, useEffect, useCallback } from "react";
// import { useLocation } from "react-router-dom"; // Import useLocation
// import {
//  Box,
//  Button,
//  Grid,
//  IconButton,
//  Typography,
//  Tooltip,
//  styled,
//  LinearProgress,
//  Drawer,
//  FormGroup,
//  FormControlLabel,
//  Checkbox,
//  MenuItem,
//  Snackbar, // Import Snackbar for messages
//  Alert, // Import Alert for Snackbar content
// } from "@mui/material";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import ViewListIcon from "@mui/icons-material/ViewList";
// import GridViewIcon from "@mui/icons-material/GridView";
// import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import CloseIcon from "@mui/icons-material/Close";
// import Slider from "@mui/material/Slider";
// import "../AdminComponents/Assets/base.css";
// import "../styles/global.css";
// import BelwariPagefooter from "./BelwariPagefooter";
// import BackgroundVideoSection from "./BackgroundVideoSection";
// import axios from "axios";
// import DefaultFooter from "../Components/Footer/Footer";
// import DefaultHeroVideo from "./BackgroundVideoSection";
// import ImageBanner from "../Components/HeroContent/ImageBanner";

// // Styled components (retained for styling)
// const LayoutSwitch = styled(Box)(({ theme }) => ({
//  display: "flex",
//  gap: theme.spacing(0.5),
// }));

// const LayoutButton = styled(IconButton)(({ theme, active }) => ({
//  padding: theme.spacing(0.5),
//  border: `1px solid ${theme.palette.divider}`,
//  backgroundColor: active ? theme.palette.action.selected : "transparent",
//  "&:hover": {
//   backgroundColor: theme.palette.action.hover,
//  },
// }));

// const ProductItem = styled(Box)(({ theme }) => ({
//  position: "relative",
//  border: `1px solid ${theme.palette.divider}`,
//  borderRadius: theme.shape.borderRadius,
//  overflow: "hidden",
//  cursor: "pointer", // Indicate clickability
// }));

// const ProductImageWrapper = styled(Box)({
//  position: "relative",
//  width: "100%",
//  aspectRatio: "2/3", // Based on the data-style attribute
//  overflow: "hidden",
// });

// const ProductImage = styled("img")({
//  width: "100%",
//  height: "100%",
//  objectFit: "cover",
//  transition: "opacity 0.3s ease-in-out",
// });

// const ProductHoverImage = styled("img")({
//  position: "absolute",
//  top: 0,
//  left: 0,
//  width: "100%",
//  height: "100%",
//  objectFit: "cover",
//  opacity: 0,
//  transition: "opacity 0.3s ease-in-out",
//  "&:hover": {
//   opacity: 1,
//  },
// });

// const ProductInfo = styled(Box)(({ theme }) => ({
//  padding: theme.spacing(1.5),
// }));

// const ProductTitle = styled(Typography)(({ theme }) => ({
//  fontWeight: theme.typography.fontWeightMedium,
//  marginBottom: theme.spacing(0.5),
// }));

// const ProductPrice = styled(Typography)(({ theme }) => ({
//  color: theme.palette.primary.main,
//  fontWeight: theme.typography.fontWeightBold,
//  marginBottom: theme.spacing(1),
// }));

// const ProductActions = styled(Box)(({ theme }) => ({
//  display: "flex",
//  gap: theme.spacing(0.5),
//  marginTop: theme.spacing(1),
// }));

// const ActionButton = styled(IconButton)(({ theme }) => ({
//  padding: theme.spacing(0.75),
//  border: `1px solid ${theme.palette.divider}`,
//  borderRadius: theme.shape.borderRadius,
//  "&:hover": {
//   backgroundColor: theme.palette.action.hover,
//  },
// }));

// const DropdownButton = styled(Button)(({ theme }) => ({
//  display: "flex",
//  alignItems: "center",
//  gap: theme.spacing(0.5),
//  padding: theme.spacing(1),
//  border: `1px solid ${theme.palette.divider}`,
//  borderRadius: theme.shape.borderRadius,
// }));

// const DropdownMenu = styled(Box)(({ theme }) => ({
//  position: "absolute",
//  top: "100%",
//  right: 0,
//  zIndex: 1,
//  backgroundColor: theme.palette.background.paper,
//  border: `1px solid ${theme.palette.divider}`,
//  borderRadius: theme.shape.borderRadius,
//  marginTop: theme.spacing(0.5),
//  minWidth: "100%",
//  boxShadow: theme.shadows[2],
// }));

// const DropdownMenuItem = styled(MenuItem)(({ theme }) => ({
//  padding: theme.spacing(1.5),
//  "&:hover": {
//   backgroundColor: theme.palette.action.hover,
//  },
// }));

// const LoadMoreWrapper = styled(Box)(({ theme }) => ({
//  textAlign: "center",
//  padding: theme.spacing(2),
// }));

// const LoadMoreBar = styled(Box)(({ theme }) => ({
//  backgroundColor: theme.palette.grey[300],
//  borderRadius: theme.shape.borderRadius,
//  padding: theme.spacing(1),
//  marginBottom: theme.spacing(1),
// }));

// const LoadMoreProgressBar = styled(Box)(({ theme }) => ({
//  backgroundColor: theme.palette.primary.main,
//  borderRadius: theme.shape.borderRadius,
//  height: "100%",
// }));

// const LoadMoreButton = styled(Button)(({ theme }) => ({
//  padding: theme.spacing(1.5, 3),
//  borderRadius: theme.shape.borderRadius,
//  fontWeight: theme.typography.fontWeightMedium,
//  "&:hover": {},
// }));

// const LoadingSpinner = styled(Box)(({ theme }) => ({
//  display: "inline-flex",
//  alignItems: "center",
//  justifyContent: "center",
//  marginLeft: theme.spacing(1),
// }));

// const FilterDrawerHeader = styled(Box)(({ theme }) => ({
//  display: "flex",
//  justifyContent: "space-between",
//  alignItems: "center",
//  padding: theme.spacing(2),
//  borderBottom: `1px solid ${theme.palette.divider}`,
// }));

// const FilterDrawerContent = styled(Box)(({ theme }) => ({
//  padding: theme.spacing(2),
//  display: "flex",
//  flexDirection: "column",
//  gap: theme.spacing(2),
// }));

// const FilterGroup = styled(Box)(({ theme }) => ({
//  marginBottom: theme.spacing(2),
// }));

// const FilterTitle = styled(Typography)(({ theme }) => ({
//  fontWeight: theme.typography.fontWeightMedium,
//  marginBottom: theme.spacing(1),
// }));

// const ColorBox = styled(Box)(({ theme, color }) => ({
//  width: 16,
//  height: 16,
//  borderRadius: "50%",
//  backgroundColor: color,
//  border: `1px solid ${theme.palette.divider}`,
//  marginRight: theme.spacing(0.5),
// }));

// const StockStatusNote = styled(Box)(({ theme, isInStock }) => ({
//  position: "absolute",
//  top: theme.spacing(1),
//  left: theme.spacing(1),
//  backgroundColor: isInStock ? "rgba(0, 128, 0, 0.8)" : "rgba(255, 0, 0, 0.8)",
//  color: theme.palette.common.white,
//  padding: theme.spacing(0.5, 1),
//  borderRadius: theme.shape.borderRadius,
//  fontSize: theme.typography.caption.fontSize,
//  fontWeight: theme.typography.fontWeightMedium,
//  zIndex: 1,
// }));

// function valuetext(value) {
//  return `Tk ${value}`;
// }

// function ProductGridPage(props) {
//  const location = useLocation();
//  //const { heroContent } = location.state || {};
//  //console.log("location.state:", location.state); // <-- Add this line
//  //console.log("heroVideoType from state:", location.state?.heroVideoType); // <-- Add this line
//  //  const {
//  //   // titleFilter,
//  //   specificFooterComponent,
//  //   specificHeroVideoComponent,
//  //   promoText,
//  //  } = location.state || {};
//  const {
//   footerType, // Will be "belwari" or undefined
//   heroVideoType, // Will be "belwari" or undefined
//   promoText,
//   heroContent,
//  } = location.state || {}; // Added || {} for safety
//  const [layout, setLayout] = useState("grid");
//  const [gridColumns, setGridColumns] = useState(5);
//  const [sortBy, setSortBy] = useState("created-descending");
//  const [isSortByOpen, setIsSortByOpen] = useState(false);
//  const [isFilterOpen, setIsFilterOpen] = useState(false);
//  const [allProducts, setAllProducts] = useState([]); // Store all fetched products
//  const [filteredProducts, setFilteredProducts] = useState([]); // Products to display after filtering
//  const [viewedProductsCount, setViewedProductsCount] = useState(20);
//  const [totalProductsCount, setTotalProductsCount] = useState(0); // Initialize to 0
//  const [loading, setLoading] = useState(true);
//  const [error, setError] = useState(null);
//  const [nextPageUrl] = useState(null); // You might need to handle pagination from the API
//  const [priceRange, setPriceRange] = useState([0, 0]); // Initialize with actual min/max
//  const [selectedColors, setSelectedColors] = useState([]);
//  const [selectedAvailability, setSelectedAvailability] = useState([]);
//  const [uniqueColors, setUniqueColors] = useState([]);
//  const [priceBounds, setPriceBounds] = useState({ min: 0, max: 0 });
//  //--- changes start for url query parameters
//  const queryParams = new URLSearchParams(location.search);
//  //  const initialKeyword = queryParams.get("keyword") || ""; // Get the keyword
//  //  const initialCategory = queryParams.get("category") || ""; // Get the category name
//  //  const initialTitleFilter = queryParams.get("title");
//  //  const [titleFilter, setTitleFilter] = useState(initialKeyword);
//  //  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
//  //  const [currentFilterTerm, setCurrentFilterTerm] = useState(
//  //   initialKeyword || initialTitleFromUrl,
//  //  );
//  //  // Use a separate state for the category, if it's explicitly passed
//  //  const [currentCategoryFilter, setCurrentCategoryFilter] = useState(
//  //   initialCategoryFromUrl,
//  //  );
//  const initialKeyword = queryParams.get("keyword") || ""; // From BlucheezHeader
//  const initialCategoryFromUrl = queryParams.get("category") || ""; // From BlucheezHeader
//  const initialTitleFromUrl = queryParams.get("title") || ""; // From other pages

//  // Use a single state for the primary filter term, prioritizing 'keyword' then 'title'
//  const [currentFilterTerm, setCurrentFilterTerm] = useState(
//   initialKeyword || initialTitleFromUrl,
//  );
//  // Use a separate state for the category, if it's explicitly passed (e.g., "Casual Kameez")
//  const [currentCategoryFilter, setCurrentCategoryFilter] = useState(
//   initialCategoryFromUrl,
//  );

//  useEffect(() => {
//   const newQueryParams = new URLSearchParams(location.search);
//   const newKeyword = newQueryParams.get("keyword") || "";
//   const newTitle = newQueryParams.get("title") || "";
//   const newCategory = newQueryParams.get("category") || "";
//   setCurrentFilterTerm(newKeyword || newTitle);
//   setCurrentCategoryFilter(newCategory);
//  }, [location.search]);
//  //  const HeroVideoComponent = specificHeroVideoComponent || DefaultHeroVideo;
//  //  const FooterComponent = specificFooterComponent || DefaultFooter;
//  let HeroComponentToRender = null;
//  console.log("herocontent:", heroContent);
//  if (heroContent) {
//   if (heroContent.type === "video") {
//    console.log("Video URL:", heroContent.videoUrl);
//    console.log("hey i am here for video rendering");
//    HeroComponentToRender = (
//     <BackgroundVideoSection
//      videoUrl={heroContent.videoUrl}
//      posterUrl={heroContent.posterUrl}
//      altText={heroContent.altText}
//      linkUrl={heroContent.linkUrl}
//     />
//    );
//   } else if (heroContent.type === "image") {
//    HeroComponentToRender = (
//     <ImageBanner
//      imageUrl={heroContent.imageUrl}
//      altText={heroContent.altText}
//      linkUrl={heroContent.linkUrl}
//     />
//    );
//   } else {
//    // Fallback if no heroContent is provided in state, or if type is "default"
//    // Use your existing DefaultHeroVideo or a simple div
//    HeroComponentToRender = <DefaultHeroVideo />;
//   }
//  }
//  const isBelwariPage =
//   //initialTitleFilter && initialTitleFilter.toLowerCase() === "belwari";
//   currentFilterTerm && currentFilterTerm.toLowerCase() === "belwari";
//  // Determine which components to render based on the string identifiers
//  //  let CurrentHeroVideoComponent = DefaultHeroVideo; // Default
//  //  if (heroVideoType === "belwari") {
//  //   CurrentHeroVideoComponent = BelowariVideoBackground;
//  //   console.log("belwarivideo section:", CurrentHeroVideoComponent);
//  //  }
//  //console.log("CurrentHeroVideoComponent:", CurrentHeroVideoComponent);
//  let CurrentFooterComponent = DefaultFooter; // Default
//  if (footerType === "belwari") {
//   CurrentFooterComponent = BelwariPagefooter;
//  }

//  useEffect(() => {
//   const fetchProducts = async () => {
//    setLoading(true);
//    setError(null);
//    try {
//     const response = await axios.get(
//      //"https://localhost:7142/api/Product/all", // Replace with your actual API
//      "https://localhost:7142/api/Product/GetProductImages",
//     );

//     setAllProducts(response.data);
//     console.log("response data:", response.data);
//     console.log("all products:", allProducts);
//     setTotalProductsCount(response.data.length); // Set total count
//     setLoading(false);
//    } catch (err) {
//     setError(err.message);
//     setLoading(false);
//    }
//   };

//   fetchProducts();
//  }, []);

//  useEffect(() => {
//   // This useEffect will run after allProducts has been updated
//   console.log("all products updated:", allProducts);
//   // You can perform actions that depend on the updated allProducts here
//  }, [allProducts]);

//  useEffect(() => {
//   // Derive unique colors and price range once allProducts are loaded
//   if (allProducts.length > 0) {
//    const colors = [
//     ...new Set(allProducts.map((product) => product.color).filter(Boolean)),
//    ].sort();
//    setUniqueColors(colors);

//    const prices = allProducts.map((product) => product.newPrice);
//    const minPrice = Math.min(...prices);
//    const maxPrice = Math.max(...prices);
//    setPriceBounds({ min: minPrice, max: maxPrice });
//    setPriceRange([minPrice, maxPrice]); // Initialize price range
//   }
//  }, [allProducts]);

//  // UPDATED FILTERING LOGIC FOR PRODUCTGRIDPAGE
//  useEffect(() => {
//   // Filter products based on URL parameters and props
//   let filtered = [...allProducts];
//   console.log("all filtered product", filtered);

//   // Priority 1: URL keyword parameter (from menu navigation)
//   if (currentFilterTerm) {
//    filtered = filtered.filter((product) => {
//     const searchTerm = currentFilterTerm.toLowerCase();

//     // Check title, category, handle, and other relevant fields
//     return (
//      (product.title && product.title.toLowerCase().includes(searchTerm)) ||
//      (product.category &&
//       product.category.toLowerCase().includes(searchTerm)) ||
//      (product.handle && product.handle.toLowerCase().includes(searchTerm)) ||
//      // Add more fields as needed for comprehensive search
//      (product.tags && product.tags.toLowerCase().includes(searchTerm))
//     );
//    });
//   }

//   // Priority 2: URL category parameter (for more specific filtering)
//   if (currentCategoryFilter && currentCategoryFilter !== currentFilterTerm) {
//    filtered = filtered.filter((product) => {
//     const categoryTerm = currentCategoryFilter.toLowerCase();

//     return (
//      (product.category &&
//       product.category.toLowerCase().includes(categoryTerm)) ||
//      (product.title && product.title.toLowerCase().includes(categoryTerm))
//     );
//    });
//   }

//   // Priority 3: Props-based filtering (fallback)
//   if (!currentFilterTerm && !currentCategoryFilter) {
//    if (props.title) {
//     filtered = filtered.filter(
//      (product) =>
//       product.title &&
//       product.title.toLowerCase().includes(props.title.toLowerCase()),
//     );
//    }

//    if (props.category) {
//     filtered = filtered.filter(
//      (product) =>
//       product.category &&
//       product.category.toLowerCase().includes(props.category.toLowerCase()),
//     );
//    }
//   }

//   // latest previous filter logic
//   //  useEffect(() => {
//   //   // Filter products based on props, price, color, and availability
//   //   let filtered = [...allProducts];
//   //   console.log("all filtered product", filtered);

//   //   // Filter by Title or Category from props
//   //   // Filter by Title from URL query parameter
//   //   // 1. Filter by the currentFilterTerm (keyword from BlucheezHeader or title from other pages)
//   //   if (currentFilterTerm) {
//   //    filtered = filtered.filter(
//   //     (product) =>
//   //      (product.title &&
//   //       product.title.toLowerCase().includes(currentFilterTerm.toLowerCase())) ||
//   //      (product.category &&
//   //       product.category.toLowerCase().includes(currentFilterTerm.toLowerCase())), // Also check category for the keyword
//   //    );
//   //   }

//   //   // 2. Filter by the category explicitly passed from BlucheezHeader, if different from currentFilterTerm
//   //   // This is useful if 'keyword' is 'casual' but 'category' is 'Casual Kameez'
//   //   if (
//   //    currentCategoryFilter &&
//   //    currentCategoryFilter.toLowerCase() !== currentFilterTerm.toLowerCase()
//   //   ) {
//   //    filtered = filtered.filter(
//   //     (product) =>
//   //      product.category &&
//   //      product.category
//   //       .toLowerCase()
//   //       .includes(currentCategoryFilter.toLowerCase()),
//   //    );
//   //   }

//   //   // Existing props.title and props.category logic (if still relevant for non-URL based navigation)
//   //   // Only apply if no URL filter is present, giving URL precedence.
//   //   if (!currentFilterTerm && !currentCategoryFilter && props.title) {
//   //    filtered = filtered.filter(
//   //     (product) =>
//   //      product.title &&
//   //      product.title.toLowerCase().includes(props.title.toLowerCase()),
//   //    );
//   //   }
//   //   if (!currentFilterTerm && !currentCategoryFilter && props.category) {
//   //    filtered = filtered.filter(
//   //     (product) =>
//   //      product.category &&
//   //      product.category.toLowerCase().includes(props.category.toLowerCase()),
//   //    );
//   //   }
//   //previous filter logic
//   // if (initialTitleFilter) {
//   //  console.log("from url by Title form:", initialTitleFilter);
//   //  filtered = filtered.filter(
//   //   (product) =>
//   //    product.title &&
//   //    product.title.toLowerCase().includes(initialTitleFilter.toLowerCase()),
//   //  );
//   //  console.log("filtered: from url", filtered);
//   // }
//   // if (!initialTitleFilter && props.title) {
//   //  console.log("props title:", props.Title);
//   //  filtered = filtered.filter(
//   //   (product) =>
//   //    product.title &&
//   //    product.title.toLowerCase().includes(props.title.toLowerCase()),
//   //  );
//   // }
//   // if (props.category) {
//   //  // Assuming props.category is used for general category filtering
//   //  filtered = filtered.filter(
//   //   (product) =>
//   //    product.category &&
//   //    product.category.toLowerCase().includes(props.category.toLowerCase()),
//   //  );
//   // }

//   // Filter by price
//   filtered = filtered.filter(
//    (product) =>
//     product.newPrice >= priceRange[0] && product.newPrice <= priceRange[1],
//   );

//   // Filter by color
//   if (selectedColors.length > 0) {
//    filtered = filtered.filter((product) =>
//     selectedColors.includes(product.color),
//    );
//   }

//   // Filter by availability (Is_In_Stock is a string)
//   if (selectedAvailability.length > 0) {
//    filtered = filtered.filter((product) => {
//     const isInStock =
//      product.is_In_Stock && product.is_In_Stock.toLowerCase() === "true";
//     return selectedAvailability.includes(isInStock);
//    });
//   }

//   setFilteredProducts(filtered);
//   setViewedProductsCount(Math.min(20, filtered.length)); // Reset viewed count on filter
//  }, [
//   allProducts,
//   //initialTitleFilter,
//   currentFilterTerm,
//   currentCategoryFilter,
//   props.title,
//   props.category,
//   priceRange,
//   selectedColors,
//   selectedAvailability,
//  ]);

//  const handleLayoutChange = (newLayout, columns) => {
//   setLayout(newLayout);
//   setGridColumns(columns);
//  };

//  const handleSortByChange = (event) => {
//   setSortBy(event.target.value);
//   setIsSortByOpen(false);
//   let sortedProducts = [...filteredProducts];
//   switch (event.target.value) {
//    case "price-ascending":
//     sortedProducts.sort((a, b) => a.newPrice - b.newPrice);
//     break;
//    case "price-descending":
//     sortedProducts.sort((a, b) => b.newPrice - a.newPrice);
//     break;
//    case "title-ascending":
//     sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
//     break;
//    case "title-descending":
//     sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
//     break;
//    case "created-ascending":
//     sortedProducts.sort((a, b) => new Date(a.Date) - new Date(b.Date));
//     break;
//    case "created-descending":
//    default:
//     sortedProducts.sort((a, b) => new Date(b.Date) - new Date(a.Date));
//     break;
//   }
//   setFilteredProducts(sortedProducts);
//  };

//  const toggleSortBy = () => {
//   setIsSortByOpen(!isSortByOpen);
//  };

//  const closeSortBy = () => {
//   setIsSortByOpen(false);
//  };

//  const toggleFilter = () => {
//   setIsFilterOpen(!isFilterOpen);
//  };

//  const closeFilter = () => {
//   setIsFilterOpen(false);
//  };

//  const handlePriceChange = (event, newValue) => {
//   setPriceRange(newValue);
//  };

//  const handleColorChange = (event) => {
//   const colorValue = event.target.value;
//   if (event.target.checked) {
//    setSelectedColors([...selectedColors, colorValue]);
//   } else {
//    setSelectedColors(selectedColors.filter((color) => color !== colorValue));
//   }
//  };

//  const handleAvailabilityChange = (event) => {
//   const availabilityValue = event.target.value === "in_stock";
//   if (event.target.checked) {
//    setSelectedAvailability([...selectedAvailability, availabilityValue]);
//   } else {
//    setSelectedAvailability(
//     selectedAvailability.filter((value) => value !== availabilityValue),
//    );
//   }
//  };

//  const handleApplyFilters = useCallback(() => {
//   setIsFilterOpen(false);
//  }, []);

//  const handleClearFilters = useCallback(() => {
//   setPriceRange([priceBounds.min, priceBounds.max]);
//   setSelectedColors([]);
//   setSelectedAvailability([]);
//  }, [priceBounds.min, priceBounds.max]);

//  const handleLoadMore = async () => {
//   // Implement actual pagination logic here if your API supports it
//   const nextCount = viewedProductsCount + 20;
//   setViewedProductsCount(Math.min(nextCount, filteredProducts.length));
//  };

//  const progress =
//   totalProductsCount > 0 ? (viewedProductsCount / totalProductsCount) * 100 : 0;

//  const uniqueAvailabilityOptions = [
//   { label: "In Stock", value: true },
//   { label: "Out of Stock", value: false },
//  ];

//  const hasFiltersApplied =
//   priceRange[0] > priceBounds.min ||
//   priceRange[1] < priceBounds.max ||
//   selectedColors.length > 0 ||
//   selectedAvailability.length > 0;

//  // Function to handle product clicks and action button clicks
//  const handleProductAction = (product, actionType = "view") => {
//   const isInStock =
//    product.is_In_Stock && product.is_In_Stock.toLowerCase() === "true";

//   if (!isInStock) {
//    setPreOrderProductId(product.productId); // Store product ID for pre-order
//    setSnackbarMessage(
//     `This product is currently out of stock. Do you want to pre-order?`,
//    );
//    setSnackbarSeverity("warning");
//    setSnackbarOpen(true);
//   } else {
//    // Navigate to product details page
//    navigate(`/product/${product.productId}`, {
//     state: { productDetails: product, action: actionType },
//    });
//   }
//  };

//  const handlePreOrderConfirmation = () => {
//   setSnackbarOpen(false); // Close the current snackbar
//   if (preOrderProductId) {
//    // Navigate to product details page with pre-order intent
//    navigate(`/product/${preOrderProductId}`, {
//     state: {
//      productDetails: allProducts.find((p) => p.productId === preOrderProductId),
//      preOrderIntent: true,
//     },
//    });
//    setPreOrderProductId(null); // Clear the pre-order product ID
//   }
//  };

//  const handleSnackbarClose = (event, reason) => {
//   if (reason === "clickaway") {
//    return;
//   }
//   setSnackbarOpen(false);
//   setPreOrderProductId(null); // Clear product ID if user closes snackbar
//  };

//  if (loading) {
//   return <LinearProgress />;
//  }

//  if (error) {
//   return <Typography color="error">Error loading products: {error}</Typography>;
//  }

//  const productsToRender = filteredProducts.slice(0, viewedProductsCount);

//  //const productsToRender = allProducts;

//  return (
//   <div>
//    {/*{isBelwariPage ? <BelwariHeroVideo /> : <DefaultHeroVideo />}*/}
//    {/*{HeroVideoComponent && <HeroVideoComponent />}*/}
//    {/* Render the dynamically determined hero component */}
//    {HeroComponentToRender}
//    {/*{CurrentHeroVideoComponent && <CurrentHeroVideoComponent />}*/}
//    {/* Dynamic Promotional Text */}
//    {promoText && (
//     <Box sx={{ my: 2, p: 2, bgcolor: "info.light", textAlign: "center" }}>
//      <Typography variant="h6" color="info.contrastText">
//       {promoText}
//      </Typography>
//     </Box>
//    )}

//    {/*{isBelwariPage && <p>Discover the magic of Belwari! Exclusive offers!</p>}*/}
//    <Box>
//     <Drawer
//      anchor="left"
//      open={isFilterOpen}
//      onClose={closeFilter}
//      aria-labelledby="filter-drawer-title"
//     >
//      <FilterDrawerHeader>
//       <Typography id="filter-drawer-title">Filter</Typography>
//       <IconButton onClick={closeFilter} aria-label="Close filter">
//        <CloseIcon />
//       </IconButton>
//      </FilterDrawerHeader>
//      <FilterDrawerContent>
//       <FilterGroup>
//        <FilterTitle>Price</FilterTitle>
//        <Slider
//         getAriaLabel={() => "Price range"}
//         value={priceRange}
//         onChange={handlePriceChange}
//         valueLabelDisplay="auto"
//         getAriaValueText={valuetext}
//         min={priceBounds.min}
//         max={priceBounds.max}
//         step={100}
//        />
//        <Typography id="price-range-label">
//         Price: Tk {priceRange[0]} - Tk {priceRange[1]} BDT
//        </Typography>
//       </FilterGroup>

//       <FilterGroup>
//        <FilterTitle>Color</FilterTitle>
//        <FormGroup>
//         {uniqueColors.map((color) => (
//          <FormControlLabel
//           key={color}
//           control={
//            <Checkbox
//             value={color}
//             checked={selectedColors.includes(color)}
//             onChange={handleColorChange}
//            />
//           }
//           label={
//            <Box sx={{ display: "flex", alignItems: "center" }}>
//             <ColorBox color={color} />
//             <Typography>{color}</Typography>
//            </Box>
//           }
//          />
//         ))}
//        </FormGroup>
//       </FilterGroup>

//       <FilterGroup>
//        <FilterTitle>Availability</FilterTitle>
//        <FormGroup>
//         {uniqueAvailabilityOptions.map((availability) => (
//          <FormControlLabel
//           key={availability.value}
//           control={
//            <Checkbox
//             value={availability.value}
//             checked={selectedAvailability.includes(availability.value)}
//             onChange={handleAvailabilityChange}
//            />
//           }
//           label={availability.label}
//          />
//         ))}
//        </FormGroup>
//       </FilterGroup>

//       <Button variant="contained" color="primary" onClick={handleApplyFilters}>
//        Apply Filters
//       </Button>
//       {hasFiltersApplied && (
//        <Button onClick={handleClearFilters} sx={{ mt: 1 }}>
//         Clear Filters
//        </Button>
//       )}
//      </FilterDrawerContent>
//     </Drawer>

//     <Box
//      sx={{
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       padding: (theme) => theme.spacing(1, 1),
//      }}
//     >
//      <Box>
//       <Button
//        startIcon={<FilterListIcon />}
//        aria-label="Show filters"
//        onClick={toggleFilter}
//        sx={{ mr: 1 }}
//       >
//        Filter
//       </Button>
//      </Box>
//      <Box sx={{ display: "flex", alignItems: "center" }}>
//       <LayoutSwitch sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
//        <LayoutButton
//         active={layout === "list"}
//         onClick={() => handleLayoutChange("list", 1)}
//        >
//         <ViewListIcon />
//        </LayoutButton>
//        <LayoutButton
//         active={layout === "grid" && gridColumns === 2}
//         onClick={() => handleLayoutChange("grid", 2)}
//        >
//         <GridViewIcon />
//        </LayoutButton>
//        <LayoutButton
//         active={layout === "grid" && gridColumns === 5}
//         onClick={() => handleLayoutChange("grid", 5)}
//        >
//         <GridViewIcon sx={{ fontSize: 20 }} />
//        </LayoutButton>
//       </LayoutSwitch>
//       <LayoutSwitch sx={{ display: { xs: "none", lg: "flex" }, mr: 1 }}>
//        <LayoutButton
//         active={layout === "list"}
//         onClick={() => handleLayoutChange("list", 1)}
//        >
//         <ViewListIcon />
//        </LayoutButton>
//        <LayoutButton
//         active={layout === "grid" && gridColumns === 2}
//         onClick={() => handleLayoutChange("grid", 2)}
//        >
//         <GridViewIcon sx={{ fontSize: 20 }} />
//        </LayoutButton>
//        <LayoutButton
//         active={layout === "grid" && gridColumns === 3}
//         onClick={() => handleLayoutChange("grid", 3)}
//        >
//         <GridViewIcon sx={{ fontSize: 20 }} />
//        </LayoutButton>
//        <LayoutButton
//         active={layout === "grid" && gridColumns === 4}
//         onClick={() => handleLayoutChange("grid", 4)}
//        >
//         <GridViewIcon sx={{ fontSize: 20 }} />
//        </LayoutButton>
//        <LayoutButton
//         active={layout === "grid" && gridColumns === 5}
//         onClick={() => handleLayoutChange("grid", 5)}
//        >
//         <GridViewIcon sx={{ fontSize: 20 }} />
//        </LayoutButton>
//        <LayoutButton
//         active={layout === "grid" && gridColumns === 6}
//         onClick={() => handleLayoutChange("grid", 6)}
//        >
//         <GridViewIcon sx={{ fontSize: 20 }} />
//        </LayoutButton>
//       </LayoutSwitch>
//       <Box sx={{ position: "relative" }}>
//        <DropdownButton onClick={toggleSortBy} endIcon={<ArrowDropDownIcon />}>
//         <Typography sx={{ display: { xs: "none", md: "block" } }}>
//          {sortBy === "manual" && "Featured"}
//          {sortBy === "best-selling" && "Best selling"}
//          {sortBy === "title-ascending" && "Alphabetically, A-Z"}
//          {sortBy === "title-descending" && "Alphabetically, Z-A"}
//          {sortBy === "price-ascending" && "Price, low to high"}
//          {sortBy === "price-descending" && "Price, high to low"}
//          {sortBy === "created-ascending" && "Date, old to new"}
//          {sortBy === "created-descending" && "Date, new to old"}
//         </Typography>
//         <Typography sx={{ display: { xs: "block", md: "none" } }}>
//          Sort
//         </Typography>
//        </DropdownButton>
//        {isSortByOpen && (
//         <DropdownMenu>
//          <Box
//           sx={{
//            display: "flex",
//            justifyContent: "space-between",
//            alignItems: "center",
//            padding: 1,
//           }}
//          >
//           <Typography>Sort by:</Typography>
//           <IconButton size="small" onClick={closeSortBy}>
//            <CloseIcon />
//           </IconButton>
//          </Box>
//          <DropdownMenuItem value="manual" onClick={handleSortByChange}>
//           Featured
//          </DropdownMenuItem>
//          <DropdownMenuItem value="best-selling" onClick={handleSortByChange}>
//           Best selling
//          </DropdownMenuItem>
//          <DropdownMenuItem value="title-ascending" onClick={handleSortByChange}>
//           - Alphabetically, A-Z
//          </DropdownMenuItem>
//          <DropdownMenuItem
//           value="title-descending"
//           onClick={handleSortByChange}
//          >
//           Alphabetically, Z-A
//          </DropdownMenuItem>
//          <DropdownMenuItem value="price-ascending" onClick={handleSortByChange}>
//           Price, low to high
//          </DropdownMenuItem>
//          <DropdownMenuItem
//           value="price-descending"
//           onClick={handleSortByChange}
//          >
//           Price, high to low
//          </DropdownMenuItem>
//          <DropdownMenuItem
//           value="created-ascending"
//           onClick={handleSortByChange}
//          >
//           Date, old to new
//          </DropdownMenuItem>
//          <DropdownMenuItem
//           value="created-descending"
//           onClick={handleSortByChange}
//          >
//           Date, new to old
//          </DropdownMenuItem>
//         </DropdownMenu>
//        )}
//       </Box>
//      </Box>
//     </Box>

//     {layout === "grid" && (
//      <Grid container spacing={2} sx={{ mt: 2 }}>
//       {productsToRender.map((product) => (
//        <Grid
//         item
//         xs={12}
//         sm={6}
//         md={4}
//         lg={12 / gridColumns}
//         key={product.productId}
//        >
//         <ProductItem>
//          <StockStatusNote
//           isInStock={
//            product.is_In_Stock && product.is_In_Stock.toLowerCase() === "true"
//           }
//          >
//           {product.is_In_Stock && product.is_In_Stock.toLowerCase() === "true"
//            ? "In Stock"
//            : "Out of Stock"}
//          </StockStatusNote>
//          <ProductImageWrapper>
//           <ProductImage
//            src={product.primaryImages && product.primaryImages[0]}
//            alt={product.title}
//            loading="lazy"
//           />
//           <ProductHoverImage
//            src={product.hoverImages && product.hoverImages[0]}
//            alt={product.title}
//            loading="lazy"
//           />
//          </ProductImageWrapper>
//          <ProductInfo>
//           <ProductTitle variant="h6" component="h3">
//            {product.title}
//           </ProductTitle>
//           <ProductPrice>
//            Tk {product.newPrice && product.newPrice.toLocaleString()} BDT
//           </ProductPrice>
//           {/*<Typography variant="body2" color="textSecondary">
//            {product.description && product.description.substring(0, 80)}
//            ...
//           </Typography>}*/}
//           <ProductActions>
//            <Tooltip title="Add to Wishlist">
//             <ActionButton>
//              <FavoriteBorderIcon />
//             </ActionButton>
//            </Tooltip>
//            <Tooltip title="Compare">
//             <ActionButton>
//              <CompareArrowsIcon />
//             </ActionButton>
//            </Tooltip>
//            <Tooltip title="Quick Shop">
//             <ActionButton>
//              <ShoppingCartIcon />
//             </ActionButton>
//            </Tooltip>
//            <Tooltip title="Quick View">
//             <ActionButton>
//              <VisibilityIcon />
//             </ActionButton>
//            </Tooltip>
//           </ProductActions>
//          </ProductInfo>
//         </ProductItem>
//        </Grid>
//       ))}
//      </Grid>
//     )}

//     {layout === "list" && (
//      <Box sx={{ mt: 2 }}>
//       {productsToRender.map((product) => (
//        <Box
//         key={product.productId}
//         sx={{
//          display: "flex",
//          gap: 2,
//          mb: 2,
//          border: (theme) => `1px solid ${theme.palette.divider}`,
//          borderRadius: (theme) => theme.shape.borderRadius,
//          overflow: "hidden",
//         }}
//        >
//         <StockStatusNote
//          isInStock={
//           product.is_In_Stock && product.is_In_Stock.toLowerCase() === "true"
//          }
//         >
//          {product.is_In_Stock && product.is_In_Stock.toLowerCase() === "true"
//           ? "In Stock"
//           : "Out of Stock"}
//         </StockStatusNote>
//         <ProductImageWrapper sx={{ minWidth: 200 }}>
//          <ProductImage
//           src={product.primaryImages && product.primaryImages[0]}
//           alt={product.title}
//           loading="lazy"
//          />
//          <ProductHoverImage
//           src={product.hoverImages && product.hoverImages[0]}
//           alt={product.title}
//           loading="lazy"
//          />
//         </ProductImageWrapper>
//         <Box
//          sx={{
//           flexGrow: 1,
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between",
//           padding: 2,
//          }}
//         >
//          <Box>
//           <ProductTitle variant="h6" component="h3">
//            {product.title}
//           </ProductTitle>
//           <ProductPrice>
//            Tk {product.newPrice && product.newPrice.toLocaleString()} BDT
//           </ProductPrice>
//           <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
//            {product.description}
//           </Typography>
//          </Box>
//          <ProductActions sx={{ justifyContent: "flex-end" }}>
//           <Tooltip title="Quick View">
//            <ActionButton>
//             <VisibilityIcon />
//            </ActionButton>
//           </Tooltip>
//           <Tooltip title="Quick Shop">
//            <ActionButton>
//             <ShoppingCartIcon />
//            </ActionButton>
//           </Tooltip>
//           <Tooltip title="Compare">
//            <ActionButton>
//             <CompareArrowsIcon />
//            </ActionButton>
//           </Tooltip>
//           <Tooltip title="Add to Wishlist">
//            <ActionButton>
//             <FavoriteBorderIcon />
//            </ActionButton>
//           </Tooltip>
//          </ProductActions>
//         </Box>
//        </Box>
//       ))}
//      </Box>
//     )}

//     {productsToRender.length < filteredProducts.length && (
//      <LoadMoreWrapper>
//       <LoadMoreBar>
//        <LoadMoreProgressBar sx={{ width: `${progress}%` }} />
//       </LoadMoreBar>
//       <LoadMoreButton onClick={handleLoadMore} disabled={loading}>
//        Load More
//        {loading && <LoadingSpinner>Loading...</LoadingSpinner>}
//       </LoadMoreButton>
//      </LoadMoreWrapper>
//     )}
//    </Box>

//    {/*<div style={{ position: "relative", margin: "20px 0" }}>
//     <BelwariPagefooter />
//    </div>*/}
//    {/*{isBelwariPage ? (
//     <BelwariPagefooter />
//    ) : (
//     // You can replace this with <DefaultFooter /> if you have one
//     < style={{ position: "relative", margin: "20px 0" }}>
//      {/* This is your existing non-Belwari footer placeholder,
//               or you can just omit it if no footer should show by default. */}
//    {CurrentFooterComponent && <CurrentFooterComponent />}
//   </div>
//  );
// }

// export default ProductGridPage;

//working one perfactly with hard code
// import React, { useState, useCallback } from "react";
// import {
//  Box,
//  Button,
//  Grid,
//  IconButton,
//  Typography,
//  ImageList,
//  ImageListItem,
//  Tooltip,
//  styled,
//  LinearProgress,
//  Drawer,
//  List,
//  ListItem,
//  Checkbox,
//  FormGroup,
//  FormControlLabel,
//  Stack,
//  Chip,
//  FormControl,
//  InputLabel,
//  Select,
//  MenuItem,
// } from "@mui/material";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import ViewListIcon from "@mui/icons-material/ViewList";
// import GridViewIcon from "@mui/icons-material/GridView";
// import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import CloseIcon from "@mui/icons-material/Close";
// import Slider from "@mui/material/Slider";
// import "../AdminComponents/Assets/base.css";
// import "../styles/global.css";
// import BelwariPagefooter from "./BelwariPagefooter";

// // Styled components for layout switching
// const LayoutSwitch = styled(Box)(({ theme }) => ({
//  display: "flex",
//  gap: theme.spacing(0.5),
// }));

// const LayoutButton = styled(IconButton)(({ theme, active }) => ({
//  padding: theme.spacing(0.5),
//  border: `1px solid ${theme.palette.divider}`,
//  backgroundColor: active ? theme.palette.action.selected : "transparent",
//  "&:hover": {
//   backgroundColor: theme.palette.action.hover,
//  },
// }));

// // Styled components for the product item
// const ProductItem = styled(Box)(({ theme }) => ({
//  position: "relative",
//  border: `1px solid ${theme.palette.divider}`,
//  borderRadius: theme.shape.borderRadius,
//  overflow: "hidden",
// }));

// const ProductImageWrapper = styled(Box)({
//  position: "relative",
//  width: "100%",
//  aspectRatio: "2/3", // Based on the data-style attribute
//  overflow: "hidden",
// });

// const ProductImage = styled("img")({
//  width: "100%",
//  height: "100%",
//  objectFit: "cover",
//  transition: "opacity 0.3s ease-in-out",
// });

// const ProductHoverImage = styled("img")({
//  position: "absolute",
//  top: 0,
//  left: 0,
//  width: "100%",
//  height: "100%",
//  objectFit: "cover",
//  opacity: 0,
//  transition: "opacity 0.3s ease-in-out",
//  "&:hover": {
//   opacity: 1,
//  },
// });

// const ProductInfo = styled(Box)(({ theme }) => ({
//  padding: theme.spacing(1.5),
// }));

// const ProductTitle = styled(Typography)(({ theme }) => ({
//  fontWeight: theme.typography.fontWeightMedium,
//  marginBottom: theme.spacing(0.5),
// }));

// const ProductPrice = styled(Typography)(({ theme }) => ({
//  color: theme.palette.primary.main,
//  fontWeight: theme.typography.fontWeightBold,
//  marginBottom: theme.spacing(1),
// }));

// const ProductActions = styled(Box)(({ theme }) => ({
//  display: "flex",
//  gap: theme.spacing(0.5),
//  marginTop: theme.spacing(1),
// }));

// const ActionButton = styled(IconButton)(({ theme }) => ({
//  padding: theme.spacing(0.75),
//  border: `1px solid ${theme.palette.divider}`,
//  borderRadius: theme.shape.borderRadius,
//  "&:hover": {
//   backgroundColor: theme.palette.action.hover,
//  },
// }));

// const SortByDropdown = styled(FormControl)(({ theme }) => ({
//  margin: theme.spacing(1),
//  minWidth: 120,
// }));

// const DropdownButton = styled(Button)(({ theme }) => ({
//  display: "flex",
//  alignItems: "center",
//  gap: theme.spacing(0.5),
//  padding: theme.spacing(1),
//  border: `1px solid ${theme.palette.divider}`,
//  borderRadius: theme.shape.borderRadius,
// }));

// const DropdownMenu = styled(Box)(({ theme }) => ({
//  position: "absolute",
//  top: "100%",
//  right: 0,
//  zIndex: 1,
//  backgroundColor: theme.palette.background.paper,
//  border: `1px solid ${theme.palette.divider}`,
//  borderRadius: theme.shape.borderRadius,
//  marginTop: theme.spacing(0.5),
//  minWidth: "100%",
//  boxShadow: theme.shadows[2],
// }));

// const DropdownMenuItem = styled(MenuItem)(({ theme }) => ({
//  padding: theme.spacing(1.5),
//  "&:hover": {
//   backgroundColor: theme.palette.action.hover,
//  },
// }));

// // Styled components for Load More section
// const LoadMoreWrapper = styled(Box)(({ theme }) => ({
//  textAlign: "center",
//  padding: theme.spacing(2),
// }));
