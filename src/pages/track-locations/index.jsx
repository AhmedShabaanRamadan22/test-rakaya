import LoadingOverlay from "@/components/LoadingOverlay";
import Switch from "@/components/form/Switch";
import DropDownUser from "@/components/track-locations/DropDownUser";
import Login from "@/components/track-locations/Login";
import Main from "@/components/track-locations/Main";
import { adminEmail, ithraaEmail, albeitEmail } from "@/utils/Helpers";
import { Form, Formik } from "formik";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiLogout, CiMenuBurger } from "react-icons/ci";
import { IoIosArrowRoundBack } from "react-icons/io";

function TrackLocation() {
  const [isAuth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedDarkMode = localStorage.getItem("darkMode") === "true";
      if (savedDarkMode) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
      setIsDarkMode(savedDarkMode);
      setIsInitialLoad(false);
    }
  }, []);

  useEffect(() => {
    if (!isInitialLoad) {
      if (isDarkMode) {
        document.body.classList.add("dark");
        localStorage.setItem("darkMode", "true");
      } else {
        document.body.classList.remove("dark");
        localStorage.setItem("darkMode", "false");
      }
    }
  }, [isDarkMode, isInitialLoad]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuth") === "true";

    const storedEmail = localStorage.getItem("user");
    if (storedEmail) {
      try {
        const userObject = JSON.parse(storedEmail);

        if (
          (authStatus && userObject.email == adminEmail) ||
          ithraaEmail ||
          albeitEmail
        ) {
          setAuth(true);
        }
      } catch (error) {
        // console.error("Error parsing stored user data:", error);
      }
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <LoadingOverlay />;
  }

  return isAuth ? (
    <div className="">
      <Formik
        initialValues={{
          monitor_id: "",
          sector_id: "",
          organization_id: "",
          locationHajj: "All",
          Actions: "AllActions",
        }}
        onSubmit={() => {}}
      >
        <Form>
          <div
            className="bg-white position-fixed w-100 navbar-track"
            style={{
              height: "60px",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 9999,
              borderBottom: "1px solid #2f2f3136",
            }}
          >
            <div
              className="d-flex justify-content-between px-2 align-items-center navbar-location "
              style={{ margin: "10px 0" }}
            >
              <div className="cursor-pointer p-2">
                <p className="fs-5 px-3 m-0" style={{ fontWeight: "bolder" }}>
                  الخريطة التفاعلية{" "}
                </p>
              </div>
              <div className="d-flex align-items-center ">
                <div
                  style={{ cursor: "pointer" }}
                  onClick={toggleDarkMode}
                  className="text_Dark"
                >
                  <Switch label={"الوضع الداكن"} isDarkMode={isDarkMode} />
                </div>
                <div className="mx-2">
                  <Link
                    href="https://admin.refada.co/"
                    target="_blank"
                    className="text_Dark fs-5"
                    style={{ fontWeight: "bolder" }}
                  >
                    الدخول الى البوابة
                    <IoIosArrowRoundBack className="mx-1" />
                  </Link>
                </div>
                <div
                  className="text_Dark fs-5  d-flex align-items-center  "
                  style={{ fontWeight: "bolder", cursor: "pointer" }}
                  onClick={() => {
                    localStorage.setItem("isAuth", "false");
                    localStorage.removeItem("user");
                    localStorage.removeItem("type");

                    setAuth(false);
                  }}
                >
                  <p className="m-0 ">تسجيل الخروج</p>
                  <CiLogout className="mx-2" />
                </div>
              </div>
            </div>

            <div
              className="mobile-navbar d-flex  d-xl-none"
              style={{ margin: "17px 10px" }}
            >
              <p className="fs-6 px-3 m-0" style={{ fontWeight: "bolder" }}>
                الخريطة التفاعلية{" "}
              </p>
              <div className="d-flex align-content-center">
                <div onClick={() => setCollapsed(!collapsed)}>
                  <CiMenuBurger
                    className="fs-4"
                    style={{ color: isDarkMode ? "white" : "" }}
                  />
                </div>
                <div className="mx-2">
                  <DropDownUser
                    setAuth={setAuth}
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className="d-flex "
            style={{
              marginTop: "55px",
              height: "calc(100vh - 55px)",
              overflow: "hidden",
            }}
          >
            <Main isDarkMode={isDarkMode} collapsed={collapsed} />
          </div>
        </Form>
      </Formik>
    </div>
  ) : (
    <Login setAuth={setAuth} />
  );
}

export default TrackLocation;
TrackLocation.noLayout = true;
