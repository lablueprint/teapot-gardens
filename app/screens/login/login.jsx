import { TouchableOpacity, StyleSheet, Text, TextInput, View, Alert, Image, Pressable} from "react-native";
import React, { useState } from "react";
import axios from 'axios';
import planticon from '@assets/planticon.png';
import { useNavigation } from 'expo-router';

const Login = () => {
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
        <Text style={styles.title}>Register</Text>
        <Image style={{marginTop: 3, marginLeft: 10,}}source={ planticon } />
      </View>

      <Text>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Enter your name"
      />

      <Text>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Enter your email"
      />

      {/* <Text>Birthday</Text>
      <TextInput
        style={styles.input}
        value={birthday}
        onChangeText={(text) => setBirthday(text)}
        placeholder="MM/DD/YYYY"
      />

      <Text>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholder="Create a username"
        /> */}

      <Text>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          placeholder="Enter your password"
        />
        <View style={styles.buttonContainer} >
          <TouchableOpacity style={styles.button} onPress={handleSubmit} >
            <Text style={{ fontSize: 18, color: 'white'}} >Create Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.orContainer}>
          <View style={styles.orline} />
          <Text style={styles.orText}>Or</Text>
          <View style={styles.orline} />
        </View>

        <View style={styles.customSignInContainer}>
          <TouchableOpacity style={styles.customSignIn}>
            <Text>Sign in with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.customSignIn}>
            <Text>Sign in with Apple</Text>
          </TouchableOpacity>
        </View>

        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity>
              <Text>Have an account? </Text>
          </TouchableOpacity>
          <Pressable
            onPress={() => navigation.navigate('SignIn')}
          >
            <Text style={{color: 'blue'}}>Sign in </Text>
          </Pressable>
        </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#AFC9C9"
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "white", 
    borderColor: "white",
    opacity: 0.7,
    paddingVertical: 25,
    fontSize: 10,
  },
  title: {
    fontSize: 30, 
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
    borderRadius: 16,
    width: '330',
    backgroundColor: '#0D0D0D',
    opacity: 0.5,
    borderWidth: 1,
    height: '40',
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: 'flex-end',
    height: 30,
    marginTop: 20, 
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
  orContainer: {
    marginVertical: 20,
    display: 'flex', 
    alignItems: 'center',
    flexDirection: 'row',
  },
  orText: {
    color: "#6b7280",
    fontSize: 14,
    backgroundColor: 'white',
    fontSize: 10,
    padding: 3,
  },
  orline: {
    flex: 1,
    height: 1,
    backgroundColor: 'white',
  },
  customSignInContainer: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginVertical: 20,
  },
  customSignIn: {
    borderColor: "white", 
    borderWidth: 0.5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  }
});