import Button from "@/components/Button"
import { ConnectedFocusError } from "focus-formik-error"
import { Form, Formik } from "formik"
import React, { useState } from "react"
import { validationSchemaCompleteApplication } from "../initialValue&Validation"
import Section from "../Section"
import AttachmentsMainData from "./AttachmentsMainData"
import BankInformationMainData from "./BankInformationMainData"
import PersonalInformationMainData from "./PersonalInformationMainData"

function Main({ dataCandidate, loadingData, updateData }) {
  const [check, setCheck] = useState(false)

  const initialValuesCompleteApplication = {
    name: dataCandidate?.name || "",
    email: dataCandidate?.email || "",
    phone: dataCandidate?.phone || "",
    resident_status: dataCandidate?.resident_status || "",
    national_id: dataCandidate?.national_id || "",
    ramz: dataCandidate?.code || "",
    nationality: dataCandidate?.nationality || "",
    birthdate: dataCandidate?.birthdate || "",
    address: dataCandidate?.address || "",
    bank_id: dataCandidate?.bank_information?.bank_id || "",
    account_name: dataCandidate?.bank_information?.account_name || "",
    iban: dataCandidate?.bank_information?.iban || "",
    candidate_portfolio: dataCandidate?.iban || "",
    scrub_size: dataCandidate?.scrub_size || "",
    owner_national_id: dataCandidate?.bank_information?.owner_national_id || "",
    candidate_portfolio: dataCandidate?.attachment_candidate_profile_personal,
    candidate_iban: dataCandidate?.attachment_candidate_iban,
    candidate_national_id: dataCandidate?.attachment_candidate_national_id,
    last_certificate:
      dataCandidate?.attachment_candidate_education_certification,
    national_address: dataCandidate?.attachment_candidate_national_address,
    Passport_photo: dataCandidate?.attachment_candidate_passport,
    courses_certificate:
      dataCandidate?.attachment_candidate_course_certification,
    experience_certificate:
      dataCandidate?.attachment_candidate_experience_certification,
    driving_license_photo: dataCandidate?.attachment_candidate_driving_license,
  }
  const handelSubmit = (values) => {
    const {
      candidate_iban,
      candidate_portfolio,
      candidate_national_id,
      Passport_photo,
      last_certificate,
      courses_certificate,
      experience_certificate,
      driving_license_photo,
      national_address,
      ...rest
    } = values

    let submissionValues = {
      ...rest,
      ...(candidate_portfolio?.type
        ? { "attachments[33]": candidate_portfolio }
        : {}),
      ...(candidate_national_id?.type
        ? { "attachments[46]": candidate_national_id }
        : {}),
      ...(candidate_iban?.type ? { "attachments[45]": candidate_iban } : {}),
      ...(Passport_photo?.type ? { "attachments[52]": Passport_photo } : {}),
      ...(last_certificate?.type
        ? { "attachments[48]": last_certificate }
        : {}),
      ...(courses_certificate?.type
        ? { "attachments[49]": courses_certificate }
        : {}),
      ...(experience_certificate?.type
        ? { "attachments[50]": experience_certificate }
        : {}),
      ...(driving_license_photo?.type
        ? { "attachments[53]": driving_license_photo }
        : {}),
      ...(national_address?.type
        ? { "attachments[54]": national_address }
        : {}),
    }
    updateData(submissionValues)

    delete values.ramz
  }
  return (
    <div>
      <Formik
        initialValues={initialValuesCompleteApplication}
        validationSchema={validationSchemaCompleteApplication}
        onSubmit={(values) => handelSubmit(values)}
      >
        <Form>
          <ConnectedFocusError />
          <Section
            title={"المعلومات الشخصية"}
            subtitle={
              " يرجى التأكد  من المعلومات الشخصية  حسب الوثائق الحكومية"
            }
          >
            <PersonalInformationMainData />
          </Section>
          <Section
            title={"معلومات الحساب البنكي"}
            subtitle={"يفضل أن يكون بيانات الحساب البنكي  لنفس الشخص المتقدم "}
          >
            <BankInformationMainData />
          </Section>
          <Section title={"مرفقات أخرى"}>
            <div className="d-flex align-items-center gap-1 ">
              <p className="m-0 p-0 ">
                في حالة رفع اكثر من ملف الرجاء دمجهم في ملف واحد وارفاقهم
              </p>
            </div>
            <AttachmentsMainData setCheck={setCheck} check={check} />
            <div className="my-4">
              <Button
                color="secondary"
                type="submit"
                isLoading={loadingData}
                disabled={!check}
              >
                اكمال البيانات
              </Button>
            </div>
          </Section>
        </Form>
      </Formik>
    </div>
  )
}

export default Main
