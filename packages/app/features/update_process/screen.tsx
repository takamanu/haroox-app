import { useState, useEffect } from 'react'
import { ScrollView, TouchableOpacity, Modal, TextInput as RNTextInput, Image, Alert } from 'react-native'
import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { getAllComponents, getAllProducts, updateProcess } from './service/api'
import { BlurView } from 'expo-blur'
import * as ImagePicker from 'expo-image-picker'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { uploadToCloudinaryUnsigned, uploadUrlToCloudinaryREST } from 'app/utils/uploadToCloudinary'




export function UpdateProcessScreen() {
  const [activeTab, setActiveTab] = useState<'components' | 'products'>('components')
  const [components, setComponents] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [carbonValue, setCarbonValue] = useState('')
  const [currentLocation, setCurrentLocation] = useState('')
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const { showActionSheetWithOptions } = useActionSheet()

  useEffect(() => {
    if (activeTab === 'components') {
      fetchComponents()
    } else {
      fetchProducts()
    }
  }, [activeTab])

  const fetchComponents = async () => {
    try {
      const res = await getAllComponents()
      if (res.status) setComponents(res.data)
      else console.error('Failed to fetch components', res.message)
    } catch (err) {
      console.error('Error fetching components', err)
    }
  }

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts()
      if (res.status) setProducts(res.data)
      else console.error('Failed to fetch products', res.message)
    } catch (err) {
      console.error('Error fetching products', err)
    }
  }

  const openUpdateModal = (item: any) => {
    setSelectedItem(item)
    setCarbonValue('')
    setCurrentLocation('')
    setPhotoUrl(null)
    setShowModal(true)
  }

  const handleSelectPhoto = () => {
    setShowModal(false)
    setTimeout(() => {
      const options = ['Take Photo', 'Choose from Library', 'Cancel']
      const cancelButtonIndex = 2

      showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        async (buttonIndex) => {
          let result: any

          if (buttonIndex === 0) {
            const { status } = await ImagePicker.requestCameraPermissionsAsync()
            if (status !== 'granted') {
              Alert.alert('Permission denied', 'Camera permission is required.')
              setShowModal(true)
              return
            }
            result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              quality: 0.7,
            })
          } else if (buttonIndex === 1) {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
            if (status !== 'granted') {
              Alert.alert('Permission denied', 'Media library permission is required.')
              setShowModal(true)
              return
            }
            result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              quality: 0.7,
            })
          }

          if (!result.canceled && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            try {

              const cloudUrl = await uploadToCloudinaryUnsigned(
                uri,
                'dlstnepvt',        // Replace with your actual cloud name
                'mobile_uploads',         // Replace with your preset name from Step 1
                {
                  folder: 'uploads',
                  tags: ['mobile-upload'],
                  resource_type: 'image'
                }
              );
              setPhotoUrl(cloudUrl.secure_url);  // Store Cloudinary URL
            } catch (e) {
              console.error('Upload error:', e);
              Alert.alert('Upload Error', 'Failed to upload image to Cloudinary');
            }
          }
          setShowModal(true)
        }
      )
    }, 300)
  }



  const submitUpdate = async (
    payload: {
      carbon_value: number;
      current_location: string;
      proof_url: string;
      item_id: number;
      item_type: string
    }
  ) => {
    try {

      console.log("====> PAYLOAD =", payload)
      // return
      await updateProcess(payload)

      showActionSheetWithOptions(
        {
          options: ['OK'],
          cancelButtonIndex: 0,
          title: 'Success updating item!',
          message: '',
        },
        () => { }
      )

    } catch (err) {
      console.error('Error submitting update:', err)

      showActionSheetWithOptions(
        {
          options: ['OK'],
          cancelButtonIndex: 0,
          title: 'Error',
          message: 'Error submitting update. Please try again.',
        },
        () => { }
      )

      throw err
    }
  }

  const handleSubmit = async () => {
    if (!carbonValue || !currentLocation || !photoUrl) {
      Alert.alert('Validation error', 'Please fill all fields and upload a photo.')
      return
    }

    const payload = {
      carbon_value: Number(carbonValue),
      current_location: currentLocation,
      proof_url: photoUrl,
      item_id: selectedItem.id,
      item_type: activeTab
    }

    try {
      await submitUpdate(payload)
      Alert.alert('Success', 'Update submitted successfully!')
      setShowModal(false)
      if (activeTab === 'components') fetchComponents()
      else fetchProducts()
    } catch (err) {
      Alert.alert('Error', 'Failed to submit update.')
    }
  }

  const renderTabContent = () => {
    const data = activeTab === 'components' ? components : products
    return data.length > 0 ? (
      data.map((item) => (
        <View key={item.id} className="bg-white p-4 rounded-lg shadow mb-3">
          <Text className="font-semibold">{activeTab === 'components' ? item.component_name : item.product_name}</Text>
          <Text>Batch: {activeTab === 'components' ? item.component_batch : item.product_batch}</Text>
          <Text>Origin: {activeTab === 'components' ? item.component_origin : item.product_origin}</Text>
          <Text>Location: {activeTab === 'components' ? item.component_current_location : item.product_current_location}</Text>
          <Text>Process: {activeTab === 'components' ? item.component_current_process : item.product_current_process}</Text>
          <Text>Expired Date: {new Date(activeTab === 'components' ? item.component_expired_date : item.product_expired_date).toLocaleDateString()}</Text>

          <TouchableOpacity
            className="bg-blue-500 mt-3 p-2 rounded"
            onPress={() => openUpdateModal(item)}
          >
            <Text className="text-white text-center">Update</Text>
          </TouchableOpacity>
        </View>
      ))
    ) : (
      <Text className="text-center text-gray-500">No {activeTab} found.</Text>
    )
  }

  return (
    <>
      <ScrollView className="bg-gray-100" showsVerticalScrollIndicator={false}>
        <View className="p-5">
          <Text className="text-xl font-bold mb-4">Update Process</Text>

          <View className="flex-row bg-white rounded-lg overflow-hidden mb-4">
            <TouchableOpacity
              className={`flex-1 p-3 items-center ${activeTab === 'components' ? 'bg-blue-500' : 'bg-gray-200'}`}
              onPress={() => setActiveTab('components')}
            >
              <Text className={`font-semibold ${activeTab === 'components' ? 'text-white' : 'text-black'}`}>
                Components
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 p-3 items-center ${activeTab === 'products' ? 'bg-blue-500' : 'bg-gray-200'}`}
              onPress={() => setActiveTab('products')}
            >
              <Text className={`font-semibold ${activeTab === 'products' ? 'text-white' : 'text-black'}`}>
                Products
              </Text>
            </TouchableOpacity>
          </View>

          {renderTabContent()}
        </View>
      </ScrollView>

      <Modal visible={showModal} animationType="slide" transparent>
        <BlurView tint="dark" className="flex-1 justify-center items-center">
          <View className="bg-white p-5 rounded-lg w-11/12">
            <Text className="text-lg font-bold mb-3">
              Update {activeTab === 'components' ? 'Component' : 'Product'} {activeTab === 'components' ? selectedItem?.component_name : selectedItem?.product_name}
            </Text>

            <Text className="mb-1">Add Carbon Value</Text>
            <RNTextInput
              value={carbonValue}
              onChangeText={setCarbonValue}
              placeholder="Enter carbon value"
              className="border p-2 rounded mb-3"
            />

            <Text className="mb-1">Current Location</Text>
            <RNTextInput
              value={currentLocation}
              onChangeText={setCurrentLocation}
              placeholder="Enter current location"
              className="border p-2 rounded mb-3"
            />

            <TouchableOpacity className="bg-gray-300 p-2 rounded mb-3" onPress={handleSelectPhoto}>
              <Text className="text-center">Upload Proof</Text>
            </TouchableOpacity>

            {photoUrl && (
              <Image
                source={{ uri: photoUrl }}
                style={{ width: 100, height: 100, alignSelf: 'center', marginBottom: 10 }}
                alt='qrcode' />
            )}

            <View className="flex-row justify-between">
              <TouchableOpacity
                className="bg-green-500 p-2 rounded flex-1 mr-2"
                onPress={handleSubmit}
              >
                <Text className="text-white text-center">Submit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-red-500 p-2 rounded flex-1 ml-2"
                onPress={() => setShowModal(false)}
              >
                <Text className="text-white text-center">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </Modal>
    </>
  )
}
