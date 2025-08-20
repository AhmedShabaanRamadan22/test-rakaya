import React from "react";
import Container from "../Container";
import Join from "./Join";

const ContentComponent = ({ children, title }) => {
  return (
    <Container className="mb-3">
      <Container className="d-flex align-items-center gap-4 px-0">
        <h4 className="text-body-tertiary">{title}</h4>
        <hr className="flex-grow-1" />
      </Container>
      <Container>{children}</Container>
    </Container>
  );
};

const Content = () => {
  return (
    <Container className="mx-0 px-0 my-3">
      <Join />
    </Container>
  );
};

export default Content;
