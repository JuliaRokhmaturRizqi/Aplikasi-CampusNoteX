// src/screens/Schedule/Schedule.jsx
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";
import HeaderHome from "../Home/components/HeaderHome";
import BottomNavigationBar from "../../components/BottomNavigationBar";
import { Ionicons } from "@expo/vector-icons";

const { width, height: SCREEN_HEIGHT } = Dimensions.get("window");
const PRIMARY_BLUE = "#0D47A1";
const TODAY_BG = PRIMARY_BLUE; // full column background for "today"
const TODAY_BLOCK = "#0a3c74"; // slightly darker for the block inside today

// sample events (static)
const SAMPLE_EVENTS = [
  { date: "2025-12-01", title: "Magang", type: "badge", color: "#59d2a3" },
  { date: "2025-12-02", title: "bimbingan", type: "badge", color: "#ffce4d" },
  { date: "2025-12-03", title: "Magang", type: "badge", color: "#59d2a3" },
  { date: "2025-12-04", title: "Magang", type: "badge", color: "#59d2a3" },
  { date: "2025-12-05", title: "Magang\nbimbingan", type: "badge", color: "#ffce4d" },
  { date: "2025-12-06", title: "Magang", type: "badge", color: "#59d2a3" },
  { date: "2025-12-10", title: "Magang", type: "badge", color: "#42A5F5" },
  { date: "2025-12-11", title: "bimbingan", type: "badge", color: "#A75AF6" },
  { date: "2025-12-14", title: "revisian", type: "badge", color: "#A75AF6" },
  { date: "2025-12-16", title: "kerja", type: "badge", color: "#A75AF6" },
  // 25th has multiple events incl block
  { date: "2025-12-25", title: "Magang", type: "badge", color: "#59d2a3" },
  { date: "2025-12-25", title: "presentasi", type: "badge", color: "#2ecc71" },
  { date: "2025-12-25", title: "ALLDAY", type: "block", color: PRIMARY_BLUE },
];

function daysInMonth(y, m) {
  return new Date(y, m + 1, 0).getDate();
}
function weekdayOf(y, m, d) {
  return new Date(y, m, d).getDay();
}

