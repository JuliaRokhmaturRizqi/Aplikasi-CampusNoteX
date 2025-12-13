// src/navigation/index.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import SplashScreen from "../screens/SplashScreen";
import Login from "../screens/Auth/Login";
import Register from "../screens/Auth/Register";
import RegisterMahasiswa from "../screens/Auth/RegisterMahasiswa";

import Home from "../screens/Home/Home";
import NotesList from "../screens/Notes/NotesList";
import NotesDetail from "../screens/Notes/NotesDetail";
import Schedule from "../screens/Schedule/Schedule";
import Dashboard from "../screens/Dashboard/Dashboard";
import Profile from "../screens/Profile/Profile";



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
      <Stack.Screen name="NotesList" component={NotesList} />
      <Stack.Screen name="NoteDetail" component={NotesDetail} />
      <Stack.Screen name="EditNote" component={require('../screens/Notes/EditNote').default} />
      <Stack.Screen name="AddNote" component={require('../screens/Notes/AddNote').default} />
      <Stack.Screen name="Jadwal" component={Schedule} />
      <Stack.Screen
  name="Dashboard"
  component={Dashboard}
  options={{ headerShown: false }}
/>
      <Stack.Screen name="Profile" component={Profile} />

      {/* tambah screen lain nanti */}
    </Stack.Navigator>
  );
}
