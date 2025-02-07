import { TouchableOpacity, StyleSheet, Text, TextInput, View, Alert, Image } from "react-native";
import React, { useState } from "react";
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
// import planticon from '../../assets/planticon.png';

const EditProfile = () => {
  const tempUserId = '6789f49f8e0a009647312c7a'

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
    if (!name && !email && !password && !birthday && !username) {
      Alert.alert("Error", "Please fill out at least one field.");
    }
    else {
      Alert.alert("Success", "Form submitted successfully!");

      const user = {};
      if (name) user.name = name;
      if (email) user.email = email;
      if (password) user.password = password;
      if (birthday) user.dob = birthday;  // Use 'dob' key for birthday
      if (username) user.username = username;
      
      try {
        const response = await axios.patch(`https://0dd7-172-91-75-11.ngrok-free.app/api/users/${tempUserId}`, user);
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
        <Text style={styles.title}>Edit Your Profile</Text>
        {/* <Image style={{marginTop: 3, marginLeft: 10,}}source={ planticon } /> */}
      </View>

      <Text>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Enter your name"
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
          <Text style={{ fontSize: 18,}} >Update</Text>
        </TouchableOpacity>
      </View>
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
    width: '50%',
    borderColor: 'black',
    borderWidth: 1,
    height: '27%',
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: 'flex-end',
    height: '30%',
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