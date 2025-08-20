import { useFormikContext } from "formik";
import React from "react";

function RadioButtonGroup({ options, name, defaultValue, onChange , className }) {
  const { errors, touched, handleBlur } = useFormikContext(); 

  return (
    <>
    <div className={className}>
      {options.map((option, index) => (
        <>
          <div className="form-check form-check-reverse" key={index}>
            <input
              className="form-check-input"
              type="radio"
              name={name}
              id={`${name}${index}`}
              value={option.value}
              defaultChecked={defaultValue === option.value}
              onChange={onChange}
            />
            <label className="form-check-label" htmlFor={`${name}${index}`}>
              {option.label}
            </label>
          </div>
        </>
      ))}
    </div>
      {touched[name] && errors[name] && (
        <div className="text-danger" style={{ fontSize: "12px" }}>
          {errors[name]}
        </div>
      )}
    </>
  );
}

export default RadioButtonGroup;
