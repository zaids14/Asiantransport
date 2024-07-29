import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LOCATION_TASK_NAME = 'background-location-task';

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error('Error in background location task:', error);
    return;
  }
  if (data) {
    const { locations } = data;
    console.log('Background location received:', locations);

    try {
      const jsonValue = JSON.stringify(locations);
      await AsyncStorage.setItem('@locations', jsonValue);
      console.log('Locations saved to AsyncStorage:', jsonValue);

      const user = await AsyncStorage.getItem('user');
      const { id: userId } = JSON.parse(user);

      const location = locations[0];
      await axios.post('http://192.168.1.5:3000/api/locations', {
        userId,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      console.log('Location data sent to server:', location);
    } catch (e) {
      console.error('Error saving locations to AsyncStorage or sending to server:', e);
    }
  }
});

const TrackingScreen = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      const backgroundStatus = await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus.status !== 'granted') {
        Alert.alert('Permission to access background location was denied');
        return;
      }

      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.High,
        timeInterval: 300000, 
        distanceInterval: 50,
        showsBackgroundLocationIndicator: true,
      });

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handleRefresh = useCallback(async () => {
    const location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    Alert.alert('Refresh', 'Tracking information refreshed!');
  }, []);

  const handleViewSavedLocations = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@locations');
      const savedLocations = jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log('Saved locations:', savedLocations);
      Alert.alert('Saved Locations', JSON.stringify(savedLocations));
    } catch (e) {
      console.error('Error retrieving locations from AsyncStorage:', e);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 19.0760,
          longitude: 72.8777,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Current Location"
            description="This is your current location"
          />
        )}
      </MapView>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Tracking Information</Text>
        {location && (
          <>
            <Text style={styles.info}>Latitude: {location.coords.latitude}</Text>
            <Text style={styles.info}>Longitude: {location.coords.longitude}</Text>
          </>
        )}
        <Button title="Refresh" onPress={handleRefresh} />
        <Button title="View Saved Locations" onPress={handleViewSavedLocations} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  map: {
    flex: 1,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default TrackingScreen;


























// import React, { useEffect, useState, useCallback } from 'react';
// import { View, Text, StyleSheet, Button, Alert } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import * as Location from 'expo-location';
// import * as TaskManager from 'expo-task-manager';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const LOCATION_TASK_NAME = 'background-location-task';

// TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
//   if (error) {
//     console.error('Error in background location task:', error);
//     return;
//   }
//   if (data) {
//     const { locations } = data;
//     console.log('Background location received:', locations);

//     try {
//       const jsonValue = JSON.stringify(locations);
//       await AsyncStorage.setItem('@locations', jsonValue);
//       console.log('Locations saved to AsyncStorage:', jsonValue);
//     } catch (e) {
//       console.error('Error saving locations to AsyncStorage:', e);
//     }
//   }
// });

// const TrackingScreen = () => {
//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission to access location was denied');
//         return;
//       }

//       const backgroundStatus = await Location.requestBackgroundPermissionsAsync();
//       if (backgroundStatus.status !== 'granted') {
//         Alert.alert('Permission to access background location was denied');
//         return;
//       }

//       await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
//         accuracy: Location.Accuracy.High,
//         timeInterval: 10000,
//         distanceInterval: 50,
//         showsBackgroundLocationIndicator: true,
//       });

//       const location = await Location.getCurrentPositionAsync({});
//       setLocation(location);
//     })();
//   }, []);

//   const handleRefresh = useCallback(async () => {
//     const location = await Location.getCurrentPositionAsync({});
//     setLocation(location);
//     Alert.alert('Refresh', 'Tracking information refreshed!');
//   }, []);

//   const handleViewSavedLocations = async () => {
//     try {
//       const jsonValue = await AsyncStorage.getItem('@locations');
//       const savedLocations = jsonValue != null ? JSON.parse(jsonValue) : null;
//       console.log('Saved locations:', savedLocations);
//       Alert.alert('Saved Locations', JSON.stringify(savedLocations));
//     } catch (e) {
//       console.error('Error retrieving locations from AsyncStorage:', e);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: 19.0760,
//           longitude: 72.8777,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//         showsUserLocation={true}
//         followsUserLocation={true}
//       >
//         {location && (
//           <Marker
//             coordinate={{
//               latitude: location.coords.latitude,
//               longitude: location.coords.longitude,
//             }}
//             title="Current Location"
//             description="This is your current location"
//           />
//         )}
//       </MapView>
//       <View style={styles.infoContainer}>
//         <Text style={styles.title}>Tracking Information</Text>
//         {location && (
//           <>
//             <Text style={styles.info}>Latitude: {location.coords.latitude}</Text>
//             <Text style={styles.info}>Longitude: {location.coords.longitude}</Text>
//           </>
//         )}
//         <Button title="Refresh" onPress={handleRefresh} />
//         <Button title="View Saved Locations" onPress={handleViewSavedLocations} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   map: {
//     flex: 1,
//   },
//   infoContainer: {
//     padding: 20,
//     backgroundColor: '#ffffff',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     elevation: 5,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   info: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
// });

// export default TrackingScreen;































// import React, { useEffect, useState, useCallback } from 'react';
// import { View, Text, StyleSheet, Button, Alert } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import * as Location from 'expo-location';
// import * as TaskManager from 'expo-task-manager';

// const LOCATION_TASK_NAME = 'background-location-task';

// const sendLocationToServer = async (locations) => {
//   try {
//     const response = await fetch('https://your-backend-server.com/api/locations', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(locations),
//     });
//     const data = await response.json();
//     console.log('Location sent to server:', data);
//   } catch (error) {
//     console.error('Error sending location to server:', error);
//   }
// };

// TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
//   if (error) {
//     console.error(error);
//     return;
//   }
//   if (data) {
//     const { locations } = data;
//     console.log('Background location:', locations);
//     await sendLocationToServer(locations);
//   }
// });

// const TrackingScreen = () => {
//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission to access location was denied');
//         return;
//       }

//       const backgroundStatus = await Location.requestBackgroundPermissionsAsync();
//       if (backgroundStatus.status !== 'granted') {
//         Alert.alert('Permission to access background location was denied');
//         return;
//       }

//       await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
//         accuracy: Location.Accuracy.High,
//         timeInterval: 10000,
//         distanceInterval: 50,
//         showsBackgroundLocationIndicator: true,
//       });

//       const location = await Location.getCurrentPositionAsync({});
//       setLocation(location);
//     })();
//   }, []);

//   const handleRefresh = useCallback(async () => {
//     const location = await Location.getCurrentPositionAsync({});
//     setLocation(location);
//     Alert.alert('Refresh', 'Tracking information refreshed!');
//   }, []);

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: 19.0760,
//           longitude: 72.8777,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//         showsUserLocation={true}
//         followsUserLocation={true}
//       >
//         {location && (
//           <Marker
//             coordinate={{
//               latitude: location.coords.latitude,
//               longitude: location.coords.longitude,
//             }}
//             title="Current Location"
//             description="This is your current location"
//           />
//         )}
//       </MapView>
//       <View style={styles.infoContainer}>
//         <Text style={styles.title}>Tracking Information</Text>
//         {location && (
//           <>
//             <Text style={styles.info}>Latitude: {location.coords.latitude}</Text>
//             <Text style={styles.info}>Longitude: {location.coords.longitude}</Text>
//           </>
//         )}
//         <Button title="Refresh" onPress={handleRefresh} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   map: {
//     flex: 1,
//   },
//   infoContainer: {
//     padding: 20,
//     backgroundColor: '#ffffff',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     elevation: 5,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   info: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
// });

// export default TrackingScreen;


























// import React, { useEffect, useState, useCallback } from 'react';
// import { View, Text, StyleSheet, Button, Alert } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import * as Location from 'expo-location';
// import * as TaskManager from 'expo-task-manager';

// const LOCATION_TASK_NAME = 'background-location-task';

// TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
//   if (error) {
//     console.error(error);
//     return;
//   }
//   if (data) {
//     const { locations } = data;
//     console.log('Background location:', locations);
//   }
// });

// const TrackingScreen = () => {
//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission to access location was denied');
//         return;
//       }

//       const backgroundStatus = await Location.requestBackgroundPermissionsAsync();
//       if (backgroundStatus.status !== 'granted') {
//         Alert.alert('Permission to access background location was denied');
//         return;
//       }

//       await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
//         accuracy: Location.Accuracy.High,
//         timeInterval: 10000,
//         distanceInterval: 50,
//         showsBackgroundLocationIndicator: true,
//       });

//       const location = await Location.getCurrentPositionAsync({});
//       setLocation(location);
//     })();
//   }, []);

//   const handleRefresh = useCallback(async () => {
//     const location = await Location.getCurrentPositionAsync({});
//     setLocation(location);
//     Alert.alert('Refresh', 'Tracking information refreshed!');
//   }, []);

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: 19.0760,
//           longitude: 72.8777,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//         showsUserLocation={true}
//         followsUserLocation={true}
//       >
//         {location && (
//           <Marker
//             coordinate={{
//               latitude: location.coords.latitude,
//               longitude: location.coords.longitude,
//             }}
//             title="Current Location"
//             description="This is your current location"
//           />
//         )}
//       </MapView>
//       <View style={styles.infoContainer}>
//         <Text style={styles.title}>Tracking Information</Text>
//         {location && (
//           <>
//             <Text style={styles.info}>Latitude: {location.coords.latitude}</Text>
//             <Text style={styles.info}>Longitude: {location.coords.longitude}</Text>
//           </>
//         )}
//         <Button title="Refresh" onPress={handleRefresh} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   map: {
//     flex: 1,
//   },
//   infoContainer: {
//     padding: 20,
//     backgroundColor: '#ffffff',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     elevation: 5,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   info: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
// });

// export default TrackingScreen;
