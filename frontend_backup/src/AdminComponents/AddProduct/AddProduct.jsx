/** @format */

//latest working parfectly before adding productimage

import React, { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CalendarMonth as CalendarMonthIcon } from "@mui/icons-material";
import axios from "axios";
import {
 TextField,
 Button,
 MenuItem,
 Typography,
 Box,
 Grid,
 Alert,
 FormControl,
 InputLabel,
 Select,
 FormControlLabel,
 Radio,
 RadioGroup,
 Chip,
 IconButton,
 Paper,
 Divider,
 Snackbar,
 CircularProgress,
 Card,
 CardContent,
 Tooltip,
 Dialog,
 DialogTitle,
 DialogContent,
 DialogActions,
 InputAdornment,
 Stepper,
 Step,
 StepLabel,
 FormHelperText,
} from "@mui/material";

// Import icons
import {
 CloudUpload as CloudUploadIcon,
 Edit as EditIcon,
 Check as CheckIcon,
 Close as CloseIcon,
 Delete as DeleteIcon,
 Add as AddIcon,
 Save as SaveIcon,
 Image as ImageIcon,
 Collections as CollectionsIcon,
 Category as CategoryIcon,
 Info as InfoIcon,
 Palette as PaletteIcon,
 Straighten as StraightenIcon,
 description as descriptionIcon,
 AttachMoney as AttachMoneyIcon,
} from "@mui/icons-material";

// API configuration
const API_BASE_URL = "https://localhost:7142/api";

const AddProduct = () => {
 // Form steps
 const steps = [
  "Basic Info",
  "Pricing",
  "Sizes & Colors",
  "description",
  "Images",
 ];
 const [activeStep, setActiveStep] = useState(0);

 // State for images
 const [primaryImage, setPrimaryImage] = useState(null);
 const [primaryImagePreview, setPrimaryImagePreview] = useState(null);
 const [hoverImages, setHoverImages] = useState([]);
 const [hoverImagePreviews, setHoverImagePreviews] = useState([]);

 // Product details state - updated to match backend model
 const [productDetails, setProductDetails] = useState({
  Title: "",
  MenuItemId: 0, // Changed to number to match backend model
  ParentMenuItemId: 0,
  Handle: "",
  ProductAddedDate: new Date(),
  NewPrice: 0, // Changed from newPrice to NewPrice
  OldPrice: null, // Changed from oldPrice to OldPrice
  Is_In_Stock: "yes",
  description: "", // Changed from description to description
  note: "", // Changed from note to Note
  material: "", // Changed from material to material
  care: "", // Changed from care to Care
  ModelHeightSize: "",
  Sizes: [], // Will be populated with ProductSizeDetailRequest objects
  Colors: [], // Will be populated with string values initially, then converted to ProductColor objects
  hasSizes: false, // UI state only, not part of backend model
 });

 // Reference data states
 const [menuItems, setMenuItems] = useState([]);
 const [availableColors, setAvailableColors] = useState([]);
 const [addColorOption, setAddColorOption] = useState("new"); // 'new' or 'existing'
 const [selectedExistingColor, setSelectedExistingColor] = useState("");
 const [errors, setErrors] = useState({});
 const [success, setSuccess] = useState({
  show: false,
  message: "",
  severity: "success",
 });
 const [loading, setLoading] = useState(false);
 const [colorDialogOpen, setColorDialogOpen] = useState(false);
 const [newColor, setNewColor] = useState("");
 const [editingColor, setEditingColor] = useState(null);
 // Debug state to track MenuItemId
 const [debugCategoryValue, setDebugCategoryValue] = useState("");

 // Size measurement categories
 const measurementCategories = [
  "Chest",
  "FullLengthBack",
  "FullLengthFront",
  "PantWaistRelax",
  "PantLength",
 ];

 // Fetch reference data
 useEffect(() => {
  const fetchData = async () => {
   setLoading(true);
   try {
    // Fetch menu items
    const menuResponse = await axios.get(`${API_BASE_URL}/menuitems/nested`);
    console.log("nenu response:", menuResponse.data);
    if (menuResponse.data) {
     const flattenMenuItems = (items, prefix = "") =>
      items.reduce((acc, item) => {
       // Ensure MenuItemId is a number for consistency
       const safeMenuItemId = Number(item.menuItemId);
       acc.push({
        MenuItemId: safeMenuItemId,
        title: prefix + item.title,
       });
       if (item.children?.length > 0) {
        acc.push(...flattenMenuItems(item.children, prefix + "-- "));
       }
       return acc;
      }, []);

     const processedMenuItems = flattenMenuItems(menuResponse.data);
     console.log("Processed menu items:", processedMenuItems);
     setMenuItems(processedMenuItems);
    }

    // Fetch available colors
    const colorsResponse = await axios.get(
     `${API_BASE_URL}/Product/available-colors`,
    );
    setAvailableColors(colorsResponse.data);
   } catch (error) {
    console.error("Error fetching initial data:", error);
    setSuccess({
     show: true,
     message: "Failed to load reference data. Please refresh the page.",
     severity: "error",
    });
   } finally {
    setLoading(false);
   }
  };

  fetchData();
 }, []);

 // Handle image preview for primary image
 useEffect(() => {
  if (primaryImage) {
   const reader = new FileReader();
   reader.onloadend = () => {
    setPrimaryImagePreview(reader.result);
   };
   reader.readAsDataURL(primaryImage);
  } else {
   setPrimaryImagePreview(null);
  }
 }, [primaryImage]);

 // Handle image previews for hover images
 useEffect(() => {
  if (hoverImages.length === 0) {
   setHoverImagePreviews([]);
   return;
  }

  const previews = [];
  hoverImages.forEach((file) => {
   const reader = new FileReader();
   reader.onloadend = () => {
    // Add the result to the previews array
    previews.push(reader.result);
    // Once all images are processed, update the state
    if (previews.length === hoverImages.length) {
     setHoverImagePreviews([...previews]);
    }
   };
   reader.readAsDataURL(file);
  });
 }, [hoverImages]);

 // Debug effect to track category changes
 useEffect(() => {
  console.log("Current MenuItemId state:", productDetails.MenuItemId);

  if (productDetails.MenuItemId) {
   // Find the selected category title for debugging
   const selectedItem = menuItems.find(
    (item) => Number(item.menuItemId) === Number(productDetails.MenuItemId),
   );

   if (selectedItem) {
    setDebugCategoryValue(`${selectedItem.MenuItemId}: ${selectedItem.title}`);
   } else {
    setDebugCategoryValue(`No match for ID: ${productDetails.MenuItemId}`);
   }
  } else {
   setDebugCategoryValue("No category selected");
  }
 }, [productDetails.MenuItemId, menuItems]);

 // Form validation
 const validateStep = (step) => {
  const newErrors = {};

  switch (step) {
   case 0: // Basic Info
    if (!productDetails.Title) newErrors.Title = "Title is required";
    if (!productDetails.MenuItemId)
     newErrors.MenuItemId = "Category is required";
    if (!productDetails.Handle) newErrors.Handle = "Handle is required";
    break;
    if (!productDetails.ProductAddedDate)
     newErrors.ProductAddedDate = "Date added is required";
    break;

   case 1: // Pricing
    if (!productDetails.NewPrice || isNaN(Number(productDetails.NewPrice))) {
     newErrors.NewPrice = "Valid price is required";
    }
    if (productDetails.OldPrice && isNaN(Number(productDetails.OldPrice))) {
     newErrors.OldPrice = "Old price must be a valid number";
    }
    if (!productDetails.Is_In_Stock) {
     newErrors.Is_In_Stock = "Stock status is required";
    }
    break;

   case 2: // Sizes & Colors
    if (productDetails.Colors.length === 0) {
     newErrors.Colors = "At least one color is required";
    }

    if (productDetails.hasSizes) {
     if (!productDetails.ModelHeightSize) {
      newErrors.ModelHeightSize =
       "Model details are required when sizes are enabled";
     }

     if (productDetails.Sizes.length === 0) {
      newErrors.Sizes = "At least one size must be added";
     } else {
      productDetails.Sizes.forEach((size, index) => {
       if (!size.Category) {
        newErrors[`size_${index}_name`] = "Size name is required";
       }

       measurementCategories.forEach((category) => {
        if (size[category] === null || size[category] === "") {
         if (!newErrors[`size_${index}_measurements`]) {
          newErrors[
           `size_${index}_measurements`
          ] = `Complete all measurements for ${size.Category || "this size"}`;
         }
        }
       });
      });
     }
    }
    break;

   case 3: // description
    if (!productDetails.description)
     newErrors.description = "description is required";
    if (!productDetails.material)
     newErrors.material = "material information is required";
    if (!productDetails.care) newErrors.care = "Care instructions are required";
    break;

   case 4: // Images
    if (!primaryImage) newErrors.primaryImage = "Primary image is required";
    break;

   default:
    break;
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
 };

 const validateCompleteForm = () => {
  let allValid = true;
  for (let i = 0; i < steps.length; i++) {
   if (!validateStep(i)) {
    allValid = false;
    setActiveStep(i);
    break;
   }
  }
  return allValid;
 };

 // Step navigation handlers
 const handleNext = () => {
  console.log("Errors before Next:", errors);
  if (validateStep(activeStep)) {
   setActiveStep((prevStep) => prevStep + 1);
  }
 };

 const handleBack = () => {
  setActiveStep((prevStep) => prevStep - 1);
 };

 const handleDateChange = (date) => {
  setProductDetails((prev) => ({ ...prev, ProductAddedDate: date }));
  if (errors.ProductAddedDate) {
   setErrors((prev) => {
    const newErrors = { ...prev };
    delete newErrors.ProductAddedDate;
    return newErrors;
   });
  }
 };
 // Field change handlers
 const handleChange = (e) => {
  const { name, value } = e.target;

  // Log change event for debugging
  console.log(`handleChange called: ${name} = ${value}`);

  // Special handling for MenuItemId to ensure it's a number
  if (name === "menuItemId") {
   const numericValue = Number(value);
   console.log(`Category selected: ${numericValue}`);

   // Check if the value exists in our menuItems
   const selectedItem = menuItems.find(
    (item) => Number(item.menuItemId) === numericValue,
   );
   if (selectedItem) {
    console.log(`Found matching item: ${selectedItem.title}`);
   } else {
    console.log(`No matching item found for MenuItemId: ${numericValue}`);
   }

   setProductDetails((prev) => ({
    ...prev,
    [name]: numericValue,
   }));
  } else {
   setProductDetails((prev) => ({ ...prev, [name]: value }));
  }

  // Clear error when field is edited
  if (errors[name]) {
   setErrors((prev) => {
    const newErrors = { ...prev };
    delete newErrors[name];
    return newErrors;
   });
  }
 };

 const handlePrimaryImageChange = (e) => {
  console.log(`file is triggered: ${e.target.files[0]}`);
  if (e.target.files && e.target.files[0]) {
   setPrimaryImage(e.target.files[0]);

   // Clear error if it exists
   if (errors.primaryImage) {
    setErrors((prev) => {
     const newErrors = { ...prev };
     delete newErrors.primaryImage;
     return newErrors;
    });
   }
  }
 };

 const handleHoverImagesChange = (e) => {
  if (e.target.files && e.target.files.length > 0) {
   const newFiles = Array.from(e.target.files);
   setHoverImages((prev) => [...prev, ...newFiles]);
  }
 };

 const handleRemoveHoverImage = (index) => {
  setHoverImages((prev) => prev.filter((_, i) => i !== index));
  setHoverImagePreviews((prev) => prev.filter((_, i) => i !== index));
 };

 // Size handlers
 const handleHasSizesChange = (e) => {
  const hasSizes = e.target.value === "yes";
  setProductDetails((prev) => ({
   ...prev,
   hasSizes,
   Sizes: hasSizes ? prev.Sizes : [],
   ModelHeightSize: hasSizes ? prev.ModelHeightSize : "",
  }));
 };

 const handleAddSize = () => {
  const newSize = {
   Category: "", // Changed from name to Category to match backend
   ...measurementCategories.reduce((acc, cat) => ({ ...acc, [cat]: null }), {}),
  };
  setProductDetails((prev) => ({
   ...prev,
   Sizes: [...prev.Sizes, newSize],
  }));
 };

 const handleRemoveSize = (index) => {
  setProductDetails((prev) => ({
   ...prev,
   Sizes: prev.Sizes.filter((_, i) => i !== index),
  }));
 };

 const handleSizeChange = (index, field, value) => {
  setProductDetails((prev) => ({
   ...prev,
   Sizes: prev.Sizes.map((size, i) =>
    i === index
     ? {
        ...size,
        [field]:
         field !== "Category"
          ? value === ""
            ? null
            : parseFloat(value)
          : value,
       }
     : size,
   ),
  }));

  // Clear relevant errors
  if (
   errors[`size_${index}_${field}`] ||
   errors[`size_${index}_measurements`]
  ) {
   setErrors((prev) => {
    const newErrors = { ...prev };
    delete newErrors[`size_${index}_${field}`];
    delete newErrors[`size_${index}_measurements`];
    return newErrors;
   });
  }
 };

 // Color handlers
 const handleColorSelect = (color) => {
  // In UI we handle colors as strings for simplicity
  setProductDetails((prev) => ({
   ...prev,
   Colors: prev.Colors.includes(color)
    ? prev.Colors.filter((c) => c !== color)
    : [...prev.Colors, color],
  }));

  // Clear error if it exists
  if (errors.Colors) {
   setErrors((prev) => {
    const newErrors = { ...prev };
    delete newErrors.Colors;
    return newErrors;
   });
  }
 };

 const handleAddColor = () => {
  if (newColor.trim()) {
   const trimmedColor = newColor.trim();
   console.log("Adding color:", trimmedColor); // Log the color being added

   setAvailableColors((prev) => [...prev, trimmedColor]);
   setProductDetails((prev) => ({
    ...prev,
    Colors: [...prev.Colors, trimmedColor],
   }));
   setNewColor("");
   setColorDialogOpen(false);

   // Clear error if it exists
   if (errors.Colors) {
    setErrors((prev) => {
     const newErrors = { ...prev };
     delete newErrors.Colors;
     return newErrors;
    });
   }
  }
 };

 const handleEditColor = (color) => {
  setEditingColor(color);
  setNewColor(color);
  setColorDialogOpen(true);
 };

 const handleUpdateColor = () => {
  if (newColor.trim() && editingColor) {
   setAvailableColors((prev) =>
    prev.map((c) => (c === editingColor ? newColor.trim() : c)),
   );
   setProductDetails((prev) => ({
    ...prev,
    Colors: prev.Colors.map((c) => (c === editingColor ? newColor.trim() : c)),
   }));
   setNewColor("");
   setEditingColor(null);
   setColorDialogOpen(false);
  }
 };

 const handleRemoveColor = (colorToRemove) => {
  setAvailableColors((prev) => prev.filter((c) => c !== colorToRemove));
  setProductDetails((prev) => ({
   ...prev,
   Colors: prev.Colors.filter((c) => c !== colorToRemove),
  }));
 };

 // Submit handler
 const handleSubmit = async () => {
  if (!validateCompleteForm()) {
   setSuccess({
    show: true,
    message: "Please complete all required fields",
    severity: "error",
   });
   return;
  }

  setLoading(true);
  try {
   // Find the selected category title
   const selectedCategory = menuItems.find(
    (item) => Number(item.MenuItemId) === Number(productDetails.MenuItemId),
   );

   // Create a copy of the product details to modify for submission
   const productPayload = {
    ...productDetails,
    // Ensure MenuItemId is a number
    MenuItemId: Number(productDetails.MenuItemId),
    // Convert string colors to ProductColor objects for backend
    Colors: productDetails.Colors.map((color) => ({
     Color: color,
     // ProductId will be set by backend
     // ProductColorId will be set by backend
    })),
    // Parse pricing to decimal
    NewPrice: parseFloat(productDetails.NewPrice),
    OldPrice: productDetails.OldPrice
     ? parseFloat(productDetails.OldPrice)
     : null,
   };

   // Remove non-model property (UI only)
   delete productPayload.hasSizes;

   console.log("Submitting product with payload:", productPayload);

   const productResponse = await axios.post(
    `${API_BASE_URL}/Product/add`,
    productPayload,
    {
     headers: { "Content-Type": "application/json" },
    },
   );

   const productData = productResponse.data;

   if (productData?.success && productData?.productId) {
    const productId = productData.productId;
    console.log("I am here");

    // Then, upload images if they exist
    if (primaryImage || hoverImages.length > 0) {
     console.log("primaryImage and hoverImages section");
     console.log("Primary Image:", primaryImage);
     console.log("Hover Images:", hoverImages);
     const formData = new FormData();
     if (primaryImage) formData.append("PrimaryImage", primaryImage);
     hoverImages.forEach((image) => {
      console.log("Appending Hover Image:", image);
      formData.append("HoverImages", image);
     });
     formData.append("ProductId", productId);
     console.log("Appending ProductId:", productId);

     console.log("--- FormData Contents Before Upload ---");
     for (const pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
     }

     console.log("--- End of FormData Contents ---");

     await axios.post(`${API_BASE_URL}/Product/upload-images`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
     });
    }

    // Reset form and show success message
    setProductDetails({
     Title: "",
     MenuItemId: 0,
     Handle: "",
     ProductAddedDate: new Date(),
     NewPrice: 0,
     OldPrice: null,
     Is_In_Stock: "yes",
     description: "",
     note: "",
     material: "",
     care: "",
     ModelHeightSize: "",
     Sizes: [],
     Colors: [],
     hasSizes: false,
    });
    setPrimaryImage(null);
    setPrimaryImagePreview(null);
    setHoverImages([]);
    setHoverImagePreviews([]);
    setActiveStep(0);
    setErrors({});
    setSuccess({
     show: true,
     message: "Product added successfully!",
     severity: "success",
    });
   } else {
    throw new Error("Failed to add product");
   }
  } catch (error) {
   console.error("Error submitting product:", error);
   setSuccess({
    show: true,
    message: "Failed to add product. Please try again.",
    severity: "error",
   });
  } finally {
   setLoading(false);
  }
 };

 // Render helper for form steps
 const getStepContent = (step) => {
  switch (step) {
   case 0: // Basic Info
    return (
     <Grid container spacing={3}>
      <Grid item xs={12}>
       <TextField
        label="Title"
        name="Title"
        value={productDetails.Title}
        onChange={handleChange}
        fullWidth
        required
        error={!!errors.Title}
        helperText={errors.Title}
        InputProps={{
         startAdornment: (
          <InputAdornment position="start">
           <descriptionIcon color="primary" />
          </InputAdornment>
         ),
        }}
       />
      </Grid>
      <Grid item xs={12}>
       <FormControl fullWidth required error={!!errors.MenuItemId}>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
         labelId="category-label"
         id="MenuItemId"
         name="MenuItemId"
         value={productDetails.MenuItemId || ""}
         onChange={handleChange}
         label="Category"
         startAdornment={
          <InputAdornment position="start">
           <CategoryIcon color="primary" />
          </InputAdornment>
         }
        >
         <MenuItem value={0}>
          <em>Select a category</em>
         </MenuItem>
         {menuItems.map((item) => (
          <MenuItem
           key={String(item.MenuItemId)}
           value={Number(item.MenuItemId)}
          >
           {item.title}
          </MenuItem>
         ))}
        </Select>
        {errors.MenuItemId && (
         <FormHelperText error>{errors.MenuItemId}</FormHelperText>
        )}
        {/* Debug info - can be removed in production */}
        {productDetails.MenuItemId > 0 && (
         <FormHelperText>Selected: {debugCategoryValue}</FormHelperText>
        )}
       </FormControl>
      </Grid>
      <Grid item xs={12}>
       <TextField
        label="Handle (URL slug)"
        name="Handle"
        value={productDetails.Handle}
        onChange={handleChange}
        fullWidth
        required
        error={!!errors.Handle}
        helperText={
         errors.Handle || "Used in product URL, e.g., 'summer-shirt'"
        }
        InputProps={{
         startAdornment: (
          <InputAdornment position="start">
           <InfoIcon color="primary" />
          </InputAdornment>
         ),
        }}
       />
      </Grid>
      <Grid item xs={12}>
       <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
         label="Date Added"
         value={productDetails.ProductAddedDate}
         onChange={handleDateChange}
         renderInput={(params) => (
          <TextField
           {...params}
           fullWidth
           required
           error={!!errors.ProductAddedDate}
           helperText={errors.ProductAddedDate}
           InputProps={{
            startAdornment: (
             <InputAdornment position="start">
              <CalendarMonthIcon color="primary" />
             </InputAdornment>
            ),
            ...params.InputProps,
           }}
          />
         )}
        />
       </LocalizationProvider>
      </Grid>
     </Grid>
    );

   case 1: // Pricing
    return (
     <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
       <TextField
        label="New Price"
        name="NewPrice"
        type="number"
        value={productDetails.NewPrice}
        onChange={handleChange}
        fullWidth
        required
        error={!!errors.NewPrice}
        helperText={errors.NewPrice}
        InputProps={{
         startAdornment: (
          <InputAdornment position="start">
           <AttachMoneyIcon color="primary" />
          </InputAdornment>
         ),
        }}
       />
      </Grid>
      <Grid item xs={12} sm={6}>
       <TextField
        label="Old Price (Optional)"
        name="OldPrice"
        type="number"
        value={productDetails.OldPrice || ""}
        onChange={handleChange}
        fullWidth
        error={!!errors.OldPrice}
        helperText={errors.OldPrice || "For sale/discount display"}
        InputProps={{
         startAdornment: (
          <InputAdornment position="start">
           <AttachMoneyIcon color="primary" />
          </InputAdornment>
         ),
        }}
       />
      </Grid>
      <Grid item xs={12}>
       <FormControl component="fieldset" required error={!!errors.Is_In_Stock}>
        <Typography variant="subtitle1" gutterBottom>
         Stock Status
        </Typography>
        <RadioGroup
         row
         name="Is_In_Stock"
         value={productDetails.Is_In_Stock}
         onChange={handleChange}
        >
         <FormControlLabel value="yes" control={<Radio />} label="In Stock" />
         <FormControlLabel
          value="no"
          control={<Radio />}
          label="Out of Stock"
         />
         <FormControlLabel
          value="preorder"
          control={<Radio />}
          label="Pre-order"
         />
        </RadioGroup>
        {errors.Is_In_Stock && (
         <FormHelperText error>{errors.Is_In_Stock}</FormHelperText>
        )}
       </FormControl>
      </Grid>
     </Grid>
    );

   case 2: // Sizes & Colors
    return (
     <Grid container spacing={3}>
      {/* Colors Section */}
      <Grid item xs={12}>
       <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
         <PaletteIcon color="primary" sx={{ mr: 1 }} />
         <Typography variant="h6">Product Colors</Typography>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
         {availableColors.map((color) => (
          <Chip
           key={color}
           label={color}
           onClick={() => handleColorSelect(color)}
           onDelete={() => handleRemoveColor(color)}
           deleteIcon={<DeleteIcon />}
           color={productDetails.Colors.includes(color) ? "primary" : "default"}
           variant={
            productDetails.Colors.includes(color) ? "filled" : "outlined"
           }
           sx={{ m: 0.5 }}
          />
         ))}
         <Chip
          icon={<AddIcon />}
          label="Add Color"
          onClick={() => {
           setEditingColor(null);
           setNewColor("");
           setColorDialogOpen(true);
          }}
          color="secondary"
          variant="outlined"
          sx={{ m: 0.5 }}
         />
        </Box>
        {errors.Colors && (
         <FormHelperText error>{errors.Colors}</FormHelperText>
        )}
       </Paper>
      </Grid>

      {/* Sizes Section */}
      <Grid item xs={12}>
       <Paper elevation={1} sx={{ p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
         <StraightenIcon color="primary" sx={{ mr: 1 }} />
         <Typography variant="h6">Product Sizes</Typography>
        </Box>
        <FormControl component="fieldset" sx={{ mb: 2 }}>
         <Typography variant="subtitle1">
          Does this product have multiple sizes?
         </Typography>
         <RadioGroup
          row
          name="hasSizes"
          value={productDetails.hasSizes ? "yes" : "no"}
          onChange={handleHasSizesChange}
         >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel
           value="no"
           control={<Radio />}
           label="No (One size)"
          />
         </RadioGroup>
        </FormControl>

        {productDetails.hasSizes && (
         <>
          <TextField
           label="Model Height & Size"
           name="ModelHeightSize"
           value={productDetails.ModelHeightSize}
           onChange={handleChange}
           placeholder="e.g., Model is 5'9 and wears size M"
           fullWidth
           required
           sx={{ mb: 3 }}
           error={!!errors.ModelHeightSize}
           helperText={errors.ModelHeightSize}
          />

          <Box sx={{ mb: 2 }}>
           <Typography variant="subtitle1" gutterBottom>
            Size Chart (all measurements in inches)
           </Typography>

           {productDetails.Sizes.map((size, index) => (
            <Card key={index} variant="outlined" sx={{ mb: 2 }}>
             <CardContent>
              <Box
               sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
               <TextField
                label="Size Name"
                value={size.Category}
                onChange={(e) =>
                 handleSizeChange(index, "Category", e.target.value)
                }
                required
                error={!!errors[`size_${index}_name`]}
                helperText={errors[`size_${index}_name`]}
                sx={{ width: "30%" }}
               />
               <IconButton
                color="error"
                onClick={() => handleRemoveSize(index)}
                sx={{ alignSelf: "center" }}
               >
                <DeleteIcon />
               </IconButton>
              </Box>

              <Grid container spacing={2}>
               {measurementCategories.map((category) => (
                <Grid item xs={12} sm={6} md={4} key={category}>
                 <TextField
                  label={category.replace(/([A-Z])/g, " $1").trim()} // Format for display
                  type="number"
                  value={size[category] === null ? "" : size[category]}
                  onChange={(e) =>
                   handleSizeChange(index, category, e.target.value)
                  }
                  fullWidth
                  required
                  inputProps={{ step: "0.1" }}
                  error={!!errors[`size_${index}_measurements`]}
                 />
                </Grid>
               ))}
              </Grid>
              {errors[`size_${index}_measurements`] && (
               <FormHelperText error sx={{ mt: 1 }}>
                {errors[`size_${index}_measurements`]}
               </FormHelperText>
              )}
             </CardContent>
            </Card>
           ))}

           <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddSize}
            sx={{ mt: 1 }}
           >
            Add Size
           </Button>

           {errors.sizes && (
            <FormHelperText error sx={{ mt: 1 }}>
             {errors.sizes}
            </FormHelperText>
           )}
          </Box>
         </>
        )}
       </Paper>
      </Grid>
     </Grid>
    );

   case 3: // description
    return (
     <Grid container spacing={3}>
      <Grid item xs={12}>
       <TextField
        label="Product description"
        name="description"
        value={productDetails.description}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
        required
        error={!!errors.description}
        helperText={errors.description}
       />
      </Grid>
      <Grid item xs={12}>
       <TextField
        label="material"
        name="material"
        value={productDetails.material}
        onChange={handleChange}
        multiline
        rows={2}
        fullWidth
        required
        error={!!errors.material}
        helperText={
         errors.material || "Fabric composition, materials used, etc."
        }
       />
      </Grid>
      <Grid item xs={12}>
       <TextField
        label="Care Instructions"
        name="care"
        value={productDetails.care}
        onChange={handleChange}
        multiline
        rows={2}
        fullWidth
        required
        error={!!errors.care}
        helperText={
         errors.care || "Washing, drying, and special care information"
        }
       />
      </Grid>
      <Grid item xs={12}>
       <TextField
        label="Additional Notes (Optional)"
        name="note"
        value={productDetails.note}
        onChange={handleChange}
        multiline
        rows={2}
        fullWidth
        helperText="Any special features, sizing notes, or other details to highlight"
       />
      </Grid>
     </Grid>
    );

   case 4: // Images
    return (
     <Grid container spacing={3}>
      <Grid item xs={12}>
       <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
         Primary Product Image
        </Typography>
        <Box
         sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
         {primaryImagePreview ? (
          <Box sx={{ position: "relative", mb: 2 }}>
           <img
            src={primaryImagePreview}
            alt="Primary"
            style={{
             maxWidth: "100%",
             maxHeight: "200px",
             borderRadius: "4px",
            }}
           />
           <IconButton
            sx={{
             position: "absolute",
             top: -12,
             right: -12,
             bgcolor: "background.paper",
             boxShadow: 1,
            }}
            size="small"
            onClick={() => {
             setPrimaryImage(null);
             setPrimaryImagePreview(null);
            }}
           >
            <CloseIcon fontSize="small" />
           </IconButton>
          </Box>
         ) : (
          <Box
           sx={{
            width: "100%",
            height: "200px",
            border: "2px dashed",
            borderColor: errors.primaryImage ? "error.main" : "divider",
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
           }}
          >
           <input
            accept="image/*"
            style={{ display: "none" }}
            id="primary-image-upload"
            type="file"
            onChange={handlePrimaryImageChange}
           />
           <label htmlFor="primary-image-upload">
            <Button
             variant="outlined"
             component="span"
             startIcon={<CloudUploadIcon />}
            >
             Upload Main Image
            </Button>
           </label>
          </Box>
         )}
         {errors.primaryImage && (
          <FormHelperText error>{errors.primaryImage}</FormHelperText>
         )}
         {primaryImagePreview && (
          <input
           accept="image/*"
           style={{ display: "none" }}
           id="replace-primary-image"
           type="file"
           onChange={handlePrimaryImageChange}
          />
         )}
         {primaryImagePreview && (
          <label htmlFor="replace-primary-image">
           <Button
            variant="outlined"
            component="span"
            startIcon={<EditIcon />}
            size="small"
           >
            Change Image
           </Button>
          </label>
         )}
        </Box>
       </Paper>
      </Grid>

      <Grid item xs={12}>
       <Paper elevation={1} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
         Additional Product Images (Optional)
        </Typography>
        <Box sx={{ mb: 2 }}>
         <input
          accept="image/*"
          style={{ display: "none" }}
          id="hover-images-upload"
          type="file"
          multiple
          onChange={handleHoverImagesChange}
         />
         <label htmlFor="hover-images-upload">
          <Button
           variant="outlined"
           component="span"
           startIcon={<CollectionsIcon />}
          >
           Add Gallery Images
          </Button>
         </label>
        </Box>

        {hoverImagePreviews.length > 0 && (
         <Grid container spacing={2}>
          {hoverImagePreviews.map((preview, index) => (
           <Grid item xs={6} sm={4} md={3} key={index}>
            <Box sx={{ position: "relative" }}>
             <img
              src={preview}
              alt={`Preview ${index + 1}`}
              style={{
               width: "100%",
               height: "100px",
               objectFit: "cover",
               borderRadius: "4px",
              }}
             />
             <IconButton
              sx={{
               position: "absolute",
               top: -8,
               right: -8,
               bgcolor: "background.paper",
               boxShadow: 1,
              }}
              size="small"
              onClick={() => handleRemoveHoverImage(index)}
             >
              <CloseIcon fontSize="small" />
             </IconButton>
            </Box>
           </Grid>
          ))}
         </Grid>
        )}
       </Paper>
      </Grid>
     </Grid>
    );

   default:
    return "Unknown step";
  }
 };
 const renderColorDialog = () => (
  <Dialog open={colorDialogOpen} onClose={() => setColorDialogOpen(false)}>
   <DialogTitle>{editingColor ? "Edit Color" : "Add New Color"}</DialogTitle>
   <DialogContent>
    <TextField
     autoFocus
     margin="dense"
     label="Color Name"
     type="text"
     fullWidth
     value={newColor}
     onChange={(e) => setNewColor(e.target.value)}
     onKeyPress={(e) => {
      if (e.key === "Enter") {
       editingColor ? handleUpdateColor() : handleAddColor();
      }
     }}
    />
   </DialogContent>
   <DialogActions>
    <Button onClick={() => setColorDialogOpen(false)}>Cancel</Button>
    <Button
     onClick={editingColor ? handleUpdateColor : handleAddColor}
     color="primary"
     disabled={!newColor.trim()}
    >
     {editingColor ? "Update" : "Add"}
    </Button>
   </DialogActions>
  </Dialog>
 );

 if (loading && !productDetails.Title) {
  return (
   <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
    <CircularProgress />
   </Box>
  );
 }

 return (
  <Box sx={{ maxWidth: 800, margin: "0 auto", p: { xs: 2, sm: 3 } }}>
   <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 } }}>
    <Typography variant="h4" gutterBottom align="center" sx={{ mb: 3 }}>
     Add New Product
    </Typography>

    <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
     {steps.map((label) => (
      <Step key={label}>
       <StepLabel>{label}</StepLabel>
      </Step>
     ))}
    </Stepper>

    <Box sx={{ mt: 2, mb: 4 }}>{getStepContent(activeStep)}</Box>

    <Divider sx={{ my: 3 }} />

    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
     <Button disabled={activeStep === 0} onClick={handleBack}>
      Back
     </Button>
     <Box>
      {activeStep === steps.length - 1 ? (
       <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        startIcon={<SaveIcon />}
        disabled={loading}
       >
        {loading ? "Saving..." : "Save Product"}
       </Button>
      ) : (
       <Button variant="contained" color="primary" onClick={handleNext}>
        Next
       </Button>
      )}
     </Box>
    </Box>
   </Paper>

   {renderColorDialog()}

   <Snackbar
    open={success.show}
    autoHideDuration={6000}
    onClose={() => setSuccess({ ...success, show: false })}
   >
    <Alert
     onClose={() => setSuccess({ ...success, show: false })}
     severity={success.severity || "success"}
     sx={{ width: "100%" }}
    >
     {success.message}
    </Alert>
   </Snackbar>
  </Box>
 );
};

