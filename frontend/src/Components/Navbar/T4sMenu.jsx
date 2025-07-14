/** @format */

//import T4sMenu from ".T4sMenu.css";
import React, { useState } from "react";
import {
 MDBDropdown,
 MDBDropdownMenu,
 MDBDropdownToggle,
 MDBDropdownItem,
 MDBContainer,
} from "mdb-react-ui-kit";

export default function Hover() {
 const [dropdownActive, setDropdownActive] = useState(false);

 return (
  <MDBContainer className="d-flex justify-content-center mt-5 basic">
   <MDBDropdown isOpen={dropdownActive}>
    <MDBDropdownToggle
     onMouseEnter={() => setDropdownActive(true)}
     onMouseLeave={() => setDropdownActive(false)}
    >
     Dropdown button
    </MDBDropdownToggle>
    <MDBDropdownMenu onMouseLeave={() => setDropdownActive(false)}>
     <MDBDropdownItem link href="#">
      Action
     </MDBDropdownItem>
     <MDBDropdownItem link href="#">
      Another action
     </MDBDropdownItem>

     <MDBDropdownItem>
      <span className="dropdown-item-text">Submenu &raquo;</span>
      <ul className="dropdown-menu dropdown-submenu show position-static ms-3 mt-1">
       <MDBDropdownItem link href="#">
        Submenu item 1
       </MDBDropdownItem>
       <MDBDropdownItem link href="#">
        Submenu item 2
       </MDBDropdownItem>

       <MDBDropdownItem>
        <span className="dropdown-item-text">Submenu item 3 &raquo;</span>
        <ul className="dropdown-menu dropdown-submenu show position-static ms-3 mt-1">
         <MDBDropdownItem link href="#">
          Multi level 1
         </MDBDropdownItem>
         <MDBDropdownItem link href="#">
          Multi level 2
         </MDBDropdownItem>
        </ul>
       </MDBDropdownItem>

       <MDBDropdownItem link href="#">
        Submenu item 4
       </MDBDropdownItem>
       <MDBDropdownItem link href="#">
        Submenu item 5
       </MDBDropdownItem>
      </ul>
     </MDBDropdownItem>
    </MDBDropdownMenu>
   </MDBDropdown>
  </MDBContainer>
 );
}
