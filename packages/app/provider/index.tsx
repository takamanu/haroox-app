import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { SafeArea } from './safe-area'
import Layout from 'app/ui/layout/layout'
import 'fast-text-encoding';


export function Provider({ children }: { children: React.ReactNode }) {
  return (
    // <PaperProvider>
    <SafeArea>

      <ActionSheetProvider>

        <Layout>{children}</Layout>
      </ActionSheetProvider>
    </SafeArea>
    // </PaperProvider>
  )
}
