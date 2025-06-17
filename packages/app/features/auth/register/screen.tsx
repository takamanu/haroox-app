import { useState } from 'react'
import { View, Text } from 'moti'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { useColorScheme } from 'nativewind'
import LogoIndonesianBrain from 'app/ui/assets/logo_indo_brain.svg'
// import Ionicons from '@expo/vector-icons/Ionicons'
import { RegisterFormInput } from './entity'
// import * as api from './service/api'
import {
  emailPattern,
  REPLACE_DEFAULT_OPTIONS,
  // Response,
} from 'app/utils/helper'
import { useRouter } from 'solito/router/index'
import { useContext, useEffect } from 'react'
import { TabContext } from 'app/context/tabContext'
import axios from 'axios'
import { register } from './service/api'
import {
  TextInput as PaperTextInput,
  Button,
  useTheme,
} from 'react-native-paper'
import { BackHandler } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { HStack, VStack } from '@react-native-material/core'

export function RegisterScreen() {
  const scheme = useColorScheme()
  const { colors } = useTheme()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isEmailFocused, setIsEmailFocused] = useState(false)
  const [isNameFocused, setIsNameFocused] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false)

  const { push, replace } = useRouter()
  const { setActiveTab } = useContext(TabContext)
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setError,
  } = useForm({
    mode: 'onChange',
  })

  const password = watch('password', '')
  const confirmPassword = watch('confirmPassword', '')

  const onSubmit: SubmitHandler<RegisterFormInput> = async (data) => {
    try {
      setLoading(true)
      const newData = { ...data, role: 'user' }
      const resData = await register(newData)

      if (resData.status === 'fail' && resData.message) {
        setError('email', {
          type: 'manual',
          message: resData.message,
        })
      } else {
        setActiveTab('Login')
        replace('/(auth)/auth_home', undefined)
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
    setActiveTab('HomeAuth')
    replace('/(auth)/auth_home', undefined, REPLACE_DEFAULT_OPTIONS)
    return true
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction)
  }, [])

  return (
    <LinearGradient colors={['#e1f5fe', 'rgba(255, 255, 255, 0.9)', '#f3e5f5']}>
      <ScrollView
        contentContainerStyle={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        className="h-full"
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6">
          <View className="mb-6 mt-12 flex-row items-center justify-start space-x-2">
            <LogoIndonesianBrain />
            <Text className="text-xl font-bold">HARROX</Text>
          </View>

          <View className="flex-1 items-start">
            <Text className="mb-4 text-2xl font-bold text-[#414549]">
              Daftar
            </Text>
            <Text className="mb-6 text-gray-500">
              Nikmati berbagai macam keuntungan dengan menjadi anggota.
            </Text>

            <VStack spacing={36} w="100%">
              <View className="w-full space-y-6">
                <View className="w-full space-y-1">
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
                        onChangeText={onChange}
                        value={value}
                        error={!!errors.email}
                      />
                    )}
                    name="email"
                  />
                  {errors.email && (
                    <Text className="text-red-500">
                      {errors.email.message
                        ? errors.email.message.toString()
                        : `Email tidak valid.`}
                    </Text>
                  )}
                </View>

                <View className="w-full space-y-1">
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <PaperTextInput
                        label="Nama Lengkap"
                        keyboardType="default"
                        mode="outlined"
                        className="h-14 w-full bg-white"
                        outlineStyle={{
                          borderRadius: 8,
                          borderColor: '#CDD1D4',
                        }}
                        theme={{ colors: { primary: '#2B3FA8' } }}
                        onChangeText={onChange}
                        value={value}
                        error={!!errors.name}
                      />
                    )}
                    name="name"
                  />
                  {errors.name && (
                    <Text className="text-red-500">
                      Nama lengkap diperlukan.
                    </Text>
                  )}
                </View>

                <View className="w-full space-y-1">
                  <Controller
                    control={control}
                    rules={{ required: true, minLength: 8 }}
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
                          // setIsPasswordFocused(false)
                        }}
                        // onFocus={() => setIsPasswordFocused(true)}
                        onChangeText={onChange}
                        value={value}
                        error={!!errors.password}
                        right={
                          <PaperTextInput.Icon
                            icon={showPassword ? 'eye' : 'eye-off'}
                            onPress={() => setShowPassword(!showPassword)}
                          // color={isPasswordFocused ? colors.primary : 'gray'}
                          />
                        }
                      />
                    )}
                    name="password"
                  />
                  {errors.password && (
                    <Text className="text-red-500">
                      Kata sandi diperlukan dan minimal 8 karakter.
                    </Text>
                  )}
                  <Text className="text-xs text-gray-500">
                    Gunakan minimal 8 karakter dengan kombinasi huruf dan angka
                  </Text>
                </View>

                <View className="w-full space-y-1">
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                      validate: (value) =>
                        value === password || 'Kata sandi tidak sesuai.',
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <PaperTextInput
                        label="Konfirmasi Kata Sandi"
                        secureTextEntry={!showConfirmPassword}
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
                        }}
                        onChangeText={onChange}
                        value={value}
                        error={!!errors.confirmPassword}
                        right={
                          <PaperTextInput.Icon
                            icon={showConfirmPassword ? 'eye' : 'eye-off'}
                            onPress={() =>
                              setShowConfirmPassword(!showPassword)
                            }
                          // color={isPasswordFocused ? colors.primary : 'gray'}
                          />
                        }
                      />
                    )}
                    name="confirmPassword"
                  />
                  {errors.confirmPassword && (
                    <Text className="text-red-500">
                      {errors.confirmPassword?.message?.toString()}
                    </Text>
                  )}
                </View>
              </View>

              <Button
                mode="contained"
                onPress={handleSubmit(onSubmit)}
                disabled={!isValid}
                className={`mb-4 w-full rounded-md ${isValid ? 'bg-[#2B3FA8]' : 'bg-gray-400'
                  }`}
                loading={loading ? true : false}
              >
                Daftar
              </Button>
            </VStack>
          </View>
        </View>

        <VStack items="center" p={20}>
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
      </ScrollView>
    </LinearGradient>
  )
}
