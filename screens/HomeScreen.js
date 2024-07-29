import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import * as Location from 'expo-location';

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState(null);

  useEffect(() => {
    const checkLocationPermission = async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      setPermissionStatus(status);
      if (status !== 'granted') {
        const timer = setTimeout(() => {
          setModalVisible(true);
        }, 2000);

        return () => clearTimeout(timer);
      }
    };
    checkLocationPermission();
  }, []);

  const handlePermission = async (option) => {
    if (option === 'whileUsing') {
      await Location.requestForegroundPermissionsAsync();
      setModalVisible(false);
    } else if (option === 'alwaysAllow') {
      await Location.requestForegroundPermissionsAsync(); 
      setModalVisible(false);
      navigation.navigate('DrawerNavigator', { screen: 'Allowed' });
    } else if (option === 'deny') {
      setModalVisible(false);
      navigation.navigate('DrawerNavigator', { screen: 'Denied' });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome to Asian Transport</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.currentLocation}>
          <Text style={styles.locationTitle}>Current Location:</Text>
          <View style={styles.locationInfo}>
            <Image source={require('../assets/map.png')} style={styles.locationIcon} />
            <Text style={styles.locationText}>Mumbai, India</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.trackButton} onPress={() => navigation.navigate('Tracking')}>
          <Text style={styles.trackButtonText}>Start Live Tracking</Text>
        </TouchableOpacity>
        <View style={styles.recentTrips}>
          <Text style={styles.recentTripsTitle}>Recent Trips:</Text>
          <View style={styles.tripItem}>
            <Text style={styles.tripText}>Trip to Pune</Text>
          </View>
          <View style={styles.tripItem}>
            <Text style={styles.tripText}>Trip to Goa</Text>
          </View>
        </View>
        <View style={styles.notifications}> 
          <Text style={styles.notificationsTitle}>Notifications:</Text>
          <View style={styles.notificationItem}>
            <Text style={styles.notificationText}>New update available!</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.addbutton} onPress={() => navigation.navigate('TripScreen')}>
          <Text style={styles.addbuttonText}>Add Trip</Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { setModalVisible(!modalVisible); }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.ImageContainer}>
              <Image style={styles.image} source={require('../assets/google-maps.png')} />
            </View>
            <Text style={styles.permissionText}>
              Allow "Maps" to access your location while you are using the app?
            </Text>
            <Text style={styles.descriptionText}>
              Your current location will be displayed on the map and used for directions, nearby search results, and estimated travel time.
            </Text>
            <TouchableOpacity style={styles.permissionButton} onPress={() => handlePermission('whileUsing')}>
              <Text style={styles.permissionButtonText}>Only while using the App</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.permissionButton} onPress={() => handlePermission('alwaysAllow')}>
              <Text style={styles.permissionButtonText}>Always Allow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.permissionButton} onPress={() => handlePermission('deny')}>
              <Text style={styles.permissionButtonText}>Don't Allow</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  currentLocation: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 15,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  locationText: {
    fontSize: 16,
  },
  trackButton: {
    backgroundColor: '#4C8F99',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  trackButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recentTrips: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 12,
    marginBottom: 15,
  },
  recentTripsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tripItem: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  tripText: {
    fontSize: 16,
  },
  notifications: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 12,
  },
  notificationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  notificationItem: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  notificationText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    width: '80%',
  },
  ImageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
  permissionText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  permissionButton: {
    backgroundColor: '#4C8F99',
    padding: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addbutton:{
    backgroundColor: '#4C8F99',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 15
  },
  addbuttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }, 
});

export default HomeScreen;



























// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, Modal,  ScrollView } from 'react-native';

