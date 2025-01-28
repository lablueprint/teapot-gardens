import { TouchableOpacity, StyleSheet, Text, TextInput, View, Alert } from "react-native";
import React, { useState } from "react";
import DropDownPicker from 'react-native-dropdown-picker';

const EditProfile = () => {
  // Define state for each input field
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [race, setRace] = useState("");
  const [birthday, setBirthday] = useState("");
  const [income, setIncome] = useState("");
  const [gender, setGender] = useState('female')

  const [open, setOpen] = useState(false); // Controls dropdown visibility
  const [value, setValue] = useState(null); // Selected value
  const [items, setItems] = useState([
      { label: 'Female', value: 'female' },
      { label: 'Male', value: 'male' },
      { label: 'Nonbinary', value: 'nonbinary' },
      { label: 'Prefer not to say', value: 'prefnot' },
  ]);

  
  const handleSubmit = () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !gender ||
      !race ||
      !birthday ||
      !zipcode
    ) {
      Alert.alert("Error", "Please fill out all the fields.");
    } else {
      Alert.alert("Success", "Form submitted successfully!");
      console.log({
        firstName,
        lastName,
        email,
        password,
        gender,
        race,
        birthday,
        income,
      });
    }
  };

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

      <Text>Gender</Text>
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

      <Text>Race</Text>
      <TextInput
        style={styles.input}
        value={race}
        onChangeText={(text) => setRace(text)}
      />

      <Text>Zipcode</Text>
      <TextInput
        style={styles.input}
        value={zipcode}
        onChangeText={(text) => setZipcode(text)}
      />

      <Text>Birthday</Text>
      <TextInput
        style={styles.input}
        value={birthday}
        onChangeText={(text) => setBirthday(text)}
      />

      <Text>Income Level (optional)</Text>
      <TextInput
        style={styles.input}
        value={income}
        onChangeText={(text) => setIncome(text)}
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
    backgroundColor: "pink", 
    padding: 10,
    justifyContent: "center",
    alignItems: "center", 
    borderRadius: 20,
  }
});
