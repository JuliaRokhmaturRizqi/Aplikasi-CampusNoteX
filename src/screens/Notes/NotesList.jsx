// src/screens/Notes/NotesList.jsx
import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HeaderHome from "../Home/components/HeaderHome";
import BottomNavigationBar from "../../components/BottomNavigationBar";

const STORAGE_KEY = "CAMPUSNOTEX_NOTES_v1";
const PRIMARY_BLUE = "#0D47A1";

// contoh data fallback (dipakai hanya saat storage kosong)
const FALLBACK_NOTES = [
  {
    id: "n1",
    title: "Revisi: BAB I - Latar Belakang",
    body:
      "Dosen meminta agar bagian latar belakang lebih fokus pada urgensi penelitian. Penjelasan mengenai masalah utama harus dibuat lebih tegas...",
    time: "56 menit yang lalu",
    category: "Revisi",
  },
  {
    id: "n2",
    title: "Ide: Bab 3 - Sistem Keamanan",
    body:
      "Terpikir sebuah kemungkinan untuk mengangkat topik keamanan dalam aplikasi mobile berbasis enkripsi hybrid...",
    time: "2 menit yang lalu",
    category: "Ide",
  },
];

export default function NotesList() {
  const navigation = useNavigation();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeChip, setActiveChip] = useState("Semua");
  const [searchText, setSearchText] = useState("");

  const chips = ["Semua", "Revisi", "Ide", "Magang", "Bimbingan"];

  // load notes dari AsyncStorage
  const loadNotes = async () => {
    setLoading(true);
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      let arr = raw ? JSON.parse(raw) : null;
      if (!arr || !Array.isArray(arr) || arr.length === 0) {
        // jika kosong, gunakan fallback dan simpan fallback supaya persist
        arr = FALLBACK_NOTES;
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
      }
      setNotes(arr);
    } catch (e) {
      console.warn("load notes err", e);
      setNotes(FALLBACK_NOTES);
    } finally {
      setLoading(false);
    }
  };

  // muat sekali saat mount
  useEffect(() => {
    loadNotes();
  }, []);

  // reload setiap kali screen fokus (mis. setelah kembali dari AddNote atau NoteDetail)
  useFocusEffect(
    useCallback(() => {
      // setiap kali fokus, reload
      loadNotes();
      // tidak perlu cleanup
      return undefined;
    }, [])
  );

  // computed: filter berdasarkan chip + search
  const filteredNotes = useMemo(() => {
    const base = activeChip === "Semua" ? notes : notes.filter((n) => n.category === activeChip);
    if (!searchText || searchText.trim() === "") return base;
    const q = searchText.toLowerCase();
    return base.filter((n) => (n.title + " " + n.body).toLowerCase().includes(q));
  }, [notes, activeChip, searchText]);

  // navigasi ke detail — NoteDetail akan menerima { note }
  const openDetail = (note) => navigation.navigate("NoteDetail", { note });

  // Floating Add button handler
  const goAdd = () => navigation.navigate("AddNote");

  return (
    <View style={styles.container}>
      <HeaderHome />

      {/* SEARCH */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={22} color={PRIMARY_BLUE} />
        <TextInput
          placeholder="Cari catatan ..."
          style={styles.searchInput}
          placeholderTextColor="#555"
          value={searchText}
          onChangeText={setSearchText}
        />
        <Ionicons name="options" size={22} color={PRIMARY_BLUE} />
      </View>

      {loading ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" color={PRIMARY_BLUE} />
        </View>
      ) : (
        <ScrollView
          style={styles.mainScroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 140 }}
        >
          {/* CHIPS */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.chipScroll}
            contentContainerStyle={{ paddingRight: 16 }}
          >
            {chips.map((chip) => (
              <TouchableOpacity
                key={chip}
                onPress={() => setActiveChip(chip)}
                style={[styles.chip, activeChip === chip && styles.chipActive]}
                accessibilityRole="button"
                accessibilityState={{ selected: activeChip === chip }}
              >
                <Text style={[styles.chipText, activeChip === chip && styles.chipTextActive]}>
                  {chip}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* NOTES */}
          <View style={styles.noteList}>
            {filteredNotes.length === 0 ? (
              <Text style={styles.emptyText}>Tidak ada catatan ditemukan.</Text>
            ) : (
              filteredNotes.map((note) => (
                <TouchableOpacity
                  key={note.id || note.title}
                  style={styles.card}
                  activeOpacity={0.85}
                  onPress={() => openDetail(note)}
                >
                  <Text style={styles.cardTitle}>{note.title}</Text>
                  <Text style={styles.cardBody} numberOfLines={2}>
                    {note.body}
                  </Text>
                  <Text style={styles.cardTime}>{note.time}</Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        </ScrollView>
      )}

      {/* FLOATING ADD BUTTON */}
      <TouchableOpacity style={styles.floatingAddButton} onPress={goAdd} activeOpacity={0.85}>
        <Ionicons name="add" size={34} color="white" />
      </TouchableOpacity>

      {/* BOTTOM TAB BAR */}
      <BottomNavigationBar current="NotesList" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderRadius: 50,
    borderColor: PRIMARY_BLUE,
    backgroundColor: "white",
    gap: 10,
  },
  searchInput: { flex: 1, fontSize: 16, color: "#000" },

  mainScroll: { flex: 1, marginTop: 10 },

  chipScroll: { paddingLeft: 16, marginBottom: 10 },

  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: PRIMARY_BLUE,
    marginRight: 10,
    height: 36,
  },
  chipActive: { backgroundColor: PRIMARY_BLUE },

  chipText: { color: PRIMARY_BLUE, fontSize: 14, fontWeight: "500" },
  chipTextActive: { color: "white" },

  noteList: { paddingHorizontal: 16, marginTop: 5 },

  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#444",
    fontSize: 14,
  },

  card: {
    borderWidth: 1.5,
    borderColor: PRIMARY_BLUE,
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "white",
  },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: PRIMARY_BLUE },
  cardBody: { marginTop: 5, fontSize: 14, color: "#333" },
  cardTime: { marginTop: 8, fontSize: 12, color: "#777" },

  floatingAddButton: {
    position: "absolute",
    bottom: 80,
    right: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: PRIMARY_BLUE,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    zIndex: 999,
    borderWidth: 3,
    borderColor: "white",
  },
});
