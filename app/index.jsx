import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Link, useNavigation } from "expo-router";

export default function App() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Welcome to the Garden Gangggggggg</Text>
      <StatusBar style="auto" />
      <Link href="/screens/page1/page1" style={{ color: "blue" }}>
        Go to Page1
      </Link>
      <Link href="/screens/homepage/homepage" style={{ color: "blue" }}>
        Go to Homepage
      </Link>
      <Link href="/screens/login/login" style={{ color: "blue" }}>
        Go to Login
      </Link>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
        >
        <Text style={{ color: "black "}}>Login</Text>
      </Pressable>
      <Link href="/screens/profile/profile_page" style={{ color: "blue" }}>
        Go to Profile
      </Link>
      <Link href="/screens/program_page/program_page" style={{ color: "blue" }}>
        Go to Program Page
      </Link>
      <Link href="/screens/admin_dashboard/admin_dashboard" style={{ color: "blue" }}>
        Go to Admin Dashboard
      </Link>
      <Link href="/screens/discover/discover" style={{ color: "blue" }}>
        Go to Discover
      </Link>
      <Link href="/screens/plant/plant" style={{ color: "blue" }}>
        Go to Plants
      </Link>
      <Link href="/screens/events" style={{ color: "blue" }}>
        Go to Events Page
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