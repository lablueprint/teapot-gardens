import { Button, StyleSheet, Text, View, TextInput, Switch, Alert } from "react-native";
import React, { useState } from "react";

pastEventData = [{
    name: "Chinese Drama", 
    date: "Nov 11, 2024",
    hours: 1,
    location: "Hedrick",
    theme: "Family"
}]

userBadges = [{
    name: "Fish",
    description: "bought a fish"
}]

const Profile = ({name, bio}) => {
  // Define state for each input field
  const [isPrivate, setIsPrivate] = useState(false); 
  const toggleSwitch = () => setIsPrivate(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Text>Profile Page</Text>
      <Text> Name: {name} </Text>
      <Text> Bio: {bio} </Text>
      <Text> My badges </Text>
      {userBadges.map((badge, index) => (
        <View key={badge} style={styles.eventContainer}>
          <Text style={styles.eventText}>{badge.name}</Text>
          <Text style={styles.eventText}>Description: {badge.description}</Text>
        </View>
      ))}
      <Text> History of past events </Text>
      {pastEventData.map((event, index) => (
        <View key={index} style={styles.eventContainer}>
          <Text style={styles.eventText}>Name: {event.name}</Text>
          <Text style={styles.eventText}>Date: {event.date}</Text>
          <Text style={styles.eventText}>Duration: {event.hours} hour(s)</Text>
          <Text style={styles.eventText}>Location: {event.location}</Text>
          <Text style={styles.eventText}>Theme: {event.theme}</Text>
        </View>
      ))}

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

      <Button onPress={() => Alert.alert('form submitted :)')} title = "submit" color = "pink"/>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
