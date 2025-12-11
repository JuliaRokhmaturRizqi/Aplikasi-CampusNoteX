import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PRIMARY_BLUE = '#0D47A1';

const QuoteCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.quoteText}>
          Tak apa jika kau gagal, setidaknya kamu sudah tumbuh dan berkembang
        </Text>
        <Text style={styles.author}>-TataRzq</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  card: {
    borderWidth: 1.5, // Border sedikit lebih tebal
    borderColor: PRIMARY_BLUE,
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    // Shadow halus agar sedikit terangkat
    elevation: 2,
    shadowColor: PRIMARY_BLUE,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quoteText: {
    fontSize: 15,
    color: PRIMARY_BLUE,
    fontFamily: 'serif', // KUNCI: Menggunakan font Serif
    lineHeight: 22,
  },
  author: {
    marginTop: 15,
    fontSize: 15,
    color: PRIMARY_BLUE,
    fontFamily: 'serif', // KUNCI: Menggunakan font Serif
  },
});

export default QuoteCard;