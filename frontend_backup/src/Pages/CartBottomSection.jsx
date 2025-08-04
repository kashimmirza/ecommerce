/** @format */

import React from "react";

const CartBottomSection = () => {
 return (
  <div className="t4s-drawer__bottom">
   <div data-cart-discounts=""></div>

   <div className="t4s-cart-total t4s-row t4s-gx-5 t4s-gy-0 t4s-align-items-center t4s-justify-content-between">
    <div className="t4s-col-auto">
     <strong>Subtotal:</strong>
    </div>
    <div data-cart-prices="" className="t4s-col-auto t4s-text-right">
     <div className="t4s-cart__totalPrice">
      <span className="money">Tk 750.00 BDT</span>
     </div>
    </div>
   </div>

   <p className="t4s-cart__tax">Taxes and shipping calculated at checkout</p>

   <a
    href="/cart"
    className="t4s-btn__cart t4s-btn t4s-btn-base t4s-btn-style-outline t4s-btn-color-dark t4s-btn-effect-fade t4s-w-100 t4s-justify-content-center t4s-truncate"
   >
    View cart
   </a>

   <p className="t4s-db">
    All charges are billed in BDT. While the content of your cart is
    <br />
    currently displayed in <span className="selected-currency"></span>, the
    checkout will use BDT at the most
    <br />
    current exchange rate.
   </p>

   <button
    type="submit"
    name="checkout"
    className="t4s-btn__checkout t4s-btn t4s-btn-base t4s-btn-style-default t4s-btn-color-primary t4s-btn-effect-default t4s-w-100 t4s-justify-content-center t4s-truncate"
   >
    Check Out
   </button>

   <div className="t4s-cat__imgtrust t4s_ratioadapt">
    <div
     className="t4s_ratio t4s-pr t4s-oh"
     style={{ "--aspect-ratioapt": "10.309" }}
    >
     <img
      className="t4s-w-100"
      srcSet="
              //blucheez.fashion/cdn/shop/files/combine_payments.png?v=1725910409&width=100 100w,
              //blucheez.fashion/cdn/shop/files/combine_payments.png?v=1725910409&width=200 200w,
              //blucheez.fashion/cdn/shop/files/combine_payments.png?v=1725910409&width=400 400w,
              //blucheez.fashion/cdn/shop/files/combine_payments.png?v=1725910409&width=600 600w
            "
      sizes="300px"
      alt="Payment methods"
     />
    </div>
   </div>

   {/* Order Note Section */}
   <div className="t4s-mini_cart-tool__content is--note t4s-pe-none">
    <label htmlFor="CartSpecialInstructions" className="t4s-d-block">
     <span className="t4s-txt_add_note">Add Order Note</span>
     <span className="t4s-txt_edit_note t4s-d-none">Edit Order Note</span>
    </label>
    <textarea id="CartSpecialInstructions" placeholder="How can we help you?" />
    <p>
     <button type="button" className="t4s-mini_cart-tool__primary">
      Save
     </button>
    </p>
    <p>
     <button type="button" className="t4s-mini_cart-tool__back">
      Cancel
     </button>
    </p>
   </div>

   {/* Estimate Shipping Section */}
   <div className="t4s-mini_cart-tool__content is--rates t4s-pe-none">
    <div className="t4s-mini_cart-tool__wrap">
     <span className="t4s-mini_cart-tool__text">Estimate shipping</span>
     <div className="t4s-field">
      <label htmlFor="ShippingCountry_mini_cart">Country</label>
      <select id="ShippingCountry_mini_cart" name="country">
       <option value="Bangladesh">Bangladesh</option>
      </select>
     </div>

     <div
      className="t4s-field"
      id="ShippingProvinceContainer_mini_cart"
      style={{ display: "none" }}
     >
      <label htmlFor="ShippingProvince_mini_cart">Province</label>
      <select id="ShippingProvince_mini_cart" name="province"></select>
     </div>

     <div className="t4s-field">
      <label htmlFor="ShippingZip_mini_cart">Zip code</label>
      <input type="text" id="ShippingZip_mini_cart" name="zip" />
     </div>

     <div className="t4s-field">
      <button
       type="button"
       className="t4s-get__rates t4s-mini_cart-tool__primary t4s-btn-loading__svg"
      >
       <span className="t4s-btn-atc_text">Estimate</span>
       <div className="t4s-loading__spinner t4s-dn">
        <svg
         width="16"
         height="16"
         viewBox="0 0 66 66"
         xmlns="http://www.w3.org/2000/svg"
        >
         <circle
          className="t4s-path"
          fill="none"
          strokeWidth="6"
          cx="33"
          cy="33"
          r="30"
         ></circle>
        </svg>
       </div>
      </button>
     </div>

     <div className="t4s-field">
      <button type="button" className="t4s-mini_cart-tool__back">
       Cancel
      </button>
     </div>

     <div data-response-rates="" className="t4s-response__rates"></div>
    </div>
   </div>

   {/* Discount / Coupon Section */}
   <div className="t4s-mini_cart-tool__content is--discount t4s-pe-none">
    <div className="t4s-mini_cart-tool__wrap">
     <span className="t4s-mini_cart-tool__text">Add A Coupon</span>
     <p>Coupon code will work on checkout page</p>
     <div className="t4s-field">
      <input type="text" id="CartDiscountcode" placeholder="Coupon code" />
     </div>
     <div className="t4s-field">
      <button type="button" className="t4s-mini_cart-tool__primary">
       Save
      </button>
     </div>
     <div className="t4s-field">
      <button type="button" className="t4s-mini_cart-tool__back">
       Cancel
      </button>
     </div>
    </div>
   </div>
  </div>
 );
};

export default CartBottomSection;
