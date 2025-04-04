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
            <Text style={{ fontSize: 18,}} >Sign In</Text>
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
        <View style={styles.lineContainer}>
          <Text>Have an account? </Text>
          <Pressable
            onPress={() => navigation.navigate('ProgramPage')}
          >
            <Text style={{color: 'blue'}}>Sign in </Text>
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
    backgroundColor: '#AFC9C9',
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
  },
  input: {
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    opacity: 0.5,
    paddingVertical: 25,
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
    backgroundColor: "#0D0D0D80",
    opacity : 0.5,
    borderWidth: 1,
    height: '40',
  },
  buttonContainer: {
    marginTop: 20,
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
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
  text: {
    paddingHorizontal: 10,
  },
});