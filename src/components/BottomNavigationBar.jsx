// src/components/BottomNavigationBar.jsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const PRIMARY_BLUE = '#0D47A1';

const BottomNavigationBar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const current = route.name; // nama screen aktif

  const go = (screen) => {
    if (current !== screen) {
      navigation.navigate(screen);
    }
  };

  return (
    <View style={styles.container}>

      {/* HOME */}
      <TouchableOpacity
        style={current === "Home" ? styles.activeIconContainer : styles.iconContainer}
        onPress={() => go("Home")}
      >
        <Ionicons
          name="home"
          size={24}
          color={current === "Home" ? PRIMARY_BLUE : "white"}
        />
      </TouchableOpacity>

      {/* CATATAN */}
      <TouchableOpacity
        style={current === "NotesList" ? styles.activeIconContainer : styles.iconContainer}
        onPress={() => go("NotesList")}
      >
        <FontAwesome5
          name="edit"
          size={24}
          color={current === "NotesList" ? PRIMARY_BLUE : "white"}
        />
      </TouchableOpacity>

      {/* JADWAL */}
      <TouchableOpacity
        style={current === "Jadwal" ? styles.activeIconContainer : styles.iconContainer}
        onPress={() => go("Jadwal")}
      >
        <Ionicons
          name="calendar"
          size={24}
          color={current === "Jadwal" ? PRIMARY_BLUE : "white"}
        />
      </TouchableOpacity>

      {/* DASHBOARD */}
      <TouchableOpacity
        style={current === "Dashboard" ? styles.activeIconContainer : styles.iconContainer}
        onPress={() => go("Dashboard")}
      >
        <Ionicons
          name="speedometer-outline"
          size={26}
          color={current === "Dashboard" ? PRIMARY_BLUE : "white"}
        />
      </TouchableOpacity>

      {/* PROFILE */}
      <TouchableOpacity
        style={current === "Profile" ? styles.activeIconContainer : styles.iconContainer}
        onPress={() => go("Profile")}
      >
        <Ionicons
          name="person"
          size={24}
          color={current === "Profile" ? PRIMARY_BLUE : "white"}
        />
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: PRIMARY_BLUE,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 70,
    paddingBottom: 10,
  },

  // ikon normal
  iconContainer: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ikon aktif dengan background putih seperti screenshot kamu
  activeIconContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10, // membuat kartu naik sedikit
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomNavigationBar;
