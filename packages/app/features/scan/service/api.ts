import { GET, POST, PUT, PATCH, DELETE } from 'app/utils/httpRequest'
import { ApiResponse, getUserJWT, STAGING_API_URL } from 'app/utils/helper'
import axios from 'axios'
import { PROFILE_API_TAG } from '../entity'

const { REACT_APP_API_URL, REACT_APP_ECOMMERCE_URL } = process.env


export const getComponentByBatch = async (id): Promise<ApiResponse> => {
  const url = `${STAGING_API_URL}/components/batch/${id}`
  
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

export const getProductByBatch = async (id): Promise<ApiResponse> => {
  const url = `${STAGING_API_URL}/products/batch/${id}`
  
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
