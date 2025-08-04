/** @format */

const CustomButton = ({ label, href }) => {
 const styleVars = {
  "--animation": "fadeInUp",
  "--delay-animation": "0.1s",
  "--button-icon-w": "0px",
  "--button-icon-w-mb": "0px",
  "--pri-cl": "#FFFFFF55",
  "--second-cl": "#ffffff",
  "--pri-cl-hover": "#ce3241",
  "--second-cl-hover": "#ffffff",
  "--button-fs": "24px",
  "--button-fw": "300",
  "--button-pd-lr": "35px",
  "--button-bdr": "2px",
  "--button-ls": "0px",
  "--button-mh": "50px",
  "--button-mgb": "0px",
  "--button-mgb-mb": "0px",
  "--button-fs-mb": "16px",
  "--button-mh-mb": "32px",
  "--button-pd-lr-mb": "15px",
  "--button-ls-mb": "0px",
 };

 return (
  <a
   href={href}
   target="_self"
   className="t4s-bl-item t4s-animation-fadeInUp t4s-btn t4s-btn-custom t4s-pe-auto t4s-fnt-fm-inherit t4s-hidden-mobile-false t4s-btn-style-default t4s-btn-effect-fade"
   style={styleVars}
  >
   {label}
  </a>
 );
};

export default CustomButton;