export default AddProduct;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//  TextField,
//  Button,
//  MenuItem,
//  Typography,
//  Box,
//  Grid,
//  Alert,
//  FormControl,
//  InputLabel,
//  Select,
//  FormControlLabel,
//  Radio,
//  RadioGroup,
//  Chip,
//  IconButton,
//  Paper,
//  Divider,
//  Snackbar,
//  CircularProgress,
//  Card,
//  CardContent,
//  Tooltip,
//  Dialog,
//  DialogTitle,
//  DialogContent,
//  DialogActions,
//  InputAdornment,
//  Stepper,
//  Step,
//  StepLabel,
//  FormHelperText,
// } from "@mui/material";

// // Import icons
// import {
//  CloudUpload as CloudUploadIcon,
//  Edit as EditIcon,
//  Check as CheckIcon,
//  Close as CloseIcon,
//  Delete as DeleteIcon,
//  Add as AddIcon,
//  Save as SaveIcon,
//  Image as ImageIcon,
//  Collections as CollectionsIcon,
//  Category as CategoryIcon,
//  Info as InfoIcon,
//  Palette as PaletteIcon,
//  Straighten as StraightenIcon,
//  description as descriptionIcon,
//  AttachMoney as AttachMoneyIcon,
// } from "@mui/icons-material";

// // API configuration
// const API_BASE_URL = "https://localhost:7142/api";

// const AddProduct = () => {
//  // Form steps
//  const steps = [
//   "Basic Info",
//   "Pricing",
//   "Sizes & Colors",
//   "description",
//   "Images",
//  ];
//  const [activeStep, setActiveStep] = useState(0);

//  // State for images
//  const [primaryImage, setPrimaryImage] = useState(null);
//  const [primaryImagePreview, setPrimaryImagePreview] = useState(null);
//  const [hoverImages, setHoverImages] = useState([]);
//  const [hoverImagePreviews, setHoverImagePreviews] = useState([]);

//  // Product details state
//  const [productDetails, setProductDetails] = useState({
//   Title: "",
//   MenuItemId: 0,
//   ParentMenuItemId: 0,
//   newPrice: "",
//   oldPrice: "",
//   hasSizes: false,
//   sizes: [],
//   colors: [],
//   description: "",
//   note: "",
//   material: "",
//   care: "",
//   Handle: "",
//   Is_In_Stock: "yes",
//   modelHeightSize: "",
//  });

//  // Reference data states
//  const [menuItems, setMenuItems] = useState([]);
//  const [availableColors, setAvailableColors] = useState([]);
//  const [errors, setErrors] = useState({});
//  const [success, setSuccess] = useState({
//   show: false,
//   message: "",
//   severity: "success",
//  });
//  const [loading, setLoading] = useState(false);
//  const [colorDialogOpen, setColorDialogOpen] = useState(false);
//  const [newColor, setNewColor] = useState("");
//  const [editingColor, setEditingColor] = useState(null);
//  // Debug state to track menuItemId
//  const [debugCategoryValue, setDebugCategoryValue] = useState("");

//  // Size measurement categories
//  const measurementCategories = [
//   "Chest",
//   "Full Length (Back)",
//   "Full Length (Front)",
//   "Pant Waist relax",
//   "Pant Length",
//  ];

