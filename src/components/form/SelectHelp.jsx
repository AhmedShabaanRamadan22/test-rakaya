import useFetch from "@/hooks/useFetch";
import React from "react";
import SelectComp from "./SelectComp";

function SelectHelp({ label, required, labelClassName }) {
  const { data } = useFetch({
    endpoint: `all-subjects`,
    queryKey: [`all-subjects`],
  });
  const options = data?.data?.subjects?.map((item) => ({
    value: item.id,
    label: item.name_ar,
  }));

  return (
    <div>
      <SelectComp
        label={label}
        labelClassName={labelClassName}
        name={"subject_id"}
        options={options}
        required={required}
      />
    </div>
  );
}

export default SelectHelp;
