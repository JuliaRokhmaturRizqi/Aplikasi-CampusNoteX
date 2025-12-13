import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNavigationBar from "../../components/BottomNavigationBar";
import EditProfileModal from "./components/EditProfileModal";

const PRIMARY_BLUE = "#0D47A1";

export default function Profile() {
  const [editVisible, setEditVisible] = useState(false);

  const [profile, setProfile] = useState({
    name: "Julia Rokhmatur Rizqi",
    program: "Program Studi Informatika",
    semester: "5",
  });

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile Saya</Text>
          <Ionicons name="settings-outline" size={24} color="white" />
        </View>

        <ScrollView contentContainerStyle={styles.content}>

          {/* PROFILE CARD */}
          <View style={styles.profileCard}>
            <View style={styles.avatarWrapper}>
              <Ionicons name="person" size={50} color="white" />

              <TouchableOpacity
                style={styles.editAvatar}
                onPress={() => setEditVisible(true)}
              >
                <Ionicons name="pencil" size={12} color="white" />
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{profile.name}</Text>
              <Text style={styles.subtitle}>{profile.program}</Text>

              <View style={styles.semesterBadge}>
                <Text style={styles.semesterText}>
                  Semester {profile.semester}
                </Text>
              </View>
            </View>
          </View>

          {/* QUOTE */}
          <View style={styles.quoteCard}>
            <Text style={styles.quoteText}>
              Tak apa jika kau gagal, setidaknya kamu sudah tumbuh dan berkembang
            </Text>
            <Text style={styles.quoteAuthor}>- TataRzq</Text>

            <TouchableOpacity style={styles.editQuote}>
              <Ionicons name="pencil" size={16} color="white" />
            </TouchableOpacity>
          </View>

          {/* MENU */}
          <View style={styles.menuList}>
            <MenuItem title="Petunjuk Pengguna" />
            <MenuItem title="Bantuan" />
            <MenuItem title="Daftar Dosen" />
            <MenuItem title="Email" />
            <MenuItem title="Keluar" danger />
          </View>

        </ScrollView>

        {/* MODAL */}
        <EditProfileModal
          visible={editVisible}
          onClose={() => setEditVisible(false)}
          profile={profile}
          onSave={setProfile}
        />

        <BottomNavigationBar />
      </View>
    </SafeAreaView>
  );
}

/* MENU ITEM */
function MenuItem({ title, danger }) {
  return (
    <TouchableOpacity
      style={[
        styles.menuItem,
        danger && { borderColor: "#D32F2F" },
      ]}
    >
      <Text
        style={[
          styles.menuText,
          danger && { color: "#D32F2F" },
        ]}
      >
        {title}
      </Text>
      <Ionicons
        name="chevron-forward"
        size={20}
        color={danger ? "#D32F2F" : PRIMARY_BLUE}
      />
    </TouchableOpacity>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  header: {
    backgroundColor: PRIMARY_BLUE,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },

  content: {
    padding: 16,
    paddingBottom: 100,
  },

  profileCard: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: PRIMARY_BLUE,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    alignItems: "center",
  },
  avatarWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: PRIMARY_BLUE,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  editAvatar: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#4CAF50",
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: PRIMARY_BLUE,
  },
  subtitle: {
    fontSize: 13,
    color: "#555",
    marginVertical: 2,
  },
  semesterBadge: {
    backgroundColor: "#42A5F5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 6,
    alignSelf: "flex-start",
  },
  semesterText: {
    color: "white",
    fontSize: 12,
    fontWeight: "700",
  },

  quoteCard: {
    borderWidth: 1,
    borderColor: PRIMARY_BLUE,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    position: "relative",
  },
  quoteText: {
    fontSize: 13,
    color: PRIMARY_BLUE,
    lineHeight: 18,
  },
  quoteAuthor: {
    marginTop: 8,
    fontSize: 12,
    color: PRIMARY_BLUE,
    fontStyle: "italic",
  },
  editQuote: {
    position: "absolute",
    right: 12,
    bottom: 12,
    backgroundColor: PRIMARY_BLUE,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  menuList: {
    marginTop: 8,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: PRIMARY_BLUE,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  menuText: {
    fontSize: 14,
    fontWeight: "600",
    color: PRIMARY_BLUE,
  },
});
