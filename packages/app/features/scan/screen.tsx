import { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Text, Alert, ActivityIndicator, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { View } from 'app/design/view';
import { getComponentByBatch, getProductByBatch } from './service/api'; // You'll write these

export function ScanScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    setScanned(true);
    setLoading(true);

    try {
      let response;
      if (data.startsWith('C')) {
        // const id = data.slice(1); // remove 'C'
        console.log(data)

        response = await getComponentByBatch(data);
      } else if (data.startsWith('P')) {
        // const id = data.slice(1); // remove 'P'
        console.log(data)
        response = await getProductByBatch(data);
      } else {
        Alert.alert('Invalid QR', 'QR code does not start with C or P');
      }

      setResult(response?.data ?? null);
    } catch (error) {
      console.error('API error:', error);
      Alert.alert('Error', 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  if (hasPermission === null) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <ScrollView className="bg-gray-100" showsVerticalScrollIndicator={false}>
      <View className="p-5 flex-1">
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ width: '100%', height: 400, borderRadius: 50 }}
        />

        {loading && <ActivityIndicator size="large" color="#0000ff" className="mt-4" />}

        {result && (
          <View className="mt-4 p-4 bg-white rounded-lg shadow">
            {/* HALAL STATUS */}
            <Text
              className={`text-2xl font-bold text-center mb-4 ${result.halal_certify?.halal_exp_date ? 'text-green-600' : 'text-red-600'
                }`}
            >
              HALAL STATUS = {result.halal_certify?.halal_exp_date ? 'HALAL' : 'NOT HALAL'}
            </Text>

            {/* DATA DETAILS */}
            <Text className="font-bold mb-2">Fetched Data:</Text>
            {Object.entries(result).map(([key, value]) => {
              const formattedKey = key
                .replace(/_/g, ' ')
                .replace(/\b\w/g, char => char.toUpperCase());

              if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
                return (
                  <View key={key} className="mt-2">
                    <Text className="font-semibold mb-1">{formattedKey}</Text>
                    {value.map((item, index) => (
                      <View key={index} className="bg-gray-50 p-2 rounded mb-1">
                        {Object.entries(item).map(([subKey, subValue]) => {
                          const subFormattedKey = subKey
                            .replace(/_/g, ' ')
                            .replace(/\b\w/g, char => char.toUpperCase());

                          if (
                            (subKey === 'proof' || subKey === 'proof_url') &&
                            typeof subValue === 'string' &&
                            subValue.startsWith('http')
                          ) {
                            return (
                              <View key={subKey} className="my-1">
                                <Text className="font-semibold">{subFormattedKey}</Text>
                                <Image
                                  source={{ uri: subValue }}
                                  style={{ width: 150, height: 150, marginTop: 4 }}
                                  resizeMode="contain"
                                />
                              </View>
                            );
                          }

                          let displaySubValue = '';
                          if (typeof subValue === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(subValue)) {
                            const date = new Date(subValue);
                            displaySubValue = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getFullYear()).slice(2)} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
                          } else {
                            displaySubValue = String(subValue);
                          }

                          return (
                            <View key={subKey} className="flex-row justify-between border-b border-gray-200 py-1">
                              <Text className="font-semibold">{subFormattedKey}</Text>
                              <Text className="max-w-[60%] text-right">{displaySubValue}</Text>
                            </View>
                          );
                        })}
                      </View>
                    ))}
                  </View>
                );
              }

              if (typeof value === 'object' && value !== null) {
                return (
                  <View key={key} className="mt-2">
                    <Text className="font-semibold mb-1">{formattedKey}</Text>
                    {Object.entries(value).map(([subKey, subValue]) => {
                      const subFormattedKey = subKey
                        .replace(/_/g, ' ')
                        .replace(/\b\w/g, char => char.toUpperCase());

                      if (
                        (subKey === 'proof' || subKey === 'proof_url') &&
                        typeof subValue === 'string' &&
                        subValue.startsWith('http')
                      ) {
                        return (
                          <View key={subKey} className="my-1">
                            <Text className="font-semibold">{subFormattedKey}</Text>
                            <Image
                              source={{ uri: subValue }}
                              style={{ width: 150, height: 150, marginTop: 4 }}
                              resizeMode="contain"
                            />
                          </View>
                        );
                      }

                      if (Array.isArray(subValue) && subValue.length > 0 && typeof subValue[0] === 'object') {
                        return (
                          <View key={subKey} className="mt-2">
                            <Text className="font-semibold">{subFormattedKey}</Text>
                            {subValue.map((item, idx) => (
                              <View key={idx} className="bg-gray-50 p-2 rounded mb-1">
                                {Object.entries(item).map(([nestedKey, nestedValue]) => {
                                  const nestedFormattedKey = nestedKey
                                    .replace(/_/g, ' ')
                                    .replace(/\b\w/g, char => char.toUpperCase());

                                  if (
                                    (nestedKey === 'proof' || nestedKey === 'proof_url') &&
                                    typeof nestedValue === 'string' &&
                                    nestedValue.startsWith('http')
                                  ) {
                                    return (
                                      <View key={nestedKey} className="my-1">
                                        <Text className="font-semibold">{nestedFormattedKey}</Text>
                                        <Image
                                          source={{ uri: nestedValue }}
                                          style={{ width: 150, height: 150, marginTop: 4 }}
                                          resizeMode="contain"
                                        />
                                      </View>
                                    );
                                  }

                                  let displayNestedValue = '';
                                  if (typeof nestedValue === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(nestedValue)) {
                                    const date = new Date(nestedValue);
                                    displayNestedValue = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getFullYear()).slice(2)} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
                                  } else {
                                    displayNestedValue = String(nestedValue);
                                  }

                                  return (
                                    <View key={nestedKey} className="flex-row justify-between border-b border-gray-200 py-1">
                                      <Text className="font-semibold">{nestedFormattedKey}</Text>
                                      <Text className="max-w-[60%] text-right">{displayNestedValue}</Text>
                                    </View>
                                  );
                                })}
                              </View>
                            ))}
                          </View>
                        );
                      }

                      let displaySubValue = '';
                      if (typeof subValue === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(subValue)) {
                        const date = new Date(subValue);
                        displaySubValue = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getFullYear()).slice(2)} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
                      } else {
                        displaySubValue = String(subValue);
                      }

                      return (
                        <View key={subKey} className="flex-row justify-between border-b border-gray-200 py-1">
                          <Text className="font-semibold">{subFormattedKey}</Text>
                          <Text className="max-w-[60%] text-right">{displaySubValue}</Text>
                        </View>
                      );
                    })}
                  </View>
                );
              }

              let displayValue = '';
              if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
                const date = new Date(value);
                displayValue = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getFullYear()).slice(2)} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
              } else if (Array.isArray(value)) {
                displayValue = value.join(', ');
              } else {
                displayValue = String(value);
              }

              return (
                <View key={key} className="flex-row justify-between border-b border-gray-200 py-1">
                  <Text className="font-semibold">{formattedKey}</Text>
                  <Text className="max-w-[60%] text-right">{displayValue}</Text>
                </View>
              );
            })}
          </View>
        )}







        {scanned && (
          <TouchableOpacity
            className="mt-4 bg-blue-500 p-3 rounded"
            onPress={() => {
              setScanned(false);
              setResult(null);
            }}
          >
            <Text className="text-white text-center">Scan Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}
