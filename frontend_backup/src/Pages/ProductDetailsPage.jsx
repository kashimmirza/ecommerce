/** @format */

// /** @format */
/** @format */

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom"; // Import useParams and useLocation
import axios from "axios"; // Import axios for API calls
import "./CSS/ProductDetails.css";
import {
 Container,
 Grid,
 Typography,
 Box,
 Button,
 Divider,
 IconButton,
 Rating,
 Table,
 TableBody,
 TableCell,
 TableContainer,
 TableHead,
 TableRow,
 Paper,
 Drawer,
 List,
 ListItem,
 ListItemIcon,
 ListItemText,
 Collapse,
 Card,
 CardMedia,
 CardContent,
 Breadcrumbs,
 Link,
 TextField,
 ToggleButton,
 ToggleButtonGroup,
 Tooltip,
 Fade,
 Popper,
 CircularProgress, // For loading indicator
 Alert, // For error messages
} from "@mui/material";
import {
 Add as AddIcon,
 Remove as RemoveIcon,
 ShoppingCart as ShoppingCartIcon,
 Favorite as FavoriteIcon,
 Compare as CompareIcon,
 ExpandMore as ExpandMoreIcon,
 ExpandLess as ExpandLessIcon,
 NavigateBefore as NavigateBeforeIcon,
 NavigateNext as NavigateNextIcon,
 ChevronRight as ChevronRightIcon,
 GridView as GridViewIcon,
 ZoomIn as ZoomInIcon,
} from "@mui/icons-material";

import StickyAddToCart from "./StickyAddToCart";

// Payment methods images (kept as mock for now, adjust as needed)
const paymentMethods = [
 { name: "COD", image: "/api/placeholder/40/20" },
 { name: "VISA", image: "/api/placeholder/40/20" },
 { name: "Mastercard", image: "/api/placeholder/40/20" },
 { name: "DBBL NEXUS", image: "/api/placeholder/40/20" },
 { name: "bKash", image: "/api/placeholder/40/20" },
 { name: "Nagad", image: "/api/placeholder/40/20" },
];

// Image Zoom Component (retained as is)
const ImageZoom = ({ src, alt }) => {
 const [isHovering, setIsHovering] = useState(false);
 const [transformOrigin, setTransformOrigin] = useState("center center");
 const imageRef = useRef(null);

 const zoomLevel = 2; // Magnify level from data-zoom-options
 const zoomType = "inner"; // from data-zoom-options

 const handleMouseMove = (e) => {
  const rect = imageRef.current.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const percentX = (x / rect.width) * 100;
  const percentY = (y / rect.height) * 100;

  setTransformOrigin(`${percentX}% ${percentY}%`);
 };

 return (
  <Box
   ref={imageRef}
   className="is-zoom-type__inner is-zoom-enabled is--zoom_tp_inner"
   data-t4s-zoom-main=""
   data-zoom-options={JSON.stringify({
    type: "inner",
    magnify: zoomLevel,
    touch: false,
    pr_type: "1",
    isZoomPR: true,
   })}
   onMouseEnter={() => setIsHovering(true)}
   onMouseLeave={() => setIsHovering(false)}
   onMouseMove={handleMouseMove}
   sx={{
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    cursor: isHovering ? "zoom-in" : "default",
   }}
  >
   <Box
    component="img"
    src={src}
    alt={alt}
    sx={{
     width: "100%",
     height: "100%",
     objectFit: "contain",
     transition: "transform 0.2s ease-in-out",
     transformOrigin: transformOrigin,
     transform: isHovering ? `scale(${zoomLevel})` : "scale(1)",
    }}
   />
  </Box>
 );
};

