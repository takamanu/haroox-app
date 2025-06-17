import { Text, View } from 'moti'
import BuktiUploadButton from './buktiUploadButton'
import { useState } from 'react'
import * as DocumentPicker from 'expo-document-picker'
import { Button } from 'react-native-paper'
import type { DocPickerRes, UploadFileSectionProps } from '../entity'
import UploadCard from './uploadCard'

import { ApiResponse, STAGING_API_URL } from 'app/utils/helper'
import { uploadFile } from '../service/api'

const UploadFileSection = ({ handleSend }: UploadFileSectionProps) => {
  let [files, _setFiles] = useState<DocPickerRes[]>([
    {
      order: 1,
      assets: null,
      canceled: true,
      isSuccess: false,
      isUploading: false,
      output: null,
      nameFile: "",
    },
    {
      order: 2,
      assets: null,
      canceled: true,
      isSuccess: false,
      isUploading: false,
      output: null,
      nameFile: "",
    },
    {
      order: 3,
      assets: null,
      canceled: true,
      isSuccess: false,
      isUploading: false,
      output: null,
      nameFile: "",
    },
  ])

  // const handleDocumentPick = async (id) => {
  //   try {
  //     const result: any = await DocumentPicker.getDocumentAsync({
  //       type: ['image/*', 'application/pdf'],
  //     })

  //     const asset = result.assets[0];

  //     if (asset.uri && asset.name && asset.mimeType) {
  //       const response = await fetch(asset.uri);
  //       const blob = await response.blob();

  //       const file = new File([blob], asset.name, { type: asset.mimeType });

  //       console.log(file instanceof File)

  //       await uploadFile(file)

  //     }

  //     // console.log(result)
  //     // try {
  //     //   const uploadResponse = await uploadFile(result).then(res => {
  //     //     // find file variabel sesuai pada id di order kemudian ubah nama file dan statusnya
  //     //     // _setFiles((prevFiles) =>
  //     //     //   prevFiles.map((file) =>
  //     //     //     file.order === id
  //     //     //       ? {
  //     //     //         ...file,
  //     //     //         assets: result,
  //     //     //         nameFile: result.assets[0].name, 
  //     //     //         canceled: false,
  //     //     //         isSuccess: true,
  //     //     //       }
  //     //     //       : file
  //     //     //   )
  //     //     // );
  //     //   })
  //     // } catch (e) {
  //     //   console.log(e);
  //     // }
  //   } catch (error) {
  //     console.error('Error picking document:', error)
  //   }
  // }

  const handleDocumentPick = async (order: number) => {
    try {
      const result: any = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        if (asset.uri && asset.name && asset.mimeType) {
          // Fetch the file from the URI
          const response = await fetch(asset.uri);
          const blob = await response.blob();

          // Create a File object to be uploaded
          const file = new File([blob], asset.name, { type: asset.mimeType });

          // Upload the file using the uploadFile function
          await uploadFile(file);

          console.log('File uploaded successfully');
        } else {
          console.error('Informasi file tidak lengkap.');
        }
      } else {
        console.log('Pemilihan dokumen dibatalkan.');
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };



  const UploadItem = ({ file, id }: { file: DocPickerRes, id: number }) => {
    const Item = () => {
      if (file.isUploading || file.isSuccess) {
        return <UploadCard key={file.order} {...file} />
      }

      return <BuktiUploadButton key={file.order} onPress={() => handleDocumentPick(file.order)} />
    }

    return (
      <>
        <Text className="text-xs font-semibold text-[#414549]">
          Unggah Bukti Tambahan {file.order}
          {file.order === 1 ? <Text className="text-red-500">*</Text> : null}
        </Text>
        <View className="mt-2.5">
          <Item />
        </View>
      </>
    )
  }

  return (
    <View className="mt-5 space-y-3">
      <View className="flex gap-y-3">
        <Text className="font-semibold text-[#2B3FA8]">
          Unggah Bukti Tambahan
        </Text>

        <Text className="text-xs text-[#596066]">
          Bukti tambahan dapat berupa bukti riset, komunitas, dan lain-lain.
          Bukti tambahan dapat berupa foto atau file PDF.
        </Text>
      </View>

      <View>
        {files.map((file) => (
          <UploadItem key={file.order} file={file} id={file.order} />
        ))}
      </View>

      <View className="mb-2.5 h-0.5 w-full rounded-lg bg-[#E5E7E8]" />

      <View className="flex flex-row gap-x-3">
        <Button
          mode="outlined"
          theme={{ colors: { primary: '#2B3FA8' } }}
          className="flex-1 rounded-lg"
          textColor="#2B3FA8"
          style={{ borderColor: '#2B3FA8' }}
        >
          Simpan
        </Button>
        <Button
          theme={{ colors: { primary: '#2B3FA8' } }}
          className="flex-1 rounded-lg"
          mode="contained"
          onPress={() => handleSend()}
        >
          Kirim
        </Button>
      </View>
    </View>
  )
}

export default UploadFileSection
