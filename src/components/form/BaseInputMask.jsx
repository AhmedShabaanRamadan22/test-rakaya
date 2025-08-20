/* eslint-disable react/display-name */
import { useFormikContext } from "formik";
import { forwardRef, useState } from "react";

const BaseInputMask = forwardRef(({ name }, ref) => {
  const { setFieldValue, values, touched, errors, handleBlur } =
    useFormikContext();
  const formatIban = (value) => {
    value = value
      .replace(/\s/g, "")
      .replace(/[^A-Za-z0-9]/g, "")
      .slice(0, 22);

    if (value.length > 2) {
      return (
        value.substring(0, 2) +
        " " +
        value
          .substring(2)
          .replace(/(.{4})/g, "$1 ")
          .trim()
      );
    }
    return value;
  };

  const [inputValue, setInputValue] = useState(formatIban(values[name]?.slice(2) || "")); // Initialize with formatted value
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (event) => {
    const newValue = formatIban(event.target.value);
    setInputValue(newValue);
    setFieldValue(name, `SA${newValue.replace(/\s/g, "")}`); // Store value without spaces in Formik
  };

  return (
    <div className="w-full input-group flex-row-reverse">
      <span className="input-group-text" id="basic-addon1">
        SA
      </span>
      <input
        ref={ref}
        dir="ltr"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="xx xxxx xxxx xxxx xxxx xxxx"
        name="iban"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          handleBlur(e);
          setIsFocused(false);
        }}
        className={`form-control p-2 ${
          errors.iban && touched.iban ? "border-danger" : ""
        }`}
      />
    </div>
  );
});

export default BaseInputMask;
