import { Text, View } from 'moti'
import { Image } from 'react-native'
import MemberLevelCard from './memberLevelCard'
import UploadFileSection from './uploadFileSection'
import { useState } from 'react'
import { VStack } from '@react-native-material/core'
import NaikKelasSending from 'app/ui/assets/naik-kelas-sending.png'
import NaikKelasSent from 'app/ui/assets/naik-kelas-sent.png'
import { Button } from 'react-native-paper'
import VerifikasiHeader from './verifikasiHeader'

const VerifikasiNaikKelasContent = () => {
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)

  return !isSending && !isSent ? (
    <>
      <VerifikasiHeader />
      <View className="flex space-y-5 p-5">
        <Text className="mb-5 font-semibold text-[#2B3FA8]">
          Tingkatkan level keanggotaan anda dengan memverifikasi data.
        </Text>

        <MemberLevelCard level="Researcher" type="verifikasi" />

        <UploadFileSection handleSend={() => setIsSending(true)} />
      </View>
    </>
  ) : (
    <View className="flex space-y-5 p-5">
      {isSending ? (
        <VStack justify="center" items="center">
          <Image source={NaikKelasSending} width={293} height={202.33} />
          <VStack spacing={12}>
            <Text className="text-center text-xl font-bold text-[#414549]">
              Mengirim permintaan naik kelas...
            </Text>
            <Text className="text-center text-[#596066]">Mohon menunggu.</Text>
          </VStack>
        </VStack>
      ) : (
        <VStack spacing={32} justify="center" items="center">
          <Image source={NaikKelasSent} width={171} height={147} />

          <VStack spacing={5} items="center">
            <Text className="text-2xl font-bold text-[#2B3FA8]">
              Data Terkirim!
            </Text>
            <Text className="text-center text-[#596066]">
              Data Anda berhasil dikirim ke tim terkait untuk diverifikasi!
              Mohon menunggu.
            </Text>
          </VStack>

          <Button
            className="w-full rounded-lg"
            mode="contained"
            theme={{ colors: { primary: '#2B3FA8' } }}
            onPress={() => setIsSent(false)}
          >
            Kembali ke Beranda
          </Button>
        </VStack>
      )}
    </View>
  )
}

export default VerifikasiNaikKelasContent
