import { SafeArea } from 'app/provider/safe-area'
import { Stack } from 'expo-router'
// import 'react-native-svg'

export default function VerifikasiLayout() {
  return (
    <SafeArea>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </SafeArea>
  )
}
