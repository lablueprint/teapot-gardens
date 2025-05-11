import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function App() {
  const navigation = useNavigation();

  const buttons = [
    { label: "Go to Homepage", route: "Home" },
    { label: "Go to Login", route: "Login" },
    { label: "Go to Profile", route: "Profile" },
    { label: "Go to Program Page", route: "ProgramPage" },
    { label: "Go to Admin Dashboard", route: "AdminDashboard" },
    { label: "Go to Discover", route: "Discover" },
    { label: "Go to Plants", route: "View Plant" },
    { label: "Go to Events Page", route: "EventPage" },
    { label: "Go to Garden", route: "Garden" },
    { label: "Go to Nursery", route: "Nursery" },
  ];

  return (
    <View style={styles.container}>
      <Text>Use this to navigate to any screen, add a new screen navigation thingy in hamburger then add that button here - daniel</Text>
      <StatusBar style="auto" />

      {buttons.map((btn, idx) => (
        <Pressable
          key={idx}
          style={styles.button}
          onPress={() => navigation.navigate(btn.route)}
        >
          <Text style={styles.buttonText}>{btn.label}</Text>
        </Pressable>
      ))}
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
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    backgroundColor: "#f0f8ff",
    borderRadius: 8,
  },
  buttonText: {
    color: "blue",
    fontSize: 16,
    fontWeight: "500",
  },
});
