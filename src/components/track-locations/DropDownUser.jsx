import React from "react";
import { CiLogout } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import Switch from "../form/Switch";

function DropDownUser({ setAuth, isDarkMode, toggleDarkMode }) {
  return (
    <div class="dropdown trackLocation">
      <button
        className=" dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ backgroundColor: "transparent" }}
      >
        <VscAccount className="fs-4" style={{color:isDarkMode ? "white" :""}} />
      </button>
      <ul
        className="dropdown-menu"
        style={{ backgroundColor:isDarkMode ?  "#2c3639 " :""  }}
      >
        <li>
          <a className="dropdown-item" href="#">
            <div
              className="text_Dark fs-5  d-flex align-items-center  justify-content-evenly "
              style={{ fontWeight: "bolder", cursor: "pointer" }}
              onClick={() => {
                localStorage.setItem("isAuth", "false");
                localStorage.removeItem("user");
                setAuth(false);
              }}
            >
              <p className="m-0 fs-6 ">تسجيل الخروج</p>
              <CiLogout className="mx-2" />
            </div>
          </a>
        </li>
        <li className="mt-2" style={{ borderTop: "1px solid #eee" }}>
          <a className="dropdown-item" href="#">
            <div
              style={{ cursor: "pointer" }}
              onClick={toggleDarkMode}
              className="text_Dark d-flex mx-2"
            >
              <Switch label={"الوضع الداكن"} isDarkMode={isDarkMode} />
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default DropDownUser;
