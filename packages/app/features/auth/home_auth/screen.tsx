import { useEffect } from 'react'
import { View, Text } from 'moti'
import { Alert, BackHandler, Image, TouchableOpacity } from 'react-native'
import LogoIndonesiaBrain from 'app/ui/assets/logo_indo_brain.svg'
import PhoneHome from 'app/ui/assets/phone_home.png'
import { useRouter } from 'solito/router/index'
import { useContext } from 'react'
import { TabContext } from 'app/context/tabContext'
import { changeScreen, RouteScreen } from 'app/utils/routing'
import { REPLACE_DEFAULT_OPTIONS } from 'app/utils/helper'
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage';

export function HomeAuthScreen() {
  const { push, replace } = useRouter()
  const { setActiveTab } = useContext(TabContext)

  const handlePress = (param: string) => {
    const routing: RouteScreen = changeScreen(param)
    setActiveTab(routing.name)
    replace(routing.route, undefined, REPLACE_DEFAULT_OPTIONS)
  }

  const backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'YES', onPress: async () => {
          BackHandler.exitApp()
          // reset asycnstorage currentRoute
          await AsyncStorage.clear()
        }
      },
    ])
    return true
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction)
  }, [])

  return (
    <LinearGradient colors={['#e1f5fe', 'rgba(255, 255, 255, 0.9)', '#f3e5f5']}>
      <View className="flex h-full items-center justify-center px-6">
        <View className="mb-16 flex flex-row items-center space-x-2">
          <LogoIndonesiaBrain className="h-20 w-20" />
          <Text className="text-2xl font-bold">HARROX</Text>
        </View>

        <Image className="mb-16" source={PhoneHome} width={245} height={212} />
        <Text className="mb-10 mt-10 text-2xl font-bold text-[#414549]">
          Selamat Datang!
        </Text>

        <TouchableOpacity
          onPress={() => handlePress('Login')}
          className="mb-4 w-full rounded-lg bg-[#2B3FA8] py-3"
        >
          <Text className="text-center text-lg text-white">Masuk</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePress('Register')}>
          <Text className="text-base text-[#414549]">
            Belum punya akun?{' '}
            <Text className="text-base font-bold text-[#2B3FA8]">Daftar</Text>
          </Text>
        </TouchableOpacity>

        <View className="absolute bottom-4 w-full flex-row items-center justify-center">
          <Text className="text-center text-xs text-gray-500">
            Dengan melanjutkan, Anda setuju dengan{' '}
            <Text className="underline">syarat dan ketentuan layanan</Text> dan{' '}
            <Text className="underline">kebijakan privasi</Text>
          </Text>
        </View>
      </View>
    </LinearGradient>
  )
}
