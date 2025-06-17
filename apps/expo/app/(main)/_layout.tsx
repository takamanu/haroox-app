import { Provider } from 'app/provider'
import { Stack } from 'expo-router'
// import 'react-native-svg'

export default function Root() {
  return (
    <Provider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </Provider>
  )
}
