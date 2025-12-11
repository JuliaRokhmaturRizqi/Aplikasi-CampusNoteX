import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PRIMARY_BLUE = '#0D47A1';

const GreetingSection = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        Hallo, Julia <Text style={styles.waveEmoji}>👋</Text>
      </Text>
      <Text style={styles.subGreeting}>Semester 7 . Informatika</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 26,
    fontWeight: 'bold',
    color: PRIMARY_BLUE,
  },
  waveEmoji: {
    fontSize: 26,
  },
  subGreeting: {
    fontSize: 15,
    color: PRIMARY_BLUE, // Menggunakan warna biru yang sama, terlihat di gambar
    marginTop: 5,
    opacity: 0.9,
  },
});

export default GreetingSection;