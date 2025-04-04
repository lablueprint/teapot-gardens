import { KeyboardAvoidingView, Platform, TouchableOpacity, StyleSheet, Text, TextInput, View, Alert, Image, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import planticon from '@assets/planticon.png';
import OnboardingCarousel from "./OnboardingCarouselComp";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BACKEND = "https://ee6e-38-73-241-58.ngrok-free.app";

const Login = () => {
  // Define state for each input field
  const [name, setName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [zipcode, setZipcode] = useState("");
  // const [race, setRace] = useState("");
  const [birthday, setBirthday] = useState("");
  const [username, setUsername] = useState("");
  const [race, setRace] = useState("");
  const [income, setIncome] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");


  // const [open, setOpen] = useState(false); // Controls dropdown visibility
  // const [value, setValue] = useState(null); // Selected value
  // const [items, setItems] = useState([
  //     { label: 'Female', value: 'female' },
  //     { label: 'Male', value: 'male' },
  //     { label: 'Nonbinary', value: 'nonbinary' },
  //     { label: 'Prefer not to say', value: 'prefnot' },
  // ]);

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
      console.log('Error checkign first time status:', error);
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
    } else {

      const user = { name: name, email: email, password: password, dob: birthday, username: username, race: race, incomeLevel: income, age: age, genderIdentification: gender }

      console.log(user)
      try {
        const response = await axios.post('${BACKEND}/api/users/', user);
        console.log(response.data)
        Alert.alert("Success", "Form submitted successfully!");
      }
      catch (error) {
        console.log("error", error)
      }

    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 10 }}
    >
      <ScrollView>
        <View style={styles.container}>
          {showOnboarding ? (
            <OnboardingCarousel onComplete={handleOnboardingComplete} />
          ) : (
            <View>
              <View style={styles.header}>
                <Text style={styles.title}>Create an Account</Text>
                <Image style={{ marginTop: 3, marginLeft: 10, }} source={planticon} />
              </View>

              <Text>Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder="Enter your name"
              />

              <Text>Race</Text>
              <TextInput
                style={styles.input}
                value={race}
                onChangeText={(text) => setRace(text)}
                placeholder="Enter your race"
              />

              <Text>Income Level</Text>
              <TextInput
                style={styles.input}
                value={income}
                onChangeText={(text) => setIncome(text)}
                placeholder="Enter your income level"
              />

              <Text>Age</Text>
              <TextInput
                style={styles.input}
                value={age}
                onChangeText={(text) => setAge(text)}
                placeholder="Enter your age"
              />
              <Text>Gender identification</Text>
              <TextInput
                style={styles.input}
                value={gender}
                onChangeText={(text) => setGender(text)}
                placeholder="Enter your gender identifcation"
              />

              {/* <Text>Last Name</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      /> */}

              <Text>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Enter your email"
              />

              {/* <Text>Gender</Text>
      <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="Select an option"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
            />

      <Text>Race</Text> */}
              {/* <TextInput
        style={styles.input}
        value={race}
        onChangeText={(text) => setRace(text)}
      /> */}

              {/* <Text>Zipcode</Text>
      <TextInput
        style={styles.input}
        value={zipcode}
        onChangeText={(text) => setZipcode(text)}
      /> */}

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

              <Text>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                placeholder="Create a password"
              />

              {/* <Text>Income Level (optional)</Text>
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
            <Text style={{ fontSize: 18,}} >Sign Up</Text>
          </TouchableOpacity>
        </View>

      {/* <Text>Income Level (optional)</Text>
      <TextInput
        style={styles.input}
        value={income}
        onChangeText={(text) => setIncome(text)}
      /> */}

              {/* <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.text}>Or</Text>
        <View style={styles.line} />
      </View>
    */}

              <View style={styles.buttonContainer} >
                <TouchableOpacity style={styles.button} onPress={handleSubmit} >
                  <Text style={{ fontSize: 18, }} >Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        <View style={{ margin: 50 }}></View>
      </ScrollView>
    </KeyboardAvoidingView>
      </View>
      )}
    </View>
  );
};

export default Login;

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
    padding: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    width: '50%',
    borderColor: 'black',
    borderWidth: 1,
    height: '40',
  },
  buttonContainer: {
    alignItems: "center",
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

});