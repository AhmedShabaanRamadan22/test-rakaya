import { useFormikContext } from "formik";
import Label from "./Label";

function PhoneInput({ label, required }) {
  const { values, setFieldValue, errors, touched, handleBlur } =
    useFormikContext();

  const formatPhoneNumber = (inputValue) => {
    inputValue = inputValue.replace(/[^0-9]/g, "");
    if (inputValue.startsWith("5")) {
      inputValue = inputValue.slice(0, 9);
    } else {
      return "";
    }
    let formattedInput = "";
    if (inputValue.length > 2) {
      formattedInput += inputValue.substring(0, 2) + " ";
      if (inputValue.length > 5) {
        formattedInput += inputValue.substring(2, 5) + " ";
        formattedInput += inputValue.substring(5);
      } else {
        formattedInput += inputValue.substring(2);
      }
    } else {
      formattedInput = inputValue;
    }

    return formattedInput.trim();
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    e.target.value = formatted;
    setFieldValue("phone", formatted.replace(/\s+/g, ""));
    setFieldValue("phone_code", "966");
  };

  return (
    <div>
      <Label className={"text_Dark"}>
        {label}
        <span className="text-danger mx-1">{required ? "*" : ""}</span>
      </Label>
      <div className="d-flex gap-2">
        <div className="w-75">
          <input
            type="text"
            placeholder="xx xxx xxxx"
            dir="ltr"
            value={values.phone ? formatPhoneNumber(values.phone) : ""}
            onChange={handlePhoneChange}
            onBlur={handleBlur}
            inputMode="numeric"
            name="phone"
            className={`form-control ${
              errors.phone && touched.phone ? "border-danger" : ""
            }`}
            maxLength="13"
          />
        </div>
        <div
          className={`border w-25 d-flex align-items-center justify-content-center rounded-2 ${
            errors.phone && touched.phone ? "border-danger" : ""
          }`}
        >
          <span className="text-gray text_Dark">966+</span>
        </div>
      </div>
      {touched.phone && errors.phone && (
        <div className="text-danger" style={{ fontSize: "12px" }}>
          {errors.phone}
        </div>
      )}
    </div>
  );
}

export default PhoneInput;
