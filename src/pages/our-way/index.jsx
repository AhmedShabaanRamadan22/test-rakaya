import Container from "@/components/Container";
import CustomHead from "@/components/CustomHead";
import Header from "@/components/jobs/Header";
import React from "react";

const Section = ({ title, children }) => (
  <Container className="m-0 p-0">
    <h1>{title}</h1>
    <p>{children}</p>
  </Container>
);

const TeamMember = ({ title, job }) => (
  <div className="col-6 col-lg-3 d-flex d-lg-block flex-column align-items-center">
    <h5 className="fw-semibold fs-5 my-0">{title}</h5>
    <h5 className="text-body-tertiary fw-regular fs-6">{job}</h5>
  </div>
);

function Index() {
  const description =
    "تأكيدًا لالتزامنا بتقديم الخدمة الممتازة، في ركايا نعدك كشريك لنا ونبدأ معك بخطة زمنية واضحة لضمان تحقيق أهدافك بكفاءة وفعالية. يمكنك التواصل معنا إبتداءً من البريد الإلكتروني أو أي طريقة تواصل أخرى متوفرة على موقعنا.";

  return (
    <>
      <CustomHead title={"طريقك معنا"} description={description} />

      <Header text={"طريقك معنا"} />

      <Container className="col-lg-6  p-3 p-md-0  mt-5">
        <p
          className="m-0 p-0 text_Dark"
          style={{ textAlign: "justify", fontWeight: "500" , lineHeight:"2" }}
        >
          تأكيدًا لالتزامنا بتقديم الخدمة الممتازة، في ركايا نعدك كشريك لنا
          ونبدأ معك بخطة زمنية واضحة لضمان تحقيق أهدافك بكفاءة وفعالية. يمكنك
          التواصل معنا إبتداءً من البريد الإلكتروني أو أي طريقة تواصل أخرى
          متوفرة على موقعنا.
        </p>
        <p
          className="m-0 p-0 my-3 text_Dark"
          style={{ textAlign: "justify", fontWeight: "500" , lineHeight:"2"  }}
        >
          فريقنا يقوم بترتيب اجتماع عن بُعد معك للاستماع إلى متطلباتك وتحديد
          احتياجاتك، ومن ثم يقوم بتلخيص أهم النقاط وتحديد الأولويات. بعد ذلك،
          يرفع الفريق النقاط الرئيسية للاستشاري ويجتمع معك مجددًا للنقاش ومعرفة
          التطلعات والأولويات لبحث حلول للمشكلات وصياغة الحلول المناسبة.
        </p>
        <p
          className="m-0 p-0 text_Dark"
          style={{ textAlign: "justify", fontWeight: "500" , lineHeight:"2"  }}
        >
          نحن نلتزم بتقديم الحلول والتوصيات الملائمة لاحتياجاتك، مع وضع خطط
          تحسينية وآليات واضحة لمتابعة تنفيذها وتقييم النتائج. نحن نعمل جنبًا
          إلى جنب معك خطوة بخطوة كداعمين وممكنين لضمان تحقيق أفضل النتائج وتلبية
          تطلعاتك واحتياجاتك بشكل مثالي.{" "}
        </p>
      </Container>
    </>
  );
}

export default Index;
