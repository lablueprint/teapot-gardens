import { TouchableOpacity, StyleSheet, Text, TextInput, View, Alert, Image, Pressable} from "react-native";
import React, { useState } from "react";
import axios from 'axios';
import planticon from '@assets/planticon.png';
import { useNavigation } from 'expo-router';

const SignIn = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [username, setUsername] = useState("");
  
  const handleSubmit = async () => {
    if (
      !name ||
      !email ||
      !password ||
      !birthday ||
      !username
    ) {
      Alert.alert("Error", "Please fill out all the fields.");
    } else {
      Alert.alert("Success", "Form submitted successfully!");

      const user = {name: name, email: email, password: password, dob: birthday, username: username}
      
      console.log(user)
      try {
        const response = await axios.post('https://ea94-38-73-241-58.ngrok-free.app/api/users/', user);
        console.log(response.data)
      }
      catch (error) {
        console.log("error", error)
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sign In</Text>
        <Image style={{marginTop: 3, marginLeft: 10,}}source={ planticon } />
      </View>

      <Text>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Enter your email"
      />

      <Text>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          placeholder="Create a password"
        />
        <View style={styles.buttonContainer} >
          <TouchableOpacity style={styles.button} onPress={handleSubmit} >
            <Text style={{ fontSize: 18,}} >Create Profile</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text>Or</Text>
        </View>

        <View>
          <Text>Sign in with Google</Text>
          <Text>Sign in with Apple</Text>
          <Text>Have an account? </Text>
          <Pressable
            onPress={() => navigation.navigate('ProgramPage')}
          >
            <Text>Sign in </Text>
          </Pressable>
        </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 30, 
    fontWeight: 'bold',
  }, 
  header: {
    flexDirection: 'row', 
    fontSize: 40,
    marginTop: 90,
    marginBottom: 40,
  },
  button: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center", 
    borderRadius: 30,
    width: '300',
    borderColor: 'black',
    borderWidth: 1,
    height: '40',
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: 'flex-end',
    height: 30,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
  text: {
    paddingHorizontal: 10,
  },
});