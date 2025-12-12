// src/screens/Notes/AddNote.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
  Alert,
  Keyboard,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

const STORAGE_KEY = "CAMPUSNOTEX_NOTES_v1";
const PRIMARY_BLUE = "#0D47A1";

export default function AddNote() {
  const navigation = useNavigation();

  // default (baru)
  const [category, setCategory] = useState("Revisi");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [attachment, setAttachment] = useState(null);

  // formatting flags (visual)
  const [boldMode, setBoldMode] = useState(false);
  const [italicMode, setItalicMode] = useState(false);
  const [underlineMode, setUnderlineMode] = useState(false);

  const [align, setAlign] = useState("left");
  const [fontSize, setFontSize] = useState(15);

  // selection for TextInput
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const bodyRef = useRef(null);

  // keyboard animated offset for toolbar
  const keyboardOffset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      try {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Izin diperlukan", "Aplikasi perlu akses galeri untuk memilih gambar.");
        }
      } catch (e) {
        console.warn("perm err", e);
      }
    })();
  }, []);

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", (e) => {
      const h = e.endCoordinates?.height ?? 300;
      Animated.timing(keyboardOffset, {
        toValue: h + (Platform.OS === "ios" ? 6 : 8),
        duration: 200,
        useNativeDriver: false,
      }).start();
    });
    const hide = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(keyboardOffset, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });
    return () => {
      show.remove();
      hide.remove();
    };
  }, [keyboardOffset]);

  const chips = ["Revisi", "Ide", "Magang", "Bimbingan"];

  // storage helper: tambahkan note baru di awal array
  const saveNoteToStorage = async (noteObj) => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      // buat id
      noteObj.id = "n" + Date.now();
      noteObj.time = new Date().toLocaleString();
      noteObj.updatedAt = new Date().toISOString();
      arr.unshift(noteObj);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
      return noteObj;
    } catch (e) {
      console.warn("save err", e);
      return null;
    }
  };

  const handleSave = async () => {
    if (!title.trim() && !body.trim()) {
      Alert.alert("Isi kosong", "Tolong isi judul atau isi catatan sebelum menyimpan.");
      return;
    }

    const noteObj = {
      title: title.trim() || "(Tanpa judul)",
      body,
      category,
      attachment,
    };

    const saved = await saveNoteToStorage(noteObj);
    if (saved) {
      // setelah simpan -> navigasi ke NoteDetail dengan data baru
      navigation.replace("NoteDetail", { note: saved });
    } else {
      Alert.alert("Gagal", "Terjadi kesalahan saat menyimpan. Coba lagi.");
    }
  };

  const handleCancel = () => {
    // jika tidak ingin menyimpan, kembali
    navigation.goBack();
  };

  // MARKERS untuk format inline (sama seperti EditNote)
  const MARKERS = {
    bold: { pre: "**", suf: "**" },
    italic: { pre: "_", suf: "_" },
    underline: { pre: "__", suf: "__" },
  };

  // helper untuk membungkus seleksi
  const wrapSelection = (pre, suf) => {
    const start = Math.max(0, Math.min(selection.start ?? 0, body.length));
    const end = Math.max(0, Math.min(selection.end ?? start, body.length));

    if (start < end) {
      const before = body.slice(0, start);
      const sel = body.slice(start, end);
      const after = body.slice(end);
      const newBody = before + pre + sel + suf + after;
      const newCursor = end + pre.length + suf.length;
      setBody(newBody);
      setTimeout(() => {
        setSelection({ start: newCursor, end: newCursor });
        bodyRef.current?.focus();
      }, 40);
    } else {
      const before = body.slice(0, start);
      const after = body.slice(start);
      const token = pre + suf;
      const newBody = before + token + after;
      const pos = start + pre.length;
      setBody(newBody);
      setTimeout(() => {
        setSelection({ start: pos, end: pos });
        bodyRef.current?.focus();
      }, 40);
    }
  };

  const toggleMode = (mode) => {
    if (mode === "bold") {
      if (!boldMode) {
        wrapSelection(MARKERS.bold.pre, MARKERS.bold.suf);
        setBoldMode(true);
      } else setBoldMode(false);
    } else if (mode === "italic") {
      if (!italicMode) {
        wrapSelection(MARKERS.italic.pre, MARKERS.italic.suf);
        setItalicMode(true);
      } else setItalicMode(false);
    } else if (mode === "underline") {
      if (!underlineMode) {
        wrapSelection(MARKERS.underline.pre, MARKERS.underline.suf);
        setUnderlineMode(true);
      } else setUnderlineMode(false);
    }
  };

  // insert image token
  const insertImageFromGallery = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
      });
      if (!res.canceled) {
        const uri = res.assets ? res.assets[0].uri : res.uri;
        const pos = Math.max(0, selection.start ?? body.length);
        const before = body.slice(0, pos);
        const after = body.slice(pos);
        const token = `\n[img:${uri}]\n`;
        const newBody = before + token + after;
        setBody(newBody);
        setAttachment(uri);
        setTimeout(() => {
          const newPos = pos + token.length;
          setSelection({ start: newPos, end: newPos });
          bodyRef.current?.focus();
        }, 50);
      }
    } catch (e) {
      console.warn("img pick err", e);
    }
  };

  const toggleAlign = (mode) => setAlign((prev) => (prev === mode ? "left" : mode));
  const cycleFont = () => setFontSize((s) => (s === 14 ? 15 : s === 15 ? 18 : 14));

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={PRIMARY_BLUE} />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel} style={styles.headerLeft}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
          <Text style={styles.headerTextLeft}>Batal</Text>
        </TouchableOpacity>

        <View style={{ flex: 1 }} />

        <TouchableOpacity onPress={handleSave} style={styles.headerRight}>
          <Text style={styles.headerTextRight}>Simpan</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.sectionLabel}>Pilih katagori</Text>
        <View style={styles.chipsRow}>
          {chips.map((c) => {
            const active = category === c;
            return (
              <TouchableOpacity
                key={c}
                onPress={() => setCategory(c)}
                style={[styles.chip, active && styles.chipActive]}
                activeOpacity={0.85}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{c}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.titleCard}>
          <View style={styles.titleCardHeader}>
            <Text style={styles.titleCardHeaderText}>Judul Catatan</Text>
          </View>
          <View style={styles.titleInputWrap}>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Tulis judul catatan"
              placeholderTextColor="#234"
              style={styles.titleInput}
              multiline
            />
          </View>
        </View>

        <View style={styles.contentCard}>
          <TextInput
            ref={bodyRef}
            value={body}
            onChangeText={(t) => setBody(t)}
            placeholder="Tulis isi catatan..."
            placeholderTextColor="#666"
            style={[styles.bodyInput, { textAlign: align, fontSize }]}
            multiline
            textAlignVertical="top"
            onSelectionChange={({ nativeEvent: { selection } }) => setSelection(selection)}
            selection={selection}
          />

          {attachment ? (
            <View style={styles.attachmentWrap}>
              <Image
                source={typeof attachment === "string" ? { uri: attachment } : attachment}
                style={styles.attachment}
                resizeMode="cover"
              />
            </View>
          ) : null}

          <Text style={styles.noteLabel}>Catatan:</Text>
          <Text style={styles.noteBody}>
            Berikan penjelasan secara spesifik model AI apa yang digunakan.
            {"\n"}berikan juga alasan mengapa memakai model AI tersebut.
            {"\n"}kerja GPT seperti apa yang seharusnya dilakukan
          </Text>
        </View>
      </ScrollView>

      {/* Animated toolbar that follows keyboard */}
      <Animated.View style={[styles.toolbar, { bottom: keyboardOffset }]}>
        <TouchableOpacity style={styles.tbItem} onPress={() => toggleAlign("left")}>
          <Ionicons name="menu" size={23} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.tbItem} onPress={() => toggleAlign("center")}>
          <Ionicons name="list" size={23} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.tbItem} onPress={() => toggleAlign("right")}>
          <Ionicons name="menu" size={23} color="#fff" style={{ transform: [{ rotate: "180deg" }] }} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.tbItem} onPress={insertImageFromGallery}>
          <Ionicons name="image" size={23} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tbItem, boldMode && styles.tbItemActive]}
          onPress={() => toggleMode("bold")}
        >
          <Text style={[styles.tbText, boldMode && { fontWeight: "700" }]}>B</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tbItem, italicMode && styles.tbItemActive]}
          onPress={() => toggleMode("italic")}
        >
          <Text style={[styles.tbText, italicMode && { fontStyle: "italic" }]}>I</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tbItem, underlineMode && styles.tbItemActive]}
          onPress={() => toggleMode("underline")}
        >
          <Text style={[styles.tbText, underlineMode && { textDecorationLine: "underline" }]}>U</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tbItem} onPress={cycleFont}>
          <Text style={styles.tbText}>Aa</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: PRIMARY_BLUE,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 6 : 12,
    paddingBottom: 10,
  },
  headerLeft: { flexDirection: "row", alignItems: "center" },
  headerTextLeft: { color: "#fff", marginLeft: 8, fontSize: 16 },
  headerRight: { paddingHorizontal: 8, paddingVertical: 6 },
  headerTextRight: { color: "#fff", fontSize: 16, fontWeight: "600" },

  container: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 90,
  },

  sectionLabel: {
    color: PRIMARY_BLUE,
    fontWeight: "700",
    marginBottom: 8,
    marginLeft: 2,
    fontSize: 14,
  },

  chipsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1.6,
    borderColor: PRIMARY_BLUE,
    marginRight: 10,
    backgroundColor: "#fff",
    height: 36,
    justifyContent: "center",
  },
  chipActive: {
    backgroundColor: PRIMARY_BLUE,
  },
  chipText: { color: PRIMARY_BLUE, fontWeight: "600" },
  chipTextActive: { color: "#fff", fontWeight: "700" },

  titleCard: {
    marginTop: 8,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1.6,
    borderColor: PRIMARY_BLUE,
    backgroundColor: "#fff",
    marginBottom: 14,
  },
  titleCardHeader: {
    backgroundColor: PRIMARY_BLUE,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  titleCardHeaderText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
  titleInputWrap: {
    padding: 12,
    backgroundColor: "#fff",
  },
  titleInput: {
    fontSize: 18,
    fontWeight: "700",
    color: PRIMARY_BLUE,
  },

  contentCard: {
    borderRadius: 8,
    borderWidth: 1.6,
    borderColor: PRIMARY_BLUE,
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 24,
  },
  bodyInput: {
    minHeight: 140,
    maxHeight: 360,
    fontSize: 15,
    color: "#111",
  },

  attachmentWrap: {
    marginTop: 12,
    borderRadius: 6,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  attachment: {
    width: "100%",
    height: 160,
    backgroundColor: "#eee",
  },

  noteLabel: {
    marginTop: 12,
    color: PRIMARY_BLUE,
    fontWeight: "700",
  },
  noteBody: {
    marginTop: 6,
    color: "#222",
    lineHeight: 20,
  },

  toolbar: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 85,
    backgroundColor: PRIMARY_BLUE,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    justifyContent: "space-around",
    zIndex: 999,
  },
  tbItem: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -28,
  },
  tbItemActive: {
    backgroundColor: "#0b4f8e",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tbText: { color: "#fff", fontSize: 23, fontWeight: "700" },
});
