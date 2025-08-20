import React from "react";

function Switch({ label, isDarkMode }) {
  return (
    <div>
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          checked={isDarkMode}
          id="flexSwitchCheckDefault"
          style={{ marginTop: "7px" }}
        />
        <label
          class="form-check-label fs-6 fs-md-5"
          for="flexSwitchCheckDefault"
          style={{ fontWeight: "bolder" }}
        >
          {label}
        </label>
      </div>
    </div>
  );
}

export default Switch;