const ProductDetailsPage = () => {
 const { productId } = useParams(); // Get productId from URL parameters
 const location = useLocation(); // Get location object to access state
 const productDataFromGrid = location.state?.productDetails; // Product object from ProductGridPage
 const preOrderIntent = location.state?.preOrderIntent || false; // Pre-order flag

 const [product, setProduct] = useState(productDataFromGrid || null);
 const [loading, setLoading] = useState(!productDataFromGrid); // Set loading true if product not passed
 const [error, setError] = useState(null);

 const [selectedImage, setSelectedImage] = useState(
  productDataFromGrid?.primaryImages?.[0] || "",
 );
 const [quantity, setQuantity] = useState(1);
 const [selectedSize, setSelectedSize] = useState(""); // Initialize empty, will set based on fetched data
 const [descriptionOpen, setDescriptionOpen] = useState(true);
 const [reviewsOpen, setReviewsOpen] = useState(false);
 const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
 const [hoveredProduct, setHoveredProduct] = useState(null);
 const navigate = useNavigate();
 const handleBuyItNow = () => {
  navigate("/paymentgateway"); // Navigate to the payment gateway route
 };
 // --- Fetch Product Data if not passed from Grid Page ---
 useEffect(() => {
  // If product data wasn't passed via location.state, fetch it using productId
  if (!product && productId) {
   const fetchProductDetails = async () => {
    setLoading(true);
    setError(null);
    try {
     const response = await axios.get(
      `https://localhost:7142/api/Product/GetProductById/${productId}`,
     );
     const fetchedProduct = response.data;
     setProduct(fetchedProduct);
     setSelectedImage(fetchedProduct.primaryImages?.[0] || "");
     // Set a default size if available in the fetched product
     if (fetchedProduct.sizes && fetchedProduct.sizes.length > 0) {
      setSelectedSize(fetchedProduct.sizes[0]);
     }
    } catch (err) {
     console.error("Error fetching product details:", err);
     setError("Failed to load product details. Please try again.");
    } finally {
     setLoading(false);
    }
   };
   fetchProductDetails();
  } else if (productDataFromGrid) {
   // If product data was passed, ensure initial states are set
   setSelectedImage(productDataFromGrid.primaryImages?.[0] || "");
   if (productDataFromGrid.sizes && productDataFromGrid.sizes.length > 0) {
    setSelectedSize(productDataFromGrid.sizes[0]);
   }
  }
 }, [productId, product, productDataFromGrid]);

 // Handle image navigation (Next/Prev)
 const handleImageNavigation = useCallback(
  (direction) => {
   if (!product || !product.primaryImages) return;

   const currentImageIndex = product.primaryImages.indexOf(selectedImage);
   let newIndex;

   if (direction === "next") {
    newIndex = (currentImageIndex + 1) % product.primaryImages.length;
   } else {
    newIndex =
     (currentImageIndex - 1 + product.primaryImages.length) %
     product.primaryImages.length;
   }
   setSelectedImage(product.primaryImages[newIndex]);
  },
  [product, selectedImage],
 );

 const handleSizeChange = (event, newSize) => {
  if (newSize !== null) {
   setSelectedSize(newSize);
  }
 };

 const handleQuantityChange = (amount) => {
  const newQuantity = quantity + amount;
  if (newQuantity > 0) {
   setQuantity(newQuantity);
  }
 };

 const handleAddToCartOrPreorder = () => {
  // Check if the product is in stock based on fetched data
  const isInStock = product?.is_In_Stock?.toLowerCase() === "true";

  if (isInStock) {
   // Logic for adding to cart
   console.log(
    `Adding ${quantity} of ${product.title} (Size: ${selectedSize}) to cart.`,
   );
   setCartDrawerOpen(true); // Open cart drawer on successful add
   // Here you would typically dispatch an action to a global state (e.g., Redux, Context API)
   // or make an API call to add the item to the user's cart.
  } else {
   // Logic for pre-ordering
   console.log(
    `Pre-ordering ${quantity} of ${product.title} (Size: ${selectedSize}).`,
   );
   // This could involve a different API call, showing a pre-order confirmation modal,
   // or redirecting to a pre-order specific checkout flow.
   alert(`You are pre-ordering ${product.title}. Thank you!`);
  }
 };

 const toggleDescription = () => {
  setDescriptionOpen(!descriptionOpen);
 };

 const toggleReviews = () => {
  setReviewsOpen(!reviewsOpen);
 };

 // --- Loading and Error States ---
 if (loading) {
  return (
   <Container maxWidth="lg" sx={{ mt: 8, textAlign: "center" }}>
    <CircularProgress />
    <Typography variant="h6" sx={{ mt: 2 }}>
     Loading product details...
    </Typography>
   </Container>
  );
 }

 if (error) {
  return (
   <Container maxWidth="lg" sx={{ mt: 8 }}>
    <Alert severity="error">{error}</Alert>
    <Typography variant="body1" sx={{ mt: 2 }}>
     We could not load this product. Please try again later.
    </Typography>
   </Container>
  );
 }

 if (!product) {
  // This case should ideally be handled by the error state if fetching failed,
  // but as a safety, if no product is available after loading.
  return (
   <Container maxWidth="lg" sx={{ mt: 8, textAlign: "center" }}>
    <Typography variant="h6">Product not found.</Typography>
    <Button
     variant="contained"
     sx={{ mt: 2 }}
     onClick={() => window.history.back()}
    >
     Go Back
    </Button>
   </Container>
  );
 }

 // Determine stock status dynamically
 const isInStock =
  product.is_In_Stock && product.is_In_Stock.toLowerCase() === "true";

 // Mock related and recent products (you'd typically fetch these based on product category/tags)
 const relatedProducts = [
  {
   id: 1,
   name: "Printed co-orded",
   price: "Tk 2,695.00 BDT",
   image:
    "https://blucheez.fashion/cdn/shop/files/314.webp?v=1740835584&width=1200",
  },
  {
   id: 2,
   name: "Printed corderd",
   price: "Tk 2,695.00 BDT",
   image:
    "https://blucheez.fashion/cdn/shop/files/376.webp?v=1740565920&width=1200",
  },
  // ... more related products
 ];

 const resentProducts = [
  {
   id: 1,
   name: "Exclusive Earring",
   price: "Tk 2,695.00 BDT",
   image:
    "https://blucheez.fashion/cdn/shop/files/BER-019-SILV.webp?v=1742814492&width=1600",
  },
  {
   id: 2,
   name: "Men's Polo Shirt",
   price: "Tk 2,695.00 BDT",
   image:
    "https://blucheez.fashion/cdn/shop/files/DSCF2937copy.webp?v=1729090478&width=1600",
  },
  // ... more recently viewed products
 ];

 return (
  <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
   {/* Breadcrumbs */}
   <Breadcrumbs
    separator={<ChevronRightIcon fontSize="small" />}
    sx={{ mb: 2 }}
   >
    <Link underline="hover" color="inherit" href="/">
     Home
    </Link>
    {/* Dynamic breadcrumb based on product category/title */}
    {product.category && (
     <Link
      underline="hover"
      color="inherit"
      href={`/products?category=${product.category}`}
     >
      {product.category}
     </Link>
    )}
    <Typography color="text.primary">{product.title}</Typography>
   </Breadcrumbs>

   <Grid container spacing={4}>
    {/* Left Column - Images */}
    <Grid item xs={12} md={6}>
     <Box
      sx={{
       display: "flex",
       flexDirection: { xs: "column-reverse", sm: "row" },
      }}
     >
      {/* Thumbnails */}
      <Box
       sx={{
        display: "flex",
        flexDirection: { xs: "row", sm: "column" },
        mr: { xs: 0, sm: 2 },
        mt: { xs: 2, sm: 0 },
        gap: 1,
       }}
      >
       {product.allImages && product.allImages.length > 0
        ? product.allImages.map((thumb, index) => (
           <Box
            key={index}
            component="img"
            src={thumb}
            alt={`${product.title} Thumbnail ${index + 1}`}
            sx={{
             width: { xs: 60, sm: 80 },
             height: { xs: 80, sm: 100 },
             border: "1px solid #e0e0e0",
             cursor: "pointer",
             "&:hover": { border: "1px solid #1976d2" },
             borderColor: selectedImage === thumb ? "primary.main" : "#e0e0e0", // Highlight selected thumbnail
            }}
            onClick={() => setSelectedImage(thumb)}
           />
          ))
        : product.primaryImages &&
          product.primaryImages.length > 0 &&
          // Fallback to primaryImages if allImages is not available
          product.primaryImages.map((thumb, index) => (
           <Box
            key={index}
            component="img"
            src={thumb}
            alt={`${product.title} Thumbnail ${index + 1}`}
            sx={{
             width: { xs: 60, sm: 80 },
             height: { xs: 80, sm: 100 },
             border: "1px solid #e0e0e0",
             cursor: "pointer",
             "&:hover": { border: "1px solid #1976d2" },
             borderColor: selectedImage === thumb ? "primary.main" : "#e0e0e0",
            }}
            onClick={() => setSelectedImage(thumb)}
           />
          ))}
      </Box>

      {/* Main Image with Zoom */}
      <Box
       sx={{
        position: "relative",
        width: "100%",
       }}
      >
       <ImageZoom src={selectedImage} alt={product.title} />
       <IconButton
        sx={{
         position: "absolute",
         left: 8,
         top: "50%",
         transform: "translateY(-50%)",
         bgcolor: "background.paper",
         "&:hover": { bgcolor: "grey.200" },
        }}
        onClick={() => handleImageNavigation("prev")}
        aria-label="Previous image"
       >
        <NavigateBeforeIcon />
       </IconButton>
       <IconButton
        sx={{
         position: "absolute",
         right: 8,
         top: "50%",
         transform: "translateY(-50%)",
         bgcolor: "background.paper",
         "&:hover": { bgcolor: "grey.200" },
        }}
        onClick={() => handleImageNavigation("next")}
        aria-label="Next image"
       >
        <NavigateNextIcon />
       </IconButton>
      </Box>
     </Box>
    </Grid>

    {/* Right Column - Product Info */}
    <Grid item xs={12} md={6}>
     <Typography variant="h4" component="h1" gutterBottom>
      {product.title}
     </Typography>
     <Typography variant="h5" color="primary" gutterBottom>
      Tk {product.newPrice?.toLocaleString()} BDT
     </Typography>

     <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Rating value={product.rating || 0} precision={0.5} readOnly />
      <Typography variant="body2" sx={{ ml: 1 }}>
       {product.reviews || 0} reviews
      </Typography>
     </Box>

     <Typography variant="body2" color="text.secondary" paragraph>
      {product.description?.substring(0, 150)}...
      {product.description?.length > 150 && (
       <Link href="#" underline="hover" sx={{ ml: 1 }}>
        Read more
       </Link>
      )}
     </Typography>

     {/* Color Selection */}
     {product.color && (
      <Box sx={{ mb: 3 }}>
       <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
        COLOR: {product.color}
       </Typography>
       <Box
        sx={{
         width: 40,
         height: 40,
         border: "1px solid #e0e0e0",
         borderRadius: 1,
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
        }}
       >
        <Box
         sx={{
          // This color representation is hardcoded.
          // You might need a more robust way to map color names to actual CSS colors or patterns.
          background:
           product.color.toLowerCase().includes("white") &&
           product.color.toLowerCase().includes("blue")
            ? "linear-gradient(to bottom, white 33%, lightblue 33%, blue 100%)"
            : product.color.toLowerCase() === "red"
            ? "red"
            : "grey", // Default if no specific mapping
          width: 30,
          height: 30,
          borderRadius: 0.5,
         }}
        />
       </Box>
      </Box>
     )}

     {/* Size Selection */}
     {product.sizes && product.sizes.length > 0 && (
      <Box sx={{ mb: 3 }}>
       <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
        SIZE: {selectedSize}
       </Typography>
       <ToggleButtonGroup
        value={selectedSize}
        exclusive
        onChange={handleSizeChange}
        aria-label="size selection"
       >
        {product.sizes.map((size) => (
         <ToggleButton
          key={size}
          value={size}
          sx={{
           px: 2,
           py: 1,
           border: "1px solid #e0e0e0",
           "&.Mui-selected": {
            bgcolor: "grey.800",
            color: "white",
            "&:hover": {
             bgcolor: "grey.700",
            },
           },
          }}
         >
          {size}
         </ToggleButton>
        ))}
       </ToggleButtonGroup>
      </Box>
     )}

     {/* Quantity and Add to Cart/Pre-order */}
     <Box
      sx={{
       display: "flex",
       alignItems: "center",
       mb: 3,
       gap: 2,
      }}
     >
      <Box
       sx={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #e0e0e0",
        borderRadius: 1,
       }}
      >
       <IconButton onClick={() => handleQuantityChange(-1)}>
        <RemoveIcon />
       </IconButton>
       <TextField
        variant="standard"
        value={quantity}
        InputProps={{
         readOnly: true,
         disableUnderline: true,
         sx: { textAlign: "center", width: "40px" },
        }}
       />
       <IconButton onClick={() => handleQuantityChange(1)}>
        <AddIcon />
       </IconButton>
      </Box>

      <Button
       variant="contained"
       color={isInStock ? "error" : "primary"} // Different color for pre-order
       fullWidth
       startIcon={<ShoppingCartIcon />}
       onClick={handleAddToCartOrPreorder}
       sx={{
        py: 1.5,
        textTransform: "uppercase",
        fontWeight: "bold",
       }}
      >
       {isInStock
        ? "Add to Cart"
        : preOrderIntent
        ? "Pre-order Now"
        : "Pre-order"}
      </Button>

      <IconButton sx={{ border: "1px solid #e0e0e0" }}>
       <FavoriteIcon />
      </IconButton>

      <IconButton sx={{ border: "1px solid #e0e0e0" }}>
       <CompareIcon />
      </IconButton>
     </Box>

     <Button
      variant="contained"
      color="primary"
      fullWidth
      sx={{
       py: 1.5,
       bgcolor: "#212121",
       "&:hover": { bgcolor: "#000000" },
       mb: 3,
       textTransform: "uppercase",
       fontWeight: "bold",
      }}
      onClick={handleBuyItNow}
     >
      Buy It Now
     </Button>

     {/* Payment Methods */}
     <Box
      sx={{
       mb: 3,
       display: "flex",
       alignItems: "center",
       flexWrap: "wrap",
       gap: 2,
      }}
     >
      {paymentMethods.map((method, index) => (
       <Box
        key={index}
        component="img"
        src={method.image}
        alt={method.name}
        sx={{ height: 30 }}
       />
      ))}
     </Box>

     <Box sx={{ mb: 2 }}>
      <Typography variant="body2" color="text.secondary">
       SKU: {product.sku}
      </Typography>
      <Typography variant="body2" color="text.secondary">
       Barcode: {product.barcode}
      </Typography>
      <Box sx={{ mt: 2 }}>
       <Button variant="text" color="primary">
        Ask a Question
       </Button>
      </Box>
     </Box>

     {/* Collapse Sections */}
     <Paper variant="outlined" sx={{ mb: 2 }}>
      <ListItem button onClick={toggleDescription}>
       <ListItemText primary="Description & Size Chart" />
       {descriptionOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={descriptionOpen} timeout="auto" unmountOnExit>
       <Box sx={{ p: 3 }}>
        <Typography variant="body2" paragraph>
         {product.description}
        </Typography>

        <Typography
         variant="subtitle2"
         gutterBottom
         sx={{ fontWeight: "bold", mt: 2 }}
        >
         Note:
        </Typography>
        <Typography variant="body2" paragraph>
         Final color of the product may vary slightly due to the variation of
         the light source & the photo device.
        </Typography>

        {product.material && (
         <>
          <Typography
           variant="subtitle2"
           gutterBottom
           sx={{ fontWeight: "bold", mt: 2 }}
          >
           Material
          </Typography>
          <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
           <li>{product.material}</li>
          </Typography>
         </>
        )}

        {product.fit && (
         <>
          <Typography
           variant="subtitle2"
           gutterBottom
           sx={{ fontWeight: "bold", mt: 2 }}
          >
           Fit
          </Typography>
          <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
           <li>{product.fit}</li>
          </Typography>
         </>
        )}

        {product.careInstructions && product.careInstructions.length > 0 && (
         <>
          <Typography
           variant="subtitle2"
           gutterBottom
           sx={{ fontWeight: "bold", mt: 2 }}
          >
           Care Instructions
          </Typography>
          <Typography variant="body2" component="ul" sx={{ pl: 2, mt: 2 }}>
           {product.careInstructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
           ))}
          </Typography>
         </>
        )}

        {product.sizeChart && product.sizes && product.sizes.length > 0 && (
         <>
          <Typography
           variant="subtitle2"
           gutterBottom
           sx={{ fontWeight: "bold", mt: 2 }}
          >
           Size Chart
          </Typography>
          <TableContainer component={Paper} variant="outlined" sx={{ mt: 2 }}>
           <Table size="small">
            <TableHead>
             <TableRow>
              <TableCell>Size (Inch)</TableCell>
              {product.sizes.map((size) => (
               <TableCell key={size} align="center">
                {size}
               </TableCell>
              ))}
             </TableRow>
            </TableHead>
            <TableBody>
             {product.sizeChart.chest && (
              <TableRow>
               <TableCell>Chest</TableCell>
               {product.sizes.map((size) => (
                <TableCell key={size} align="center">
                 {product.sizeChart.chest[size]}
                </TableCell>
               ))}
              </TableRow>
             )}
             {product.sizeChart.fullLength && (
              <TableRow>
               <TableCell>Full length</TableCell>
               {product.sizes.map((size) => (
                <TableCell key={size} align="center">
                 {product.sizeChart.fullLength[size]}
                </TableCell>
               ))}
              </TableRow>
             )}
             {product.sizeChart.sleeve && (
              <TableRow>
               <TableCell>Sleeve</TableCell>
               {product.sizes.map((size) => (
                <TableCell key={size} align="center">
                 {product.sizeChart.sleeve[size]}
                </TableCell>
               ))}
              </TableRow>
             )}
            </TableBody>
           </Table>
          </TableContainer>
         </>
        )}
       </Box>
      </Collapse>
     </Paper>

     <Paper variant="outlined" sx={{ mb: 2 }}>
      <ListItem button onClick={toggleReviews}>
       <ListItemText primary="Reviews" />
       {reviewsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={reviewsOpen} timeout="auto" unmountOnExit>
       <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
         Customer Reviews
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
         <Rating value={product.rating || 0} precision={0.5} readOnly />
         <Typography variant="body2" sx={{ ml: 1 }}>
          Based on {product.reviews || 0} reviews
         </Typography>
         <Button variant="outlined" sx={{ ml: "auto" }}>
          Write a review
         </Button>
        </Box>

        {/* Review bars */}
        {[5, 4, 3, 2, 1].map((star) => (
         <Box key={star} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", width: 100 }}>
           <Rating value={star} readOnly size="small" />
          </Box>
          <Box
           sx={{
            width: "100%",
            mr: 2,
            bgcolor: "grey.200",
            height: 8,
            borderRadius: 1,
            position: "relative",
           }}
          >
           <Box
            sx={{
             width: `${product.reviewStats?.[star]?.percentage || 0}%`,
             bgcolor: "#FFD700",
             height: "100%",
             borderRadius: 1,
            }}
           />
          </Box>
          <Typography
           variant="body2"
           color="text.secondary"
           sx={{ minWidth: 90 }}
          >
           {product.reviewStats?.[star]?.percentage || 0}% (
           {product.reviewStats?.[star]?.count || 0})
          </Typography>
         </Box>
        ))}

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
         <Box
          sx={{
           border: "1px solid #e0e0e0",
           borderRadius: 1,
           display: "flex",
           alignItems: "center",
           px: 1,
          }}
         >
          <Typography variant="body2">Most Recent</Typography>
          <ExpandMoreIcon fontSize="small" />
         </Box>
        </Box>
       </Box>
      </Collapse>
     </Paper>

     <Box sx={{ mt: 3 }}>
      <Typography variant="body2">SKU: {product.sku}</Typography>
      <Typography variant="body2">Barcode: {product.barcode}</Typography>
      <Box sx={{ mt: 2 }}>
       <Button variant="text" color="primary">
        Ask a Question
       </Button>
      </Box>
     </Box>
    </Grid>
   </Grid>

   {/* You May Also Like Section */}
   <Box sx={{ mt: 8 }}>
    <Typography variant="h5" align="center" gutterBottom>
     You may also like
    </Typography>
    <Divider sx={{ mb: 4 }} />
    <Grid container spacing={3}>
     {relatedProducts.map(
      (
       p, // Renamed to 'p' to avoid conflict with 'product' state
      ) => (
       <Grid item xs={6} md={3} key={p.id}>
        <Card sx={{ border: "1px solid #e0e0e0", boxShadow: "none" }}>
         <CardMedia component="img" height="200" image={p.image} alt={p.name} />
         <CardContent>
          <Typography variant="subtitle1" gutterBottom>
           {p.name}
          </Typography>
          <Typography variant="body2" color="primary">
           {p.price}
          </Typography>
         </CardContent>
        </Card>
       </Grid>
      ),
     )}
    </Grid>
   </Box>

   {/* You recently viewed Section */}
   <Box sx={{ mt: 8, position: "relative" }}>
    <Typography variant="h5" align="center" gutterBottom>
     RECENTLY VIEWED PRODUCT
    </Typography>
    <Divider sx={{ mb: 4 }} />
    <Grid container spacing={3}>
     {resentProducts.map((p) => (
      <Grid
       item
       xs={6}
       md={3}
       key={p.id}
       onMouseEnter={() => setHoveredProduct(p)}
       onMouseLeave={() => setHoveredProduct(null)}
       sx={{ position: "relative" }}
      >
       <Card sx={{ border: "1px solid #e0e0e0", boxShadow: "none" }}>
        <CardMedia component="img" height="200" image={p.image} alt={p.name} />
        <CardContent>
         <Typography variant="subtitle1" gutterBottom>
          {p.name}
         </Typography>
         <Typography variant="body2" color="primary">
          {p.price}
         </Typography>
        </CardContent>
       </Card>

       {/* Hover Popup Card */}
       {hoveredProduct?.id === p.id && (
        <Box
         sx={{
          position: "absolute",
          top: "100%",
          left: 0,
          zIndex: 10,
          backgroundColor: "#fff",
          boxShadow: 3,
          mt: 1,
          width: "100%",
         }}
        >
         {/* Assuming StickyAddToCart can take product as prop */}
         <StickyAddToCart product={hoveredProduct} />
        </Box>
       )}
      </Grid>
     ))}
    </Grid>
   </Box>

   {/* Cart Drawer */}
   <Drawer
    anchor="right"
    open={cartDrawerOpen}
    onClose={() => setCartDrawerOpen(false)}
   >
    <Box sx={{ width: 350, p: 2 }}>
     <Box
      sx={{
       display: "flex",
       justifyContent: "space-between",
       alignItems: "center",
       mb: 2,
      }}
     >
      <Typography variant="h6">Shopping Cart</Typography>
      <IconButton onClick={() => setCartDrawerOpen(false)}>
       <NavigateNextIcon />
      </IconButton>
     </Box>
     <Divider sx={{ mb: 2 }} />

     <Box sx={{ display: "flex", mb: 2 }}>
      <Box
       component="img"
       src={product.primaryImages?.[0]} // Use actual product image
       alt={product.title}
       sx={{ width: 80, height: 80, border: "1px solid #e0e0e0" }}
      />
      <Box sx={{ ml: 2 }}>
       <Typography variant="subtitle2">{product.title}</Typography>
       <Typography variant="body2">
        {product.color} / {selectedSize}
       </Typography>
       <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
        <Typography variant="body2">Qty: {quantity}</Typography>
        <Typography variant="body2" sx={{ ml: 2, fontWeight: "bold" }}>
         Tk {product.newPrice?.toLocaleString()} BDT
        </Typography>
       </Box>
      </Box>
     </Box>

     <Divider sx={{ my: 2 }} />

     <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
      <Typography variant="subtitle2">Subtotal:</Typography>
      <Typography variant="subtitle2">
       Tk {(product.newPrice * quantity)?.toLocaleString()} BDT
      </Typography>
     </Box>

     <Button variant="contained" color="error" fullWidth sx={{ mb: 2 }}>
      Checkout
     </Button>

     <Button
      variant="outlined"
      fullWidth
      onClick={() => setCartDrawerOpen(false)}
     >
      Continue Shopping
     </Button>
    </Box>
   </Drawer>
  </Container>
 );
};

