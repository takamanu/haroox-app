import { useState, useContext, useEffect } from 'react'
import { View, Text } from 'moti'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from 'react-native'
import LogoIndonesiaBrain from 'app/ui/assets/logo_indo_brain.svg'
import {
  TextInput as PaperTextInput,
  Button,
  useTheme,
} from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons'
// import { LoginFormInput } from '../entity'
import { useRouter } from 'solito/router/index'
import { TabContext } from 'app/context/tabContext'
import { login, sendEmail } from '../service/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  emailPattern,
  REPLACE_DEFAULT_OPTIONS,
  setUserJWT,
} from 'app/utils/helper'
import { Alert } from 'react-native'
import { BackHandler } from 'react-native'
import { changeScreen, RouteScreen } from 'app/utils/routing'
import { SendEmailRequest } from '../entity.js'
import { LinearGradient } from 'expo-linear-gradient'

export function SendEmailScreen() {
  const scheme = useColorScheme()
  const { colors } = useTheme()
  const { push, replace, back } = useRouter()
  const { setActiveTab } = useContext(TabContext)
  const [showPassword, setShowPassword] = useState(false)
  const [isEmailFocused, setIsEmailFocused] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<SendEmailRequest> = async (data) => {
    try {
      setLoading(true)
      const newData = { ...data }

      return Alert.alert(
        'Success!',
        `Email sent to ${data.email}, please check your email for the next step. `,
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'Ok', onPress: () => setEmailSent(true) },
        ],
      )
      const resData = await sendEmail(newData)

      if (resData.status === 'fail' && resData.message) {
        setError('email', {
          type: 'manual',
          message: resData.message,
        })
      } else {
        // const routing: RouteScreen = changeScreen('Beranda')
        // setActiveTab(routing.name)
        // replace(routing.route, undefined, REPLACE_DEFAULT_OPTIONS)
      }
    } catch (error) {
      setError('email', {
        type: 'manual',
        message: (error as Error).message,
      })
    } finally {
      setLoading(false)
    }
  }

  const backAction = () => {
    const routing: RouteScreen = changeScreen('Login')
    setActiveTab(routing.name)
    replace(routing.route, undefined, REPLACE_DEFAULT_OPTIONS)
    return true
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction)
  }, [])

  return (
    <LinearGradient colors={['#e1f5fe', 'rgba(255, 255, 255, 0.9)', '#f3e5f5']}>
      <ScrollView className="h-full" showsVerticalScrollIndicator={false}>
        <View className="px-6">
          <View className="mb-6 mt-12 flex flex-row items-center space-x-2">
            <LogoIndonesiaBrain />
            <Text className="text-xl font-bold">HARROX</Text>
          </View>

          {emailSent ? (
            <View className="flex-1 items-center">
              <Ionicons name="mail" size={50} color="#2B3FA8" />
              <Text className="mt-4 text-xl font-bold">Email Terkirim!</Text>
              <Text className="mt-2 text-center text-gray-500">
                Periksa kotak masuk Anda untuk langkah selanjutnya dalam proses
                pemulihan.
              </Text>
              <Button
                mode="outlined"
                onPress={() => {
                  setEmailSent(false)
                  backAction()
                }}
                className="mt-6 w-full rounded-md p-2"
              >
                Kembali
              </Button>
            </View>
          ) : (
            <>
              <View className="mt-6 flex-1 items-start">
                <Text className="mb-4 text-2xl font-bold text-[#414549]">
                  Lupa kata sandi?
                </Text>
                <Text className="mb-6 text-gray-500">
                  Masukkan email Anda untuk mengatur ulang kata sandi dengan
                  mudah.
                </Text>

                <Controller
                  control={control}
                  rules={{
                    required: true,
                    pattern: emailPattern,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <PaperTextInput
                      label="Email"
                      keyboardType="email-address"
                      mode="outlined"
                      className="mb-5 h-14 w-full bg-white"
                      outlineStyle={{ borderRadius: 8, borderColor: '#CDD1D4' }}
                      theme={{ colors: { primary: '#2B3FA8' } }}
                      // style={{ marginBottom: 16, width: '100%', height: }}
                      onBlur={() => {
                        onBlur()
                        setIsEmailFocused(false)
                      }}
                      onFocus={() => setIsEmailFocused(true)}
                      onChangeText={onChange}
                      value={value}
                      error={!!errors.email}
                    />
                  )}
                  name="email"
                />
                {errors.email && (
                  <Text className="mb-4 text-red-500">Email tidak valid.</Text>
                )}

                <Button
                  mode="contained"
                  onPress={handleSubmit(onSubmit)}
                  disabled={!isValid}
                  className={`mb-4 w-full rounded-md ${isValid ? 'bg-[#2B3FA8]' : 'bg-gray-400'
                    }`}
                  loading={loading ? true : false}
                >
                  Reset Kata Sandi
                </Button>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  )
}
