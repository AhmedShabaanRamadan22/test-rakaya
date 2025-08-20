import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Cookies from "js-cookie"

function useFetch({ endpoint, enabled, select, queryKey, onError, onSuccess }) {
  const config = {
    headers: {
      // Authorization: authorizationHeader,
    },
  }
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

  const sendErrorToSlack = async (error) => {
    const webHookUrl =
      "https://hooks.slack.com/services/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"

    const separator = "------------------------------------"
    const keys = ["data", "status", "headers"]
    let texts = []

    texts.push(`🚨 Error Occurred:`)
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

  const query = useQuery({
    queryKey,
    queryFn: () => axios.get(`${baseUrl}/${endpoint}`, config),
    enabled,
    select,
    onError: (error) => {
      console.error("Error occurred:", error)

      // إرسال الخطأ إلى Slack
      sendErrorToSlack(error)

      if (onError) {
        onError(error)
      }
    },
    onSuccess,
  })

  return query
}

export default useFetch