export default ProductDetailsPage;

// import React, { useState, useRef, useEffect } from "react";
// import "./CSS/ProductDetails.css";
// import {
//  Container,
//  Grid,
//  Typography,
//  Box,
//  Button,
//  Divider,
//  IconButton,
//  Rating,
//  Table,
//  TableBody,
//  TableCell,
//  TableContainer,
//  TableHead,
//  TableRow,
//  Paper,
//  Drawer,
//  List,
//  ListItem,
//  ListItemIcon,
//  ListItemText,
//  Collapse,
//  Card,
//  CardMedia,
//  CardContent,
//  Breadcrumbs,
//  Link,
//  TextField,
//  ToggleButton,
//  ToggleButtonGroup,
//  Tooltip,
//  Fade,
//  Popper,
// } from "@mui/material";
// import {
//  Add as AddIcon,
//  Remove as RemoveIcon,
//  ShoppingCart as ShoppingCartIcon,
//  Favorite as FavoriteIcon,
//  Compare as CompareIcon,
//  ExpandMore as ExpandMoreIcon,
//  ExpandLess as ExpandLessIcon,
//  NavigateBefore as NavigateBeforeIcon,
//  NavigateNext as NavigateNextIcon,
//  ChevronRight as ChevronRightIcon,
//  GridView as GridViewIcon,
//  ZoomIn as ZoomInIcon,
// } from "@mui/icons-material";

