import React from "react";
import Container from "./Container";

const ImgContainer = ({ children, className , style }) => {
  return (
    <Container
      className={`overflow-hidden m-0 p-0 rounded bg-primary img-container ${className}`}
      style={style}
    >
      {children}
    </Container>
  );
};

export default ImgContainer;
