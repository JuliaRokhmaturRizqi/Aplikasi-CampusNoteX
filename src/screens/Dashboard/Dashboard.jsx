import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import BottomNavigationBar from "../../components/BottomNavigationBar";
import { LineChart } from "react-native-chart-kit";

const PRIMARY_BLUE = "#0D47A1";
const { width } = Dimensions.get("window");

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 90 }}>
          
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>CampusNoteX</Text>
          </View>

          {/* JADWAL BULAN INI */}
          <Text style={styles.sectionTitle}>Jadwal dalam bulan ini</Text>

          <View style={styles.row}>
            <View style={[styles.smallCard, { backgroundColor: "#0AA90A" }]}>
              <Text style={styles.cardLabel}>Selesai</Text>
              <Text style={styles.cardValue}>11</Text>
            </View>

            <View style={[styles.smallCard, { backgroundColor: "#B10E0E" }]}>
              <Text style={styles.cardLabel}>Tidak Selesai</Text>
              <Text style={styles.cardValue}>3</Text>
            </View>

            <View style={[styles.smallCard, { backgroundColor: PRIMARY_BLUE }]}>
              <Text style={styles.cardLabel}>Jumlah</Text>
              <Text style={styles.cardValue}>14</Text>
            </View>
          </View>

          <View style={styles.bigCard}>
            <Text style={styles.bigNumber}>54</Text>
            <Text style={styles.bigDesc}>
              Jumlah seluruh jadwal selesai dalam semester ini
            </Text>
          </View>

          {/* GRAFIK */}
          <Text style={styles.sectionTitle}>Tabel produktifitas</Text>

          <View style={styles.chartCard}>
            <LineChart
              data={{
                labels: ["Jan", "Feb", "Mar", "April", "Mei", "Juni", "Jul"],
                datasets: [{ data: [10, 30, 50, 70, 90, 80, 90] }],
              }}
              width={width - 32}
              height={220}
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 0,
                color: () => PRIMARY_BLUE,
                labelColor: () => "#333",
                propsForDots: {
                  r: "5",
                  strokeWidth: "2",
                  stroke: PRIMARY_BLUE,
                },
              }}
              bezier
              style={{ borderRadius: 12 }}
            />
          </View>

          {/* CATATAN */}
          <Text style={styles.sectionTitle}>Catatan dalam bulan ini</Text>

          <View style={styles.row}>
            <View style={[styles.smallCard, { backgroundColor: "#F2B705" }]}>
              <Text style={styles.cardLabel}>Revisi</Text>
              <Text style={styles.cardValue}>11</Text>
            </View>

            <View style={[styles.smallCard, { backgroundColor: "#8B4513" }]}>
              <Text style={styles.cardLabel}>Ide</Text>
              <Text style={styles.cardValue}>3</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.smallCard, { backgroundColor: "#1E88E5" }]}>
              <Text style={styles.cardLabel}>Bimbingan</Text>
              <Text style={styles.cardValue}>11</Text>
            </View>

            <View style={[styles.smallCard, { backgroundColor: "#0AA90A" }]}>
              <Text style={styles.cardLabel}>Magang</Text>
              <Text style={styles.cardValue}>11</Text>
            </View>
          </View>

          <View style={styles.bigCard}>
            <Text style={styles.bigNumber}>32</Text>
            <Text style={styles.bigDesc}>
              Jumlah seluruh catatan selesai dalam semester ini
            </Text>
          </View>

        </ScrollView>

        {/* TAB BAR */}
        <BottomNavigationBar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1 },

  header: {
    backgroundColor: PRIMARY_BLUE,
    padding: 16,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },

  sectionTitle: {
    marginTop: 16,
    marginLeft: 16,
    fontSize: 15,
    fontWeight: "700",
    color: PRIMARY_BLUE,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 10,
  },

  smallCard: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 12,
    padding: 12,
  },
  cardLabel: {
    color: "white",
    fontSize: 12,
  },
  cardValue: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 6,
  },

  bigCard: {
    margin: 16,
    borderWidth: 1.5,
    borderColor: PRIMARY_BLUE,
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
  },
  bigNumber: {
    fontSize: 42,
    fontWeight: "800",
    color: PRIMARY_BLUE,
  },
  bigDesc: {
    textAlign: "center",
    marginTop: 6,
    color: PRIMARY_BLUE,
    fontSize: 12,
  },

  chartCard: {
    margin: 16,
    borderRadius: 14,
    padding: 8,
    borderWidth: 1,
    borderColor: PRIMARY_BLUE,
  },
});
