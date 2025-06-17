import { GET, POST, PUT, PATCH, DELETE } from 'app/utils/httpRequest'
import { STAGING_API_URL } from 'app/utils/helper'
import { RegisterFormInput } from '../entity'
import axios from 'axios'
import { RegisterResponse, REGISTER_API_TAG } from '../entity'
import { ApiResponse } from 'app/utils/helper'

const { REACT_APP_API_URL, REACT_APP_ECOMMERCE_URL } = process.env

export const register = async (
  data: RegisterFormInput,
): Promise<ApiResponse> => {
  const url = `${STAGING_API_URL}/users/register`
  try {
    const response = await axios.post<ApiResponse>(url, data)
    console.log(`${REGISTER_API_TAG} Response:`, response.data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`${REGISTER_API_TAG} Error response:`, error.response?.data)
      throw new Error(error.response?.data.message || 'An error occurred')
    } else {
      console.error(`${REGISTER_API_TAG} Unexpected error:`, error)
      throw new Error('An unexpected error occurred')
    }
  }
}
