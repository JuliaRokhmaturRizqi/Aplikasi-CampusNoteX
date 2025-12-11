import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PRIMARY_BLUE = '#0D47A1';

const ScheduleItem = ({ time, title, location }) => {
  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        {/* Waktu menggunakan Serif */}
        <Text style={styles.timeText}>{time}</Text>
      </View>
      <View style={styles.contentContainer}>
        {/* Judul menggunakan Serif dan Bold */}
        <Text style={styles.title}>{title}</Text>
        {/* Lokasi menggunakan Sans-serif standar (default) */}
        <Text style={styles.location}>{location}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // Align center secara vertikal agar waktu pas di tengah teks kanan
    alignItems: 'center', 
    paddingVertical: 5,
  },
  timeContainer: {
    width: 70, // Sedikit lebih lebar
    alignItems: 'flex-start', // Rata kiri sesuai gambar
  },
  timeText: {
    fontSize: 17,
    color: PRIMARY_BLUE,
    fontFamily: 'serif', // KUNCI: Serif
  },
  contentContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: PRIMARY_BLUE,
    fontFamily: 'serif', // KUNCI: Serif bold
    marginBottom: 3,
  },
  location: {
    fontSize: 14,
    color: PRIMARY_BLUE, // Warna biru juga
  },
});

export default ScheduleItem;