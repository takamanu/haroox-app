import { GET, POST, PUT, PATCH, DELETE } from 'app/utils/httpRequest'
import { ApiResponse, getUserJWT, STAGING_API_URL } from 'app/utils/helper'
import axios from 'axios'
import { PROFILE_API_TAG } from '../entity'

const { REACT_APP_API_URL, REACT_APP_ECOMMERCE_URL } = process.env

export const createProduct = async (request): Promise<ApiResponse> => {
  const url = `${STAGING_API_URL}/components`
  try {
    console.log("URL REQ ====>", url)
    request.user_id = 1
    request.company_id= 1
    request.company_delivery_id= 1
    console.log("DATA ====>", request)

    let token = await getUserJWT() 
    console.log("DATA ====>", token)

    const response = await axios.post<ApiResponse>(url, request, {
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

export const getUserComponents = async (): Promise<ApiResponse> => {
  const url = `${STAGING_API_URL}/components/user`
  
  
  try {
    console.log(` URL:`, url)
    console.log(` JWT:`,  await getUserJWT())

    let accessToken =  await getUserJWT()
    
    const response = await axios.get<ApiResponse>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
    
    console.log(` Response:`, response.data)
    return response.data
    
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(` Error response:`, error.response?.data)
      throw new Error(error.response?.data.message || 'An error occurred')
    } else {
      console.error(` Unexpected error:`, error)
      throw new Error('An unexpected error occurred')
    }
  }
}
