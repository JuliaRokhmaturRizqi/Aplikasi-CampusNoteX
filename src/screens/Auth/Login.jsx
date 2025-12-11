// src/screens/Auth/Login.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const bg = require('../../../assets/studybackground.png');

export default function Login({ navigation }) {
  const [nimOrEmail, setNimOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);

  const onLogin = () => navigation.replace('Home');

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        style={{ flex: 1 }}
      >
        {/* decorative background at bottom */}
        <ImageBackground source={bg} style={styles.bg} imageStyle={styles.bgImage} />

        <View style={styles.wrap}>
          <Text style={styles.title}>LOGIN</Text>

          <View style={styles.card}>
            <Text style={styles.label}>NIM / Email :</Text>
            <TextInput
              value={nimOrEmail}
              onChangeText={setNimOrEmail}
              placeholder="Maukkan Email atau NIM"
              placeholderTextColor="#7b8aa6"
              style={styles.input}
              keyboardType="default"
              autoCapitalize="none"
            />

            <Text style={[styles.label, { marginTop: 14 }]}>Password :</Text>

            <View style={styles.passRow}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Masukkan password"
                placeholderTextColor="#7b8aa6"
                style={styles.passInput}
                secureTextEntry={secure}
                autoCapitalize="none"
              />

              <TouchableOpacity
                onPress={() => setSecure((s) => !s)}
                style={styles.eyeContainer}
                activeOpacity={0.7}
              >
                <Ionicons name={secure ? 'eye-off-outline' : 'eye-outline'} size={22} color="#214a8f" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgot}>Lupa Password ?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginWrap} onPress={onLogin} activeOpacity={0.85}>
              <LinearGradient colors={['#1e63c8', '#6ab3ff']} start={[0,0]} end={[1,0]} style={styles.loginBtn}>
                <Text style={styles.loginText}>LOGIN</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.registerRow}>
              <Text style={styles.regText}>Belum punya akun? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.regLink}>Daftar Disini</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const BORDER = '#173f82';
const CARD_BG = '#fff';

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#ffffff' },
  bg: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 320, // sesuaikan tinggi agar hanya bagian bawah yang berwarna
  },
  bgImage: { resizeMode: 'cover' },
  wrap: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingTop: 160,
  },
  title: {
    marginTop: 18,
    fontSize: 36,
    color: BORDER,
    fontWeight: '700',
    letterSpacing: 1,
  },
  card: {
    width: '92%',
    maxWidth: 420,
    marginTop: 20,
    backgroundColor: CARD_BG,
    borderRadius: 22,
    padding: 18,
    borderWidth: 2,
    borderColor: BORDER,
    // soften the blue inner stroke effect by adding inner padding
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  label: {
    color: BORDER,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#c6d5ec',
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    color: '#123',
  },

  /* password row: input on left with rounded left corners, eye button on right with rounded right corners */
  passRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  passInput: {
    flex: 1,
    height: 48,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderWidth: 1,
    borderColor: '#c6d5ec',
    paddingHorizontal: 14,
    backgroundColor: '#fff',
  },
  eyeContainer: {
    height: 48,
    width: 56,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: '#c6d5ec',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  forgot: {
    color: BORDER,
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  loginWrap: {
    marginTop: 18,
    alignItems: 'center',
  },
  loginBtn: {
    width: 170,
    height: 46,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1e63c8',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 4,
  },
  loginText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 14,
  },
  regText: { color: '#6b7a9a' },
  regLink: { color: BORDER, fontWeight: '700', textDecorationLine: 'underline' },
});
