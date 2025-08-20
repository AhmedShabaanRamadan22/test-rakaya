import UploadDoc from "@/components/form/UploadDoc"
import { useFormikContext } from "formik"
import React from "react"

function AttachmentsMainData({ check, setCheck }) {
  const { values, errors, touched, submitCount } = useFormikContext()
 

  return (
    <div>
      <UploadDoc
        name="candidate_national_id"
        label={"بطاقة الهوية"}
        isRequired
      />
      <UploadDoc
        name="Passport_photo"
        label={"صورة الجواز"}
        isRequired={!values.national_id.startsWith("1")}
      />
      
      <UploadDoc name="candidate_iban" label={"شهادة الايبان"} isRequired />

      <UploadDoc
        name="last_certificate"
        label={" نسخة من شهادة  لآخر مؤھل دراسي"}
        isRequired
      />
      <UploadDoc
        name="courses_certificate"
        label={"   نسخة من شھادة الدورات التدریبة   ( إن وجدت )"}
      />
      <UploadDoc
        name="experience_certificate"
        label={"نسخة من شھادة الخبرات السابقة أن وجدت"}
      />
      <UploadDoc name="driving_license_photo" label={"صورة رخصة القیادة"} />
      <UploadDoc name="national_address" label={"صورة  العنوان الوطني "} />

      <div className="form-check-reverse my-3">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexRadioDefault1"
          checked={check}
          onChange={() => setCheck(!check)}
        />
        <label
          className="form-check-label"
          htmlFor="flexRadioDefault1"
          style={{ cursor: "pointer" }}
        >
          أقر بأن جميع البيانات التي قدمتها في طلب التوظيف صحيحة ودقيقة بمعرفتي
          الكاملة ، وأتعهد بتحمل المسؤولية الكاملة عن صحة هذه البيانات وأي تبعات
          قد تنتج عن أي معلومات غير صحيحة أو مضللة تقدمت بها. كما أوافق على
          تقديم وثائق تثبت صحة المعلومات المقدمة في حال الطلب.
        </label>
      </div>

      {/* {Object.keys(errors).length > 0 && (
        <div style={{ color: "red", marginTop: "20px" }}>
          <ul>
            {Object.keys(errors).map(
              (key, index) =>
                (touched[key] || submitCount > 0) && (
                  <li key={index}>{errors[key]}</li>
                )
            )}
          </ul>
        </div>
      )} */}
    </div>
  )
}

export default AttachmentsMainData
