import { StyleSheet, Text, View, Image, ScrollView, Pressable, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from 'expo-router';
import axios from 'axios';
import styles from '@screens/profile/profile_styles';
import imageadd from '@assets/image-add-fill.png';
import logo from '@assets/teapot-logo.png';
import profileBg from '@assets/profilebg.png';
import EventCard from '@screens/homepage/homepage_components/eventcard';
import Event from '@screens/program_page/event';
import ProfileQR from '@screens/profile/profile_qr';
import bear from '@assets/bear.jpg';
import { useIsFocused } from '@react-navigation/native';
import { pickAndUploadProfilePicture } from '@app/utils/imageUpload';


const url = 'http://localhost:4000'


const Profile = () => {
  const [user, setUser] = useState({});
  const [pastEvents, setPastEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const navigation = useNavigation();

  const tempUserId = '696ad149027e7290f0c97e1e'
  const isFocused = useIsFocused();


  useEffect(() => {
    if (isFocused) {
      const fetchAll = async () => {
        const userData = await getUser();
        if (userData) {
          await getPastEvents(userData.attendedEvents || []);
          await getUpcomingEvents(userData.attendingEvents || []);
        }
      };
      fetchAll();
    }
  }, [isFocused]);
  

  useEffect(() => {
    getPastEvents();
    getUpcomingEvents();
    console.log(pastEvents);
    console.log(upcomingEvents);
  }, [user])


  const getUser = async () => {
    try {
      const response = await axios.get(`${url}/api/users/${tempUserId}`);
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.log("Error getting user", error);
      return null;
    }
  };

  const handleProfilePictureUpload = async () => {
    try {
      const result = await pickAndUploadProfilePicture(tempUserId);
      if (result && result.imageUrl) {
        setUser(prev => ({ ...prev, profilePicture: result.imageUrl }));
        Alert.alert('Success', 'Profile picture updated!');
      }
    } catch (error) {
      console.log('Error uploading profile picture:', error);
      Alert.alert('Error', 'Failed to upload profile picture. Make sure Cloudinary is configured.');
    }
  };

  const getPastEvents = async (pastEventIds) => {
    const tempEvents = [];
  
    for (const id of pastEventIds) {
      try {
        const response = await axios.get(`${url}/api/events/${id}`);
        tempEvents.push(response.data);
      } catch (error) {
        console.log("Error getting past event", error);
      }
    }
  
    setPastEvents(tempEvents);
  };
  
  const getUpcomingEvents = async (upcomingEventIds) => {
    const tempEvents = [];
  
    for (const id of upcomingEventIds) {
      try {
        const response = await axios.get(`${url}/api/events/${id}`);
        tempEvents.push(response.data);
      } catch (error) {
        console.log("Error getting upcoming event", error);
      }
    }
  
    setUpcomingEvents(tempEvents);
  };
  

  return (
    <ScrollView style={styles.foregroundContainer}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.bgWrapper}>
        <Pressable onPress={handleProfilePictureUpload}>
          <Image
              source={user.profilePicture ? { uri: user.profilePicture } : imageadd}
              style={styles.image}
          />
          <Text style={{ textAlign: 'center', color: '#666', fontSize: 12, marginTop: 4 }}>
            Tap to change
          </Text>
        </Pressable>
        <Text style={styles.name}>{user.name} </Text>
        <Text style={styles.handle}>@{user.username} </Text>
        <Text style={styles.bio}>{user.bio} </Text>
        <View style={styles.buttonContainer}>
          <Pressable 
            style={styles.button} 
            onPress={() => navigation.navigate('EditProfile')}
            >
            <Text style={{ color: "#403C3C80" }}>Edit Profile</Text>
          </Pressable>
        </View>
        <View style={styles.qr}>
          <ProfileQR/>
          <Text style={{ color: "#403C3C80" }}>User Entry ID</Text>
        </View>
        <View style ={styles.row}>
          <View style={styles.data}>
            <Text style = {styles.subtitle}>
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' })
                : '--/--'}
            </Text>
            <Text style = {styles.subsubtitle}>Member Since</Text>
          </View>
          <View style={styles.data}>
            <Text style = {styles.subtitle}>{pastEvents.length}</Text>
            <Text style = {styles.subsubtitle}>Events Attended</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>Event History</Text>
        <Text style={styles.subsubtitle}>What Events Have You Been To?</Text>
        {pastEvents.length > 0 ? (
        <View style={styles.events_container}>
          {pastEvents?.map((event, index) => (
            <Event {...event} key={index}  />
          ))}
          <View style ={styles.endText}>
            <Image source={logo} style = {styles.logo} />
            <Text style={styles.subText}>That's everything for now.</Text>
            <Text style={styles.subText}>Go to more events for more to discover!</Text>
          </View>
        </View>
        ) : (
          <Text style={styles.subtitle}>No past events found.</Text>
        )}

      </View>
    </ScrollView>
  );
};

export default Profile;