import MemberCard from 'app/features/home/ui/memberCard'
import { Text, View } from 'moti'
import MemberLevelCard from './memberLevelCard'
import { Checkbox, Button } from 'react-native-paper'
import { useState } from 'react'
import { changeScreen, RouteScreen } from 'app/utils/routing'
import { useRouter } from 'solito/router'
import { REPLACE_DEFAULT_OPTIONS } from 'app/utils/helper'
import { dummy_requirements } from '../entity'

const NaikKelasContent: React.FC = () => {
  const { push } = useRouter()
  const [requirements, setRequirements] = useState(dummy_requirements)

  const [allRequirementsMet, setAllRequirementsMet] = useState(false)

  const toggleRequirement = (id: number) => {
    setRequirements((prevReqs) => {
      const newReqs = prevReqs.map((r) =>
        r.id === id ? { ...r, checked: !r.checked } : r,
      )
      const allMet = newReqs.every((r) => r.checked)
      setAllRequirementsMet(allMet)
      return newReqs
    })
  }

  const linkTo = (param: string) => {
    const routing: RouteScreen = changeScreen(param)
    push(routing.route, undefined)
  }

  const handleRequestNaikLevel = () => {
    linkTo('VerifikasiNaikKelas')
  }

  return (
    <View className="flex space-y-5 p-5">
      <Text className="mb-5 font-semibold text-[#2B3FA8]">
        Status Keanggotaan Saya Saat Ini:
      </Text>

      <MemberLevelCard level={'Entrepreneur'} />

      <View>
        <MemberCard
          memberName={'John Doe'}
          memberNumber={'1234567'}
          memberExpirationDate={'2022-12-31'}
        />
      </View>

      <View className="rounded-lg bg-white p-5 shadow">
        <Text className="text-sm font-semibold text-[#414549]">
          Syarat Naik Kelas:
        </Text>
        <Text className="text-xs text-[#808A90]">Centang yang sesuai.</Text>
        <View className="flex space-y-0.5">
          {requirements.map((requirement) => (
            <View
              className="flex flex-row items-center items-center justify-between"
              key={requirement.id}
            >
              <Text className="flex-1 text-xs text-[#596066]">
                {requirement.title}
              </Text>
              <Checkbox
                status={requirement.checked ? 'checked' : 'unchecked'}
                onPress={() => toggleRequirement(requirement.id)}
                color="#3F5BEC"
                uncheckedColor="#3F5BEC"
              />
            </View>
          ))}
        </View>
      </View>

      <View className="rounded-lg border border-[#4F62C4] bg-[#E8ECFE] p-2.5">
        <Text className="text-xs">
          Status Keanggotaan dapat diperbarui setelah Anda mengunggah beberapa
          bukti yang diperlukan untuk Naik Kelas.
        </Text>
      </View>

      <Button
        disabled={!allRequirementsMet}
        className={`rounded-lg ${
          allRequirementsMet ? 'bg-[#2B3FA8]' : 'bg-[#E5E7E8]'
        }`}
        textColor="white"
        onPress={handleRequestNaikLevel}
      >
        Request Naik Level
      </Button>
    </View>
  )
}

export default NaikKelasContent
