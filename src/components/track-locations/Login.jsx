import { Form, Formik } from "formik"
import React, { useState } from "react"
import BaseInputField from "../form/BaseInputField"
import LoginIcon from "./LoginIcon"
import Button from "../Button"
import {
  adminEmail,
  albeitEmail,
  correctPassword,
  ithraaAljoudEmail,
  ithraaEmail,
  MakkahEmail,
  novotelEmail,
  rawafMinaEmail,
} from "@/utils/Helpers"
import Image from "next/image"
import Link from "next/link"

function Login({ setAuth }) {
  const [error, setError] = useState("")
  const handleSubmit = (values) => {
    if (values.email == adminEmail && values.password == correctPassword) {
      setAuth(true)
      localStorage.setItem("isAuth", "true")
      localStorage.setItem("type", "admin")
      localStorage.setItem("user", JSON.stringify({ email: values.email }))
    } else if (
      values.email == ithraaEmail &&
      values.password == correctPassword
    ) {
      setAuth(true)
      localStorage.setItem("isAuth", "true")
      localStorage.setItem("type", "ithraa")
      localStorage.setItem("user", JSON.stringify({ email: values.email }))
    } else if (
      values.email == novotelEmail &&
      values.password == correctPassword
    ) {
      setAuth(true)
      localStorage.setItem("isAuth", "true")
      localStorage.setItem("type", "novotel")
      localStorage.setItem("user", JSON.stringify({ email: values.email }))
    } else if (
      values.email == rawafMinaEmail &&
      values.password == correctPassword
    ) {
      setAuth(true)
      localStorage.setItem("isAuth", "true")
      localStorage.setItem("type", "rawafMina")
      localStorage.setItem("user", JSON.stringify({ email: values.email }))
    } else if (
      values.email == MakkahEmail &&
      values.password == correctPassword
    ) {
      setAuth(true)
      localStorage.setItem("isAuth", "true")
      localStorage.setItem("type", "Makkah")
      localStorage.setItem("user", JSON.stringify({ email: values.email }))
    } else if (
      values.email == ithraaAljoudEmail &&
      values.password == correctPassword
    ) {
      setAuth(true)
      localStorage.setItem("isAuth", "true")
      localStorage.setItem("type", "ithraaAljoud")
      localStorage.setItem("user", JSON.stringify({ email: values.email }))
    } else {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة")
    }
  }

  return (
    <div>
      <Formik initialValues={{}} onSubmit={(values) => handleSubmit(values)}>
        <Form>
          <div
            style={{
              height: "100vh",
            }}
            className="row"
          >
            <div
              className="col-12 col-xl-3"
              style={{
                borderLeft: "1px solid #C9B171",
                padding: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div>
                <Link
                  href={"/"}
                  className="d-flex align-items-center justify-content-center"
                >
                  <Image
                    alt="logo"
                    src={"/track/Logo.png"}
                    width={180}
                    height={100}
                  />
                </Link>
                <div className="text-center mt-3">
                  <p>اهلا بعودتك</p>
                  <p>قم بتسجيل الدخول للمتابعة</p>
                </div>
                <BaseInputField
                  name={"email"}
                  label={"البريد الإلكتروني"}
                  placeholder={"email@rakaya.sa"}
                  required
                />
                <BaseInputField
                  name={"password"}
                  label={"كلمة المرور"}
                  placeholder={"********"}
                  type="password"
                  required
                />
                {error && (
                  <div className="text-danger" style={{ margin: "10px 0" }}>
                    {error}
                  </div>
                )}
                <div
                  className="my-4  "
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    color="secondary"
                    type="submit"
                    isLoading={false}
                    style={{ width: "100%" }}
                    // onClick={handleSubmit}
                  >
                    تسجيل الدخول
                  </Button>
                </div>
              </div>
            </div>
            <div
              className="col-12 col-xl-9 d-none d-xl-flex"
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <LoginIcon />
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default Login
