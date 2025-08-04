/** @format */

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import PaymentModal from "../Components/PaymentModal";
// import {
//  Box,
//  Button,
//  Card,
//  CardContent,
//  Checkbox,
//  Container,
//  Divider,
//  FormControl,
//  FormControlLabel,
//  Grid,
//  IconButton,
//  InputAdornment,
//  InputLabel,
//  MenuItem,
//  Paper,
//  Radio,
//  RadioGroup,
//  Select,
//  Step,
//  StepLabel,
//  Stepper,
//  Tab,
//  Tabs,
//  TextField,
//  Typography,
// } from "@mui/material";
// import {
//  Add,
//  ArrowBack,
//  Close,
//  CreditCard,
//  Delete,
//  Help,
//  LocationOn,
//  Phone,
//  QuestionMark,
//  Remove,
//  Visibility,
// } from "@mui/icons-material";
// import { ThemeProvider, createTheme } from "@mui/material/styles";

// // Mock data for product in cart
// const cartItem = {
//  id: 1,
//  name: "3D Embroidered Cotton Kameez",
//  color: "Navy",
//  size: "S",
//  price: 2595.0,
//  quantity: 1,
//  image: "/api/placeholder/100/120",
// };
// const theme = createTheme({
//  // Define your theme here if you have specific customizations
//  // Otherwise, a basic theme can be used or rely on Material-UI's default.
// });
// // Payment methods available
// const paymentMethods = [
//  {
//   id: "credit-card",
//   name: "Credit/Debit Card",
//   logos: ["visa", "mastercard", "amex", "diners"],
//  },
//  { id: "cod", name: "Cash on Delivery (COD)", fee: "Tk. 47.50" },
//  { id: "bkash", name: "bKash", logo: "bkash" },
//  { id: "nagad", name: "Nagad", logo: "nagad" },
//  { id: "upay", name: "Upay", logo: "upay" },
//  { id: "rocket", name: "Rocket", logo: "rocket" },
// ];

// // Shipping methods
// const shippingMethods = [
//  { id: "inside-dhaka", name: "Inside Dhaka", fee: 60.0 },
//  { id: "outside-dhaka", name: "Outside Dhaka", fee: 120.0 },
// ];

// const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

// const handleOpenPaymentModal = () => {
//  setIsPaymentModalOpen(true);
// };

// const handleClosePaymentModal = () => {
//  setIsPaymentModalOpen(false);
// };

// // Order confirmation component - Moved to top level
// const ConfirmationView = ({
//  formData,
//  onBackToHome,
//  subtotal,
//  shipping,
//  tax,
//  total,
// }) => (
//  <Box>
//   <Paper elevation={0} sx={{ p: 3, mb: 4, textAlign: "center" }}>
//    <Box
//     sx={{
//      display: "flex",
//      alignItems: "center",
//      justifyContent: "center",
//      mb: 2,
//     }}
//    >
//     <Box
//      sx={{
//       width: 40,
//       height: 40,
//       borderRadius: "50%",
//       bgcolor: "#4caf50",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       color: "#fff",
//       mr: 2,
//      }}
//     >
//      ✓
//     </Box>
//     <Box sx={{ textAlign: "left" }}>
//      <Typography variant="body2" color="textSecondary">
//       Confirmation #{Math.random().toString(36).substring(2, 10).toUpperCase()}
//      </Typography>
//      <Typography variant="h6">
//       Thank you, {formData.firstName || "Muhammad Rifat"}!
//      </Typography>
//     </Box>
//    </Box>

//    <Box
//     sx={{ my: 3, p: 2, position: "relative", height: 240, bgcolor: "#f5f5f5" }}
//    >
//     <Typography
//      variant="body1"
//      sx={{
//       position: "absolute",
//       top: 10,
//       left: 10,
//       bgcolor: "white",
//       p: 1,
//       borderRadius: 1,
//      }}
//     >
//      Shipping address
//     </Typography>
//     <Typography
//      variant="body1"
//      sx={{
//       position: "absolute",
//       bottom: 20,
//       left: 0,
//       right: 0,
//       textAlign: "center",
//      }}
//     >
//      Dhaka
//     </Typography>
//     <Typography
//      variant="body1"
//      sx={{
//       position: "absolute",
//       top: "50%",
//       left: "50%",
//       transform: "translate(-50%, -50%)",
//      }}
//     >
//      <LocationOn sx={{ fontSize: 40, color: "#f44336" }} />
//     </Typography>
//    </Box>

//    <Box sx={{ textAlign: "left" }}>
//     <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
//      Your order is confirmed
//     </Typography>
//     <Typography variant="body2" color="textSecondary">
//      You'll receive a confirmation email with your order number shortly.
//     </Typography>
//    </Box>
//   </Paper>

//   <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
//    <Typography variant="h6" gutterBottom>
//     Order details
//    </Typography>
//    <Grid container spacing={3}>
//     <Grid item xs={12} sm={6}>
//      <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
//       Contact information
//      </Typography>
//      <Typography variant="body2">
//       {formData.email || "kashimmirza86@gmail.com"}
//      </Typography>
//     </Grid>
//     <Grid item xs={12} sm={6}>
//      <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
//       Payment method
//      </Typography>
//      <Box sx={{ display: "flex", alignItems: "center" }}>
//       <Typography variant="body2" sx={{ mr: 1 }}>
//        •
//       </Typography>
//       {/* Display actual selected payment method dynamically */}
//       <Typography variant="body2">
//        Cash on Delivery (COD) - ৳
//        {shippingMethods.find((m) => m.id === "cod")?.fee || 47.5}{" "}
//        {/* Use actual fee for COD if applicable */}
//       </Typography>
//      </Box>
//     </Grid>
//     <Grid item xs={12} sm={6}>
//      <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
//       Shipping address
//      </Typography>
//      <Typography variant="body2">
//       {formData.firstName || "Muhammad"} {formData.lastName || "Rifat Hasan"}
//      </Typography>
//      <Typography variant="body2">
//       {formData.address || "house #: 512, 2 no road, New dohs"}
//      </Typography>
//      <Typography variant="body2">{formData.city || "mohakhali"}</Typography>
//      <Typography variant="body2">{formData.zipCode || "dhaka 1206"}</Typography>
//      <Typography variant="body2">Bangladesh</Typography>
//      <Typography variant="body2">
//       +880{formData.phone || "1670361038"}
//      </Typography>
//     </Grid>
//     <Grid item xs={12} sm={6}>
//      <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
//       Order summary
//      </Typography>
//      <Typography variant="body2">
//       {cartItem.name} (x{cartItem.quantity})
//      </Typography>
//      {/* Add more items if cart allows multiple */}
//      <Box sx={{ mt: 2 }}>
//       <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//        Subtotal: ৳{subtotal.toFixed(2)}
//       </Typography>
//       <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//        Delivery Fee: ৳{shipping.toFixed(2)}
//       </Typography>
//       <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//        Estimated taxes: ৳{tax.toFixed(2)}
//       </Typography>
//       <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//        Total: ৳{total.toFixed(2)}
//       </Typography>
//      </Box>
//     </Grid>
//    </Grid>
//   </Paper>

//   <Box sx={{ textAlign: "center", mt: 4 }}>
//    <Button variant="contained" color="primary" onClick={onBackToHome}>
//     Back to Home
//    </Button>
//   </Box>
//  </Box>
// );

// const paymentgatewayrough = () => {
//  // State for tracking checkout step
//  const [activeStep, setActiveStep] = useState(0);
//  const [paymentTab, setPaymentTab] = useState(0);
//  const [shippingMethod, setShippingMethod] = useState("inside-dhaka");
//  const [paymentMethod, setPaymentMethod] = useState("credit-card"); // This state isn't currently used to drive the payment form
//  const [formData, setFormData] = useState({
//   email: "",
//   phone: "",
//   firstName: "",
//   lastName: "",
//   address: "",
//   city: "Dhaka",
//   zipCode: "1206",
//   cardNumber: "",
//   cardExpiry: "",
//   cardCVC: "",
//   cardHolder: "",
//   saveCard: false,
//   sameAsBilling: true,
//  });
//  const navigate = useNavigate();

//  const steps = ["Cart", "Shipping & Payment", "Confirmation"];

//  // Calculate totals
//  const subtotal = cartItem.price * cartItem.quantity; // Ensure subtotal accounts for quantity
//  const shipping =
//   shippingMethods.find((m) => m.id === shippingMethod)?.fee || 0; // Default to 0 if not found
//  const tax = subtotal * 0.05; // 5% tax rate
//  const total = subtotal + shipping + tax;

//  const handleChange = (e) => {
//   const { name, value, type, checked } = e.target;
//   setFormData({
//    ...formData,
//    [name]: type === "checkbox" ? checked : value,
//   });
//  };

//  const handleShippingMethodChange = (e) => {
//   setShippingMethod(e.target.value);
//  };

//  const handlePaymentMethodChange = (e) => {
//   setPaymentMethod(e.target.value);
//  };

//  const handlePaymentTabChange = (event, newValue) => {
//   setPaymentTab(newValue);
//  };

//  const handleNext = () => {
//   setActiveStep((prevStep) => prevStep + 1);
//  };

//  const handleBack = () => {
//   setActiveStep((prevStep) => prevStep - 1);
//  };

//  const handleSubmit = (e) => {
//   e.preventDefault();
//   // In a real application, you'd send formData to a backend here.
//   // For this example, we just move to the next step.
//   handleNext();
//  };

//  // Cart component
//  const CartView = () => (
//   <Paper elevation={0} sx={{ p: 2, mb: 4 }}>
//    <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
//     Shopping cart
//    </Typography>
//    <Grid container spacing={2} sx={{ mt: 2 }}>
//     <Grid item xs={12}>
//      <Box sx={{ display: "flex", borderBottom: "1px solid #eee", pb: 1 }}>
//       <Box sx={{ width: "50%" }}>
//        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//         PRODUCT
//        </Typography>
//       </Box>
//       <Box sx={{ width: "20%", textAlign: "center" }}>
//        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//         PRICE
//        </Typography>
//       </Box>
//       <Box sx={{ width: "15%", textAlign: "center" }}>
//        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//         QUANTITY
//        </Typography>
//       </Box>
//       <Box sx={{ width: "15%", textAlign: "right" }}>
//        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//         TOTAL
//        </Typography>
//       </Box>
//      </Box>
//     </Grid>

//     <Grid item xs={12}>
//      <Box sx={{ display: "flex", alignItems: "center", py: 2 }}>
//       <Box sx={{ width: "50%", display: "flex", alignItems: "center" }}>
//        <img
//         src={cartItem.image}
//         alt={cartItem.name}
//         style={{ width: 80, marginRight: 16 }}
//        />
//        <Box>
//         <Typography variant="body1">{cartItem.name}</Typography>
//         <Typography variant="body2" color="textSecondary">
//          Color: {cartItem.color}
//         </Typography>
//         <Typography variant="body2" color="textSecondary">
//          Size: {cartItem.size}
//         </Typography>
//         <Box sx={{ display: "flex", mt: 1 }}>
//          <IconButton size="small">
//           <Delete fontSize="small" />
//          </IconButton>
//         </Box>
//        </Box>
//       </Box>
//       <Box sx={{ width: "20%", textAlign: "center" }}>
//        <Typography>Tk {cartItem.price.toFixed(2)}</Typography>
//       </Box>
//       <Box sx={{ width: "15%", textAlign: "center" }}>
//        <Box
//         sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
//        >
//         <IconButton size="small">
//          <Remove fontSize="small" />
//         </IconButton>
//         <TextField
//          size="small"
//          value={cartItem.quantity}
//          inputProps={{ min: 1, style: { textAlign: "center" } }}
//          sx={{ width: 60, mx: 1 }}
//          // In a real app, you'd have a handler to update cartItem.quantity
//         />
//         <IconButton size="small">
//          <Add fontSize="small" />
//         </IconButton>
//        </Box>
//       </Box>
//       <Box sx={{ width: "15%", textAlign: "right" }}>
//        <Typography>
//         Tk {(cartItem.price * cartItem.quantity).toFixed(2)}
//        </Typography>
//       </Box>
//      </Box>
//     </Grid>

//     <Grid item xs={12}>
//      <Box sx={{ mt: 2 }}>
//       <Typography variant="body1">Add Order Note</Typography>
//       <TextField
//        fullWidth
//        multiline
//        rows={4}
//        placeholder="How can we help you?"
//        variant="outlined"
//        sx={{ mt: 1 }}
//       />
//      </Box>
//     </Grid>

//     <Grid item xs={12} sm={6}>
//      <Box sx={{ mt: 2 }}>
//       <Typography variant="body1">Coupon:</Typography>
//       <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
//        Coupon code will work on checkout page
//       </Typography>
//       <TextField fullWidth placeholder="Coupon code" variant="outlined" />
//      </Box>
//     </Grid>

//     <Grid item xs={12} sm={6}>
//      <Box sx={{ mt: 5, textAlign: "right" }}>
//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//        <Typography variant="body1">SUBTOTAL:</Typography>
//        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
//         Tk {subtotal.toFixed(2)}
//        </Typography>
//       </Box>
//       <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
//        Taxes and shipping calculated at checkout
//       </Typography>
//       <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
//        All charges are billed in BDT. While the content of your cart is
//        currently displayed in, the checkout will use BDT at the most current
//        exchange rate.
//       </Typography>
//       <Button
//        variant="contained"
//        color="error"
//        size="large"
//        onClick={handleNext}
//        sx={{ px: 4 }}
//       >
//        Check Out
//       </Button>
//      </Box>
//     </Grid>

//     <Grid item xs={12}>
//      <Box sx={{ mt: 3 }}>
//       <Typography variant="h6" gutterBottom>
//        Estimate shipping
//       </Typography>
//       <Grid container spacing={2}>
//        <Grid item xs={12} sm={6}>
//         <FormControl fullWidth>
//          <InputLabel id="country-label">Country</InputLabel>
//          <Select labelId="country-label" value="Bangladesh" label="Country">
//           <MenuItem value="Bangladesh">Bangladesh</MenuItem>
//          </Select>
//         </FormControl>
//        </Grid>
//        <Grid item xs={12} sm={6}>
//         <TextField fullWidth label="Zip code" variant="outlined" />
//        </Grid>
//        <Grid item xs={12}>
//         <Button variant="contained" color="error" fullWidth>
//          ESTIMATE
//         </Button>
//        </Grid>
//       </Grid>

