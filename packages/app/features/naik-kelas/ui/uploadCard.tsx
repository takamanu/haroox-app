import { Text, View } from 'moti'
import { TouchableOpacity } from 'react-native'
import FileIcon from 'app/ui/assets/icon/mdi_file.svg'
import CheckmarkIcon from 'app/ui/assets/icon/checkmark.svg'
import TrashIcon from 'app/ui/assets/icon/trash.svg'
import CrossIcon from 'app/ui/assets/icon/cross.svg'
import type { DocPickerRes } from '../entity'

const UploadCard = (file: DocPickerRes) => {

  function _renderTitle(title: string) {
    // return title.slice(0,20) + "..."
    let nama = title.split(".");
    return nama[0]?.slice(0,20) + "..." + nama[1]
  }

  return (
    <View
      className={`relative flex flex-row items-center space-x-3 rounded-lg bg-white p-5 shadow ${file.order !== 3 ? 'mb-5' : ''}`}
    >
      <View className="rounded-lg border border-[#39393933] bg-white p-1.5">
        <FileIcon />
      </View>

      <View className="flex gap-y-1">
        {!file.isSuccess ? (
          <Text className="text-xs font-semibold text-[#414549]">
            Mengunggah
          </Text>
        ) : null}
        <View className="flex flex-row items-center space-x-2.5">
          <Text className="text-xs text-[#808A90]">
            {_renderTitle(file.nameFile)}
          </Text>
          {file.isSuccess ? <CheckmarkIcon /> : null}
        </View>
        {file.isUploading ? (
          <View className="mt-1.5 flex flex-row items-center gap-x-2.5">
            <View className="relative h-2 w-56 rounded-lg bg-[#F2F4F7]">
              <View className="absolute inset-0 h-full w-14 rounded-lg bg-[#2B3FA8]" />
            </View>
            <Text className="text-xs text-[#344054]">{30}%</Text>
          </View>
        ) : null}
      </View>

      {file.isSuccess ? (
        <TouchableOpacity className="absolute right-0 mx-5">
          <TrashIcon />
        </TouchableOpacity>
      ) : null}

      {file.isUploading ? (
        <TouchableOpacity className="absolute right-0 top-0 m-5">
          <CrossIcon />
        </TouchableOpacity>
      ) : null}
    </View>
  )
}

export default UploadCard
