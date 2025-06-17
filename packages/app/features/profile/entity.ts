export const PROFILE_API_TAG = '[Profile API]'
export const PROFILE_SCREEEN_TAG = '[Profile Screen]'

export interface EditProfileRequest {
  email: string
  name: string
  city: string
  intuition: string
}

export interface GetProfileData {
  name: string
  city: string
  gender: string
  image: string
  role: string
  email?: string
  level?: string
}

export interface ScreenMessage {
  error: boolean
  message: string
}
