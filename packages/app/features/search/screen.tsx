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
import { useEffect } from 'react'
export function SearchScreen() {
  const [activeLink, setActiveLink] = useState<string>('')

  useEffect(() => {
    setActiveLink('Profil')
  }, [])

  const dummyLaptopURL =
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGVzayUyMHdpdGglMjBsYXB0b3B8ZW58MHx8MHx8fDA%3D'

  const Content = () => {
    return (
      <ScrollView className="bg-gray-100 p-5">
        <View className="mb-8">
          <View className="rounded-b-2xl bg-gradient-to-b from-purple-800 to-red-800 p-6">
            <Text className="text-lg font-semibold text-white">
              Profil Saya
            </Text>
          </View>

          <View className="mx-4 -mt-12 rounded-xl bg-white p-4 shadow-lg">
            <View className="flex-row items-center">
              <Image
                source={{ uri: dummyLaptopURL }} // Replace with your image URI
                className="h-16 w-16 rounded-full"
                alt="test"
              />
              <View className="ml-4">
                <Text className="text-xl font-semibold">Ibrahim Ramadan</Text>
                <Text className="text-gray-500">ibrahim.ramadan@gmail.com</Text>
              </View>
              <TouchableOpacity className="ml-auto">
                <Text className="text-black-1000">✎</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="mx-4 my-4 rounded-lg border-2 border-yellow-500 bg-yellow-100 p-4">
            <Text className="text-black-700">Anda belum verifikasi data.</Text>
            <TouchableOpacity>
              <Text className="text-blue-600">Verifikasi Data Sekarang</Text>
            </TouchableOpacity>
          </View>

          <View className="mx-4 mb-10">
            <Text className="my-4 text-2xl font-semibold">
              Kartu Tanda Anggota
            </Text>
            <Image
              source={{ uri: dummyLaptopURL }} // Replace with your image URI
              className="h-48 w-full rounded-lg"
              alt="kartu_tanda_anggota"
            />
          </View>

          <View className="mx-4 rounded-lg bg-white p-4 shadow-md">
            <Text className="mb-2 text-center text-gray-500">
              Dapatkan kartu Anggota dengan memverifikasi data.
            </Text>
            <TouchableOpacity className="rounded-md bg-blue-600 py-3">
              <Text className="text-center font-semibold text-white">
                Verifikasi Data
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
  return <Content />
}
