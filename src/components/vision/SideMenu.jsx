import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Container from "../Container";

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
            <h3 className="fs-5">{children}</h3>
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
  { title: "عن الشركة", href: "/rakaya" },
  { title: "أركاننا", href: "/rakaya/our-pillars" },
  { title: "عمل ركايا", href: "/rakaya/our-work" },
  { title: "خدماتنا", href: "/rakaya/our-services" },
  { title: "منتجاتنا", href: "/rakaya/our-products" },
  { title: "قَبس عن ركايا", href: "/rakaya/feedbacks" },
  { title: "برامج نستخدمها", href: "/rakaya/applications" },
  { title: "أُسس", href: "/rakaya/foundations" },
  { title: "جلسات", href: "/rakaya/sessions" },
];
const SideMenu = () => {
  const { pathname } = useRouter();
  const [activeRouteIndex, setActiveRouteIndex] = useState(
    paths.indexOf(paths.find((path) => path.href == pathname))
  );

  return (
    <Container className="col-lg-2 mx-3 mb-5 my-lg-0">
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
};

export default SideMenu;
