import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import HamburgerMenu from "./src/components/hamburgermenu";
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function Layout() {
  return (
    <SafeAreaProvider>
      <HamburgerMenu />
    </SafeAreaProvider>
  );
}
