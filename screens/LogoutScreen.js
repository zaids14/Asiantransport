import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { UserContext } from '../components/UserContext';

const LogoutScreen = ({ navigation }) => {
  const { setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser(null); 
    navigation.navigate('LoginScreen'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Are you sure you want to log out?</Text>
      <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default LogoutScreen;
