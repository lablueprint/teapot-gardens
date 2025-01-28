import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Garden Gangggggggg</Text>
      <StatusBar style="auto" />
      <Link href="/page1" style={{ color: "blue" }}>
        Go to Page1
      </Link>
      <Link href="/homepage" style={{ color: "blue" }}>
        Go to Homepage
      </Link>
      <Link href="/login" style={{ color: "blue" }}>
        Go to Login
      </Link>
      <Link href="/profile/profile_page" style={{ color: "blue" }}>
        Go to Profile
      </Link>
      <Link href="/program_page" style={{ color: "blue" }}>
        Go to Program Page
      </Link>
      <Link href="/discover/discover_page" style={{ color: "blue" }}>
        Go to Discover Page
      </Link>
      <Link href="/admin_dashboard" style={{ color: "blue" }}>
        Go to Admin Dashboard
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
