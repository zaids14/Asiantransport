// ProfileScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { UserContext } from '../components/UserContext'

const ProfileScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>No user data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../assets/profile.png')} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Name</Text>
          <View style={styles.row}>
            <Text style={styles.infoText}>{user.name}</Text>
            <TouchableOpacity style={styles.editIcon}>
              <Icon name="pencil-outline" size={20} color="#4C8F99" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Mobile Number</Text>
          <View style={styles.row}>
            <Text style={styles.infoText}>{user.mobileNumber}</Text>
            <TouchableOpacity style={styles.editIcon}>
              <Icon name="pencil-outline" size={20} color="#4C8F99" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Aadhar Number</Text>
          <View style={styles.row}>
            <Text style={styles.infoText}>{user.aadharNumber}</Text>
            <TouchableOpacity style={styles.editIcon}>
              <Icon name="pencil-outline" size={20} color="#4C8F99" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Driving Licence No</Text>
          <View style={styles.row}>
            <Text style={styles.infoText}>{user.licenceNumber}</Text>
            <TouchableOpacity style={styles.editIcon}>
              <Icon name="pencil-outline" size={20} color="#4C8F99" />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.footerText}>Asian Transport V.1.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    padding: 16,
  },
  content: {
    marginTop: 80,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  infoContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  editIcon: {
    marginLeft: 10,
  },
  footerText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 30,
  },
});

export default ProfileScreen;





















