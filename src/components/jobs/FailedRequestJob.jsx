import Link from "next/link";
import React from "react";
import Button from "../Button";

function FailedRequestJob({ message }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center my-5 gap-3">
      <div className="text-center">
        <p className="fw-bold p-0 m-0">{message} </p>
      </div>
      <div>
        <Link href={"/"}>
          <Button color="secondary">العودة للصفحة الرئيسية</Button>
        </Link>
      </div>
    </div>
  );
}

export default FailedRequestJob;
