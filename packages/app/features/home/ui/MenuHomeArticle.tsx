
import { useState } from 'react';
import { ScrollView, View, Text, Image, Dimensions, Touchable, TouchableOpacity } from 'react-native';
import { Link } from 'solito/link';

const newsData = [
    {
        category: "Tech",
        articles: [
            {
                id: 1,
                title: "Memahami Teknologi Blockchain dan Potensinya dalam Berbagai Industri",
                date: "01 Sep 2024",
                time: "20 menit yang lalu",
                imageUrl: "https://cms.indonesiabrain.com/uploads/img_3990_fotor_20240530175737_cf5e1cc9f1.jpg",
                slug: "memahami-teknologi-blockchain-dan-potensinya-dalam-berbagai-industri",
            },
            {
                id: 2,
                title: "AI dan Dampaknya pada Industri Teknologi di Tahun 2025",
                date: "10 Sep 2024",
                time: "1 jam yang lalu",
                imageUrl: "https://cms.indonesiabrain.com/uploads/img_3990_fotor_20240530175737_cf5e1cc9f1.jpg",
                slug: "ai-dan-dampaknya-pada-industri-teknologi-2025",
            },
            {
                id: 3,
                title: "Keamanan Siber: Ancaman dan Solusi di Dunia Digital",
                date: "15 Sep 2024",
                time: "2 jam yang lalu",
                imageUrl: "https://cms.indonesiabrain.com/uploads/img_3990_fotor_20240530175737_cf5e1cc9f1.jpg",
                slug: "keamanan-siber-ancaman-dan-solusi-di-dunia-digital",
            },
        ],
    },
    {
        category: "Finance",
        articles: [
            {
                id: 4,
                title: "Tips Investasi Saham untuk Pemula di Pasar Volatile",
                date: "01 Sep 2024",
                time: "30 menit yang lalu",
                imageUrl: "https://cms.indonesiabrain.com/uploads/img_3990_fotor_20240530175737_cf5e1cc9f1.jpg",
                slug: "tips-investasi-saham-untuk-pemula-di-pasar-volatile",
            },
            {
                id: 5,
                title: "Mengenal Cryptocurrency: Risiko dan Peluang",
                date: "05 Sep 2024",
                time: "1 hari yang lalu",
                imageUrl: "https://cms.indonesiabrain.com/uploads/img_3990_fotor_20240530175737_cf5e1cc9f1.jpg",
                slug: "mengenal-cryptocurrency-risiko-dan-peluang",
            },
            {
                id: 6,
                title: "Pentingnya Manajemen Risiko dalam Investasi",
                date: "10 Sep 2024",
                time: "3 hari yang lalu",
                imageUrl: "https://cms.indonesiabrain.com/uploads/img_3990_fotor_20240530175737_cf5e1cc9f1.jpg",
                slug: "pentingnya-manajemen-risiko-dalam-investasi",
            },
        ],
    },
    {
        category: "Business",
        articles: [
            {
                id: 7,
                title: "Strategi Pertumbuhan Bisnis di Era Digital",
                date: "02 Sep 2024",
                time: "40 menit yang lalu",
                imageUrl: "https://cms.indonesiabrain.com/uploads/img_3990_fotor_20240530175737_cf5e1cc9f1.jpg",
                slug: "strategi-pertumbuhan-bisnis-di-era-digital",
            },
            {
                id: 8,
                title: "Cara Membangun Tim yang Efektif dan Berkinerja Tinggi",
                date: "07 Sep 2024",
                time: "2 hari yang lalu",
                imageUrl: "https://cms.indonesiabrain.com/uploads/img_3990_fotor_20240530175737_cf5e1cc9f1.jpg",
                slug: "cara-membangun-tim-yang-efektif-dan-berkinerja-tinggi",
            },
            {
                id: 9,
                title: "Tren Startup di Indonesia pada Tahun 2024",
                date: "14 Sep 2024",
                time: "5 hari yang lalu",
                imageUrl: "https://cms.indonesiabrain.com/uploads/img_3990_fotor_20240530175737_cf5e1cc9f1.jpg",
                slug: "tren-startup-di-indonesia-2024",
            },
        ],
    },
    {
        category: "Innovation",
        articles: [
            {
                id: 10,
                title: "Inovasi Produk Berbasis Teknologi Hijau untuk Masa Depan",
                date: "03 Sep 2024",
                time: "1 jam yang lalu",
                imageUrl: "https://cms.indonesiabrain.com/uploads/img_3990_fotor_20240530175737_cf5e1cc9f1.jpg",
                slug: "inovasi-produk-teknologi-hijau-untuk-masa-depan",
            },
            {
                id: 11,
                title: "Bagaimana 5G Akan Mengubah Cara Kita Berbisnis",
                date: "06 Sep 2024",
                time: "4 hari yang lalu",
                imageUrl: "https://cms.indonesiabrain.com/uploads/img_3990_fotor_20240530175737_cf5e1cc9f1.jpg",
                slug: "bagaimana-5g-akan-mengubah-bisnis",
            },
            {
                id: 12,
                title: "Inovasi di Sektor Agrikultur: Masa Depan Pangan Dunia",
                date: "12 Sep 2024",
                time: "6 hari yang lalu",
                imageUrl: "https://cms.indonesiabrain.com/uploads/img_3990_fotor_20240530175737_cf5e1cc9f1.jpg",
                slug: "inovasi-sektor-agrikultur-masa-depan-pangan",
            },
        ],
    },
];



export default function MenuHomeArticle() {

    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const categories = ['Semua', 'Tech', 'Finance', 'Business', 'Innovation'];

    let selectedNews: any = [];
    if (selectedCategory === 'Semua') {
        selectedNews = newsData.flatMap((news) => news.articles);
    } else {
        selectedNews = newsData.find(
            (news) => news.category === selectedCategory
        )?.articles;
    }

    return (
        <>
            <View className="flex flex-row w-full mb-7">
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                >
                    {categories.map((category, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setSelectedCategory(category)}
                            className={`px-4 py-2 mx-2 rounded-full border-2 ${selectedCategory === category ? 'bg-[#2B3FA8] border-[#2B3FA8]' : 'bg-[#E8ECFE] border-[#2B3FA8]'}`}
                        >
                            <Text className={`${selectedCategory === category ? 'text-white' : 'text-blue-600'} text-center`}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <View>
                {selectedNews?.map((article: any) => (
                    <Link
                        key={article.id}
                        href={`/article/${article.slug}`}
                    >
                        <View
                            className="flex flex-row  rounded-lg border-b-[1px] border-b-[#E5E7E8] p-2">
                            <Image
                                source={{ uri: article.imageUrl }}
                                className="w-28 h-full rounded-md"
                                resizeMode="cover"
                            />
                            <View className="ml-4 flex-1">
                                <Text className="text-blue-600 text-xs font-bold">{selectedCategory}</Text>
                                <Text className="text-gray-800 text-sm font-semibold">
                                    {article.title}
                                </Text>
                                <View className="flex flex-row items-center mt-1">
                                    <Text className="text-gray-500 text-xs">{article.date}</Text>
                                    <Text className="text-gray-500 text-xs mx-1">•</Text>
                                    <Text className="text-gray-500 text-xs">{article.time}</Text>
                                </View>
                            </View>
                        </View>
                    </Link>
                ))}
            </View>
        </>
    )

}
