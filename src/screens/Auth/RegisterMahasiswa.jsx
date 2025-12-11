// src/screens/Auth/RegisterMahasiswa.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function RegisterMahasiswa({ navigation }) {
  const [nim, setNim] = useState('');
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const onSubmit = () => {
    // Validasi sederhana frontend-only
    if (!nim || !nama || !email || !password) {
      Alert.alert('Lengkapi data', 'Silakan lengkapi semua field yang diperlukan.');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Password mismatch', 'Password dan konfirmasi tidak cocok.');
      return;
    }

    // Sementara: anggap berhasil dan kembali ke Home (atau layar sukses)
    Alert.alert('Berhasil', 'silahkan verifikasi Email dan login kembali', [
      { text: 'OK', onPress: () => navigation.replace('Home') },
    ]);
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Daftar Mahasiswa</Text>

          <Text style={styles.label}>NIM</Text>
          <TextInput value={nim} onChangeText={setNim} placeholder="Masukkan NIM" style={styles.input} />

          <Text style={styles.label}>Nama Lengkap</Text>
          <TextInput value={nama} onChangeText={setNama} placeholder="Masukkan nama lengkap" style={styles.input} />

          <Text style={styles.label}>Email</Text>
          <TextInput value={email} onChangeText={setEmail} placeholder="nama@univ.ac.id" style={styles.input} keyboardType="email-address" />

          <Text style={styles.label}>Password</Text>
          <TextInput value={password} onChangeText={setPassword} placeholder="Password" style={styles.input} secureTextEntry />

          <Text style={styles.label}>Konfirmasi Password</Text>
          <TextInput value={confirm} onChangeText={setConfirm} placeholder="Konfirmasi password" style={styles.input} secureTextEntry />

          <TouchableOpacity onPress={onSubmit} activeOpacity={0.85} style={styles.submitWrap}>
            <LinearGradient colors={['#1e63c8', '#6ab3ff']} style={styles.submitBtn}>
              <Text style={styles.submitText}>DAFTAR</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginTop: 12 }} onPress={() => navigation.goBack()}>
            <Text style={{ color: '#556' }}>Kembali</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  container: {
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 18, color: '#173f82' },
  label: { alignSelf: 'flex-start', color: '#173f82', marginTop: 12, marginBottom: 6, fontWeight: '600' },
  input: {
    width: '100%',
    height: 46,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d7e1f3',
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  submitWrap: { marginTop: 18, width: '100%', alignItems: 'center' },
  submitBtn: { width: '60%', height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  submitText: { color: '#fff', fontWeight: '700' },
});
