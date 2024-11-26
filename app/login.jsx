import { TouchableOpacity, StyleSheet, Text, TextInput, View, Alert } from "react-native";
import React, { useState } from "react";

const Login = () => {
  // Define state for each input field
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [race, setRace] = useState("");
  const [birthday, setBirthday] = useState("");
  const [income, setIncome] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>

      <Text>First Name</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />

      <Text>Last Name</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />

      <Text>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <Text>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />

      <Text>Race</Text>
      <TextInput
        style={styles.input}
        value={race}
        onChangeText={(text) => setRace(text)}
      />

      <Text>Birthday</Text>
      <TextInput
        style={styles.input}
        value={birthday}
        onChangeText={(text) => setBirthday(text)}
      />

      <Text>Income Level</Text>
      <TextInput
        style={styles.input}
        value={income}
        onChangeText={(text) => setIncome(text)}
      />

      <TouchableOpacity style={styles.button} onPress={() => Alert.alert('form submitted :)')} >
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20, 
    paddingBottom: 20,
  }, 
  button: {
    backgroundColor: "pink", 
    padding: 10,
    justifyContent: "center",
    alignItems: "center", 
    borderRadius: 20,
  }
});
