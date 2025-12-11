import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PRIMARY_BLUE = '#0D47A1';

const NoteItem = ({ title, preview, time }) => {
  return (
    <View style={styles.container}>
      {/* Judul Serif Bold */}
      <Text style={styles.title}>{title}</Text>
      {/* Preview Serif */}
      <Text style={styles.preview}>{preview}</Text>
      {/* Timestamp kecil abu-abu */}
      <Text style={styles.time}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: PRIMARY_BLUE,
    fontFamily: 'serif', // KUNCI
    marginBottom: 5,
  },
  preview: {
    fontSize: 15,
    color: PRIMARY_BLUE,
    fontFamily: 'serif', // KUNCI
    marginBottom: 8,
  },
  time: {
    fontSize: 11,
    color: '#888', // Abu-abu terang
    fontStyle: 'italic', // Tampak sedikit miring di gambar
  },
});

export default NoteItem;