//       <Box sx={{ mt: 3 }}>
//        <Typography variant="body1">
//         We found 2 shipping rates available for Bangladesh, starting at Tk 0.00
//         BDT.
//        </Typography>
//        <ul>
//         <li>
//          Inside Dhaka at Tk{" "}
//          {shippingMethods.find((m) => m.id === "inside-dhaka")?.fee.toFixed(2)}{" "}
//          BDT
//         </li>
//         <li>
//          Outside Dhaka at Tk{" "}
//          {shippingMethods.find((m) => m.id === "outside-dhaka")?.fee.toFixed(2)}{" "}
//          BDT
//         </li>
//        </ul>
//       </Box>
//      </Box>
//     </Grid>
//    </Grid>
//   </Paper>
//  );

//  // Checkout form component
//  const CheckoutForm = () => (
//   <Box component="form" onSubmit={handleSubmit}>
//    <Grid container spacing={3}>
//     <Grid item xs={12} md={8}>
//      <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
//       <Typography variant="h6" gutterBottom>
//        Contact
//       </Typography>
//       <TextField
//        required
//        fullWidth
//        name="email"
//        label="Email"
//        variant="outlined"
//        value={formData.email}
//        onChange={handleChange}
//        margin="normal"
//       />
//       <FormControlLabel
//        control={<Checkbox name="emailUpdates" color="primary" />}
//        label="Email me with news and offers"
//       />
//      </Paper>

//      <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
//       <Typography variant="h6" gutterBottom>
//        Delivery
//       </Typography>
//       <FormControl fullWidth margin="normal">
//        <InputLabel id="country-select-label">Country/region</InputLabel>
//        <Select
//         labelId="country-select-label"
//         id="country-select"
//         value="Bangladesh"
//         label="Country/region"
//        >
//         <MenuItem value="Bangladesh">Bangladesh</MenuItem>
//        </Select>
//       </FormControl>
//       <Grid container spacing={2}>
//        <Grid item xs={12} sm={6}>
//         <TextField
//          required
//          fullWidth
//          name="firstName"
//          label="First name"
//          value={formData.firstName}
//          onChange={handleChange}
//          margin="normal"
//         />
//        </Grid>
//        <Grid item xs={12} sm={6}>
//         <TextField
//          required
//          fullWidth
//          name="lastName"
//          label="Last name"
//          value={formData.lastName}
//          onChange={handleChange}
//          margin="normal"
//         />
//        </Grid>
//       </Grid>
//       <TextField
//        required
//        fullWidth
//        name="address"
//        label="Address"
//        value={formData.address}
//        onChange={handleChange}
//        margin="normal"
//        placeholder="House #, Road #, Street, Landmark"
//       />
//       <TextField
//        required
//        fullWidth
//        name="city"
//        label="City"
//        value={formData.city}
//        onChange={handleChange}
//        margin="normal"
//       />
//       <TextField
//        required
//        fullWidth
//        name="phone"
//        label="Phone"
//        value={formData.phone}
//        onChange={handleChange}
//        margin="normal"
//        InputProps={{
//         startAdornment: <InputAdornment position="start">+880</InputAdornment>,
//        }}
//       />
//       <FormControlLabel
//        control={<Checkbox name="saveInfo" color="primary" />}
//        label="Save this information for next time"
//       />
//      </Paper>

//      <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
//       <Typography variant="h6" gutterBottom>
//        Shipping method
//       </Typography>
//       <RadioGroup value={shippingMethod} onChange={handleShippingMethodChange}>
//        {shippingMethods.map((method) => (
//         <FormControlLabel
//          key={method.id}
//          value={method.id}
//          control={<Radio color="primary" />}
//          label={
//           <Box
//            sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             width: "100%",
//            }}
//           >
//            <Typography>{method.name}</Typography>
//            <Typography>৳{method.fee.toFixed(2)}</Typography>
//           </Box>
//          }
//          sx={{
//           border: "1px solid #eee",
//           borderRadius: 1,
//           p: 1,
//           mb: 1,
//           width: "100%",
//          }}
//         />
//        ))}
//       </RadioGroup>
//      </Paper>

//      <Paper elevation={0} sx={{ p: 3 }}>
//       <Typography variant="h6" gutterBottom>
//        Payment
//       </Typography>
//       <Typography variant="body2" color="textSecondary" gutterBottom>
//        All transactions are secure and encrypted.
//       </Typography>

//       <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
//        <Tabs
//         value={paymentTab}
//         onChange={handlePaymentTabChange}
//         aria-label="payment method tabs"
//         variant="fullWidth"
//         sx={{
//          "& .MuiTab-root": {
//           textTransform: "none",
//           backgroundColor: "#f5f5f5",
//           borderTop: "1px solid #e0e0e0",
//           borderLeft: "1px solid #e0e0e0",
//           borderRight: "1px solid #e0e0e0",
//           borderTopLeftRadius: 4,
//           borderTopRightRadius: 4,
//           "&.Mui-selected": {
//            backgroundColor: "#fff",
//           },
//          },
//         }}
//        >
//         <Tab label="CARDS" />
//         <Tab label="MOBILE BANKING" />
//         <Tab label="NET BANKING" />
//        </Tabs>
//       </Box>

//       {paymentTab === 0 && (
//        <Box>
//         <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
//          <img src="/api/placeholder/40/25" alt="Visa" />
//          <img src="/api/placeholder/40/25" alt="Mastercard" />
//          <img src="/api/placeholder/40/25" alt="Amex" />
//          <img src="/api/placeholder/40/25" alt="Diners" />
//         </Box>

//         <TextField
//          required
//          fullWidth
//          name="cardNumber"
//          label="Card Number"
//          value={formData.cardNumber}
//          onChange={handleChange}
//          margin="normal"
//         />

//         <Grid container spacing={2}>
//          <Grid item xs={12} sm={6}>
//           <TextField
//            required
//            fullWidth
//            name="cardExpiry"
//            label="MM/YY"
//            value={formData.cardExpiry}
//            onChange={handleChange}
//            margin="normal"
//           />
//          </Grid>
//          <Grid item xs={12} sm={6}>
//           <TextField
//            required
//            fullWidth
//            name="cardCVC"
//            label="CVC/CVV"
//            value={formData.cardCVC}
//            onChange={handleChange}
//            margin="normal"
//            InputProps={{
//             endAdornment: (
//              <InputAdornment position="end">
//               <img src="/api/placeholder/24/16" alt="CVC" />
//              </InputAdornment>
//             ),
//            }}
//           />
//          </Grid>
//         </Grid>

//         <TextField
//          required
//          fullWidth
//          name="cardHolder"
//          label="Card Holder Name"
//          value={formData.cardHolder}
//          onChange={handleChange}
//          margin="normal"
//         />

//         <FormControlLabel
//          control={
//           <Checkbox
//            name="saveCard"
//            color="primary"
//            checked={formData.saveCard}
//            onChange={handleChange}
//           />
//          }
//          label="Save card & remember me"
//         />

//         <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
//          After clicking the 'Pay now' button, you will be redirected to the
//          issuer to complete your purchase securely.
//         </Typography>
//        </Box>
//       )}

//       {paymentTab === 1 && (
//        <Box>
//         <Typography variant="body2" gutterBottom>
//          Please login to show your saved wallets
//         </Typography>

//         <Grid container spacing={2} sx={{ mt: 2 }}>
//          <Grid item xs={4}>
//           <Box sx={{ textAlign: "center" }}>
//            <img src="/api/placeholder/60/30" alt="bKash" />
//            <Typography variant="body2">bKash</Typography>
//           </Box>
//          </Grid>
//          <Grid item xs={4}>
//           <Box sx={{ textAlign: "center" }}>
//            <img src="/api/placeholder/60/30" alt="Nagad" />
//            <Typography variant="body2">Nagad</Typography>
//           </Box>
//          </Grid>
//          <Grid item xs={4}>
//           <Box sx={{ textAlign: "center" }}>
//            <img src="/api/placeholder/60/30" alt="Upay" />
//            <Typography variant="body2">Upay</Typography>
//           </Box>
//          </Grid>
//          <Grid item xs={4}>
//           <Box sx={{ textAlign: "center" }}>
//            <img src="/api/placeholder/60/30" alt="Rocket" />
//            <Typography variant="body2">Rocket</Typography>
//           </Box>
//          </Grid>
//          <Grid item xs={4}>
//           <Box sx={{ textAlign: "center" }}>
//            <img src="/api/placeholder/60/30" alt="Tap" />
//            <Typography variant="body2">Tap</Typography>
//           </Box>
//          </Grid>
//          <Grid item xs={4}>
//           <Box sx={{ textAlign: "center" }}>
//            <img src="/api/placeholder/60/30" alt="Pocket" />
//            <Typography variant="body2">Pocket</Typography>
//           </Box>
//          </Grid>
//         </Grid>
//        </Box>
//       )}
//       {/* Add Tab 2 for Net Banking if needed */}
//       {paymentTab === 2 && (
//        <Box>
//         <Typography variant="body2" gutterBottom>
//          Net Banking options would go here.
//         </Typography>
//        </Box>
//       )}

//       <Box sx={{ border: "1px solid #e0e0e0", p: 2, mt: 3, borderRadius: 1 }}>
//        <Typography variant="body2">
//         By checking this pay button you agree to our
//         <Typography component="span" color="primary" sx={{ cursor: "pointer" }}>
//          {" "}
//          Terms of Service
//         </Typography>
//         which is limited to facilitating your payment to Blucheez.
//        </Typography>
//       </Box>
//      </Paper>

//      <Paper elevation={0} sx={{ p: 3, mt: 3 }}>
//       <Typography variant="h6" gutterBottom>
//        Billing address
//       </Typography>
//       <RadioGroup
//        value={formData.sameAsBilling ? "same" : "different"}
//        onChange={(e) =>
//         setFormData({ ...formData, sameAsBilling: e.target.value === "same" })
//        }
//       >
//        <FormControlLabel
//         value="same"
//         control={<Radio color="primary" />}
//         label="Same as shipping address"
//        />
//        <FormControlLabel
//         value="different"
//         control={<Radio color="primary" />}
//         label="Use a different billing address"
//        />
//       </RadioGroup>

//       {!formData.sameAsBilling && (
//        <Box sx={{ mt: 2 }}>
//         {/* Additional billing address fields would go here */}
//         <TextField fullWidth label="Billing Address" margin="normal" />
//        </Box>
//       )}
//      </Paper>

//      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
//       <Button variant="outlined" onClick={handleBack} sx={{ mr: 1 }}>
//        Return to cart
//       </Button>
//       <Button
//        variant="contained"
//        color="primary"
//        type="submit"
//        sx={{
//         bgcolor: "#212121",
//         "&:hover": { bgcolor: "#000000" },
//         px: 4,
//        }}
//       >
//        Pay now
//       </Button>
//      </Box>
//     </Grid>

//     <Grid item xs={12} md={4}>
//      <Paper elevation={0} sx={{ p: 3, bgcolor: "#f9f9f9" }}>
//       <Typography variant="h6" gutterBottom>
//        Order Summary
//       </Typography>
//       <Box sx={{ display: "flex", alignItems: "center", mt: 2, mb: 3 }}>
//        <Box sx={{ position: "relative", mr: 2 }}>
//         <img src={cartItem.image} alt={cartItem.name} style={{ width: 60 }} />
//         <Box
//          sx={{
//           position: "absolute",
//           top: -8,
//           right: -8,
//           width: 20,
//           height: 20,
//           borderRadius: "50%",
//           bgcolor: "#f44336",
//           color: "#fff",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           fontSize: "0.75rem",
//          }}
//         >
//          {cartItem.quantity}
//         </Box>
//        </Box>
//        <Box>
//         <Typography variant="body1">{cartItem.name}</Typography>
//         <Typography variant="body2" color="textSecondary">
//          {cartItem.color}
//         </Typography>
//        </Box>
//        <Typography variant="body1" sx={{ ml: "auto" }}>
//         ৳{cartItem.price.toFixed(2)}
//        </Typography>
//       </Box>

//       <Divider sx={{ my: 2 }} />

//       <Box sx={{ my: 2 }}>
//        <TextField
//         fullWidth
//         placeholder="Discount code or gift card"
//         variant="outlined"
//         size="small"
//         InputProps={{
//          endAdornment: (
//           <InputAdornment position="end">
//            <Button variant="text" size="small">
//             Apply
//            </Button>
//           </InputAdornment>
//          ),
//         }}
//        />
//       </Box>

//       <Divider sx={{ my: 2 }} />

//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//        <Typography variant="body1">Subtotal</Typography>
//        <Typography variant="body1">৳{subtotal.toFixed(2)}</Typography>
//       </Box>

//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//        <Typography variant="body1">Shipping</Typography>
//        <Typography variant="body1">৳{shipping.toFixed(2)}</Typography>
//       </Box>

//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//        <Typography variant="body1">Estimated taxes</Typography>
//        <Typography variant="body1">৳{tax.toFixed(2)}</Typography>
//       </Box>

//       <Divider sx={{ my: 2 }} />

//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//        <Typography variant="h6">Total</Typography>
//        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//         BDT ৳{total.toFixed(2)}
//        </Typography>
//       </Box>
//      </Paper>
//     </Grid>
//    </Grid>
//   </Box>
//  );

//  const getStepContent = (step) => {
//   switch (step) {
//    case 0:
//     return <CartView />;
//    case 1:
//     return <CheckoutForm />;
//    case 2:
//     return (
//      <ConfirmationView
//       formData={formData}
//       onBackToHome={() => navigate("/")} // Or navigate to home page
//       subtotal={subtotal}
//       shipping={shipping}
//       tax={tax}
//       total={total}
//      />
//     );
//    default:
//     return "Unknown step";
//   }
//  };

