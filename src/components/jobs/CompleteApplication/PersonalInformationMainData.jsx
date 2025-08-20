import React, { useEffect, useState } from "react"
import BaseInputField from "@/components/form/BaseInputField"
import DatePickerComp from "@/components/form/DatePickerComp"
import PhoneInput from "@/components/form/PhoneInput"
import SelectNationality from "@/components/form/SelectNationality"
import SelectSize from "@/components/form/SelectSize"
import { useFormikContext } from "formik"

function PersonalInformationMainData() {
  const { values, setFieldValue } = useFormikContext()
  const [reset, setReset] = useState(0)
  const [previousNationalId, setPreviousNationalId] = useState(
    values.national_id
  )

  useEffect(() => {
    if (values.national_id.startsWith("1")) {
      setFieldValue("nationality", "192")
    } else if (previousNationalId !== values.national_id) {
      setFieldValue("nationality", null)
      setReset((prev) => prev + 1)
    }
    setPreviousNationalId(values.national_id)
  }, [setFieldValue, values.national_id, previousNationalId])

  return (
    <div>
      {" "}
      <BaseInputField
        name="ramz"
        label={" رمز الطلب"}
        placeholder={" رمز الطلب"}
        required
        disabled
      />
      <BaseInputField
        name="name"
        label={"اسمك الكامل (الرباعي)"}
        placeholder={"الاسم الكامل"}
        messageInfo={"يرجى ادخال اسمك  الكامل  (الرباعي) باللغة العربية"}
        required
        onlyArabic
      />
      <BaseInputField
        name={"email"}
        label={"البريد الإلكتروني"}
        placeholder={"email@rakaya.sa"}
        messageInfo={
          "يجب ان يتم التاكد من صحة البريد الإلكتروني لكي يتم  ارسال نسخة التطبيق اليك "
        }
        required
      />
      { values?.resident_status !== "other" &&
      
      <PhoneInput
        label={"رقم الجوال الرسمي (المسجل بنظام أبشر)"}
        required={values?.resident_status !== "other"}
      />
      }
      <BaseInputField
        name={"national_id"}
        label={"رقم الهوية"}
        placeholder={"xxxxxxxxxx"}
        required
        type={"num"}
        maxDigits={"10"}
      />
      <BaseInputField
        name={"address"}
        label={"العنوان"}
        placeholder={"المدينة - الحي - الشارع"}
        required
      />
      <DatePickerComp
        name="birthdate"
        label={"تاريخ الميلاد"}
        name_hj="birthdate_hj"
        required
      />
      <div key={reset}>
        <SelectNationality label={"الجنسية"} required />
      </div>
      <SelectSize label={"مقاس الزي الصحي"} required />
    </div>
  )
}

export default PersonalInformationMainData
