import { TouchableOpacity, StyleSheet, Text, TextInput, View, Alert, Pressable, Image } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { useEffect } from "react";
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import grapes from '@assets/grapes.jpg';
import { useNavigation } from '@react-navigation/native';
// import planticon from '../../assets/planticon.png';

const url = 'http://localhost:4000'
const tempUserId = '6789f49f8e0a009647312c7a'

const EditProfile = () => {

  useEffect(() => {
    const fetchAll = async () => {
      const userData = await getUser();
    };
    fetchAll();
  }, []);

  // Define state for each input field
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);
  const [password, setPassword] = useState("");
  // const [zipcode, setZipcode] = useState("");
  // const [race, setRace] = useState("");
  const [birthday, setBirthday] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const navigation = useNavigation();
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
    if (!name && !email && !password && !birthday && !username && !bio && profilePicture === user.profilePicture) {
      Alert.alert("Error", "Please fill out at least one field.");
    }
    else {
      Alert.alert("Success", "Form submitted successfully!");

      const user = {};
      if (name) user.name = name;
      if (email) user.email = email;
      if (password) user.password = password;
      if (bio) user.bio = bio;
      if (birthday) user.dob = birthday;  // Use 'dob' key for birthday
      if (username) user.username = username;
      if (profilePicture) user.profilePicture = profilePicture;
      
      try {
        const response = await axios.patch(`${url}/api/users/${tempUserId}`, user);
        setUser(response.data); 
        setProfilePicture(response.data.profilePicture); 
        navigation.navigate("Profile");
      }
      catch (error) {
        console.log("error", error)
      }

    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get(`${url}/api/users/${tempUserId}`);
      setUser(response.data);
      setProfilePicture(response.data.profilePicture);
      return response.data;
    } catch (error) {
      console.log("Error getting user", error);
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Edit Your Profile</Text>
        {/* <Image style={{marginTop: 3, marginLeft: 10,}}source={ planticon } /> */}
      </View>

      <Pressable onPress={() => {
        const pickImage = async () => {
          const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (permissionResult.granted === false) {
            Alert.alert("Permission to access camera roll is required!");
            return;
          }
          const result = await ImagePicker.launchImageLibraryAsync();
          if (result.cancelled) {
            return;
          }
          
          const uri = result.assets[0].uri;

          // Update local state immediately
          setProfilePicture(uri);

          // Upload to backend
          const formData = new FormData();
          formData.append('profilePicture', {
            uri,
            name: 'profile.jpg',
            type: 'image/jpeg',
          });

          const response = await axios.patch(`${url}/api/users/${tempUserId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          
          if (data.url) {
            setProfilePicture(data.url);
          }
        };

        pickImage();
      }}>
        <Image 
          source={profilePicture ? { uri: profilePicture } : grapes}
          style={styles.image}
        />
      </Pressable>

      <Text>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder={user.name ? user.name : "Enter your name"}
      />

      {/* <Text>Last Name</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      /> */}

      <Text>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholder={user.username ? user.username : "Enter your username"}
      />

      <Text>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder={user.email ? user.email : "Enter your email"}
      />

      <Text>Bio</Text>
      <TextInput
        style={styles.input}
        value={bio}
        onChangeText={(text) => setBio(text)}
        placeholder={user.bio ? user.bio : "Enter your bio"}
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
        placeholder={user.dob ? user.dob : "Enter your birthday"}
      />

      <Text>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          placeholder="Enter new password"
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
    fontSize: 28,
    paddingBottom: 20, 
    fontWeight: 'bold',
  }, 
  header: {
    flexDirection: 'row', 
    fontSize: 40,
    marginTop: 20,
    marginBottom: 20,
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
    marginTop: 20,
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
  image: {
    width: 155,
    height: 155,
    borderRadius: 80, 
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: 15,
  },

});