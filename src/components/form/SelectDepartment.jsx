import useFetch from "@/hooks/useFetch";
import React from "react";
import SelectComp from "./SelectComp";

function SelectDepartment({ label, required }) {
  const { data } = useFetch({
    endpoint: `all-departments`,
    queryKey: [`all-departments`],
  });
  const options = data?.data?.departments?.map((item) => ({
    value: item.id,
    label: item.name_ar,
  }));

  return (
    <div>
      <SelectComp
        label={label}
        name={"department_id"}
        options={options}
        required={required}
      />
    </div>
  );
}

export default SelectDepartment;
