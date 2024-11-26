import { Button, StyleSheet, Text, View, FlatList, Switch, Alert } from "react-native";
import React, { useState } from "react";

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
  const toggleSwitch = () => setIsPrivate(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Page</Text>
      <Text style={styles.info}>Name: Victoria </Text>
      <Text style={styles.info}>Bio: I like gardens </Text>

      <Text style={styles.subtitle}>My badges </Text>
      <FlatList
        data={userBadges}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={true}
        renderItem={({ item }) => (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>Name: {item.name}</Text>
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
  title: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
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
  }
});