// import StickyAddToCart from "./StickyAddToCart";

// // Mock data
// const productData = {
//  name: "Men's Polo Shirt",
//  price: "Tk 2,695.00 BDT",
//  rating: 4.5,
//  reviews: 2,
//  description:
//   "The Engineered Stripe Polo is a premium essential, crafted for the discerning gentleman. Made using a specialized yarn-dyed auto-striper knitting machine, this unique fabric offers a level of precision that standard machines simply can't achieve. With its refined horizontal stripes in soft pastel tones, this polo combines superior craftsmanship and exceptional comfort, making it perfect for any daytime occasion. Versatile in nature, it effortlessly transitions from casual outings to sportswear like golf, making it a multifunctional piece. Delicately constructed, this high-quality polo shirt is a standout in any wardrobe.",
//  colors: ["White & Blue"],
//  sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
//  material: "80% COTTON / 17% POLYESTER / 3% SPANDEX",
//  fit: "Regular",
//  careInstructions: [
//   "Hand Wash",
//   "Cool Iron",
//   "Do Not Bleach",
//   "Do Not Tumble Dry",
//   "Wash Separately",
//  ],
//  sku: "IMC-FL53-MPS-026",
//  barcode: "A011963",
//  sizeChart: {
//   chest: {
//    S: "40",
//    M: "42",
//    L: "44",
//    XL: "46",
//    XXL: "47",
//    XXXL: "48",
//   },
//   fullLength: {
//    S: "28.5",
//    M: "29",
//    L: "29.5",
//    XL: "30.5",
//    XXL: "31",
//    XXXL: "31.5",
//   },
//   sleeve: {
//    S: "8.5",
//    M: "9",
//    L: "9",
//    XL: "9.5",
//    XXL: "9.5",
//    XXXL: "10",
//   },
//  },
//  reviewStats: {
//   5: { count: 1, percentage: 50 },
//   4: { count: 1, percentage: 50 },
//   3: { count: 0, percentage: 0 },
//   2: { count: 0, percentage: 0 },
//   1: { count: 0, percentage: 0 },
//  },
// };

