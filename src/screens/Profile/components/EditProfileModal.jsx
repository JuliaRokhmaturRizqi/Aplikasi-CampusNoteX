import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PRIMARY_BLUE = "#0D47A1";

export default function EditProfileModal({
  visible,
  onClose,
  profile,
  onSave,
}) {
  const [name, setName] = useState(profile.name);
  const [program, setProgram] = useState(profile.program);
  const [semester, setSemester] = useState(profile.semester);

  const handleSave = () => {
    onSave({
      name,
      program,
      semester,
    });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>

          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>Edit Profile</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={PRIMARY_BLUE} />
            </TouchableOpacity>
          </View>

          {/* FORM */}
          <View style={styles.form}>
            <Text style={styles.label}>Nama</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.input}
            />

            <Text style={styles.label}>Program Studi</Text>
            <TextInput
              value={program}
              onChangeText={setProgram}
              style={styles.input}
            />

            <Text style={styles.label}>Semester</Text>
            <TextInput
              value={semester}
              onChangeText={setSemester}
              keyboardType="numeric"
              style={styles.input}
            />
          </View>

          {/* ACTION */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Batal</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveText}>Simpan</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: PRIMARY_BLUE,
  },
  form: {
    marginTop: 4,
  },
  label: {
    fontSize: 13,
    color: "#555",
    marginBottom: 4,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: PRIMARY_BLUE,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
  },
  cancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
  },
  cancelText: {
    color: "#777",
    fontWeight: "600",
  },
  saveBtn: {
    backgroundColor: PRIMARY_BLUE,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  saveText: {
    color: "white",
    fontWeight: "700",
  },
});
