import React, { useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { A, H1, P, Text, TextLink } from 'app/design/typography'
import { Row } from 'app/design/layout'
import { View } from 'app/design/view'
import { MotiLink } from 'solito/moti'
import { Image } from 'app/design/image'
import { ImageBackground } from 'app/design/image'
import { Linking } from 'react-native'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import Layout from 'app/ui/layout/layout'
import { useEffect, useContext } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { TabContext } from 'app/context/tabContext'
import { useRouter } from 'solito/router/index'
import { useForm } from 'react-hook-form'
import { TextInput } from 'react-native'
import { Controller } from 'react-hook-form'
import { emailPattern } from 'app/utils/helper'
import { TextInput as PaperTextInput, Button } from 'react-native-paper'
import { useTheme } from 'react-native-paper'
import { EditProfileRequest, GetProfileData, ScreenMessage } from '../entity'
import { getProfile } from '../service/api'

export function ProfileEditScreen() {
  const [screenMessage, setScreenMessage] = useState<ScreenMessage | null>(null)
  const [profileData, setProfileData] = useState<GetProfileData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { setActiveTab } = useContext(TabContext)
  const { push, replace, back } = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // useEffect(() => {
  //   setActiveTab('Profil')
  // })
  const theme = useTheme()

  useEffect(() => {
    getProfileData()
  }, [])


  const getProfileData = async () => {
    try {
      setLoading(true)
      const resData = await getProfile()

      if (resData.status === 'fail' && resData.message) {
        var messageData: ScreenMessage = {
          error: true,
          message: resData.message,
        }
        setScreenMessage(messageData)
      } else {
        var profileData: GetProfileData = {
          name: resData.data.name,
          city: resData.data.city,
          gender: resData.data.gender,
          image: resData.data.image,
          role: resData.data.role,
        }
        setProfileData(profileData)
        // push('/auth/login')
      }
    } catch (error) {
      var messageData: ScreenMessage = {
        error: true,
        message: (error as Error).message,
      }
      setScreenMessage(messageData)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = (data: EditProfileRequest) => {
    console.log(data)
    var messageData: ScreenMessage = {
      error: false,
      message: 'Profile berhasil disimpan',
    }
    setScreenMessage(messageData)
  }

  const linkTo = (url: string) => {
    console.log('Navigate to: ', url)
    setActiveTab(url)
    if (url == 'Login') {
      replace('/(auth)/login')
    } else if (url == 'HomeAuth') {
      replace('/(auth)/auth_home', '/(auth)/auth_home', {
        experimental: {
          nativeBehavior: 'stack-replace',
          isNestedNavigator: true,
        },
      })
    } else if (url == 'Profil') {
      replace('/profile', undefined, {
        experimental: {
          nativeBehavior: 'stack-replace',
          isNestedNavigator: true,
        },
      })
    }
  }

  console.log("cek profile", profileData)

  const dummyLaptopURL =
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGVzayUyMHdpdGglMjBsYXB0b3B8ZW58MHx8MHx8fDA%3D'

  const Content = () => {
    return (
      <ScrollView className="bg-gray-100" showsVerticalScrollIndicator={false}>
        <View className="mt-10 p-5">
          <TouchableOpacity
            className="mb-10 flex-row items-center"
            onPress={() => {
              linkTo('Profil')
            }}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
            <Text className="ml-2 text-lg font-semibold">Profil Saya</Text>
          </TouchableOpacity>
          <View className="mb-4 flex-row items-center">
            <Image
              className="h-24 w-24 rounded-full"
              source={{ uri: dummyLaptopURL }}
              alt="Profile Photo"
            />
            <TouchableOpacity className="ml-4 rounded-md border-2 border-blue-600 px-4 py-2">
              <Text className="text-blue-600">Ubah Foto</Text>
            </TouchableOpacity>
          </View>
          <View className="mb-5 mt-10 h-px bg-gray-300"></View>
          <View>
            <Controller
              control={control}
              rules={{
                required: 'Email tidak boleh kosong.',
                pattern: emailPattern,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <PaperTextInput
                  label="Email"
                  mode="outlined"
                  className="mb-5 h-16 w-full"
                  keyboardType="email-address"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.email}
                />
              )}
              name="email"
              defaultValue={profileData?.email}
            />
            {errors.email && (
              <Text className="mb-4 text-red-500">
                {errors.email.message?.toString()}
              </Text>
            )}

            <Controller
              control={control}
              rules={{ required: 'Nama tidak boleh kosong.' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <PaperTextInput
                  label="Nama"
                  mode="outlined"
                  className="mb-5 h-16 w-full"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.nama}
                />
              )}
              name="nama"
              defaultValue={profileData?.name}
            />
            {errors.nama && (
              <Text className="mb-4 text-red-500">
                {errors.nama.message?.toString()}
              </Text>
            )}

            <Controller
              control={control}
              rules={{ required: 'Kota tidak boleh kosong.' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <PaperTextInput
                  label="Kota"
                  mode="outlined"
                  className="mb-5 h-16 w-full"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.kota}
                />
              )}
              name="kota"
              defaultValue={profileData?.city}
            />
            {errors.kota && (
              <Text className="mb-4 text-red-500">
                {errors.kota.message?.toString()}
              </Text>
            )}

            <Controller
              control={control}
              rules={{ required: 'Institusi tidak boleh kosong.' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <PaperTextInput
                  label="Institusi"
                  mode="outlined"
                  className="h-16 w-full"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.institusi}
                />
              )}
              name="institusi"
              defaultValue=""
            />
            {errors.institusi && (
              <Text className="mb-4 text-red-500">
                {errors?.institusi?.message?.toString()}
              </Text>
            )}

            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              disabled={Object.keys(errors).length !== 0}
              className={`mb-4 mt-5 w-full rounded-md p-2 ${Object.keys(errors).length !== 0
                ? 'bg-[#2B3FA8]'
                : 'bg-gray-400'
                }`}
              loading={loading ? true : false}
            >
              Daftar
            </Button>

            {screenMessage ? (
              <View
                style={{
                  marginTop: 16,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 16,
                  borderRadius: 8,
                  backgroundColor: screenMessage.error
                    ? 'rgba(255,0,0,0.2)'
                    : 'rgba(217, 242, 225, 1)',
                }}
              >
                <Text style={{ color: 'black' }}>{screenMessage.message}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setScreenMessage(null)
                  }}
                >
                  <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>
      </ScrollView>
    )
  }

  return <Content />
}
