import React from 'react'
import { View } from 'app/design/view'
import { A, H1, P, Text, TextLink } from 'app/design/typography'
import MemberCardResearcher from 'app/ui/assets/mc_researcher.svg'
import { MemberCardProps } from '../entity'
import Svg, { Circle, Path } from 'react-native-svg'
import AwanCard from 'app/ui/assets/awan-card.svg'
import LogoBrainWhite from 'app/ui/assets/logo-brain-white'

const MemberCard: React.FC<MemberCardProps> = ({
  memberName,
  memberNumber,
  memberExpirationDate,
  memberLevel
}) => (
  <View
    style={{
      backgroundColor: '#242628',
      borderRadius: 10,
      width: '100%',
      height: 180,
      position: 'relative',
      // justifyContent: 'space-between',
    }}
  >
    {/* Header Section */}
    <View
      className="bg-[#2D2D2D]"
      style={{
        padding: 16,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
      }}
    >
      <View className="flex flex-row gap-x-1">
        <LogoBrainWhite />
        <Text style={{ fontWeight: 'bold', color: '#FFFFFF', fontSize: 16 }}>
          HARROX
        </Text>
      </View>
      <Text style={{ color: '#E0E0E0', fontSize: 14 }}>
        Kartu Tanda Anggota
      </Text>
    </View>

    {/* Content Section */}
    <View
      className="flex flex-row justify-between p-4"
      style={{ position: 'absolute', bottom: 0, width: '100%' }}
    >
      <View>
        <Text className="text-xs font-bold text-white">{memberName}</Text>
        <View className="flex flex-row gap-x-1">
          <Text className="text-[9px] text-[#ABB1B5]">No. Anggota</Text>
          <Text className="text-[9px] font-bold text-white">{memberNumber}</Text>
        </View>
        <View className="mt-3 flex flex-row gap-x-1">
          <Text className="text-[9px] text-[#ABB1B5]">Berlaku hingga</Text>
          <Text className="text-[9px] font-bold text-white">{memberExpirationDate}</Text>
        </View>
      </View>
      <View className=" mb-5 items-end justify-end ">
        <View className="gap-y-1">
          <Text
            style={{
              justifyContent: 'flex-start',
              color: '#FFFFFF',
              fontSize: 10,
            }}
          >
            Level
          </Text>
          <View
            style={{
              backgroundColor: '#E5E7E8',
              paddingHorizontal: 16,
              paddingVertical: 4,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: '#000000', fontSize: 12 }}>{memberLevel}</Text>
          </View>
        </View>
      </View>
    </View>

    <AwanCard
      style={{
        width: 50,
        height: 50,
        position: 'absolute',
        right: 0,
        bottom: 0,
        zIndex: -1, // z-index lebih rendah dibandingkan komponen utama
        margin: 0, // memastikan margin tidak terpengaruh padding
      }}
    />
  </View>
)

// const MemberCard: React.FC<MemberCardProps> = ({
//   memberName,
//   memberNumber,
//   memberExpirationDate,
// }) => (
//   <View className="justify-center flex">
//     <MemberCardResearcher className="absolute" />
//     <Text className="absolute left-12 top-24 font-bold text-[#F5F6F6]">
//       {memberName}
//     </Text>
//     <Text className="absolute left-12 top-28 font-normal text-[#ABB1B5]">
//       No Anggota{' '}
//       <Text className="font-bold text-[#CDD1D4]">{memberNumber}</Text>
//     </Text>
//     <Text className="absolute left-12 top-40  text-[#808A90]">
//       Berlaku hingga <Text className="font-bold">{memberExpirationDate}</Text>
//     </Text>
//   </View>
// )

export default MemberCard