//  return (
//   <Container maxWidth="lg" sx={{ my: 4 }}>
//    <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
//     {steps.map((label) => (
//      <Step key={label}>
//       <StepLabel>{label}</StepLabel>
//      </Step>
//     ))}
//    </Stepper>

//    {getStepContent(activeStep)}
//   </Container>
//  );
// };

// export default paymentgatewayrough;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentModal from "../Components/PaymentModal"; // Correct path to your PaymentModal
import {
 Box,
 Button,
 Card, // Unused import based on the provided code structure, can be removed if not used elsewhere
 CardContent, // Unused import
 Checkbox,
 Container,
 Divider,
 FormControl,
 FormControlLabel,
 Grid,
 IconButton,
 InputAdornment,
 InputLabel,
 MenuItem,
 Paper,
 Radio,
 RadioGroup,
 Select,
 Step,
 StepLabel,
 Stepper,
 Tab,
 Tabs,
 TextField,
 Typography,
} from "@mui/material";
import {
 Add,
 ArrowBack,
 Close, // Unused import
 CreditCard, // Unused import
 Delete,
 Help, // Unused import
 LocationOn,
 Phone, // Unused import
 QuestionMark, // Unused import
 Remove,
 Visibility, // Unused import
} from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Mock data for product in cart
const cartItem = {
 id: 1,
 name: "3D Embroidered Cotton Kameez",
 color: "Navy",
 size: "S",
 price: 2595.0,
 quantity: 1,
 image: "/api/placeholder/100/120",
};

// Define your Material-UI theme here
const theme = createTheme({
 // You can customize your theme here, for example:
 // palette: {
 //   primary: {
 //     main: '#1976d2',
 //   },
 //   secondary: {
 //     main: '#dc004e',
 //   },
 // },
});

// Payment methods available (from your original file)
const paymentMethods = [
 {
  id: "credit-card",
  name: "Credit/Debit Card",
  logos: ["visa", "mastercard", "amex", "diners"],
 },
 { id: "cod", name: "Cash on Delivery (COD)", fee: "Tk. 47.50" },
 { id: "bkash", name: "bKash", logo: "bkash" },
 { id: "nagad", name: "Nagad", logo: "nagad" },
 { id: "upay", name: "Upay", logo: "upay" },
 { id: "rocket", name: "Rocket", logo: "rocket" },
];

// Shipping methods (from your original file)
const shippingMethods = [
 { id: "inside-dhaka", name: "Inside Dhaka", fee: 60.0 },
 { id: "outside-dhaka", name: "Outside Dhaka", fee: 120.0 },
];

// Order confirmation component - Moved to top level
const ConfirmationView = ({
 formData,
 onBackToHome,
 subtotal,
 shipping,
 tax,
 total,
}) => (
 <Box>
  <Paper elevation={0} sx={{ p: 3, mb: 4, textAlign: "center" }}>
   <Box
    sx={{
     display: "flex",
     alignItems: "center",
     justifyContent: "center",
     mb: 2,
    }}
   >
    <Box
     sx={{
      width: 40,
      height: 40,
      borderRadius: "50%",
      bgcolor: "#4caf50",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      mr: 2,
     }}
    >
     ✓
    </Box>
    <Box sx={{ textAlign: "left" }}>
     <Typography variant="body2" color="textSecondary">
      Confirmation #{Math.random().toString(36).substring(2, 10).toUpperCase()}
     </Typography>
     <Typography variant="h6">
      Thank you, {formData.firstName || "Muhammad Rifat"}!
     </Typography>
    </Box>
   </Box>

   <Box
    sx={{ my: 3, p: 2, position: "relative", height: 240, bgcolor: "#f5f5f5" }}
   >
    <Typography
     variant="body1"
     sx={{
      position: "absolute",
      top: 10,
      left: 10,
      bgcolor: "white",
      p: 1,
      borderRadius: 1,
     }}
    >
     Shipping address
    </Typography>
    <Typography
     variant="body1"
     sx={{
      position: "absolute",
      bottom: 20,
      left: 0,
      right: 0,
      textAlign: "center",
     }}
    >
     Dhaka
    </Typography>
    <Typography
     variant="body1"
     sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
     }}
    >
     <LocationOn sx={{ fontSize: 40, color: "#f44336" }} />
    </Typography>
   </Box>

   <Box sx={{ textAlign: "left" }}>
    <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
     Your order is confirmed
    </Typography>
    <Typography variant="body2" color="textSecondary">
     You'll receive a confirmation email with your order number shortly.
    </Typography>
   </Box>
  </Paper>

  <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
   <Typography variant="h6" gutterBottom>
    Order details
   </Typography>
   <Grid container spacing={3}>
    <Grid item xs={12} sm={6}>
     <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
      Contact information
     </Typography>
     <Typography variant="body2">
      {formData.email || "kashimmirza86@gmail.com"}
     </Typography>
    </Grid>
    <Grid item xs={12} sm={6}>
     <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
      Payment method
     </Typography>
     <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography variant="body2" sx={{ mr: 1 }}>
       •
      </Typography>
      {/* Display actual selected payment method dynamically */}
      <Typography variant="body2">
       Cash on Delivery (COD) - ৳
       {shippingMethods.find((m) => m.id === "cod")?.fee || 47.5}{" "}
       {/* Use actual fee for COD if applicable */}
      </Typography>
     </Box>
    </Grid>
    <Grid item xs={12} sm={6}>
     <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
      Shipping address
     </Typography>
     <Typography variant="body2">
      {formData.firstName || "Muhammad"} {formData.lastName || "Rifat Hasan"}
     </Typography>
     <Typography variant="body2">
      {formData.address || "house #: 512, 2 no road, New dohs"}
     </Typography>
     <Typography variant="body2">{formData.city || "mohakhali"}</Typography>
     <Typography variant="body2">{formData.zipCode || "dhaka 1206"}</Typography>
     <Typography variant="body2">Bangladesh</Typography>
     <Typography variant="body2">
      +880{formData.phone || "1670361038"}
     </Typography>
    </Grid>
    <Grid item xs={12} sm={6}>
     <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
      Order summary
     </Typography>
     <Typography variant="body2">
      {cartItem.name} (x{cartItem.quantity})
     </Typography>
     {/* Add more items if cart allows multiple */}
     <Box sx={{ mt: 2 }}>
      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
       Subtotal: ৳{subtotal.toFixed(2)}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
       Delivery Fee: ৳{shipping.toFixed(2)}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
       Estimated taxes: ৳{tax.toFixed(2)}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
       Total: ৳{total.toFixed(2)}
      </Typography>
     </Box>
    </Grid>
   </Grid>
  </Paper>

  <Box sx={{ textAlign: "center", mt: 4 }}>
   <Button variant="contained" color="primary" onClick={onBackToHome}>
    Back to Home
   </Button>
  </Box>
 </Box>
);

