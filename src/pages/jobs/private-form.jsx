import React from "react"
import NewJobForm from "./job-application"

function PrivateJobApplication() {
  const jobStatus = false

  return <NewJobForm jobStatus={jobStatus} />
}

export default PrivateJobApplication
