import { useFormikContext } from "formik";
import React from "react";
import SelectComp from "./SelectComp";

function SelectSize({ label, required }) {
  const { values } = useFormikContext();
  const options = [
    { value: "s", label: "S" },
    { value: "m", label: "M" },
    { value: "l", label: "L" },
    { value: "xl", label: "XL" },
    { value: "2xl", label: "2XL" },
    { value: "3xl", label: "3XL" },
    { value: "4xl", label: "4XL" },
    { value: "5xl", label: "5XL" },
  ];
  const selectedValue = options?.find(
    (option) => option?.value == values.scrub_size
  );
  return (
    <div>
      <SelectComp
        label={label}
        name={"scrub_size"}
        placeholder="اختر مقاس الزي الصحي"
        options={options}
        required={required}
        selectedValue={selectedValue}
      />
    </div>
  );
}

export default SelectSize;
