import React, { useEffect, useRef } from 'react';
import { View,  StyleSheet, Animated } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const fadeAnimImage = useRef(new Animated.Value(0)).current; 
  const scaleAnimImage = useRef(new Animated.Value(0.8)).current; 

  const fadeAnimText = useRef(new Animated.Value(0)).current; 
  const translateYAnimText = useRef(new Animated.Value(30)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnimImage, {
        toValue: 1,
        duration: 1000, 
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimImage, {
        toValue: 1,
        duration: 1000, 
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnimText, {
          toValue: 1,
          duration: 1000, 
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnimText, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1000);

    const timer = setTimeout(() => {
      navigation.navigate('WelcomeScreen');
    }, 6000);

    return () => clearTimeout(timer);
  }, [fadeAnimImage, scaleAnimImage, fadeAnimText, translateYAnimText, navigation]);

  return (
    <View style={styles.splashScreenContainer}>
      <Animated.Image source={require('../assets/at-Photoroom.png')} style={[styles.logoImage,{ opacity: fadeAnimImage, transform: [{ scale: scaleAnimImage }] }, ]}/>
      <Animated.Text style={[styles.titleText,{ opacity: fadeAnimText, transform: [{ translateY: translateYAnimText }] },]}>
        Asian{'\n'}Transport
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  splashScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    lineHeight: 40, 
  },
  logoImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default SplashScreen;
