import { GET, POST, PUT, PATCH, DELETE } from 'app/utils/httpRequest'

const { REACT_APP_API_URL, REACT_APP_ECOMMERCE_URL } = process.env

export const getHomeData = async () => {
  // const token = localStorage.getItem('token')
  // if (!token) {
  //   throw new Error('No token found')
  // }
  const token = 'tes'
  const url = `${REACT_APP_API_URL}/home`

  const response = await GET(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response
}
