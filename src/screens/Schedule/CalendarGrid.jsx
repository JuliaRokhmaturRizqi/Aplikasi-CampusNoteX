// src/screens/Schedule/CalendarGrid.jsx
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const days = ["Senin","Selasa","Rabu","Kamis","Jumat","Sabtu","Minggu"];
const WIDTH = Dimensions.get("window").width;
const CELL_WIDTH = (WIDTH - 32) / 7; // 16 padding each side

export default function CalendarGrid({ monthTitle = "25, Desember, 2025" }) {
  // contoh data event singkat per tanggal (indexing by day number)
  const sampleEvents = {
    1: [{ short: "Magang", color:"#7BD389" }, { short: "Revisi", color:"#E06FF1" }],
    2: [{ short: "bimbingan", color:"#F0C419" }],
    5: [{ short: "Magang", color:"#7BD389" }],
    10:[{ short: "Magang", color:"#13A0D8" }],
    11:[{ short: "bimbingan", color:"#E06FF1" }],
    14:[{ short: "revisi", color:"#E06FF1" }]
  };

  // simple calendar rows (4-5 rows). For simplicity render 6 rows of 7.
  const rows = [];
  let day = 1;
  for (let r = 0; r < 6; r++) {
    const cells = [];
    for (let c = 0; c < 7; c++) {
      const events = sampleEvents[day] || [];
      cells.push(
        <View key={`${r}-${c}`} style={[styles.cell, { width: CELL_WIDTH }]}>
          <Text style={styles.dayNumber}>{day <= 31 ? String(day) : ""}</Text>
          <View style={styles.eventList}>
            {events.slice(0,2).map((e, i) => (
              <View key={i} style={[styles.eventPill, { backgroundColor: e.color }]}>
                <Text style={styles.eventText}>{e.short}</Text>
              </View>
            ))}
          </View>
        </View>
      );
      day++;
    }
    rows.push(<View key={r} style={styles.row}>{cells}</View>);
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.monthTitle}>{monthTitle} ▾</Text>
      <View style={styles.dayRow}>
        {days.map((d) => <Text key={d} style={styles.dayLabel}>{d}</Text>)}
      </View>
      <View style={styles.grid}>
        {rows}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { paddingHorizontal: 16, marginTop: 8 },
  monthTitle: { color: "#234a8f", fontWeight: "600", marginBottom: 8 },
  dayRow: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 2 },
  dayLabel: { width: (Dimensions.get("window").width - 32) / 7, textAlign: "center", fontSize: 12, color: "#234a8f", fontWeight:"600" },
  grid: { marginTop: 8 },
  row: { flexDirection: "row" },
  cell: { borderWidth: 1, borderColor: "#ddd", minHeight: 70, padding: 4 },
  dayNumber: { fontSize: 12, color: "#333", fontWeight: "600" },
  eventList: { marginTop: 6 },
  eventPill: { paddingHorizontal: 6, paddingVertical: 4, borderRadius: 6, marginBottom: 4, alignSelf: "flex-start" },
  eventText: { fontSize: 10, color: "#fff", fontWeight: "700" },
});
