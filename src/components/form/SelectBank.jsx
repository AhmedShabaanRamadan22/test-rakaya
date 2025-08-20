import useFetch from "@/hooks/useFetch";
import { useFormikContext } from "formik";
import React from "react";
import SelectComp from "./SelectComp";

function SelectBank({ label, required, labelClassName }) {
  const { values } = useFormikContext();

  const { data } = useFetch({
    endpoint: `banks`,
    queryKey: [`banks`],
  });
  const options = data?.data?.banks?.map((item) => ({
    value: item.id,
    label: item.name_ar,
  }));

  const selectedValue = options?.find(
    (option) => option?.value == values.bank_id
  );
  return (
    <div>
      <SelectComp
        label={label}
        labelClassName={labelClassName}
        name={"bank_id"}
        options={options}
        required={required}
        selectedValue={selectedValue}
      />
    </div>
  );
}

export default SelectBank;
