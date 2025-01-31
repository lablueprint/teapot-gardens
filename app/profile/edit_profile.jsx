import { TouchableOpacity, StyleSheet, Text, TextInput, View, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import axios from 'axios';

const EditProfile = () => {
  // Define state for each input field
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState({});

  const tempUserId = '6789f49f8e0a009647312c7a'

  useEffect(() => {
    getUser();
    console.log(user);
  }, [])

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password);
    setDob(user.dob);
    setUsername(user.username);
  }, [user])

  const getUser = async () => {
    try {
      const response = await axios.get(`https://4ea4-131-179-94-50.ngrok-free.app/api/users/${tempUserId}`)
      setUser(response.data)
    }
    catch (error) {
      console.log("Error getting user", error)
    }
  }

  const handleSubmit = async () => {
    if (
      !name ||
      !email ||
      !password ||
      !dob ||
      !username
    ) {
      Alert.alert("Error", "Please fill out all the fields.");
    } else {
      Alert.alert("Success", "Form submitted successfully!");

      const updateUser = {name: name, email: email, password: password, dob: dob, username: username}
      
      console.log(updateUser)
      try {
        const response = await axios.patch(`https://4ea4-131-179-94-50.ngrok-free.app/api/users/${tempUserId}`, updateUser);
        console.log(response.data)
      }
      catch (error) {
        console.log("error", error)
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <Text>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <Text>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

     <Text>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <Text>Birthday</Text>
      <TextInput
        style={styles.input}
        value={dob}
        onChangeText={(text) => setDob(text)}
      />

      <Text>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit} >
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfile;

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
    backgroundColor: "#008c8c", 
    padding: 10,
    justifyContent: "center",
    alignItems: "center", 
    borderRadius: 20,
  }
});
