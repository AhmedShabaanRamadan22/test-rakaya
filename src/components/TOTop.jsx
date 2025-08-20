import { DarkModeContext } from "@/context/DarkModeContext";
import React, { useContext, useEffect, useState } from "react";

function TOTop() {
  const [showTopButton, setShowTopButton] = useState(false);
  const { isDarkMode } = useContext(DarkModeContext);

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onScrollHandler = () => {
    if (window.scrollY > 50) {
      setShowTopButton(true);
    } else {
      setShowTopButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScrollHandler);

    return () => window.removeEventListener("scroll", onScrollHandler);
  }, []);

  return (
    <div>
      {showTopButton && (
        <div
          className="position-fixed bottom-0 mb-3 z-index-high"
          style={{ left: "16px" }}
        >
          <button
            type="button"
            className="rounded-circle bg-transparent custom-pulse"
            onClick={goToTop}
          >
            <div
              style={{ width: "24px", height: "24px" }}
              className="d-flex align-items-center justify-content-center"
            >
              <i
                style={{ fontSize: "1.7rem" }}
                className="bi bi-caret-up-square-fill"
              ></i>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}

export default TOTop;