//  // Fetch reference data
//  useEffect(() => {
//   const fetchData = async () => {
//    setLoading(true);
//    try {
//     // Fetch menu items
//     const menuResponse = await axios.get(
//      "https://localhost:7142/api/Menu/menu",
//     );
//     if (menuResponse.data) {
//      const flattenMenuItems = (items, prefix = "") =>
//       items.reduce((acc, item) => {
//        // Ensure menuItemId is a string for consistency
//        const safeMenuItemId = String(item.MenuItemId);
//        acc.push({
//         MenuItemId: safeMenuItemId,
//         title: prefix + item.title,
//        });
//        if (item.children?.length > 0) {
//         acc.push(...flattenMenuItems(item.children, prefix + "-- "));
//        }
//        return acc;
//       }, []);

//      const processedMenuItems = flattenMenuItems(menuResponse.data);
//      console.log("Processed menu items:", processedMenuItems);
//      setMenuItems(processedMenuItems);
//     }

//     // Fetch available colors
//     const colorsResponse = await axios.get(
//      "https://localhost:7142/api/Product/available-colors",
//     );
//     setAvailableColors(colorsResponse.data);
//    } catch (error) {
//     console.error("Error fetching initial data:", error);
//     setSuccess({
//      show: true,
//      message: "Failed to load reference data. Please refresh the page.",
//      severity: "error",
//     });
//    } finally {
//     setLoading(false);
//    }
//   };

//   fetchData();
//  }, []);

//  // Handle image preview for primary image
//  useEffect(() => {
//   if (primaryImage) {
//    const reader = new FileReader();
//    reader.onloadend = () => {
//     setPrimaryImagePreview(reader.result);
//    };
//    reader.readAsDataURL(primaryImage);
//   } else {
//    setPrimaryImagePreview(null);
//   }
//  }, [primaryImage]);

//  // Handle image previews for hover images
//  useEffect(() => {
//   if (hoverImages.length === 0) {
//    setHoverImagePreviews([]);
//    return;
//   }

//   const previews = [];
//   hoverImages.forEach((file) => {
//    const reader = new FileReader();
//    reader.onloadend = () => {
//     // Add the result to the previews array
//     previews.push(reader.result);
//     // Once all images are processed, update the state
//     if (previews.length === hoverImages.length) {
//      setHoverImagePreviews([...previews]);
//     }
//    };
//    reader.readAsDataURL(file);
//   });
//  }, [hoverImages]);

//  // Debug effect to track category changes
//  useEffect(() => {
//   console.log("Current menuItemId state:", productDetails.MenuItemId);

//   if (productDetails.MenuItemId) {
//    // Find the selected category title for debugging
//    const selectedItem = menuItems.find(
//     (item) => String(item.menuItemId) === String(productDetails.MenuItemId),
//    );

//    if (selectedItem) {
//     setDebugCategoryValue(`${selectedItem.MenuItemId}: ${selectedItem.title}`);
//    } else {
//     setDebugCategoryValue(`No match for ID: ${productDetails.menuItemId}`);
//    }
//   } else {
//    setDebugCategoryValue("No category selected");
//   }
//  }, [productDetails.menuItemId, menuItems]);

//  // Form validation
//  const validateStep = (step) => {
//   const newErrors = {};

//   switch (step) {
//    case 0: // Basic Info
//     if (!productDetails.Title) newErrors.Title = "Title is required";
//     if (!productDetails.menuItemId)
//      newErrors.menuItemId = "Category is required";
//     if (!productDetails.Handle) newErrors.Handle = "Handle is required";
//     break;

//    case 1: // Pricing
//     if (!productDetails.newPrice || isNaN(Number(productDetails.newPrice))) {
//      newErrors.newPrice = "Valid price is required";
//     }
//     if (productDetails.oldPrice && isNaN(Number(productDetails.oldPrice))) {
//      newErrors.oldPrice = "Old price must be a valid number";
//     }
//     if (!productDetails.Is_In_Stock) {
//      newErrors.Is_In_Stock = "Stock status is required";
//     }
//     break;

//    case 2: // Sizes & Colors
//     if (productDetails.colors.length === 0) {
//      newErrors.colors = "At least one color is required";
//     }

//     if (productDetails.hasSizes) {
//      if (!productDetails.modelHeightSize) {
//       newErrors.modelHeightSize =
//        "Model details are required when sizes are enabled";
//      }

//      if (productDetails.sizes.length === 0) {
//       newErrors.sizes = "At least one size must be added";
//      } else {
//       productDetails.sizes.forEach((size, index) => {
//        if (!size.name) {
//         newErrors[`size_${index}_name`] = "Size name is required";
//        }

//        measurementCategories.forEach((category) => {
//         if (size[category] === null || size[category] === "") {
//          if (!newErrors[`size_${index}_measurements`]) {
//           newErrors[
//            `size_${index}_measurements`
//           ] = `Complete all measurements for ${size.name || "this size"}`;
//          }
//         }
//        });
//       });
//      }
//     }
//     break;

//    case 3: // description
//     if (!productDetails.description)
//      newErrors.description = "description is required";
//     if (!productDetails.material)
//      newErrors.material = "material information is required";
//     if (!productDetails.care) newErrors.care = "Care instructions are required";
//     break;

//    case 4: // Images
//     if (!primaryImage) newErrors.primaryImage = "Primary image is required";
//     break;

//    default:
//     break;
//   }

//   setErrors(newErrors);
//   return Object.keys(newErrors).length === 0;
//  };

//  const validateCompleteForm = () => {
//   let allValid = true;
//   for (let i = 0; i < steps.length; i++) {
//    if (!validateStep(i)) {
//     allValid = false;
//     setActiveStep(i);
//     break;
//    }
//   }
//   return allValid;
//  };

//  // Step navigation handlers
//  const handleNext = () => {
//   if (validateStep(activeStep)) {
//    setActiveStep((prevStep) => prevStep + 1);
//   }
//  };

//  const handleBack = () => {
//   setActiveStep((prevStep) => prevStep - 1);
//  };

//  // Field change handlers
//  const handleChange = (e) => {
//   const { name, value } = e.target;

//   // Log change event for debugging
//   console.log(`handleChange called: ${name} = ${value}`);

//   // Special handling for menuItemId to ensure it's consistent
//   if (name === "menuItemId") {
//    const stringValue = String(value);
//    console.log(`Category selected: ${stringValue}`);

//    // Check if the value exists in our menuItems
//    const selectedItem = menuItems.find(
//     (item) => String(item.menuItemId) === stringValue,
//    );
//    if (selectedItem) {
//     console.log(`Found matching item: ${selectedItem.title}`);
//    } else {
//     console.log(`No matching item found for menuItemId: ${stringValue}`);
//    }

//    setProductDetails((prev) => ({
//     ...prev,
//     [name]: stringValue,
//    }));
//   } else {
//    setProductDetails((prev) => ({ ...prev, [name]: value }));
//   }

//   // Clear error when field is edited
//   if (errors[name]) {
//    setErrors((prev) => {
//     const newErrors = { ...prev };
//     delete newErrors[name];
//     return newErrors;
//    });
//   }
//  };

//  const handlePrimaryImageChange = (e) => {
//   if (e.target.files && e.target.files[0]) {
//    setPrimaryImage(e.target.files[0]);

//    // Clear error if it exists
//    if (errors.primaryImage) {
//     setErrors((prev) => {
//      const newErrors = { ...prev };
//      delete newErrors.primaryImage;
//      return newErrors;
//     });
//    }
//   }
//  };

//  const handleHoverImagesChange = (e) => {
//   if (e.target.files && e.target.files.length > 0) {
//    const newFiles = Array.from(e.target.files);
//    setHoverImages((prev) => [...prev, ...newFiles]);
//   }
//  };

//  const handleRemoveHoverImage = (index) => {
//   setHoverImages((prev) => prev.filter((_, i) => i !== index));
//   setHoverImagePreviews((prev) => prev.filter((_, i) => i !== index));
//  };

//  // Size handlers
//  const handleHasSizesChange = (e) => {
//   const hasSizes = e.target.value === "yes";
//   setProductDetails((prev) => ({
//    ...prev,
//    hasSizes,
//    sizes: hasSizes ? prev.sizes : [],
//    modelHeightSize: hasSizes ? prev.modelHeightSize : "",
//   }));
//  };

//  const handleAddSize = () => {
//   const newSize = {
//    name: "",
//    ...measurementCategories.reduce((acc, cat) => ({ ...acc, [cat]: "" }), {}),
//   };
//   setProductDetails((prev) => ({
//    ...prev,
//    sizes: [...prev.sizes, newSize],
//   }));
//  };

//  const handleRemoveSize = (index) => {
//   setProductDetails((prev) => ({
//    ...prev,
//    sizes: prev.sizes.filter((_, i) => i !== index),
//   }));
//  };

//  const handleSizeChange = (index, field, value) => {
//   setProductDetails((prev) => ({
//    ...prev,
//    sizes: prev.sizes.map((size, i) =>
//     i === index
//      ? { ...size, [field]: field !== "name" ? parseFloat(value) || "" : value }
//      : size,
//    ),
//   }));

//   // Clear relevant errors
//   if (
//    errors[`size_${index}_${field}`] ||
//    errors[`size_${index}_measurements`]
//   ) {
//    setErrors((prev) => {
//     const newErrors = { ...prev };
//     delete newErrors[`size_${index}_${field}`];
//     delete newErrors[`size_${index}_measurements`];
//     return newErrors;
//    });
//   }
//  };

//  // Color handlers
//  const handleColorSelect = (color) => {
//   setProductDetails((prev) => ({
//    ...prev,
//    colors: prev.colors.includes(color)
//     ? prev.colors.filter((c) => c !== color)
//     : [...prev.colors, color],
//   }));

//   // Clear error if it exists
//   if (errors.colors) {
//    setErrors((prev) => {
//     const newErrors = { ...prev };
//     delete newErrors.colors;
//     return newErrors;
//    });
//   }
//  };

//  const handleAddColor = () => {
//   if (newColor.trim()) {
//    setAvailableColors((prev) => [...prev, newColor.trim()]);
//    setProductDetails((prev) => ({
//     ...prev,
//     colors: [...prev.colors, newColor.trim()],
//    }));
//    setNewColor("");
//    setColorDialogOpen(false);

//    // Clear error if it exists
//    if (errors.colors) {
//     setErrors((prev) => {
//      const newErrors = { ...prev };
//      delete newErrors.colors;
//      return newErrors;
//     });
//    }
//   }
//  };

//  const handleEditColor = (color) => {
//   setEditingColor(color);
//   setNewColor(color);
//   setColorDialogOpen(true);
//  };

//  const handleUpdateColor = () => {
//   if (newColor.trim() && editingColor) {
//    setAvailableColors((prev) =>
//     prev.map((c) => (c === editingColor ? newColor.trim() : c)),
//    );
//    setProductDetails((prev) => ({
//     ...prev,
//     colors: prev.colors.map((c) => (c === editingColor ? newColor.trim() : c)),
//    }));
//    setNewColor("");
//    setEditingColor(null);
//    setColorDialogOpen(false);
//   }
//  };

//  const handleRemoveColor = (colorToRemove) => {
//   setAvailableColors((prev) => prev.filter((c) => c !== colorToRemove));
//   setProductDetails((prev) => ({
//    ...prev,
//    colors: prev.colors.filter((c) => c !== colorToRemove),
//   }));
//  };

//  // Submit handler
//  const handleSubmit = async () => {
//   if (!validateCompleteForm()) {
//    setSuccess({
//     show: true,
//     message: "Please complete all required fields",
//     severity: "error",
//    });
//    return;
//   }

//   setLoading(true);
//   try {
//    // Find the selected category title
//    const selectedCategory = menuItems.find(
//     (item) => String(item.menuItemId) === String(productDetails.menuItemId),
//    );

//    // First, submit the product details
//    const productPayload = {
//     ...productDetails,
//     // Ensure menuItemId is properly formatted
//     menuItemId: String(productDetails.menuItemId),
//     category: selectedCategory?.title || "",
//    };

//    console.log("Submitting product with payload:", productPayload);

//    const productResponse = await axios.post(
//     "https://localhost:7142/api/Product/add",
//     productPayload,
//     {
//      headers: { "Content-Type": "application/json" },
//     },
//    );

//    const productData = productResponse.data;

//    if (productData?.success && productData?.productId) {
//     const productId = productData.productId;

//     // Then, upload images if they exist
//     if (primaryImage || hoverImages.length > 0) {
//      const formData = new FormData();
//      if (primaryImage) formData.append("PrimaryImage", primaryImage);
//      hoverImages.forEach((image) => formData.append("HoverImages", image));
//      formData.append("ProductId", productId);

//      await axios.post(
//       "https://localhost:7142/api/Product/upload-images",
//       formData,
//       {
//        headers: { "Content-Type": "multipart/form-data" },
//       },
//      );
//     }

//     // Reset form and show success message
//     setProductDetails({
//      Title: "",
//      MenuItemId: "",
//      newPrice: "",
//      oldPrice: "",
//      hasSizes: false,
//      sizes: [],
//      colors: [],
//      description: "",
//      note: "",
//      material: "",
//      care: "",
//      Handle: "",
//      Is_In_Stock: "yes",
//      modelHeightSize: "",
//     });
//     setPrimaryImage(null);
//     setPrimaryImagePreview(null);
//     setHoverImages([]);
//     setHoverImagePreviews([]);
//     setActiveStep(0);
//     setErrors({});
//     setSuccess({
//      show: true,
//      message: "Product added successfully!",
//      severity: "success",
//     });
//    } else {
//     throw new Error("Failed to add product");
//    }
//   } catch (error) {
//    console.error("Error submitting product:", error);
//    setSuccess({
//     show: true,
//     message: "Failed to add product. Please try again.",
//     severity: "error",
//    });
//   } finally {
//    setLoading(false);
//   }
//  };

//  // Render helper for form steps
//  const getStepContent = (step) => {
//   switch (step) {
//    case 0: // Basic Info
//     return (
//      <Grid container spacing={3}>
//       <Grid item xs={12}>
//        <TextField
//         label="Title"
//         name="Title"
//         value={productDetails.Title}
//         onChange={handleChange}
//         fullWidth
//         required
//         error={!!errors.Title}
//         helperText={errors.Title}
//         InputProps={{
//          startAdornment: (
//           <InputAdornment position="start">
//            <descriptionIcon color="primary" />
//           </InputAdornment>
//          ),
//         }}
//        />
//       </Grid>
//       <Grid item xs={12}>
//        <FormControl fullWidth required error={!!errors.menuItemId}>
//         <InputLabel id="category-label">Category</InputLabel>
//         <Select
//          labelId="category-label"
//          id="menuItemId"
//          name="menuItemId"
//          value={productDetails.MenuItemId || ""}
//          onChange={handleChange}
//          label="Category"
//          startAdornment={
//           <InputAdornment position="start">
//            <CategoryIcon color="primary" />
//           </InputAdornment>
//          }
//         >
//          <MenuItem value="">
//           <em>Select a category</em>
//          </MenuItem>
//          {menuItems.map((item) => (
//           <MenuItem
//            key={String(item.MenuItemId)}
//            value={String(item.MenuItemId)}
//           >
//            {item.title}
//           </MenuItem>
//          ))}
//         </Select>
//         {errors.MenuItemId && (
//          <FormHelperText error>{errors.MenuItemId}</FormHelperText>
//         )}
//         {/* Debug info - can be removed in production */}
//         {productDetails.MenuItemId && (
//          <FormHelperText>Selected: {debugCategoryValue}</FormHelperText>
//         )}
//        </FormControl>
//       </Grid>
//       <Grid item xs={12}>
//        <TextField
//         label="Handle (URL slug)"
//         name="Handle"
//         value={productDetails.Handle}
//         onChange={handleChange}
//         fullWidth
//         required
//         error={!!errors.Handle}
//         helperText={
//          errors.Handle || "Used in product URL, e.g., 'summer-shirt'"
//         }
//         InputProps={{
//          startAdornment: (
//           <InputAdornment position="start">
//            <InfoIcon color="primary" />
//           </InputAdornment>
//          ),
//         }}
//        />
//       </Grid>
//      </Grid>
//     );

//    case 1: // Pricing
//     return (
//      <Grid container spacing={3}>
//       <Grid item xs={12} sm={6}>
//        <TextField
//         label="New Price"
//         name="newPrice"
//         type="number"
//         value={productDetails.newPrice}
//         onChange={handleChange}
//         fullWidth
//         required
//         error={!!errors.newPrice}
//         helperText={errors.newPrice}
//         InputProps={{
//          startAdornment: (
//           <InputAdornment position="start">
//            <AttachMoneyIcon color="primary" />
//           </InputAdornment>
//          ),
//         }}
//        />
//       </Grid>
//       <Grid item xs={12} sm={6}>
//        <TextField
//         label="Old Price (Optional)"
//         name="oldPrice"
//         type="number"
//         value={productDetails.oldPrice}
//         onChange={handleChange}
//         fullWidth
//         error={!!errors.oldPrice}
//         helperText={errors.oldPrice || "For sale/discount display"}
//         InputProps={{
//          startAdornment: (
//           <InputAdornment position="start">
//            <AttachMoneyIcon color="primary" />
//           </InputAdornment>
//          ),
//         }}
//        />
//       </Grid>
//       <Grid item xs={12}>
//        <FormControl component="fieldset" required error={!!errors.Is_In_Stock}>
//         <Typography variant="subtitle1" gutterBottom>
//          Stock Status
//         </Typography>
//         <RadioGroup
//          row
//          name="Is_In_Stock"
//          value={productDetails.Is_In_Stock}
//          onChange={handleChange}
//         >
//          <FormControlLabel value="yes" control={<Radio />} label="In Stock" />
//          <FormControlLabel
//           value="no"
//           control={<Radio />}
//           label="Out of Stock"
//          />
//          <FormControlLabel
//           value="preorder"
//           control={<Radio />}
//           label="Pre-order"
//          />
//         </RadioGroup>
//         {errors.Is_In_Stock && (
//          <FormHelperText error>{errors.Is_In_Stock}</FormHelperText>
//         )}
//        </FormControl>
//       </Grid>
//      </Grid>
//     );

//    case 2: // Sizes & Colors
//     return (
//      <Grid container spacing={3}>
//       {/* Colors Section */}
//       <Grid item xs={12}>
//        <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
//         <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//          <PaletteIcon color="primary" sx={{ mr: 1 }} />
//          <Typography variant="h6">Product Colors</Typography>
//         </Box>
//         <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
//          {availableColors.map((color) => (
//           <Chip
//            key={color}
//            label={color}
//            onClick={() => handleColorSelect(color)}
//            onDelete={() => handleRemoveColor(color)}
//            deleteIcon={<DeleteIcon />}
//            color={productDetails.colors.includes(color) ? "primary" : "default"}
//            variant={
//             productDetails.colors.includes(color) ? "filled" : "outlined"
//            }
//            sx={{ m: 0.5 }}
//           />
//          ))}
//          <Chip
//           icon={<AddIcon />}
//           label="Add Color"
//           onClick={() => {
//            setEditingColor(null);
//            setNewColor("");
//            setColorDialogOpen(true);
//           }}
//           color="secondary"
//           variant="outlined"
//           sx={{ m: 0.5 }}
//          />
//         </Box>
//         {errors.colors && (
//          <FormHelperText error>{errors.colors}</FormHelperText>
//         )}
//        </Paper>
//       </Grid>

