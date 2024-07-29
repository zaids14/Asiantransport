import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet,View,Image,Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import HomeScreen from './screens/HomeScreen';
import AllowedScreen from './screens/LocationAllowedScreen';
import DeniedScreen from './screens/LocationDeniedScreen';
import TripScreen from './screens/TripScreen';
import ProfileScreen from './screens/ProfileScreen';
import TrackingScreen from './screens/TrackingScreen';
import LogoutScreen from './screens/LogoutScreen';
import CustomDrawerHeader from './screens/CustomDrawerHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UserProvider,UserContext } from './components/UserContext';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function CustomDrawerContent(props) {
  const { user } = React.useContext(UserContext);
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <CustomDrawerHeader user={user} />
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.footer}>
        <Image source={require('./assets/at-Photoroom.png')} style={styles.logo} />
        <Text style={styles.footerText}>Asian Transport V.1.0</Text>
      </View>
    </View>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="HomeScreen" drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="Tracking"
        component={TrackingScreen}
        options={{
          drawerLabel: 'Live Tracking',
          drawerIcon: ({ color, size }) => <Ionicons name="locate-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="Allowed"
        component={AllowedScreen}
        options={{
          drawerLabel: 'Allowed',
          drawerIcon: ({ color, size }) => <Ionicons name="location-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="Denied"
        component={DeniedScreen}
        options={{
          drawerLabel: 'Denied',
          drawerIcon: ({ color, size }) => <Ionicons name="close-circle-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerLabel: 'Profile',
          drawerIcon: ({ color, size }) => <Ionicons name="person-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="TripScreen"
        component={TripScreen}
        options={{
          drawerLabel: 'Add Trip',
          drawerIcon: ({ color, size }) => <Ionicons name="car-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          drawerLabel: 'Logout',
          drawerIcon: ({ color, size }) => <Ionicons name="log-out-outline" color={color} size={size} />,
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
          <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#f0f4f8',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  logo: {
    width: 30,
    height: 30,
  },
});



























































