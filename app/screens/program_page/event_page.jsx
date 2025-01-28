import React, { useState, useEffect} from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import UserCard from './user_card.jsx';
import Collapsible from 'react-native-collapsible';
import AntDesign from '@expo/vector-icons/AntDesign';
import garden from '@assets/garden.jpg';
import grapes from '@assets/grapes.jpg';
import AdminDashboard from '@screens/admin_dashboard/admin_dashboard.jsx';
import { useLocalSearchParams, useGlobalSearchParams } from "expo-router";

const EventPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setIsCollapsed((prevState) => !prevState);
  };
  const attendees = [
    { 
      "name": "Victoria", 
      "profilePicture": grapes 
    },
    { 
      "name": "Angela", 
      "profilePicture": grapes
    }
  ]
  
  const { title, date, location, time, details} = useLocalSearchParams();
  
  return (
    <View style={styles.container}>
      {/* Event Header */}
      <Text style={styles.eventHeader}>{title}</Text>

      {/* Event Subtext */}
      <Text style={styles.subtext}>Event Location: {location}</Text>
      <Text style={styles.subtext}>Date: {date}</Text>
      <Text style={styles.subtext}>Time: {time}</Text>
      <Text style={styles.details}>Details: {details}</Text>

      {/* Host Information */}
      <Text style={styles.sectionHeader}>Host:</Text>
      <UserCard name="Bob" profilePicture={garden} style={styles.hostCard} />

      {/* Attendees Section */}
      <View>
        <Pressable onPress={toggleCollapsed} style={styles.attendeesButton}>
          <Text style={styles.attendeesButtonText}>Attendees</Text>
          <AntDesign
            color='black'
            name={isCollapsed ? "down": "up"}
            size={13}
            style={{ paddingTop: 2 }}
          />
        </Pressable>
        <Collapsible collapsed={isCollapsed}>
          {attendees?.map((attendees, index) => (
            <UserCard
              key={index}
              name={attendees.name}
              profilePicture={attendees.profilePicture}
              style={styles.attendeeCard}
            />
          ))}
        </Collapsible>
      </View>

      {/* Share Button */}
      <Pressable style={styles.shareButton}>
        <Text style={styles.shareButtonText}>Share</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  eventHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtext: {
    fontSize: 16,
    marginBottom: 4,
  },
  details: {
    fontSize: 16,
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
  attendeesButton: {
    padding: 8,
    backgroundColor: "lightgray",
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  attendeesButtonText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  attendeeCard: {
    marginBottom: 4,
    fontSize: 10,  
  },
  shareButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "gray",
    borderRadius: 8,
  },
  shareButtonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});

export default EventPage;