//       {/* Sizes Section */}
//       <Grid item xs={12}>
//        <Paper elevation={1} sx={{ p: 2 }}>
//         <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//          <StraightenIcon color="primary" sx={{ mr: 1 }} />
//          <Typography variant="h6">Product Sizes</Typography>
//         </Box>
//         <FormControl component="fieldset" sx={{ mb: 2 }}>
//          <Typography variant="subtitle1">
//           Does this product have multiple sizes?
//          </Typography>
//          <RadioGroup
//           row
//           name="hasSizes"
//           value={productDetails.hasSizes ? "yes" : "no"}
//           onChange={handleHasSizesChange}
//          >
//           <FormControlLabel value="yes" control={<Radio />} label="Yes" />
//           <FormControlLabel
//            value="no"
//            control={<Radio />}
//            label="No (One size)"
//           />
//          </RadioGroup>
//         </FormControl>

//         {productDetails.hasSizes && (
//          <>
//           <TextField
//            label="Model Height & Size"
//            name="modelHeightSize"
//            value={productDetails.modelHeightSize}
//            onChange={handleChange}
//            placeholder="e.g., Model is 5'9 and wears size M"
//            fullWidth
//            required
//            sx={{ mb: 3 }}
//            error={!!errors.modelHeightSize}
//            helperText={errors.modelHeightSize}
//           />

//           <Box sx={{ mb: 2 }}>
//            <Typography variant="subtitle1" gutterBottom>
//             Size Chart (all measurements in inches)
//            </Typography>

//            {productDetails.sizes.map((size, index) => (
//             <Card key={index} variant="outlined" sx={{ mb: 2 }}>
//              <CardContent>
//               <Box
//                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
//               >
//                <TextField
//                 label="Size Name"
//                 value={size.name}
//                 onChange={(e) =>
//                  handleSizeChange(index, "name", e.target.value)
//                 }
//                 required
//                 error={!!errors[`size_${index}_name`]}
//                 helperText={errors[`size_${index}_name`]}
//                 sx={{ width: "30%" }}
//                />
//                <IconButton
//                 color="error"
//                 onClick={() => handleRemoveSize(index)}
//                 sx={{ alignSelf: "center" }}
//                >
//                 <DeleteIcon />
//                </IconButton>
//               </Box>

//               <Grid container spacing={2}>
//                {measurementCategories.map((category) => (
//                 <Grid item xs={12} sm={6} md={4} key={category}>
//                  <TextField
//                   label={category}
//                   type="number"
//                   value={size[category]}
//                   onChange={(e) =>
//                    handleSizeChange(index, category, e.target.value)
//                   }
//                   fullWidth
//                   required
//                   inputProps={{ step: "0.1" }}
//                   error={!!errors[`size_${index}_measurements`]}
//                  />
//                 </Grid>
//                ))}
//               </Grid>
//               {errors[`size_${index}_measurements`] && (
//                <FormHelperText error sx={{ mt: 1 }}>
//                 {errors[`size_${index}_measurements`]}
//                </FormHelperText>
//               )}
//              </CardContent>
//             </Card>
//            ))}

//            <Button
//             variant="outlined"
//             startIcon={<AddIcon />}
//             onClick={handleAddSize}
//             sx={{ mt: 1 }}
//            >
//             Add Size
//            </Button>

//            {errors.sizes && (
//             <FormHelperText error sx={{ mt: 1 }}>
//              {errors.sizes}
//             </FormHelperText>
//            )}
//           </Box>
//          </>
//         )}
//        </Paper>
//       </Grid>
//      </Grid>
//     );

//    case 3: // description
//     return (
//      <Grid container spacing={3}>
//       <Grid item xs={12}>
//        <TextField
//         label="Product description"
//         name="description"
//         value={productDetails.description}
//         onChange={handleChange}
//         multiline
//         rows={4}
//         fullWidth
//         required
//         error={!!errors.description}
//         helperText={errors.description}
//        />
//       </Grid>
//       <Grid item xs={12}>
//        <TextField
//         label="material"
//         name="material"
//         value={productDetails.material}
//         onChange={handleChange}
//         multiline
//         rows={2}
//         fullWidth
//         required
//         error={!!errors.material}
//         helperText={
//          errors.material || "Fabric composition, materials used, etc."
//         }
//        />
//       </Grid>
//       <Grid item xs={12}>
//        <TextField
//         label="Care Instructions"
//         name="care"
//         value={productDetails.care}
//         onChange={handleChange}
//         multiline
//         rows={2}
//         fullWidth
//         required
//         error={!!errors.care}
//         helperText={
//          errors.care || "Washing, drying, and special care information"
//         }
//        />
//       </Grid>
//       <Grid item xs={12}>
//        <TextField
//         label="Additional Notes (Optional)"
//         name="note"
//         value={productDetails.note}
//         onChange={handleChange}
//         multiline
//         rows={2}
//         fullWidth
//         helperText="Any special features, sizing notes, or other details to highlight"
//        />
//       </Grid>
//      </Grid>
//     );

//    case 4: // Images
//     return (
//      <Grid container spacing={3}>
//       <Grid item xs={12}>
//        <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
//         <Typography variant="h6" gutterBottom>
//          Primary Product Image
//         </Typography>
//         <Box
//          sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
//         >
//          {primaryImagePreview ? (
//           <Box sx={{ position: "relative", mb: 2 }}>
//            <img
//             src={primaryImagePreview}
//             alt="Primary"
//             style={{
//              maxWidth: "100%",
//              maxHeight: "200px",
//              borderRadius: "4px",
//             }}
//            />
//            <IconButton
//             sx={{
//              position: "absolute",
//              top: -12,
//              right: -12,
//              bgcolor: "background.paper",
//              boxShadow: 1,
//             }}
//             size="small"
//             onClick={() => {
//              setPrimaryImage(null);
//              setPrimaryImagePreview(null);
//             }}
//            >
//             <CloseIcon fontSize="small" />
//            </IconButton>
//           </Box>
//          ) : (
//           <Box
//            sx={{
//             width: "100%",
//             height: "200px",
//             border: "2px dashed",
//             borderColor: errors.primaryImage ? "error.main" : "divider",
//             borderRadius: 1,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             mb: 2,
//            }}
//           >
//            <input
//             accept="image/*"
//             style={{ display: "none" }}
//             id="primary-image-upload"
//             type="file"
//             onChange={handlePrimaryImageChange}
//            />
//            <label htmlFor="primary-image-upload">
//             <Button
//              variant="outlined"
//              component="span"
//              startIcon={<CloudUploadIcon />}
//             >
//              Upload Main Image
//             </Button>
//            </label>
//           </Box>
//          )}
//          {errors.primaryImage && (
//           <FormHelperText error>{errors.primaryImage}</FormHelperText>
//          )}
//          {primaryImagePreview && (
//           <input
//            accept="image/*"
//            style={{ display: "none" }}
//            id="replace-primary-image"
//            type="file"
//            onChange={handlePrimaryImageChange}
//           />
//          )}
//          {primaryImagePreview && (
//           <label htmlFor="replace-primary-image">
//            <Button
//             variant="outlined"
//             component="span"
//             startIcon={<EditIcon />}
//             size="small"
//            >
//             Change Image
//            </Button>
//           </label>
//          )}
//         </Box>
//        </Paper>
//       </Grid>

//       <Grid item xs={12}>
//        <Paper elevation={1} sx={{ p: 3 }}>
//         <Typography variant="h6" gutterBottom>
//          Additional Product Images (Optional)
//         </Typography>
//         <Box sx={{ mb: 2 }}>
//          <input
//           accept="image/*"
//           style={{ display: "none" }}
//           id="hover-images-upload"
//           type="file"
//           multiple
//           onChange={handleHoverImagesChange}
//          />
//          <label htmlFor="hover-images-upload">
//           <Button
//            variant="outlined"
//            component="span"
//            startIcon={<CollectionsIcon />}
//           >
//            Add Gallery Images
//           </Button>
//          </label>
//         </Box>

//         {hoverImagePreviews.length > 0 && (
//          <Grid container spacing={2}>
//           {hoverImagePreviews.map((preview, index) => (
//            <Grid item xs={6} sm={4} md={3} key={index}>
//             <Box sx={{ position: "relative" }}>
//              <img
//               src={preview}
//               alt={`Preview ${index + 1}`}
//               style={{
//                width: "100%",
//                height: "100px",
//                objectFit: "cover",
//                borderRadius: "4px",
//               }}
//              />
//              <IconButton
//               sx={{
//                position: "absolute",
//                top: -8,
//                right: -8,
//                bgcolor: "background.paper",
//                boxShadow: 1,
//               }}
//               size="small"
//               onClick={() => handleRemoveHoverImage(index)}
//              >
//               <CloseIcon fontSize="small" />
//              </IconButton>
//             </Box>
//            </Grid>
//           ))}
//          </Grid>
//         )}
//        </Paper>
//       </Grid>
//      </Grid>
//     );

//    default:
//     return "Unknown step";
//   }
//  };
//  const renderColorDialog = () => (
//   <Dialog open={colorDialogOpen} onClose={() => setColorDialogOpen(false)}>
//    <DialogTitle>{editingColor ? "Edit Color" : "Add New Color"}</DialogTitle>
//    <DialogContent>
//     <TextField
//      autoFocus
//      margin="dense"
//      label="Color Name"
//      type="text"
//      fullWidth
//      value={newColor}
//      onChange={(e) => setNewColor(e.target.value)}
//      onKeyPress={(e) => {
//       if (e.key === "Enter") {
//        editingColor ? handleUpdateColor() : handleAddColor();
//       }
//      }}
//     />
//    </DialogContent>
//    <DialogActions>
//     <Button onClick={() => setColorDialogOpen(false)}>Cancel</Button>
//     <Button
//      onClick={editingColor ? handleUpdateColor : handleAddColor}
//      color="primary"
//      disabled={!newColor.trim()}
//     >
//      {editingColor ? "Update" : "Add"}
//     </Button>
//    </DialogActions>
//   </Dialog>
//  );

//  if (loading && !productDetails.Title) {
//   return (
//    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//     <CircularProgress />
//    </Box>
//   );
//  }

//  return (
//   <Box sx={{ maxWidth: 800, margin: "0 auto", p: { xs: 2, sm: 3 } }}>
//    <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 } }}>
//     <Typography variant="h4" gutterBottom align="center" sx={{ mb: 3 }}>
//      Add New Product
//     </Typography>

//     <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
//      {steps.map((label) => (
//       <Step key={label}>
//        <StepLabel>{label}</StepLabel>
//       </Step>
//      ))}
//     </Stepper>

//     <Box sx={{ mt: 2, mb: 4 }}>{getStepContent(activeStep)}</Box>

//     <Divider sx={{ my: 3 }} />

//     <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//      <Button disabled={activeStep === 0} onClick={handleBack}>
//       Back
//      </Button>
//      <Box>
//       {activeStep === steps.length - 1 ? (
//        <Button
//         variant="contained"
//         color="primary"
//         onClick={handleSubmit}
//         startIcon={<SaveIcon />}
//         disabled={loading}
//        >
//         {loading ? "Saving..." : "Save Product"}
//        </Button>
//       ) : (
//        <Button variant="contained" color="primary" onClick={handleNext}>
//         Next
//        </Button>
//       )}
//      </Box>
//     </Box>
//    </Paper>

//    {renderColorDialog()}

//    <Snackbar
//     open={success.show}
//     autoHideDuration={6000}
//     onClose={() => setSuccess({ ...success, show: false })}
//    >
//     <Alert
//      onClose={() => setSuccess({ ...success, show: false })}
//      severity={success.severity || "success"}
//      sx={{ width: "100%" }}
//     >
//      {success.message}
//     </Alert>
//    </Snackbar>
//   </Box>
//  );
// };

// export default AddProduct;
// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import {
//  TextField,
//  Button,
//  MenuItem,
//  Typography,
//  Box,
//  Grid,
//  Alert,
//  FormControl,
//  InputLabel,
//  Select,
//  FormControlLabel,
//  Radio,
//  RadioGroup,
//  Chip,
//  IconButton,
//  Paper,
//  Divider,
//  Snackbar,
//  CircularProgress,
//  Card,
//  CardContent,
//  Tooltip,
//  Dialog,
//  DialogTitle,
//  DialogContent,
//  DialogActions,
//  InputAdornment,
//  Stepper,
//  Step,
//  StepLabel,
//  FormHelperText,
// } from "@mui/material";

// // Import icons
// import {
//  CloudUpload as CloudUploadIcon,
//  Edit as EditIcon,
//  Check as CheckIcon,
//  Close as CloseIcon,
//  Delete as DeleteIcon,
//  Add as AddIcon,
//  Save as SaveIcon,
//  Image as ImageIcon,
//  Collections as CollectionsIcon,
//  Category as CategoryIcon,
//  Info as InfoIcon,
//  Palette as PaletteIcon,
//  Straighten as StraightenIcon,
//  description as descriptionIcon,
//  AttachMoney as AttachMoneyIcon,
// } from "@mui/icons-material";

// // API configuration
// const API_BASE_URL = "https://localhost:7142/api";

// const AddProduct = () => {
//  // Form steps
//  const steps = [
//   "Basic Info",
//   "Pricing",
//   "Sizes & Colors",
//   "description",
//   "Images",
//  ];
//  const [activeStep, setActiveStep] = useState(0);

//  // State for images
//  const [primaryImage, setPrimaryImage] = useState(null);
//  const [primaryImagePreview, setPrimaryImagePreview] = useState(null);
//  const [hoverImages, setHoverImages] = useState([]);
//  const [hoverImagePreviews, setHoverImagePreviews] = useState([]);

//  // Product details state
//  const [productDetails, setProductDetails] = useState({
//   name: "",
//   Title: "",
//   menuItemId: "",
//   newPrice: "",
//   oldPrice: "",
//   hasSizes: false,
//   sizes: [],
//   colors: [],
//   description: "",
//   note: "",
//   material: "",
//   care: "",
//   Handle: "",
//   Is_In_Stock: "yes",
//   modelHeightSize: "",
//  });

//  // Reference data states
//  const [menuItems, setMenuItems] = useState([]);
//  const [availableColors, setAvailableColors] = useState([]);
//  const [errors, setErrors] = useState({});
//  const [success, setSuccess] = useState({ show: false, message: "" });
//  const [loading, setLoading] = useState(false);
//  const [colorDialogOpen, setColorDialogOpen] = useState(false);
//  const [newColor, setNewColor] = useState("");
//  const [editingColor, setEditingColor] = useState(null);

//  // Size measurement categories
//  const measurementCategories = [
//   "Chest",
//   "Full Length (Back)",
//   "Full Length (Front)",
//   "Pant Waist relax",
//   "Pant Length",
//  ];

//  // Fetch reference data
//  useEffect(() => {
//   const fetchData = async () => {
//    setLoading(true);
//    try {
//     // Fetch menu items
//     const menuResponse = await axios.get(`${API_BASE_URL}/Menu/menu`);
//     if (menuResponse.data) {
//      const flattenMenuItems = (items, prefix = "") =>
//       items.reduce((acc, item) => {
//        acc.push({ menuItemId: item.menuItemId, title: prefix + item.title });
//        if (item.children?.length > 0) {
//         acc.push(...flattenMenuItems(item.children, prefix + "-- "));
//        }
//        return acc;
//       }, []);
//      setMenuItems(flattenMenuItems(menuResponse.data));
//     }

//     // Fetch available colors
//     const colorsResponse = await axios.get(
//      `${API_BASE_URL}/Product/available-colors`,
//     );
//     setAvailableColors(colorsResponse.data);
//    } catch (error) {
//     console.error("Error fetching initial data:", error);
//     setSuccess({
//      show: true,
//      message: "Failed to load reference data. Please refresh the page.",
//      severity: "error",
//     });
//    } finally {
//     setLoading(false);
//    }
//   };

//   fetchData();
//  }, []);

//  // Handle image preview for primary image
//  useEffect(() => {
//   if (primaryImage) {
//    const reader = new FileReader();
//    reader.onloadend = () => {
//     setPrimaryImagePreview(reader.result);
//    };
//    reader.readAsDataURL(primaryImage);
//   } else {
//    setPrimaryImagePreview(null);
//   }
//  }, [primaryImage]);

//  // Handle image previews for hover images
//  useEffect(() => {
//   const previews = [];
//   hoverImages.forEach((file) => {
//    const reader = new FileReader();
//    reader.onloadend = () => {
//     previews.push(reader.result);
//     if (previews.length === hoverImages.length) {
//      setHoverImagePreviews([...previews]);
//     }
//    };
//    reader.readAsDataURL(file);
//   });
//  }, [hoverImages]);

//  // Form validation
//  const validateStep = (step) => {
//   const newErrors = {};

//   switch (step) {
//    case 0: // Basic Info
//     if (!productDetails.Title) newErrors.Title = "Title is required";
//     if (!productDetails.menuItemId)
//      newErrors.menuItemId = "Category is required";
//     if (!productDetails.Handle) newErrors.Handle = "Handle is required";
//     break;

//    case 1: // Pricing
//     if (!productDetails.newPrice || isNaN(Number(productDetails.newPrice))) {
//      newErrors.newPrice = "Valid price is required";
//     }
//     if (productDetails.oldPrice && isNaN(Number(productDetails.oldPrice))) {
//      newErrors.oldPrice = "Old price must be a valid number";
//     }
//     if (!productDetails.Is_In_Stock) {
//      newErrors.Is_In_Stock = "Stock status is required";
//     }
//     break;

//    case 2: // Sizes & Colors
//     if (productDetails.colors.length === 0) {
//      newErrors.colors = "At least one color is required";
//     }

//     if (productDetails.hasSizes) {
//      if (!productDetails.modelHeightSize) {
//       newErrors.modelHeightSize =
//        "Model details are required when sizes are enabled";
//      }

//      if (productDetails.sizes.length === 0) {
//       newErrors.sizes = "At least one size must be added";
//      } else {
//       productDetails.sizes.forEach((size, index) => {
//        if (!size.name) {
//         newErrors[`size_${index}_name`] = "Size name is required";
//        }