const PaymentGatewayRough = () => {
 // Renamed from paymentgatewayrough to PaymentGatewayRough for convention
 // State for tracking checkout step
 const [activeStep, setActiveStep] = useState(0);
 const [paymentTab, setPaymentTab] = useState(0);
 const [shippingMethod, setShippingMethod] = useState("inside-dhaka");
 const [paymentMethod, setPaymentMethod] = useState("credit-card");
 const [formData, setFormData] = useState({
  email: "",
  phone: "",
  firstName: "",
  lastName: "",
  address: "",
  city: "Dhaka",
  zipCode: "1206",
  cardNumber: "",
  cardExpiry: "",
  cardCVC: "",
  cardHolder: "",
  saveCard: false,
  sameAsBilling: true,
 });
 const handlepaynow = () => {
  navigate("/paymentmodal"); // Navigate to the payment gateway route
 };

 // State for the PaymentModal
 const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

 const navigate = useNavigate();

 const steps = ["Cart", "Shipping & Payment", "Confirmation"];

 // Calculate totals
 const subtotal = cartItem.price * cartItem.quantity;
 const shipping =
  shippingMethods.find((m) => m.id === shippingMethod)?.fee || 0;
 const tax = subtotal * 0.05; // 5% tax rate
 const total = subtotal + shipping + tax;

 const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  setFormData({
   ...formData,
   [name]: type === "checkbox" ? checked : value,
  });
 };

 const handleShippingMethodChange = (e) => {
  setShippingMethod(e.target.value);
 };

 const handlePaymentMethodChange = (e) => {
  setPaymentMethod(e.target.value);
 };

 const handlePaymentTabChange = (event, newValue) => {
  setPaymentTab(newValue);
 };

 const handleNext = () => {
  setActiveStep((prevStep) => prevStep + 1);
 };

 const handleBack = () => {
  setActiveStep((prevStep) => prevStep - 1);
 };

 // This function will now open the PaymentModal instead of immediately advancing to the next step
 const handlePayNowClick = (e) => {
  e.preventDefault(); // Prevent the default form submission
  setIsPaymentModalOpen(true); // Open the PaymentModal
  // You might also want to do some form validation here before opening the modal
 };

 // Cart component
 const CartView = () => (
  <Paper elevation={0} sx={{ p: 2, mb: 4 }}>
   <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
    Shopping cart
   </Typography>
   <Grid container spacing={2} sx={{ mt: 2 }}>
    <Grid item xs={12}>
     <Box sx={{ display: "flex", borderBottom: "1px solid #eee", pb: 1 }}>
      <Box sx={{ width: "50%" }}>
       <Typography variant="body2" sx={{ fontWeight: "bold" }}>
        PRODUCT
       </Typography>
      </Box>
      <Box sx={{ width: "20%", textAlign: "center" }}>
       <Typography variant="body2" sx={{ fontWeight: "bold" }}>
        PRICE
       </Typography>
      </Box>
      <Box sx={{ width: "15%", textAlign: "center" }}>
       <Typography variant="body2" sx={{ fontWeight: "bold" }}>
        QUANTITY
       </Typography>
      </Box>
      <Box sx={{ width: "15%", textAlign: "right" }}>
       <Typography variant="body2" sx={{ fontWeight: "bold" }}>
        TOTAL
       </Typography>
      </Box>
     </Box>
    </Grid>

    <Grid item xs={12}>
     <Box sx={{ display: "flex", alignItems: "center", py: 2 }}>
      <Box sx={{ width: "50%", display: "flex", alignItems: "center" }}>
       <img
        src={cartItem.image}
        alt={cartItem.name}
        style={{ width: 80, marginRight: 16 }}
       />
       <Box>
        <Typography variant="body1">{cartItem.name}</Typography>
        <Typography variant="body2" color="textSecondary">
         Color: {cartItem.color}
        </Typography>
        <Typography variant="body2" color="textSecondary">
         Size: {cartItem.size}
        </Typography>
        <Box sx={{ display: "flex", mt: 1 }}>
         <IconButton size="small">
          <Delete fontSize="small" />
         </IconButton>
        </Box>
       </Box>
      </Box>
      <Box sx={{ width: "20%", textAlign: "center" }}>
       <Typography>Tk {cartItem.price.toFixed(2)}</Typography>
      </Box>
      <Box sx={{ width: "15%", textAlign: "center" }}>
       <Box
        sx={{
         display: "flex",
         alignItems: "center",
         justifyContent: "center",
        }}
       >
        <IconButton size="small">
         <Remove fontSize="small" />
        </IconButton>
        <TextField
         size="small"
         value={cartItem.quantity}
         inputProps={{ min: 1, style: { textAlign: "center" } }}
         sx={{ width: 60, mx: 1 }}
         // In a real app, you'd have a handler to update cartItem.quantity
        />
        <IconButton size="small">
         <Add fontSize="small" />
        </IconButton>
       </Box>
      </Box>
      <Box sx={{ width: "15%", textAlign: "right" }}>
       <Typography>
        Tk {(cartItem.price * cartItem.quantity).toFixed(2)}
       </Typography>
      </Box>
     </Box>
    </Grid>

    <Grid item xs={12}>
     <Box sx={{ mt: 2 }}>
      <Typography variant="body1">Add Order Note</Typography>
      <TextField
       fullWidth
       multiline
       rows={4}
       placeholder="How can we help you?"
       variant="outlined"
       sx={{ mt: 1 }}
      />
     </Box>
    </Grid>

    <Grid item xs={12} sm={6}>
     <Box sx={{ mt: 2 }}>
      <Typography variant="body1">Coupon:</Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
       Coupon code will work on checkout page
      </Typography>
      <TextField fullWidth placeholder="Coupon code" variant="outlined" />
     </Box>
    </Grid>

    <Grid item xs={12} sm={6}>
     <Box sx={{ mt: 5, textAlign: "right" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
       <Typography variant="body1">SUBTOTAL:</Typography>
       <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        Tk {subtotal.toFixed(2)}
       </Typography>
      </Box>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
       Taxes and shipping calculated at checkout
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
       All charges are billed in BDT. While the content of your cart is
       currently displayed in, the checkout will use BDT at the most current
       exchange rate.
      </Typography>
      <Button
       variant="contained"
       color="error"
       size="large"
       onClick={handleNext} // This button still advances to the next step (Shipping & Payment)
       sx={{ px: 4 }}
      >
       Check Out
      </Button>
     </Box>
    </Grid>

    <Grid item xs={12}>
     <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
       Estimate shipping
      </Typography>
      <Grid container spacing={2}>
       <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
         <InputLabel id="country-label">Country</InputLabel>
         <Select labelId="country-label" value="Bangladesh" label="Country">
          <MenuItem value="Bangladesh">Bangladesh</MenuItem>
         </Select>
        </FormControl>
       </Grid>
       <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Zip code" variant="outlined" />
       </Grid>
       <Grid item xs={12}>
        <Button variant="contained" color="error" fullWidth>
         ESTIMATE
        </Button>
       </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
       <Typography variant="body1">
        We found 2 shipping rates available for Bangladesh, starting at Tk 0.00
        BDT.
       </Typography>
       <ul>
        <li>
         Inside Dhaka at Tk{" "}
         {shippingMethods.find((m) => m.id === "inside-dhaka")?.fee.toFixed(2)}{" "}
         BDT
        </li>
        <li>
         Outside Dhaka at Tk{" "}
         {shippingMethods.find((m) => m.id === "outside-dhaka")?.fee.toFixed(2)}{" "}
         BDT
        </li>
       </ul>
      </Box>
     </Box>
    </Grid>
   </Grid>
  </Paper>
 );

 // Checkout form component
 const CheckoutForm = () => (
  <Box component="form" onSubmit={handlePayNowClick}>
   {" "}
   {/* Modified onSubmit to handlePayNowClick */}
   <Grid container spacing={3}>
    <Grid item xs={12} md={8}>
     <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
       Contact
      </Typography>
      <TextField
       required
       fullWidth
       name="email"
       label="Email"
       variant="outlined"
       value={formData.email}
       onChange={handleChange}
       margin="normal"
      />
      <FormControlLabel
       control={<Checkbox name="emailUpdates" color="primary" />}
       label="Email me with news and offers"
      />
     </Paper>

     <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
       Delivery
      </Typography>
      <FormControl fullWidth margin="normal">
       <InputLabel id="country-select-label">Country/region</InputLabel>
       <Select
        labelId="country-select-label"
        id="country-select"
        value="Bangladesh"
        label="Country/region"
       >
        <MenuItem value="Bangladesh">Bangladesh</MenuItem>
       </Select>
      </FormControl>
      <Grid container spacing={2}>
       <Grid item xs={12} sm={6}>
        <TextField
         required
         fullWidth
         name="firstName"
         label="First name"
         value={formData.firstName}
         onChange={handleChange}
         margin="normal"
        />
       </Grid>
       <Grid item xs={12} sm={6}>
        <TextField
         required
         fullWidth
         name="lastName"
         label="Last name"
         value={formData.lastName}
         onChange={handleChange}
         margin="normal"
        />
       </Grid>
      </Grid>
      <TextField
       required
       fullWidth
       name="address"
       label="Address"
       value={formData.address}
       onChange={handleChange}
       margin="normal"
       placeholder="House #, Road #, Street, Landmark"
      />
      <TextField
       required
       fullWidth
       name="city"
       label="City"
       value={formData.city}
       onChange={handleChange}
       margin="normal"
      />
      <TextField
       required
       fullWidth
       name="phone"
       label="Phone"
       value={formData.phone}
       onChange={handleChange}
       margin="normal"
       InputProps={{
        startAdornment: <InputAdornment position="start">+880</InputAdornment>,
       }}
      />
      <FormControlLabel
       control={<Checkbox name="saveInfo" color="primary" />}
       label="Save this information for next time"
      />
     </Paper>

     <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
       Shipping method
      </Typography>
      <RadioGroup value={shippingMethod} onChange={handleShippingMethodChange}>
       {shippingMethods.map((method) => (
        <FormControlLabel
         key={method.id}
         value={method.id}
         control={<Radio color="primary" />}
         label={
          <Box
           sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
           }}
          >
           <Typography>{method.name}</Typography>
           <Typography>৳{method.fee.toFixed(2)}</Typography>
          </Box>
         }
         sx={{
          border: "1px solid #eee",
          borderRadius: 1,
          p: 1,
          mb: 1,
          width: "100%",
         }}
        />
       ))}
      </RadioGroup>
     </Paper>

     <Paper elevation={0} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
       Payment
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
       All transactions are secure and encrypted.
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
       <Tabs
        value={paymentTab}
        onChange={handlePaymentTabChange}
        aria-label="payment method tabs"
        variant="fullWidth"
        sx={{
         "& .MuiTab-root": {
          textTransform: "none",
          backgroundColor: "#f5f5f5",
          borderTop: "1px solid #e0e0e0",
          borderLeft: "1px solid #e0e0e0",
          borderRight: "1px solid #e0e0e0",
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          "&.Mui-selected": {
           backgroundColor: "#fff",
          },
         },
        }}
       >
        <Tab label="CARDS" />
        <Tab label="MOBILE BANKING" />
        <Tab label="NET BANKING" />
       </Tabs>
      </Box>

      {paymentTab === 0 && (
       <Box>
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
         <img src="/api/placeholder/40/25" alt="Visa" />
         <img src="/api/placeholder/40/25" alt="Mastercard" />
         <img src="/api/placeholder/40/25" alt="Amex" />
         <img src="/api/placeholder/40/25" alt="Diners" />
        </Box>

        <TextField
         required
         fullWidth
         name="cardNumber"
         label="Card Number"
         value={formData.cardNumber}
         onChange={handleChange}
         margin="normal"
        />

        <Grid container spacing={2}>
         <Grid item xs={12} sm={6}>
          <TextField
           required
           fullWidth
           name="cardExpiry"
           label="MM/YY"
           value={formData.cardExpiry}
           onChange={handleChange}
           margin="normal"
          />
         </Grid>
         <Grid item xs={12} sm={6}>
          <TextField
           required
           fullWidth
           name="cardCVC"
           label="CVC/CVV"
           value={formData.cardCVC}
           onChange={handleChange}
           margin="normal"
           InputProps={{
            endAdornment: (
             <InputAdornment position="end">
              <img src="/api/placeholder/24/16" alt="CVC" />
             </InputAdornment>
            ),
           }}
          />
         </Grid>
        </Grid>

        <TextField
         required
         fullWidth
         name="cardHolder"
         label="Card Holder Name"
         value={formData.cardHolder}
         onChange={handleChange}
         margin="normal"
        />

        <FormControlLabel
         control={
          <Checkbox
           name="saveCard"
           color="primary"
           checked={formData.saveCard}
           onChange={handleChange}
          />
         }
         label="Save card & remember me"
        />

        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
         After clicking the 'Pay now' button, you will be redirected to the
         issuer to complete your purchase securely.
        </Typography>
       </Box>
      )}

      {paymentTab === 1 && (
       <Box>
        <Typography variant="body2" gutterBottom>
         Please login to show your saved wallets
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
         <Grid item xs={4}>
          <Box sx={{ textAlign: "center" }}>
           <img src="/api/placeholder/60/30" alt="bKash" />
           <Typography variant="body2">bKash</Typography>
          </Box>
         </Grid>
         <Grid item xs={4}>
          <Box sx={{ textAlign: "center" }}>
           <img src="/api/placeholder/60/30" alt="Nagad" />
           <Typography variant="body2">Nagad</Typography>
          </Box>
         </Grid>
         <Grid item xs={4}>
          <Box sx={{ textAlign: "center" }}>
           <img src="/api/placeholder/60/30" alt="Upay" />
           <Typography variant="body2">Upay</Typography>
          </Box>
         </Grid>
         <Grid item xs={4}>
          <Box sx={{ textAlign: "center" }}>
           <img src="/api/placeholder/60/30" alt="Rocket" />
           <Typography variant="body2">Rocket</Typography>
          </Box>
         </Grid>
         <Grid item xs={4}>
          <Box sx={{ textAlign: "center" }}>
           <img src="/api/placeholder/60/30" alt="Tap" />
           <Typography variant="body2">Tap</Typography>
          </Box>
         </Grid>
         <Grid item xs={4}>
          <Box sx={{ textAlign: "center" }}>
           <img src="/api/placeholder/60/30" alt="Pocket" />
           <Typography variant="body2">Pocket</Typography>
          </Box>
         </Grid>
        </Grid>
       </Box>
      )}
      {/* Add Tab 2 for Net Banking if needed */}
      {paymentTab === 2 && (
       <Box>
        <Typography variant="body2" gutterBottom>
         Net Banking options would go here.
        </Typography>
       </Box>
      )}

      <Box sx={{ border: "1px solid #e0e0e0", p: 2, mt: 3, borderRadius: 1 }}>
       <Typography variant="body2">
        By checking this pay button you agree to our
        <Typography component="span" color="primary" sx={{ cursor: "pointer" }}>
         {" "}
         Terms of Service
        </Typography>
        which is limited to facilitating your payment to Blucheez.
       </Typography>
      </Box>
     </Paper>

     <Paper elevation={0} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
       Billing address
      </Typography>
      <RadioGroup
       value={formData.sameAsBilling ? "same" : "different"}
       onChange={(e) =>
        setFormData({ ...formData, sameAsBilling: e.target.value === "same" })
       }
      >
       <FormControlLabel
        value="same"
        control={<Radio color="primary" />}
        label="Same as shipping address"
       />
       <FormControlLabel
        value="different"
        control={<Radio color="primary" />}
        label="Use a different billing address"
       />
      </RadioGroup>

      {!formData.sameAsBilling && (
       <Box sx={{ mt: 2 }}>
        {/* Additional billing address fields would go here */}
        <TextField fullWidth label="Billing Address" margin="normal" />
       </Box>
      )}
     </Paper>

     <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
      <Button variant="outlined" onClick={handleBack} sx={{ mr: 1 }}>
       Return to cart
      </Button>
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
       onClick={handlepaynow}
      >
       Pay Now
      </Button>
     </Box>
    </Grid>

    <Grid item xs={12} md={4}>
     <Paper elevation={0} sx={{ p: 3, bgcolor: "#f9f9f9" }}>
      <Typography variant="h6" gutterBottom>
       Order Summary
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", mt: 2, mb: 3 }}>
       <Box sx={{ position: "relative", mr: 2 }}>
        <img src={cartItem.image} alt={cartItem.name} style={{ width: 60 }} />
        <Box
         sx={{
          position: "absolute",
          top: -8,
          right: -8,
          width: 20,
          height: 20,
          borderRadius: "50%",
          bgcolor: "#f44336",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.75rem",
         }}
        >
         {cartItem.quantity}
        </Box>
       </Box>
       <Box>
        <Typography variant="body1">{cartItem.name}</Typography>
        <Typography variant="body2" color="textSecondary">
         {cartItem.color}
        </Typography>
       </Box>
       <Typography variant="body1" sx={{ ml: "auto" }}>
        ৳{cartItem.price.toFixed(2)}
       </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ my: 2 }}>
       <TextField
        fullWidth
        placeholder="Discount code or gift card"
        variant="outlined"
        size="small"
        InputProps={{
         endAdornment: (
          <InputAdornment position="end">
           <Button variant="text" size="small">
            Apply
           </Button>
          </InputAdornment>
         ),
        }}
       />
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
       <Typography variant="body1">Subtotal</Typography>
       <Typography variant="body1">৳{subtotal.toFixed(2)}</Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
       <Typography variant="body1">Shipping</Typography>
       <Typography variant="body1">৳{shipping.toFixed(2)}</Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
       <Typography variant="body1">Estimated taxes</Typography>
       <Typography variant="body1">৳{tax.toFixed(2)}</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
       <Typography variant="h6">Total</Typography>
       <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        BDT ৳{total.toFixed(2)}
       </Typography>
      </Box>
     </Paper>
    </Grid>
   </Grid>
  </Box>
 );

 const getStepContent = (step) => {
  switch (step) {
   case 0:
    return <CartView />;
   case 1:
    return <CheckoutForm />;
   case 2:
    return (
     <ConfirmationView
      formData={formData}
      onBackToHome={() => navigate("/")} // Or navigate to home page
      subtotal={subtotal}
      shipping={shipping}
      tax={tax}
      total={total}
     />
    );
   default:
    return "Unknown step";
  }
 };

 return (
  <Container maxWidth="lg" sx={{ my: 4 }}>
   <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
    {steps.map((label) => (
     <Step key={label}>
      <StepLabel>{label}</StepLabel>
     </Step>
    ))}
   </Stepper>

   {getStepContent(activeStep)}
  </Container>
 );
};

export default PaymentGatewayRough;
//good one

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import PaymentModal from "../Components/PaymentModal"; // Correct path to your PaymentModal
// import {
//  Box,
//  Button,
//  Card, // Unused import based on the provided code structure, can be removed if not used elsewhere
//  CardContent, // Unused import
//  Checkbox,
//  Container,
//  Divider,
//  FormControl,
//  FormControlLabel,
//  Grid,
//  IconButton,
//  InputAdornment,
//  InputLabel,
//  MenuItem,
//  Paper,
//  Radio,
//  RadioGroup,
//  Select,
//  Step,
//  StepLabel,
//  Stepper,
//  Tab,
//  Tabs,
//  TextField,
//  Typography,
// } from "@mui/material";
// import {
//  Add,
//  ArrowBack,
//  Close, // Unused import
//  CreditCard, // Unused import
//  Delete,
//  Help, // Unused import
//  LocationOn,
//  Phone, // Unused import
//  QuestionMark, // Unused import
//  Remove,
//  Visibility, // Unused import
// } from "@mui/icons-material";
// import { ThemeProvider, createTheme } from "@mui/material/styles";

// // Mock data for product in cart
// const cartItem = {
//  id: 1,
//  name: "3D Embroidered Cotton Kameez",
//  color: "Navy",
//  size: "S",
//  price: 2595.0,
//  quantity: 1,
//  image: "/api/placeholder/100/120",
// };

// // Define your Material-UI theme here
// const theme = createTheme({
//  // You can customize your theme here, for example:
//  // palette: {
//  //   primary: {
//  //     main: '#1976d2',
//  //   },
//  //   secondary: {
//  //     main: '#dc004e',
//  //   },
//  // },
// });

// // Payment methods available (from your original file)
// const paymentMethods = [
//  {
//   id: "credit-card",
//   name: "Credit/Debit Card",
//   logos: ["visa", "mastercard", "amex", "diners"],
//  },
//  { id: "cod", name: "Cash on Delivery (COD)", fee: "Tk. 47.50" },
//  { id: "bkash", name: "bKash", logo: "bkash" },
//  { id: "nagad", name: "Nagad", logo: "nagad" },
//  { id: "upay", name: "Upay", logo: "upay" },
//  { id: "rocket", name: "Rocket", logo: "rocket" },
// ];

// // Shipping methods (from your original file)
// const shippingMethods = [
//  { id: "inside-dhaka", name: "Inside Dhaka", fee: 60.0 },
//  { id: "outside-dhaka", name: "Outside Dhaka", fee: 120.0 },
// ];