// // Sample images
// const mainImage =
//  "https://blucheez.fashion/cdn/shop/files/DSCF2937copy.webp?v=1729090478&width=120";
// const thumbnails = [
//  "https://blucheez.fashion/cdn/shop/files/DSCF2937copy.webp?v=1729090478&width=120",
//  "https://blucheez.fashion/cdn/shop/files/DSCF2941copy.webp?v=1729090477&width=180",
//  "https://blucheez.fashion/cdn/shop/files/DSCF2972copy.webp?v=1729090477&width=180",
//  "https://blucheez.fashion/cdn/shop/files/DSCF2931copy.webp?v=1729090477&width=180",
//  "https://blucheez.fashion/cdn/shop/files/DSCF2939copy.webp?v=1729090477&width=180",
//  "https://blucheez.fashion/cdn/shop/files/324_27a1ab5e-26c2-4ded-a94e-ee6825363b72.webp?v=1740898644&width=1200",
// ];

// const relatedProducts = [
//  {
//   id: 1,
//   name: "Printed co-orded",
//   price: "Tk 2,695.00 BDT",
//   image:
//    "https://blucheez.fashion/cdn/shop/files/314.webp?v=1740835584&width=1200",
//  },
//  {
//   id: 2,
//   name: "Printed corderd",
//   price: "Tk 2,695.00 BDT",
//   image:
//    "https://blucheez.fashion/cdn/shop/files/376.webp?v=1740565920&width=1200",
//  },
//  {
//   id: 3,
//   name: "Exclusive Earring",
//   price: "Tk 2,695.00 BDT",
//   image:
//    "https://blucheez.fashion/cdn/shop/files/BER-019-SILV.webp?v=1742814492&width=1600",
//  },
//  {
//   id: 4,
//   name: "Men's Polo Shirt",
//   price: "Tk 2,695.00 BDT",
//   image:
//    "https://blucheez.fashion/cdn/shop/files/DSCF2937copy.webp?v=1729090478&width=1600",
//  },
// ];

