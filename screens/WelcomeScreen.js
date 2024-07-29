import React from "react";
import { View,Image,TouchableOpacity,Text,StyleSheet } from "react-native";

const WelcomeScreen = ({navigation}) => {
    const handleLogin = () => {
        navigation.navigate('LoginScreen');
      };

    const handleRegister = () => {
        navigation.navigate('RegistrationScreen');
      };

    return (
        <View style={styles.container}>
          <View style={styles.logoContainer}>
          <Image source={require('../assets/welcome-Photoroom.png')} style={styles.logo} />
          </View>
          <Text style={styles.maintitle}>"Track with Precision, Deliver with Confidence"</Text>
          <Text style={styles.subtitle}>"Optimize routes and ensure timely deliveries with real-time tracking."</Text>
          <View style={styles.button}>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
          </View>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f4f8',
      
    },
    logoContainer: {
      backgroundColor: '#f0f4f8', 
      borderRadius: 100, 
      padding: 10, 
    },
    logo: {
      width: 300,
      height: 300,
    },
    maintitle: {
      fontSize: 30,
      fontWeight: 'bold',
      marginTop: 30,
      color: 'blue',
      textAlign: 'center'
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'normal',
        marginTop: 20,
      },
    button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    width: '80%'
    },
    loginButton: {
      flex: 1,
      backgroundColor: '#4CAF50', 
      padding: 10,
      margin: 5,
      alignItems: 'center',
      borderRadius: 5,
    },
  registerButton: {
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
  
  export default WelcomeScreen;
  