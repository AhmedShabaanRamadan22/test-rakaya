import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import Cookies from "js-cookie"

export function useMutate({
  endpoint,
  mutationKey,
  onError,
  onSuccess,
  formData,
  onMutate,
  method = "post",
}) {
  const [uploadProgress, setUploadProgress] = useState(0)
  const user_token = Cookies.get("token")
  const token = user_token
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

  // Function to send errors to Slack
  const sendErrorToSlack = async (error) => {
    const webHookUrl =
      "https://hooks.slack.com/services/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"

    const separator = "------------------------------------"
    let texts = []

    texts.push(`🚨 Mutation Error:`)
    texts.push(`\nURL: ${error.response?.config?.url || "Unknown"}\n`)
    texts.push(
      `\nRequest Headers: ${JSON.stringify(
        error.request?._headers || "No Headers"
      )}\n`
    )
    texts.push(`\nError Message: ${error.message}\n`)
    if (error.response?.config?.data) {
      texts.push(
        `\nRequest Body: ${JSON.stringify(error.response.config.data)}\n`
      )
    }
    texts.push(separator)

    try {
      await axios.post(webHookUrl, {
        text: texts.join("\n"),
      })
    } catch (slackError) {
      console.error("Failed to send error to Slack:", slackError)
    }
  }

  const {
    data,
    isLoading,
    isSuccess,
    mutate,
    failureReason,
    isError,
    isPending,
  } = useMutation({
    mutationKey,
    mutationFn: (values) => {
      const requestConfig = {
        method: method.toUpperCase(),
        url: `${baseUrl}/${endpoint}`,
        data: values,
        headers: formData
          ? {
              "Content-Type": "multipart/form-data",
              // Authorization: authorizationHeader,
              // 'Accept-Language': isRTL ? 'ar' : 'en',
            }
          : {
              "Content-Type": "application/json; charset=utf-8",
              // Authorization: authorizationHeader,
              // 'Accept-Language': isRTL ? 'ar' : 'en',
            },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          setUploadProgress(percentCompleted) // Update upload progress state
        },
      }

      return axios(requestConfig)
    },
    onSuccess,
    onError: (error) => {
      console.error("Error occurred:", error)

      // Send error to Slack
      sendErrorToSlack(error)

      if (onError) {
        onError(error)
      }
    },
    onMutate,
  })

  return {
    data,
    isLoading,
    isSuccess,
    mutate,
    failureReason,
    isError,
    isPending,
    uploadProgress,
  }
}