// // Order confirmation component - Moved to top level
// const ConfirmationView = ({
//  formData,
//  onBackToHome,
//  subtotal,
//  shipping,
//  tax,
//  total,
// }) => (
//  <Box>
//   <Paper elevation={0} sx={{ p: 3, mb: 4, textAlign: "center" }}>
//    <Box
//     sx={{
//      display: "flex",
//      alignItems: "center",
//      justifyContent: "center",
//      mb: 2,
//     }}
//    >
//     <Box
//      sx={{
//       width: 40,
//       height: 40,
//       borderRadius: "50%",
//       bgcolor: "#4caf50",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       color: "#fff",
//       mr: 2,
//      }}
//     >
//      ✓
//     </Box>
//     <Box sx={{ textAlign: "left" }}>
//      <Typography variant="body2" color="textSecondary">
//       Confirmation #{Math.random().toString(36).substring(2, 10).toUpperCase()}
//      </Typography>
//      <Typography variant="h6">
//       Thank you, {formData.firstName || "Muhammad Rifat"}!
//      </Typography>
//     </Box>
//    </Box>

//    <Box
//     sx={{ my: 3, p: 2, position: "relative", height: 240, bgcolor: "#f5f5f5" }}
//    >
//     <Typography
//      variant="body1"
//      sx={{
//       position: "absolute",
//       top: 10,
//       left: 10,
//       bgcolor: "white",
//       p: 1,
//       borderRadius: 1,
//      }}
//     >
//      Shipping address
//     </Typography>
//     <Typography
//      variant="body1"
//      sx={{
//       position: "absolute",
//       bottom: 20,
//       left: 0,
//       right: 0,
//       textAlign: "center",
//      }}
//     >
//      Dhaka
//     </Typography>
//     <Typography
//      variant="body1"
//      sx={{
//       position: "absolute",
//       top: "50%",
//       left: "50%",
//       transform: "translate(-50%, -50%)",
//      }}
//     >
//      <LocationOn sx={{ fontSize: 40, color: "#f44336" }} />
//     </Typography>
//    </Box>

//    <Box sx={{ textAlign: "left" }}>
//     <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
//      Your order is confirmed
//     </Typography>
//     <Typography variant="body2" color="textSecondary">
//      You'll receive a confirmation email with your order number shortly.
//     </Typography>
//    </Box>
//   </Paper>

//   <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
//    <Typography variant="h6" gutterBottom>
//     Order details
//    </Typography>
//    <Grid container spacing={3}>
//     <Grid item xs={12} sm={6}>
//      <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
//       Contact information
//      </Typography>
//      <Typography variant="body2">
//       {formData.email || "kashimmirza86@gmail.com"}
//      </Typography>
//     </Grid>
//     <Grid item xs={12} sm={6}>
//      <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
//       Payment method
//      </Typography>
//      <Box sx={{ display: "flex", alignItems: "center" }}>
//       <Typography variant="body2" sx={{ mr: 1 }}>
//        •
//       </Typography>
//       {/* Display actual selected payment method dynamically */}
//       <Typography variant="body2">
//        Cash on Delivery (COD) - ৳
//        {shippingMethods.find((m) => m.id === "cod")?.fee || 47.5}{" "}
//        {/* Use actual fee for COD if applicable */}
//       </Typography>
//      </Box>
//     </Grid>
//     <Grid item xs={12} sm={6}>
//      <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
//       Shipping address
//      </Typography>
//      <Typography variant="body2">
//       {formData.firstName || "Muhammad"} {formData.lastName || "Rifat Hasan"}
//      </Typography>
//      <Typography variant="body2">
//       {formData.address || "house #: 512, 2 no road, New dohs"}
//      </Typography>
//      <Typography variant="body2">{formData.city || "mohakhali"}</Typography>
//      <Typography variant="body2">{formData.zipCode || "dhaka 1206"}</Typography>
//      <Typography variant="body2">Bangladesh</Typography>
//      <Typography variant="body2">
//       +880{formData.phone || "1670361038"}
//      </Typography>
//     </Grid>
//     <Grid item xs={12} sm={6}>
//      <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
//       Order summary
//      </Typography>
//      <Typography variant="body2">
//       {cartItem.name} (x{cartItem.quantity})
//      </Typography>
//      {/* Add more items if cart allows multiple */}
//      <Box sx={{ mt: 2 }}>
//       <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//        Subtotal: ৳{subtotal.toFixed(2)}
//       </Typography>
//       <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//        Delivery Fee: ৳{shipping.toFixed(2)}
//       </Typography>
//       <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//        Estimated taxes: ৳{tax.toFixed(2)}
//       </Typography>
//       <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//        Total: ৳{total.toFixed(2)}
//       </Typography>
//      </Box>
//     </Grid>
//    </Grid>
//   </Paper>

//   <Box sx={{ textAlign: "center", mt: 4 }}>
//    <Button variant="contained" color="primary" onClick={onBackToHome}>
//     Back to Home
//    </Button>
//   </Box>
//  </Box>
// );

// const PaymentGatewayRough = () => {
//  // Renamed from paymentgatewayrough to PaymentGatewayRough for convention
//  // State for tracking checkout step
//  const [activeStep, setActiveStep] = useState(0);
//  const [paymentTab, setPaymentTab] = useState(0);
//  const [shippingMethod, setShippingMethod] = useState("inside-dhaka");
//  const [paymentMethod, setPaymentMethod] = useState("credit-card");
//  const [formData, setFormData] = useState({
//   email: "",
//   phone: "",
//   firstName: "",
//   lastName: "",
//   address: "",
//   city: "Dhaka",
//   zipCode: "1206",
//   cardNumber: "",
//   cardExpiry: "",
//   cardCVC: "",
//   cardHolder: "",
//   saveCard: false,
//   sameAsBilling: true,
//  });

//  // State for the PaymentModal
//  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

//  const navigate = useNavigate();

//  const steps = ["Cart", "Shipping & Payment", "Confirmation"];

//  // Calculate totals
//  const subtotal = cartItem.price * cartItem.quantity;
//  const shipping =
//   shippingMethods.find((m) => m.id === shippingMethod)?.fee || 0;
//  const tax = subtotal * 0.05; // 5% tax rate
//  const total = subtotal + shipping + tax;

//  const handleChange = (e) => {
//   const { name, value, type, checked } = e.target;
//   setFormData({
//    ...formData,
//    [name]: type === "checkbox" ? checked : value,
//   });
//  };

//  const handleShippingMethodChange = (e) => {
//   setShippingMethod(e.target.value);
//  };

//  const handlePaymentMethodChange = (e) => {
//   setPaymentMethod(e.target.value);
//  };

//  const handlePaymentTabChange = (event, newValue) => {
//   setPaymentTab(newValue);
//  };

//  const handleNext = () => {
//   setActiveStep((prevStep) => prevStep + 1);
//  };

//  const handleBack = () => {
//   setActiveStep((prevStep) => prevStep - 1);
//  };

//  // This function will now open the PaymentModal instead of immediately advancing to the next step
//  const handlePayNowClick = (e) => {
//   e.preventDefault(); // Prevent the default form submission
//   setIsPaymentModalOpen(true); // Open the PaymentModal
//   // You might also want to do some form validation here before opening the modal
//  };

//  // Cart component
//  const CartView = () => (
//   <Paper elevation={0} sx={{ p: 2, mb: 4 }}>
//    <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
//     Shopping cart
//    </Typography>
//    <Grid container spacing={2} sx={{ mt: 2 }}>
//     <Grid item xs={12}>
//      <Box sx={{ display: "flex", borderBottom: "1px solid #eee", pb: 1 }}>
//       <Box sx={{ width: "50%" }}>
//        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//         PRODUCT
//        </Typography>
//       </Box>
//       <Box sx={{ width: "20%", textAlign: "center" }}>
//        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//         PRICE
//        </Typography>
//       </Box>
//       <Box sx={{ width: "15%", textAlign: "center" }}>
//        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//         QUANTITY
//        </Typography>
//       </Box>
//       <Box sx={{ width: "15%", textAlign: "right" }}>
//        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//         TOTAL
//        </Typography>
//       </Box>
//      </Box>
//     </Grid>

//     <Grid item xs={12}>
//      <Box sx={{ display: "flex", alignItems: "center", py: 2 }}>
//       <Box sx={{ width: "50%", display: "flex", alignItems: "center" }}>
//        <img
//         src={cartItem.image}
//         alt={cartItem.name}
//         style={{ width: 80, marginRight: 16 }}
//        />
//        <Box>
//         <Typography variant="body1">{cartItem.name}</Typography>
//         <Typography variant="body2" color="textSecondary">
//          Color: {cartItem.color}
//         </Typography>
//         <Typography variant="body2" color="textSecondary">
//          Size: {cartItem.size}
//         </Typography>
//         <Box sx={{ display: "flex", mt: 1 }}>
//          <IconButton size="small">
//           <Delete fontSize="small" />
//          </IconButton>
//         </Box>
//        </Box>
//       </Box>
//       <Box sx={{ width: "20%", textAlign: "center" }}>
//        <Typography>Tk {cartItem.price.toFixed(2)}</Typography>
//       </Box>
//       <Box sx={{ width: "15%", textAlign: "center" }}>
//        <Box
//         sx={{
//          display: "flex",
//          alignItems: "center",
//          justifyContent: "center",
//         }}
//        >
//         <IconButton size="small">
//          <Remove fontSize="small" />
//         </IconButton>
//         <TextField
//          size="small"
//          value={cartItem.quantity}
//          inputProps={{ min: 1, style: { textAlign: "center" } }}
//          sx={{ width: 60, mx: 1 }}
//          // In a real app, you'd have a handler to update cartItem.quantity
//         />
//         <IconButton size="small">
//          <Add fontSize="small" />
//         </IconButton>
//        </Box>
//       </Box>
//       <Box sx={{ width: "15%", textAlign: "right" }}>
//        <Typography>
//         Tk {(cartItem.price * cartItem.quantity).toFixed(2)}
//        </Typography>
//       </Box>
//      </Box>
//     </Grid>

//     <Grid item xs={12}>
//      <Box sx={{ mt: 2 }}>
//       <Typography variant="body1">Add Order Note</Typography>
//       <TextField
//        fullWidth
//        multiline
//        rows={4}
//        placeholder="How can we help you?"
//        variant="outlined"
//        sx={{ mt: 1 }}
//       />
//      </Box>
//     </Grid>

//     <Grid item xs={12} sm={6}>
//      <Box sx={{ mt: 2 }}>
//       <Typography variant="body1">Coupon:</Typography>
//       <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
//        Coupon code will work on checkout page
//       </Typography>
//       <TextField fullWidth placeholder="Coupon code" variant="outlined" />
//      </Box>
//     </Grid>

//     <Grid item xs={12} sm={6}>
//      <Box sx={{ mt: 5, textAlign: "right" }}>
//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//        <Typography variant="body1">SUBTOTAL:</Typography>
//        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
//         Tk {subtotal.toFixed(2)}
//        </Typography>
//       </Box>
//       <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
//        Taxes and shipping calculated at checkout
//       </Typography>
//       <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
//        All charges are billed in BDT. While the content of your cart is
//        currently displayed in, the checkout will use BDT at the most current
//        exchange rate.
//       </Typography>
//       <Button
//        variant="contained"
//        color="error"
//        size="large"
//        onClick={handleNext} // This button still advances to the next step (Shipping & Payment)
//        sx={{ px: 4 }}
//       >
//        Check Out
//       </Button>
//      </Box>
//     </Grid>

//     <Grid item xs={12}>
//      <Box sx={{ mt: 3 }}>
//       <Typography variant="h6" gutterBottom>
//        Estimate shipping
//       </Typography>
//       <Grid container spacing={2}>
//        <Grid item xs={12} sm={6}>
//         <FormControl fullWidth>
//          <InputLabel id="country-label">Country</InputLabel>
//          <Select labelId="country-label" value="Bangladesh" label="Country">
//           <MenuItem value="Bangladesh">Bangladesh</MenuItem>
//          </Select>
//         </FormControl>
//        </Grid>
//        <Grid item xs={12} sm={6}>
//         <TextField fullWidth label="Zip code" variant="outlined" />
//        </Grid>
//        <Grid item xs={12}>
//         <Button variant="contained" color="error" fullWidth>
//          ESTIMATE
//         </Button>
//        </Grid>
//       </Grid>

//       <Box sx={{ mt: 3 }}>
//        <Typography variant="body1">
//         We found 2 shipping rates available for Bangladesh, starting at Tk 0.00
//         BDT.
//        </Typography>
//        <ul>
//         <li>
//          Inside Dhaka at Tk{" "}
//          {shippingMethods.find((m) => m.id === "inside-dhaka")?.fee.toFixed(2)}{" "}
//          BDT
//         </li>
//         <li>
//          Outside Dhaka at Tk{" "}
//          {shippingMethods.find((m) => m.id === "outside-dhaka")?.fee.toFixed(2)}{" "}
//          BDT
//         </li>
//        </ul>
//       </Box>
//      </Box>
//     </Grid>
//    </Grid>
//   </Paper>
//  );

//  // Checkout form component
//  const CheckoutForm = () => (
//   <Box component="form" onSubmit={handlePayNowClick}>
//    {" "}
//    {/* Modified onSubmit to handlePayNowClick */}
//    <Grid container spacing={3}>
//     <Grid item xs={12} md={8}>
//      <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
//       <Typography variant="h6" gutterBottom>
//        Contact
//       </Typography>
//       <TextField
//        required
//        fullWidth
//        name="email"
//        label="Email"
//        variant="outlined"
//        value={formData.email}
//        onChange={handleChange}
//        margin="normal"
//       />
//       <FormControlLabel
//        control={<Checkbox name="emailUpdates" color="primary" />}
//        label="Email me with news and offers"
//       />
//      </Paper>

