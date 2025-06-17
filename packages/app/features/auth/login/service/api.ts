import { GET, POST, PUT, PATCH, DELETE } from 'app/utils/httpRequest'
import { ApiResponse, setUserJWT, STAGING_API_URL } from 'app/utils/helper'
import { LOGIN_API_TAG, LoginFormInput } from '../entity'
import axios from 'axios'

export const login = async (data: LoginFormInput): Promise<ApiResponse> => {
  const url = `${STAGING_API_URL}/auth/login`
  try {
    const response = await axios.post<ApiResponse>(url, data)
        setUserJWT(response.data.data.token.access_token)


    // // Ambil header 'Set-Cookie'
    // const setCookieHeader = response.headers['set-cookie'];

    // if (setCookieHeader) {
    //   // Cari cookie yang mengandung accessToken
    //   const accessTokenCookie = setCookieHeader.find(cookie => cookie.startsWith('access_token='));

    //   if (accessTokenCookie) {
    //     // Ambil nilai accessToken dengan memisahkan bagian sebelum ';'
    //     const accessToken = accessTokenCookie.split(';')[0]?.split('=')[1] || ''; // Ambil setelah '='

    //     setUserJWT(accessToken)
    //     console.log('Access Token:', accessToken);
    //   }
    // }

    console.log(`${LOGIN_API_TAG} Response:`, response.data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`${LOGIN_API_TAG} Error response:`, error.response?.data)
      throw new Error(error.response?.data.message || 'An error occurred')
    } else {
      console.error(`${LOGIN_API_TAG} Unexpected error:`, error)
      throw new Error('An unexpected error occurred')
    }
  }
}
