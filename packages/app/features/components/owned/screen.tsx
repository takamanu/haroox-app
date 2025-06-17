import React, { useState, useEffect } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { getUserComponents } from '../service/api'
import { A, H1, P, Text, TextLink } from 'app/design/typography'
import { View } from 'app/design/view'

// Di form screen
export function ComponentsOwnedScreen() {
    const [components, setComponents] = useState<any[]>([]);

    useEffect(() => {
        const fetchComponents = async () => {
            try {
                const res = await getUserComponents(); // ini harus return { status, message, data }
                if (res.status) {
                    setComponents(res.data);
                } else {
                    console.error('Failed fetching components', res.message);
                }
            } catch (err) {
                console.error('Error fetching components', err);
            }
        }

        fetchComponents();
    }, []);

    return (
        <ScrollView className="bg-gray-100" showsVerticalScrollIndicator={false}>
            <View className="p-5">
                <Text className="text-xl font-bold mb-4">Component Owned</Text>

                {components.map((item) => (
                    <View key={item.id} className="bg-white p-4 rounded-lg shadow mb-3">
                        <Text
                            className={`text-2xl font-bold text-center mb-4 ${item.component_current_process == "Accepted" ? 'text-green-600' : 'text-red-600'
                                }`}
                        >
                            HALAL STATUS = {item.component_current_process == "Accepted" ? 'HALAL' : 'NOT HALAL'}
                        </Text>
                        <Text className="font-semibold">{item.component_name}</Text>
                        <Text>Batch: {item.component_batch}</Text>
                        <Text>Origin: {item.component_origin}</Text>
                        <Text>Location: {item.component_current_location}</Text>
                        <Text>Process: {item.component_current_process}</Text>
                        <Text>Expired Date: {new Date(item.component_expired_date).toLocaleDateString()}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>

    )
}