//      <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
//       <Typography variant="h6" gutterBottom>
//        Delivery
//       </Typography>
//       <FormControl fullWidth margin="normal">
//        <InputLabel id="country-select-label">Country/region</InputLabel>
//        <Select
//         labelId="country-select-label"
//         id="country-select"
//         value="Bangladesh"
//         label="Country/region"
//        >
//         <MenuItem value="Bangladesh">Bangladesh</MenuItem>
//        </Select>
//       </FormControl>
//       <Grid container spacing={2}>
//        <Grid item xs={12} sm={6}>
//         <TextField
//          required
//          fullWidth
//          name="firstName"
//          label="First name"
//          value={formData.firstName}
//          onChange={handleChange}
//          margin="normal"
//         />
//        </Grid>
//        <Grid item xs={12} sm={6}>
//         <TextField
//          required
//          fullWidth
//          name="lastName"
//          label="Last name"
//          value={formData.lastName}
//          onChange={handleChange}
//          margin="normal"
//         />
//        </Grid>
//       </Grid>
//       <TextField
//        required
//        fullWidth
//        name="address"
//        label="Address"
//        value={formData.address}
//        onChange={handleChange}
//        margin="normal"
//        placeholder="House #, Road #, Street, Landmark"
//       />
//       <TextField
//        required
//        fullWidth
//        name="city"
//        label="City"
//        value={formData.city}
//        onChange={handleChange}
//        margin="normal"
//       />
//       <TextField
//        required
//        fullWidth
//        name="phone"
//        label="Phone"
//        value={formData.phone}
//        onChange={handleChange}
//        margin="normal"
//        InputProps={{
//         startAdornment: <InputAdornment position="start">+880</InputAdornment>,
//        }}
//       />
//       <FormControlLabel
//        control={<Checkbox name="saveInfo" color="primary" />}
//        label="Save this information for next time"
//       />
//      </Paper>

//      <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
//       <Typography variant="h6" gutterBottom>
//        Shipping method
//       </Typography>
//       <RadioGroup value={shippingMethod} onChange={handleShippingMethodChange}>
//        {shippingMethods.map((method) => (
//         <FormControlLabel
//          key={method.id}
//          value={method.id}
//          control={<Radio color="primary" />}
//          label={
//           <Box
//            sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             width: "100%",
//            }}
//           >
//            <Typography>{method.name}</Typography>
//            <Typography>৳{method.fee.toFixed(2)}</Typography>
//           </Box>
//          }
//          sx={{
//           border: "1px solid #eee",
//           borderRadius: 1,
//           p: 1,
//           mb: 1,
//           width: "100%",
//          }}
//         />
//        ))}
//       </RadioGroup>
//      </Paper>

//      <Paper elevation={0} sx={{ p: 3 }}>
//       <Typography variant="h6" gutterBottom>
//        Payment
//       </Typography>
//       <Typography variant="body2" color="textSecondary" gutterBottom>
//        All transactions are secure and encrypted.
//       </Typography>

//       <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
//        <Tabs
//         value={paymentTab}
//         onChange={handlePaymentTabChange}
//         aria-label="payment method tabs"
//         variant="fullWidth"
//         sx={{
//          "& .MuiTab-root": {
//           textTransform: "none",
//           backgroundColor: "#f5f5f5",
//           borderTop: "1px solid #e0e0e0",
//           borderLeft: "1px solid #e0e0e0",
//           borderRight: "1px solid #e0e0e0",
//           borderTopLeftRadius: 4,
//           borderTopRightRadius: 4,
//           "&.Mui-selected": {
//            backgroundColor: "#fff",
//           },
//          },
//         }}
//        >
//         <Tab label="CARDS" />
//         <Tab label="MOBILE BANKING" />
//         <Tab label="NET BANKING" />
//        </Tabs>
//       </Box>

//       {paymentTab === 0 && (
//        <Box>
//         <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
//          <img src="/api/placeholder/40/25" alt="Visa" />
//          <img src="/api/placeholder/40/25" alt="Mastercard" />
//          <img src="/api/placeholder/40/25" alt="Amex" />
//          <img src="/api/placeholder/40/25" alt="Diners" />
//         </Box>

//         <TextField
//          required
//          fullWidth
//          name="cardNumber"
//          label="Card Number"
//          value={formData.cardNumber}
//          onChange={handleChange}
//          margin="normal"
//         />

//         <Grid container spacing={2}>
//          <Grid item xs={12} sm={6}>
//           <TextField
//            required
//            fullWidth
//            name="cardExpiry"
//            label="MM/YY"
//            value={formData.cardExpiry}
//            onChange={handleChange}
//            margin="normal"
//           />
//          </Grid>
//          <Grid item xs={12} sm={6}>
//           <TextField
//            required
//            fullWidth
//            name="cardCVC"
//            label="CVC/CVV"
//            value={formData.cardCVC}
//            onChange={handleChange}
//            margin="normal"
//            InputProps={{
//             endAdornment: (
//              <InputAdornment position="end">
//               <img src="/api/placeholder/24/16" alt="CVC" />
//              </InputAdornment>
//             ),
//            }}
//           />
//          </Grid>
//         </Grid>

//         <TextField
//          required
//          fullWidth
//          name="cardHolder"
//          label="Card Holder Name"
//          value={formData.cardHolder}
//          onChange={handleChange}
//          margin="normal"
//         />

//         <FormControlLabel
//          control={
//           <Checkbox
//            name="saveCard"
//            color="primary"
//            checked={formData.saveCard}
//            onChange={handleChange}
//           />
//          }
//          label="Save card & remember me"
//         />

//         <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
//          After clicking the 'Pay now' button, you will be redirected to the
//          issuer to complete your purchase securely.
//         </Typography>
//        </Box>
//       )}

//       {paymentTab === 1 && (
//        <Box>
//         <Typography variant="body2" gutterBottom>
//          Please login to show your saved wallets
//         </Typography>

//         <Grid container spacing={2} sx={{ mt: 2 }}>
//          <Grid item xs={4}>
//           <Box sx={{ textAlign: "center" }}>
//            <img src="/api/placeholder/60/30" alt="bKash" />
//            <Typography variant="body2">bKash</Typography>
//           </Box>
//          </Grid>
//          <Grid item xs={4}>
//           <Box sx={{ textAlign: "center" }}>
//            <img src="/api/placeholder/60/30" alt="Nagad" />
//            <Typography variant="body2">Nagad</Typography>
//           </Box>
//          </Grid>
//          <Grid item xs={4}>
//           <Box sx={{ textAlign: "center" }}>
//            <img src="/api/placeholder/60/30" alt="Upay" />
//            <Typography variant="body2">Upay</Typography>
//           </Box>
//          </Grid>
//          <Grid item xs={4}>
//           <Box sx={{ textAlign: "center" }}>
//            <img src="/api/placeholder/60/30" alt="Rocket" />
//            <Typography variant="body2">Rocket</Typography>
//           </Box>
//          </Grid>
//          <Grid item xs={4}>
//           <Box sx={{ textAlign: "center" }}>
//            <img src="/api/placeholder/60/30" alt="Tap" />
//            <Typography variant="body2">Tap</Typography>
//           </Box>
//          </Grid>
//          <Grid item xs={4}>
//           <Box sx={{ textAlign: "center" }}>
//            <img src="/api/placeholder/60/30" alt="Pocket" />
//            <Typography variant="body2">Pocket</Typography>
//           </Box>
//          </Grid>
//         </Grid>
//        </Box>
//       )}
//       {/* Add Tab 2 for Net Banking if needed */}
//       {paymentTab === 2 && (
//        <Box>
//         <Typography variant="body2" gutterBottom>
//          Net Banking options would go here.
//         </Typography>
//        </Box>
//       )}

//       <Box sx={{ border: "1px solid #e0e0e0", p: 2, mt: 3, borderRadius: 1 }}>
//        <Typography variant="body2">
//         By checking this pay button you agree to our
//         <Typography component="span" color="primary" sx={{ cursor: "pointer" }}>
//          {" "}
//          Terms of Service
//         </Typography>
//         which is limited to facilitating your payment to Blucheez.
//        </Typography>
//       </Box>
//      </Paper>

//      <Paper elevation={0} sx={{ p: 3, mt: 3 }}>
//       <Typography variant="h6" gutterBottom>
//        Billing address
//       </Typography>
//       <RadioGroup
//        value={formData.sameAsBilling ? "same" : "different"}
//        onChange={(e) =>
//         setFormData({ ...formData, sameAsBilling: e.target.value === "same" })
//        }
//       >
//        <FormControlLabel
//         value="same"
//         control={<Radio color="primary" />}
//         label="Same as shipping address"
//        />
//        <FormControlLabel
//         value="different"
//         control={<Radio color="primary" />}
//         label="Use a different billing address"
//        />
//       </RadioGroup>

//       {!formData.sameAsBilling && (
//        <Box sx={{ mt: 2 }}>
//         {/* Additional billing address fields would go here */}
//         <TextField fullWidth label="Billing Address" margin="normal" />
//        </Box>
//       )}
//      </Paper>

//      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
//       <Button variant="outlined" onClick={handleBack} sx={{ mr: 1 }}>
//        Return to cart
//       </Button>
//       <Button
//        variant="contained"
//        color="primary"
//        type="submit" // Keep type="submit" for form submission
//        sx={{
//         bgcolor: "#212121",
//         "&:hover": { bgcolor: "#000000" },
//         px: 4,
//        }}
//       >
//        Pay now
//       </Button>
//      </Box>
//     </Grid>

//     <Grid item xs={12} md={4}>
//      <Paper elevation={0} sx={{ p: 3, bgcolor: "#f9f9f9" }}>
//       <Typography variant="h6" gutterBottom>
//        Order Summary
//       </Typography>
//       <Box sx={{ display: "flex", alignItems: "center", mt: 2, mb: 3 }}>
//        <Box sx={{ position: "relative", mr: 2 }}>
//         <img src={cartItem.image} alt={cartItem.name} style={{ width: 60 }} />
//         <Box
//          sx={{
//           position: "absolute",
//           top: -8,
//           right: -8,
//           width: 20,
//           height: 20,
//           borderRadius: "50%",
//           bgcolor: "#f44336",
//           color: "#fff",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           fontSize: "0.75rem",
//          }}
//         >
//          {cartItem.quantity}
//         </Box>
//        </Box>
//        <Box>
//         <Typography variant="body1">{cartItem.name}</Typography>
//         <Typography variant="body2" color="textSecondary">
//          {cartItem.color}
//         </Typography>
//        </Box>
//        <Typography variant="body1" sx={{ ml: "auto" }}>
//         ৳{cartItem.price.toFixed(2)}
//        </Typography>
//       </Box>

//       <Divider sx={{ my: 2 }} />

//       <Box sx={{ my: 2 }}>
//        <TextField
//         fullWidth
//         placeholder="Discount code or gift card"
//         variant="outlined"
//         size="small"
//         InputProps={{
//          endAdornment: (
//           <InputAdornment position="end">
//            <Button variant="text" size="small">
//             Apply
//            </Button>
//           </InputAdornment>
//          ),
//         }}
//        />
//       </Box>

//       <Divider sx={{ my: 2 }} />

//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//        <Typography variant="body1">Subtotal</Typography>
//        <Typography variant="body1">৳{subtotal.toFixed(2)}</Typography>
//       </Box>

//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//        <Typography variant="body1">Shipping</Typography>
//        <Typography variant="body1">৳{shipping.toFixed(2)}</Typography>
//       </Box>

//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//        <Typography variant="body1">Estimated taxes</Typography>
//        <Typography variant="body1">৳{tax.toFixed(2)}</Typography>
//       </Box>

//       <Divider sx={{ my: 2 }} />

//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//        <Typography variant="h6">Total</Typography>
//        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//         BDT ৳{total.toFixed(2)}
//        </Typography>
//       </Box>
//      </Paper>
//     </Grid>
//    </Grid>
//   </Box>
//  );

//  const getStepContent = (step) => {
//   switch (step) {
//    case 0:
//     return <CartView />;
//    case 1:
//     return <CheckoutForm />;
//    case 2:
//     return (
//      <ConfirmationView
//       formData={formData}
//       onBackToHome={() => navigate("/")} // Or navigate to home page
//       subtotal={subtotal}
//       shipping={shipping}
//       tax={tax}
//       total={total}
//      />
//     );
//    default:
//     return "Unknown step";
//   }
//  };

//  return (
//   <ThemeProvider theme={theme}>
//    <Container maxWidth="lg" sx={{ my: 4 }}>
//     <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
//      {steps.map((label) => (
//       <Step key={label}>
//        <StepLabel>{label}</StepLabel>
//       </Step>
//      ))}
//     </Stepper>

//     {getStepContent(activeStep)}

//     {/* Integrate the PaymentModal component here, at the top level of PaymentGatewayRough */}
//     <PaymentModal
//      openModal={isPaymentModalOpen}
//      setOpenModal={setIsPaymentModalOpen}
//     />
//    </Container>
//   </ThemeProvider>
//  );
// };

// export default PaymentGatewayRough;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//  Box,
//  Button,
//  Checkbox,
//  Container,
//  Divider,
//  FormControl,
//  FormControlLabel,
//  Grid,
//  IconButton,
//  InputAdornment,
//  InputLabel,
//  MenuItem,
//  Paper,
//  Radio,
//  RadioGroup,
//  Select,
//  Step,
//  StepLabel,
//  Stepper,
//  Tab,
//  Tabs,
//  TextField,
//  Typography,
//  Dialog, // Import Dialog
//  DialogTitle, // Import DialogTitle
//  DialogContent, // Import DialogContent
//  DialogActions, // Import DialogActions
// } from "@mui/material";
// import {
//  Add,
//  ArrowBack,
//  Close,
//  Delete,
//  LocationOn,
//  Remove,
// } from "@mui/icons-material";

// // Mock data for product in cart
// const cartItem = {
//  id: 1,
//  name: "3D Embroidered Cotton Kameez",
//  color: "Navy",
//  size: "S",
//  price: 2595.0,
//  quantity: 1,
//  image: "/api/placeholder/100/120",
// };

// // Payment methods available
// const paymentMethods = [
//  {
//   id: "credit-card",
//   name: "Credit/Debit Card",
//   logos: ["visa", "mastercard", "amex", "diners"],
//  },
//  { id: "cod", name: "Cash on Delivery (COD)", fee: "Tk. 47.50" },
//  { id: "bkash", name: "bKash", logo: "bkash" },
//  { id: "nagad", name: "Nagad", logo: "nagad" },
//  { id: "upay", name: "Upay", logo: "upay" },
//  { id: "rocket", name: "Rocket", logo: "rocket" },
// ];

