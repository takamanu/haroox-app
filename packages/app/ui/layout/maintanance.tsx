import { View, Text, Image } from 'react-native';
import ImageMaintenance from "app/ui/assets/maintenance.svg"

export default function Maintenance() {
    return (
        <View className="flex-1 bg-white justify-center items-center w-full">
            <ImageMaintenance  width={300} height={300} />
            <Text className="text-lg font-bold text-gray-800">
                Cooming Soon
            </Text>
        </View>
    );
}

