import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from 'expo-router';
export default function App() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable 
        style={styles.button} 
        onPress={() => navigation.navigate('AdminDashboard')}
        >
        <Text style={{ color: "black" }}>Admin Dashboard</Text>
      </Pressable>
      <Pressable 
        style={styles.button} 
        onPress={() => navigation.navigate('AdminScanner')}
        >
        <Text style={{ color: "black" }}>Admin Scanner</Text>
      </Pressable>
      <Pressable 
        style={styles.button} 
        onPress={() => navigation.navigate('RegistrationPage')}
        >
        <Text style={{ color: "black" }}>Registration Page</Text>
      </Pressable>
      <Pressable 
        style={styles.button} 
        onPress={() => navigation.navigate('Login')}
        >
        <Text style={{ color: "black" }}>Login</Text>
      </Pressable>
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