// const resentProducts = [
//  {
//   id: 1,
//   name: "Printed co-orded",
//   price: "Tk 2,695.00 BDT",
//   image:
//    "https://blucheez.fashion/cdn/shop/files/314.webp?v=1740835584&width=1200",
//  },
//  {
//   id: 2,
//   name: "Printed corderd",
//   price: "Tk 2,695.00 BDT",
//   image:
//    "https://blucheez.fashion/cdn/shop/files/376.webp?v=1740565920&width=1200",
//  },
//  {
//   id: 3,
//   name: "Exclusive Earring",
//   price: "Tk 2,695.00 BDT",
//   image:
//    "https://blucheez.fashion/cdn/shop/files/BER-019-SILV.webp?v=1742814492&width=1600",
//  },
//  {
//   id: 4,
//   name: "Men's Polo Shirt",
//   price: "Tk 2,695.00 BDT",
//   image:
//    "https://blucheez.fashion/cdn/shop/files/DSCF2937copy.webp?v=1729090478&width=1600",
//  },
// ];
// // Payment methods images
// const paymentMethods = [
//  { name: "COD", image: "/api/placeholder/40/20" },
//  { name: "VISA", image: "/api/placeholder/40/20" },
//  { name: "Mastercard", image: "/api/placeholder/40/20" },
//  { name: "DBBL NEXUS", image: "/api/placeholder/40/20" },
//  { name: "bKash", image: "/api/placeholder/40/20" },
//  { name: "Nagad", image: "/api/placeholder/40/20" },
// ];

// // Image Zoom Component
// const ImageZoom = ({ src, alt }) => {
//  const [isHovering, setIsHovering] = useState(false);
//  const [transformOrigin, setTransformOrigin] = useState("center center");
//  const imageRef = useRef(null);

//  const zoomLevel = 2; // Magnify level from data-zoom-options
//  const zoomType = "inner"; // from data-zoom-options

//  const handleMouseMove = (e) => {
//   const rect = imageRef.current.getBoundingClientRect();
//   const x = e.clientX - rect.left;
//   const y = e.clientY - rect.top;

//   const percentX = (x / rect.width) * 100;
//   const percentY = (y / rect.height) * 100;

//   setTransformOrigin(`${percentX}% ${percentY}%`);
//  };

//  return (
//   <Box
//    ref={imageRef}
//    className="is-zoom-type__inner is-zoom-enabled is--zoom_tp_inner"
//    data-t4s-zoom-main=""
//    data-zoom-options={JSON.stringify({
//     type: "inner",
//     magnify: zoomLevel,
//     touch: false,
//     pr_type: "1",
//     isZoomPR: true,
//    })}
//    onMouseEnter={() => setIsHovering(true)}
//    onMouseLeave={() => setIsHovering(false)}
//    onMouseMove={handleMouseMove}
//    sx={{
//     position: "relative",
//     width: "100%",
//     height: "100%",
//     overflow: "hidden",
//     cursor: isHovering ? "zoom-in" : "default",
//    }}
//   >
//    <Box
//     component="img"
//     src={src}
//     alt={alt}
//     sx={{
//      width: "100%",
//      height: "100%",
//      objectFit: "contain",
//      transition: "transform 0.2s ease-in-out",
//      transformOrigin: transformOrigin,
//      transform: isHovering ? `scale(${zoomLevel})` : "scale(1)",
//     }}
//    />
//   </Box>
//  );
// };

// const ProductDetailsPage = () => {
//  const [selectedImage, setSelectedImage] = useState(mainImage);
//  const [quantity, setQuantity] = useState(1);
//  const [selectedSize, setSelectedSize] = useState("S");
//  const [descriptionOpen, setDescriptionOpen] = useState(true);
//  const [reviewsOpen, setReviewsOpen] = useState(false);
//  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

//  const handleSizeChange = (event, newSize) => {
//   if (newSize !== null) {
//    setSelectedSize(newSize);
//   }
//  };

//  const [hoveredProduct, setHoveredProduct] = useState(null);

//  const handleQuantityChange = (amount) => {
//   const newQuantity = quantity + amount;
//   if (newQuantity > 0) {
//    setQuantity(newQuantity);
//   }
//  };

//  const addToCart = () => {
//   // Implementation for adding to cart
//   setCartDrawerOpen(true);
//  };

//  const toggleDescription = () => {
//   setDescriptionOpen(!descriptionOpen);
//  };

//  const toggleReviews = () => {
//   setReviewsOpen(!reviewsOpen);
//  };

//  return (
//   <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
//    {/* Breadcrumbs */}
//    <Breadcrumbs
//     separator={<ChevronRightIcon fontSize="small" />}
//     sx={{ mb: 2 }}
//    >
//     <Link underline="hover" color="inherit" href="/">
//      Home
//     </Link>
//     <Link underline="hover" color="inherit" href="/polo-shirt">
//      Polo Shirt
//     </Link>
//     <Typography color="text.primary">Men's Polo Shirt</Typography>
//    </Breadcrumbs>

//    <Grid container spacing={4}>
//     {/* Left Column - Images */}
//     <Grid item xs={12} md={6}>
//      <Box
//       sx={{
//        display: "flex",
//        flexDirection: { xs: "column-reverse", sm: "row" },
//       }}
//      >
//       {/* Thumbnails */}
//       <Box
//        sx={{
//         display: "flex",
//         flexDirection: { xs: "row", sm: "column" },
//         mr: { xs: 0, sm: 2 },
//         mt: { xs: 2, sm: 0 },
//         gap: 1,
//        }}
//       >
//        {thumbnails.map((thumb, index) => (
//         <Box
//          key={index}
//          component="img"
//          src={thumb}
//          alt={`Thumbnail ${index + 1}`}
//          sx={{
//           width: { xs: 60, sm: 80 },
//           height: { xs: 80, sm: 100 },
//           border: "1px solid #e0e0e0",
//           cursor: "pointer",
//           "&:hover": { border: "1px solid #1976d2" },
//          }}
//          onClick={() => setSelectedImage(thumb)}
//         />
//        ))}
//       </Box>

//       {/* Main Image with Zoom */}
//       <Box
//        sx={{
//         position: "relative",
//         width: "100%",
//        }}
//       >
//        <ImageZoom src={selectedImage} alt="Product Main" />
//        <IconButton
//         sx={{
//          position: "absolute",
//          left: 8,
//          top: "50%",
//          transform: "translateY(-50%)",
//          bgcolor: "background.paper",
//          "&:hover": { bgcolor: "grey.200" },
//         }}
//        >
//         <NavigateBeforeIcon />
//        </IconButton>
//        <IconButton
//         sx={{
//          position: "absolute",
//          right: 8,
//          top: "50%",
//          transform: "translateY(-50%)",
//          bgcolor: "background.paper",
//          "&:hover": { bgcolor: "grey.200" },
//         }}
//        >
//         <NavigateNextIcon />
//        </IconButton>
//       </Box>
//      </Box>
//     </Grid>

//     {/* Right Column - Product Info */}
//     <Grid item xs={12} md={6}>
//      <Typography variant="h4" component="h1" gutterBottom>
//       {productData.name}
//      </Typography>
//      <Typography variant="h5" color="primary" gutterBottom>
//       {productData.price}
//      </Typography>

//      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//       <Rating value={productData.rating} precision={0.5} readOnly />
//       <Typography variant="body2" sx={{ ml: 1 }}>
//        {productData.reviews} reviews
//       </Typography>
//      </Box>

//      <Typography variant="body2" color="text.secondary" paragraph>
//       {productData.description.substring(0, 150)}...
//       <Link href="#" underline="hover" sx={{ ml: 1 }}>
//        Read more
//       </Link>
//      </Typography>

