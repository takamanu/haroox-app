import { GET, POST, PUT, PATCH, DELETE } from 'app/utils/httpRequest'
import { ApiResponse, getUserJWT, STAGING_API_URL } from 'app/utils/helper'
import axios from 'axios'
import { PROFILE_API_TAG } from '../entity'

const { REACT_APP_API_URL, REACT_APP_ECOMMERCE_URL } = process.env

export const getProfile = async (): Promise<ApiResponse> => {
  const url = `${STAGING_API_URL}/auth/profile`

  let token = await getUserJWT()
  try {
    const response = await axios.get<ApiResponse>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(`${PROFILE_API_TAG} Response:`, response.data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`${PROFILE_API_TAG} Error response:`, error.response?.data)
      throw new Error(error.response?.data.message || 'An error occurred')
    } else {
      console.error(`${PROFILE_API_TAG} Unexpected error:`, error)
      throw new Error('An unexpected error occurred')
    }
  }
}
