import axios from 'axios'

const axiosInstance = axios.create()

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // localStorage.removeItem('token')
      // window.location.href = "/admin/login";
    }
    return Promise.reject(error)
  },
)

export const GET = (url: string, config) => {
  return axios.get(url, config)
}

export const POST = (url: string, data: any, config?: any) => {
  return axios.post(url, data, config)
}

export const PUT = (url: string, data, config) => {
  return axios.put(url, data, config)
}

export const PATCH = (url: string, data, config) => {
  return axios.patch(url, data, config)
}

export const DELETE = (url: string, config) => {
  return axios.delete(url, config)
}
