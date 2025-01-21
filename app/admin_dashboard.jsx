import { Text, View, TextInput, Pressable, Alert } from "react-native";
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import { Link } from "expo-router"; 
import React, {useState} from "react";
import styles from "./admin_dashboard_style";
import eventData from "./eventData.json";
import DropDownPicker from 'react-native-dropdown-picker';

const AdminDashboard = () => {
    const [subjectLine, setSubjectLine] = useState("");
    const [bodyText, setBodyText] = useState("");
    const [open, setOpen] = useState(false); // Controls dropdown visibility
    const [value, setValue] = useState(null); // Selected value
    const [items, setItems] = useState([]);

    const dropdownItems = eventData.events.map(event => ({
        label: event.title, // Displayed in the dropdown
        value: event.title, // Identifier
    }));

    const handleSubmit = () => {
        if (subjectLine && bodyText){
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
