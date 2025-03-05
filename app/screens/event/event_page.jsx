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

  const route = useRoute();
  const eventData = route.params?.eventData;

  // parse through event data and turn it into an object whenever eventData changes
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

  // fetching user data, right nows it temporary for only one user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Replace with your actual user ID -> need to replace this with the actual user of the device -> right now its routed to me Daniel 
        const userId = "67c79ae4cd23b5ed175ac11f";
        const response = await axios.get(`http://localhost:4000/api/users/${userId}`);
        if (response.status === 200) {
          setUser(response.data);
          setAttendingEvents(response.data.attendingEvents || []);
        } else {
          console.error("Failed to fetch user: ", response.data.error);
        }
      } catch (error) {
        console.error("Error fetching user: ", error.message);
      }
    };
    fetchUser();
  }, []);

  // basically this function is called whenever a user decides to register for an event or unregister for an event -> so we need to fetch this new event data
  const fetchEventData = async (eventId) => {
    if (!eventId) return;
    try {
      const response = await axios.get(`http://localhost:4000/api/events/${eventId}`);
      setEvent(response.data);
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  // whenever the event object changes -> the attenddees for that event need to be fetched again
  useEffect(() => {
    if (!event) {
      setAttendeeNames([]);
      setAttendeeCount(null);
      setNewAttendeeCount(null);
      return;
    }

    const fetchAttendeeNames = async () => {
      try {
        if (!event.attendeeList || event.attendeeList.length === 0) {
          setAttendeeNames([]);
          return;
        }
        const responses = await Promise.all(
          event.attendeeList.map((id) => axios.get(`http://localhost:4000/api/users/${id}`))
        );
        const names = responses.map((res) => res.data.name);
        setAttendeeNames(names);
      } catch (error) {
        console.error("Error fetching attendee names:", error);
      }
    };

    const getAttendeeCount = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/events/attendees/${event._id}`);
        setAttendeeCount(response.data.length);
      } catch (error) {
        console.error("Error fetching attendee count:", error);
      }
    };

    const getNewAttendeeCount = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/events/attendees/${event._id}`);
        const attendeeIds = response.data;
        const userRequests = attendeeIds.map((id) => axios.get(`http://localhost:4000/api/users/${id}`));
        const users = await Promise.all(userRequests);
        const brandNewAttendees = users.filter((u) => u.data.attendedEvents?.length === 0);
        setNewAttendeeCount(brandNewAttendees.length);
      } catch (error) {
        console.error("Error fetching new attendees:", error);
      }
    };

    fetchAttendeeNames();
    getAttendeeCount();
    getNewAttendeeCount();
  }, [event]);

  // Refresh user data after changes (adding event to user)
  const refreshUserData = async () => {
    if (!user?._id) return;
    try {
      const response = await axios.get(`http://localhost:4000/api/users/${user._id}`);
      setUser(response.data);
      setAttendingEvents(response.data.attendingEvents || []);
    } catch (error) {
      console.error("Error refreshing user data:", error);
    }
  };

  // Add event to user attending list + add user to event's attendee list
  const addUserEvent = async () => {
    if (!event?._id) return;
    if (attendingEvents.includes(event._id)) {
      Alert.alert("You are already registered for this event.");
      return;
    }
    try {
      // Update the user
      await axios.patch(`http://localhost:4000/api/users/${user._id}`, {
        $push: { attendingEvents: event._id },
      });

      // Update the event
      await axios.patch(`http://localhost:4000/api/events/${event._id}`, {
        $push: { attendeeList: user._id },
      });

      // Refresh data
      await refreshUserData();
      await fetchEventData(event._id);

      setShowDynamicButtons(true); // go back to the main button state
    } catch (error) {
      console.error("Error registering for the event:", error);
      Alert.alert("Error registering. Please try again.");
    }
  };

  // Remove event from user attending list + remove user from event's attendee list
  const deleteUserEvent = async () => {
    if (!event?._id) return;
    try {
      // Update the user
      await axios.patch(`http://localhost:4000/api/users/${user._id}`, {
        $pull: { attendingEvents: event._id },
      });

      // Update the event
      await axios.patch(`http://localhost:4000/api/events/${event._id}`, {
        $pull: { attendeeList: user._id },
      });

      // Refresh data
      await refreshUserData();
      await fetchEventData(event._id);
    } catch (error) {
      console.error("Error cancelling registration:", error);
      Alert.alert("Error cancelling registration. Please try again.");
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

      {showDynamicButtons ? (
        <View style={{ padding: 24 }}>
          {!attendingEvents.includes(event?._id) ? (
            <Pressable style={styles.shareButton} onPress={() => setShowDynamicButtons(false)}>
              <Text style={styles.shareButtonText}>Register</Text>
            </Pressable>
          ) : (
            <Pressable style={styles.shareButton} onPress={deleteUserEvent}>
              <Text style={styles.shareButtonText}>Cancel Registration</Text>
            </Pressable>
          )}
        </View>
      ) : (
        <Pressable style={styles.shareButton} onPress={addUserEvent}>
          <Text style={styles.shareButtonText}>Confirm Registration</Text>
        </Pressable>
      )}
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
  // etc...
});

export default EventPage;
