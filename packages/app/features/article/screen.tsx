
import { A, H1, P, Text, TextLink } from 'app/design/typography'
import { ScrollView } from 'moti'
import { Platform, TouchableOpacity, View, Image, ImageBackground } from 'react-native';
import { useRouter } from 'solito/router';
import { useRoute } from '@react-navigation/native';
import { useContext } from 'react';
import { TabContext } from 'app/context/tabContext';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Icon untuk panah


export function ArticleDetailScreen({ props }) {
  const { setActiveTab } = useContext(TabContext)

    const route = useRoute(); // Untuk mobile
    const router = useRouter(); // Untuk web
    setActiveTab("Article")

    const message = Platform.select({
        native: route.params?.slug,  // Mengambil props di mobile
        // web: router.query.message,      // Mengambil props di web
    });


    return (
        <ScrollView className="flex-1 bg-white">
        {/* Image Background with Overlay */}
        <TouchableOpacity
        style={{
          backgroundColor: "white",
          borderRadius: 5,
          padding: 5,
          position: 'absolute',
          top: 20, 
          left: 20, 
          zIndex: 10, 
        }}
        onPress={() => {
          router.back(); 
        }}
      >
        <Icon name="arrow-back" size={24} color="black" /> 
      </TouchableOpacity>
        <ImageBackground
          source={{ uri: 'https://cms.indonesiabrain.com/uploads/img_3990_fotor_20240530175737_cf5e1cc9f1.jpg' }} // Replace with actual image URL
          className="w-full h-80"
          resizeMode="cover"
        >
          <View className="absolute bottom-5 w-full p-4 bg-gradient-to-t from-black to-transparent">
            <View style={{ alignSelf: 'flex-start' }} className="bg-blue-600 px-2 py-1 rounded-md">
              <Text className="text-white text-xs">SAHAM</Text>
            </View>
            <Text className="text-white text-lg font-bold">
              Runtuh atau Bangkit? Prospek Pasar Saham Indonesia di Tengah Volatilitas Global
            </Text>
            <Text className="text-white text-sm mt-1">1 JAM YANG LALU • 5 menit waktu baca</Text>
          </View>
        </ImageBackground>
  
        {/* Article Content with Curved Effect */}
        <View className="bg-white -mt-6 rounded-t-3xl p-6">
          <Text className="text-gray-800 text-base leading-6">
            Pasar saham Indonesia telah menjadi sorotan dalam beberapa tahun terakhir, terutama dengan ketidakpastian yang dihasilkan oleh peristiwa global seperti pandemi COVID-19 dan gejolak politik di beberapa negara. Di tengah volatilitas ini, investor di Indonesia dan di seluruh dunia bertanya-tanya apakah pasar saham Indonesia akan mampu bertahan atau malah runtuh dalam menghadapi tekanan eksternal yang terus meningkat. {'\n\n'}
            Meskipun terjadi goncangan hebat, pasar saham Indonesia telah menunjukkan ketangguhan yang mengesankan... {'\n\n'}
            Pasar saham Indonesia telah menjadi sorotan dalam beberapa tahun terakhir, terutama dengan ketidakpastian yang dihasilkan oleh peristiwa global seperti pandemi COVID-19 dan gejolak politik di beberapa negara.
            {'\n\n'}
            [Lanjutkan artikel...]
          </Text>
        </View>
      </ScrollView>
    )
}
