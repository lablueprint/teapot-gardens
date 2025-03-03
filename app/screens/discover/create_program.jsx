import React, { useState, useEffect} from "react";
import { Text, ScrollView, Button, View, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import axios from 'axios';

const CreateProgram = () => {
    const [description, setDescription] = useState("");
    {/* I dont think these should have anything when first being made but its here anyway!*/}

    const handleSubmit = async() => {
        if (!description){
            alert("Error please fill out all the fields"); 
        } else {
            const program = ({upcomingEvents: [], pastEvents: [], followList: [], description: description})
            console.log(program);
            try {
              const response = await axios.post('https://4f98-2607-f010-2e9-14-69f5-60e8-58ad-c808.ngrok-free.app/api/programs/', program);
              console.log(response.data);
            } catch (error) {
              console.log("error", error.response.data)
            }
        }
    }

    return (
    <ScrollView style={styles.container}>
        <Text style={styles.title}>Create Program</Text>
        <Text>Description</Text>
        <TextInput 
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
            placeholder="Description"
        />
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
    buttonContainer: {
        alignItems: "center",
        justifyContent: 'center',
    },
    input: {
        height: 30,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
})

export default CreateProgram;