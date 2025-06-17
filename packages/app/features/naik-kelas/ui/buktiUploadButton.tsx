import { Text, View } from 'moti'
import type { BuktiUploadButtonProps } from '../entity'
import { TouchableOpacity } from 'react-native'
import UploadIcon from 'app/ui/assets/icon/upload.svg'

const BuktiUploadButton: React.FC<BuktiUploadButtonProps> = ({ onPress }) => {
  return (
    <View className="mb-5">
      <TouchableOpacity onPress={onPress}>
        <View className="flex items-center justify-center rounded-lg border-2 border-dotted border-[#2B3FA8] bg-[#2B3FA814] p-5">
          <View className="flex items-center gap-y-3">
            <UploadIcon />
            <Text className="text-xs font-semibold text-[#2B3FA8]">
              Unggah File
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default BuktiUploadButton
