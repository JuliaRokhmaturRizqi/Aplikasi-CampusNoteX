// src/navigation/index.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import SplashScreen from "../screens/SplashScreen";
import Login from "../screens/Auth/Login";
import Register from "../screens/Auth/Register";
import RegisterMahasiswa from "../screens/Auth/RegisterMahasiswa";

import Home from "../screens/Home/Home";
import Catatan from "../screens/Catatan";



const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="RegisterMahasiswa" component={RegisterMahasiswa} />
      <Stack.Screen 
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Catatan" component={Catatan} />
      {/* tambah screen lain nanti */}
    </Stack.Navigator>
  );
}
