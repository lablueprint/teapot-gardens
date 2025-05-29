import { TouchableOpacity, StyleSheet, Text, TextInput, View, Alert, Image, Pressable } from "react-native";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import React, { useState, useEffect } from "react";
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import planticon from '@assets/planticon.png';
import { useNavigation } from 'expo-router';
import logo from '@assets/teapot-logo.png';
import apple from '@assets/apple.png';
import google from '@assets/google.png'
import { useFonts } from 'expo-font';
import * as SecureStore from 'expo-secure-store';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const BACKEND = "https://5253-2607-f010-2a7-1021-9515-5e07-f324-7904.ngrok-free.app";

const Login = () => {
  const navigation = useNavigation();
  const { setUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [username, setUsername] = useState("");
  const [fontsLoaded] = useFonts({
    'CooperLtBT': require('@assets/Cooper_BT_Font_Family/CooperLtBT-Regular.ttf'),
  });

  const [race, setRace] = useState("");
  const [income, setIncome] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    checkIfFirstTime();
  }, []);

  const checkIfFirstTime = async () => {
    try {
      const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
      if (hasSeenOnboarding != null) {
        setShowOnboarding(false);
      }
    } catch (error) {
      console.log('Error checking first-time status:', error);
    }
  };

  const handleOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      setShowOnboarding(false);
    } catch (error) {
      console.log('Error saving onboarding status:', error);
    }
  };
  const handleSubmit = async () => {
    console.log("OOOOO");
    if (
      !name ||
      !email ||
      !password ||
      !birthday ||
      !username ||
      !race ||
      !income ||
      !age ||
      !gender
    ) {
      Alert.alert("Error", "Please fill out all the fields.");
      return false;
    } else {
      // Convert age to a number if needed
      const numericAge = Number(age);

      const user = {
        name: name,
        email: email,
        password: password,
        dob: birthday,
        username: username,
        race: race,
        incomeLevel: income,
        age: numericAge,
        genderIdentification: gender
      };

      console.log(user);
      try {
        const response = await axios.post(`${BACKEND}/api/users/`, user);
        console.log(response.data);
        const { userId, token } = response.data;

        // store user data securely
        await SecureStore.setItemAsync('user', JSON.stringify({ userId, token }));
        // update context
        setUser({ userId, token });
        Alert.alert("Success", "Form submitted successfully!");
        return true;
      } catch (error) {
        // First, log everything to see the full error structure
        console.log("Full error:", error);
        console.log("Error response:", error.response);
        console.log("Error response data:", error.response?.data);

        // Extract error message
        let errorMessage = "An error occurred while submitting the form.";

        if (error.response && error.response.data) {
          // Check for specific field errors
          if (error.response.data.errors) {
            const fieldErrors = error.response.data.errors;
            if (fieldErrors.email) {
              errorMessage = fieldErrors.email;
            } else if (fieldErrors.username) {
              errorMessage = fieldErrors.username;
            } else {
              // Get the first error message if there are multiple
              const firstErrorField = Object.keys(fieldErrors)[0];
              if (firstErrorField) {
                errorMessage = fieldErrors[firstErrorField];
              }
            }
          }
          // Check for general message
          else if (error.response.data.message) {
            errorMessage = error.response.data.message;
          }
          // Check for error property (for backward compatibility)
          else if (error.response.data.error) {
            errorMessage = error.response.data.error;
          }
        }

        Alert.alert("Registration Error", errorMessage);
      }
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Register</Text>
          <Image style={styles.logo} source={logo} />
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
          onChangeText={(text) => setEmail(text.toLowerCase())}
          placeholder="Enter your email"
        />

        <Text>Birthday</Text>
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
        />
        <Text>Race</Text>
        <TextInput
          style={styles.input}
          value={race}
          onChangeText={(text) => setRace(text)}
          placeholder="Race"
        />

        <Text>Income</Text>
        <TextInput
          style={styles.input}
          value={income}
          onChangeText={(text) => setIncome(text)}
          placeholder="Income"
        />

        <Text>Gender</Text>
        <TextInput
          style={styles.input}
          value={gender}
          onChangeText={(text) => setGender(text)}
          placeholder="Gender"
        />

        <Text>Age</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={(text) => setAge(text)}
          placeholder="Age"
        />

        <Text>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          placeholder="Enter your password"
        />
        <View style={styles.buttonContainer} >
          <TouchableOpacity style={styles.button}
            onPress={async () => {
              console.log("here");
              const success = await handleSubmit();
              if (success) {
                navigation.navigate('Home');
              }
            }} >
            <Text style={{ fontSize: 30, color: 'white' }} >Create Profile</Text>
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
            onPress={() => navigation.navigate('SignIn')}
          >
            <Text style={{ color: 'blue' }}>Sign in </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#AFC9C9"
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
  input: {
    height: 40,
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "white",
    borderColor: "white",
    opacity: 0.5,
    fontSize: 10,
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
    padding: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    width: '330',
    backgroundColor: '#0D0D0D',
    opacity: 0.5,
    borderWidth: 1,
    height: '60',
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: 'flex-end',
    height: 40,
    marginTop: 30,
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
    backgroundColor: 'white',
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
    display: 'flex',
    flexDirection: 'row',
  },
  line: {
    flex: 1,
    height: 0.1,
    backgroundColor: 'white',
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
  }
});
