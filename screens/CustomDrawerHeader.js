import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CustomDrawerHeader = ({ user }) => {
  const username = user?.username || 'Guest';
  const profileImage = user?.profileImage || require('../assets/profile.png');
  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
      <Image source={ profileImage } style={styles.profileImage} />
      <Text style={styles.username}>{username}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f0f4f8',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 40,
    marginRight: 10,  
  },
  username: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'normal',
  },
});

export default CustomDrawerHeader;





  
