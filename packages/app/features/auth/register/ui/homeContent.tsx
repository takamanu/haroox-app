import React from 'react'
import { View } from 'app/design/view'
import { Text } from 'app/design/typography'
import { TouchableOpacity } from 'react-native'
import MemberCard from './memberCard'
import RequirementCard from './requirementCard'
import { HomeContentProps } from '../entity'

const HomeContent: React.FC<HomeContentProps> = ({
  memberLevel,
  memberName,
  memberNumber,
  memberExpirationDate,
  selected,
  toggleCheckbox,
  handleRequestNaikKelas,
  errorMessage,
}) => (
  <View className="mb-5 p-5">
    <Text className="text-md mb-4 font-semibold">
      Status Keanggotaan Saya Saat Ini:
    </Text>

    <View className="mb-7 flex-row items-center justify-center rounded-lg bg-white p-4 shadow-md">
      <View className="w-9 rounded-full bg-gray-200 p-2">
        <Text className="text-center font-bold text-gray-700">R</Text>
      </View>
      <View className="ml-4">
        <Text className="text-gray-700">Level Keanggotaan Anda Saat Ini:</Text>
        <View className="mt-3 w-28 rounded-full bg-gray-200 px-5 py-1">
          <Text className="text-center text-gray-700">{memberLevel}</Text>
        </View>
      </View>
    </View>

    <MemberCard
      memberName={memberName}
      memberNumber={memberNumber}
      memberExpirationDate={memberExpirationDate}
    />

    <RequirementCard selected={selected} toggleCheckbox={toggleCheckbox} />

    {errorMessage ? (
      <View className="mt-4 rounded-lg bg-red-200 p-4">
        <Text className="text-center text-red-700">{errorMessage}</Text>
      </View>
    ) : null}

    <View className="mt-7 flex-row items-center justify-center rounded-lg bg-[#EDF6FF] p-4 shadow-md">
      <Text className=" text-gray-700">
        Status Keanggotaan dapat diperbarui setelah Anda mengunggah beberapa
        bukti yang diperlukan untuk Naik Kelas.
      </Text>
    </View>

    <TouchableOpacity
      className="mt-6 rounded-lg bg-blue-600 p-4"
      onPress={handleRequestNaikKelas}
    >
      <Text className="text-center text-white">Request Naik Kelas</Text>
    </TouchableOpacity>
  </View>
)

export default HomeContent
