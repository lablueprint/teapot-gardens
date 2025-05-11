import React, { useState, useEffect} from "react";
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import axios from 'axios';
import { TitleSharp } from "@mui/icons-material";
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const url = 'https://92f8-2607-f010-2a7-1021-fd15-b3a4-dc5d-ce7.ngrok-free.app';

const CreateProgram = () => {
    const navigation = useNavigation();
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [admins, setAdmins] = useState([]);
    const [open, setOpen] = useState(false); // for host dropdown
    const [items, setItems] = useState([]);
    const [host, setHost] = useState(null);

    const dropdownItems = admins.map(admin => ({
        label: admin.name,
        value: admin._id,
    }));

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await axios.get(`${url}/api/users`);
                const admins = response.data.filter(user => user.admin === true);
                setAdmins(admins);
            } catch (error) {
                console.error('Error fetching users:', error.message);
            }
        };
        fetchAdmins();
    }, []);

    const handleSubmit = async() => {
        if (!description){
            alert("Error: please fill out all the fields"); 
        } else {
            const program = ({name: title, upcomingEvents: [], pastEvents: [], followList: [], description: description, host: host})
            console.log(program);
            try {
              const response = await axios.post(`${url}/api/programs/`, program);
              console.log(response.data);
            } catch (error) {
              console.log("error", error.message)
            }
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Discover')}>
                <Ionicons name="chevron-back" size={22} color="#101828" />
            </TouchableOpacity>
            <View style={styles.addImage}>
                <Text>ADD IMAGE HERE</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.title}
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                    placeholder="Program Title"
                />
                <DropDownPicker
                    open={open}
                    value={host}
                    items={dropdownItems}
                    setOpen={setOpen}
                    setValue={setHost}
                    setItems={setItems}
                    placeholder="Select a host"
                    style={styles.dropdown}
                />
                <TextInput 
                    style={styles.input}
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    placeholder="Description"
                    multiline={ true }
                />
                <View style={styles.buttonContainer} >
                    <TouchableOpacity style={styles.button} onPress={handleSubmit} >
                        <Text>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    backBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#ffffffcc',
        alignItems: 'center',
        justifyContent: 'center',
      },    
    container: {
        flexDirection: 'column',
    }, 
    inputContainer: {
        backgroundColor: 'rgba(224, 224, 216, 1)',
        height: '65%',
        borderTopRightRadius: 32,
        borderTopLeftRadius: 32,
        padding: 30,
        marginVertical: 10,
    },
    addImage: {
        height: '35%',
    },
    title: {
        fontSize: 25, 
        fontWeight: 'bold',
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 8,
        marginVertical: 10,
        paddingHorizontal: 10,
        height: '20%',
        textAlign: 'center',
    }, 
    button: {
        padding: 10,
        justifyContent: "center",
        alignItems: "center", 
        borderRadius: 30,
        borderColor: 'black',
        borderWidth: 1,
        width: "50%",
        marginVertical: 5, 
    },
    buttonContainer: {
        alignItems: "center",
        justifyContent: 'center',
    },
    input: {
        height: '25%',
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 8,
        marginVertical: 10, 
        padding: 10,
    },
})

export default CreateProgram;