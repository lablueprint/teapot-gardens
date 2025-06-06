import React, { useState, useEffect} from "react";
import { Text, ScrollView, Button, View, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";
import imageadd from '@assets/image-add.png';
import backbutton from '@assets/back-button.png';
import pencil from '@assets/pencil.png';
import calendar from '@assets/calendar.png';
import locationIcon from '@assets/location-event.png';
import { useFonts } from 'expo-font';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Modal } from 'react-native';


const CreateEvent = () => {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [time, setTime] = useState("");
    const [details, setDetails] = useState("");
    const [image, setImage] = useState("");
    const navigation = useNavigation();
    const route = useRoute();
    const program = JSON.parse(route.params.programData); 
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

    const [fontsLoaded] = useFonts({
        'NewSpirit': require('@assets/fonts/NewSpirit-Medium.otf'),
    });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateTime, setDateTime] = useState(new Date());
    const [prog, setProg] = useState(null);



    if (!fontsLoaded) return null;
    
    //update user events
    return (
      <View style={styles.container}> 
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => { navigation.navigate('ProgramPage', {
                            programData: JSON.stringify(program),
                            });
                          }}>
          <Image source={backbutton} style={styles.backText} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
              <Image source={imageadd} style={styles.imageIcon} />
            <Text style={styles.imageText}>Add Event Image</Text>
        </TouchableOpacity>

        <View style={styles.form}>

          {/* <RNPickerSelect
            onValueChange={(value) => setProgram(value)}
            value={program}
            items={[
              { label: 'Test', value: 'test' },
              { label: 'Demo', value: 'demo' },
            ]}
            placeholder={{ label: 'Select Program', value: null }}
            style={{
              inputIOS: styles.dropdown,
              inputAndroid: styles.dropdown,
            }}
            useNativeAndroidPickerStyle={false}
          /> */}
          <TextInput style={styles.dropdown} placeholder="Program" />

          
          <View style={styles.titleRow}>
            <TextInput style={styles.titleInput} placeholder="Event Title" />
            <Image source = {pencil} style={styles.editIcon}></Image>
          </View>

          <View style={styles.row}>
            {/* <View style={styles.inputContainer}>
              <Image source={calendar} style={styles.icon} />
              <TextInput
                style={styles.textInput}
                placeholder="Date and Time"
                placeholderTextColor="#888"
              />
            </View> */}
            

            <TouchableOpacity style={styles.inputContainer} onPress={() => setShowDatePicker(true)}>
              <Image source={calendar} style={styles.icon} />
              <Text style={styles.dateText}>{dateTime.toLocaleString()}</Text>
            </TouchableOpacity>

            {/* Modal Picker */}
            {showDatePicker && (
              <Modal visible={showDatePicker} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <DateTimePicker
                      value={dateTime}
                      mode="datetime"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      onChange={(event, selectedDate) => {
                        if (event.type === 'set') {
                          const currentDate = selectedDate || dateTime;
                          setDateTime(currentDate);
                          setDate(currentDate.toLocaleDateString());
                          setTime(currentDate.toLocaleTimeString());
                        }
                      }}
                    />
                    <Button title="Done" onPress={() => setShowDatePicker(false)} />
                  </View>
                </View>
              </Modal>
            )}

            <View style={styles.inputContainer}>
              <Image source={locationIcon} style={styles.icon} />
              <TextInput
                style={styles.textInput}
                placeholder="Location"
                placeholderTextColor="#888"
              />
            </View>
          </View>

          {/* Host */}
          {/* <RNPickerSelect
            onValueChange={(value) => console.log("Host:", value)}
            items={[
              { label: 'Test', value: 'test' },
              { label: 'Demo', value: 'demo' },
            ]}
            placeholder={{ label: 'Select Host', value: null }}
            style={{
              inputIOS: styles.dropdown,
              inputAndroid: styles.dropdown,
            }}
          /> */}
          <TextInput style={styles.dropdown} placeholder="Host" />


          {/* Description and Notes */}
          <TextInput style={styles.textArea} placeholder="Event Description" multiline />
          <TextInput style={styles.textArea} placeholder="Volunteer Notes" multiline />

          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit} >
              <Text style={styles.saveText}>Save Changes</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#e0e0e0' 
  },
  backButton: { 
    position: 'absolute', 
    top: 60, 
    left: 20, 
    zIndex: 10 
  },
  backText: { 
    fontSize: 24 
  },
  imageContainer: {
    backgroundColor: '#7d7d7d', 
    justifyContent: 'center',
    alignItems: 'center', 
    height: 310,
  },
  imageIcon: { 
    width: 40, 
    height: 40, 
    marginBottom: 10 
  },
  imageText: { 
    color: '#fff', 
    fontSize: 16 
  },
  form: {
    backgroundColor: '#C9C9C9', 
    padding: 30, 
    borderRadius: 50,
    position: 'absolute',
    top: 265,
    left: 0,
    right: 0,
    bottom: 0,
  },
  dropdown: {
    backgroundColor: '#f2f2f2', 
    borderRadius: 10, 
    padding: 10,
    marginBottom: 10,
    borderColor: '#8D8D8D',
    borderWidth: 1,
    fontSize: 18,
  },
  titleRow: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center-between', 
    backgroundColor: '#f2f2f2',
    borderRadius: 10, 
    padding: 15, 
    marginBottom: 10,
    borderColor: '#8D8D8D',
    borderWidth: 1,
  },
  titleInput: { 
    flex: 1, 
    fontSize: 42,
    textAlign: 'center',
    fontFamily: 'NewSpirit',
  },
  editIcon: { 
    marginRight: 10 ,
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },
  halfInput: {
    width: '48%', 
    backgroundColor: '#f2f2f2', 
    borderRadius: 10,
    padding: 10, 
    marginBottom: 10,
    borderColor: '#8D8D8D',
    borderWidth: 1,
    fontSize: 16,
  },
  textArea: {
    backgroundColor: '#f2f2f2', 
    borderRadius: 10, 
    padding: 10,
    height: 80, 
    marginBottom: 10,
    borderColor: '#8D8D8D',
    borderWidth: 1,
    fontSize: 18,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#9D4C6A', 
    borderRadius: 20, 
    padding: 15,
    alignItems: 'center', 
    marginTop: 10,
  },
  saveText: { 
    color: '#fff', 
    fontWeight: 'bold',
    fontFamily: 'NewSpirit',
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '48%', 
    backgroundColor: '#f2f2f2', 
    borderRadius: 10,
    padding: 10, 
    marginBottom: 10,
    borderColor: '#8D8D8D',
    borderWidth: 1,
    fontSize: 16,
  },
  dateText: {
    fontSize: 16,
    color: '#000',
    marginTop: 8,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },

});

export default CreateEvent;