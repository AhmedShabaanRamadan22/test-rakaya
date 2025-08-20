import axios from "axios"

const fetchData = async (endpoint, language) => {
  const config = {
    headers: {
      "Accept-Language": language || "ar",
    },
  }
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  try {
    const response = await axios.get(`${baseUrl}/${endpoint}`, config)
    return response.data
  } catch (error) {
    if (error.response) {
      return {
        status: error.response.status,
        message: error.response.data?.message || "حدث خطأ أثناء جلب البيانات",
      }
    } else {
      return {
        status: 500,
        message: "حدث خطأ في الاتصال بالسيرفر",
      }
    }
  }
}

export default fetchData
