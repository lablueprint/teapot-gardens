import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import axios from 'axios';
import NotificationComponent from './notification_component';
import { notificationData } from '@screens/homepage/homepage_components/data';
import notif_background from '@assets/notif-background.png';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const url = 'https://7b82-2607-f010-2a7-1021-fcf6-2c41-ff88-8c09.ngrok-free.app';

export default function NotificationPage() {
    const [user, setUser] = useState({});
    const [userNotifs, setUserNotifs] = useState([]);
    
    const tempUserId = '6789f49f8e0a009647312c7a';
    const getUser = async () => {
      try {
          const response = await axios.get(`${url}/api/users/${tempUserId}`);
          console.log(response.data);
          setUser(response.data);
          setUserNotifs(response.data.notifications);
      } catch (error) {
          console.log("Error getting user", error);
      }
    }

    useFocusEffect(
        useCallback(() => {
            getUser();
        }, [])
    );
    

    return (
    <ImageBackground source={notif_background} style={styles.backgroundImage}>
        <ScrollView style={styles.main_container}>
        <Text style = {styles.title}> Notifications </Text>
        {userNotifs.map((notif, index) => (
            <NotificationComponent key={index} description={notif} />
        ))}
        {/* <NotificationComponent description="this is my notification"/> */}
        </ScrollView>
    </ImageBackground>
    );
}

const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode: 'cover',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: 600,
    marginVertical: 40,
    textAlign: 'center',
    color: '#737373',
    marginBottom: 50
  },
  main_container: {
    flex: 1,
  },
  
});