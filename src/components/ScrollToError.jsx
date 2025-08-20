import { useEffect } from "react"
import { useFormikContext } from "formik"

function ScrollToError() {
  const { errors, isSubmitting } = useFormikContext()

  useEffect(() => {
    if (isSubmitting && Object.keys(errors).length > 0) {
      const errorField = document.querySelector(
        `[name="${Object.keys(errors)[0]}"]`
      )
      if (errorField) {
        errorField.scrollIntoView({ behavior: "smooth" })
        errorField.focus()
      }
    }
  }, [isSubmitting, errors])

  return null
}

export default ScrollToError
