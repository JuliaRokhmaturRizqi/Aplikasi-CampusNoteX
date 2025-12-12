// src/screens/Notes/NoteDetail.jsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "CAMPUSNOTEX_NOTES_v1";

const COLORS = {
  primary: "#0D47A1",
  cardBorder: "#0D47A1",
  badgeBg: "#42A5F5",
  redIcon: "#EF5350",
  textGray: "#757575",
  btnSecondary: "#F5F5F5",
};

// parse and render supports: __underline__, **bold**, _italic_ (nested)
function parseAndRender(text) {
  if (!text) return [];
  // detect [img:URI] tokens, then parse inline on text segments
  const imgRegex = /\[img:([^\]]+)\]/g;
  let parts = [];
  let last = 0;
  let m;
  while ((m = imgRegex.exec(text)) !== null) {
    const idx = m.index;
    const before = text.substring(last, idx);
    if (before) parts.push(...parseInline(before));
    parts.push({ type: "image", uri: m[1] });
    last = imgRegex.lastIndex;
  }
  const tail = text.substring(last);
  if (tail) parts.push(...parseInline(tail));
  return parts;
}

// parse inline recursively
function parseInline(s) {
  if (!s) return [];
  // underline first
  const underlineRe = /__(.+?)__/s;
  const mu = underlineRe.exec(s);
  if (mu) {
    const before = s.substring(0, mu.index);
    const inner = mu[1];
    const after = s.substring(mu.index + mu[0].length);
    const res = [];
    if (before) res.push(...parseInline(before));
    const innerParts = parseInline(inner);
    innerParts.forEach((p) => {
      if (p.type === "text") p.underline = true;
      res.push(p);
    });
    if (after) res.push(...parseInline(after));
    return res;
  }

  // bold
  const boldRe = /\*\*(.+?)\*\*/s;
  const mb = boldRe.exec(s);
  if (mb) {
    const before = s.substring(0, mb.index);
    const inner = mb[1];
    const after = s.substring(mb.index + mb[0].length);
    const res = [];
    if (before) res.push(...parseInline(before));
    const innerParts = parseInline(inner);
    innerParts.forEach((p) => {
      if (p.type === "text") p.bold = true;
      res.push(p);
    });
    if (after) res.push(...parseInline(after));
    return res;
  }

  // italic
  const italicRe = /_(.+?)_/s;
  const mi = italicRe.exec(s);
  if (mi) {
    const before = s.substring(0, mi.index);
    const inner = mi[1];
    const after = s.substring(mi.index + mi[0].length);
    const res = [];
    if (before) res.push(...parseInline(before));
    const innerParts = parseInline(inner);
    innerParts.forEach((p) => {
      if (p.type === "text") p.italic = true;
      res.push(p);
    });
    if (after) res.push(...parseInline(after));
    return res;
  }

  // plain text fallback
  return s.length ? [{ type: "text", text: s }] : [];
}

export default function NoteDetail({ navigation, route }) {
  const note = route?.params?.note ?? {
    title: "Catatan kosong",
    body: "Tidak ada detail tersedia.",
    time: "",
    category: "Umum",
    attachment: null,
    id: null,
  };

  const chunks = parseAndRender(note.body);

  // Hapus catatan: konfirmasi dulu, lalu hapus dari AsyncStorage (jika ada)
  const handleDelete = async () => {
    Alert.alert(
      "Hapus catatan",
      "Apakah Anda yakin ingin menghapus catatan ini?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: async () => {
            try {
              const raw = await AsyncStorage.getItem(STORAGE_KEY);
              if (!raw) {
                // jika tidak ada storage, tetap kembali ke daftar
                navigation.navigate("NotesList");
                return;
              }

              const arr = JSON.parse(raw);
              let newArr;

              if (note.id) {
                newArr = arr.filter((n) => n.id !== note.id);
              } else {
                // fallback: cocokkan berdasarkan title + time
                newArr = arr.filter((n) => !(n.title === note.title && n.time === note.time));
              }

              await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newArr));
              // navigasi kembali ke NotesList dan beri notifikasi
              navigation.navigate("NotesList");
              Alert.alert("Berhasil", "Catatan telah dihapus.");
            } catch (e) {
              console.warn("delete err", e);
              Alert.alert("Gagal", "Terjadi kesalahan saat menghapus catatan.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <View style={styles.header}>
        {/* NAVIGATE TO NotesList when pressed */}
        <TouchableOpacity onPress={() => navigation.navigate("NotesList")}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Detail Catatan</Text>

        <TouchableOpacity onPress={() => navigation.navigate("EditNote", { note })}>
          <Text style={styles.headerEditBtn}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.infoCard}>
          <View style={styles.infoCardHeader}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{note.category || "Umum"}</Text>
            </View>

            <TouchableOpacity onPress={handleDelete}>
              <Ionicons name="trash-outline" size={24} color={COLORS.redIcon} />
            </TouchableOpacity>
          </View>

          <Text style={styles.noteTitle}>{note.title}</Text>
          {note.time ? <Text style={styles.metaText}>Terakhir diedit: {note.time}</Text> : null}
        </View>

        <View style={styles.contentCard}>
          {chunks.map((c, i) =>
            c.type === "image" ? (
              <Image
                key={"img-" + i}
                source={{ uri: c.uri }}
                style={styles.attachmentImage}
                resizeMode="cover"
              />
            ) : (
              <Text
                key={"txt-" + i}
                style={[
                  styles.bodyText,
                  c.bold && { fontWeight: "700" },
                  c.italic && { fontStyle: "italic" },
                  c.underline && { textDecorationLine: "underline" },
                ]}
              >
                {c.text}
              </Text>
            )
          )}

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Tambahkan ke Jadwal Bimbingan</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Lampirkan Gambar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  header: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 12 : 12,
  },
  headerTitle: { color: "white", fontSize: 18, fontWeight: "bold" },
  headerEditBtn: { color: "white", fontSize: 16, fontWeight: "600" },

  scrollContent: { padding: 20, paddingBottom: 40 },

  infoCard: {
    borderWidth: 1.5,
    borderColor: COLORS.cardBorder,
    borderRadius: 12,
    padding: 16,
    backgroundColor: "white",
    marginBottom: 18,
  },
  infoCardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  badge: { backgroundColor: COLORS.badgeBg, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  badgeText: { color: "white", fontSize: 12, fontWeight: "bold" },
  noteTitle: { fontSize: 20, fontWeight: "bold", color: COLORS.primary, marginBottom: 8 },
  metaText: { fontSize: 12, color: COLORS.textGray },

  contentCard: {
    borderWidth: 1.5,
    borderColor: COLORS.cardBorder,
    borderRadius: 12,
    padding: 16,
    backgroundColor: "white",
  },

  bodyText: { fontSize: 15, lineHeight: 22, color: "#111", marginBottom: 12 },

  attachmentImage: { width: "100%", height: 200, backgroundColor: "#eee", marginBottom: 12 },

  buttonGroup: { marginTop: 20 },
  primaryButton: { backgroundColor: COLORS.primary, paddingVertical: 12, borderRadius: 8, alignItems: "center", marginBottom: 10 },
  primaryButtonText: { color: "white", fontSize: 14, fontWeight: "600" },
  secondaryButton: { backgroundColor: COLORS.btnSecondary, paddingVertical: 12, borderRadius: 8, alignItems: "center" },
  secondaryButtonText: { color: COLORS.primary, fontSize: 14, fontWeight: "600" },
});
