import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function AllowedScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.illustrationContainer}>
        <Image source={require('../assets/truck-tracking.png')} style={styles.illustrationImage} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Asian Transport Tracking </Text>
        <Text style={styles.description}>Track your trips and manage your transport seamlessly.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TripScreen')}>
          <Icon name="car-outline" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Go to Trip Screen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Tracking')}>
          <Icon name="locate-outline" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Start Tracking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default AllowedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  illustrationContainer: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  illustrationImage: {
    width: 450,
    height: 300,
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4C8F99',
    padding: 16,
    borderRadius: 8,
    marginVertical: 10,
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});









// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// // import Video from 'react-native-video'; // Uncomment this line if you are using react-native-video

// const AllowedScreen = ({navigation}) => {
//   const handleLogin = () => {
//     navigation.navigate('TripScreen');
//   };
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Icon name='menu-outline' size={24} color="black" onPress={toggleMenu} />
//         <Text style={styles.headerText}>Asian Transport</Text>
//         <Icon name="notifications-outline" size={24} color="black" />
//       </View>
//       {isMenuOpen ? (
//         <View style={styles.menu}>
//           <Text style={styles.headerText}>Asian Transport V.1.0.</Text>
//           <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Image source={require('../assets/user.png')} style={styles.buttonImage} />
//         <Text style={styles.buttonText}>John Doe</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Image source={require('../assets/profile.png')} style={styles.buttonImage} />
//         <Text style={styles.buttonText}>Profile</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Image source={require('../assets/plus.png')} style={styles.buttonImage} />
//         <Text style={styles.buttonText}>Add Trip</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Image source={require('../assets/power-off.png')} style={styles.buttonImage} />
//         <Text style={styles.buttonText}>Log Out</Text>
//       </TouchableOpacity>
//         </View>
//       ) : (
//         <View style={styles.illustrationContainer}>
//           <Image 
//             source={require('../assets/delivery-truck.png')} 
//             style={styles.illustrationImage}
//           />
//           {/* <Video 
//             source={{ uri: 'https://path-to-your-video' }} 
//             style={styles.illustrationVideo}
//             controls
//           /> */}
          
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E8DEF8',
//     padding: 16,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   headerText: {
//     fontSize: 16,
//     fontWeight: 'normal',
//     textAlign: 'center'
//   },
//   menu: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 20,
//     position: 'absolute',
//     top: 60,
//     left: 0,
//     right: 120,
//   },
//   button: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       padding: 10,
//       borderRadius: 5,
//    },
//   buttonText: {
//     fontSize: 16,
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   buttonImage: {
//    width: 25,
//    height: 25,
//    marginRight: 10,
//   },
//   illustrationContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   illustrationImage: {
//     width: 300,
//     height: 300,
//     resizeMode: 'contain',
//   },
//   illustrationVideo: {
//     width: 300,
//     height: 300,
//   },
// });

// export default AllowedScreen;
