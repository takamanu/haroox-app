import { useState } from 'react'
import { Text, View } from 'moti'
import { dummy_requirements, MemberLevelCardProps } from '../entity'
import ResearcherIcon from 'app/ui/assets/icon/researcher-level.svg'
import ActivistIcon from 'app/ui/assets/icon/activist-level.svg'
import EntrepreneurIcon from 'app/ui/assets/icon/entrepreneur-level.svg'

const MemberLevelCard: React.FC<MemberLevelCardProps> = ({
  level,
  type = 'main',
}) => {
  const levels = ['researcher', 'activist', 'entrepreneur']
  const [requirements, _setRequirements] = useState(dummy_requirements)

  function _renderIcon() {
    switch (level.toLocaleLowerCase()) {
      case 'researcher':
        return <ResearcherIcon className="h-8 w-8" />
      case 'activist':
        return <ActivistIcon className="h-8 w-8" />
      case 'entrepreneur':
        return <EntrepreneurIcon className="h-8 w-8" />
      default:
        return null
    }
  }

  function _renderBadge({ showNextLevel = false }: { showNextLevel: boolean }) {
    let currentLevelIndex = levels.indexOf(level.toLocaleLowerCase())
    let displayLevel =
      showNextLevel && currentLevelIndex < levels.length - 1
        ? levels[currentLevelIndex + 1]
        : level.toLowerCase()

    return (
      <View
        className={`max-w-[102px] rounded-full px-2.5 py-1 ${
          displayLevel === 'researcher'
            ? 'bg-[#E5E7E8]'
            : displayLevel === 'activist'
              ? 'bg-[#FEEBC7]'
              : displayLevel === 'entrepreneur'
                ? 'bg-[#D9F2E1]'
                : null
        }`}
      >
        <Text
          className={`text-center text-xs capitalize ${
            displayLevel === 'researcher'
              ? 'text-[#4A4F54]'
              : displayLevel === 'activist'
                ? 'text-[#B33A0A]'
                : displayLevel === 'entrepreneur'
                  ? 'text-[#1B6143]'
                  : null
          }`}
        >
          {displayLevel}
        </Text>
      </View>
    )
  }

  return (
    <View
      className={`flex space-y-1 rounded-lg bg-white shadow ${type === 'verifikasi' ? 'py-2.5' : ''}`}
    >
      <View className="flex flex-row items-center">
        {_renderIcon()}
        <View className="flex gap-y-3">
          <Text className="text-xs font-semibold">
            Level Keanggotaan Anda Saat Ini:
          </Text>
          {_renderBadge({ showNextLevel: false })}
        </View>
      </View>

      {type === 'verifikasi' ? (
        <>
          <View className="px-5">
            <View className="h-0.5 w-full rounded-lg bg-gray-200" />
          </View>

          <View className="space-y-3 px-5 py-2.5">
            <View className="flex flex-row items-center gap-x-3">
              <Text className="text-xs font-semibold text-[#808A90]">
                Syarat Naik ke
              </Text>
              {_renderBadge({ showNextLevel: true })}
            </View>

            <View>
              {requirements.map((requirement) => (
                <Text
                  className="flex-1 text-xs text-[#596066]"
                  key={requirement.id}
                >
                  {requirement.title}
                </Text>
              ))}
            </View>
          </View>
        </>
      ) : null}
    </View>
  )
}

export default MemberLevelCard