// // Shipping methods
// const shippingMethods = [
//  { id: "inside-dhaka", name: "Inside Dhaka", fee: 60.0 },
//  { id: "outside-dhaka", name: "Outside Dhaka", fee: 120.0 },
// ];

// // Order confirmation component - Moved to top level
// const ConfirmationView = ({
//  formData,
//  onBackToHome,
//  subtotal,
//  shipping,
//  tax,
//  total,
// }) => (
//  <Box>
//   <Paper elevation={0} sx={{ p: 3, mb: 4, textAlign: "center" }}>
//    <Box
//     sx={{
//      display: "flex",
//      alignItems: "center",
//      justifyContent: "center",
//      mb: 2,
//     }}
//    >
//     <Box
//      sx={{
//       width: 40,
//       height: 40,
//       borderRadius: "50%",
//       bgcolor: "#4caf50",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       color: "#fff",
//       mr: 2,
//      }}
//     >
//      ✓
//     </Box>
//     <Box sx={{ textAlign: "left" }}>
//      <Typography variant="body2" color="textSecondary">
//       Confirmation #{Math.random().toString(36).substring(2, 10).toUpperCase()}
//      </Typography>
//      <Typography variant="h6">
//       Thank you, {formData.firstName || "Muhammad Rifat"}!
//      </Typography>
//     </Box>
//    </Box>

//    <Box
//     sx={{ my: 3, p: 2, position: "relative", height: 240, bgcolor: "#f5f5f5" }}
//    >
//     <Typography
//      variant="body1"
//      sx={{
//       position: "absolute",
//       top: 10,
//       left: 10,
//       bgcolor: "white",
//       p: 1,
//       borderRadius: 1,
//      }}
//     >
//      Shipping address
//     </Typography>
//     <Typography
//      variant="body1"
//      sx={{
//       position: "absolute",
//       bottom: 20,
//       left: 0,
//       right: 0,
//       textAlign: "center",
//      }}
//     >
//      Dhaka
//     </Typography>
//     <Typography
//      variant="body1"
//      sx={{
//       position: "absolute",
//       top: "50%",
//       left: "50%",
//       transform: "translate(-50%, -50%)",
//      }}
//     >
//      <LocationOn sx={{ fontSize: 40, color: "#f44336" }} />
//     </Typography>
//    </Box>

//    <Box sx={{ textAlign: "left" }}>
//     <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
//      Your order is confirmed
//     </Typography>
//     <Typography variant="body2" color="textSecondary">
//      You'll receive a confirmation email with your order number shortly.
//     </Typography>
//    </Box>
//   </Paper>

//   <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
//    <Typography variant="h6" gutterBottom>
//     Order details
//    </Typography>
//    <Grid container spacing={3}>
//     <Grid item xs={12} sm={6}>
//      <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
//       Contact information
//      </Typography>
//      <Typography variant="body2">
//       {formData.email || "kashimmirza86@gmail.com"}
//      </Typography>
//     </Grid>
//     <Grid item xs={12} sm={6}>
//      <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
//       Payment method
//      </Typography>
//      <Box sx={{ display: "flex", alignItems: "center" }}>
//       <Typography variant="body2" sx={{ mr: 1 }}>
//        •
//       </Typography>
//       {/* Display actual selected payment method dynamically */}
//       <Typography variant="body2">
//        Cash on Delivery (COD) - ৳
//        {shippingMethods.find((m) => m.id === "cod")?.fee || 47.5}{" "}
//        {/* Use actual fee for COD if applicable */}
//       </Typography>
//      </Box>
//     </Grid>
//     <Grid item xs={12} sm={6}>
//      <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
//       Shipping address
//      </Typography>
//      <Typography variant="body2">
//       {formData.firstName || "Muhammad"} {formData.lastName || "Rifat Hasan"}
//      </Typography>
//      <Typography variant="body2">
//       {formData.address || "house #: 512, 2 no road, New dohs"}
//      </Typography>
//      <Typography variant="body2">{formData.city || "mohakhali"}</Typography>
//      <Typography variant="body2">{formData.zipCode || "dhaka 1206"}</Typography>
//      <Typography variant="body2">Bangladesh</Typography>
//      <Typography variant="body2">
//       +880{formData.phone || "1670361038"}
//      </Typography>
//     </Grid>
//     <Grid item xs={12} sm={6}>
//      <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
//       Order summary
//      </Typography>
//      <Typography variant="body2">
//       {cartItem.name} (x{cartItem.quantity})
//      </Typography>
//      {/* Add more items if cart allows multiple */}
//      <Box sx={{ mt: 2 }}>
//       <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//        Subtotal: ৳{subtotal.toFixed(2)}
//       </Typography>
//       <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//        Delivery Fee: ৳{shipping.toFixed(2)}
//       </Typography>
//       <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//        Estimated taxes: ৳{tax.toFixed(2)}
//       </Typography>
//       <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//        Total: ৳{total.toFixed(2)}
//       </Typography>
//      </Box>
//     </Grid>
//    </Grid>
//   </Paper>

//   <Box sx={{ textAlign: "center", mt: 4 }}>
//    <Button variant="contained" color="primary" onClick={onBackToHome}>
//     Back to Home
//    </Button>
//   </Box>
//  </Box>
// );

// const paymentgatewayrough = () => {
//  // State for tracking checkout step
//  const [activeStep, setActiveStep] = useState(0);
//  const [paymentTab, setPaymentTab] = useState(0);
//  const [shippingMethod, setShippingMethod] = useState("inside-dhaka");
//  const [paymentMethod, setPaymentMethod] = useState("credit-card");
//  const [formData, setFormData] = useState({
//   email: "",
//   phone: "",
//   firstName: "",
//   lastName: "",
//   address: "",
//   city: "Dhaka",
//   zipCode: "1206",
//   cardNumber: "",
//   cardExpiry: "",
//   cardCVC: "",
//   cardHolder: "",
//   saveCard: false,
//   sameAsBilling: true,
//  });
//  // State for the modal
//  const [openModal, setOpenModal] = useState(false);
//  const navigate = useNavigate();

//  const steps = ["Cart", "Shipping & Payment", "Confirmation"];

//  // Calculate totals
//  const subtotal = cartItem.price * cartItem.quantity;
//  const shipping =
//   shippingMethods.find((m) => m.id === shippingMethod)?.fee || 0;
//  const tax = subtotal * 0.05;
//  const total = subtotal + shipping + tax;

//  const handleChange = (e) => {
//   const { name, value, type, checked } = e.target;
//   setFormData({
//    ...formData,
//    [name]: type === "checkbox" ? checked : value,
//   });
//  };

//  const handleShippingMethodChange = (e) => {
//   setShippingMethod(e.target.value);
//  };

//  const handlePaymentMethodChange = (e) => {
//   setPaymentMethod(e.target.value);
//  };

//  const handlePaymentTabChange = (event, newValue) => {
//   setPaymentTab(newValue);
//  };

//  const handleNext = () => {
//   setActiveStep((prevStep) => prevStep + 1);
//  };

//  const handleBack = () => {
//   setActiveStep((prevStep) => prevStep - 1);
//  };

//  const handleSubmit = (e) => {
//   e.preventDefault();
//   // Instead of directly moving to the next step, open the modal
//   setOpenModal(true);
//  };

//  const handleConfirmPayment = () => {
//   // Here you would typically process the payment
//   // For this example, we'll close the modal and move to the confirmation step
//   setOpenModal(false);
//   handleNext();
//  };

//  const handleCloseModal = () => {
//   setOpenModal(false);
//  };

//  // Cart component
//  const CartView = () => (
//   <Paper elevation={0} sx={{ p: 2, mb: 4 }}>
//    <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
//     Shopping cart
//    </Typography>
//    <Grid container spacing={2} sx={{ mt: 2 }}>
//     <Grid item xs={12}>
//      <Box sx={{ display: "flex", borderBottom: "1px solid #eee", pb: 1 }}>
//       <Box sx={{ width: "50%" }}>
//        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//         PRODUCT
//        </Typography>
//       </Box>
//       <Box sx={{ width: "20%", textAlign: "center" }}>
//        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//         PRICE
//        </Typography>
//       </Box>
//       <Box sx={{ width: "15%", textAlign: "center" }}>
//        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//         QUANTITY
//        </Typography>
//       </Box>
//       <Box sx={{ width: "15%", textAlign: "right" }}>
//        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//         TOTAL
//        </Typography>
//       </Box>
//      </Box>
//     </Grid>

//     <Grid item xs={12}>
//      <Box sx={{ display: "flex", alignItems: "center", py: 2 }}>
//       <Box sx={{ width: "50%", display: "flex", alignItems: "center" }}>
//        <img
//         src={cartItem.image}
//         alt={cartItem.name}
//         style={{ width: 80, marginRight: 16 }}
//        />
//        <Box>
//         <Typography variant="body1">{cartItem.name}</Typography>
//         <Typography variant="body2" color="textSecondary">
//          Color: {cartItem.color}
//         </Typography>
//         <Typography variant="body2" color="textSecondary">
//          Size: {cartItem.size}
//         </Typography>
//         <Box sx={{ display: "flex", mt: 1 }}>
//          <IconButton size="small">
//           <Delete fontSize="small" />
//          </IconButton>
//         </Box>
//        </Box>
//       </Box>
//       <Box sx={{ width: "20%", textAlign: "center" }}>
//        <Typography>Tk {cartItem.price.toFixed(2)}</Typography>
//       </Box>
//       <Box sx={{ width: "15%", textAlign: "center" }}>
//        <Box
//         sx={{
//          display: "flex",
//          alignItems: "center",
//          justifyContent: "center",
//         }}
//        >
//         <IconButton size="small">
//          <Remove fontSize="small" />
//         </IconButton>
//         <TextField
//          size="small"
//          value={cartItem.quantity}
//          inputProps={{ min: 1, style: { textAlign: "center" } }}
//          sx={{ width: 60, mx: 1 }}
//          // In a real app, you'd have a handler to update cartItem.quantity
//         />
//         <IconButton size="small">
//          <Add fontSize="small" />
//         </IconButton>
//        </Box>
//       </Box>
//       <Box sx={{ width: "15%", textAlign: "right" }}>
//        <Typography>
//         Tk {(cartItem.price * cartItem.quantity).toFixed(2)}
//        </Typography>
//       </Box>
//      </Box>
//     </Grid>

//     <Grid item xs={12}>
//      <Box sx={{ mt: 2 }}>
//       <Typography variant="body1">Add Order Note</Typography>
//       <TextField
//        fullWidth
//        multiline
//        rows={4}
//        placeholder="How can we help you?"
//        variant="outlined"
//        sx={{ mt: 1 }}
//       />
//      </Box>
//     </Grid>

//     <Grid item xs={12} sm={6}>
//      <Box sx={{ mt: 2 }}>
//       <Typography variant="body1">Coupon:</Typography>
//       <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
//        Coupon code will work on checkout page
//       </Typography>
//       <TextField fullWidth placeholder="Coupon code" variant="outlined" />
//      </Box>
//     </Grid>

//     <Grid item xs={12} sm={6}>
//      <Box sx={{ mt: 5, textAlign: "right" }}>
//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//        <Typography variant="body1">SUBTOTAL:</Typography>
//        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
//         Tk {subtotal.toFixed(2)}
//        </Typography>
//       </Box>
//       <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
//        Taxes and shipping calculated at checkout
//       </Typography>
//       <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
//        All charges are billed in BDT. While the content of your cart is
//        currently displayed in, the checkout will use BDT at the most current
//        exchange rate.
//       </Typography>
//       <Button
//        variant="contained"
//        color="error"
//        size="large"
//        onClick={handleNext}
//        sx={{ px: 4 }}
//       >
//        Check Out
//       </Button>
//      </Box>
//     </Grid>

//     <Grid item xs={12}>
//      <Box sx={{ mt: 3 }}>
//       <Typography variant="h6" gutterBottom>
//        Estimate shipping
//       </Typography>
//       <Grid container spacing={2}>
//        <Grid item xs={12} sm={6}>
//         <FormControl fullWidth>
//          <InputLabel id="country-label">Country</InputLabel>
//          <Select labelId="country-label" value="Bangladesh" label="Country">
//           <MenuItem value="Bangladesh">Bangladesh</MenuItem>
//          </Select>
//         </FormControl>
//        </Grid>
//        <Grid item xs={12} sm={6}>
//         <TextField fullWidth label="Zip code" variant="outlined" />
//        </Grid>
//        <Grid item xs={12}>
//         <Button variant="contained" color="error" fullWidth>
//          ESTIMATE
//         </Button>
//        </Grid>
//       </Grid>

//       <Box sx={{ mt: 3 }}>
//        <Typography variant="body1">
//         We found 2 shipping rates available for Bangladesh, starting at Tk 0.00
//         BDT.
//        </Typography>
//        <ul>
//         <li>
//          Inside Dhaka at Tk{" "}
//          {shippingMethods.find((m) => m.id === "inside-dhaka")?.fee.toFixed(2)}{" "}
//          BDT
//         </li>
//         <li>
//          Outside Dhaka at Tk{" "}
//          {shippingMethods.find((m) => m.id === "outside-dhaka")?.fee.toFixed(2)}{" "}
//          BDT
//         </li>
//        </ul>
//       </Box>
//      </Box>
//     </Grid>
//    </Grid>
//   </Paper>
//  );

//  // Checkout form component
//  const CheckoutForm = () => (
//   <Box component="form" onSubmit={handleSubmit}>
//    <Grid container spacing={3}>
//     <Grid item xs={12} md={8}>
//      <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
//       <Typography variant="h6" gutterBottom>
//        Contact
//       </Typography>
//       <TextField
//        required
//        fullWidth
//        name="email"
//        label="Email"
//        variant="outlined"
//        value={formData.email}
//        onChange={handleChange}
//        margin="normal"
//       />
//       <FormControlLabel
//        control={<Checkbox name="emailUpdates" color="primary" />}
//        label="Email me with news and offers"
//       />
//      </Paper>

