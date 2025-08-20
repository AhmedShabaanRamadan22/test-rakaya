/* eslint-disable react/prop-types */
import useFetch from "@/hooks/useFetch";
import SelectComp from "./SelectComp";
import { useFormikContext } from "formik";

export default function SelectMonitors({
  label,
  className,
  required,
  labelClassName,
  icon,
}) {
  const { values } = useFormikContext();
  const { data } = useFetch({
    endpoint: `monitors`,
    queryKey: [`monitors`],
  });
  const options = data?.data?.monitors?.map((item) => ({
    value: item.id,
    label: item?.name,
  }));
  const organization_id = values?.organization_id;

  const filteredOptions = data?.data?.monitors
    ?.filter((item) => item?.organization_id == organization_id)
    ?.map((item) => ({
      value: item?.id,
      label: item?.name,
    }));

  const selectedValue = options?.find(
    (option) => option?.value == values?.monitor_id
  );
  return (
    <div className={`${className} `}>
      <SelectComp
        label={label}
        icon={icon}
        labelClassName={labelClassName}
        name={ "monitor_id" }
        placeholder={"اختر مراقب"}
        options={organization_id ? filteredOptions : options}
        required={required}
        selectedValue={selectedValue}
        isClearable
      />
    </div>
  )
}
