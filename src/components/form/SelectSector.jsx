import useFetch from "@/hooks/useFetch";
import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import SelectComp from "./SelectComp";

function SelectSector({ label, required, labelClassName, icon }) {
  const { values, setFieldValue } = useFormikContext();
  const { data } = useFetch({
    endpoint: `sectors`,
    queryKey: [`sectors`],
  });
  const organization_id = values?.organization_id;

  const options = data?.data?.sectors?.map((item) => ({
    value: item.id,
    label: `${item.label} - ${item?.facility_name}`,
  }));

  const filteredOptions = data?.data?.sectors
    ?.filter((item) => item?.organization_id == organization_id)
    ?.map((item) => ({
      value: item?.id,
      label: `${item?.label} - ${item?.facility_name}`,
    }));



  const selectedValue = options?.find(
    (option) => option?.value == values.sector_id
  );
  return (
    <div>
      <SelectComp
        icon={icon}
        label={label}
        labelClassName={labelClassName}
        name={"sector_id"}
        options={organization_id ? filteredOptions : options}
        placeholder={"اختر مركز الخدمة"}
        required={required}
        isClearable
        selectedValue={selectedValue}
      />
    </div>
  )
}

export default SelectSector;
