import { isEmail } from "@/utils/Helpers"
import { isValidSaudiID } from "saudi-id-validator"
import * as Yup from "yup"

export const initialValues = {
  name: "",
  email: "",
  phone: "",
  phone_code: "",
  qualification: "",
  department_id: "",
  self_description: "",
  resident_status: "",
  salary_expectation: "",
  availability_to_start: "",
  candidate_cv_ar: null,
  candidate_cv_en: null,

  candidate_portfolio: null,
  candidate_personal_picture: null,
  gender: "",
  department_id: "",
  job_category: "",
  marital_status: "",
  years_of_experience: "",
  has_relative: "",
  previously_work_at_rakaya: "",
}
export const validationSchema = Yup.object({
  name: Yup.string()
    .matches(
      /^[^\s][\u0600-\u06FF\s]*$/,
      "يجب أن يبدأ الاسم بحرف عربي وأن يكون الاسم باللغة العربية فقط"
    )
    .required("الاسم الكامل مطلوب"),
  email: Yup.string()
    .matches(isEmail, "يجب أن يكون بريدًا إلكترونيًا صالحًا")
    .required("البريد الإلكتروني مطلوب"),
  phone: Yup.lazy((value, { parent }) => {
    return parent.resident_status && parent.resident_status == "other"
      ? Yup.string().nullable()
      : Yup.string()
          .matches(/^[0-9]{9}$/, "رقم الجوال مطلوب")
          .required("رقم الجوال مطلوب")
  }),

  qualification: Yup.string().required("المؤهل العلمي مطلوب"),
  department_id: Yup.string().required("اختيار القسم مطلوب"),
  self_description: Yup.string().required("وصف نفسك مطلوب"),
  resident_status: Yup.string().required("حالة الإقامة مطلوبة"),
  salary_expectation: Yup.string().required("الراتب المتوقع مطلوب"),
  availability_to_start: Yup.string().required("متى تستطيع البدء مطلوب"),
  marital_status: Yup.string().required("الحالة الاجتماعية مطلوبة"),
  gender: Yup.string().required("النوع مطلوب"),
  has_relative: Yup.string().required("هذا الحقل مطلوب"),
  previously_work_at_rakaya: Yup.string().required("هذا الحقل مطلوب"),

  job_category: Yup.string().required("نوع الوظيفة مطلوب"),
  candidate_cv_ar: Yup.mixed().required("السيرة الذاتية مطلوبة"),
  // candidate_cv_en: Yup.mixed().required("السيرة الذاتية مطلوبة"),
  candidate_personal_picture: Yup.mixed().required(" الصورة الشخصية مطلوبة"),
  years_of_experience: Yup.mixed().required("عدد سنوات الخبرة مطلوب"),
})

export const validationSchemaCompleteApplication = Yup.object({
  name: Yup.string()
    .matches(/^[\u0600-\u06FF\s]+$/, "يجب أن يكون الاسم باللغة العربية فقط") // This regex checks for Arabic characters and spaces
    .required("الاسم الكامل مطلوب"),
  email: Yup.string()
    .matches(isEmail, "يجب أن يكون بريدًا إلكترونيًا صالحًا")
    .required("البريد الإلكتروني مطلوب"),
  // phone: Yup.string()
  //   .matches(/^[0-9]{9}$/, "رقم الجوال مطلوب")
  //   .required("رقم الجوال مطلوب"),

  phone: Yup.lazy((value, { parent }) => {
    return parent.resident_status && parent.resident_status == "other"
      ? Yup.string().nullable()
      : Yup.string()
          .matches(/^[0-9]{9}$/, "رقم الجوال مطلوب")
          .required("رقم الجوال مطلوب")
  }),
  national_id: Yup.string()
    .matches(/^\d{10}$/, "يجب ان يحتوي رقم الهوية على 10 ارقام")
    .test({
      name: "isValidSaudiID",
      test: (value) => isValidSaudiID(value),

      message: "يرجى ادخال رقم هوية صحيح",
    })
    .required("حقل الهوية مطلوب"),

  owner_national_id: Yup.string()
    .matches(/^\d{10}$/, "يجب ان يحتوي رقم الهوية على 10 ارقام")
    .test({
      name: "isValidSaudiID",
      test: (value) => isValidSaudiID(value),
      message: "يرجى ادخال رقم هوية صحيح",
    })
    .required("حقل الهوية مطلوب"),

  birthdate: Yup.date()
    .required("تاريخ الميلاد مطلوب")
    .max(new Date(), "يرجى ادخال تاريخ ميلاد صحيح"),

  nationality: Yup.string().required("حقل الجنسية مطلوب"),

  address: Yup.string().required("حقل العنوان مطلوب"),
  bank_id: Yup.string().trim().required("حقل البنك مطلوب"),
  account_name: Yup.string().trim().required("اسم الحساب مطلوب"),
  iban: Yup.string()
    .trim()
    .required("حقل الايبان مطلوب")
    .length(24, "حقل الايبان يجب ان يحتوي على 22 رقم"),
  candidate_national_id: Yup.mixed().required("صورة الهوية مطلوبة"),
  candidate_iban: Yup.mixed().required("شهادة الايبان مطلوبة "),
  last_certificate: Yup.mixed().required("شهادة اخر مؤهل دراسي مطلوبة "),
  // national_address: Yup.mixed().required("صورة العنوان الوطني مطلوبة"),

  Passport_photo: Yup.lazy((value, { parent }) => {
    return parent.national_id && parent.national_id.startsWith("1")
      ? Yup.mixed().nullable()
      : Yup.mixed().required("صورة جواز السفر مطلوبة")
  }),
})
