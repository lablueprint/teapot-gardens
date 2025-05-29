import { StyleSheet, Text, View, FlatList, Switch, Image, ScrollView, Pressable, ImageBackground } from "react-native";
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
    <ScrollView style={styles.foregroundContainer}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.bgWrapper}>
        <Image 
            source={user.profilePicture ? { uri: user.profilePicture } : imageadd} //grape default
            style={styles.image}
        />
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
            <Text style = {styles.subtitle}>01/01</Text>
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

      {/* <Text style={styles.subtitle}>My badges </Text>
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
        /> */}

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
      </View>
    </ScrollView>
  );
};

export default Profile;