import React from "react";
import UploadDoc from "../form/UploadDoc";

function MainFormStepThree() {
  return (
    <div>
      <UploadDoc
        name="candidate_cv_ar"
        isRequired
        label={" الرجاء رفع سيرتك الذاتية محدثة باللغة العربية"}
      />
      <UploadDoc
        name="candidate_cv_en"
        isRequired
        label={" الرجاء رفع سيرتك الذاتية محدثة باللغة الانجليزية"}
      />
      <UploadDoc
        name="candidate_personal_picture"
        label={"ارفع صورة شخصية لك"}
        textAccept={"JPG/PNG/JPEG"}
        isRequired
        accept={"image/jpeg,image/png,image/jpg"}
      />
      <UploadDoc
        name="candidate_portfolio"
        label={"ارفع ملف لأهم أعمالك «إن وجد»"}
      />
    </div>
  )
}

export default MainFormStepThree;
