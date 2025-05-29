import 'react-native-gesture-handler';
import React from 'react';
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import HamburgerMenu from "./src/components/hamburgermenu";
import { AuthProvider } from './context/AuthContext';
import { PlantProvider } from '@app/screens/garden/PlantContext';


export default function Layout() {
  return (
    <AuthProvider>
    <PlantProvider>          {/* provider wraps *everything* */}
        <HamburgerMenu />
    </PlantProvider>
    </AuthProvider>
  );
}