export default function Schedule() {
  const [viewYear, setViewYear] = useState(2025);
  const [viewMonth, setViewMonth] = useState(11); // December (0-based)
  const [selectedDate, setSelectedDate] = useState("2025-12-25");

  // compute today's ISO (yyyy-mm-dd)
  const today = new Date();
  const todayIso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(
    today.getDate()
  ).padStart(2, "0")}`;

  const eventsByDate = useMemo(() => {
    const map = {};
    for (const ev of SAMPLE_EVENTS) {
      if (!map[ev.date]) map[ev.date] = [];
      map[ev.date].push(ev);
    }
    return map;
  }, []);

  const weeks = useMemo(() => {
    const firstWeekday = weekdayOf(viewYear, viewMonth, 1); // 0 = Sun
    const totalDays = daysInMonth(viewYear, viewMonth);
    const prevMonth = viewMonth === 0 ? 11 : viewMonth - 1;
    const prevYear = viewMonth === 0 ? viewYear - 1 : viewYear;
    const prevDays = daysInMonth(prevYear, prevMonth);

    const lead = firstWeekday;
    const totalCells = Math.ceil((lead + totalDays) / 7) * 7;
    const cells = [];
    for (let i = 0; i < totalCells; i++) {
      const idx = i - lead + 1;
      let cell = {};
      if (idx <= 0) {
        const day = prevDays + idx;
        const iso = `${prevYear}-${String(prevMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        cell = { y: prevYear, m: prevMonth, d: day, inMonth: false, iso };
      } else if (idx > totalDays) {
        const day = idx - totalDays;
        const nextMonth = (viewMonth + 1) % 12;
        const nextYear = viewMonth === 11 ? viewYear + 1 : viewYear;
        const iso = `${nextYear}-${String(nextMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        cell = { y: nextYear, m: nextMonth, d: day, inMonth: false, iso };
      } else {
        const iso = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(idx).padStart(2, "0")}`;
        cell = { y: viewYear, m: viewMonth, d: idx, inMonth: true, iso };
      }
      cells.push(cell);
    }

    const wk = [];
    for (let i = 0; i < cells.length; i += 7) wk.push(cells.slice(i, i + 7));
    return wk;
  }, [viewYear, viewMonth]);

  const monthLabel = useMemo(() => {
    const t = new Date(viewYear, viewMonth, 1);
    return t.toLocaleString("id-ID", { month: "long", year: "numeric" });
  }, [viewYear, viewMonth]);

  const goPrev = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };
  const goNext = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };

  const WEEKDAYS_MON_START = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

  // sizing to make grid fill available screen
  const HEADER_ESTIMATE = Platform.OS === "android" ? 140 : 140;
  const BOTTOM_NAV_HEIGHT = 70;
  const VERTICAL_PADDING = 12;
  const CALENDAR_AVAILABLE = Math.max(
    120,
    SCREEN_HEIGHT - (HEADER_ESTIMATE + BOTTOM_NAV_HEIGHT + VERTICAL_PADDING)
  );
  const ROWS_COUNT = Math.max(5, weeks.length);
  const ROW_HEIGHT = Math.floor(CALENDAR_AVAILABLE / ROWS_COUNT);
  const CELL_WIDTH = Math.floor((width - 12) / 7);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.screen}>
        <HeaderHome />

        <View style={styles.monthRow}>
          <TouchableOpacity onPress={goPrev} style={styles.navBtn}>
            <Ionicons name="chevron-back" size={20} color={PRIMARY_BLUE} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.monthSelector}>
            <Text style={styles.monthText}>{monthLabel}</Text>
            <Ionicons name="chevron-down" size={14} color={PRIMARY_BLUE} style={{ marginLeft: 6 }} />
          </TouchableOpacity>

          <TouchableOpacity onPress={goNext} style={styles.navBtn}>
            <Ionicons name="chevron-forward" size={20} color={PRIMARY_BLUE} />
          </TouchableOpacity>
        </View>

        <View style={styles.calendarWrapper}>
          <View style={styles.weekHeader}>
            {WEEKDAYS_MON_START.map((w) => (
              <View key={w} style={[styles.weekdayCell, { width: CELL_WIDTH }]}>
                <Text style={styles.weekdayText}>{w}</Text>
              </View>
            ))}
          </View>

          <ScrollView style={styles.gridScroll} contentContainerStyle={{ paddingBottom: 12 }}>
            {weeks.map((week, wi) => (
              <View key={"w" + wi} style={[styles.weekRow, { height: ROW_HEIGHT }]}>
                {week.map((cell, ci) => {
                  const evs = eventsByDate[cell.iso] ?? [];
                  const hasBlock = evs.some((e) => e.type === "block");
                  const smallBadges = evs.filter((e) => e.type === "badge");
                  const isToday = cell.iso === todayIso && cell.inMonth;
                  const isSelected = cell.iso === selectedDate;

                  return (
                    <TouchableOpacity
                      key={cell.iso + "-" + ci}
                      activeOpacity={0.9}
                      onPress={() => setSelectedDate(cell.iso)}
                      style={[
                        styles.cell,
                        !cell.inMonth && styles.cellMuted,
                        { width: CELL_WIDTH, height: ROW_HEIGHT },
                      ]}
                    >
                      {/* TODAY full-column overlay */}
                      {isToday && <View style={styles.todayCell} pointerEvents="none" />}

                      <View style={styles.cellInner}>
                        <Text style={[styles.dayNumber, !cell.inMonth && styles.dayMuted, isToday && styles.dayNumberToday]}>
                          {cell.d}
                        </Text>

                        {/* small badges stack (on top of today overlay) */}
                        <View style={styles.badgesCol}>
                          {smallBadges.slice(0, 3).map((b, idx) => (
                            <View key={idx} style={[styles.badge, { backgroundColor: b.color }]}>
                              <Text style={[styles.badgeText, isToday && { color: "#fff" }]} numberOfLines={1}>
                                {b.title}
                              </Text>
                            </View>
                          ))}
                        </View>

                        {/* block (full-height rectangle near bottom) */}
                        {hasBlock ? (
                          <View style={styles.blockWrapper}>
                            {evs
                              .filter((e) => e.type === "block")
                              .map((blk, i) => (
                                <View
                                  key={i}
                                  style={[
                                    styles.block,
                                    { backgroundColor: isToday ? TODAY_BLOCK : blk.color },
                                  ]}
                                />
                              ))}
                          </View>
                        ) : null}

                        {/* selection marker */}
                        {isSelected && <View style={styles.selectedDot} />}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </ScrollView>
        </View>

        <BottomNavigationBar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  screen: { flex: 1, backgroundColor: "#fff" },

  monthRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  navBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  monthSelector: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 4,
  },
  monthText: {
    color: PRIMARY_BLUE,
    fontWeight: "700",
  },

  calendarWrapper: {
    flex: 1,
    paddingHorizontal: 6,
  },

  weekHeader: {
    flexDirection: "row",
    marginBottom: 6,
  },
  weekdayCell: {
    height: 28,
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  weekdayText: { fontSize: 12, color: "#2b3a67", fontWeight: "700" },

  gridScroll: {
    flex: 1,
  },

  weekRow: {
    flexDirection: "row",
    marginBottom: 2,
  },

  cell: {
    borderWidth: 1,
    borderColor: "#d9d9d9",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    position: "relative",
  },

  // overlay for today: sits underneath badges/block if pointerEvents none
  todayCell: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: TODAY_BG,
    opacity: 1,
    zIndex: 0,
  },

  cellInner: {
    flex: 1,
    padding: 6,
    width: "100%",
    position: "relative",
    zIndex: 1, // keep content above overlay visually
  },

  dayNumber: { fontSize: 12, color: "#333", fontWeight: "600" },
  dayNumberToday: { color: "#fff", fontWeight: "700" },
  dayMuted: { color: "#bbb" },
  cellMuted: { backgroundColor: "#f3f5f7" },

  badgesCol: {
    marginTop: 6,
    flexDirection: "column",
  },
  badge: {
    minWidth: 26,
    maxWidth: "100%",
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 4,
    alignSelf: "flex-start",
  },
  badgeText: { fontSize: 10, color: "#fff", fontWeight: "700", textAlign: "center" },

  blockWrapper: {
    position: "absolute",
    left: 6,
    right: 6,
    bottom: 6,
    top: 30,
    justifyContent: "flex-end",
    zIndex: 0,
  },
  block: {
    width: "100%",
    flex: 1,
    borderRadius: 6,
  },

  selectedDot: {
    position: "absolute",
    right: 8,
    top: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: PRIMARY_BLUE,
  },
});
