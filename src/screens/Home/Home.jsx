// screens/Home/Home.jsx
import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import HeaderHome from "./components/HeaderHome";
import GreetingSection from "./components/GreetingSection";
import QuoteCard from "./components/QuoteCard";
import ScheduleCard from "./components/ScheduleCard";
import NoteCard from "./components/NoteCard";
import FloatingButton from "./components/FloatingButton";

import BottomNavigationBar from "../../components/BottomNavigationBar";

export default function Home() {
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <HeaderHome />

      {/* CONTENT */}
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <GreetingSection />
        <QuoteCard />
        <ScheduleCard />
        <NoteCard />
      </ScrollView>

      {/* FLOATING BUTTON */}
      <FloatingButton />

      {/* CUSTOM BOTTOM BAR */}
      <BottomNavigationBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 0,
  },
});
