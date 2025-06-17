export const PROFILE_API_TAG = '[Products API]'
export const PROFILE_SCREEEN_TAG = '[Products Screen]'

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

export type ProductFormData = {
  creator: string
  productName: string
  productBatch: string
  productOrigin: string
  productTotalValue: string
  productCurrentLocation: string
  productCurrentProcess: string
  productExpiredDate: string // We'll handle as string input
}
