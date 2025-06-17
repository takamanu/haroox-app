export const REGISTER_API_TAG = '[Register API]'
export const REGISTER_SCREEEN_TAG = '[Register Screen]'

export interface RegisterFormInput {
  email: string
  name: string
  password: string
  role: string
}

export interface RegisterResponse {
  status: string
  message: string
}
