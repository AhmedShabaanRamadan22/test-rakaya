import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import BaseInputField from "../form/BaseInputField";
import Label from "../form/Label";
import RadioButtonGroup from "../form/RadioButtonGroup";
import SelectDepartment from "../form/SelectDepartment";
import TextArea from "../form/TextArea";
import SelectExperienceYears from "../form/SelectExperienceYears";
import { availabilityOptions, jobsOptions } from "./data";

function MainFormStepTwo() {
  const { setFieldValue, values } = useFormikContext();
  const handleRadioButtonChange = (name, value) => {
    setFieldValue(name, value);
  };
  useEffect(() => {
    if (values.job_category == "training") {
      setFieldValue("salary_expectation", 0);
      setFieldValue("availability_to_start", "now");
      setFieldValue("years_of_experience", "0");
    } else {
      setFieldValue("salary_expectation", "");
      setFieldValue("availability_to_start", "");
      setFieldValue("years_of_experience", "");
    }
  }, [values.job_category, setFieldValue]);

  return (
    <div className="my-">
      <SelectDepartment label="اختر القسم الذي ترغب بالإنضمام إليه" required />
      <TextArea
        label="أخبرنا عن نفسك؟"
        placeholder="اكتب هنا"
        name={"self_description"}
        required
      />

      <Label>
        نوع الوظيفة
        <span className="text-danger mx-1">{"*"}</span>
      </Label>
      <RadioButtonGroup
        options={jobsOptions}
        name="job_category"
        defaultValue=""
        onChange={(e) =>
          handleRadioButtonChange("job_category", e.target.value)
        }
      />
      {values?.job_category == "training" ? (
        ""
      ) : (
        <>
          <BaseInputField
            name="salary_expectation"
            label="الراتب الشهري المتوقع"
            placeholder="4000 SAR"
            type="num"
            required
            maxDigits={6}
          />
          <SelectExperienceYears label={"عدد سنوات الخبرة"} required />
          <Label>
            إذا رشحت لهذا الشاغر، فمتى تستطيع أن تباشر معنا
            <span className="text-danger mx-1">{"*"}</span>
          </Label>
          <RadioButtonGroup
            options={availabilityOptions}
            name="availability_to_start"
            defaultValue=""
            onChange={(e) =>
              handleRadioButtonChange("availability_to_start", e.target.value)
            }
          />
        </>
      )}
    </div>
  );
}

export default MainFormStepTwo;
