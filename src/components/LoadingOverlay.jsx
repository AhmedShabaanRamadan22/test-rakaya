import React from "react";

function LoadingOverlay() {
  return (
    <div
      className="position-fixed top-0 end-0 bottom-0 start-0 h-100 d-flex justify-content-center align-items-center "
      style={{ backgroundColor: "#1e1e1eb8" , zIndex:"9999", overflow:"hidden", height:"100vh" }}
    >
      <div className="spinner-border text-white" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default LoadingOverlay;
