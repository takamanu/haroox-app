import { GET, POST, PUT, PATCH, DELETE } from 'app/utils/httpRequest'
import { ApiResponse, STAGING_API_URL } from 'app/utils/helper'
import { SendEmailRequest, FORGOT_PASSWORD_API_TAG } from '../entity'
import axios from 'axios'

export const sendEmail = async (
  data: SendEmailRequest,
): Promise<ApiResponse> => {
  const url = `${STAGING_API_URL}/users/forgot-password`
  try {
    const response = await axios.post<ApiResponse>(url, data)
    console.log(`${FORGOT_PASSWORD_API_TAG} Response:`, response.data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        `${FORGOT_PASSWORD_API_TAG} Error response:`,
        error.response?.data,
      )
      throw new Error(error.response?.data.message || 'An error occurred')
    } else {
      console.error(`${FORGOT_PASSWORD_API_TAG} Unexpected error:`, error)
      throw new Error('An unexpected error occurred')
    }
  }
}
