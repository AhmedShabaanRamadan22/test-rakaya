import React from "react";
import dynamic from "next/dynamic";
import TOTop from "../TOTop";
const NavBar = dynamic(() => import("./Navbar"), {
  ssr: false,
});
const Footer = dynamic(() => import("./Footer"), {
  ssr: false,
});
function Layout({ children }) {
  return (
    <div className="bg-dark">
      <NavBar />
      {children}
      <TOTop />
      <Footer />
    </div>
  );
}

export default Layout;
