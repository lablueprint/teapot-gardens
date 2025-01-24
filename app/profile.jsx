import { Button, StyleSheet, Text, View, FlatList, Switch, Alert, Image } from "react-native";
import React, { useState, useEffect } from "react";
import axios from 'axios';

pastEventData = [{
    name: "Chinese Drama", 
    date: "Nov 11, 2024",
    hours: 1,
    location: "Hedrick",
    theme: "Family"
  }, 
  {
    name: "Kimchi Garden", 
    date: "Nov 25, 2024", 
    hours: 2, 
    location: "E6", 
    theme: "culture"
  }, 
  {
    name: "Teapot", 
    date: "Nov 15, 2024", 
    hours: 2, 
    location: "Young", 
    theme: "drinks"
  }, 
]

activeEventData = [{
  name: "Chinese Drama", 
  date: "Nov 11, 2024",
  hours: 1,
  location: "Hedrick",
  theme: "Family"
}, 
{
  name: "Kimchi Garden", 
  date: "Nov 25, 2024", 
  hours: 2, 
  location: "E6", 
  theme: "culture"
}, 
{
  name: "Teapot", 
  date: "Nov 15, 2024", 
  hours: 2, 
  location: "Young", 
  theme: "drinks"
}, 
]

userBadges = [{
    name: "Fish",
    description: "bought a fish"
}]

const Profile = () => {
  // Define state for each input field
  const [isPrivate, setIsPrivate] = useState(false); 
  const [user, setUser] = useState({});
  const toggleSwitch = () => setIsPrivate(previousState => !previousState);

  const tempUserId = '6789f49f8e0a009647312c7a'

  useEffect(() => {
    getUser();
    console.log(user);
  }, [user])

  const getUser = async () => {
    try {
      const response = await axios.get(`https://2356-2603-8001-d3f0-da0-cd86-8774-73ab-3673.ngrok-free.app/api/users/${tempUserId}`)
      setUser(response.data)
    }
    catch (error) {
      console.log("Error getting user", error)
    }
    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Page</Text>
      <Image 
          source={require('../assets/grapes.jpg')} // Replace with your image path
          style={styles.image}
      />
      <Text style={styles.name}>Name: {user.name} </Text>
      <Text style={styles.handle}>@victoria </Text>
      <Text style={styles.info}>Bio: I like grapes </Text>
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
        data={activeEventData}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={true}
        renderItem={({ item }) => (
          <View style={styles.eventContainer}>
            <Text style={styles.eventText}>Name: {item.name}</Text>
            <Text style={styles.eventText}>Date: {item.date}</Text>
            <Text style={styles.eventText}>Duration: {item.hours} hour(s)</Text>
            <Text style={styles.eventText}>Location: {item.location}</Text>
            <Text style={styles.eventText}>Theme: {item.theme}</Text>
          </View>
        )}
      />

      <Text style={styles.subtitle}>My History</Text>
      <FlatList
        data={pastEventData}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={true}
        renderItem={({ item }) => (
          <View style={styles.eventContainer}>
            <Text style={styles.eventText}>Name: {item.name}</Text>
            <Text style={styles.eventText}>Date: {item.date}</Text>
            <Text style={styles.eventText}>Duration: {item.hours} hour(s)</Text>
            <Text style={styles.eventText}>Location: {item.location}</Text>
            <Text style={styles.eventText}>Theme: {item.theme}</Text>
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
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  name: {
    textAlign: "center",
    fontSize: 20,
    textDecorationLine: "underline",
    marginBottom: 10,
  },
  handle: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 10,
  },
  bio: {
    textAlign: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
    backgroundColor: "#90EE90",
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  eventContainer: {
    borderColor: "gray", 
    borderWidth: 1, 
    padding: 10, 
    marginVertical: 10,
    marginRight: 10,
    borderRadius: 10,
  }, 
  badgeContainer: {
    borderColor: "gray", 
    borderWidth: 1, 
    padding: 10, 
    borderRadius: 10,
    marginBottom: 30,
  }, 
  privacy: {
    display: "flex"
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50, 
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
});
