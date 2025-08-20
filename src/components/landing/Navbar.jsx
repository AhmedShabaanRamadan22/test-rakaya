import { routes } from "@/utils/routes";
import { useState } from "react";
import Container from "../Container";
import Setting from "../Setting";
import { t } from "i18next";
export const NavLink = ({ children, to }) => {
  return (
    <Container className={"px-0 py-0 fw-semibold"}>
      <li className="nav-item text-nowrap" style={{ listStyle: "none" }}>
        <a
          href={to}
          className="text-dark text-decoration-none text-center nav-link"
        >
          {children}
        </a>
      </li>
    </Container>
  );
};

const Navbar = () => {
  const [toggleNav, setToggleNav] = useState(false);
  const [navStyle, setNavStyle] = useState("");

  return (
    <nav>
      <Container className="pb-3">
        <Container
          className={
            "d-flex d-lg-none justify-content-between align-items-center"
          }
        >
          <a className="d-lg-none navbar-brand fs-1 fw-bold" href="#">
            Rakaya
          </a>
          <button
            className="btn fs-1 border-0"
            onClick={() => {
              setToggleNav((prev) => !prev);
              document.body.style.overflow = toggleNav ? "auto" : "hidden";
              setNavStyle(!toggleNav ? "min-vh-100" : "");
            }}
          >
            <i className={`${toggleNav ? "bi bi-x" : "bi bi-list"}`}></i>
          </button>
        </Container>
        <Container
          className={`d-lg-flex ${
            toggleNav ? "d-flex" : "d-none"
          } flex-column flex-lg-row justify-content-lg-between align-items-center gap-5 gap-lg-0 ${navStyle}`}
        >
          <div className="d-flex flex-column flex-lg-row gap-5 overflow-hidden">
            {routes.map((route, index) => (
              <NavLink to={route.route} key={index}>
                {t(`common:${route.name}`)}
              </NavLink>
            ))}
          </div>
          <div className="d-flex align-items-center gap-5">
            <div className="border border-2 border-dark rounded rounded-pill px-4 py-2">
              <NavLink to={"/"}>Go to website</NavLink>
            </div>
            <div className="d-none d-lg-flex">
              <Setting />
            </div>
          </div>
          <div
            className="d-flex d-lg-none position-absolute left-0 bottom-0 mb-5 justify-content-center"
            style={{ width: "100vw" }}
          >
            <Setting text/>
          </div>
        </Container>
      </Container>
    </nav>
  );
};

export default Navbar;
