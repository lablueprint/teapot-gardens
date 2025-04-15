import { Text, View, TextInput, Pressable, Alert } from "react-native";
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import { Link } from "expo-router"; 
import React, {useState, useEffect} from "react";
import styles from "./admin_dashboard_style";
import eventData from "@screens/program_page/eventData.json";
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

const url = 'http://192.168.1.175:4000'

const AdminDashboard = () => {
    const [subjectLine, setSubjectLine] = useState("");
    const [bodyText, setBodyText] = useState("");
    const [open, setOpen] = useState(false); // Controls dropdown visibility
    const [value, setValue] = useState(null); // Selected value
    const [items, setItems] = useState([]);

    const [events, setEvents] = useState([]);

    const dropdownItems = events.map(event => ({
        label: event.eventDescription, // Displayed in the dropdown
        value: event._id, // Identifier
    }));

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${url}/api/events`);
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events: ', error.message);

            }
        };
        fetchEvents();
    }, []);

    const handleSubmit = async () => {
        if (subjectLine && bodyText){
            try {
                const event = await axios.get(`${url}/api/events/${value}`);
                console.log(event.data.attendeeList);

                await Promise.all(
                    event.data.attendeeList.map(attendeeId => {
                      return axios.patch(`${url}/api/users/${attendeeId}`, {
                        notifications: bodyText,
                      });
                    })
                  );
            
            } catch (error) {
                console.error('Error fetching attendees: ', error.message);
            }

            Alert.alert("success!");
        } else {
            Alert.alert("need subject line and body");
        }
    }
    
  return (
    <View>
        <View style={styles.adminContainer}>
            <Text style={styles.title}>Admin Dashboard</Text>
            <Text style={styles.subtitle} >Create an announcement</Text>
            <DropDownPicker
                    open={open}
                    value={value}
                    items={dropdownItems}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder="Select an event"
                    style={styles.dropdown}
                />
            <Text style={styles.header} >Subject Line</Text>
            <TextInput
                style={styles.input}
                value={subjectLine}
                onChangeText={(text) => setSubjectLine(text)}
            />
            <Text>Body</Text>
            <AutoGrowingTextInput
                style={styles.input}
                value={bodyText}
                onChangeText={(text) => setBodyText(text)}
            />
        </View>
        <View style={styles.buttonContainer} >
            <Pressable style={styles.button} onPress={handleSubmit} >
                <Text>Submit</Text>
            </Pressable>
        </View>
    </View>
  );
};

export default AdminDashboard;