import { DarkModeContext } from "@/context/DarkModeContext";
import styles from "@/styles/components/Navbar.module.scss";
import { routes } from "@/utils/routes";
import { t } from "i18next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useRef, useState } from "react";

const Button = dynamic(() => import("../Button"), { ssr: false });
const Container = dynamic(() => import("../Container"), { ssr: true });
const Logo = dynamic(() => import("../Logo"), { ssr: true });

const NavBarLink = ({ children, to, onClick }) => {
  const { isDarkMode } = useContext(DarkModeContext);

  const router = useRouter();
  const getActiveLink = (link) => {
    return `/${router.pathname.split("/")[1]}` == link;
  };
  return (
    <li
      className="nav-item text-center"
      onClick={() => {
        onClick();
      }}
    >
      <Link
        className={`${
          isDarkMode ? styles["nav-link-dark"] : styles["nav-link"]
        } fs-5 rounded mx-3 my-2 my-lg-0 text_Dark  ${
          getActiveLink(to) ? isDarkMode ? styles["nav-link-dark-active"] : styles["nav-link-active"] : ""
        }`}
        aria-current="page"
        href={to}
      >
        {children}
      </Link>
    </li>
  );
};

function Navbar() {
  const [show, setShow] = useState(false);
  const buttonRef = useRef(null);
  const navBarRef = useRef(null);
  const router = useRouter()
  const { isDarkMode } = useContext(DarkModeContext)

  return (
    <nav
      className={`navbar navbar-expand-lg py-2 ${isDarkMode ? "bg-dark" : ""}`}
    >
      <Container className="col-lg-10 align-items-center">
        <Link className="navbar-brand fw-semibold col-lg-1 col-2 mx-3" href="/">
          <div className="col-lg-8 col-12">
            <Logo />
          </div>
        </Link>
        <button
          className="btn fs-1 border-0 d-lg-none text_Dark"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
          ref={buttonRef}
          onClick={() => {
            setShow(!show)
          }}
        >
          <i className={`${show ? "bi bi-x" : "bi bi-list"}`}></i>
        </button>
        <div
          className="collapse navbar-collapse justify-content-lg-between"
          id="navbarNavDropdown"
          ref={navBarRef}
        >
          <ul className="navbar-nav mx-0 px-0">
            {routes.map((route, index) => (
              <NavBarLink
                to={route.route}
                key={index}
                onClick={() => {
                  if (document.body.offsetWidth < 600) buttonRef.current.click()
                }}
              >
                {t(`common:${route.name}`)}
              </NavBarLink>
            ))}
          </ul>
          <div className="d-flex justify-content-center mt-4 mt-lg-0">
            <Button
              color="secondary"
              onClick={() => router.push("/jobs/job-application")}
            >
              كن شريك معنا
            </Button>
            {/* <Setting/> */}
          </div>
        </div>
      </Container>
    </nav>
  )
}

export default Navbar;
