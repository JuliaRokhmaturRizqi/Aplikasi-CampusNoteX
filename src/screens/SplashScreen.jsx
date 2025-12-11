// src/screens/SplashScreen.jsx
import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreenExpo from 'expo-splash-screen';

const logo = require('../../assets/Animation_Logo.gif');

// durasi splash 30 detik
const SPLASH_DURATION = 5000;

export default function SplashScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let isMounted = true;

    const start = async () => {
      try {
        // animasi fade-in logo 1.5 detik
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }).start();

        // tunggu 30 detik
        await new Promise(resolve => setTimeout(resolve, SPLASH_DURATION));
      } catch (e) {
        console.warn(e);
      } finally {
        if (!isMounted) return;

        await SplashScreenExpo.hideAsync();
        navigation.replace('Login');
      }
    };

    start();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Animated.Image
          source={logo}
          style={[styles.logo, { opacity: fadeAnim }]}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
