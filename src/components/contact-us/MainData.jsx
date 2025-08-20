import { isEmail } from "@/utils/Helpers";
import { ConnectedFocusError } from "focus-formik-error";
import { Form, Formik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import Button from "../Button";
import LoadingOverlay from "../LoadingOverlay";
import BaseInputField from "../form/BaseInputField";
import PhoneInput from "../form/PhoneInput";
import SelectHelp from "../form/SelectHelp";
import TextArea from "../form/TextArea";
import { DarkModeContext } from "@/context/DarkModeContext";

function MainData({ isLoading, postData }) {
  const [showPopup, setShowPopup] = useState(false);
  const { isDarkMode } = useContext(DarkModeContext);

  const handleSubmit = async (values) => {
    try {
      const response = await postData(values);
      setShowPopup(true);
    } catch (error) {
      // console.error("Error posting data:", error);
    }
  };

  const initialFormValues = {
    name: "",
    message: "",
    email: "",
    phone: "",
    phone_code: "",
    subject_id: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("الاسم مطلوب"),
    message: Yup.string().required(" هذا الحقل مطلوب"),
    email: Yup.string()
      .matches(isEmail, "يجب أن يكون بريدًا إلكترونيًا صالحًا")
      .required("البريد الإلكتروني مطلوب"),
    phone: Yup.string()
      .matches(/^[0-9]{9}$/, "رقم الجوال مطلوب")
      .required("رقم الجوال مطلوب"),
    subject_id: Yup.string().required("هذا الحقل مطلوب"),
  });
  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showPopup]);
  return (
    <div className="my-5">
      {isLoading && <LoadingOverlay />}{" "}
      <AnimatePresence>
        {showPopup && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                position: "fixed",
                top: 0,
                transform: "none",
                left: 0,
                overflow: "hidden",
                width: "100%",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 50, // تأكد من أنه أقل من zIndex للبوب آب
              }}
            />
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.5,
                translateX: "-50%",
                translateY: "-50%",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                translateX: "-50%",
                translateY: "-50%",
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5 }}
              className="popup"
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: showPopup ? "translate(-50%, -50%)" : "none",
                background: "white",
                padding: "20px",
                zIndex: 100,
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
            >
              <div className="text-center d-flex flex-column gap-4">
                <p className="p-0 m-0">شكرا لك</p>
                <p className="p-0 m-0">
                  سوف نحاول التواصل معك في أقرب وقت ممكن.
                </p>
                <Button color="primary" onClick={() => setShowPopup(false)}>
                  إغلاق
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {() => (
          <Form>
            <ConnectedFocusError />
            <SectionTitle text="بماذا نستطيع مساعدتك؟" />
            <SelectHelp
              label="تحديده بدقّة يساعدنا في فهم طلبك بشكل أفضل"
              labelClassName="fw-normal"
            />

            <SectionTitle text="الآن، اكتب لنا بتفصيل أكثر عمّا تريد إرساله لنا" />
            <TextArea
              label="اكتب بأكبر قدر من التفاصيل. كلّما اهتممت بالتفاصيل، كلّما سهل علينا الرد عليك ومساعدتك"
              name="message"
              rows={6}
            />

            {/* <SectionTitle text="الاسم" /> */}
            <BaseInputField
              name="name"
              label="الاسم"
              placeholder=" الاسم الأول والأخير - او الجهة التي تنتمي إليها"
            />

            <PhoneInput label="رقم الجوال" />

            {/* <SectionTitle text="البريد الإلكتروني" /> */}
            <BaseInputField
              name="email"
              label="البريد الإلكتروني"
              placeholder="email@rakaya.sa"
            />
            <div className="mt-3">
              <Button
                color={isDarkMode ? "primary" : "secondary"}
                className=""
                type="submit"
              >
                إرسال
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

// A separate component for section titles to improve readability
const SectionTitle = ({ text }) => (
  <h1
    className="my-4 text_Dark"
    style={{ fontSize: "18px", fontWeight: "bold" }}
  >
    {text}
  </h1>
);

export default MainData;
