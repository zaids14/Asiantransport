import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { UserContext } from '../components/UserContext';

const LoginScreen = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.1.5:3000/api/login', { mobileNumber, password });
      if (response.data.message === 'Login successful') {
        setUser(response.data.user); 
        navigation.navigate('DrawerNavigator', { screen: 'HomeScreen' });
      } else {
        Alert.alert('Login Failed', response.data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Login Failed', 'An error occurred. Please try again.');
    }
  };

  const handleRegister = () => {
    navigation.navigate('RegistrationScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/at-Photoroom.png')} style={styles.logo} />
        <Text style={styles.title}>Login here</Text>
        <Text style={styles.subtitle}>Welcome back you’ve been missed!</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobileNumber}
        onChangeText={setMobileNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.button}>
        <TouchableOpacity style={styles.logbutton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.terms}>By signing up you agree to our Privacy Policy and terms</Text>

      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.register}>New Member? Register now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
 container: {
      flex: 1,
      justifyContent: 'flex-start',
      padding: 40,
      backgroundColor: '#f0f4f8',
      alignItems: 'center',
    },
    logoContainer: {
      backgroundColor: '#f0f4f8', 
      alignItems: 'center',
      borderRadius: 100, 
      padding: 10, 
      width: 250,
      height: 250,
    },
    logo: {
      width: '50%',
      height: '50%',
    },
    title: {
      marginTop: 30,
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'black', 
    },
    subtitle: {
      marginTop: 15,
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
      marginTop: 20,
      borderRadius: 5,
    },
    button: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 40,
      width: '80%'
    },
    logbutton:{
      flex:1,
      backgroundColor: '#4CAF50', 
      padding: 10,
      margin:5,
      alignItems: 'center',
      borderRadius: 5
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
    terms: {
      marginTop: 30,
      textAlign: 'center',
      color: '#000000',
    },
    register: {
      marginTop: 50,
      textAlign: 'center',
      color: '#3498db',
      textDecorationLine: 'underline',
    },
  });
  
  export default LoginScreen;