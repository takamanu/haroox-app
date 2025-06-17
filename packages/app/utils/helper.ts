import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface ApiResponse {
  data: any
  status: string
  message: string
}

export const HELPER_TAG = '[HELPER]'

export const STAGING_API_URL = 'http://192.168.12.184:8080/api/v1'

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const currencies = ['IDR', 'USD', 'EUR', 'JPY', 'GBP']

export const REPLACE_DEFAULT_OPTIONS: any = {
  experimental: {
    nativeBehavior: 'stack-replace',
    isNestedNavigator: false,
  },
}

export const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export const setUserJWT = async (token: string) => {
  try {
    console.log(HELPER_TAG, ' Done setting token for ', token)
    return await AsyncStorage.setItem('token', token)
  } catch (error) {
    return error
  }
}

export const getUserJWT = async (): Promise<string | null> => {
  try {
    const tokenData = await AsyncStorage.getItem('token')
    if (tokenData == null) {
      return null
    }
    return tokenData
  } catch (error) {
    return error
  }
}

export const removeUserJWT = async (): Promise<boolean> => {
  try {
    console.log(HELPER_TAG, ' Delete token success ')
    await AsyncStorage.removeItem('token')
    return true
  } catch (error) {
    return false
  }
}

export const combineDateAndTime = (date, time) => {
  const currentDate = date.format('YYYY-MM-DD')
  const currentTime = time.format('HH:mm:ss')
  const dateTime = moment(
    `${currentDate} ${currentTime}`,
    'YYYY-MM-DD HH:mm:ss',
  ).format()
  return dateTime
}

export const formatRupiah = (money) => {
  if (money !== undefined && !isNaN(money)) {
    return money.toLocaleString('id-ID')
  } else {
    return '0'
  }
}

export const officeCategories = {
  1: 'Serviced Office',
  2: 'Meeting Room',
  3: 'Board Room',
  4: 'Class Room',
  5: 'Coworking Space (Dedicated)',
  6: 'Coworking Space (Non-Dedicated)',
  7: 'Seminar Room',
  8: 'Theathre Room',
  9: 'Combined Boardroom Meeting Room',
}

export const regionID = {
  1: 'Sahid Sudirman Center',
  2: 'One Pacific Place',
  3: 'Wisma GKBI',
  4: 'AXA Tower',
  5: 'Indonesia Stock Exchange',
}

export const translateBookingStatus = (status) => {
  switch (status) {
    case 1:
      return 'Waiting For Checkout'
    case 2:
      return 'Waiting For Payment'
    case 3:
      return 'Success'
    case 4:
      return 'Failed'
    case 10:
      return 'Canceled by Customer'
    case 11:
      return 'Canceled by Midtrans'
    case 12:
      return 'Expired'
    default:
      return 'Unknown Status'
  }
}

export const translatePaymentStatus = (status) => {
  switch (status) {
    case 1:
      return 'Challenged'
    case 2:
      return 'Received'
    case 3:
      return 'Denied'
    case 4:
      return 'Failure'
    case 5:
      return 'Pending'
    default:
      return 'Unknown Status'
  }
}

export const formatPromoType = (value) => {
  switch (value) {
    case 'direct_discount':
      return 'Direct Discount'
    case 'buy_x_get_x':
      return 'Buy x Get x'
    default:
      return value
  }
}

export const formatPromoTypeColor = (value) => {
  switch (value) {
    case 'direct_discount':
      return 'orange'
    case 'buy_x_get_x':
      return 'blue'
    default:
      return 'green'
  }
}
