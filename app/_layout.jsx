import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import HamburgerMenu from "./src/components/hamburgermenu";
import { AuthProvider } from './context/AuthContext';

export default function Layout() {
  return (
    <AuthProvider>
      <HamburgerMenu />
    </AuthProvider>
  );
}
