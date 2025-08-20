import BaseInputField from "@/components/form/BaseInputField";
import SelectBank from "@/components/form/SelectBank";
import React from "react";

function BankInformationMainData() {
  return (
    <div>
      {" "}
      <SelectBank label={" نوع البنك"} required />
      <BaseInputField
        name={"account_name"}
        label={"اسم صاحب الحساب حسب البطاقة البنكية"}
        placeholder={"ادخل الاسم"}
        required
      />
      <BaseInputField
        name={"owner_national_id"}
        label={"رقم الهوية / الاقامة لصاحب الحساب المصرفي"}
        placeholder={"xxxxxxxxxx"}
        type={"num"}
        maxDigits={"10"}
        required
      />
      <BaseInputField
        name="iban"
        label={"رقم الايبان"}
        placeholder={"عبد الرحمن الشيخ"}
        type={"IBAN"}
        required
      />
    </div>
  );
}

export default BankInformationMainData;
