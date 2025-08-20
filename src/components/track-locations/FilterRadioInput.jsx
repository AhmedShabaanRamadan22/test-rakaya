import React from "react";

function FilterRadioInput({
  name,
  id,
  label,
  defaultChecked,
  onChange,
  disabled,
  disabledClass,
  labelClassName,
  mainDivClass,
}) {
  return (
    <div
      className={ mainDivClass}
      style={{ width: "" }}
    >
      <input
        type="radio"
        className="btn-check"
        name={name}
        id={id}
        autoComplete="off"
        onChange={onChange}
        defaultChecked={defaultChecked}
        disabled={disabled}
      />
      <label
        className={`text_Dark ${disabled ? disabledClass : ""} ${labelClassName} btn`}
        htmlFor={id}
        style={{
          border: "1px solid #c9b171",
          margin: "0 2px",
          // width: "100%",
        }}
      >
        {label}
      </label>
    </div>
  );
}

export default FilterRadioInput;
