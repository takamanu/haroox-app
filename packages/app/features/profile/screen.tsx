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
import { removeUserJWT } from 'app/utils/helper'
import { changeScreen, RouteScreen } from 'app/utils/routing'
import { getProfile } from './service/api'
import { GetProfileData } from './entity.js'

export function ProfileScreen() {
  const [activeLink, setActiveLink] = useState<string>('')
  const { setActiveTab } = useContext(TabContext)
  const { push, replace } = useRouter()
  const [profileData, setProfileData] = useState<GetProfileData | null>(null)


  // useEffect(() => {
  //   setActiveTab('Profil')
  // })

  const handleLogout = async () => {
    try {
      const result = await removeUserJWT()
      if (result) {
        linkTo('HomeAuth')
        console.log(' Logout with success')
      } else {
        linkTo('HomeAuth')
        console.log(' Logout with not success')
      }
    } catch (error) {
      linkTo('HomeAuth')
      console.error(' Logout with error: ', error)
    }
  }

  useEffect(() => {
    getProfileData()
  }, [])

  const getProfileData = async () => {
    try {
      const resData = await getProfile()

      console.log("RES DATA ====>", resData)

      var profileData: GetProfileData = {
        name: resData.data.username,
        email: resData.data.email,
        city: resData.data.city,
        gender: resData.data.gender,
        image: resData.data.image,
        role: resData.data.role,
        level: resData.data.role
      }
      setProfileData(profileData)


      // if (resData.status === 'fail' && resData.message) {
      //   var messageData: ScreenMessage = {
      //     error: true,
      //     message: resData.message,
      //   }
      //   setScreenMessage(messageData)
      // } else {
      //   var profileData: GetProfileData = {
      //     name: resData.data.name,
      //     city: resData.data.city,
      //     gender: resData.data.gender,
      //     image: resData.data.image,
      //     role: resData.data.role,
      //     level: resData.data.level
      //   }
      //   setProfileData(profileData)
      //   // push('/auth/login')
      // }
    } catch (error) {
      // var messageData: ScreenMessage = {
      //   error: true,
      //   message: (error as Error).message,
      // }
      // setScreenMessage(messageData)
    }
  }

  const linkTo = (param: string) => {
    console.log('Navigate to: ', param)
    var dataUser = 'tes'
    const routing: RouteScreen = changeScreen(param)
    setActiveTab(routing.name)
    replace(
      routing.name === 'EditProfile'
        ? `${routing.route}/${dataUser}`
        : routing.route,
      undefined,
      {
        experimental: {
          nativeBehavior: 'stack-replace',
          isNestedNavigator: false,
        },
      },
    )
  }

  const dummyLaptopURL =
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGVzayUyMHdpdGglMjBsYXB0b3B8ZW58MHx8MHx8fDA%3D'

  const Content = () => {
    return (
      <ScrollView className="bg-gray-100" showsVerticalScrollIndicator={false}>
        <View className="h-40 items-start justify-start rounded-t-xl bg-blue-600">
          <Text className="ml-7 mt-14 text-xl font-bold text-white">
            Profil Saya
          </Text>
        </View>
        <View className="p-5">
          <View className="-mt-10 items-center rounded-xl bg-white p-5 shadow-lg">
            <Image
              className="h-24 w-24 rounded-full"
              source={{ uri: dummyLaptopURL }}
              alt="Photo"
            />
            <Text className="mt-2 text-xl font-semibold">{profileData?.name}</Text>
            <Text className="text-gray-500">{profileData?.email}</Text>
            <View className="mt-2 rounded-full bg-yellow-200 px-3 py-1">
              <Text className="text-yellow-600">{profileData?.role}</Text>
            </View>
          </View>
          {/* <TouchableOpacity
            className="mt-5 flex-row items-center justify-between rounded-md px-5 py-3"
            onPress={() => {
              linkTo('EditProfile')
            }}
          >
            <View className="flex-row items-center">
              <Ionicons name="pencil" size={20} color="gray" />
              <Text className="ml-2 text-gray-600">Ubah Profil</Text>
            </View>
            <Ionicons name="arrow-forward" size={20} color="gray" />
          </TouchableOpacity> */}
          <View className="my-3 h-px bg-gray-300"></View>
          <TouchableOpacity
            className="mt-3 flex-row items-center justify-center rounded-md border-2 border-red-600 px-5 py-3"
            onPress={() => {
              handleLogout()
            }}
          >
            <Text className="text-md font-bold text-red-500">Keluar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
  return <Content />
}
