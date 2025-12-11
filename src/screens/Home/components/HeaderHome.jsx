import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PRIMARY_BLUE = '#0D47A1';

const HeaderHome = () => {
  return (
    <View style={styles.headerContainer}>
      {/* Mengatur Status Bar agar ikon berwarna terang di background gelap */}
      <StatusBar barStyle="light-content" backgroundColor={PRIMARY_BLUE} />
      
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          {/* Pastikan file ini ada di folder assets proyek Anda */}
          <Image 
            source={require('../../../../assets/Logo_putih.jpg')} 
            style={styles.logo}
          />
        </View>
        
        <View style={styles.rightContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="person-circle" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications" size={26} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: PRIMARY_BLUE,
    // Padding tambahan untuk aman dari notch/status bar di iOS dan Android
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 50,
    paddingBottom: 0,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: -10,
    paddingTop: -100,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 114,
    height: 102,
    marginRight: 1,
    marginTop: -35,
    marginBottom: -3,
  },

  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -35,
    marginBottom: -3,
  },
  iconButton: {
    marginLeft: 12,
  },
});

export default HeaderHome;