//        measurementCategories.forEach((category) => {
//         if (size[category] === null || size[category] === "") {
//          if (!newErrors[`size_${index}_measurements`]) {
//           newErrors[
//            `size_${index}_measurements`
//           ] = `Complete all measurements for ${size.name || "this size"}`;
//          }
//         }
//        });
//       });
//      }
//     }
//     break;

//    case 3: // description
//     if (!productDetails.description)
//      newErrors.description = "description is required";
//     if (!productDetails.material)
//      newErrors.material = "material information is required";
//     if (!productDetails.care) newErrors.care = "Care instructions are required";
//     break;

//    case 4: // Images
//     if (!primaryImage) newErrors.primaryImage = "Primary image is required";
//     break;

//    default:
//     break;
//   }

//   setErrors(newErrors);
//   return Object.keys(newErrors).length === 0;
//  };

//  const validateCompleteForm = () => {
//   let allValid = true;
//   for (let i = 0; i < steps.length; i++) {
//    if (!validateStep(i)) {
//     allValid = false;
//     setActiveStep(i);
//     break;
//    }
//   }
//   return allValid;
//  };

//  // Step navigation handlers
//  const handleNext = () => {
//   if (validateStep(activeStep)) {
//    setActiveStep((prevStep) => prevStep + 1);
//   }
//  };

//  const handleBack = () => {
//   setActiveStep((prevStep) => prevStep - 1);
//  };

//  // Field change handlers
//  const handleChange = (e) => {
//   const { name, value } = e.target;
//   setProductDetails((prev) => ({ ...prev, [name]: value }));

//   // Clear error when field is edited
//   if (errors[name]) {
//    setErrors((prev) => {
//     const newErrors = { ...prev };
//     delete newErrors[name];
//     return newErrors;
//    });
//   }
//  };

//  const handlePrimaryImageChange = (e) => {
//   if (e.target.files && e.target.files[0]) {
//    setPrimaryImage(e.target.files[0]);

//    // Clear error if it exists
//    if (errors.primaryImage) {
//     setErrors((prev) => {
//      const newErrors = { ...prev };
//      delete newErrors.primaryImage;
//      return newErrors;
//     });
//    }
//   }
//  };

//  const handleHoverImagesChange = (e) => {
//   if (e.target.files && e.target.files.length > 0) {
//    setHoverImages((prev) => [...prev, ...Array.from(e.target.files)]);
//   }
//  };

//  const handleRemoveHoverImage = (index) => {
//   setHoverImages((prev) => prev.filter((_, i) => i !== index));
//   setHoverImagePreviews((prev) => prev.filter((_, i) => i !== index));
//  };

//  // Size handlers
//  const handleHasSizesChange = (e) => {
//   const hasSizes = e.target.value === "yes";
//   setProductDetails((prev) => ({
//    ...prev,
//    hasSizes,
//    sizes: hasSizes ? prev.sizes : [],
//    modelHeightSize: hasSizes ? prev.modelHeightSize : "",
//   }));
//  };

//  const handleAddSize = () => {
//   const newSize = {
//    name: "",
//    ...measurementCategories.reduce((acc, cat) => ({ ...acc, [cat]: "" }), {}),
//   };
//   setProductDetails((prev) => ({
//    ...prev,
//    sizes: [...prev.sizes, newSize],
//   }));
//  };

//  const handleRemoveSize = (index) => {
//   setProductDetails((prev) => ({
//    ...prev,
//    sizes: prev.sizes.filter((_, i) => i !== index),
//   }));
//  };

//  const handleSizeChange = (index, field, value) => {
//   setProductDetails((prev) => ({
//    ...prev,
//    sizes: prev.sizes.map((size, i) =>
//     i === index
//      ? { ...size, [field]: field !== "name" ? parseFloat(value) || "" : value }
//      : size,
//    ),
//   }));

//   // Clear relevant errors
//   if (
//    errors[`size_${index}_${field}`] ||
//    errors[`size_${index}_measurements`]
//   ) {
//    setErrors((prev) => {
//     const newErrors = { ...prev };
//     delete newErrors[`size_${index}_${field}`];
//     delete newErrors[`size_${index}_measurements`];
//     return newErrors;
//    });
//   }
//  };

//  // Color handlers
//  const handleColorSelect = (color) => {
//   setProductDetails((prev) => ({
//    ...prev,
//    colors: prev.colors.includes(color)
//     ? prev.colors.filter((c) => c !== color)
//     : [...prev.colors, color],
//   }));

//   // Clear error if it exists
//   if (errors.colors) {
//    setErrors((prev) => {
//     const newErrors = { ...prev };
//     delete newErrors.colors;
//     return newErrors;
//    });
//   }
//  };

//  const handleAddColor = () => {
//   if (newColor.trim()) {
//    setAvailableColors((prev) => [...prev, newColor.trim()]);
//    setProductDetails((prev) => ({
//     ...prev,
//     colors: [...prev.colors, newColor.trim()],
//    }));
//    setNewColor("");
//    setColorDialogOpen(false);

//    // Clear error if it exists
//    if (errors.colors) {
//     setErrors((prev) => {
//      const newErrors = { ...prev };
//      delete newErrors.colors;
//      return newErrors;
//     });
//    }
//   }
//  };

//  const handleEditColor = (color) => {
//   setEditingColor(color);
//   setNewColor(color);
//   setColorDialogOpen(true);
//  };

//  const handleUpdateColor = () => {
//   if (newColor.trim() && editingColor) {
//    setAvailableColors((prev) =>
//     prev.map((c) => (c === editingColor ? newColor.trim() : c)),
//    );
//    setProductDetails((prev) => ({
//     ...prev,
//     colors: prev.colors.map((c) => (c === editingColor ? newColor.trim() : c)),
//    }));
//    setNewColor("");
//    setEditingColor(null);
//    setColorDialogOpen(false);
//   }
//  };

//  const handleRemoveColor = (colorToRemove) => {
//   setAvailableColors((prev) => prev.filter((c) => c !== colorToRemove));
//   setProductDetails((prev) => ({
//    ...prev,
//    colors: prev.colors.filter((c) => c !== colorToRemove),
//   }));
//  };

//  // Submit handler
//  const handleSubmit = async () => {
//   if (!validateCompleteForm()) {
//    setSuccess({
//     show: true,
//     message: "Please complete all required fields",
//     severity: "error",
//    });
//    return;
//   }

//   setLoading(true);
//   try {
//    // First, submit the product details
//    const productPayload = {
//     ...productDetails,
//     category:
//      menuItems.find((item) => item.menuItemId === productDetails.menuItemId)
//       ?.title || "",
//    };

//    const productResponse = await axios.post(
//     `${API_BASE_URL}/Product/add`,
//     productPayload,
//     {
//      headers: { "Content-Type": "application/json" },
//     },
//    );

//    const productData = productResponse.data;

//    if (productData?.success && productData?.productId) {
//     const productId = productData.productId;

//     // Then, upload images if they exist
//     if (primaryImage || hoverImages.length > 0) {
//      const formData = new FormData();
//      if (primaryImage) formData.append("PrimaryImage", primaryImage);
//      hoverImages.forEach((image) => formData.append("HoverImages", image));
//      formData.append("ProductId", productId);

//      await axios.post(`${API_BASE_URL}/Product/upload-images`, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//      });
//     }

//     // Reset form and show success message
//     setProductDetails({
//      name: "",
//      Title: "",
//      menuItemId: "",
//      newPrice: "",
//      oldPrice: "",
//      hasSizes: false,
//      sizes: [],
//      colors: [],
//      description: "",
//      note: "",
//      material: "",
//      care: "",
//      Handle: "",
//      Is_In_Stock: "yes",
//      modelHeightSize: "",
//     });
//     setPrimaryImage(null);
//     setPrimaryImagePreview(null);
//     setHoverImages([]);
//     setHoverImagePreviews([]);
//     setActiveStep(0);
//     setErrors({});
//     setSuccess({
//      show: true,
//      message: "Product added successfully!",
//      severity: "success",
//     });
//    } else {
//     throw new Error("Failed to add product");
//    }
//   } catch (error) {
//    console.error("Error submitting product:", error);
//    setSuccess({
//     show: true,
//     message: "Failed to add product. Please try again.",
//     severity: "error",
//    });
//   } finally {
//    setLoading(false);
//   }
//  };

//  // Render helper for form steps
//  const getStepContent = (step) => {
//   switch (step) {
//    case 0: // Basic Info
//     return (
//      <Grid container spacing={3}>
//       <Grid item xs={12}>
//        <TextField
//         label="Title"
//         name="Title"
//         value={productDetails.Title}
//         onChange={handleChange}
//         fullWidth
//         required
//         error={!!errors.Title}
//         helperText={errors.Title}
//         InputProps={{
//          startAdornment: (
//           <InputAdornment position="start">
//            <descriptionIcon color="primary" />
//           </InputAdornment>
//          ),
//         }}
//        />
//       </Grid>
//       <Grid item xs={12}>
//        <FormControl fullWidth required error={!!errors.menuItemId}>
//         <InputLabel id="category-label">Category</InputLabel>
//         <Select
//          labelId="category-label"
//          id="menuItemId"
//          name="menuItemId"
//          value={productDetails.menuItemId}
//          onChange={handleChange}
//          label="Category"
//          startAdornment={
//           <InputAdornment position="start">
//            <CategoryIcon color="primary" />
//           </InputAdornment>
//          }
//         >
//          <MenuItem value="">
//           <em>Select a category</em>
//          </MenuItem>
//          {menuItems.map((item) => (
//           <MenuItem key={item.menuItemId} value={item.menuItemId}>
//            {item.title}
//           </MenuItem>
//          ))}
//         </Select>
//         {errors.menuItemId && (
//          <FormHelperText error>{errors.menuItemId}</FormHelperText>
//         )}
//        </FormControl>
//       </Grid>
//       <Grid item xs={12}>
//        <TextField
//         label="Handle (URL slug)"
//         name="Handle"
//         value={productDetails.Handle}
//         onChange={handleChange}
//         fullWidth
//         required
//         error={!!errors.Handle}
//         helperText={
//          errors.Handle || "Used in product URL, e.g., 'summer-shirt'"
//         }
//         InputProps={{
//          startAdornment: (
//           <InputAdornment position="start">
//            <InfoIcon color="primary" />
//           </InputAdornment>
//          ),
//         }}
//        />
//       </Grid>
//      </Grid>
//     );

//    case 1: // Pricing
//     return (
//      <Grid container spacing={3}>
//       <Grid item xs={12} sm={6}>
//        <TextField
//         label="New Price"
//         name="newPrice"
//         type="number"
//         value={productDetails.newPrice}
//         onChange={handleChange}
//         fullWidth
//         required
//         error={!!errors.newPrice}
//         helperText={errors.newPrice}
//         InputProps={{
//          startAdornment: (
//           <InputAdornment position="start">
//            <AttachMoneyIcon color="primary" />
//           </InputAdornment>
//          ),
//         }}
//        />
//       </Grid>
//       <Grid item xs={12} sm={6}>
//        <TextField
//         label="Old Price (Optional)"
//         name="oldPrice"
//         type="number"
//         value={productDetails.oldPrice}
//         onChange={handleChange}
//         fullWidth
//         error={!!errors.oldPrice}
//         helperText={errors.oldPrice || "For sale/discount display"}
//         InputProps={{
//          startAdornment: (
//           <InputAdornment position="start">
//            <AttachMoneyIcon color="primary" />
//           </InputAdornment>
//          ),
//         }}
//        />
//       </Grid>
//       <Grid item xs={12}>
//        <FormControl component="fieldset" required error={!!errors.Is_In_Stock}>
//         <Typography variant="subtitle1" gutterBottom>
//          Stock Status
//         </Typography>
//         <RadioGroup
//          row
//          name="Is_In_Stock"
//          value={productDetails.Is_In_Stock}
//          onChange={handleChange}
//         >
//          <FormControlLabel value="yes" control={<Radio />} label="In Stock" />
//          <FormControlLabel
//           value="no"
//           control={<Radio />}
//           label="Out of Stock"
//          />
//          <FormControlLabel
//           value="preorder"
//           control={<Radio />}
//           label="Pre-order"
//          />
//         </RadioGroup>
//         {errors.Is_In_Stock && (
//          <FormHelperText error>{errors.Is_In_Stock}</FormHelperText>
//         )}
//        </FormControl>
//       </Grid>
//      </Grid>
//     );

//    case 2: // Sizes & Colors
//     return (
//      <Grid container spacing={3}>
//       {/* Colors Section */}
//       <Grid item xs={12}>
//        <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
//         <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//          <PaletteIcon color="primary" sx={{ mr: 1 }} />
//          <Typography variant="h6">Product Colors</Typography>
//         </Box>
//         <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
//          {availableColors.map((color) => (
//           <Chip
//            key={color}
//            label={color}
//            onClick={() => handleColorSelect(color)}
//            onDelete={() => handleRemoveColor(color)}
//            deleteIcon={<DeleteIcon />}
//            color={productDetails.colors.includes(color) ? "primary" : "default"}
//            variant={
//             productDetails.colors.includes(color) ? "filled" : "outlined"
//            }
//            sx={{ m: 0.5 }}
//           />
//          ))}
//          <Chip
//           icon={<AddIcon />}
//           label="Add Color"
//           onClick={() => {
//            setEditingColor(null);
//            setNewColor("");
//            setColorDialogOpen(true);
//           }}
//           color="secondary"
//           variant="outlined"
//           sx={{ m: 0.5 }}
//          />
//         </Box>
//         {errors.colors && (
//          <FormHelperText error>{errors.colors}</FormHelperText>
//         )}
//        </Paper>
//       </Grid>

//       {/* Sizes Section */}
//       <Grid item xs={12}>
//        <Paper elevation={1} sx={{ p: 2 }}>
//         <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//          <StraightenIcon color="primary" sx={{ mr: 1 }} />
//          <Typography variant="h6">Product Sizes</Typography>
//         </Box>
//         <FormControl component="fieldset" sx={{ mb: 2 }}>
//          <Typography variant="subtitle1">
//           Does this product have multiple sizes?
//          </Typography>
//          <RadioGroup
//           row
//           name="hasSizes"
//           value={productDetails.hasSizes ? "yes" : "no"}
//           onChange={handleHasSizesChange}
//          >
//           <FormControlLabel value="yes" control={<Radio />} label="Yes" />
//           <FormControlLabel
//            value="no"
//            control={<Radio />}
//            label="No (One size)"
//           />
//          </RadioGroup>
//         </FormControl>

//         {productDetails.hasSizes && (
//          <>
//           <TextField
//            label="Model Height & Size"
//            name="modelHeightSize"
//            value={productDetails.modelHeightSize}
//            onChange={handleChange}
//            placeholder="e.g., Model is 5'9 and wears size M"
//            fullWidth
//            required
//            sx={{ mb: 3 }}
//            error={!!errors.modelHeightSize}
//            helperText={errors.modelHeightSize}
//           />

//           <Box sx={{ mb: 2 }}>
//            <Typography variant="subtitle1" gutterBottom>
//             Size Chart (all measurements in inches)
//            </Typography>

//            {productDetails.sizes.map((size, index) => (
//             <Card key={index} variant="outlined" sx={{ mb: 2 }}>
//              <CardContent>
//               <Box
//                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
//               >
//                <TextField
//                 label="Size Name"
//                 value={size.name}
//                 onChange={(e) =>
//                  handleSizeChange(index, "name", e.target.value)
//                 }
//                 required
//                 error={!!errors[`size_${index}_name`]}
//                 helperText={errors[`size_${index}_name`]}
//                 sx={{ width: "30%" }}
//                />
//                <IconButton
//                 color="error"
//                 onClick={() => handleRemoveSize(index)}
//                 sx={{ alignSelf: "center" }}
//                >
//                 <DeleteIcon />
//                </IconButton>
//               </Box>

//               <Grid container spacing={2}>
//                {measurementCategories.map((category) => (
//                 <Grid item xs={12} sm={6} md={4} key={category}>
//                  <TextField
//                   label={category}
//                   type="number"
//                   value={size[category]}
//                   onChange={(e) =>
//                    handleSizeChange(index, category, e.target.value)
//                   }
//                   fullWidth
//                   required
//                   inputProps={{ step: "0.1" }}
//                   error={!!errors[`size_${index}_measurements`]}
//                  />
//                 </Grid>
//                ))}
//               </Grid>
//               {errors[`size_${index}_measurements`] && (
//                <FormHelperText error sx={{ mt: 1 }}>
//                 {errors[`size_${index}_measurements`]}
//                </FormHelperText>
//               )}
//              </CardContent>
//             </Card>
//            ))}

//            <Button
//             variant="outlined"
//             startIcon={<AddIcon />}
//             onClick={handleAddSize}
//             sx={{ mt: 1 }}
//            >
//             Add Size
//            </Button>

//            {errors.sizes && (
//             <FormHelperText error sx={{ mt: 1 }}>
//              {errors.sizes}
//             </FormHelperText>
//            )}
//           </Box>
//          </>
//         )}
//        </Paper>
//       </Grid>
//      </Grid>
//     );

//    case 3: // description
//     return (
//      <Grid container spacing={3}>
//       <Grid item xs={12}>
//        <TextField
//         label="Product description"
//         name="description"
//         value={productDetails.description}
//         onChange={handleChange}
//         multiline
//         rows={4}
//         fullWidth
//         required
//         error={!!errors.description}
//         helperText={errors.description}
//        />
//       </Grid>
//       <Grid item xs={12}>
//        <TextField
//         label="material"
//         name="material"
//         value={productDetails.material}
//         onChange={handleChange}
//         multiline
//         rows={2}
//         fullWidth
//         required
//         error={!!errors.material}
//         helperText={
//          errors.material || "Fabric composition, materials used, etc."
//         }
//        />
//       </Grid>
//       <Grid item xs={12}>
//        <TextField
//         label="Care Instructions"
//         name="care"
//         value={productDetails.care}
//         onChange={handleChange}
//         multiline
//         rows={2}
//         fullWidth
//         required
//         error={!!errors.care}
//         helperText={
//          errors.care || "Washing, drying, and special care information"
//         }
//        />
//       </Grid>
//       <Grid item xs={12}>
//        <TextField
//         label="Additional Notes (Optional)"
//         name="note"
//         value={productDetails.note}
//         onChange={handleChange}
//         multiline
//         rows={2}
//         fullWidth
//         helperText="Any special features, sizing notes, or other details to highlight"
//        />
//       </Grid>
//      </Grid>
//     );

