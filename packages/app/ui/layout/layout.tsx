import { View, Text } from 'react-native'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { useState, useEffect, useCallback } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { TabContext } from 'app/context/tabContext'
import { getUserJWT } from 'app/utils/helper'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'solito/router/index'
import Header from './header'
import Footer from './footer'
import * as Linking from 'expo-linking'
import { useContext } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PaperProvider } from 'react-native-paper'

const Layout = ({ children }) => {
  const { replace } = useRouter()
  const insets = useSafeArea()
  const [activeTab, setActiveTab] = useState('')
  const [currentRoute, setCurrentRoute] = useState('');


  // const tabsWithHeaderAndFooter = ['Beranda', 'NaikKelas']
  // const tabsWithOnlyFooter = ['Profil', 'Article']

  // const showHeaderAndFooter = (activeTab: string): boolean => {
  //   return tabsWithHeaderAndFooter.includes(activeTab)
  // }

  // const showOnlyFooter = (activeTab: string): boolean => {
  //   return tabsWithOnlyFooter.includes(activeTab)
  // }

  // Fungsi untuk mendapatkan URL saat ini

  useEffect(() => {
    // Ambil route dari AsyncStorage saat komponen di-render
    const fetchCurrentRoute = async () => {
      try {
        const savedRoute = await AsyncStorage.getItem('currentRoute');
        if (savedRoute) {
          setCurrentRoute(savedRoute);
        }
      } catch (error) {
        console.error('Gagal membaca route dari AsyncStorage:', error);
      }
    };

    fetchCurrentRoute();
  }, []);

  const checkAuth = async () => {
    try {
      const tokenData = await getUserJWT()
      if (tokenData == null) {
        replace('/(auth)/auth_home', undefined, {
          experimental: {
            nativeBehavior: 'stack-replace',
            isNestedNavigator: true,
          },
        })
      } else {
        const savedRoute = await AsyncStorage.getItem('currentRoute');
        if (savedRoute == null) {
          setCurrentRoute("Beranda");
        }
      }
    } catch (error) {
      setActiveTab('HomeAuth')
      replace('/(auth)/auth_home', undefined, {
        experimental: {
          nativeBehavior: 'stack-replace',
          isNestedNavigator: true,
        },
      })
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <LinearGradient
      colors={['#e1f5fe', 'rgba(255, 255, 255, 0.8)', '#f3e5f5']}
    // style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <View className={`h-full w-full pb-[${insets.bottom}px]}`}>
        {/* <Text style={{ color: '#000', fontSize: 16 }}>Aplikasi Mobile Pertama</Text> */}
        {/* {showHeaderAndFooter(activeTab) && <Header />} */}
        <Header />
        <PaperProvider>

          {children}
        </PaperProvider>

        <Footer activeTab={currentRoute} />
        {/* {(showHeaderAndFooter(activeTab) || showOnlyFooter(activeTab)) && (
        )} */}
      </View>
    </LinearGradient>
  )
}

export default Layout
