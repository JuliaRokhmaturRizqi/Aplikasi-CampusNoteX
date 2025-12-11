import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ScheduleItem from './ScheduleItem';

const PRIMARY_BLUE = '#0D47A1';

const ScheduleCard = () => {
  return (
    <View style={styles.wrapper}>
      {/* Header Card */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Jadwal hari ini</Text>
      </View>

      {/* Body Card dengan Border Biru */}
      <View style={styles.bodyContainer}>
        <ScheduleItem 
          time="9.00" 
          title="Bimbingan Proposal" 
          location="Ruang Fst. C01" 
        />
        
        <View style={styles.divider} />

        <ScheduleItem 
          time="14.00" 
          title="Meeting magang" 
          location="Link belum tersedia" 
        />

        <TouchableOpacity >
          <Text style={styles.linkText}>Lihat semua</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    marginBottom: 25,
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
    borderTopWidth: 0, // Hilangkan border atas karena sudah menyatu dengan header
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden', // Agar header dan body sudutnya sama
    elevation: 4, // Shadow keseluruhan
    backgroundColor: 'white', // Penting untuk shadow di Android
  },
  divider: {
    height: 1,
    backgroundColor: PRIMARY_BLUE,
    marginVertical: 12,
    opacity: 0.5, // Garis pemisah sedikit lebih transparan
  },
  linkText: {
    color: PRIMARY_BLUE,
    fontWeight: 'bold',
    marginTop: 15,
    fontSize: 14,
  },
});

export default ScheduleCard;