//    case 4: // Images
//     return (
//      <Grid container spacing={3}>
//       <Grid item xs={12}>
//        <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
//         <Typography variant="h6" gutterBottom>
//          Primary Product Image
//         </Typography>
//         <Box
//          sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
//         >
//          {primaryImagePreview ? (
//           <Box sx={{ position: "relative", mb: 2 }}>
//            <img
//             src={primaryImagePreview}
//             alt="Primary"
//             style={{
//              maxWidth: "100%",
//              maxHeight: "200px",
//              borderRadius: "4px",
//             }}
//            />
//            <IconButton
//             sx={{
//              position: "absolute",
//              top: -12,
//              right: -12,
//              bgcolor: "background.paper",
//              boxShadow: 1,
//             }}
//             size="small"
//             onClick={() => {
//              setPrimaryImage(null);
//              setPrimaryImagePreview(null);
//             }}
//            >
//             <CloseIcon fontSize="small" />
//            </IconButton>
//           </Box>
//          ) : (
//           <Box
//            sx={{
//             width: "100%",
//             height: "200px",
//             border: "2px dashed",
//             borderColor: errors.primaryImage ? "error.main" : "divider",
//             borderRadius: 1,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             mb: 2,
//            }}
//           >
//            <input
//             accept="image/*"
//             style={{ display: "none" }}
//             id="primary-image-upload"
//             type="file"
//             onChange={handlePrimaryImageChange}
//            />
//            <label htmlFor="primary-image-upload">
//             <Button
//              variant="outlined"
//              component="span"
//              startIcon={<CloudUploadIcon />}
//             >
//              Upload Main Image
//             </Button>
//            </label>
//           </Box>
//          )}
//          {errors.primaryImage && (
//           <FormHelperText error>{errors.primaryImage}</FormHelperText>
//          )}
//          {primaryImagePreview && (
//           <input
//            accept="image/*"
//            style={{ display: "none" }}
//            id="replace-primary-image"
//            type="file"
//            onChange={handlePrimaryImageChange}
//           />
//          )}
//          {primaryImagePreview && (
//           <label htmlFor="replace-primary-image">
//            <Button
//             variant="outlined"
//             component="span"
//             startIcon={<EditIcon />}
//             size="small"
//            >
//             Change Image
//            </Button>
//           </label>
//          )}
//         </Box>
//        </Paper>
//       </Grid>

//       <Grid item xs={12}>
//        <Paper elevation={1} sx={{ p: 3 }}>
//         <Typography variant="h6" gutterBottom>
//          Additional Product Images (Optional)
//         </Typography>
//         <Box sx={{ mb: 2 }}>
//          <input
//           accept="image/*"
//           style={{ display: "none" }}
//           id="hover-images-upload"
//           type="file"
//           multiple
//           onChange={handleHoverImagesChange}
//          />
//          <label htmlFor="hover-images-upload">
//           <Button
//            variant="outlined"
//            component="span"
//            startIcon={<CollectionsIcon />}
//           >
//            Add Gallery Images
//           </Button>
//          </label>
//         </Box>

//         {hoverImagePreviews.length > 0 && (
//          <Grid container spacing={2}>
//           {hoverImagePreviews.map((preview, index) => (
//            <Grid item xs={6} sm={4} md={3} key={index}>
//             <Box sx={{ position: "relative" }}>
//              <img
//               src={preview}
//               alt={`Preview ${index + 1}`}
//               style={{
//                width: "100%",
//                height: "100px",
//                objectFit: "cover",
//                borderRadius: "4px",
//               }}
//              />
//              <IconButton
//               sx={{
//                position: "absolute",
//                top: -8,
//                right: -8,
//                bgcolor: "background.paper",
//                boxShadow: 1,
//               }}
//               size="small"
//               onClick={() => handleRemoveHoverImage(index)}
//              >
//               <CloseIcon fontSize="small" />
//              </IconButton>
//             </Box>
//            </Grid>
//           ))}
//          </Grid>
//         )}
//        </Paper>
//       </Grid>
//      </Grid>
//     );

//    default:
//     return "Unknown step";
//   }
//  };
//  const renderColorDialog = () => (
//   <Dialog open={colorDialogOpen} onClose={() => setColorDialogOpen(false)}>
//    <DialogTitle>{editingColor ? "Edit Color" : "Add New Color"}</DialogTitle>
//    <DialogContent>
//     <TextField
//      autoFocus
//      margin="dense"
//      label="Color Name"
//      type="text"
//      fullWidth
//      value={newColor}
//      onChange={(e) => setNewColor(e.target.value)}
//      onKeyPress={(e) => {
//       if (e.key === "Enter") {
//        editingColor ? handleUpdateColor() : handleAddColor();
//       }
//      }}
//     />
//    </DialogContent>
//    <DialogActions>
//     <Button onClick={() => setColorDialogOpen(false)}>Cancel</Button>
//     <Button
//      onClick={editingColor ? handleUpdateColor : handleAddColor}
//      color="primary"
//      disabled={!newColor.trim()}
//     >
//      {editingColor ? "Update" : "Add"}
//     </Button>
//    </DialogActions>
//   </Dialog>
//  );

//  if (loading && !productDetails.Title) {
//   return (
//    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//     <CircularProgress />
//    </Box>
//   );
//  }

//  return (
//   <Box sx={{ maxWidth: 800, margin: "0 auto", p: { xs: 2, sm: 3 } }}>
//    <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 } }}>
//     <Typography variant="h4" gutterBottom align="center" sx={{ mb: 3 }}>
//      Add New Product
//     </Typography>

//     <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
//      {steps.map((label) => (
//       <Step key={label}>
//        <StepLabel>{label}</StepLabel>
//       </Step>
//      ))}
//     </Stepper>

//     <Box sx={{ mt: 2, mb: 4 }}>{getStepContent(activeStep)}</Box>

//     <Divider sx={{ my: 3 }} />

//     <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//      <Button disabled={activeStep === 0} onClick={handleBack}>
//       Back
//      </Button>
//      <Box>
//       {activeStep === steps.length - 1 ? (
//        <Button
//         variant="contained"
//         color="primary"
//         onClick={handleSubmit}
//         startIcon={<SaveIcon />}
//         disabled={loading}
//        >
//         {loading ? "Saving..." : "Save Product"}
//        </Button>
//       ) : (
//        <Button variant="contained" color="primary" onClick={handleNext}>
//         Next
//        </Button>
//       )}
//      </Box>
//     </Box>
//    </Paper>

//    {renderColorDialog()}

//    <Snackbar
//     open={success.show}
//     autoHideDuration={6000}
//     onClose={() => setSuccess({ ...success, show: false })}
//    >
//     <Alert
//      onClose={() => setSuccess({ ...success, show: false })}
//      severity={success.severity || "success"}
//      sx={{ width: "100%" }}
//     >
//      {success.message}
//     </Alert>
//    </Snackbar>
//   </Box>
//  );
// };

// export default AddProduct;

// import React, { useState, useEffect, useCallback } from "react";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import EditIcon from "@mui/icons-material/Edit";
// import CheckIcon from "@mui/icons-material/Check";
// import CloseIcon from "@mui/icons-material/Close";
// import axios from "axios";
// import {
//  TextField,
//  Button,
//  MenuItem,
//  Typography,
//  Box,
//  Grid,
//  Alert,
//  FormControl,
//  InputLabel,
//  Select,
//  FormControlLabel,
//  Radio,
//  RadioGroup,
//  FormGroup,
//  Checkbox,
//  Chip,
//  IconButton,
// } from "@mui/material";

// const API_BASE_URL = "https://localhost:7142/api"; // Centralize API URL

// const AddProduct = () => {
//  const [image, setImage] = useState(null);
//  const [hoverImages, setHoverImages] = useState([]);
//  const [hoverImagesInput, setHoverImagesInput] = useState(null);
//  const [productDetails, setProductDetails] = useState({
//   name: "",
//   Title: "",
//   menuItemId: "",
//   newPrice: "",
//   oldPrice: "",
//   hasSizes: false,
//   sizes: [],
//   colors: [],
//   description: "",
//   Handle: "",
//   Is_In_Stock: "",
//  });
//  const [menuItems, setMenuItems] = useState([]);
//  const [sizeCategories, setSizeCategories] = useState([]);
//  const [availableColors, setAvailableColors] = useState([]);
//  const [errors, setErrors] = useState({});
//  const [successMessage, setSuccessMessage] = useState("");
//  const [editingColor, setEditingColor] = useState(null);
//  const [newColorValue, setNewColorValue] = useState("");
//  const [loading, setLoading] = useState(false); // For API request status

//  // useCallback for memoizing functions that are dependencies in useEffect
//  const fetchMenuItems = useCallback(async () => {
//   setLoading(true);
//   try {
//    const response = await axios.get(`${API_BASE_URL}/Menu/menu`);
//    if (response.data) {
//     const flattenMenuItems = (items, prefix = "") =>
//      items.reduce((acc, item) => {
//       acc.push({ menuItemId: item.menuItemId, title: prefix + item.title });
//       if (item.children?.length > 0) {
//        acc.push(...flattenMenuItems(item.children, prefix + "-- "));
//       }
//       return acc;
//      }, []);
//     setMenuItems(flattenMenuItems(response.data));
//    }
//   } catch (error) {
//    console.error("Error fetching menu items:", error);
//    // Consider displaying an error message to the user
//   } finally {
//    setLoading(false);
//   }
//  }, []);

//  const fetchSizeCategories = useCallback(async () => {
//   setLoading(true);
//   try {
//    const response = await axios.get(`${API_BASE_URL}/Product/size-categories`);
//    setSizeCategories(response.data);
//   } catch (error) {
//    console.error("Error fetching size categories:", error);
//    // Consider displaying an error message to the user
//   } finally {
//    setLoading(false);
//   }
//  }, []);

//  const fetchAvailableColors = useCallback(async () => {
//   setLoading(true);
//   try {
//    const response = await axios.get(`${API_BASE_URL}/Product/available-colors`);
//    setAvailableColors(response.data);
//   } catch (error) {
//    console.error("Error fetching available colors:", error);
//    // Consider displaying an error message to the user
//   } finally {
//    setLoading(false);
//   }
//  }, []);

//  useEffect(() => {
//   fetchMenuItems();
//   fetchSizeCategories();
//   fetchAvailableColors();
//  }, [fetchMenuItems, fetchSizeCategories, fetchAvailableColors]);

//  useEffect(() => {
//   if (hoverImagesInput) {
//    setHoverImages((prev) => [...prev, ...hoverImagesInput]);
//    setHoverImagesInput(null); // Clear input after processing
//   }
//  }, [hoverImagesInput]);

//  const validateForm = useCallback(() => {
//   const newErrors = {};
//   if (!productDetails.name) newErrors.name = "Name is required.";
//   if (!productDetails.Title) newErrors.Title = "Title is required.";
//   if (!productDetails.menuItemId)
//    newErrors.menuItemId = "Category is required.";
//   if (!productDetails.newPrice || isNaN(Number(productDetails.newPrice))) {
//    newErrors.newPrice = "New Price must be a valid decimal.";
//   }
//   if (productDetails.oldPrice && isNaN(Number(productDetails.oldPrice))) {
//    newErrors.oldPrice = "Old Price must be a valid decimal.";
//   }
//   if (productDetails.colors.length === 0)
//    newErrors.colors = "At least one color is required.";
//   if (!productDetails.description)
//    newErrors.description = "description is required.";
//   if (!productDetails.Handle) newErrors.Handle = "Handle is required.";
//   if (!productDetails.Is_In_Stock)
//    newErrors.Is_In_Stock = "Is_In_Stock is required.";

//   if (productDetails.hasSizes) {
//    if (productDetails.sizes.length === 0) {
//     newErrors.sizes =
//      "At least one size must be selected if sizes are applicable.";
//    } else {
//     productDetails.sizes.forEach((size) => {
//      if (
//       !size.chest &&
//       !size.fullLengthBack &&
//       !size.fullLengthFront &&
//       !size.pantWaistRelax &&
//       !size.pantLength
//      ) {
//       newErrors.sizes =
//        "Please provide at least one measurement for each selected size.";
//      }
//     });
//    }
//   }

//   setErrors(newErrors);
//   return Object.keys(newErrors).length === 0;
//  }, [productDetails]);

//  const handleHasSizesChange = useCallback((event) => {
//   setProductDetails((prev) => ({
//    ...prev,
//    hasSizes: event.target.value === "yes",
//    sizes: [],
//   }));
//  }, []);

//  const handleSizeCheckboxChange = useCallback((event, categoryName) => {
//   setProductDetails((prev) => {
//    const isChecked = event.target.checked;
//    if (isChecked) {
//     return {
//      ...prev,
//      sizes: [
//       ...prev.sizes,
//       {
//        category: categoryName,
//        chest: null,
//        fullLengthBack: null,
//        fullLengthFront: null,
//        pantWaistRelax: null,
//        pantLength: null,
//       },
//      ],
//     };
//    } else {
//     return {
//      ...prev,
//      sizes: prev.sizes.filter((size) => size.category !== categoryName),
//     };
//    }
//   });
//  }, []);

//  const handleSizeDetailChange = useCallback((event, categoryName, field) => {
//   const value =
//    event.target.value === "" ? null : parseFloat(event.target.value);
//   setProductDetails((prev) => ({
//    ...prev,
//    sizes: prev.sizes.map((size) =>
//     size.category === categoryName ? { ...size, [field]: value } : size,
//    ),
//   }));
//  }, []);

//  const handleAddProduct = useCallback(async () => {
//   if (!validateForm()) return;

//   setLoading(true);
//   try {
//    const productPayload = {
//     ...productDetails,
//     category:
//      menuItems.find((item) => item.menuItemId === productDetails.menuItemId)
//       ?.title || "",
//    };
//    const productResponse = await axios.post(
//     `${API_BASE_URL}/Product/add`,
//     productPayload,
//     {
//      headers: { "Content-Type": "application/json" },
//     },
//    );

//    const productData = productResponse.data;

//    if (productData?.success && productData?.productId) {
//     const productId = productData.productId;
//     const formData = new FormData();
//     if (image) formData.append("PrimaryImage", image);
//     hoverImages.forEach((hoverImage) =>
//      formData.append("HoverImages", hoverImage),
//     );
//     formData.append("ProductId", productId);

//     if (image || hoverImages.length > 0) {
//      const imageResponse = await axios.post(
//       `${API_BASE_URL}/Product/upload-images`,
//       formData,
//       {
//        headers: { "Content-Type": "multipart/form-data" },
//       },
//      );
//      if (!imageResponse.data?.success) {
//       alert("Failed to upload images.");
//       return;
//      }
//     }

//     setSuccessMessage("Product and details added successfully!");
//     setProductDetails({
//      name: "",
//      Title: "",
//      menuItemId: "",
//      newPrice: "",
//      oldPrice: "",
//      hasSizes: false,
//      sizes: [],
//      colors: [],
//      description: "",
//      Handle: "",
//      Is_In_Stock: "",
//     });
//     setImage(null);
//     setHoverImages([]);
//     setErrors({});
//    } else {
//     alert("Failed to add product.");
//    }
//   } catch (error) {
//    console.error("Error adding product:", error);
//    alert("An error occurred while adding the product.");
//   } finally {
//    setLoading(false);
//   }
//  }, [productDetails, image, hoverImages, menuItems, validateForm]);

//  const changeHandler = useCallback((e) => {
//   const { name, value } = e.target;
//   setProductDetails((prev) => ({ ...prev, [name]: value }));
//  }, []);

//  const imageHandler = useCallback((e) => {
//   const selectedFile = e.target.files?.[0] || null;
//   setImage(selectedFile);
//  }, []);

//  const hoverImagesHandler = useCallback((e) => {
//   const files = Array.from(e.target.files || []);
//   if (files.length > 0) {
//    setHoverImagesInput(files);
//   }
//  }, []);

//  const requiredLabel = useCallback(
//   (label) => (
//    <span>
//     {label}
//     <span style={{ color: "red" }}> *</span>
//    </span>
//   ),
//   [],
//  );

//  const handleEditColor = useCallback((color) => {
//   setEditingColor(color);
//   setNewColorValue(color);
//  }, []);

//  const handleSaveColor = useCallback(
//   (oldColor) => {
//    setAvailableColors((prevColors) =>
//     prevColors.map((c) => (c === oldColor ? newColorValue : c)),
//    );
//    setProductDetails((prevDetails) => ({
//     ...prevDetails,
//     colors: prevDetails.colors.map((c) => (c === oldColor ? newColorValue : c)),
//    }));
//    setEditingColor(null);
//    setNewColorValue("");
//   },
//   [newColorValue],
//  );

//  const handleCancelEditColor = useCallback(() => {
//   setEditingColor(null);
//   setNewColorValue("");
//  }, []);

//  const handleSelectColor = useCallback((color) => {
//   setProductDetails((prev) => ({
//    ...prev,
//    colors: prev.colors.includes(color)
//     ? prev.colors.filter((c) => c !== color)
//     : [...prev.colors, color],
//   }));
//  }, []);

//  if (loading) {
//   return (
//    <Typography variant="h6" textAlign="center">
//     Loading...
//    </Typography>
//   );
//  }

//  return (
//   <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
//    <Typography variant="h4" textAlign="center" gutterBottom>
//     Add Product
//    </Typography>
//    {successMessage && <Alert severity="success">{successMessage}</Alert>}
//    <Grid container spacing={3}>
//     <Grid item xs={12}>
//      <TextField
//       label={requiredLabel("Title")}
//       name="Title"
//       value={productDetails.Title}
//       onChange={changeHandler}
//       fullWidth
//       error={!!errors.Title}
//       helperText={errors.Title}
//      />
//     </Grid>
//     <Grid item xs={12}>
//      <FormControl fullWidth error={!!errors.menuItemId}>
//       <InputLabel id="category-label">{requiredLabel("Category")}</InputLabel>
//       <Select
//        labelId="category-label"
//        id="category"
//        name="menuItemId"
//        value={productDetails.menuItemId}
//        onChange={changeHandler}
//        label={requiredLabel("Category")}
//       >
//        <MenuItem value="">Select Category</MenuItem>
//        {menuItems.map((item) => (
//         <MenuItem key={item.menuItemId} value={item.menuItemId}>
//          {item.title}
//         </MenuItem>
//        ))}
//       </Select>
//       {errors.menuItemId && (
//        <Typography variant="caption" color="error">
//         {errors.menuItemId}
//        </Typography>
//       )}
//      </FormControl>
//     </Grid>
//     <Grid item xs={6}>
//      <TextField
//       label="Old Price"
//       name="oldPrice"
//       value={productDetails.oldPrice}
//       onChange={changeHandler}
//       fullWidth
//       error={!!errors.oldPrice}
//       helperText={errors.oldPrice}
//      />
//     </Grid>
//     <Grid item xs={6}>
//      <TextField
//       label={requiredLabel("New Price")}
//       name="newPrice"
//       value={productDetails.newPrice}
//       onChange={changeHandler}
//       fullWidth
//       error={!!errors.newPrice}
//       helperText={errors.newPrice}
//      />
//     </Grid>