//      {/* Color Selection */}
//      <Box sx={{ mb: 3 }}>
//       <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
//        COLOR: {productData.colors[0]}
//       </Typography>
//       <Box
//        sx={{
//         width: 40,
//         height: 40,
//         border: "1px solid #e0e0e0",
//         borderRadius: 1,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//        }}
//       >
//        <Box
//         sx={{
//          background:
//           "linear-gradient(to bottom, white 33%, lightblue 33%, blue 100%)",
//          width: 30,
//          height: 30,
//          borderRadius: 0.5,
//         }}
//        />
//       </Box>
//      </Box>

//      {/* Size Selection */}
//      <Box sx={{ mb: 3 }}>
//       <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
//        SIZE: {selectedSize}
//       </Typography>
//       <ToggleButtonGroup
//        value={selectedSize}
//        exclusive
//        onChange={handleSizeChange}
//        aria-label="size selection"
//       >
//        {productData.sizes.map((size) => (
//         <ToggleButton
//          key={size}
//          value={size}
//          sx={{
//           px: 2,
//           py: 1,
//           border: "1px solid #e0e0e0",
//           "&.Mui-selected": {
//            bgcolor: "grey.800",
//            color: "white",
//            "&:hover": {
//             bgcolor: "grey.700",
//            },
//           },
//          }}
//         >
//          {size}
//         </ToggleButton>
//        ))}
//       </ToggleButtonGroup>
//      </Box>

//      {/* Quantity and Add to Cart */}
//      <Box
//       sx={{
//        display: "flex",
//        alignItems: "center",
//        mb: 3,
//        gap: 2,
//       }}
//      >
//       <Box
//        sx={{
//         display: "flex",
//         alignItems: "center",
//         border: "1px solid #e0e0e0",
//         borderRadius: 1,
//        }}
//       >
//        <IconButton onClick={() => handleQuantityChange(-1)}>
//         <RemoveIcon />
//        </IconButton>
//        <TextField
//         variant="standard"
//         value={quantity}
//         InputProps={{
//          readOnly: true,
//          disableUnderline: true,
//          sx: { textAlign: "center", width: "40px" },
//         }}
//        />
//        <IconButton onClick={() => handleQuantityChange(1)}>
//         <AddIcon />
//        </IconButton>
//       </Box>

//       <Button
//        variant="contained"
//        color="error"
//        fullWidth
//        startIcon={<ShoppingCartIcon />}
//        onClick={addToCart}
//        sx={{
//         py: 1.5,
//         textTransform: "uppercase",
//         fontWeight: "bold",
//        }}
//       >
//        Add to Cart
//       </Button>

//       <IconButton sx={{ border: "1px solid #e0e0e0" }}>
//        <FavoriteIcon />
//       </IconButton>

//       <IconButton sx={{ border: "1px solid #e0e0e0" }}>
//        <CompareIcon />
//       </IconButton>
//      </Box>

//      <Button
//       variant="contained"
//       color="primary"
//       fullWidth
//       sx={{
//        py: 1.5,
//        bgcolor: "#212121",
//        "&:hover": { bgcolor: "#000000" },
//        mb: 3,
//        textTransform: "uppercase",
//        fontWeight: "bold",
//       }}
//      >
//       Buy It Now
//      </Button>

//      {/* Payment Methods */}
//      <Box
//       sx={{
//        mb: 3,
//        display: "flex",
//        alignItems: "center",
//        flexWrap: "wrap",
//        gap: 2,
//       }}
//      >
//       {paymentMethods.map((method, index) => (
//        <Box
//         key={index}
//         component="img"
//         src={method.image}
//         alt={method.name}
//         sx={{ height: 30 }}
//        />
//       ))}
//      </Box>

//      <Box sx={{ mb: 2 }}>
//       <Typography variant="body2" color="text.secondary">
//        Merchant No: 01713299754
//       </Typography>
//      </Box>

//      {/* Collapse Sections */}
//      <Paper variant="outlined" sx={{ mb: 2 }}>
//       <ListItem button onClick={toggleDescription}>
//        <ListItemText primary="Description & Size Chart" />
//        {descriptionOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//       </ListItem>
//       <Collapse in={descriptionOpen} timeout="auto" unmountOnExit>
//        <Box sx={{ p: 3 }}>
//         <Typography variant="body2" paragraph>
//          {productData.description}
//         </Typography>

//         <Typography
//          variant="subtitle2"
//          gutterBottom
//          sx={{ fontWeight: "bold", mt: 2 }}
//         >
//          Note:
//         </Typography>
//         <Typography variant="body2" paragraph>
//          Final color of the product may vary slightly due to the variation of
//          the light source & the photo device.
//         </Typography>

//         <Typography
//          variant="subtitle2"
//          gutterBottom
//          sx={{ fontWeight: "bold", mt: 2 }}
//         >
//          Material
//         </Typography>
//         <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
//          <li>{productData.material}</li>
//         </Typography>

//         <Typography
//          variant="subtitle2"
//          gutterBottom
//          sx={{ fontWeight: "bold", mt: 2 }}
//         >
//          Fit
//         </Typography>
//         <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
//          <li>{productData.fit}</li>
//         </Typography>

//         <Typography variant="body2" component="ul" sx={{ pl: 2, mt: 2 }}>
//          {productData.careInstructions.map((instruction, index) => (
//           <li key={index}>{instruction}</li>
//          ))}
//         </Typography>

//         <Typography
//          variant="subtitle2"
//          gutterBottom
//          sx={{ fontWeight: "bold", mt: 2 }}
//         >
//          Size
//         </Typography>
//         <TableContainer component={Paper} variant="outlined" sx={{ mt: 2 }}>
//          <Table size="small">
//           <TableHead>
//            <TableRow>
//             <TableCell>Size (Inch)</TableCell>
//             {productData.sizes.map((size) => (
//              <TableCell key={size} align="center">
//               {size}
//              </TableCell>
//             ))}
//            </TableRow>
//           </TableHead>
//           <TableBody>
//            <TableRow>
//             <TableCell>Chest</TableCell>
//             {productData.sizes.map((size) => (
//              <TableCell key={size} align="center">
//               {productData.sizeChart.chest[size]}
//              </TableCell>
//             ))}
//            </TableRow>
//            <TableRow>
//             <TableCell>Full length</TableCell>
//             {productData.sizes.map((size) => (
//              <TableCell key={size} align="center">
//               {productData.sizeChart.fullLength[size]}
//              </TableCell>
//             ))}
//            </TableRow>
//            <TableRow>
//             <TableCell>Sleeve</TableCell>
//             {productData.sizes.map((size) => (
//              <TableCell key={size} align="center">
//               {productData.sizeChart.sleeve[size]}
//              </TableCell>
//             ))}
//            </TableRow>
//           </TableBody>
//          </Table>
//         </TableContainer>
//        </Box>
//       </Collapse>
//      </Paper>

