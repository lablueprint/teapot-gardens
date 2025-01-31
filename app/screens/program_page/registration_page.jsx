import React, { useState, useEffect} from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import bear from '@assets/bear.jpg';
import axios from 'axios';
import QRCode from "react-native-qrcode-svg";

const RegistrationPage = () => {
    const tempUserId = '6789f49f8e0a009647312c7a'
    const [user, setUser] = useState({});
    const [isCollapsed, setIsCollapsed] = useState(true);

    useEffect(() => {
        getUser();
      }, [])

    const getUser = async () => {
        try {
        const response = await axios.get(`https://27ab-38-15-215-20.ngrok-free.app/api/users/${tempUserId}`)
        setUser(response.data)
        }
        catch (error) {
        console.log("Error getting user", error)
        }
    }

    const toggleCollapsed = () => {
        setIsCollapsed((prevState) => !prevState);
    };
  
    const { title, date, location, time, details} = useLocalSearchParams();
  
    return (
        <View style={styles.container}>
            <View style = {styles.ticket}>
                <Image source={bear} style = {styles.image}/>
                {/* Event Header */}
                <Text style={styles.eventHeader}>{title}</Text>

                {/* Event Subtext */}
                <Text style={styles.subtext}>Event Location: {location}</Text>
                <Text style={styles.subtext}>Date: {date}</Text>
                <Text style={styles.subtext}>Time: {time}</Text>
                <Text style={styles.details}>Details: {details}</Text>
                <View style={styles.horizontalLine}/>
                <Text style={styles.subtext}>Name: {user.name}</Text>
                <Text style={styles.subtext}>Email: {user.email}</Text>
                <View style={{margin: 10}}>
                <QRCode style={styles.qr} value={user.id} size={170} />
                </View>

                
            
        </View>
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

export default RegistrationPage;