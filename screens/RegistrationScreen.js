import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { UserContext } from '../components/UserContext';

const RegistrationScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [licenceNumber, setLicenceNumber] = useState('');
  const { setUser } = useContext(UserContext);

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://192.168.1.5:3000/api/register', {
        name,
        password,
        mobileNumber,
        aadharNumber,
        licenceNumber,
      });

      if (response.data.message === 'User registered successfully') {
        setUser(response.data.user);
        navigation.navigate('DrawerNavigator', { screen: 'HomeScreen' });
      } else {
        Alert.alert('Registration Failed', response.data.message);
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response);
        Alert.alert('Registration Failed', error.response.data.message || 'An error occurred. Please try again.');
      } else if (error.request) {
        console.error('Error request:', error.request);
        Alert.alert('Registration Failed', 'No response from server. Please check your network connection.');
      } else {
        console.error('Error message:', error.message);
        Alert.alert('Registration Failed', 'An error occurred. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/at-Photoroom.png')} style={styles.logo} />
      </View>
      <Text style={styles.title}>Create Profile</Text>
      <Text style={styles.subtitle}>Create an account so you can explore all the existing services</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobileNumber}
        onChangeText={setMobileNumber}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Aadhar Number"
        value={aadharNumber}
        onChangeText={setAadharNumber}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Driving Licence"
        value={licenceNumber}
        onChangeText={setLicenceNumber}
      />
      <View style={styles.button}>
        <TouchableOpacity style={styles.regbutton} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#f0f4f8',
  },
  logoContainer: {
    backgroundColor: '#f0f4f8', 
    alignItems: 'center',
    borderRadius: 100, 
    padding: 10, 
    width: 150,
    height: 100,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black', 
  },
  subtitle: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
    color: 'black', 
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    width: '80%',
  },
  regbutton: {
    flex: 1,
    backgroundColor: '#2196F3', 
    padding: 10,
    margin: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default RegistrationScreen;



























