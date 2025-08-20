import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Container from "../Container";

function Menu() {
  const titleVariant = {};

  const hrVariant = {
    active: { width: "100%" },
    inactive: { width: 0 },
  };

  const ListItem = ({ children, last = false, active, onClick, href, to }) => {
    return (
      <motion.div
        variants={titleVariant}
        whileHover="active"
        initial={active ? "active" : "inactive"}
        exit={"inactive"}
      >
        <Link to={to} href={href} onClick={onClick}>
          <div className="my-3" style={{ cursor: "pointer" }}>
            <div className="d-flex justify-content-center d-lg-block">
              <h3 className="fs-5 text_Dark">{children}</h3>
            </div>
            <Separator active={active} />
          </div>
        </Link>
      </motion.div>
    );
  };

  const Separator = () => (
    <div className="position-relative">
      <hr className="separator bg-white-50" />
      <motion.div
        variants={hrVariant}
        className="separator-fill position-absolute bg-primary top-0"
        style={{ height: 2 }}
      />
    </div>
  );

  const paths = [
    { title: "تفاصيل العمل", href: "/jobs" },
    { title: "التقديم", href: "/jobs/job-application" },
  ];
  const { pathname } = useRouter();
  const [activeRouteIndex, setActiveRouteIndex] = useState(
    paths.indexOf(paths.find((path) => path.href == pathname))
  );

  return (
    <Container
      className="col-lg-3  mb-5 my-lg-0 d-flex gap-4 menu_jobs"
      // style={{ margin: "0 143px" }}
    >
      {paths.map((path, index) => (
        <ListItem
          key={index}
          active={activeRouteIndex == index}
          last={index == paths.length - 1}
          onClick={() => {
            setActiveRouteIndex(index);
          }}
          href={path.href}
        >
          {path.title}
        </ListItem>
      ))}
    </Container>
  );
}

export default Menu;
