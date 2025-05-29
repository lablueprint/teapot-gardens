import React, { useState, useEffect} from "react";
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image, Pressable } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { TitleSharp } from "@mui/icons-material";
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditImage from '@assets/add_image.png'
import { useNavigation } from '@react-navigation/native';

const url = 'https://1a02-2607-f010-2a7-1021-8928-8dad-f48e-e780.ngrok-free.app';

const AddImage = ({ pickImage }) => {
    return (
        <Pressable style={styles.addImage} onPress={pickImage}>
            <Image source={EditImage}></Image>
            <Text style={{color: '#919191'}}>Edit Program Image</Text>
        </Pressable>

    )
}

const CreateProgram = () => {
    const navigation = useNavigation();
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [admins, setAdmins] = useState([]);
    const [open, setOpen] = useState(false); // for host dropdown
    const [items, setItems] = useState([]);
    const [host, setHost] = useState(null);
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
        if (!description || !title || !host){
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
            <Pressable style={styles.topContainer} onPress={pickImage}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Discover')}>
                    <Ionicons name="chevron-back" size={22} color="#101828" />
                </TouchableOpacity>
                <View>{image? '' : <AddImage pickImage={pickImage}/>}</View>
                {image && <Image source={{ uri: image }} style={styles.image} />}
            </Pressable>
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
                        <Text style={{color: 'white'}}>Save Changes</Text>
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
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
    },   
    topContainer: {
        paddingTop: 50,
        height: '35%',
    },
    container: {
        backgroundColor: 'rgba(233, 233, 226, 1)',
        flexDirection: 'column',
    }, 
    inputContainer: {
        backgroundColor: 'rgba(224, 224, 216, 1)',
        height: '65%',
        borderTopRightRadius: 32,
        borderTopLeftRadius: 32,
        paddingHorizontal: 30,
        justifyContent: 'space-between',
        paddingVertical: 70,
    },
    addImage: {
        backgroundColor: 'rgba(233, 233, 226, 1)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '10%',
    },
    image: {
        height: '100%',
        width: '100%',
    },
    title: {
        fontSize: 25, 
        fontWeight: 'bold',
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 8,
        height: '25%',
        textAlign: 'center',
        backgroundColor: 'white',
    }, 
    button: {
        padding: 0,
        justifyContent: "center",
        alignItems: "center", 
        borderRadius: 18,
        // borderColor: 'rgba(157, 76, 106, 0.51)',
        // borderStyle: 'dashed',
        // borderWidth: 1,
        margin: 0,
        height: '100%',
        width: "100%",
        backgroundColor: '#9D4C6A',
    },
    buttonContainer: {
        padding: 0,
        margin: 0,
        alignItems: "center",
        justifyContent: 'center',
        height: '12%',
    },
    input: {
        height: '30%',
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: 'white',
        padding: 10,
    },
    dropdown: {
        dropDownContainerStyle: 'gray',
    },
})

export default CreateProgram;