import React, { useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { A, H1, P, Text, TextLink } from 'app/design/typography'
import { Row } from 'app/design/layout'
import { View } from 'app/design/view'
import { MotiLink } from 'solito/moti'
import { Image } from 'app/design/image'
import { ImageBackground } from 'app/design/image'
import { Linking } from 'react-native'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import Layout from 'app/ui/layout/layout'
import { useEffect, useContext } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { TabContext } from 'app/context/tabContext'
import { useRouter } from 'solito/router/index'
import { removeUserJWT } from 'app/utils/helper'
import { changeScreen, RouteScreen } from 'app/utils/routing'
import { ProductFormData } from './entity.js'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Button, TextInput } from 'react-native-paper'
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { createProduct } from './service/api'
import { useActionSheet } from '@expo/react-native-action-sheet'
import QRCode from 'react-native-qrcode-svg'
// import DateTimePicker  from '@react-native-community/datetimepicker'

// Di form screen
export function ComponentsScreen() {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<ProductFormData>()
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateValue, setDateValue] = useState<Date>(new Date());
  const [qrValue, setQrValue] = useState<string | null>(null);
  const { showActionSheetWithOptions } = useActionSheet();

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      const newData = {
        company_id: 1,
        company_delivery_id: 1,
        component_name: data.componentName,
        // component_batch: data.componentBatch,
        component_origin: data.componentOrigin,
        // component_current_location: data.componentCurrentLocation,
        // component_current_process: data.componentCurrentProcess,
        component_expired_date: dateValue.toISOString(),
      }

      const resData = await createProduct(newData);

      showActionSheetWithOptions({
        options: ['OK'],
        cancelButtonIndex: 0,
        title: 'Success creating component!',
      }, () => { });

      setQrValue(resData?.data?.component_batch || 'default-qr-value');
    } catch (error) {
      console.error("Error", error);
      showActionSheetWithOptions({
        options: ['OK'],
        cancelButtonIndex: 0,
        title: 'Error',
        message: 'Error creating component. Please try again.',
      }, () => { });
    }
  }

  return (
    <ScrollView className="bg-gray-100" showsVerticalScrollIndicator={false}>
      <View className="p-5">
        <Text className="text-xl font-bold mb-4">Create Component</Text>

        <Controller
          control={control}
          name="componentName"
          rules={{ required: 'Component Name is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput className="mb-2 bg-white" placeholder="Component Name" value={value} onChangeText={onChange} />
          )}
        />
        {errors.componentName && <Text className="text-red-500">{errors.componentName.message}</Text>}

        {/* <Controller
          control={control}
          name="componentBatch"
          render={({ field: { onChange, value } }) => (
            <TextInput className="mb-2 bg-white" placeholder="Component Batch" value={value} onChangeText={onChange} />
          )}
        /> */}

        <Controller
          control={control}
          name="componentOrigin"
          render={({ field: { onChange, value } }) => (
            <TextInput className="mb-2 bg-white" placeholder="Component Origin" value={value} onChangeText={onChange} />
          )}
        />

        <Text className="mb-1 font-semibold">Component Expired Date</Text>
        <TouchableOpacity className="mb-2 bg-white p-2 rounded" onPress={() => setShowDatePicker(true)}>
          <Text>{dateValue ? dateValue.toISOString().split('T')[0] : 'Select Expired Date'}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <RNDateTimePicker
            value={dateValue}
            mode="date"
            display="default"
            minimumDate={new Date()}
            onChange={(event, selectedDate) => {
              if (event.type === 'set' && selectedDate) {
                setDateValue(selectedDate);
                setValue('componentExpiredDate', selectedDate.toISOString());
              }
              setShowDatePicker(false);
            }}
          />
        )}

        <TouchableOpacity className="mt-4 bg-blue-600 rounded p-3" onPress={handleSubmit(onSubmit)}>
          <Text className="text-center text-white font-bold">Save Component</Text>
        </TouchableOpacity>

        {qrValue && (
          <View className="items-center my-4">
            <Text className="mb-2 font-bold">This is your component QR code</Text>
            <QRCode value={qrValue} size={200} />
            <TouchableOpacity className="mt-2 bg-gray-600 rounded p-2" onPress={() => setQrValue(null)}>
              <Text className="text-white">Close</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  )
}

