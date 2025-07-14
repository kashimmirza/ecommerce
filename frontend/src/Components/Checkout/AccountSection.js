/** @format */

// import React, { useState } from "react";
// import "./AccontSection.css";

// const AccountSection = () => {
//  const [isExpanded, setIsExpanded] = useState(true);

//  const toggleCollapsible = () => setIsExpanded(!isExpanded);

//  return (
//   <section className="_1fragem1y">
//    <button
//     id="contact-collapsible"
//     className="collapsible-button"
//     aria-expanded={isExpanded}
//     onClick={toggleCollapsible}
//    >
//     <span>Account</span>
//     <svg
//      xmlns="http://www.w3.org/2000/svg"
//      viewBox="0 0 20 20"
//      fill="currentColor"
//      className="h-5 w-5"
//     >
//      <path
//       fillRule="evenodd"
//       d="M6.293 8.293a1 1 0 011.414 0L10 11.586l2.293-3.293a1 1 0 111.414 1.414l-3 4a1 1 0 01-1.414 0l-3-4a1 1 0 010-1.414z"
//       clipRule="evenodd"
//      />
//     </svg>
//    </button>
//    {isExpanded && (
//     <div id="contact-collapsible-control" className="collapsible-content">
//      <div className="_1fragemnk">
//       <p className="_1fragems9">kashimmirza86@gmail.com</p>
//       <a
//        href="https://blucheez.fashion/customer_identity/logout"
//        className="log-out-link"
//       >
//        Log out
//       </a>
//      </div>
//     </div>
//    )}
//   </section>
//  );
// };

// export default AccountSection;

import React from "react";

const AccountSection = ({ onChange }) => {
 const handleInputChange = (e) => {
  const { name, value } = e.target;
  onChange({ [name]: value });
 };

 return (
  <section className="account-section">
   <label htmlFor="email">Email</label>
   <input
    type="email"
    id="email"
    name="email"
    onChange={handleInputChange}
    required
   />
  </section>
 );
};

export default AccountSection;
