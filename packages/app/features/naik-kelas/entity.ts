import type { DocumentPickerResult } from 'expo-document-picker'

export interface MemberLevelCardProps {
  level: string
  type?: 'main' | 'verifikasi'
}

export const dummy_requirements = [
  {
    id: 1,
    title: '1 practical research / activity based',
    checked: false,
  },
  {
    id: 2,
    title: '1 paper of vertical expertise',
    checked: false,
  },
  {
    id: 3,
    title: 'Provide lectures at a minimum of 5 different campuses',
    checked: false,
  },
]

export interface BuktiUploadButtonProps {
  onPress: () => void
}

export type DocPickerRes = DocumentPickerResult & {
  order: number
  nameFile: string,
  isUploading: boolean
  isSuccess: boolean
}

export interface UploadFileSectionProps {
  handleSend: () => void
}
