import { useState, useEffect } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { TextInput } from 'react-native-paper'
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import QRCode from 'react-native-qrcode-svg'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { createProduct, getAllComponents } from './service/api' // 👈 Pastikan fetchComponents tersedia
import { useActionSheet } from '@expo/react-native-action-sheet'

export function ProductsScreen() {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm()

  const [showDatePicker, setShowDatePicker] = useState(false)
  const [dateValue, setDateValue] = useState<Date>(new Date())
  const [qrValue, setQrValue] = useState<string | null>(null)

  // New states
  const [componentsList, setComponentsList] = useState<{ id: number, component_name: string, component_origin: string, creator: string }[]>([])

  const [selectedComponents, setSelectedComponents] = useState<number[]>([])


  const { showActionSheetWithOptions } = useActionSheet()

  useEffect(() => {
    const loadComponents = async () => {
      try {
        const data = await getAllComponents() // 🚀 fetch from API
        setComponentsList(data.data) // data should be array of { id, name }
      } catch (err) {
        console.error("Error fetching components", err)
      }
    }
    loadComponents()
  }, [])

  const setDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      setDateValue(selectedDate)
    }
  }

  const toggleSelectComponent = (id: number) => {
    if (selectedComponents.includes(id)) {
      setSelectedComponents(prev => prev.filter(item => item !== id))
    } else {
      setSelectedComponents(prev => [...prev, id])
    }
  }


  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      console.log("======> request", data)
      const newData = {
        product_name: data.productName,
        product_origin: data.productOrigin,
        product_expired_date: dateValue.toISOString(),
        component_ids: selectedComponents, // Include selected components
      }

      const resData = await createProduct(newData)
      console.log(resData)

      showActionSheetWithOptions(
        {
          options: ['OK'],
          cancelButtonIndex: 0,
          title: 'Success creating product!',
        },
        () => { }
      )

      setQrValue(resData?.data.product_batch || 'default-qr-value')

    } catch (error) {
      console.error("Error", error)
      showActionSheetWithOptions(
        {
          options: ['OK'],
          cancelButtonIndex: 0,
          title: 'Error',
          message: 'Error creating product. Please try again.',
        },
        () => { }
      )
    }
  }

  return (
    <ScrollView className="bg-gray-100" showsVerticalScrollIndicator={false}>
      <View className="p-5">
        <Text className="text-xl font-bold mb-4">Create Product</Text>

        <Controller
          control={control}
          name="productName"
          rules={{ required: 'Product Name is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="mb-2 border rounded p-2 bg-white"
              placeholder="Product Name"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {/* {errors.productName && <Text className="text-red-500"></Text>} */}

        <Controller
          control={control}
          name="productOrigin"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="mb-2 border rounded p-2 bg-white"
              placeholder="Product Origin"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Text className="mb-1 font-semibold">Components</Text>
        <View className="mb-2 bg-white rounded p-2">
          {componentsList.map(comp => (
            <TouchableOpacity
              key={comp.id}
              className={`p-2 rounded mb-1 ${selectedComponents.includes(comp.id) ? 'bg-blue-100' : ''}`}

              onPress={() => toggleSelectComponent(comp.id)}
            >
              <Text>{comp.component_name} || {comp.component_origin} || {comp.creator || "-"}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="mb-1 font-semibold">Product Expired Date</Text>
        <TouchableOpacity
          className="mb-2 border rounded p-2 bg-white"
          onPress={() => setShowDatePicker(true)}
        >
          <Text>
            {dateValue ? dateValue.toISOString().split('T')[0] : 'Select Expired Date'}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <RNDateTimePicker
            value={dateValue}
            mode="date"
            display="default"
            minimumDate={new Date()}
            onChange={(event, selectedDate) => {
              if (event.type === 'set' && selectedDate) {
                setDateValue(selectedDate)
                setValue('productExpiredDate', selectedDate.toISOString())
              }
              setShowDatePicker(false)
            }}
          />
        )}

        {qrValue && (
          <View className="items-center my-4">
            <Text className="mb-2 font-bold">This is your product QR code</Text>
            <QRCode value={qrValue} size={200} />
            <TouchableOpacity
              className="mt-2 bg-gray-600 rounded p-2"
              onPress={() => setQrValue(null)}
            >
              <Text className="text-white">Close</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          className="mt-4 bg-blue-600 rounded p-3"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-center text-white font-bold">Save Product</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
