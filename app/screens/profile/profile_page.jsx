import { StyleSheet, Text, View, FlatList, Switch, Image, ScrollView, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { Link } from "expo-router";
import { useNavigation } from 'expo-router';
import axios from 'axios';
import styles from '@screens/profile/profile_styles';
import grapes from '@assets/grapes.jpg';

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
  const API_KEY = 'http://localhost:4000';

  const tempUserId = '6789f49f8e0a009647312c7a';

  useEffect(() => {
    getUser();
    console.log(user);
  }, [])

  useEffect(() => {
    getPastEvents();
    getUpcomingEvents();
    console.log(pastEvents);
    console.log(upcomingEvents);
  }, [user])


  const getUser = async () => {
    try {
      const response = await axios.get(`${API_KEY}/api/users/${tempUserId}`)
      setUser(response.data)
    }
    catch (error) {
      console.log("Error getting user", error)
    }
  }

  const getPastEvents = async () => {
    let tempEvents = [];
    pastEventIds = user.attendedEvents;
    for (const id of pastEventIds) {
      console.log(id);
      try {
        const response = await axios.get(`${API_KEY}/api/events/${id}`)
        tempEvents.push(response.data);
      }
      catch (error) {
        console.log("Error getting past event", error)
      }
    }
    setPastEvents(tempEvents);
  }

  const getUpcomingEvents = async () => {
    let tempEvents = [];
    upcomingEventIds = user.attendingEvents;
    console.log(upcomingEventIds)
    for (const id of upcomingEventIds) {
      console.log(id);
      try {
        const response = await axios.get(`${API_KEY}/api/events/${id}`)
        tempEvents.push(response.data);
      }
      catch (error) {
        console.log("Error getting upcoming event", error)
      }
    }
    setUpcomingEvents(tempEvents);
  }

  return (
    <ScrollView>

      <View style={styles.container}>
        <Text style={styles.title}>Profile Page</Text>
        <Image 
            source={grapes} // Replace with your image path
            style={styles.image}
        />
        <Text style={styles.name}>Name: {user.name} </Text>
        <Text style={styles.handle}>{user.username} </Text>
        <Text style={styles.info}>Bio: I like grapes </Text>

        <View style={styles.buttonContainer}>
          <Pressable 
            style={styles.button} 
            onPress={() => navigation.navigate('EditProfile')}
            >
            <Text style={{ color: "white" }}>Edit Profile</Text>
          </Pressable>
        </View>

        <Text style={styles.subtitle}>My badges </Text>
        <FlatList
          data={userBadges}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={true}
          renderItem={({ item }) => (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>Name: {item.name}</Text>
              <Text style={styles.badgeText}>@ {item.name}</Text>
              <Text style={styles.badgeText}>Description: {item.description}</Text>
            </View>
          )}
        />

        <Text style={styles.subtitle}>Active Event List</Text>
        <FlatList
          data={upcomingEvents}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={true}
          renderItem={({ item }) => (
            <View style={styles.eventContainer}>
              <Text style={styles.eventText}>Name: {item.name}</Text>
              <Text style={styles.eventText}>Date: {item.date}</Text>
              <Text style={styles.eventText}>Duration: {item.hours} hour(s)</Text>
              <Text style={styles.eventText}>Location: {item.location}</Text>
              <Text style={styles.eventText}>Description: {item.eventDescription}</Text>
            </View>
          )}
        />

        <Text style={styles.subtitle}>My History</Text>
        <FlatList
          data={pastEvents}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={true}
          renderItem={({ item }) => (
            <View style={styles.eventContainer}>
              <Text style={styles.eventText}>Name: {item.name}</Text>
              <Text style={styles.eventText}>Date: {item.date}</Text>
              <Text style={styles.eventText}>Duration: {item.hours} hour(s)</Text>
              <Text style={styles.eventText}>Location: {item.location}</Text>
              <Text style={styles.eventText}>Description: {item.eventDescription}</Text>
            </View>
          )}
        />

        <View style={styles.privacy}>
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
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;