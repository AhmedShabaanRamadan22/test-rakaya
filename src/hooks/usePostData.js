import { useState } from "react";
import axios from "axios";

/**
 * @param {string} endpoint
 * @returns
 */
export function usePostData(endpoint) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);
  // const baseUrl = "https://front-api.rmcc.sa/api";
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;;


  const postData = async (formData) => {
    setIsLoading(true);
    setIsSuccess(false);
    setError(null);
    setResponseData(null);
    try {
      const response = await axios.post(`${baseUrl}${endpoint}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsLoading(false);
      setIsSuccess(true);
      setResponseData(response.data);
      return response.data;
    } catch (err) {
      setError(err);
      setIsLoading(false);
      setIsSuccess(false);
      throw err;
    }
  };

  return { postData, isLoading, isSuccess, error, responseData };
}
