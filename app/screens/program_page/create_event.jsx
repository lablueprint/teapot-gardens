import React, { useState, useEffect} from "react";
import { Text, ScrollView, Button, View, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';


const CreateEvent = () => {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [time, setTime] = useState("");
    const [details, setDetails] = useState("");
    const [image, setImage] = useState("");

    const pickImage = async() => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
        alert('Permission denied!');
        return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        if (!result.canceled) {
        setImage(result.assets[0].uri);
        }
    }

    const handleSubmit = async() => {
        if (!name || !date || !location || !time || !details){
            alert("Error please fill out all the fields"); 
        } else {
            const event = {name: name, time: time, date: date, location: location, attendeeList: [], eventDescription: details, hostDescription: 'Lorem Ipsum', XP: 0, pictures: [], admin: 0}
            console.log(event);
            try {
              const response = await axios.post('http://localhost:4000/api/events/', event);
              console.log(response.data);
            } catch (error) {
              console.log("error oops", error.response.data)
            }
        }
    }
    
    //update user events
    return (
    <ScrollView style={styles.container}>
        <Text style={styles.title}>Create Event</Text>
        <Text>Name</Text>
        <TextInput 
            style={styles.input}
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Title"
        />
        <Text>Date</Text>
        <TextInput 
            style={styles.input}
            value={date}
            onChangeText={(text) => setDate(text)}
            placeholder="MM/DD/YYYY"
        />
        <Text>Location</Text>
        <TextInput 
            style={styles.input}
            value={location}
            onChangeText={(text) => setLocation(text)}
            placeholder="Location"
        />
        <Text>Time</Text>
        <TextInput 
            style={styles.input}
            value={time}
            onChangeText={(text) => setTime(text)}
            placeholder="00:00"
        />
        <Text>Details</Text>
        <TextInput 
            style={styles.input}
            value={details}
            onChangeText={(text) => setDetails(text)}
            placeholder="Lorem Ipsum"
        />
        <Text>Image</Text>
        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <Text style={styles.buttonText}>{image ? '' : 'Pick an Image'}</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer} >
            <TouchableOpacity style={styles.button} onPress={handleSubmit} >
                <Text>Submit</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  }, 
  title: {
    fontSize: 30, 
    fontWeight: 'bold',
    marginBottom: 10,
  }, 
  input: {
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  button: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center", 
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 1,
    width: 200,
    marginVertical: 20, 
  },
  imageContainer: {
    borderWidth: 1, 
    borderColor: "gray", 
    alignItems: "center", 
    justifyContent: "center", 
    height: 230,
  },
  image: {
    width: 200, 
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: 'center',
  },
});

export default CreateEvent;