import React from "react";
import SelectComp from "./SelectComp";
import { useFormikContext } from "formik";

function SelectTypeActions({ label, required, labelClassName , icon }) {
  const { values, setFieldValue } = useFormikContext();

  const options = [
    { value: "Ticket", label: "البلاغات" },
    { value: "Support", label: "طلبات الاسناد" },
    { value: "Assist", label: "الدعم" },
    { value: "SubmittedSection", label: "الاستمارات المسلمة" },
    { value: "MealOrganizationStage", label: "الوجبات" },
  ];
  
  const selectedValue = options?.find(
    (option) => option?.value == values.type_actions
  );
  return (
    <div>
      <SelectComp
        label={label}
        name={"type_actions"}
        placeholder="اختر نوع الحدث"
        options={options}
        required={required}
        labelClassName={labelClassName}
        selectedValue={selectedValue}
        icon={icon}
        isClearable
      />
    </div>
  );
}

export default SelectTypeActions;
