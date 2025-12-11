// src/screens/Auth/Register.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const bg = require('../../../assets/studybackground.png');

export default function Register({ navigation }) {
  const [role, setRole] = useState(null); // 'mahasiswa' | 'dosen' | null

  const onNext = () => {
    if (role === 'mahasiswa') {
      navigation.navigate('RegisterMahasiswa');
    } else if (role === 'dosen') {
      // tampilkan alert bahwa pendaftaran dosen belum tersedia
      Alert.alert(
        'Info',
        'Pendaftaran untuk Dosen belum tersedia pada versi ini.',
        [{ text: 'OK' }],
        { cancelable: true }
      );
    } else {
      // jika belum pilih sama sekali
      Alert.alert('Pilih Role', 'Silakan pilih "Mahasiswa" atau "Dosen" terlebih dahulu.', [{ text: 'OK' }]);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        style={{ flex: 1 }}
      >
        <ImageBackground source={bg} style={styles.bg} imageStyle={styles.bgImage} />

        <View style={styles.wrap}>
          <Text style={styles.title}>Sign Up</Text>

          <View style={styles.card}>
            {/* Mahasiswa */}
            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.optionBtnOutline, role === 'mahasiswa' ? styles.optionBtnActive : null]}
              onPress={() => setRole('mahasiswa')}
            >
              <Text style={[styles.optionText, role === 'mahasiswa' && styles.optionTextActive]}>
                Daftar Sebagai{'\n'}Mahasiswa
              </Text>
            </TouchableOpacity>

            {/* Dosen */}
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.optionBtnOutline,
                role === 'dosen' ? styles.optionBtnActive : null,
              ]}
              onPress={() => setRole('dosen')}
            >
              <Text
                style={[
                  styles.optionTextOutline,
                  role === 'dosen' && styles.optionTextActive,
                ]}
              >
                Daftar Sebagai{'\n'}Dosen
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.nextWrap}
              activeOpacity={0.9}
              onPress={onNext}
            >
              <LinearGradient
                colors={['#1e63c8', '#6ab3ff']}
                start={[0, 0]}
                end={[1, 0]}
                style={[styles.nextBtn, role === null && { opacity: 0.45 }]}
              >
                <Text style={styles.nextText}>SELANJUTNYA</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.bottomRow}>
              <Text style={styles.bottomText}>Sudah Punya Akun? </Text>
              <TouchableOpacity onPress={() => navigation.replace('Login')}>
                <Text style={styles.bottomLink}>Masuk Disini</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const BORDER = '#173f82';

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  bg: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 320,
  },
  bgImage: { resizeMode: 'cover' },

  wrap: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingTop: 190,
  },
  title: {
    fontSize: 36,
    color: BORDER,
    fontWeight: '700',
    marginBottom: 8,
  },

  card: {
    width: '92%',
    maxWidth: 420,
    backgroundColor: '#fff',
    borderRadius: 22,
    paddingVertical: 22,
    paddingHorizontal: 18,
    borderWidth: 2,
    borderColor: BORDER,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },

  /* Mahasiswa (filled style) */
  optionBtn: {
    width: '86%',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionBtnActive: {
    backgroundColor: BORDER,
    shadowColor: BORDER,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 6,
  },

  optionText: {
    textAlign: 'center',
    color: BORDER,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
  },
  optionTextActive: {
    color: '#fff',
  },

  /* Dosen (outline style) */
  optionBtnOutline: {
    width: '86%',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#c6d5ec',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  optionBtnOutlineActive: {
    borderColor: BORDER,
    backgroundColor: '#fff',
    shadowColor: BORDER,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  optionTextOutline: {
    color: BORDER,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  optionTextOutlineActive: {
    color: BORDER,
  },

  nextWrap: {
    marginTop: 18,
    alignItems: 'center',
  },
  nextBtn: {
    width: 180,
    height: 44,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextText: {
    color: '#fff',
    fontWeight: '700',
  },

  bottomRow: {
    flexDirection: 'row',
    marginTop: 14,
    alignItems: 'center',
  },
  bottomText: { color: '#6b7a9a' },
  bottomLink: { color: BORDER, fontWeight: '700', textDecorationLine: 'underline' },
});
