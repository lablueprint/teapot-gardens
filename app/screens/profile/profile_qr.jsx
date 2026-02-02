import React, { useState, useEffect} from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import bear from '@assets/bear.jpg';
import axios from 'axios';
import QRCode from "react-native-qrcode-svg";

const url = 'https://c753-2607-f010-2a7-103f-d156-853f-9990-8831.ngrok-free.app'

const ProfileQR = () => {
    const tempUserId = '696ad149027e7290f0c97e1e'
    const [user, setUser] = useState({});

    useEffect(() => {
        getUser();
      }, [])

    const getUser = async () => {
        try {
        const response = await axios.get(`${url}/api/users/${tempUserId}`)
        setUser(response.data)
        console.log(response.data)
        }
        catch (error) {
        console.log("Error getting user", error)
        }
    }

    
    return (
        <View style={styles.container}>
            <QRCode value={user._id} size={180} backgroundColor="#DEDBD6" />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ticket: {
    backgroundColor: '#E1E1E1',
    width: '80%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    textAlign: 'left',
  },
  image: {
    width: 250,
    height: 200,
    margin: 10,
  },
  eventHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtext: {
    fontSize: 12,
    marginBottom: 4,
  },
  details: {
    fontSize: 12,
    marginBottom: 16,
    fontStyle: "italic",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  hostCard: {
    fontSize: 12,  
  },
  horizontalLine: {
      height: 1,
      backgroundColor: 'gray', 
      width: '80%',
      marginVertical: 10, 
  },
});

export default ProfileQR;