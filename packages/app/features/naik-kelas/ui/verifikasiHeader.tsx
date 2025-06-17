import { Text, View } from 'moti'
import ArrowLeft from 'app/ui/assets/icon/arrow-left.svg'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'solito/router'

export default function VerifikasiHeader() {
  const { back } = useRouter()

  return (
    <View>
      <View className="fixed left-0 right-0 z-10 h-20 border-b border-gray-200 bg-white p-6">
        <View className="flex flex-row items-center space-x-2.5">
          <TouchableOpacity onPress={() => back()}>
            <ArrowLeft width={28} height={28} />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-[#414549]">
            Request Naik Kelas
          </Text>
        </View>
      </View>
    </View>
  )
}
