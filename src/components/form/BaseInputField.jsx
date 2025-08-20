import { useFormikContext } from "formik";
import React from "react";
import Label from "./Label";
import BaseInputMask from "./BaseInputMask";

function BaseInputField({
  name,
  placeholder,
  label,
  required,
  type,
  maxDigits,
  disabled,
  messageInfo,
  onlyArabic,
}) {
  const { values, setFieldValue, errors, touched, handleBlur } =
    useFormikContext();
  const handleChange = (e) => {
    let value = e.target.value;
    if (type === "num") {
      value = value.replace(/[^0-9]/g, "").slice(0, maxDigits);
    } else if (onlyArabic) {
      value = value.replace(/[^\u0600-\u06FF\s]/g, "");
    }
    setFieldValue(name, value);
  };
  const handleKeyPress = (e) => {
    if (onlyArabic) {
      const isArabicOrSpace = /[\u0600-\u06FF\s]/.test(e.key);
      if (!isArabicOrSpace) {
        e.preventDefault();
      }
    } else if (type === "num") {
      const isNumber = /^\d$/.test(e.key);
      if (
        !isNumber ||
        (values[name].length >= maxDigits &&
          e.target.selectionStart === e.target.selectionEnd)
      ) {
        e.preventDefault();
      }
    }
  };
  return (
    <div>
      <Label className="text-center text_Dark">
        {label}
        {required && <span className="mx-1 text-danger">*</span>}
      </Label>
      <p style={{ fontSize: "13px", margin: "0px 0 10px 0" }}>
        {messageInfo && <span> {messageInfo}</span>}
      </p>
      {type == "IBAN" ? (
        <BaseInputMask name={name} />
      ) : (
        <input
          type={type === "num" ? "text" : type || "text"}
          value={values[name]}
          onChange={handleChange}
          placeholder={placeholder}
          name={name}
          onBlur={handleBlur}
          disabled={disabled}
          onKeyPress={handleKeyPress}
          className={`form-control p-2 ${
            errors[name] && touched[name] ? "border-danger" : ""
          }`}
          pattern={type === "num" ? "\\d*" : undefined}
        />
      )}
      {touched[name] && errors[name] && (
        <div className="text-danger" style={{ fontSize: "12px" }}>
          {errors[name]}
        </div>
      )}
    </div>
  );
}

export default BaseInputField;
