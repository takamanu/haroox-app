import { View } from 'app/design/view'
import { Text } from 'app/design/typography'
import { TouchableOpacity } from 'react-native'
import MemberCard from './memberCard'
import RequirementCard from './requirementCard'
import { HomeContentProps } from '../entity'
import { Stack, Button } from "@react-native-material/core";
import CardSlider from './SlideCarousel'
import MenuHomeArticle from './MenuHomeArticle'

const HomeContent: React.FC<HomeContentProps> = ({
  memberLevel,
  memberName,
  memberNumber,
  memberExpirationDate,
  selected,
  toggleCheckbox,
  handleRequestNaikKelas,
  errorMessage,
  linkTo,
}) => {


  return (
    <View className="mb-5 p-5 gap-y-5">

      <View className='gap-y-1 mb-2'>
        <Text className='flex flex-row text-2xl font-bold'>
          <Text>
            Halo,
          </Text>
          <Text className='text-[#2B3FA8]'>{memberName}</Text>
        </Text>
        <Text>Nikmati berbagai keuntungan dengan menjadi anggota!</Text>
      </View>

      <MemberCard
        memberName={memberName}
        memberNumber={memberNumber}
        memberExpirationDate={memberExpirationDate}
        memberLevel={memberLevel}
      />
      {/* 
    <View className='p-3 bg-[#E8ECFE] border border-[#4A5CB6] rounded-lg'>
      <Text className="text-sm">
        Verifikasi data Anda untuk membuka fitur-fitur eksklusif yang hanya tersedia untuk anggota yang terverifikasi.
      </Text>
      <Button
        title="Verifikasi Data"
        style={{
          marginTop: 10,
          backgroundColor: '#2B3FA8',
        }}
        titleStyle={{
          fontWeight: "bold",
          color: '#FFFFFF',
          textAlign: 'center',
          textTransform: 'none',        
          fontSize: 14,                  
        }}
      />
    </View> */}


      <View className="flex flex-row justify-between items-center mb-3">

        <View className='w-3/4'>
          <Text className="text-xl font-bold text-gray-800">Main Feature Harrox</Text>
          <Text className="text-sm text-gray-500">Berikut merupakan fitur-fitur untuk anda!</Text>
        </View>

        {/* <View className='w-1/4'>
        <TouchableOpacity
          className=""
          onPress={() => { }}
        >
          <Text className="text-[#2B3FA8] text-sm font-semibold">Lihat Semua</Text>
        </TouchableOpacity>
      </View> */}
      </View>

      {/* BUTTONS PRODUCT SECTION */}
      <View className="flex flex-col gap-y-3">
        {memberLevel == "customer" && (

          <TouchableOpacity
            className="rounded-lg bg-blue-600 p-4"
            onPress={() => {
              linkTo('Product')
            }}
          >
            <Text className="text-center text-white font-semibold">Create Product</Text>
          </TouchableOpacity>
        )}


        {memberLevel == "manufacturer" && (

          <TouchableOpacity
            className="rounded-lg bg-blue-600 p-4"
            onPress={() => {
              linkTo('Component')
            }}
          >
            <Text className="text-center text-white font-semibold">Create Component</Text>

          </TouchableOpacity>
        )}

        {/* <TouchableOpacity
          className="rounded-lg bg-green-600 p-4"
          onPress={() => { console.log("View All Products pressed"); }}
        >
          <Text className="text-center text-white font-semibold">View All Products</Text>
        </TouchableOpacity> */}
        {memberLevel == "customer" && (

          <TouchableOpacity
            className="rounded-lg bg-purple-600 p-4"
            onPress={() => {
              console.log("My Products pressed")
              linkTo('Product Owned')

            }}
          >
            <Text className="text-center text-white font-semibold">My Products</Text>
          </TouchableOpacity>
        )}


        {memberLevel == "manufacturer" && (

          <TouchableOpacity
            className="rounded-lg bg-purple-600 p-4"
            onPress={() => {
              console.log("My Components pressed")
              linkTo('Component Owned')
            }}
          >
            <Text className="text-center text-white font-semibold">My Components</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          className="rounded-lg bg-green-500 p-4"
          onPress={() => {
            console.log("My Components pressed")
            linkTo('UpdateProcess')
          }}
        >
          <Text className="text-center text-white font-semibold">Update Process</Text>
        </TouchableOpacity>


        <TouchableOpacity
          className="rounded-lg bg-green-500 p-4"
          onPress={() => {
            console.log("My Components pressed")
            linkTo('Scan')
          }}
        >
          <Text className="text-center text-white font-semibold">Scan</Text>
        </TouchableOpacity>
      </View>

      {/* <CardSlider /> */}

      {/* <View className="flex flex-row justify-between items-center py-2">

      <View className='w-3/4'>
        <Text className="text-xl font-bold text-gray-800">Rekomendasi Artikel</Text>
        <Text className="text-sm text-gray-500">Topik terbaik untuk Anda ikuti.</Text>
      </View>

      <View className='w-1/4'>
        <TouchableOpacity
          className=""
          onPress={() => { }}
        >
          <Text className="text-blue-600 text-sm font-semibold">Lihat Semua</Text>
        </TouchableOpacity>
      </View>
    </View>

    <MenuHomeArticle /> */}

      {/* <RequirementCard selected={selected} toggleCheckbox={toggleCheckbox} />
    {errorMessage ? (
      <View className="mt-4 rounded-lg bg-red-200 p-4">
        <Text className="text-center text-red-700">{errorMessage}</Text>
      </View>
    ) : null}

    <View className="mt-7 flex-row items-center justify-center rounded-lg bg-[#EDF6FF] p-4 shadow-md">
      <Text className=" text-gray-700">
        Status Keanggotaan dapat diperbarui setelah Anda mengunggah beberapa
        bukti yang diperlukan untuk Naik Kelas.
      </Text>
    </View>

    <TouchableOpacity
      className="mt-6 rounded-lg bg-blue-600 p-4"
      onPress={handleRequestNaikKelas}
    >
      <Text className="text-center text-white">Request Naik Kelas</Text>
    </TouchableOpacity> */}
    </View>
  )
}

export default HomeContent
