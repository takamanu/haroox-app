import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';

const generateNext30Days = () => {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);
    days.push({
      key: i.toString(),
      label: d.toISOString().split('T')[0], // YYYY-MM-DD
      dateObj: d
    });
  }
  return days;
};

export default function CustomDatePicker({ value, onChange }) {
  const [show, setShow] = useState(false);
  const dates = generateNext30Days();

  return (
    <View>
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          borderRadius: 5,
          backgroundColor: '#fff'
        }}
      >
        <Text>{value ? value : 'Select Date'}</Text>
      </TouchableOpacity>

      <Modal visible={show} transparent={true} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View
            style={{
              backgroundColor: 'white',
              margin: 20,
              borderRadius: 10,
              padding: 20,
              maxHeight: '60%'
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Pick a Date</Text>
            <FlatList
              data={dates}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    padding: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#eee'
                  }}
                  onPress={() => {
                    onChange(item.label);
                    setShow(false);
                  }}
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => setShow(false)}
              style={{
                marginTop: 10,
                alignSelf: 'flex-end',
                padding: 10
              }}
            >
              <Text style={{ color: 'red' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
