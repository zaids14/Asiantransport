import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AddTripScreen = ({navigation}) => {
   const handleAdd = () => {
    navigation.navigate('');
   };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}> Add Next Trip</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>T-Id</Text>
          <Text style={styles.tableCell}>LR No.</Text>
          <Text style={styles.tableCell}>Vehicle No.</Text>
        </View>
        {/* Additional rows can be added here */}
      </View>
      {/* <TouchableOpacity style={styles.addButton} >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8DEF8',
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  table: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#E8DEF8'
  },
  addButton: {
    backgroundColor: '#4C8F99',
    padding: 16,
    borderRadius: 50,
    position: 'absolute',
    bottom: 16,
    right: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddTripScreen;
