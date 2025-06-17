import React, { useEffect, useState, useContext } from 'react'
import { ScrollView, View } from 'moti'
import HomeContent from './ui/homeContent'
import * as homeApi from './service/api'
import { getUserJWT, removeUserJWT } from 'app/utils/helper'
import { useRouter } from 'solito/router/index'
import { TabContext } from 'app/context/tabContext'
import { Alert, Text } from 'react-native'
import { BackHandler } from 'react-native'
import { changeScreen, RouteScreen } from 'app/utils/routing'
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GetProfileData, ScreenMessage } from '../profile/entity'
import { getProfile } from '../profile/service/api'

export function HomeScreen() {
  const { push, replace } = useRouter()
  const { setActiveTab } = useContext(TabContext)
  const [screenMessage, setScreenMessage] = useState<ScreenMessage | null>(null)
  const [memberLevel, setMemberLevel] = useState<string>('Researcher')
  const [memberName, setMemberName] = useState<string>('Ibrahim Ramadhan')
  const [memberNumber, setMemberNumber] = useState<string>('8887-9989')
  const [profileData, setProfileData] = useState<GetProfileData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [memberExpirationDate, setMemberExpirationDate] =
    useState<string>('06-29')
  const [selected, setSelected] = useState({
    practicalResearch: false,
    paperExpertise: false,
    lectures: false,
  })
  const [errorMessage, setErrorMessage] = useState('')

  const toggleCheckbox = (key: string) => {
    setSelected({ ...selected, [key]: !selected[key] })
    setErrorMessage('')
  }

  const getHomeData = async () => {
    try {
      const getJWT = await getUserJWT()
      if (getJWT == null) {
        setActiveTab('HomeAuth')
        replace('/(auth)/auth_home', undefined, {
          experimental: {
            nativeBehavior: 'stack-replace',
            isNestedNavigator: true,
          },
        })
      }
      console.log('Get JWT', getJWT)
      // const response: Response = await homeApi.getHomeData()
    } catch (error) { }
  }

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
      await AsyncStorage.clear()
    } catch (error) {
      linkTo('HomeAuth')
      console.error(' Logout with error: ', error)
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

  const backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress: () => {
          handleLogout()
        },
      },
    ])
    return true
  }

  useEffect(() => {
    // getHomeData()
    BackHandler.addEventListener('hardwareBackPress', backAction)
    // push('/auth/auth_home')
  })

  useEffect(() => {
    getProfileData()
  }, [])


  const getProfileData = async () => {
    try {
      setLoading(true)
      const resData = await getProfile()

      console.log("RES DATA ====>", resData)

      var profileData: GetProfileData = {
        name: resData.data.username,
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

  const handleRequestNaikKelas = () => {
    if (
      !selected.practicalResearch ||
      !selected.paperExpertise ||
      !selected.lectures
    ) {
      setErrorMessage('Semua syarat harus dicentang untuk naik kelas.')
    } else {
      setErrorMessage('')
      alert('Kamu berhasil naik kelas!')
      // Handle the request to naik kelas
    }
  }

  console.log("cek profile", profileData)

  return (
    <LinearGradient colors={['#e1f5fe', 'rgba(255, 255, 255, 0.9)', '#f3e5f5']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {/* <Gradient/> */}
          <HomeContent
            memberLevel={profileData?.level as string}
            memberName={profileData?.name as string}
            memberNumber={memberNumber}
            memberExpirationDate={memberExpirationDate}
            selected={selected}
            toggleCheckbox={toggleCheckbox}
            handleRequestNaikKelas={handleRequestNaikKelas}
            errorMessage={errorMessage}
            linkTo={linkTo}
          />
        </View>
        {/* <Text>test</Text> */}
      </ScrollView>
    </LinearGradient>
  )
}
