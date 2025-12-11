// src/screens/Catatan.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HeaderHome from "./Home/components/HeaderHome";
import BottomNavigationBar from "../components/BottomNavigationBar";

const PRIMARY_BLUE = "#0D47A1";

export default function Catatan() {
  const [activeChip, setActiveChip] = useState("Semua");
  const [searchText, setSearchText] = useState("");

  const chips = ["Semua", "Revisi", "Ide", "Magang", "Bimbingan"];

  const notes = [
    {
      title: "Revisi : BAB I - Latar belakang",
      body: "Perbaiki bagian metodologi dengan diperkuat...",
      time: "56 menit yang lalu",
      category: "Revisi",
    },
    {
      title: "Ide : Bab 3",
      body: "Bagaimana jika judul proposal mengenai keamanan...",
      time: "2 menit yang lalu",
      category: "Ide",
    },
    {
      title: "Bimbingan : pemograman",
      body: "Catatan bimbingan minggu ini...",
      time: "1 hari yang lalu",
      category: "Bimbingan",
    },
    {
      title: "Magang : Laporan",
      body: "Project magang ditambah fitur pengiriman...",
      time: "7 menit yang lalu",
      category: "Magang",
    },
    {
      title: "Revisi : Landasan Teori",
      body: "Landasan teori minimal 9 jurnal terbaru...",
      time: "56 menit yang lalu",
      category: "Revisi",
    },
    {
      title: "Bimbingan : Proposal",
      body: "Tambahkan hipotesis pada proposal...",
      time: "2 hari yang lalu",
      category: "Bimbingan",
    },
  ];

  // --- FILTER BERDASARKAN CHIP ---
  const filteredByChip =
    activeChip === "Semua"
      ? notes
      : notes.filter((n) => n.category === activeChip);

  // --- FILTER SEARCH ---
  const filteredNotes = filteredByChip.filter((n) =>
    (n.title + n.body)
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <HeaderHome />

      {/* SEARCH BAR */}
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

      {/* MAIN SCROLLVIEW */}
      <ScrollView
        style={styles.mainScroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* CHIPS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipScroll}
        >
          {chips.map((chip) => (
            <TouchableOpacity
              key={chip}
              onPress={() => setActiveChip(chip)}
              style={[styles.chip, activeChip === chip && styles.chipActive]}
            >
              <Text
                style={[
                  styles.chipText,
                  activeChip === chip && styles.chipTextActive,
                ]}
              >
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
            filteredNotes.map((note, idx) => (
              <View key={idx} style={styles.card}>
                <Text style={styles.cardTitle}>{note.title}</Text>
                <Text style={styles.cardBody} numberOfLines={2}>
                  {note.body}
                </Text>
                <Text style={styles.cardTime}>{note.time}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* TAB BAR */}
      <BottomNavigationBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  // Search Bar
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
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },

  mainScroll: {
    flex: 1,
    marginTop: 10,
  },

  // Chips
  chipScroll: {
    paddingLeft: 16,
    marginBottom: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: PRIMARY_BLUE,
    marginRight: 10,
    height: 36,
  },
  chipActive: {
    backgroundColor: PRIMARY_BLUE,
  },
  chipText: {
    color: PRIMARY_BLUE,
    fontSize: 14,
    fontWeight: "500",
  },
  chipTextActive: {
    color: "white",
  },

  // Notes
  noteList: {
    paddingHorizontal: 16,
    marginTop: 5,
  },
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
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: PRIMARY_BLUE,
  },
  cardBody: {
    marginTop: 5,
    fontSize: 14,
    color: "#333",
  },
  cardTime: {
    marginTop: 8,
    fontSize: 12,
    color: "#777",
  },
});