//      <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
//       <Typography variant="h6" gutterBottom>
//        Delivery
//       </Typography>
//       <FormControl fullWidth margin="normal">
//        <InputLabel id="country-select-label">Country/region</InputLabel>
//        <Select
//         labelId="country-select-label"
//         id="country-select"
//         value="Bangladesh"
//         label="Country/region"
//        >
//         <MenuItem value="Bangladesh">Bangladesh</MenuItem>
//        </Select>
//       </FormControl>
//       <Grid container spacing={2}>
//        <Grid item xs={12} sm={6}>
//         <TextField
//          required
//          fullWidth
//          name="firstName"
//          label="First name"
//          value={formData.firstName}
//          onChange={handleChange}
//          margin="normal"
//         />
//        </Grid>
//        <Grid item xs={12} sm={6}>
//         <TextField
//          required
//          fullWidth
//          name="lastName"
//          label="Last name"
//          value={formData.lastName}
//          onChange={handleChange}
//          margin="normal"
//         />
//        </Grid>
//       </Grid>
//       <TextField
//        required
//        fullWidth
//        name="address"
//        label="Address"
//        value={formData.address}
//        onChange={handleChange}
//        margin="normal"
//        placeholder="House #, Road #, Street, Landmark"
//       />
//       <TextField
//        required
//        fullWidth
//        name="city"
//        label="City"
//        value={formData.city}
//        onChange={handleChange}
//        margin="normal"
//       />
//       <TextField
//        required
//        fullWidth
//        name="phone"
//        label="Phone"
//        value={formData.phone}
//        onChange={handleChange}
//        margin="normal"
//        InputProps={{
//         startAdornment: <InputAdornment position="start">+880</InputAdornment>,
//        }}
//       />
//       <FormControlLabel
//        control={<Checkbox name="saveInfo" color="primary" />}
//        label="Save this information for next time"
//       />
//      </Paper>

//      <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
//       <Typography variant="h6" gutterBottom>
//        Shipping method
//       </Typography>
//       <RadioGroup value={shippingMethod} onChange={handleShippingMethodChange}>
//        {shippingMethods.map((method) => (
//         <FormControlLabel
//          key={method.id}
//          value={method.id}
//          control={<Radio color="primary" />}
//          label={
//           <Box
//            sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             width: "100%",
//            }}
//           >
//            <Typography>{method.name}</Typography>
//            <Typography>৳{method.fee.toFixed(2)}</Typography>
//           </Box>
//          }
//          sx={{
//           border: "1px solid #eee",
//           borderRadius: 1,
//           p: 1,
//           mb: 1,
//           width: "100%",
//          }}
//         />
//        ))}
//       </RadioGroup>
//      </Paper>

//      <Paper elevation={0} sx={{ p: 3 }}>
//       <Typography variant="h6" gutterBottom>
//        Payment
//       </Typography>
//       <Typography variant="body2" color="textSecondary" gutterBottom>
//        All transactions are secure and encrypted.
//       </Typography>

//       <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
//        <Tabs
//         value={paymentTab}
//         onChange={handlePaymentTabChange}
//         aria-label="payment method tabs"
//         variant="fullWidth"
//         sx={{
//          "& .MuiTab-root": {
//           textTransform: "none",
//           backgroundColor: "#f5f5f5",
//           borderTop: "1px solid #e0e0e0",
//           borderLeft: "1px solid #e0e0e0",
//           borderRight: "1px solid #e0e0e0",
//           borderTopLeftRadius: 4,
//           borderTopRightRadius: 4,
//           "&.Mui-selected": {
//            backgroundColor: "#fff",
//           },
//          },
//         }}
//        >
//         <Tab label="CARDS" />
//         <Tab label="MOBILE BANKING" />
//         <Tab label="NET BANKING" />
//        </Tabs>
//       </Box>

//       {paymentTab === 0 && (
//        <Box>
//         <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
//          <img src="/api/placeholder/40/25" alt="Visa" />
//          <img src="/api/placeholder/40/25" alt="Mastercard" />
//          <img src="/api/placeholder/40/25" alt="Amex" />
//          <img src="/api/placeholder/40/25" alt="Diners" />
//         </Box>

//         <TextField
//          required
//          fullWidth
//          name="cardNumber"
//          label="Card Number"
//          value={formData.cardNumber}
//          onChange={handleChange}
//          margin="normal"
//         />

//         <Grid container spacing={2}>
//          <Grid item xs={12} sm={6}>
//           <TextField
//            required
//            fullWidth
//            name="cardExpiry"
//            label="MM/YY"
//            value={formData.cardExpiry}
//            onChange={handleChange}
//            margin="normal"
//           />
//          </Grid>
//          <Grid item xs={12} sm={6}>
//           <TextField
//            required
//            fullWidth
//            name="cardCVC"
//            label="CVC/CVV"
//            value={formData.cardCVC}
//            onChange={handleChange}
//            margin="normal"
//            InputProps={{
//             endAdornment: (
//              <InputAdornment position="end">
//               <img src="/api/placeholder/24/16" alt="CVC" />
//              </InputAdornment>
//             ),
//            }}
//           />
//          </Grid>
//         </Grid>

//         <TextField
//          required
//          fullWidth
//          name="cardHolder"
//          label="Card Holder Name"
//          value={formData.cardHolder}
//          onChange={handleChange}
//          margin="normal"
//         />

//         <FormControlLabel
//          control={
//           <Checkbox
//            name="saveCard"
//            color="primary"
//            checked={formData.saveCard}
//            onChange={handleChange}
//           />
//          }
//          label="Save card & remember me"
//         />

//         <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
//          After clicking the 'Pay now' button, you will be redirected to the
//          issuer to complete your purchase securely.
//         </Typography>
//        </Box>
//       )}

//       {paymentTab === 1 && (
//        <Box>
//         <Typography variant="body2" gutterBottom>
//          Please login to show your saved wallets
//         </Typography>

//         <Grid container spacing={2} sx={{ mt: 2 }}>
//          <Grid item xs={4}>
//           <Box sx={{ textAlign: "center" }}>
//            <img src="/api/placeholder/60/30" alt="bKash" />
//            <Typography variant="body2">bKash</Typography>
//           </Box>
//          </Grid>
//          <Grid item xs={4}>
//           <Box sx={{ textAlign: "center" }}>
//            <img src="/api/placeholder/60/30" alt="Nagad" />
//            <Typography variant="body2">Nagad</Typography>
//           </Box>
//          </Grid>
//          <Grid item xs={4}>
//           <Box sx={{ textAlign: "center" }}>
//            <img src="/api/placeholder/60/30" alt="Upay" />
//            <Typography variant="body2">Upay</Typography>
//           </Box>
//          </Grid>
//          <Grid item xs={4}>
//           <Box sx={{ textAlign: "center" }}>
//            <img src="/api/placeholder/60/30" alt="Rocket" />
//            <Typography variant="body2">Rocket</Typography>
//           </Box>
//          </Grid>
//          <Grid item xs={4}>
//           <Box sx={{ textAlign: "center" }}>
//            <img src="/api/placeholder/60/30" alt="Tap" />
//            <Typography variant="body2">Tap</Typography>
//           </Box>
//          </Grid>
//          <Grid item xs={4}>
//           <Box sx={{ textAlign: "center" }}>
//            <img src="/api/placeholder/60/30" alt="Pocket" />
//            <Typography variant="body2">Pocket</Typography>
//           </Box>
//          </Grid>
//         </Grid>
//        </Box>
//       )}
//       {/* Add Tab 2 for Net Banking if needed */}
//       {paymentTab === 2 && (
//        <Box>
//         <Typography variant="body2" gutterBottom>
//          Net Banking options would go here.
//         </Typography>
//        </Box>
//       )}

//       <Box sx={{ border: "1px solid #e0e0e0", p: 2, mt: 3, borderRadius: 1 }}>
//        <Typography variant="body2">
//         By checking this pay button you agree to our
//         <Typography component="span" color="primary" sx={{ cursor: "pointer" }}>
//          {" "}
//          Terms of Service
//         </Typography>
//         which is limited to facilitating your payment to Blucheez.
//        </Typography>
//       </Box>
//      </Paper>

//      <Paper elevation={0} sx={{ p: 3, mt: 3 }}>
//       <Typography variant="h6" gutterBottom>
//        Billing address
//       </Typography>
//       <RadioGroup
//        value={formData.sameAsBilling ? "same" : "different"}
//        onChange={(e) =>
//         setFormData({ ...formData, sameAsBilling: e.target.value === "same" })
//        }
//       >
//        <FormControlLabel
//         value="same"
//         control={<Radio color="primary" />}
//         label="Same as shipping address"
//        />
//        <FormControlLabel
//         value="different"
//         control={<Radio color="primary" />}
//         label="Use a different billing address"
//        />
//       </RadioGroup>

//       {!formData.sameAsBilling && (
//        <Box sx={{ mt: 2 }}>
//         {/* Additional billing address fields would go here */}
//         <TextField fullWidth label="Billing Address" margin="normal" />
//        </Box>
//       )}
//      </Paper>

//      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
//       <Button variant="outlined" onClick={handleBack} sx={{ mr: 1 }}>
//        Return to cart
//       </Button>
//       <Button
//        variant="contained"
//        color="primary"
//        type="submit" // This button will now open the modal
//        sx={{
//         bgcolor: "#212121",
//         "&:hover": { bgcolor: "#000000" },
//         px: 4,
//        }}
//       >
//        Pay now
//       </Button>
//      </Box>
//     </Grid>

//     <Grid item xs={12} md={4}>
//      <Paper elevation={0} sx={{ p: 3, bgcolor: "#f9f9f9" }}>
//       <Typography variant="h6" gutterBottom>
//        Order Summary
//       </Typography>
//       <Box sx={{ display: "flex", alignItems: "center", mt: 2, mb: 3 }}>
//        <Box sx={{ position: "relative", mr: 2 }}>
//         <img src={cartItem.image} alt={cartItem.name} style={{ width: 60 }} />
//         <Box
//          sx={{
//           position: "absolute",
//           top: -8,
//           right: -8,
//           width: 20,
//           height: 20,
//           borderRadius: "50%",
//           bgcolor: "#f44336",
//           color: "#fff",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           fontSize: "0.75rem",
//          }}
//         >
//          {cartItem.quantity}
//         </Box>
//        </Box>
//        <Box>
//         <Typography variant="body1">{cartItem.name}</Typography>
//         <Typography variant="body2" color="textSecondary">
//          {cartItem.color}
//         </Typography>
//        </Box>
//        <Typography variant="body1" sx={{ ml: "auto" }}>
//         ৳{cartItem.price.toFixed(2)}
//        </Typography>
//       </Box>

//       <Divider sx={{ my: 2 }} />

//       <Box sx={{ my: 2 }}>
//        <TextField
//         fullWidth
//         placeholder="Discount code or gift card"
//         variant="outlined"
//         size="small"
//         InputProps={{
//          endAdornment: (
//           <InputAdornment position="end">
//            <Button variant="text" size="small">
//             Apply
//            </Button>
//           </InputAdornment>
//          ),
//         }}
//        />
//       </Box>

//       <Divider sx={{ my: 2 }} />

//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//        <Typography variant="body1">Subtotal</Typography>
//        <Typography variant="body1">৳{subtotal.toFixed(2)}</Typography>
//       </Box>

//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//        <Typography variant="body1">Shipping</Typography>
//        <Typography variant="body1">৳{shipping.toFixed(2)}</Typography>
//       </Box>

//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//        <Typography variant="body1">Estimated taxes</Typography>
//        <Typography variant="body1">৳{tax.toFixed(2)}</Typography>
//       </Box>

//       <Divider sx={{ my: 2 }} />

//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//        <Typography variant="h6">Total</Typography>
//        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//         BDT ৳{total.toFixed(2)}
//        </Typography>
//       </Box>
//      </Paper>
//     </Grid>
//    </Grid>
//   </Box>
//  );

//  const getStepContent = (step) => {
//   switch (step) {
//    case 0:
//     return <CartView />;
//    case 1:
//     return <CheckoutForm />;
//    case 2:
//     return (
//      <ConfirmationView
//       formData={formData}
//       onBackToHome={() => navigate("/")} // Or navigate to home page
//       subtotal={subtotal}
//       shipping={shipping}
//       tax={tax}
//       total={total}
//      />
//     );
//    default:
//     return "Unknown step";
//   }
//  };

//  return (
//   <Container maxWidth="lg" sx={{ my: 4 }}>
//    <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
//     {steps.map((label) => (
//      <Step key={label}>
//       <StepLabel>{label}</StepLabel>
//      </Step>
//     ))}
//    </Stepper>

//    {getStepContent(activeStep)}

//    {/* Payment Confirmation Modal */}
//    <Dialog open={openModal} onClose={handleCloseModal}>
//     <DialogTitle>Confirm Payment</DialogTitle>
//     <DialogContent>
//      <Typography gutterBottom>
//       You are about to make a payment of{" "}
//       <Typography component="span" sx={{ fontWeight: "bold" }}>
//        ৳{total.toFixed(2)}
//       </Typography>{" "}
//       for your order.
//      </Typography>
//      <Typography variant="body2" color="textSecondary">
//       Please review your order details before confirming.
//      </Typography>
//      <Box sx={{ mt: 2, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
//       <Typography variant="body2" sx={{ fontWeight: "bold" }}>
//        Order Summary:
//       </Typography>
//       <Typography variant="body2">Product: {cartItem.name}</Typography>
//       <Typography variant="body2">Quantity: {cartItem.quantity}</Typography>
//       <Typography variant="body2">Subtotal: ৳{subtotal.toFixed(2)}</Typography>
//       <Typography variant="body2">Shipping: ৳{shipping.toFixed(2)}</Typography>
//       <Typography variant="body2">Tax: ৳{tax.toFixed(2)}</Typography>
//       <Typography variant="body1" sx={{ mt: 1, fontWeight: "bold" }}>
//        Total: ৳{total.toFixed(2)}
//       </Typography>
//      </Box>
//     </DialogContent>
//     <DialogActions>
//      <Button onClick={handleCloseModal}>Cancel</Button>
//      <Button onClick={handleConfirmPayment} variant="contained" color="primary">
//       Confirm and Pay
//      </Button>
//     </DialogActions>
//    </Dialog>
//   </Container>
//  );
// };

// export default paymentgatewayrough;
