import React, { useState, useEffect } from "react";
import { Text, ScrollView, View, Pressable, StyleSheet, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import Collapsible from "react-native-collapsible";
import AntDesign from "@expo/vector-icons/AntDesign";

import UserCard from "@screens/program_page/user_card.jsx";
import garden from "@assets/garden.jpg";

const EventPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [user, setUser] = useState(null);
  const [attendingEvents, setAttendingEvents] = useState([]);
  const [event, setEvent] = useState(null);
  const [attendeeNames, setAttendeeNames] = useState([]);
  const [attendeeCount, setAttendeeCount] = useState(null);
  const [newAttendeeCount, setNewAttendeeCount] = useState(null);
  const [showDynamicButtons, setShowDynamicButtons] = useState(true);

  // This holds the stats from the backend { userStatsList: [...] }
  const [stats, setStats] = useState({ userStatsList: [] }); // Ensure stats is never null

  const route = useRoute();
  const eventData = route.params?.eventData;

  // Parse eventData into an object
  useEffect(() => {
    if (eventData) {
      try {
        const parsed = JSON.parse(eventData);
        setEvent(parsed);
      } catch (err) {
        console.error("Error parsing eventData:", err);
        setEvent(null);
      }
    } else {
      setEvent(null);
    }
  }, [eventData]);

  // Fetch user data (temp)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = "67c7a4dacd23b5ed175ac120"; // Admin user ID
        const response = await axios.get(`http://localhost:4000/api/users/${userId}`);
        if (response.status === 200) {
          console.log("Fetched user:", response.data);
          setUser(response.data);
          setAttendingEvents(response.data.attendingEvents || []);
        } else {
          console.error("Failed to fetch user:", response.data.error);
        }
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };
    fetchUser();
  }, []);

  // If admin and event ID exist, fetch stats
  useEffect(() => {
    if (user?.admin && event?._id) {
      console.log("Calling fetchAttendeeStats with eventId:", event._id);
      fetchAttendeeStats();
    } else {
      console.log("Skipped fetchAttendeeStats => admin:", user?.admin, "eventId:", event?._id);
    }
  }, [user, event]);

  const fetchAttendeeStats = async () => {
    if (!event?._id) return;
    try {
      const response = await axios.get(
        `http://localhost:4000/api/events/${event._id}/attendee-stats`
      );
      console.log("Stats from server:", response.data);

      // Ensure stats is always an object with userStatsList
      setStats(response.data || { userStatsList: [] });
    } catch (error) {
      console.error("Error fetching stats:", error);
      setStats({ userStatsList: [] }); // Set empty array on error
    }
  };

  return (
    <ScrollView style={styles.container}>
      <UserCard name={user?.name} profilePicture={garden} style={styles.hostCard} />
      <Text style={styles.eventHeader}>{event?.name}</Text>
      <Text style={styles.subtext}>
        {event?.date}, {event?.time}
      </Text>
      <Text style={styles.subtext}>Location</Text>
      <Text>{event?.location}</Text>

      <Text style={styles.subtext}>Attendees</Text>
      {attendeeCount !== null ? (
        <>
          {newAttendeeCount !== null && newAttendeeCount > 0 && (
            <Text>{newAttendeeCount}+ new attendees!</Text>
          )}
          <Text>{attendeeCount} total attendees</Text>
        </>
      ) : (
        <Text>No attendees yet!</Text>
      )}

      {/* Attendee list with collapsible section */}
      <View style={styles.attendeesList}>
        <Pressable onPress={() => setIsCollapsed(!isCollapsed)} style={styles.attendeesButton}>
          <Text style={styles.attendeesButtonText}>Attendees</Text>
          <AntDesign name={isCollapsed ? "down" : "up"} size={13} />
        </Pressable>
        <Collapsible collapsed={isCollapsed}>
          {attendeeNames.length > 0 ? (
            attendeeNames.map((name, index) => <UserCard key={index} name={name} />)
          ) : (
            <Text>No attendees yet</Text>
          )}
        </Collapsible>
      </View>

      {/* ADMIN PANEL */}
      <View style={styles.adminSection}>
        <Text style={styles.adminText}>Admin Panel</Text>
        {stats?.userStatsList?.length > 0 ? (
          stats.userStatsList.map((usr, i) => (
            <Text key={i}>
              Income: {usr.incomeLevel}, Gender: {usr.genderIdentification}, Race: {usr.race}
            </Text>
          ))
        ) : (
          <Text>No attendee stats available</Text>
        )}
      </View>
    </ScrollView>
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
  attendeesButton: {
    padding: 8,
    backgroundColor: "lightgray",
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "center",
  },
  attendeesButtonText: {
    marginRight: 5,
  },
  shareButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "gray",
    borderRadius: 20,
  },
  shareButtonText: {
    textAlign: "center",
    color: "white",
  },
  adminSection: {
    marginTop: 24,
  },
  adminText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
});

export default EventPage;
