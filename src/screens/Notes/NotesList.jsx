// src/screens/Notes/NotesList.jsx
import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import HeaderHome from "../Home/components/HeaderHome";
import BottomNavigationBar from "../../components/BottomNavigationBar";

const PRIMARY_BLUE = "#0D47A1";
// pastikan file assets/catatan.jpg ada dan path ini benar
const catatanImg = require("../../../assets/catatan.jpg");

/**
 * NOTES DATA berada di luar komponen supaya tidak diciptakan ulang setiap render.
 * (Fungsi & layout tidak berubah — hanya efisiensi kecil saja.)
 */
const INITIAL_NOTES = [
  {
    title: "Revisi: BAB I - Latar Belakang",
    body:
      "Dosen meminta agar bagian latar belakang lebih fokus pada urgensi penelitian. Penjelasan mengenai masalah utama harus dibuat lebih tegas. Selain itu, perlu ditambahkan data statistik terbaru yang mendukung kondisi di lapangan. Bagian ruang lingkup penelitian juga perlu dipersempit agar tidak terlalu luas dan lebih mudah dianalisis pada bab berikutnya.",
    time: "56 menit yang lalu",
    category: "Revisi",
  },
  {
    title: "Ide: Bab 3 - Sistem Keamanan",
    body:
      "Terpikir sebuah kemungkinan untuk mengangkat topik keamanan dalam aplikasi mobile berbasis enkripsi hybrid. Ide awalnya adalah membandingkan enkripsi simetris dan asimetris, lalu menguji keduanya dalam konteks aplikasi kampus. Jika memungkinkan, bagian implementasi akan memasukkan studi kasus kecil yang mudah dipahami. Catatan ini masih harus didiskusikan lebih lanjut.",
    time: "2 menit yang lalu",
    category: "Ide",
  },
  {
    title: "Bimbingan: Pemrograman Lanjut",
    body:
      "Catatan bimbingan minggu ini lumayan padat. Dosen menekankan pentingnya arsitektur modular agar aplikasi tidak mudah berantakan saat fitur bertambah. Aku diminta memastikan setiap folder memiliki peran jelas, seperti screens, components, hooks, dan utils. Selain itu, navigasi harus dibuat konsisten memakai stack dan tab. Untuk progress minggu depan, harus menyiapkan halaman detail dan form edit catatan.",
    time: "1 hari yang lalu",
    category: "Bimbingan",
    attachment: catatanImg,
  },
  {
    title: "Magang: Update Laporan Mingguan",
    body:
      "Pada laporan magang kali ini, pembimbing meminta tambahan bagian evaluasi hasil pengerjaan fitur. Khususnya mengenai API endpoint yang sempat error karena format respons berubah. Selain itu, bagian dokumentasi UI perlu ditambahkan screenshot terbaru agar memudahkan tim QA memahami perubahan layout. Semua perbaikan harus selesai sebelum Jumat.",
    time: "7 menit yang lalu",
    category: "Magang",
  },
  {
    title: "Revisi: Landasan Teori",
    body:
      "Dosen meminta agar landasan teori menggunakan minimal sembilan jurnal terbitan lima tahun terakhir. Fokuskan pada teori yang benar-benar relevan dengan permasalahan. Jangan memasukkan teori yang tidak mendukung alur pembahasan. Pastikan setiap kutipan diberi penjelasan agar tidak tampak tempelan semata. Sumber buku boleh, tapi prioritas tetap jurnal.",
    time: "56 menit yang lalu",
    category: "Revisi",
  },
];

export default function NotesList() {
  const navigation = useNavigation();

  // states (kondisi & input dari user)
  const [activeChip, setActiveChip] = useState("Semua");
  const [searchText, setSearchText] = useState("");

  const chips = ["Semua", "Revisi", "Ide", "Magang", "Bimbingan"];

  // gunakan useMemo agar filtering tidak dihitung ulang kecuali dependensi berubah
  const filteredNotes = useMemo(() => {
    const base = activeChip === "Semua"
      ? INITIAL_NOTES
      : INITIAL_NOTES.filter((n) => n.category === activeChip);

    if (!searchText || searchText.trim() === "") return base;

    const q = searchText.toLowerCase();
    return base.filter(
      (n) => (n.title + " " + n.body).toLowerCase().includes(q)
    );
  }, [activeChip, searchText]);

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
              accessibilityRole="button"
              accessibilityState={{ selected: activeChip === chip }}
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
              <TouchableOpacity
                key={idx}
                style={styles.card}
                activeOpacity={0.85}
                onPress={() => navigation.navigate("NoteDetail", { note })}
                accessibilityRole="button"
              >
                <Text style={styles.cardTitle}>{note.title}</Text>

                {/* tampilkan hanya 2 baris di list */}
                <Text style={styles.cardBody} numberOfLines={2}>
                  {note.body}
                </Text>

                <Text style={styles.cardTime}>{note.time}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

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
});
