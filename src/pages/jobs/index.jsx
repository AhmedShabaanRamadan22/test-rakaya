/* eslint-disable react/no-unescaped-entities */
import Button from "@/components/Button";
import Container from "@/components/Container";
import JobsLayout from "@/components/jobs/JobsLayout";
import { DarkModeContext } from "@/context/DarkModeContext";
import Link from "next/link";
import React, { useContext } from "react";

const Jobs = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  return (
    <>
      <JobsLayout>
        <div className="">
          <Container className="m-auto  col-md-7 ">
            <h2 className="text_Dark">عن العمل في ركايا</h2>

            <div className="my-4">
              <p
                className="p-0 m-0 text-justify text_Dark"
                style={{ fontWeight: "500" }}
              >
                "في ركايا، نتعهد بتقديم مجموعة من المزايا الوظيفية التي تتيح لك
                الحرية في اختيار مكان وزمان عملك. لا نفرض عليك الحاجة للعمل من
                مقرنا الرئيسي في مكة المكرمة أو التقيد بجدول زمني صارم، بل نركز
                على تقديم مزايا تنافسية لضمان توفير بيئة عمل محفزة ومرنة. للمزيد
                من المعلومات حول هذه المزايا وكيفية الاستفادة منها، يرجى الرجوع
                إلى{" "}
                <Link href="/rakaya" className={isDarkMode ? "text-gold" :"text-secondary"}>
                  ركايا البديعة{" "}
                </Link>
                ."
              </p>
            </div>
          </Container>
          <Container className=" col-md-7 m-auto">
            <h2 className="text_Dark">متطلبات العمل</h2>

            <div className="my-4">
              <p
                className="p-0 m-0 text-justify text_Dark"
                style={{ fontSize: "20px", fontWeight: "bold" }}
              >
                في ركايا، نحرص على توفير بيئة عمل متساوية وشاملة، حيث لا نميز
                بين الأفراد على أساس الجنسية، الجنس، أو العمر.
              </p>
              <p
                className="p-0 m-0 text-justify text_Dark"
                style={{ fontSize: "20px", fontWeight: "bold" }}
              >
                كما أننا في ركايا لا نضع شروطاً صارمة بخصوص الشهادات الأكاديمية،
                الخبرة العملية الطويلة، أو الإقامة داخل المملكة العربية
                السعودية.
              </p>
              <p
                className="p-0 m-0 text-justify text_Dark"
                style={{ fontWeight: "500" }}
              >
                "مع ذلك، لا نقلل من أهمية هذه العوامل، لكن من الجدير بالذكر أن
                العديد من موظفينا البارزين وأساسات شركتنا انضموا إلينا حديثي
                التخرج من الجامعة، أو حتى قبل دخولهم الجامعة."
              </p>
              <p
                className="p-0 m-0 my-4 text-justify text_Dark"
                style={{ fontWeight: "500" }}
              >
                في ركايا، نعتبر القدرة على التحرك والإنجاز بشكل ذاتي من أهم
                الصفات التي نبحث عنها في المتقدمين. نقدّر الأشخاص القادرين على
                إنجاز مهامهم، البحث عن الجديد، وأداء واجباتهم بدون الحاجة إلى
                متابعة مستمرة. نشجعك على أن تكون مسؤولاً وفضولياً وسؤولاً.
              </p>

              <p
                className="p-0 m-0 mt-4 text-justify text_Dark"
                style={{ fontWeight: "500" }}
              >
                نحن في ركايا نسعى لضم أفراد يتقاسمون معنا نفس الرؤية والأهداف
                للانضمام إلى فريق عملنا في شركة تهدف إلى إعادة تعريف معايير
                الشركات الناشئة والصغيرة.
              </p>
              <p
                className="p-0 m-0 text-justify text_Dark"
                style={{ fontWeight: "500" }}
              >
                إذا كنت متحمساً للانضمام إلى رحلتنا في بناء مستقبل ركايا وترغب
                في العمل ضمن فريقنا، نرجو منك ملء النموذج التالي.
              </p>
            </div>
          </Container>
          <Container className=" col-12 text-center">
            <Link href={"/jobs/job-application"}>
              <Button className="px-5 py-2">التقديم</Button>
            </Link>
          </Container>
        </div>
      </JobsLayout>
    </>
  );
};

export default Jobs;
