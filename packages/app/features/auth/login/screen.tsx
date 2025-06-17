import { useState, useContext, useEffect } from 'react'
import { View, Text } from 'moti'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { TouchableOpacity, ScrollView, useColorScheme } from 'react-native'
import LogoIndonesianBrain from 'app/ui/assets/logo_indo_brain.svg'
import {
  TextInput as PaperTextInput,
  Button,
  useTheme,
} from 'react-native-paper'
// import Ionicons from '@expo/vector-icons/Ionicons'
import { LoginFormInput } from './entity'
import { useRouter } from 'solito/router/index'
import { TabContext } from 'app/context/tabContext'
import { login } from './service/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  emailPattern,
  REPLACE_DEFAULT_OPTIONS,
  setUserJWT,
} from 'app/utils/helper'
// import { Alert } from 'react-native'
import { BackHandler } from 'react-native'
import { changeScreen, RouteScreen } from 'app/utils/routing'
import { LinearGradient } from 'expo-linear-gradient'
import { HStack, Spacer, VStack } from '@react-native-material/core'

export function LoginScreen() {
  const scheme = useColorScheme()
  const { colors } = useTheme()
  const { push, replace, back } = useRouter()
  const { setActiveTab } = useContext(TabContext)
  const [showPassword, setShowPassword] = useState(false)
  const [isEmailFocused, setIsEmailFocused] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    try {
      setLoading(true)
      const newData = {
        ...data,
      }
      const resData = await login(newData)
      console.log(resData)
      if (resData.status === 'fail' && resData.message) {
        setError('password', {
          type: 'manual',
          message: resData.message,
        })
      } else {
        const routing: RouteScreen = changeScreen('Beranda')
        setActiveTab(routing.name)
        replace(routing.route, undefined, REPLACE_DEFAULT_OPTIONS)
      }
    } catch (error) {
      setError('password', {
        type: 'manual',
        message: (error as Error).message,
      })
    } finally {
      setLoading(false)
    }
  }

  const backAction = () => {
    const routing: RouteScreen = changeScreen('HomeAuth')
    setActiveTab(routing.name)
    replace(routing.route, undefined, REPLACE_DEFAULT_OPTIONS)
    return true
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction)
  }, [])

  return (
    <LinearGradient colors={['#e1f5fe', 'rgba(255, 255, 255, 0.9)', '#f3e5f5']}>
      <VStack h="100%">
        <View className="space-y-6 px-6">
          <HStack mb={24} mt={48} items="center" spacing={8}>
            <LogoIndonesianBrain />
            <Text className="text-xl font-bold">HAROOX</Text>
          </HStack>

          <VStack spacing={12}>
            <Text className="mb-4 text-xl font-bold text-[#414549]">Masuk</Text>
            <Text className="mb-6 text-gray-500">Masuk untuk Melanjutkan</Text>

            <View className="space-y-6">
              <View className="space-y-1">
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
                      className="h-14 w-full bg-white"
                      autoCapitalize='none'
                      outlineStyle={{
                        borderRadius: 8,
                        borderColor: '#CDD1D4',
                      }}
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
                  <Text className="text-red-500">Email tidak valid.</Text>
                )}
              </View>

              <View className="space-y-1">
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <PaperTextInput
                      label="Kata Sandi"
                      secureTextEntry={!showPassword}
                      mode="outlined"
                      // style={{ marginBottom: 16, width: '100%' }}
                      className="h-14 w-full bg-white"
                      outlineStyle={{
                        borderRadius: 8,
                        borderColor: '#CDD1D4',
                      }}
                      theme={{ colors: { primary: '#2B3FA8' } }}
                      onBlur={() => {
                        onBlur()
                        setIsPasswordFocused(false)
                      }}
                      onFocus={() => setIsPasswordFocused(true)}
                      onChangeText={onChange}
                      value={value}
                      error={!!errors.password}
                      right={
                        <PaperTextInput.Icon
                          icon={showPassword ? 'eye' : 'eye-off'}
                          onPress={() => setShowPassword(!showPassword)}
                          color={isPasswordFocused ? colors.primary : 'gray'}
                        />
                      }
                    />
                  )}
                  name="password"
                />
                {errors.password && (
                  <Text className="text-red-500">
                    {errors.password.message
                      ? errors.password.message.toString()
                      : 'Password diperlukan.'}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                onPress={() => {
                  const routing: RouteScreen = changeScreen('SendEmail')
                  setActiveTab(routing.name)
                  replace(routing.route, undefined, REPLACE_DEFAULT_OPTIONS)
                }}
                className="mb-8 self-end text-[#2A3A85]"
              >
                <Text className="text-xs font-semibold text-[#2B3FA8]">
                  Lupa Kata Sandi?
                </Text>
              </TouchableOpacity>
            </View>

            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid}
              className={`mb-4 w-full rounded-md ${isValid ? 'bg-[#2B3FA8]' : 'bg-gray-400'
                }`}
              loading={loading ? true : false}
            >
              Masuk
            </Button>
          </VStack>
        </View>

        <Spacer />

        <VStack p={20} items="center">
          <Text className="text-center text-xs text-gray-500">
            Dengan melanjutkan, Anda setuju dengan{' '}
          </Text>
          <HStack>
            <Text className="text-xs text-gray-500 underline">
              syarat dan ketentuan layanan
            </Text>
            <Text className="text-xs text-gray-500"> dan </Text>
            <Text className="text-xs text-gray-500 underline">
              kebijakan privasi
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </LinearGradient>
  )
}