//      <Paper variant="outlined" sx={{ mb: 2 }}>
//       <ListItem button onClick={toggleReviews}>
//        <ListItemText primary="Reviews" />
//        {reviewsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//       </ListItem>
//       <Collapse in={reviewsOpen} timeout="auto" unmountOnExit>
//        <Box sx={{ p: 3 }}>
//         <Typography variant="h6" gutterBottom>
//          Customer Reviews
//         </Typography>
//         <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//          <Rating value={productData.rating} precision={0.5} readOnly />
//          <Typography variant="body2" sx={{ ml: 1 }}>
//           Based on {productData.reviews} reviews
//          </Typography>
//          <Button variant="outlined" sx={{ ml: "auto" }}>
//           Write a review
//          </Button>
//         </Box>

//         {/* Review bars */}
//         {[5, 4, 3, 2, 1].map((star) => (
//          <Box key={star} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//           <Box sx={{ display: "flex", alignItems: "center", width: 100 }}>
//            <Rating value={star} readOnly size="small" />
//           </Box>
//           <Box
//            sx={{
//             width: "100%",
//             mr: 2,
//             bgcolor: "grey.200",
//             height: 8,
//             borderRadius: 1,
//             position: "relative",
//            }}
//           >
//            <Box
//             sx={{
//              width: `${productData.reviewStats[star].percentage}%`,
//              bgcolor: "#FFD700",
//              height: "100%",
//              borderRadius: 1,
//             }}
//            />
//           </Box>
//           <Typography
//            variant="body2"
//            color="text.secondary"
//            sx={{ minWidth: 90 }}
//           >
//            {productData.reviewStats[star].percentage}% (
//            {productData.reviewStats[star].count})
//           </Typography>
//          </Box>
//         ))}

//         <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
//          <Box
//           sx={{
//            border: "1px solid #e0e0e0",
//            borderRadius: 1,
//            display: "flex",
//            alignItems: "center",
//            px: 1,
//           }}
//          >
//           <Typography variant="body2">Most Recent</Typography>
//           <ExpandMoreIcon fontSize="small" />
//          </Box>
//         </Box>
//        </Box>
//       </Collapse>
//      </Paper>

//      <Box sx={{ mt: 3 }}>
//       <Typography variant="body2">SKU: {productData.sku}</Typography>
//       <Typography variant="body2">Barcode: {productData.barcode}</Typography>
//       <Box sx={{ mt: 2 }}>
//        <Button variant="text" color="primary">
//         Ask a Question
//        </Button>
//       </Box>
//      </Box>
//     </Grid>
//    </Grid>

//    {/* You May Also Like Section */}
//    <Box sx={{ mt: 8 }}>
//     <Typography variant="h5" align="center" gutterBottom>
//      You may also like
//     </Typography>
//     <Divider sx={{ mb: 4 }} />
//     <Grid container spacing={3}>
//      {relatedProducts.map((product) => (
//       <Grid item xs={6} md={3} key={product.id}>
//        <Card sx={{ border: "1px solid #e0e0e0", boxShadow: "none" }}>
//         <CardMedia
//          component="img"
//          height="200"
//          image={product.image}
//          alt={product.name}
//         />
//         <CardContent>
//          <Typography variant="subtitle1" gutterBottom>
//           {product.name}
//          </Typography>
//          <Typography variant="body2" color="primary">
//           {product.price}
//          </Typography>
//         </CardContent>
//        </Card>
//       </Grid>
//      ))}
//     </Grid>
//    </Box>

//    {/* You recently viewed  Section */}
//    <Box sx={{ mt: 8, position: "relative" }}>
//     <Typography variant="h5" align="center" gutterBottom>
//      RECENTLY VIEWED PRODUCT
//     </Typography>
//     <Divider sx={{ mb: 4 }} />
//     <Grid container spacing={3}>
//      {resentProducts.map((product) => (
//       <Grid
//        item
//        xs={6}
//        md={3}
//        key={product.id}
//        onMouseEnter={() => setHoveredProduct(product)}
//        onMouseLeave={() => setHoveredProduct(null)}
//        sx={{ position: "relative" }}
//       >
//        <Card sx={{ border: "1px solid #e0e0e0", boxShadow: "none" }}>
//         <CardMedia
//          component="img"
//          height="200"
//          image={product.image}
//          alt={product.name}
//         />
//         <CardContent>
//          <Typography variant="subtitle1" gutterBottom>
//           {product.name}
//          </Typography>
//          <Typography variant="body2" color="primary">
//           {product.price}
//          </Typography>
//         </CardContent>
//        </Card>

//        {/* Hover Popup Card */}
//        {hoveredProduct?.id === product.id && (
//         <Box
//          sx={{
//           position: "absolute",
//           top: "100%",
//           left: 0,
//           zIndex: 10,
//           backgroundColor: "#fff",
//           boxShadow: 3,
//           mt: 1,
//           width: "100%",
//          }}
//         >
//          <StickyAddToCart product={hoveredProduct} />
//         </Box>
//        )}
//       </Grid>
//      ))}
//     </Grid>
//    </Box>

//    {/* Cart Drawer */}
//    <Drawer
//     anchor="right"
//     open={cartDrawerOpen}
//     onClose={() => setCartDrawerOpen(false)}
//    >
//     <Box sx={{ width: 350, p: 2 }}>
//      <Box
//       sx={{
//        display: "flex",
//        justifyContent: "space-between",
//        alignItems: "center",
//        mb: 2,
//       }}
//      >
//       <Typography variant="h6">Shopping Cart</Typography>
//       <IconButton onClick={() => setCartDrawerOpen(false)}>
//        <NavigateNextIcon />
//       </IconButton>
//      </Box>
//      <Divider sx={{ mb: 2 }} />

//      <Box sx={{ display: "flex", mb: 2 }}>
//       <Box
//        component="img"
//        src={mainImage}
//        alt={productData.name}
//        sx={{ width: 80, height: 80, border: "1px solid #e0e0e0" }}
//       />
//       <Box sx={{ ml: 2 }}>
//        <Typography variant="subtitle2">{productData.name}</Typography>
//        <Typography variant="body2">White & Blue / S</Typography>
//        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
//         <Typography variant="body2">Qty: {quantity}</Typography>
//         <Typography variant="body2" sx={{ ml: 2, fontWeight: "bold" }}>
//          {productData.price}
//         </Typography>
//        </Box>
//       </Box>
//      </Box>

//      <Divider sx={{ my: 2 }} />

//      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//       <Typography variant="subtitle2">Subtotal:</Typography>
//       <Typography variant="subtitle2">{productData.price}</Typography>
//      </Box>

//      <Button variant="contained" color="error" fullWidth sx={{ mb: 2 }}>
//       Checkout
//      </Button>

//      <Button
//       variant="outlined"
//       fullWidth
//       onClick={() => setCartDrawerOpen(false)}
//      >
//       Continue Shopping
//      </Button>
//     </Box>
//    </Drawer>
//   </Container>
//  );
// };

// export default ProductDetailsPage;
