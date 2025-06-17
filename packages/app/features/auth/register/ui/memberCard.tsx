import React from 'react'
import { View } from 'app/design/view'
import { A, H1, P, Text, TextLink } from 'app/design/typography'
import MemberCardResearcher from 'app/ui/assets/mc_researcher.svg'
import { MemberCardProps } from '../entity'

const MemberCard: React.FC<MemberCardProps> = ({
  memberName,
  memberNumber,
  memberExpirationDate,
}) => (
  <View className="relative bottom-2 right-6">
    <MemberCardResearcher className="absolute" />
    <Text className="absolute left-12 top-24 font-bold text-[#F5F6F6]">
      {memberName}
    </Text>
    <Text className="absolute left-12 top-28 font-normal text-[#ABB1B5]">
      No Anggota{' '}
      <Text className="font-bold text-[#CDD1D4]">{memberNumber}</Text>
    </Text>
    <Text className="absolute left-12 top-40  text-[#808A90]">
      Berlaku hingga <Text className="font-bold">{memberExpirationDate}</Text>
    </Text>
  </View>
)

export default MemberCard
