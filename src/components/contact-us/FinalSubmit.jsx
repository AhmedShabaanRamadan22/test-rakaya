import Link from "next/link";
import React from "react";
import Button from "../Button";

function FinalSubmit() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center my-5 gap-3">
      <div className="d-flex align-items-center justify-content-center  ">
        <p className="p-0 m-0 fw-bold"> شكرا لك </p>
      </div>
      <div className="text-center">
        <p className="fw-bold p-0 m-0">
          تم استلام طلبك بنجاح! ويسعدنا أن نتواصل معك في أقرب وقت ممكن
        </p>
      </div>
      <div>
        <Link href={"/"}>
          <Button color="secondary">العودة للصفحة الرئيسية</Button>
        </Link>
      </div>
    </div>
  );
}

export default FinalSubmit;
