/** @format */

// import React from "react";

// const MarketingOptIn = () => {
//  return (
//   <section className="marketing-opt-in">
//    <div className="opt-in-container">
//     <input
//      type="checkbox"
//      id="marketing_opt_in"
//      name="marketing_opt_in"
//      className="checkbox-input"
//      aria-label="Opt-in for marketing emails"
//     />
//     <label htmlFor="marketing_opt_in" className="checkbox-label">
//      <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 20 20"
//       fill="currentColor"
//       className="checkmark-icon"
//      >
//       <path
//        fillRule="evenodd"
//        d="M8.293 11.293a1 1 0 011.414 0L12 8.586l2.293 2.707a1 1 0 111.414-1.414l-3-3a1 1 0 00-1.414 0L8.293 9.293a1 1 0 010 1.414z"
//        clipRule="evenodd"
//       />
//      </svg>
//      Email me with news and offers
//     </label>
//    </div>
//   </section>
//  );
// };

// export default MarketingOptIn;

// import React from "react";
// import "./MarketingOptIn.css";

// const MarketingOptIn = ({ onChange }) => {
//  const handleInputChange = (e) => {
//   const { name, checked } = e.target;
//   onChange({ [name]: checked });
//  };

//  return (
//   <section className="marketing-opt-in">
//    <div className="opt-in-container">
//     <input
//      type="checkbox"
//      id="marketing_opt_in"
//      name="marketingOptIn"
//      onChange={handleInputChange}
//     />
//     <label htmlFor="marketing_opt_in">Email me with news and offers</label>
//    </div>
//   </section>
//  );
// };

// export default MarketingOptIn;
import React from "react";
import "./MarketingOptIn.css";

const MarketingOptIn = ({ onChange }) => {
 const handleInputChange = (e) => {
    console.log(e);
  const { name, checked } = e.target;
  onChange({ marketingOptIn: checked });
 };

 return (
  <section className="marketing-opt-in">
   <div className="opt-in-container">
    <input
     type="checkbox"
     id="marketing_opt_in"
     name="marketingOptIn"
     onChange={handleInputChange}
    />
    <label htmlFor="marketing_opt_in">Email me with news and offers</label>
   </div>
  </section>
 );
};

export default MarketingOptIn;