//     <Grid item xs={12}>
//      <FormControl component="fieldset">
//       <Typography component="legend">Does this product have sizes?</Typography>
//       <RadioGroup
//        aria-label="hasSizes"
//        name="hasSizes"
//        value={productDetails.hasSizes ? "yes" : "no"}
//        onChange={handleHasSizesChange}
//        row
//       >
//        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
//        <FormControlLabel value="no" control={<Radio />} label="No" />
//       </RadioGroup>
//      </FormControl>
//     </Grid>

//     {productDetails.hasSizes && (
//      <Grid item xs={12}>
//       <Typography variant="subtitle1">
//        Select Sizes and Add Measurements
//       </Typography>
//       <FormControl component="fieldset" error={!!errors.sizes}>
//        <FormGroup row>
//         {sizeCategories.map((category) => (
//          <FormControlLabel
//           key={category.sizeCategoryId}
//           control={
//            <Checkbox
//             checked={productDetails.sizes.some(
//              (size) => size.category === category.categoryName,
//             )}
//             onChange={(event) =>
//              handleSizeCheckboxChange(event, category.categoryName)
//             }
//             name={category.categoryName}
//            />
//           }
//           label={category.categoryName}
//          />
//         ))}
//        </FormGroup>
//        {errors.sizes && (
//         <Typography variant="caption" color="error">
//          {errors.sizes}
//         </Typography>
//        )}
//       </FormControl>

//       {productDetails.sizes.map((selectedSize) => (
//        <Box
//         key={selectedSize.category}
//         sx={{ mt: 2, border: "1px solid #ccc", padding: 2 }}
//        >
//         <Typography variant="h6">
//          {selectedSize.category} Measurements (Inches)
//         </Typography>
//         <Grid container spacing={2}>
//          <Grid item xs={6} md={4}>
//           <TextField
//            label="Chest"
//            type="number"
//            size="small"
//            value={selectedSize.chest || ""}
//            onChange={(e) =>
//             handleSizeDetailChange(e, selectedSize.category, "chest")
//            }
//            inputProps={{ step: "0.1" }}
//           />
//          </Grid>
//          <Grid item xs={6} md={4}>
//           <TextField
//            label="Full Length (Back)"
//            type="number"
//            size="small"
//            value={selectedSize.fullLengthBack || ""}
//            onChange={(e) =>
//             handleSizeDetailChange(e, selectedSize.category, "fullLengthBack")
//            }
//            inputProps={{ step: "0.1" }}
//           />
//          </Grid>
//          <Grid item xs={6} md={4}>
//           <TextField
//            label="Full Length (Front)"
//            type="number"
//            size="small"
//            value={selectedSize.fullLengthFront || ""}
//            onChange={(e) =>
//             handleSizeDetailChange(e, selectedSize.category, "fullLengthFront")
//            }
//            inputProps={{ step: "0.1" }}
//           />
//          </Grid>
//          <Grid item xs={6} md={4}>
//           <TextField
//            label="Pant Waist Relax"
//            type="number"
//            size="small"
//            value={selectedSize.pantWaistRelax || ""}
//            onChange={(e) =>
//             handleSizeDetailChange(e, selectedSize.category, "pantWaistRelax")
//            }
//            inputProps={{ step: "0.1" }}
//           />
//          </Grid>
//          <Grid item xs={6} md={4}>
//           <TextField
//            label="Pant Length"
//            type="number"
//            size="small"
//            value={selectedSize.pantLength || ""}
//            onChange={(e) =>
//             handleSizeDetailChange(e, selectedSize.category, "pantLength")
//            }
//            inputProps={{ step: "0.1" }}
//           />
//          </Grid>
//         </Grid>
//        </Box>
//       ))}
//      </Grid>
//     )}

//     <Grid item xs={12}>
//      <FormControl error={!!errors.colors} component="fieldset">
//       <Typography component="legend">{requiredLabel("Colors")}</Typography>
//       <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
//        {availableColors.map((color) => (
//         <Chip
//          key={color}
//          label={
//           editingColor === color ? (
//            <TextField
//             size="small"
//             value={newColorValue}
//             onChange={(e) => setNewColorValue(e.target.value)}
//             onBlur={handleCancelEditColor}
//             onKeyDown={(e) => {
//              if (e.key === "Enter") {
//               handleSaveColor(color);
//              } else if (e.key === "Escape") {
//               handleCancelEditColor();
//              }
//             }}
//             autoFocus
//            />
//           ) : (
//            color
//           )
//          }
//          onClick={() => editingColor !== color && handleSelectColor(color)}
//          onDelete={() => {
//           setAvailableColors((prev) => prev.filter((c) => c !== color));
//           setProductDetails((prev) => ({
//            ...prev,
//            colors: prev.colors.filter((c) => c !== color),
//           }));
//          }}
//          deleteIcon={<CloseIcon />}
//          variant={productDetails.colors.includes(color) ? "filled" : "outlined"}
//          color={productDetails.colors.includes(color) ? "primary" : "default"}
//         />
//        ))}
//        {editingColor && (
//         <IconButton
//          onClick={() => handleSaveColor(editingColor)}
//          aria-label="save color"
//         >
//          <CheckIcon />
//         </IconButton>
//        )}
//       </Box>
//       {errors.colors && (
//        <Typography variant="caption" color="error">
//         {errors.colors}
//        </Typography>
//       )}
//      </FormControl>
//     </Grid>

//     <Grid item xs={12}>
//      <TextField
//       label={requiredLabel("description")}
//       name="description"
//       value={productDetails.description}
//       onChange={changeHandler}
//       fullWidth
//       multiline
//       rows={3}
//       error={!!errors.description}
//       helperText={errors.description}
//      />
//     </Grid>

//     <Grid item xs={12}>
//      <TextField
//       label={requiredLabel("Handle")}
//       name="Handle"
//       value={productDetails.Handle}
//       onChange={changeHandler}
//       fullWidth
//       error={!!errors.Handle}
//       helperText={errors.Handle}
//      />
//     </Grid>

//     <Grid item xs={12}>
//      <TextField
//       label={requiredLabel("Is_In_Stock")}
//       name="Is_In_Stock"
//       value={productDetails.Is_In_Stock}
//       onChange={changeHandler}
//       fullWidth
//       error={!!errors.Is_In_Stock}
//       helperText={errors.Is_In_Stock}
//      />
//     </Grid>

//     <Grid item xs={12}>
//      <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
//       <label htmlFor="primary-file-input">
//        <input
//         type="file"
//         id="primary-file-input"
//         onChange={imageHandler}
//         hidden
//        />
//        <Button
//         variant="outlined"
//         component="span"
//         startIcon={<CloudUploadIcon />}
//        >
//         {image ? "Change Primary Image" : "Upload Primary Image"}
//        </Button>
//       </label>
//      </Box>
//      <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
//       <label htmlFor="hover-file-input">
//        <input
//         type="file"
//         id="hover-file-input"
//         onChange={hoverImagesHandler}
//         multiple
//         hidden
//        />
//        <Button
//         variant="outlined"
//         component="span"
//         startIcon={<CloudUploadIcon />}
//        >
//         {hoverImages.length
//          ? `${hoverImages.length} Hover Images Selected`
//          : "Upload Hover Images"}
//        </Button>
//       </label>
//      </Box>
//      <Button
//       variant="contained"
//       color="primary"
//       fullWidth
//       onClick={handleAddProduct}
//       disabled={loading}
//      >
//       {loading ? "Adding Product..." : "Add Product"}
//      </Button>
//     </Grid>
//    </Grid>
//   </Box>
//  );
// };

// export default AddProduct;

// import React, { useState, useEffect } from "react";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import EditIcon from "@mui/icons-material/Edit";
// import CheckIcon from "@mui/icons-material/Check";
// import CloseIcon from "@mui/icons-material/Close";

// import axios from "axios";
// import {
//  TextField,
//  Button,
//  MenuItem,
//  Typography,
//  Box,
//  Grid,
//  Alert,
//  FormControl,
//  InputLabel,
//  Select,
//  Modal,
//  Table,
//  TableBody,
//  TableCell,
//  TableContainer,
//  TableHead,
//  TableRow,
//  Paper,
//  Checkbox,
//  Chip,
//  IconButton,
// } from "@mui/material";

// const AddProduct = () => {
//  const [image, setImage] = useState(null);
//  const [hoverImages, setHoverImages] = useState([]);
//  const [hoverImagesInput, setHoverImagesInput] = useState(null);
//  const [productDetails, setProductDetails] = useState({
//   name: "",
//   Title: "",
//   menuItemId: "",
//   newPrice: "",
//   oldPrice: "",
//   sizes: [], // Array of size objects { category: '', chest: null, ... }
//   colors: [], // Array of selected color strings
//   description: "",
//   Handle: "",
//   Is_In_Stock: "",
//  });
//  const [menuItems, setMenuItems] = useState([]);
//  const [sizeCategories, setSizeCategories] = useState([]);
//  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
//  const [availableColors, setAvailableColors] = useState([]);
//  const [errors, setErrors] = useState({});
//  const [successMessage, setSuccessMessage] = useState("");
//  const [editingColor, setEditingColor] = useState(null);
//  const [newColorValue, setNewColorValue] = useState("");

//  useEffect(() => {
//   const fetchMenuItems = async () => {
//    try {
//     const response = await axios.get("https://localhost:7142/api/Menu/menu");
//     if (response.data) {
//      const flattenMenuItems = (items, prefix = "") => {
//       return items.reduce((acc, item) => {
//        acc.push({
//         menuItemId: item.menuItemId,
//         title: prefix + item.title,
//        });
//        if (item.children && item.children.length > 0) {
//         acc.push(...flattenMenuItems(item.children, prefix + "-- "));
//        }
//        return acc;
//       }, []);
//      };
//      setMenuItems(flattenMenuItems(response.data));
//     }
//    } catch (error) {
//     console.error("Error fetching menu items:", error);
//    }
//   };

//   const fetchSizeCategories = async () => {
//    try {
//     const response = await axios.get(
//      "https://localhost:7142/api/Product/size-categories",
//     );
//     setSizeCategories(response.data);
//    } catch (error) {
//     console.error("Error fetching size categories:", error);
//    }
//   };

//   const fetchAvailableColors = async () => {
//    try {
//     const response = await axios.get(
//      "https://localhost:7142/api/Product/available-colors",
//     );
//     setAvailableColors(response.data);
//    } catch (error) {
//     console.error("Error fetching available colors:", error);
//    }
//   };

//   fetchMenuItems();
//   fetchSizeCategories();
//   fetchAvailableColors();
//  }, []);

//  useEffect(() => {
//   if (hoverImagesInput) {
//    setHoverImages((prev) => [...prev, ...hoverImagesInput]);
//   }
//  }, [hoverImagesInput]);

//  const validateForm = () => {
//   const newErrors = {};
//   if (!productDetails.name) newErrors.name = "Name is required.";
//   if (!productDetails.Title) newErrors.Title = "Title is required.";
//   if (!productDetails.menuItemId)
//    newErrors.menuItemId = "Category is required.";
//   if (!productDetails.newPrice || isNaN(productDetails.newPrice))
//    newErrors.newPrice = "New Price must be a valid decimal.";
//   if (productDetails.oldPrice && isNaN(productDetails.oldPrice))
//    newErrors.oldPrice = "Old Price must be a valid decimal.";
//   if (productDetails.colors.length === 0)
//    newErrors.colors = "At least one color is required.";
//   if (!productDetails.description)
//    newErrors.description = "description is required.";
//   if (!productDetails.Handle) newErrors.Handle = "Handle is required.";
//   if (!productDetails.Is_In_Stock)
//    newErrors.Is_In_Stock = "Is_In_Stock is required.";
//   setErrors(newErrors);
//   return Object.keys(newErrors).length === 0;
//  };

//  const handleOpenSizeModal = () => setIsSizeModalOpen(true);
//  const handleCloseSizeModal = () => setIsSizeModalOpen(false);

//  const handleSizeCheckboxChange = (event, categoryName) => {
//   if (event.target.checked) {
//    setProductDetails((prev) => ({
//     ...prev,
//     sizes: [
//      ...prev.sizes,
//      {
//       category: categoryName,
//       chest: null,
//       fullLengthBack: null,
//       fullLengthFront: null,
//       pantWaistRelax: null,
//       pantLength: null,
//      },
//     ],
//    }));
//   } else {
//    setProductDetails((prev) => ({
//     ...prev,
//     sizes: prev.sizes.filter((size) => size.category !== categoryName),
//    }));
//   }
//  };

//  const handleSizeDetailChange = (event, categoryName, field) => {
//   setProductDetails((prev) => ({
//    ...prev,
//    sizes: prev.sizes.map((size) =>
//     size.category === categoryName
//      ? {
//         ...size,
//         [field]:
//          event.target.value === "" ? null : parseFloat(event.target.value),
//        }
//      : size,
//    ),
//   }));
//  };

//  const handleAddProduct = async () => {
//   if (!validateForm()) return;

//   try {
//    const productResponse = await axios.post(
//     "https://localhost:7142/api/Product/add",
//     {
//      ...productDetails,
//      category:
//       menuItems.find((item) => item.menuItemId === productDetails.menuItemId)
//        ?.title || "",
//     },
//     { headers: { "Content-Type": "application/json" } },
//    );

//    const productData = productResponse.data;

//    if (productData.success && productData.productId) {
//     const productId = productData.productId;

//     if (image || hoverImages.length > 0) {
//      const formData = new FormData();
//      if (image) formData.append("PrimaryImage", image);
//      hoverImages.forEach((hoverImage) =>
//       formData.append("HoverImages", hoverImage),
//      );
//      formData.append("ProductId", productId);

//      const imageResponse = await axios.post(
//       "https://localhost:7142/api/Product/upload-images",
//       formData,
//       { headers: { "Content-Type": "multipart/form-data" } },
//      );
//      if (!imageResponse.data.success) {
//       alert("Failed to upload images.");
//       return;
//      }
//     }

//     setSuccessMessage("Product and details added successfully!");
//     setProductDetails({
//      name: "",
//      Title: "",
//      menuItemId: "",
//      newPrice: "",
//      oldPrice: "",
//      sizes: [],
//      colors: [],
//      description: "",
//      Handle: "",
//      Is_In_Stock: "",
//     });
//     setImage(null);
//     setHoverImages([]);
//     setErrors({});
//     setIsSizeModalOpen(false);
//    } else {
//     alert("Failed to add product.");
//    }
//   } catch (error) {
//    console.error("Error:", error);
//    alert("An error occurred while adding the product.");
//   }
//  };

//  const changeHandler = (e) => {
//   setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
//  };

//  const imageHandler = (e) => {
//   const selectedFile = e.target.files[0];
//   if (selectedFile) {
//    setImage(selectedFile);
//   }
//  };

//  const hoverImagesHandler = (e) => {
//   const files = e.target.files;
//   if (files && files.length > 0) {
//    setHoverImagesInput(Array.from(files));
//   }
//  };

//  const requiredLabel = (label) => (
//   <span>
//    {label}
//    <span style={{ color: "red" }}> *</span>
//   </span>
//  );

//  const handleEditColor = (color) => {
//   setEditingColor(color);
//   setNewColorValue(color);
//  };

//  const handleSaveColor = (oldColor) => {
//   setAvailableColors(
//    availableColors.map((c) => (c === oldColor ? newColorValue : c)),
//   );
//   setProductDetails((prev) => ({
//    ...prev,
//    colors: prev.colors.map((c) => (c === oldColor ? newColorValue : c)),
//   }));
//   setEditingColor(null);
//   setNewColorValue("");
//  };

//  const handleCancelEditColor = () => {
//   setEditingColor(null);
//   setNewColorValue("");
//  };

//  const handleSelectColor = (color) => {
//   if (productDetails.colors.includes(color)) {
//    setProductDetails((prev) => ({
//     ...prev,
//     colors: prev.colors.filter((c) => c !== color),
//    }));
//   } else {
//    setProductDetails((prev) => ({ ...prev, colors: [...prev.colors, color] }));
//   }
//  };

//  return (
//   <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
//    <Typography variant="h4" textAlign="center" gutterBottom>
//     Add Product
//    </Typography>
//    {successMessage && <Alert severity="success">{successMessage}</Alert>}
//    <Grid container spacing={3}>
//     <Grid item xs={12}>
//      <TextField
//       label={requiredLabel("Title")}
//       name="Title"
//       value={productDetails.Title}
//       onChange={changeHandler}
//       fullWidth
//       error={!!errors.Title}
//       helperText={errors.Title}
//      />
//     </Grid>
//     <Grid item xs={12}>
//      <FormControl fullWidth error={!!errors.menuItemId}>
//       <InputLabel id="category-label">{requiredLabel("Category")}</InputLabel>
//       <Select
//        labelId="category-label"
//        id="category"
//        name="menuItemId"
//        value={productDetails.menuItemId}
//        onChange={changeHandler}
//        label={requiredLabel("Category")}
//       >
//        <MenuItem value="">Select Category</MenuItem>
//        {menuItems.map((item) => (
//         <MenuItem key={item.menuItemId} value={item.menuItemId}>
//          {item.title}
//         </MenuItem>
//        ))}
//       </Select>
//       {errors.menuItemId && (
//        <Typography variant="caption" color="error">
//         {errors.menuItemId}
//        </Typography>
//       )}
//      </FormControl>
//     </Grid>
//     <Grid item xs={6}>
//      <TextField
//       label="Old Price"
//       name="oldPrice"
//       value={productDetails.oldPrice}
//       onChange={changeHandler}
//       fullWidth
//       error={!!errors.oldPrice}
//       helperText={errors.oldPrice}
//      />
//     </Grid>
//     <Grid item xs={6}>
//      <TextField
//       label={requiredLabel("New Price")}
//       name="newPrice"
//       value={productDetails.newPrice}
//       onChange={changeHandler}
//       fullWidth
//       error={!!errors.newPrice}
//       helperText={errors.newPrice}
//      />
//     </Grid>

//     <Grid item xs={12}>
//      <Button onClick={handleOpenSizeModal} fullWidth variant="outlined">
//       Edit Sizes
//      </Button>
//      {errors.sizes && (
//       <Typography variant="caption" color="error">
//        {errors.sizes}
//       </Typography>
//      )}
//     </Grid>

