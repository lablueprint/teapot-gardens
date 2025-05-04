import { StyleSheet, Text, View, FlatList, Switch, Image, ScrollView, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from 'expo-router';
import axios from 'axios';
import styles from '@screens/profile/profile_styles';
import grapes from '@assets/grapes.jpg';
import { LinearGradient } from "expo-linear-gradient";
import bush from '@assets/bush.png'; 
import EventCard from '@screens/homepage/homepage_components/eventcard';
import ProfileQR from '@screens/profile/profile_qr';


const url = 'http://localhost:4000'

userBadges = [{
    name: "Fish",
    description: "bought a fish"
}]

const Profile = () => {
  // Define state for each input field
  const [isPrivate, setIsPrivate] = useState(false); 
  const [user, setUser] = useState({});
  const toggleSwitch = () => setIsPrivate(previousState => !previousState);
  const [pastEvents, setPastEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const navigation = useNavigation();

  const tempUserId = '6789f49f8e0a009647312c7a'

  useEffect(() => {
    const fetchAll = async () => {
      const userData = await getUser();
      if (userData) {
        await getPastEvents(userData.attendedEvents || []);
        await getUpcomingEvents(userData.attendingEvents || []);
      }
    };
  
    fetchAll();
  }, []);
  

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
    <View style={{ flex: 1, position: 'relative' }}>
      <Image
        source={bush}
        style={styles.bushBackground}
        resizeMode="stretch" // or "cover" if you prefer
      />
      <ScrollView style={styles.main_container} contentContainerStyle={{ flexGrow: 1 }} scrollIndicatorInsets={{ right: 1 }}>
        <View>
          <LinearGradient
                colors={['#EAEBE4', '#E8E1DD']}
                style={styles.container}
          >
            <Text style={styles.handle}>@{user.username} </Text>
            <Image 
                source={grapes} 
                style={styles.image}
            />
            <Text style={styles.name}>{user.name} </Text>
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
                  image={event.image}
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
            <View style={{ marginTop: 40 }}>
              <Image
                source={bush}
                style={styles.bushImage}
                resizeMode="stretch"
              />
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
      </View>
  );
};

export default Profile;