import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NoteItem from './NoteItem';

const PRIMARY_BLUE = '#0D47A1';

const NoteCard = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Catatan Terbaru</Text>
      </View>

      <View style={styles.bodyContainer}>
        <NoteItem 
          title="Revisi : BAB I - Latar belakang"
          preview="Perbaiki bagian metodologi ..."
          time="56 menit yang lalu"
        />
        
        <View style={styles.divider} />

        <NoteItem 
          title="Ide : BAB 3"
          preview="Bagaimana jika judul proposal ..."
          time="2 jam yang lalu"
        />

        <TouchableOpacity onPress={() => navigation.navigate('Catatan')}>
          <Text style={styles.linkText}>Lihat semua</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    // Margin bawah ekstra besar agar tidak tertutup FAB dan Bottom Nav
    marginBottom: 100, 
    borderRadius: 10,

  },
  header: {
    backgroundColor: PRIMARY_BLUE,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bodyContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderWidth: 1.5, // Border biru di area putih
    borderColor: PRIMARY_BLUE,
    borderTopWidth: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
    elevation: 4,
    backgroundColor: 'white',
  },
  divider: {
    height: 1,
    backgroundColor: PRIMARY_BLUE,
    marginVertical: 12,
    opacity: 0.5,
  },
  linkText: {
    color: PRIMARY_BLUE,
    fontWeight: 'bold',
    marginTop: 15,
    fontSize: 14,
  },
});

export default NoteCard;