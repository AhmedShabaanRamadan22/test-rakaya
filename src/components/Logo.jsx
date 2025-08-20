import React from "react";
import Image from "next/image";
import logo from "assets/rakaya new logo/Gold2.webp";
const Logo = () => {
  return (
    <Image
      className="img-fluid"
      src={logo}
      alt="logo"
      width={null}
      height={null}
    />
  );
};

export default Logo;
