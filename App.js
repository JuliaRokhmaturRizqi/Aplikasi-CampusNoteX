// App.js
import React from "react";
import { LogBox } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation";


// sembunyikan warning dev yang mengganggu saat develop
LogBox.ignoreLogs(["Setting a timer"]);

// Coba tahan splash screen native seawal mungkin.
// Jika preventAutoHideAsync gagal (mis. belum ada expo-splash-screen),
// kita tangani error-nya agar app tetap jalan.


export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
