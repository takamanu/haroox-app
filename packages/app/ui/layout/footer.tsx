import { A, Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { use, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'solito/router'
import { changeScreen, RouteScreen } from 'app/utils/routing'
import { REPLACE_DEFAULT_OPTIONS } from 'app/utils/helper'
import IconHomePasive from 'app/ui/assets/icon/home_pasive.svg'
import IconHomeActive from 'app/ui/assets/icon/home_active.svg'
import IconNaikKelasPasive from 'app/ui/assets/icon/naik_kelas_pasive.svg'
import IconNaikKelasActive from 'app/ui/assets/icon/naik_kelas_active.svg'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Footer({ activeTab }) {
  const { push, replace } = useRouter()

  const handlePress = async (param) => {
    try {
      // Simpan route yang diklik ke AsyncStorage
      await AsyncStorage.setItem('currentRoute', param);

      // Lakukan navigasi ke route yang baru
      const routing = changeScreen(param);
      replace(routing.route, undefined, REPLACE_DEFAULT_OPTIONS);
    } catch (error) {
      console.error('Gagal menyimpan route ke AsyncStorage:', error);
    }
  };

  return (
    <View className="fixed bottom-0 left-0 right-0 z-10 flex-row justify-around border-t border-gray-200 bg-white p-4">
      <TouchableOpacity
        onPress={() => handlePress('Beranda')}
        className="items-center"
      >
        {activeTab === 'Beranda' ? <IconHomeActive /> : <IconHomePasive />}
        <Text
          className={`text-center ${activeTab === 'Beranda' ? 'text-blue-500' : 'text-black'
            }`}
        >
          Beranda
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePress('Scan')}
        className="items-center"
      >
        {activeTab === 'NaikKelas' ? (
          <IconNaikKelasActive />
        ) : (
          <IconNaikKelasPasive />
        )}
        <Text
          className={`text-center ${activeTab === 'Scan' ? 'text-blue-500' : 'text-black'
            }`}
        >
          Scan
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePress('Profil')}
        className="items-center"
      >
        <Ionicons
          name="person-outline"
          size={24}
          color={activeTab === 'Profil' ? 'blue' : 'black'}
        />
        <Text
          className={`text-center ${activeTab === 'Profil' ? 'text-blue-500' : 'text-black'
            }`}
        >
          Profil
        </Text>
      </TouchableOpacity>
    </View>
  )
}
