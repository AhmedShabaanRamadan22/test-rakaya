import React from "react";

function Label({ children, className }) {
  return (
    <label className={`block  my-2 block fw-bolder ${className} `}>
      {children}
    </label>
  );
}

export default Label;
