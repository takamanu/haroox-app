import React from 'react'
import { View } from 'app/design/view'
import { A, H1, P, Text, TextLink } from 'app/design/typography'
import { CheckBox } from '@rneui/base'
import { RequirementCardProps } from '../entity'

const RequirementCard: React.FC<RequirementCardProps> = ({
  selected,
  toggleCheckbox,
}) => (
  <View className="rounded bg-white p-4 shadow">
    <Text className="mb-2 text-lg font-bold">Syarat Naik Kelas:</Text>
    <Text className="mb-4">Centang yang sesuai.</Text>
    <View className="mb-2 flex-row items-center">
      <Text style={{ flex: 1 }}>1 practical research / activity based</Text>
      <CheckBox
        checked={selected.practicalResearch}
        onPress={() => toggleCheckbox('practicalResearch')}
        containerStyle={{ margin: 0, padding: 0 }}
      />
    </View>
    <View className="mb-2 flex-row items-center">
      <Text style={{ flex: 1 }}>1 paper of vertical expertise</Text>
      <CheckBox
        checked={selected.paperExpertise}
        onPress={() => toggleCheckbox('paperExpertise')}
        containerStyle={{ margin: 0, padding: 0 }}
      />
    </View>
    <View className="flex-row items-center">
      <Text style={{ flex: 1 }}>
        Provide lectures at a minimum of 5 different campuses
      </Text>
      <CheckBox
        checked={selected.lectures}
        onPress={() => toggleCheckbox('lectures')}
        containerStyle={{ margin: 0, padding: 0 }}
      />
    </View>
  </View>
)

export default RequirementCard
