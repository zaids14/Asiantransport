import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import axios from 'axios';

const TripScreen = ({  }) => {
  const [tripId, setTripId] = useState('');
  const [lrNo, setLrNo] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await axios.get('http://192.168.1.5:3000/api/trips');
      setTrips(response.data);
    } catch (error) {
      console.error('Error fetching trips:', error);
      Alert.alert('Error', 'Failed to fetch trips');
    }
  };

  const handleAdd = async () => {
    if (tripId && lrNo && vehicleNo) {
      try {
        const response = await axios.post('http://192.168.1.5:3000/api/trips', {
          tripId,
          lrNo,
          vehicleNo
        });

        if (response.status === 201) {
          setTrips([...trips, response.data.trip]);
          setTripId('');
          setLrNo('');
          setVehicleNo('');
        }
      } catch (error) {
        console.error('Error adding trip:', error);
        Alert.alert('Error', 'Failed to add trip');
      }
    } else {
      Alert.alert('Validation Error', 'All fields are required');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.tripId}</Text>
      <Text style={styles.tableCell}>{item.lrNo}</Text>
      <Text style={styles.tableCell}>{item.vehicleNo}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Trip ID"
          value={tripId}
          onChangeText={setTripId}
        />
        <TextInput
          style={styles.input}
          placeholder="LR No."
          value={lrNo}
          onChangeText={setLrNo}
        />
        <TextInput
          style={styles.input}
          placeholder="Vehicle No."
          value={vehicleNo}
          onChangeText={setVehicleNo}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCell, styles.tableHeaderCell]}>T-Id</Text>
          <Text style={[styles.tableCell, styles.tableHeaderCell]}>LR No.</Text>
          <Text style={[styles.tableCell, styles.tableHeaderCell]}>Vehicle No.</Text>
        </View>
        <FlatList
          data={trips}
          renderItem={renderItem}
          keyExtractor={item => item.tripId}
          contentContainerStyle={styles.tableContent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  addButton: {
    backgroundColor: '#4C8F99',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  table: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    backgroundColor: '#e0e0e0',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f7f7f7',
    borderRadius: 4,
    margin: 2,
  },
  tableContent: {
    paddingBottom: 20,
  },
});

export default TripScreen;
