import { t } from "i18next";
import React from "react";
import SelectComp from "./SelectComp";

function SelectQualifications({ label, required }) {
  const options = [
    { value: "high_school", label: t("common:HighSchool") },
    { value: "diploma", label: 'دبلوم' },
    { value: "bachelor", label: t("common:bachelor") },
    { value: "master", label: t("common:Master") },
    { value: "phd", label: t("common:Ph.D") },
  ]
  return (
    <div>
      <SelectComp
        label={label}
        name={"qualification"}
        placeholder="اختر المؤهل"
        options={options}
        required={required}
      />
    </div>
  );
}

export default SelectQualifications;