//     <Grid item xs={12}>
//      <FormControl error={!!errors.colors} component="fieldset">
//       <Typography component="legend">{requiredLabel("Colors")}</Typography>
//       <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
//        {availableColors.map((color) => (
//         <Chip
//          key={color}
//          label={
//           editingColor === color ? (
//            <TextField
//             size="small"
//             value={newColorValue}
//             onChange={(e) => setNewColorValue(e.target.value)}
//             onBlur={() => handleCancelEditColor()}
//             onKeyDown={(e) => {
//              if (e.key === "Enter") {
//               handleSaveColor(color);
//              } else if (e.key === "Escape") {
//               handleCancelEditColor();
//              }
//             }}
//             autoFocus
//            />
//           ) : (
//            color
//           )
//          }
//          onClick={() => setEditingColor !== color && handleEditColor(color)}
//          onDelete={() => {
//           setAvailableColors(availableColors.filter((c) => c !== color));
//           setProductDetails((prev) => ({
//            ...prev,
//            colors: prev.colors.filter((c) => c !== color),
//           }));
//          }}
//          deleteIcon={<CloseIcon />}
//          variant={
//           productDetails.colors.includes(color) ? "contained" : "outlined"
//          }
//          color={productDetails.colors.includes(color) ? "primary" : undefined}
//          icon={editingColor !== color && <EditIcon size="small" />}
//         />
//        ))}
//        {editingColor && (
//         <IconButton
//          onClick={() => handleSaveColor(editingColor)}
//          aria-label="save color"
//         >
//          <CheckIcon />
//         </IconButton>
//        )}
//       </Box>
//       {errors.colors && (
//        <Typography variant="caption" color="error">
//         {errors.colors}
//        </Typography>
//       )}
//      </FormControl>
//     </Grid>

//     <Grid item xs={12}>
//      <TextField
//       label={requiredLabel("description")}
//       name="description"
//       value={productDetails.description}
//       onChange={changeHandler}
//       fullWidth
//       multiline
//       rows={3}
//       error={!!errors.description}
//       helperText={errors.description}
//      />
//     </Grid>

//     <Grid item xs={12}>
//      <TextField
//       label={requiredLabel("Handle")}
//       name="Handle"
//       value={productDetails.Handle}
//       onChange={changeHandler}
//       fullWidth
//       multiline
//       rows={3}
//       error={!!errors.Handle}
//       helperText={errors.Handle}
//      />
//     </Grid>

//     <Grid item xs={12}>
//      <TextField
//       label={requiredLabel("Is_In_Stock")}
//       name="Is_In_Stock"
//       value={productDetails.Is_In_Stock}
//       onChange={changeHandler}
//       fullWidth
//       multiline
//       rows={3}
//       error={!!errors.Is_In_Stock}
//       helperText={errors.Is_In_Stock}
//      />
//     </Grid>

//     <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
//      <label htmlFor="primary-file-input">
//       <input
//        type="file"
//        id="primary-file-input"
//        onChange={imageHandler}
//        hidden
//       />
//       <Button
//        variant="outlined"
//        component="span"
//        startIcon={<CloudUploadIcon />}
//       >
//        {image ? "Change Primary Image" : "Upload Primary Image"}
//       </Button>
//      </label>
//     </Box>
//     <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
//      <label htmlFor="hover-file-input">
//       <input
//        type="file"
//        id="hover-file-input"
//        onChange={hoverImagesHandler}
//        multiple
//        hidden
//       />
//       <Button
//        variant="outlined"
//        component="span"
//        startIcon={<CloudUploadIcon />}
//       >
//        {hoverImages.length
//         ? `${hoverImages.length} Hover Images Selected`
//         : "Upload Hover Images"}
//       </Button>
//      </label>
//     </Box>
//     <Button
//      variant="contained"
//      color="primary"
//      fullWidth
//      onClick={handleAddProduct}
//     >
//      Add Product
//     </Button>
//    </Grid>

//    <Modal
//     open={isSizeModalOpen}
//     onClose={handleCloseSizeModal}
//     aria-labelledby="size-modal-title"
//     aria-describedby="size-modal-description"
//    >
//     <Box
//      sx={{
//       position: "absolute",
//       top: "50%",
//       left: "50%",
//       transform: "translate(-50%, -50%)",
//       width: 600,
//       bgcolor: "background.paper",
//       boxShadow: 24,
//       p: 4,
//      }}
//     >
//      <Typography id="size-modal-title" variant="h6" component="h2">
//       Product Sizes
//      </Typography>
//      <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 500 }} aria-label="size table">
//        <TableHead>
//         <TableRow>
//          <TableCell padding="checkbox">Select</TableCell>
//          <TableCell>Size</TableCell>
//          <TableCell>Chest (Inch)</TableCell>
//          <TableCell>Full Length (Back) (Inch)</TableCell>
//          <TableCell>Full Length (Front) (Inch)</TableCell>
//          <TableCell>Pant Waist Relax (Inch)</TableCell>
//          <TableCell>Pant Length (Inch)</TableCell>
//         </TableRow>
//        </TableHead>
//        <TableBody>
//         {sizeCategories.map((category) => (
//          <TableRow key={category.sizeCategoryId}>
//           <TableCell padding="checkbox">
//            <Checkbox
//             checked={productDetails.sizes.some(
//              (size) => size.category === category.categoryName,
//             )}
//             onChange={(event) =>
//              handleSizeCheckboxChange(event, category.categoryName)
//             }
//            />
//           </TableCell>
//           <TableCell component="th" scope="row">
//            {category.categoryName}
//           </TableCell>
//           <TableCell>
//            <TextField
//             size="small"
//             value={
//              productDetails.sizes.find(
//               (size) => size.category === category.categoryName,
//              )?.chest || ""
//             }
//             onChange={(e) =>
//              handleSizeDetailChange(e, category.categoryName, "chest")
//             }
//             disabled={
//              !productDetails.sizes.some(
//               (size) => size.category === category.categoryName,
//              )
//             }
//             type="number"
//             inputProps={{ step: "0.1" }}
//            />
//           </TableCell>
//           <TableCell>
//            <TextField
//             size="small"
//             value={
//              productDetails.sizes.find(
//               (size) => size.category === category.categoryName,
//              )?.fullLengthBack || ""
//             }
//             onChange={(e) =>
//              handleSizeDetailChange(e, category.categoryName, "fullLengthBack")
//             }
//             disabled={
//              !productDetails.sizes.some(
//               (size) => size.category === category.categoryName,
//              )
//             }
//             type="number"
//             inputProps={{ step: "0.1" }}
//            />
//           </TableCell>
//           <TableCell>
//            <TextField
//             size="small"
//             value={
//              productDetails.sizes.find(
//               (size) => size.category === category.categoryName,
//              )?.fullLengthFront || ""
//             }
//             onChange={(e) =>
//              handleSizeDetailChange(e, category.categoryName, "fullLengthFront")
//             }
//             disabled={
//              !productDetails.sizes.some(
//               (size) => size.category === category.categoryName,
//              )
//             }
//             type="number"
//             inputProps={{ step: "0.1" }}
//            />
//           </TableCell>
//           <TableCell>
//            <TextField
//             size="small"
//             value={
//              productDetails.sizes.find(
//               (size) => size.category === category.categoryName,
//              )?.pantWaistRelax || ""
//             }
//             onChange={(e) =>
//              handleSizeDetailChange(e, category.categoryName, "pantWaistRelax")
//             }
//             disabled={
//              !productDetails.sizes.some(
//               (size) => size.category === category.categoryName,
//              )
//             }
//             type="number"
//             inputProps={{ step: "0.1" }}
//            />
//           </TableCell>
//           <TableCell>
//            <TextField
//             size="small"
//             value={
//              productDetails.sizes.find(
//               (size) => size.category === category.categoryName,
//              )?.pantLength || ""
//             }
//             onChange={(e) =>
//              handleSizeDetailChange(e, category.categoryName, "pantLength")
//             }
//             disabled={
//              !productDetails.sizes.some(
//               (size) => size.category === category.categoryName,
//              )
//             }
//             type="number"
//             inputProps={{ step: "0.1" }}
//            />
//           </TableCell>
//          </TableRow>
//         ))}
//        </TableBody>
//       </Table>
//      </TableContainer>
//      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
//       <Button onClick={handleCloseSizeModal}>Save Sizes</Button>
//      </Box>
//     </Box>
//    </Modal>
//   </Box>
//  );
// };

// export default AddProduct;
// import React, { useState, useEffect } from "react";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import axios from "axios";
// import {
//  TextField,
//  Button,
//  MenuItem,
//  Typography,
//  Box,
//  Grid,
//  Alert,
//  FormControl,
//  InputLabel,
//  Select,
// } from "@mui/material";

// const AddProduct = () => {
//  const [image, setImage] = useState(null); // Primary image
//  const [hoverImages, setHoverImages] = useState([]); // Hover images
//  const [hoverImagesInput, setHoverImagesInput] = useState(null); // Temporary hover image input
//  const [productDetails, setProductDetails] = useState({
//   name: "",
//   Title: "",
//   menuItemId: "", // Changed 'category' to 'menuItemId' to link to MenuItems table
//   newPrice: "",
//   oldPrice: "",
//   size: "",
//   description: "",
//   Handle: "",
//   Color: "",
//   Is_In_Stock: "",
//  });
//  const [menuItems, setMenuItems] = useState([]); // To store the hierarchical menu items
//  const [errors, setErrors] = useState({});
//  const [successMessage, setSuccessMessage] = useState("");

//  useEffect(() => {
//   const fetchMenuItems = async () => {
//    try {
//     const response = await axios.get("https://localhost:7142/api/Menu/menu"); // Assuming your menu API endpoint is '/api/menu'
//     if (response.data) {
//      // Function to flatten the hierarchical menu for the select dropdown
//      const flattenMenuItems = (items, prefix = "") => {
//       return items.reduce((acc, item) => {
//        acc.push({
//         menuItemId: item.menuItemId, // Assuming your API returns menuItemId
//         title: prefix + item.title,
//        });
//        if (item.children && item.children.length > 0) {
//         acc.push(...flattenMenuItems(item.children, prefix + "-- "));
//        }
//        return acc;
//       }, []);
//      };
//      setMenuItems(flattenMenuItems(response.data));
//     }
//    } catch (error) {
//     console.error("Error fetching menu items:", error);
//    }
//   };

//   fetchMenuItems();
//  }, []);

//  // Update hoverImages array whenever a new file input is received
//  useEffect(() => {
//   if (hoverImagesInput) {
//    setHoverImages((prev) => [...prev, ...hoverImagesInput]);
//   }
//  }, [hoverImagesInput]);

//  const validateForm = () => {
//   const newErrors = {};
//   if (!productDetails.name) newErrors.name = "Name is required.";
//   if (!productDetails.Title) newErrors.Title = "Title is required.";
//   if (!productDetails.menuItemId)
//    newErrors.menuItemId = "Category is required."; // Changed error key
//   if (!productDetails.newPrice || isNaN(productDetails.newPrice))
//    newErrors.newPrice = "New Price must be a valid decimal.";
//   if (productDetails.oldPrice && isNaN(productDetails.oldPrice))
//    newErrors.oldPrice = "Old Price must be a valid decimal.";
//   if (!productDetails.size) newErrors.size = "Size is required.";
//   if (!productDetails.description)
//    newErrors.description = "description is required.";
//   if (!productDetails.Handle) newErrors.Handle = "Handle is required.";
//   if (!productDetails.Color) newErrors.Color = "Color is required.";
//   if (!productDetails.Is_In_Stock)
//    newErrors.Is_In_Stock = "Is_In_Stock is required.";
//   setErrors(newErrors);
//   return Object.keys(newErrors).length === 0;
//  };

//  const handleAddProduct = async () => {
//   if (!validateForm()) return;

//   try {
//    const productResponse = await axios.post(
//     "https://localhost:7142/api/Product/add",
//     { ...productDetails, categoryId: productDetails.menuItemId }, // Send 'categoryId' to the backend
//     { headers: { "Content-Type": "application/json" } },
//    );

//    const productData = productResponse.data;
//    console.log("here add product: ", productResponse.data);

//    if (productData.success) {
//     const productId = productData.productId;

//     if (!image || hoverImages.length === 0) {
//      alert("Please select a primary image and hover images.");
//      return;
//     }

//     const formData = new FormData();
//     if (image) formData.append("PrimaryImage", image);
//     hoverImages.forEach((hoverImage) => {
//      formData.append("HoverImages", hoverImage); // Ensure it is appended as a list
//     });
//     formData.append("ProductId", productId);
//     console.log("form data in upload image", formData);

//     const imageResponse = await axios.post(
//      "https://localhost:7142/api/Product/upload-images",
//      formData,
//      { headers: { "Content-Type": "multipart/form-data" } },
//     );
//     console.log("image response:", imageResponse.data);

//     if (imageResponse.data.success & productResponse.data.success) {
//      setSuccessMessage("Product and images added successfully!");
//      setProductDetails({
//       name: "",
//       Title: "",
//       menuItemId: "",
//       newPrice: "",
//       oldPrice: "",
//       size: "",
//       description: "",
//       Handle: "",
//       Color: "",
//       Is_In_Stock: "",
//      });
//      setImage(null);
//      setHoverImages([]);
//      setErrors({});
//     } else {
//      alert("Failed to upload images.");
//     }
//    } else {
//     alert("Failed to add product.");
//    }
//   } catch (error) {
//    console.error("Error:", error);
//    alert("An error occurred while adding the product.");
//   }
//  };

//  const changeHandler = (e) => {
//   setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
//  };

//  const imageHandler = (e) => {
//   const selectedFile = e.target.files[0];
//   if (selectedFile) {
//    setImage(selectedFile);
//   }
//  };

//  const hoverImagesHandler = (e) => {
//   const files = e.target.files;
//   if (files && files.length > 0) {
//    setHoverImagesInput(Array.from(files)); // Store temporary input to trigger useEffect
//   }
//  };

//  const requiredLabel = (label) => (
//   <span>
//    {label}
//    <span style={{ color: "red" }}> *</span>
//   </span>
//  );

//  return (
//   <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
//    <Typography variant="h4" textAlign="center" gutterBottom>
//     Add Product
//    </Typography>
//    {successMessage && <Alert severity="success">{successMessage}</Alert>}
//    <Grid container spacing={3}>
//     <Grid item xs={12}>
//      <TextField
//       label={requiredLabel("Product Title")}
//       name="name"
//       value={productDetails.name}
//       onChange={changeHandler}
//       fullWidth
//       error={!!errors.name}
//       helperText={errors.name}
//      />
//     </Grid>

//     <Grid item xs={12}>
//      <TextField
//       label={requiredLabel("Title")}
//       name="Title"
//       value={productDetails.Title}
//       onChange={changeHandler}
//       fullWidth
//       error={!!errors.Title}
//       helperText={errors.Title}
//      />
//     </Grid>
//     <Grid item xs={12}>
//      <FormControl fullWidth error={!!errors.menuItemId}>
//       <InputLabel id="category-label">{requiredLabel("Category")}</InputLabel>
//       <Select
//        labelId="category-label"
//        id="category"
//        name="menuItemId"
//        value={productDetails.menuItemId}
//        onChange={changeHandler}
//        label={requiredLabel("Category")}
//       >
//        <MenuItem value="">Select Category</MenuItem>
//        {menuItems.map((item) => (
//         <MenuItem key={item.menuItemId} value={item.menuItemId}>
//          {item.title}
//         </MenuItem>
//        ))}
//       </Select>
//       {errors.menuItemId && (
//        <Typography variant="caption" color="error">
//         {errors.menuItemId}
//        </Typography>
//       )}
//      </FormControl>
//     </Grid>
//     <Grid item xs={6}>
//      <TextField
//       label="Old Price"
//       name="oldPrice"
//       value={productDetails.oldPrice}
//       onChange={changeHandler}
//       fullWidth
//       error={!!errors.oldPrice}
//       helperText={errors.oldPrice}
//      />
//     </Grid>
//     <Grid item xs={6}>
//      <TextField
//       label={requiredLabel("New Price")}
//       name="newPrice"
//       value={productDetails.newPrice}
//       onChange={changeHandler}
//       fullWidth
//       error={!!errors.newPrice}
//       helperText={errors.newPrice}
//      />
//     </Grid>
//     <Grid item xs={12}>
//      <TextField
//       label={requiredLabel("Size")}
//       name="size"
//       value={productDetails.size}
//       onChange={changeHandler}
//       fullWidth
//       error={!!errors.size}
//       helperText={errors.size}
//      />
//     </Grid>
//     <Grid item xs={12}>
//      <TextField
//       label={requiredLabel("description")}
//       name="description"
//       value={productDetails.description}
//       onChange={changeHandler}
//       fullWidth
//       multiline
//       rows={3}
//       error={!!errors.description}
//       helperText={errors.description}
//      />
//     </Grid>

//     <Grid item xs={12}>
//      <TextField
//       label={requiredLabel("Handle")}
//       name="Handle"
//       value={productDetails.Handle}
//       onChange={changeHandler}
//       fullWidth
//       multiline
//       rows={3}
//       error={!!errors.Handle}
//       helperText={errors.Handle}
//      />
//     </Grid>

//     <Grid item xs={12}>
//      <TextField
//       label={requiredLabel("Color")}
//       name="Color"
//       value={productDetails.Color}
//       onChange={changeHandler}
//       fullWidth
//       multiline
//       rows={3}
//       error={!!errors.Color}
//       helperText={errors.Color}
//      />
//     </Grid>
//     <Grid item xs={12}>
//      <TextField
//       label={requiredLabel("Is_In_Stock")}
//       name="Is_In_Stock"
//       value={productDetails.Is_In_Stock}
//       onChange={changeHandler}
//       fullWidth
//       multiline
//       rows={3}
//       error={!!errors.Is_In_Stock}
//       helperText={errors.Is_In_Stock}
//      />
//     </Grid>

//     <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
//      <label htmlFor="primary-file-input">
//       <input
//        type="file"
//        id="primary-file-input"
//        onChange={imageHandler}
//        hidden
//       />
//       <Button
//        variant="outlined"
//        component="span"
//        startIcon={<CloudUploadIcon />}
//       >
//        {image ? "Change Primary Image" : "Upload Primary Image"}
//       </Button>
//      </label>
//     </Box>
//     <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
//      <label htmlFor="hover-file-input">
//       <input
//        type="file"
//        id="hover-file-input"
//        onChange={hoverImagesHandler}
//        multiple
//        hidden
//       />
//       <Button
//        variant="outlined"
//        component="span"
//        startIcon={<CloudUploadIcon />}
//       >
//        {hoverImages.length
//         ? `${hoverImages.length} Hover Images Selected`
//         : "Upload Hover Images"}
//       </Button>
//      </label>
//     </Box>
//     <Button
//      variant="contained"
//      color="primary"
//      fullWidth
//      onClick={handleAddProduct}
//     >
//      Add Product
//     </Button>
//    </Grid>
//   </Box>
//  );
// };

// export default AddProduct;
