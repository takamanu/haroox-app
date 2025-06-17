import { ScrollView, View, Text, Image, Dimensions, Touchable, TouchableOpacity } from 'react-native';
import { Link } from 'solito/link';

const { width: screenWidth } = Dimensions.get('window');

// Data for the 4 cards
const cards = [
    {
        id: 1,
        category: 'Tech',
        date: '01 Sep 2024',
        time: '20 minutes ago',
        title: 'Tips Menjadi Android Developer, dari Nol!',
        imageUrl: 'https://your-image-url.com/image1.jpg', // Replace with actual image URL
    },
    {
        id: 2,
        category: 'Business',
        date: '02 Sep 2024',
        time: '10 minutes ago',
        title: 'Strategi Memulai Bisnis Online yang Sukses!',
        imageUrl: 'https://your-image-url.com/image2.jpg', // Replace with actual image URL
    },
    {
        id: 3,
        category: 'Design',
        date: '03 Sep 2024',
        time: '5 minutes ago',
        title: 'Panduan Lengkap UI/UX Design untuk Pemula',
        imageUrl: 'https://your-image-url.com/image3.jpg', // Replace with actual image URL
    },
    {
        id: 4,
        category: 'Health',
        date: '04 Sep 2024',
        time: '30 minutes ago',
        title: 'Kiat Sehat Mental di Era Modern',
        imageUrl: 'https://your-image-url.com/image4.jpg', // Replace with actual image URL
    },
];

export default function CardSlider() {
    return (
        <ScrollView
            // className='-mx-2'
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 0}}
        >
            {cards.map((item) => (
                <Link
                    key={item.id}
                    className=''
                    href={`/article/${item.title}`}
                >
                    <View key={item.id} className="bg-red-500 rounded-lg overflow-hidden shadow-lg mx-1" style={{ width: screenWidth * 0.7 }}>
                    {/* Image */}
                    <Image
                        alt={item.title}
                        source={{ uri: "https://cms.indonesiabrain.com/uploads/img_3990_fotor_20240530175737_cf5e1cc9f1.jpg" }}
                        className="h-40 w-full object-cover"
                    />
                    {/* Overlay */}
                    <View className="absolute bottom-0 left-0 right-0 bg-opacity-50 p-4">
                        <Text className="text-white text-xs">
                            {item.date} • {item.time}
                        </Text>
                        <Text className="text-white text-lg font-bold">
                            {item.title}
                        </Text>
                    </View>
                    {/* Category */}
                    <View className="absolute top-4 left-4 bg-purple-200 rounded-full px-3 py-1">
                        <Text className="text-purple-600 text-sm">{item.category}</Text>
                    </View>
                </View>
                </Link>
            ))}
        </ScrollView>
    );
}
