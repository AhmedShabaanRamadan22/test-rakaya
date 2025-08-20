import useFetch from "@/hooks/useFetch";
import { useFormikContext } from "formik";
import React from "react";
import SelectComp from "./SelectComp";

function SelectNationality({ label, required, labelClassName }) {
  const { values } = useFormikContext();
  const { data } = useFetch({
    endpoint: `countries`,
    queryKey: [`countries`],
  });
  const options = data?.data?.countries?.map((item) => ({
    value: item.id,
    label: item.name_ar,
  }));

  const selectedValue = options?.find(
    (option) => option?.value == values.nationality
  );

  return (
    <div>
      <SelectComp
        label={label}
        labelClassName={labelClassName}
        name={"nationality"}
        options={options}
        required={required}
        disabled={values.national_id.startsWith("1")}
        selectedValue={selectedValue}
      />
    </div>
  );
}

export default SelectNationality;
