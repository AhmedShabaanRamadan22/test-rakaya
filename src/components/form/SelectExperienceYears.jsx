import React from "react"
import SelectComp from "./SelectComp"

function SelectExperienceYears({ label, required }) {
  const options = [
    { value: "0", label: " لاتوجد خبرة" },
    { value: "1", label: " 1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "+6", label: "6 سنوات واكثر" },
    { value: "+10", label: "10 سنوات وأكثر " },
  ]
  return (
    <div>
      <SelectComp
        label={label}
        name={"years_of_experience"}
        placeholder="اختر عدد سنوات الخبرة"
        options={options}
        required={required}
      />
    </div>
  )
}

export default SelectExperienceYears
