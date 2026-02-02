import { TouchableOpacity, StyleSheet, Text, TextInput, View, Alert, Image, Pressable } from "react-native";
import React, { useState } from "react";
import axios from 'axios';
import planticon from '@assets/planticon.png';
import { useNavigation } from 'expo-router';
import logo from '@assets/teapot-logo.png';
import apple from '@assets/apple.png';
import google from '@assets/google.png';
import { useFonts } from 'expo-font';



const SignIn = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [username, setUsername] = useState("");
  const [fontsLoaded] = useFonts({
    'CooperLtBT': require('@assets/Cooper_BT_Font_Family/CooperLtBT-Regular.ttf'),
  });
  const handleSubmit = async () => {
    if (
      !email ||
      !password
    ) {
      Alert.alert("Error", "Please fill out all the fields.");
      return false;
    } else {
      try {
        const response = await axios.post('http://localhost:4000/api/users/login', { email1: email, password: password });
        console.log('Login success:', response.data);
        Alert.alert("Success", "Logged in successfully!");
        return true;
      }
      catch (error) {
        console.log("Login error:", error);

        // Show user-friendly error message
        if (error.response) {
          // Server responded with an error
          const errorMessage = error.response.data?.error || "Login failed. Please try again.";
          Alert.alert("Login Failed", errorMessage);
        } else if (error.request) {
          // Request was made but no response received
          Alert.alert("Connection Error", "Could not connect to server. Please check if the backend is running.");
        } else {
          // Something else happened
          Alert.alert("Error", "An error occurred while submitting the form.");
        }
        return false;
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sign In</Text>
        <Image style={styles.logo} source={logo} />
      </View>

      <Text>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
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
        <TouchableOpacity style={styles.button} onPress={async () => {
          const success = await handleSubmit();
          if (success) {
            navigation.navigate('Home');
          }
        }} >
          <Text style={{ fontSize: 30, color: 'white' }} >Sign In</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.orContainer}>
        <View style={styles.orline} />
        <Text style={styles.orText}>Or</Text>
        <View style={styles.orline} />
      </View>



      <View style={styles.customSignInContainer}>
        <TouchableOpacity style={styles.customSignIn}>
          <Image style={styles.goog} source={google} />
          <Text>Sign in with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.customSignIn}>
          <Image style={styles.goog} source={apple} />
          <Text>Sign in with Apple</Text>
        </TouchableOpacity>
      </View>


      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity>
          <Text>Have an account? </Text>
        </TouchableOpacity>
        <Pressable
          onPress={() => navigation.navigate('ProgramPage')}
        >
          <Text style={{ color: 'blue' }}>Sign in </Text>
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
  logo: {
    position: 'absolute',
    right: 20,
    bottom: 1,
  },
  goog: {
    width: 15,
    height: 15,
  },
  customSignInContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  customSignIn: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    borderColor: "white",
    borderWidth: 0.5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  goog: {
    width: 15,
    height: 15,
  },
  input: {
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    marginTop: 5,
    backgroundColor: "white",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    opacity: 0.5,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'CooperLtBT',
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
    width: '300',
    borderColor: 'black',
    backgroundColor: "#0D0D0D80",
    borderWidth: 1,
    height: '60',
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: 'flex-end',
    height: 40,
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