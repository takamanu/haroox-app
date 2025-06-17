import { ScrollView } from 'moti'
import { LinearGradient } from 'expo-linear-gradient'
import VerifikasiNaikKelasContent from '../ui/verifikasiNaikKelasContent'

export function VerifikasiNaikKelasScreen() {
  return (
    <LinearGradient colors={['#e1f5fe', 'rgba(255, 255, 255, 0.9)', '#f3e5f5']}>
      <ScrollView className="h-full" showsVerticalScrollIndicator={false}>
        <VerifikasiNaikKelasContent />
      </ScrollView>
    </LinearGradient>
  )
}
