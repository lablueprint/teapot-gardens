import { TouchableOpacity, StyleSheet, Text, TextInput, View, Alert } from "react-native";
import React, { useState } from "react";
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

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
  // const [income, setIncome] = useState("");
  // const [gender, setGender] = useState('female')

  // const [open, setOpen] = useState(false); // Controls dropdown visibility
  // const [value, setValue] = useState(null); // Selected value
  // const [items, setItems] = useState([
  //     { label: 'Female', value: 'female' },
  //     { label: 'Male', value: 'male' },
  //     { label: 'Nonbinary', value: 'nonbinary' },
  //     { label: 'Prefer not to say', value: 'prefnot' },
  // ]);

  
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
      // console.log({
      //   name,
      //   email,
      //   password,
      //   birthday,
      //   username,
      // });

      const user = {name: name, email: email, password: password, dob: birthday, username: username}
      // const user = {
      //   admin: true,
      //   userId: 1,
      //   name,
      //   email,
      //   password,
      //   dob: birthday,
      //   username,
      //   tamagatchiType: "garden2",
      //   tamagatchiXP: 100,
      //   followedPrograms: [1, 2, 3],
      //   attendedEvents: [50, 51],
      //   attendingEvents: [10, 12],
      // };

      
      // const response = await fetch('/api/users', {
      //   method: 'POST',
      //   body: JSON.stringify(user),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // })
      try {
        const response = await axios.post('https://localhost:4000/api/users/createUser', user);
        console.log(response.data)
      }
      catch (error) {
        console.log("error", error)
      }
      

      const json = await response.json()
      console.log(json)

      


    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>

      <Text>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
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
      />

      <Text>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
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
      />

      <Text>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      {/* <Text>Income Level (optional)</Text>
      <TextInput
        style={styles.input}
        value={income}
        onChangeText={(text) => setIncome(text)}
      /> */}

      <TouchableOpacity style={styles.button} onPress={handleSubmit} >
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
