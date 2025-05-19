import { StyleSheet, Text, View, FlatList, Switch, Image, ScrollView, Pressable, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from 'expo-router';
import axios from 'axios';
import styles from '@screens/profile/profile_styles';
import grapes from '@assets/grapes.jpg';
import profileBg from '@assets/profilebg.png'; 
import EventCard from '@screens/homepage/homepage_components/eventcard';
import ProfileQR from '@screens/profile/profile_qr';
import bear from '@assets/bear.jpg';
import * as ImagePicker from 'expo-image-picker';
import { useIsFocused } from '@react-navigation/native';


const url = 'http://localhost:4000'

userBadges = [{
    name: "Fish",
    description: "bought a fish"
}]

async function pickImage() {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.7,
  });

  if (!result.cancelled) {
    console.log(result.uri);
    // Send result.uri to backend
  }
}


const Profile = () => {
  // Define state for each input field
  const [isPrivate, setIsPrivate] = useState(false); 
  const [user, setUser] = useState({});
  const toggleSwitch = () => setIsPrivate(previousState => !previousState);
  const [pastEvents, setPastEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const navigation = useNavigation();

  const tempUserId = '6789f49f8e0a009647312c7a'
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
    <View style={styles.foregroundContainer}>
      <View style={styles.bgWrapper}>
        <Text style={styles.title}>Profile</Text>
        <Image
          source={profileBg}
          style={styles.bgImage}
          resizeMode="cover"
        />
        <ScrollView contentContainerStyle={{ padding: 20 }}>
              <Text style={styles.handle}>@{user.username} </Text>
              <Image 
                  source={user.profilePicture ? { uri: user.profilePicture } : grapes} //grape default
                  style={styles.image}
              />
              <Text style={styles.name}>{user.name} </Text>
              <Text style={styles.handle}>{user.bio} </Text>
              <View style={styles.buttonContainer}>
                <Pressable 
                  style={styles.button} 
                  onPress={() => navigation.navigate('EditProfile')}
                  >
                  <Text style={{ color: "black" }}>Edit Profile</Text>
                </Pressable>
              </View>
              <View style={styles.buttonContainer}>
                <ProfileQR/>
              </View>

              <Text style={styles.subtitle}>Event History</Text>
              {pastEvents.length > 0 ? (
              <View style={styles.events_container}>
                {pastEvents.map((event, index) => (
                  <EventCard
                    key={index}
                    title={event.name}
                    time={event.time}
                    date={event.date}
                    location={event.location}
                    // image={event.image} if we put in images, change this
                    image = {bear}
                  />
                ))}
              </View>
            ) : (
              <Text style={styles.subtitle}>No past events found.</Text>
            )}

            <Text style={styles.subtitle}>My badges </Text>
              <FlatList
                data={userBadges}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                renderItem={({ item }) => (
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>Name: {item.name}</Text>
                    <Text style={styles.badgeText}>@ {item.name}</Text>
                    <Text style={styles.badgeText}>Description: {item.description}</Text>
                  </View>
                )}
              />

              {/* <View style={styles.privacy}>
                <Text> Privacy Settings</Text>
                <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    onValueChange={toggleSwitch}
                    value={isPrivate}
                  />
                  {isPrivate ? (
                  <Text style={styles.message}>Your data is now private.</Text>
                ) : (
                  <Text style={styles.message}>Your data is visible to others.</Text>
                )}
              </View> */}
        </ScrollView>
      </View>
    </View>
  );
};

export default Profile;