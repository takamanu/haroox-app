import { A, H1, P, Text, TextLink } from 'app/design/typography'
import { Row } from 'app/design/layout'
import { View } from 'app/design/view'
import LogoIndonesiaBrain from 'app/ui/assets/logo_indo_brain.svg'
import IconBell from 'app/ui/assets/icon/bell.svg'

import { Image } from 'react-native'
import { FontAwesome } from '@expo/vector-icons' // Atau MaterialIcons, Ionicons, dll.

export default function Header() {
  return (
    <View>
      <View className="fixed left-0 right-0 z-10 h-20 items-center border-b border-gray-200 bg-white p-6">
        <View className="flex w-full flex-row items-center justify-between">
          {/* Left side with the logo */}
          <View className="flex flex-row items-center">
            <LogoIndonesiaBrain width={40} height={40} />
            <Text className="ml-2 text-lg font-bold">HARROX</Text>
          </View>

          {/* Right side with the notification icon */}
          <View className="flex items-center justify-center">
            {/* <View className="flex items-center justify-center rounded-full border p-2">
              <IconBell />
            </View> */}
          </View>
        </View>
      </View>
    </View>
  )
}
