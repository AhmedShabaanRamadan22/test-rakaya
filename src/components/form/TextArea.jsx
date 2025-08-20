import React from "react";
import Label from "./Label";
import { useFormikContext } from "formik";

function TextArea({ label, required, name, placeholder , rows }) {
  const { values, setFieldValue, errors, touched, handleBlur } =
    useFormikContext();
  return (
    <div>
      <Label className={"text_Dark"}>
        {label}
        <span className="text-danger mx-1">{required == "1" ? "*" : ""}</span>
      </Label>
      <textarea
        className={`form-control ${
          errors[name] && touched[name] ? "border-danger" : ""
        }`}
        id="exampleFormControlTextarea1"
        rows={rows || "3"}
        value={values[name]}
        onChange={(e) => setFieldValue(name, e.target.value)}
        onBlur={handleBlur}
        placeholder={placeholder}
        name={name}
      ></textarea>
      {touched[name] && errors[name] && (
        <div className="text-danger " style={{ fontSize: "12px" }}>
          {errors[name]}
        </div>
      )}
    </div>
  );
}

export default TextArea;