// const HomeScreen = ({ navigation }) => {
//   const [modalVisible, setModalVisible] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setModalVisible(true);
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Welcome to Asian Transport</Text>
//       </View>
//       <ScrollView contentContainerStyle={styles.scrollView}>
//         <View style={styles.currentLocation}>
//           <Text style={styles.locationTitle}>Current Location:</Text>
//           <View style={styles.locationInfo}>
//             <Image source={require('../assets/map.png')} style={styles.locationIcon} />
//             <Text style={styles.locationText}>Mumbai, India</Text>
//           </View>
//         </View>
//         <TouchableOpacity style={styles.trackButton} onPress={() => navigation.navigate('Tracking')} >
//           <Text style={styles.trackButtonText}>Start Live Tracking</Text>
//         </TouchableOpacity>
//         <View style={styles.recentTrips}>
//           <Text style={styles.recentTripsTitle}>Recent Trips:</Text>
//           <View style={styles.tripItem}>
//             <Text style={styles.tripText}>Trip to Pune</Text>
//           </View>
//           <View style={styles.tripItem}>
//             <Text style={styles.tripText}>Trip to Goa</Text>
//           </View>
//         </View>
//         <View style={styles.notifications}> 
//           <Text style={styles.notificationsTitle}>Notifications:</Text>
//           <View style={styles.notificationItem}>
//             <Text style={styles.notificationText}>New update available!</Text>
//           </View>
//         </View>
//         <TouchableOpacity style={styles.addbutton} onPress={() => navigation.navigate('TripScreen')}>
//           <Text style={styles.addbuttonText}>Add Trip</Text>
//         </TouchableOpacity>
//       </ScrollView>
//       <Modal animationType="slide" transparent={true} visible={modalVisible} 
//       onRequestClose={() => {setModalVisible(!modalVisible); }} >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <View style={styles.ImageContainer}>
//               <Image style={styles.image} source={require('../assets/google-maps.png')} />
//             </View>
//             <Text style={styles.permissionText}>
//               Allow "Maps" to access your location while you are using the app?
//             </Text>
//             <Text style={styles.descriptionText}>
//               Your current location will be displayed on the map and used for directions, nearby search results, and estimated travel time.
//             </Text>
//             <TouchableOpacity style={styles.permissionButton} onPress={() => {setModalVisible(false)}}>
//               <Text style={styles.permissionButtonText}>Only while using the App</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.permissionButton} onPress={() => { setModalVisible(false); navigation.navigate('DrawerNavigator', { screen: 'Allowed' }); }}>
//               <Text style={styles.permissionButtonText}>Always Allow</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.permissionButton} onPress={() => { setModalVisible(false); navigation.navigate('DrawerNavigator', { screen: 'Denied' }); }}>
//               <Text style={styles.permissionButtonText}>Don't Allow</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0f4f8',
//     padding: 16,
//   },
//   header: {
//     alignItems: 'center',
//     paddingVertical: 20,
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   scrollView: {
//     flexGrow: 1,
//     justifyContent: 'center',
//   },
//   currentLocation: {
//     backgroundColor: '#ffffff',
//     borderRadius: 20,
//     padding: 16,
//     marginBottom: 15,
//   },
//   locationTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   locationInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   locationIcon: {
//     width: 30,
//     height: 30,
//     marginRight: 10,
//   },
//   locationText: {
//     fontSize: 16,
//   },
//   trackButton: {
//     backgroundColor: '#4C8F99',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   trackButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   recentTrips: {
//     backgroundColor: '#ffffff',
//     borderRadius: 20,
//     padding: 12,
//     marginBottom: 15,
//   },
//   recentTripsTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   tripItem: {
//     backgroundColor: '#f0f0f0',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   tripText: {
//     fontSize: 16,
//   },
//   notifications: {
//     backgroundColor: '#ffffff',
//     borderRadius: 20,
//     padding: 12,
//   },
//   notificationsTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   notificationItem: {
//     backgroundColor: '#f0f0f0',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   notificationText: {
//     fontSize: 16,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#ffffff',
//     borderRadius: 20,
//     padding: 20,
//     width: '80%',
//   },
//   ImageContainer: {
//     alignItems: 'center',
//   },
//   image: {
//     width: 50,
//     height: 50,
//   },
//   permissionText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 8,
//   },
//   descriptionText: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 16,
//   },
//   permissionButton: {
//     backgroundColor: '#4C8F99',
//     padding: 16,
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 4,
//   },
//   permissionButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   addbutton:{
//     backgroundColor: '#4C8F99',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 15,
//     marginTop: 15
//   },
//   addbuttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default HomeScreen;



























