import React from "react"
import { Formik, Form } from "formik"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Button from "@/components/Button"
import Line from "@/components/Line"
import LoadingOverlay from "@/components/LoadingOverlay"
import JobsLayout from "@/components/jobs/JobsLayout"
import ReceivingOrder from "@/components/jobs/ReceivingOrder"
import Section from "@/components/jobs/Section"
import { ConnectedFocusError } from "focus-formik-error"
import { usePostData } from "@/hooks/usePostData"
import MainFormStepOne from "@/components/jobs/MainFormStepOne"
import MainFormStepTwo from "@/components/jobs/MainFormStepTow"
import MainFormStepThree from "@/components/jobs/MainFormStepThree"
import TermsConditionIcon from "@/components/icons/TermsConditionIcon"
import {
  initialValues,
  validationSchema,
} from "@/components/jobs/initialValue&Validation"

function NewJobForm({ jobStatus }) {
  const stopJob = jobStatus ? jobStatus : false
  const { postData, isLoading, isSuccess, responseData } =
    usePostData("/candidate")
  const receivingOrderVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }
  const handleSubmit = async (values) => {
    const {
      candidate_cv_ar,
      candidate_cv_en,
      candidate_portfolio,
      candidate_personal_picture,
      ...rest
    } = values
    const submissionValues = {
      ...rest,
      "attachments[31]": candidate_cv_ar,
      "attachments[51]": candidate_cv_en,
      "attachments[32]": candidate_portfolio,
      "attachments[33]": candidate_personal_picture,
    }

    try {
      await postData(submissionValues)
    } catch (error) {
      toast.error("هناك خطأٌ ما! الرجاء المحاولة لاحقا", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  return (
    <JobsLayout>
      <div>
        {isSuccess ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={receivingOrderVariants}
          >
            <ReceivingOrder code={responseData?.code} />
          </motion.div>
        ) : (
          <>
            {isLoading && <LoadingOverlay />}
            {stopJob ? (
              <div className="d-flex flex-column align-items-center justify-content-center">
                <p>
                  <TermsConditionIcon />
                </p>
                <p className="text_Dark" style={{ fontWeight: "500" }}>
                  نعتذر منك
                </p>
                <p className="text_Dark" style={{ fontWeight: "500" }}>
                  تم ايقاف التقديم على الوظائف
                </p>
              </div>
            ) : (
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <ConnectedFocusError />
                  <Section title="القسم الأول" subtitle="معلوماتي الشخصية">
                    <MainFormStepOne />
                  </Section>
                  <Line />
                  <Section title="القسم الثاني" subtitle="الأسئلة">
                    <p className="fw-bold">عرفنا عن نفسك أكثر</p>
                    <MainFormStepTwo />
                  </Section>
                  <Line />
                  <Section title="القسم الثالث" subtitle="السيرة الذاتية">
                    <MainFormStepThree />
                    <div className="my-4">
                      <Button
                        color="secondary"
                        type="submit"
                        isLoading={isLoading}
                      >
                        إرسال
                      </Button>
                    </div>
                  </Section>
                </Form>
              </Formik>
            )}
          </>
        )}
      </div>
    </JobsLayout>
  )
}

export default NewJobForm
