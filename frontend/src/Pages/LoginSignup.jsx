/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
 TextField,
 Button,
 Checkbox,
 FormControlLabel,
 Typography,
 IconButton,
} from "@mui/material";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon
import "./CSS/LoginSignup.css";
import logo from "../Components/Assets/anikafashion_logo.jpg";

const LoginSignup = ({ setRole, onClose }) => {
 const navigate = useNavigate();
 const [isLogin, setIsLogin] = useState(true);
 const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  role: "",
 });
 const [message, setMessage] = useState("");

 useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
   navigate("/");
   if (onClose) {
    onClose(); // Close the drawer if already logged in
   }
  }
 }, [navigate, onClose]);

 const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
 };

 console.log("here i am ");
 const handleSignup = async () => {
  console.log("inside the handlesignup");
  try {
   await axios.post(
    // "https://76vgxe9gag.execute-api.us-east-1.amazonaws.com/api/User/signup",
    "https://localhost:7142/api/User/signup",
    {
     ...formData,
     role: formData.role || "User",
     date: new Date().toISOString(),
    },
   );
   console.log("formdata:", formData);
   setMessage("Signup successful, please log in.");
   setIsLogin(true);
  } catch (error) {
   setMessage("Signup failed. Please try again.");
  }
 };

 const handleLogin = async () => {
  try {
   const response = await axios.post(
    // "https://76vgxe9gag.execute-api.us-east-1.amazonaws.com/api/User/login",
    "https://localhost:7142/api/User/login",
    {
     email: formData.email,
     password: formData.password,
    },
   );
   const { role, Token, id } = response.data;
   localStorage.setItem("token", Token);
   localStorage.setItem("role", role);
   localStorage.setItem("userId", id);
   console.log("response data", response.data);
   setRole(role);
   if (onClose) {
    onClose(); // Close the drawer after successful login
   }
   navigate(role === "Admin" ? "/admin" : "/");
  } catch (error) {
   setMessage("Login failed. Please check your credentials.");
  }
 };

 const handleGoogleLoginSuccess = async (response) => {
  if (!response.credential) {
   console.error("No credential received from Google Auth.");
   setMessage("Google login failed. Please try again.");
   return;
  }
  try {
   const res = await axios.post(
    //"https://76vgxe9gag.execute-api.us-east-1.amazonaws.com/api/authentication/GoogleSignIn",
    "https://localhost:7142/api/authentication/GoogleSignIn",
    { IdToken: response.credential },
    {
     headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${response.credential}`,
     },
    },
   );

   const { role, token, id } = res.data.data;

   if (!id) {
    console.error("Incomplete authentication response:", res.data);
    setMessage("Authentication failed. Please try again.");
    return;
   }

   localStorage.setItem("token", token);
   localStorage.setItem("role", role);
   localStorage.setItem("userId", id);
   setRole(role);
   if (onClose) {
    onClose(); // Close the drawer after successful Google login
   }
   navigate(role === "Admin" ? "/admin" : "/");
  } catch (error) {
   console.error("Google login failed:", error);
   setMessage("Google login failed. Please try again.");
  }
 };

 const handleSubmit = (e) => {
  e.preventDefault();
  isLogin ? handleLogin() : handleSignup();
 };

 return (
  <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
   <div className="loginsignup-form">
    {" "}
    {/* Apply a specific class for styling within the drawer */}
    {/* Logo Section */}
    <div
     className="branding-logo"
     style={{ textAlign: "center", marginBottom: "20px" }}
    >
     <a
      aria-label="Anika Fashion House Logo"
      href="/"
      style={{ display: "block", textAlign: "center" }}
     >
      <img
       src={logo}
       alt="Anika Fashion House Logo"
       className="spinning-logo"
      />
     </a>
    </div>
    <Typography variant="h6" align="center" gutterBottom>
     {isLogin ? "Login" : "Sign Up"}
    </Typography>
    <form onSubmit={handleSubmit}>
     {!isLogin && (
      <TextField
       label="Your Name"
       variant="outlined"
       fullWidth
       margin="normal"
       name="name"
       value={formData.name}
       onChange={handleChange}
      />
     )}
     <TextField
      label="Email"
      variant="outlined"
      fullWidth
      margin="normal"
      name="email"
      value={formData.email}
      onChange={handleChange}
      required
      InputLabelProps={{
       endAdornment: <span style={{ color: "red" }}>*</span>,
      }}
     />
     <TextField
      label="Password"
      variant="outlined"
      fullWidth
      margin="normal"
      name="password"
      type="password"
      value={formData.password}
      onChange={handleChange}
      required
      InputLabelProps={{
       endAdornment: <span style={{ color: "red" }}>*</span>,
      }}
     />
     {!isLogin && (
      <FormControlLabel
       control={
        <Checkbox
         onChange={(e) =>
          setFormData({
           ...formData,
           role: e.target.checked ? "Admin" : "User",
          })
         }
        />
       }
       label="Sign up as Admin"
      />
     )}
     <Button
      type="submit"
      variant="contained"
      color="primary"
      fullWidth
      style={{ margin: "20px 0" }}
     >
      {isLogin ? "Login" : "Sign Up"}
     </Button>
    </form>
    {/* Social Media Login Buttons */}
    <div className="social-login">
     <GoogleLogin
      onSuccess={handleGoogleLoginSuccess}
      onError={() => console.log("Login Failed")}
     />
    </div>
    {message && (
     <Typography color="error" align="center" className="message">
      {message}
     </Typography>
    )}
    <Typography variant="body2" align="center" className="loginsignup-login">
     {isLogin ? "Need an account?" : "Already have an account?"}{" "}
     <span
      onClick={() => setIsLogin(!isLogin)}
      style={{ cursor: "pointer", color: "#007BFF" }}
     >
      {isLogin ? "Sign up" : "Login"}
     </span>
    </Typography>
   </div>
  </GoogleOAuthProvider>
 );
};

export default LoginSignup;
