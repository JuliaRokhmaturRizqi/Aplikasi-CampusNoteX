// src/components/BottomNavigationBar.jsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
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
        style={current === "Noteslist" ? styles.activeIconContainer : styles.iconContainer}
        onPress={() => navigation.navigate("NotesList")}
      >
        <FontAwesome5
          name="edit"
          size={24}
          color={current === "Noteslist" ? PRIMARY_BLUE : "white"}
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
    alignItems: 'center',
    height: 70,
    paddingHorizontal: 10,
    paddingBottom: 10,
    
  },
  iconContainer: {
    padding: 10,
  },
  activeIconContainer: {
    padding: 18,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 0,
    height: 70,
    
  }
});

export default BottomNavigationBar;
