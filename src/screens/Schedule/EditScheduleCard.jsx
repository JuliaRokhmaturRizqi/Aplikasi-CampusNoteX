// src/screens/Schedule/EditScheduleCard.jsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PRIMARY_BLUE = "#0D47A1";
const LIGHT_BLUE = "#1e63c8";

/**
 * Props:
 * - items: array of { time, title, status, color } (optional)
 * - onAdd: function called when "Tambah jadwal" ditekan
 * - onPressItem: function(item) optional when tapping a row
 */
export default function EditScheduleCard({ items = [], onAdd = () => {}, onPressItem = () => {} }) {
  // fallback demo items if none diberikan
  const demo = [
    { id: "i1", time: "8:00 - 16:00", title: "Magang Langit Creative — Edit video content", status: "Tidak selesai", color: "#7BD389" },
    { id: "i2", time: "8:00 - 9:00", title: "Presentasi Demo Aplikasi CampusNoteX — perencanaan UI/flow", status: "Belum selesai", color: "#5BC0F8" },
  ];

  const data = items && items.length ? items : demo;

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={0.85} onPress={() => onPressItem(item)} style={styles.row}>
        <View style={[styles.timeColumn]}>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>

        <View style={styles.agendaColumn}>
          <Text style={styles.agendaTitle} numberOfLines={2}>{item.title}</Text>
          <Text style={[styles.statusText, { color: item.color ?? PRIMARY_BLUE }]}>{`Status : ${item.status}`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.cardWrap}>
      <Text style={styles.heading}>Edit Jadwal</Text>

      <View style={styles.table}>
        <View style={[styles.row, styles.rowHeader]}>
          <Text style={[styles.cell, styles.cellHeader]}>Waktu</Text>
          <Text style={[styles.cell, styles.cellHeader, styles.agendaHeader]}>Agenda</Text>
        </View>

        <FlatList
          data={data}
          keyExtractor={(it) => it.id ?? it.time}
          renderItem={renderRow}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          scrollEnabled={false}
        />

        <View style={styles.footer}>
          <TouchableOpacity style={styles.addBtn} onPress={onAdd} activeOpacity={0.85}>
            <View style={styles.plusCircle}>
              <Ionicons name="add" size={20} color={PRIMARY_BLUE} />
            </View>
            <Text style={styles.addText}>Tambah jadwal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrap: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: PRIMARY_BLUE,
    backgroundColor: "#fff",
    overflow: "hidden",
    // shadow (iOS)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    // elevation (Android)
    elevation: 6,
  },
  heading: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 8,
    color: PRIMARY_BLUE,
    fontWeight: "700",
    fontSize: 16,
  },
  table: {
    paddingHorizontal: 12,
    paddingBottom: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 10,
  },
  rowHeader: {
    backgroundColor: PRIMARY_BLUE,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  cell: {
    flex: 0,
    paddingHorizontal: 6,
  },
  cellHeader: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
  agendaHeader: {
    marginLeft: 12,
  },
  timeColumn: {
    width: 110,
    justifyContent: "center",
  },
  timeText: {
    color: PRIMARY_BLUE,
    fontWeight: "600",
  },
  agendaColumn: {
    flex: 1,
    paddingLeft: 8,
  },
  agendaTitle: {
    color: "#234a8f",
    fontWeight: "600",
    marginBottom: 6,
  },
  statusText: {
    fontSize: 12,
    color: "#777",
    fontWeight: "600",
  },
  separator: {
    height: 1,
    backgroundColor: "#e8eef8",
  },
  footer: {
    marginTop: 10,
    alignItems: "flex-end",
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: PRIMARY_BLUE,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginTop: 8,
  },
  plusCircle: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  addText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});
