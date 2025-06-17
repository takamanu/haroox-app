import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { getUserProducts } from '../service/api'  // Update your API service accordingly
import { Text } from 'app/design/typography'
import { View } from 'app/design/view'

export function ProductsOwnedScreen() {
    const [products, setProducts] = useState<any[]>([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await getUserProducts()  // This should return { status, message, data }
                if (res.status) {
                    setProducts(res.data)
                } else {
                    console.error('Failed fetching products', res.message)
                }
            } catch (err) {
                console.error('Error fetching products', err)
            }
        }

        fetchProducts()
    }, [])

    return (
        <ScrollView className="bg-gray-100" showsVerticalScrollIndicator={false}>
            <View className="p-5">
                <Text className="text-xl font-bold mb-4">Products Owned</Text>

                {products.map((item) => (
                    <View key={item.id} className="bg-white p-4 rounded-lg shadow mb-3">
                        <Text className="font-semibold">{item.product_name}</Text>
                        <Text>Batch: {item.product_batch || '-'}</Text>
                        <Text>Origin: {item.product_origin}</Text>
                        <Text>Location: {item.product_current_location}</Text>
                        <Text>Process: {item.product_current_process || '-'}</Text>
                        <Text>Expired Date: {new Date(item.product_expired_date).toLocaleDateString()}</Text>
                        <Text>Component IDs: {item.component_ids.join(', ')}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}
