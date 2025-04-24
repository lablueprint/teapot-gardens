import React, { useState, useEffect } from "react";
import { 
  Text, 
  ScrollView, 
  View, 
  Pressable, 
  StyleSheet, 
  Image, 
  Alert 
} from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import Collapsible from "react-native-collapsible";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

// Custom components & assets
import AdminDashboard from "@screens/admin_dashboard/admin_dashboard.jsx";
import UserCard from "@screens/program_page/user_card.jsx";
import garden from "@assets/garden.jpg";
// import grapes from "@assets/grapes.jpg"; // Not used, so removed



const EventPage = () => {
  // Temporary placeholders for demonstration
  const tempEventId = "67932a72413f4d68be84e592"; // Example event ID
  const tempUserId = "678f3a6bc0368a4c717413a8"; // Example user ID -> admin true 
  const API_KEY = "https://8074-2607-f010-2a7-1021-6412-8d25-cdd7-edf.ngrok-free.app";       // Example base URL

  // Local state
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [user, setUser] = useState(null);
  const [attendingEvents, setAttendingEvents] = useState([]);
  const [event, setEvent] = useState(null);
  const [attendeeNames, setAttendeeNames] = useState([]);
  const [attendeeCount, setAttendeeCount] = useState(null);
  const [newAttendeeCount, setNewAttendeeCount] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showDynamicButtons, setShowDynamicButtons] = useState(true);
  const [stats, setStats] = useState({ userStatsList: [] }); // { userStatsList: [...] }

  const route = useRoute();
  const eventData = route.params?.eventData;

  // Parse eventData (passed via route params) back into an object
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

  // Fetch user data (and event data) on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_KEY}/api/users/${tempUserId}`);
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

    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${API_KEY}/api/events/${tempEventId}`);
        if (response.status === 200) {
          setEvent(response.data);
          setLikeCount(response.data.likes || 0);
          setLiked(response.data.likedBy.includes(tempUserId)); // Check if user already liked
        } else {
          console.error("Failed to fetch event:", response.data.error);
        }
      } catch (error) {
        console.error("Error fetching event:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    fetchEvent();
  }, []);

  // If admin and event ID exist, fetch stats
  useEffect(() => {
    if (user?.admin && event?._id) {
      console.log("Fetching stats for admin with eventId:", event._id);
      fetchAttendeeStats();
    } else {
      console.log("Skipped fetchAttendeeStats => admin:", user?.admin, "eventId:", event?._id);
    }
  }, [user, event]);

  const fetchAttendeeStats = async () => {
    if (!event?._id) return;
    try {
      const response = await axios.get(
        `https://0bdc-2607-f010-2a7-1021-8533-399e-1831-9f2e.ngrok-free.app/api/events/${event._id}/attendee-stats`
      );
      console.log("Stats from server:", response.data);

      // Ensure stats is always an object with userStatsList
      setStats(response.data || { userStatsList: [] });
    } catch (error) {
      console.error("Error fetching stats:", error);
      setStats({ userStatsList: [] }); // Set empty array on error
    }
  };

  // Refresh user data
  const refreshUserData = async () => {
    if (!user?._id) return;
    try {
      const response = await axios.get(`${API_KEY}/api/users/${user._id}`);
      setUser(response.data);
      setAttendingEvents(response.data.attendingEvents || []);
    } catch (error) {
      console.error("Error refreshing user data:", error);
    }
  };

  // Fetch event data again (e.g., after registration or cancellation)
  const fetchEventData = async (eventId) => {
    if (!eventId) return;
    try {
      const response = await axios.get(`${API_KEY}/api/events/${eventId}`);
      setEvent(response.data);
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  // Whenever event changes, fetch attendee info
  useEffect(() => {
    if (!event?._id) {
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
        const requests = event.attendeeList.map((id) =>
          axios.get(`${API_KEY}/api/users/${id}`)
        );
        const responses = await Promise.all(requests);
        const names = responses.map((res) => res.data.name);
        setAttendeeNames(names);
      } catch (error) {
        console.error("Error fetching attendee names:", error);
      }
    };

    const getAttendeeCount = async () => {
      try {
        // Example: your backend might return the list of attendee IDs
        const response = await axios.get(`${API_KEY}/api/events/attendees/${event._id}`);
        setAttendeeCount(response.data.length);
      } catch (error) {
        console.error("Error fetching attendee count:", error);
      }
    };

    const getNewAttendeeCount = async () => {
      try {
        // Example: your backend might return the list of attendee IDs
        const response = await axios.get(`${API_KEY}/api/events/attendees/${event._id}`);
        const attendeeIds = response.data;
        const userRequests = attendeeIds.map((attendeeId) =>
          axios.get(`${API_KEY}/api/users/${attendeeId}`)
        );
        const users = await Promise.all(userRequests);
        const brandNewAttendees = users.filter(
          (u) => !u.data.attendedEvents || u.data.attendedEvents.length === 0
        );
        setNewAttendeeCount(brandNewAttendees.length);
      } catch (error) {
        console.error("Error fetching new attendees:", error);
      }
    };

    fetchAttendeeNames();
    getAttendeeCount();
    getNewAttendeeCount();
  }, [event]);

  // Like / unlike event
  const handleLikeToggle = async () => {
    try {
      console.log("Toggling like...");
      const response = await axios.patch(`${API_KEY}/api/events/like/${tempEventId}`, {
        userId: tempUserId,
      });

      if (response.status === 200) {
        setLiked(response.data.likedBy.includes(tempUserId));
        setLikeCount(response.data.likes);
      }
    } catch (error) {
      console.error("Error updating like count:", error.response?.data || error.message);
    }
  };

  // Add event to user + add user to event
  const addUserEvent = async () => {
    if (!event?._id) return;
    if (attendingEvents.includes(event._id)) {
      Alert.alert("You're already registered for this event.");
      return;
    }
    try {
      // Add event ID to user's attendingEvents
      await axios.patch(`${API_KEY}/api/users/${user._id}`, {
        $push: { attendingEvents: event._id },
      });
      // Add user ID to event's attendeeList
      await axios.patch(`${API_KEY}/api/events/${event._id}`, {
        $push: { attendeeList: user._id },
      });

      // Refresh data
      await refreshUserData();
      await fetchEventData(event._id);

      setShowDynamicButtons(true);
    } catch (error) {
      console.error("Error registering for event:", error);
      Alert.alert("Error registering. Please try again.");
    }
  };

  // Remove event from user + remove user from event
  const deleteUserEvent = async () => {
    if (!event?._id) return;
    try {
      // Remove event ID from user's attendingEvents
      await axios.patch(`${API_KEY}/api/users/${user._id}`, {
        $pull: { attendingEvents: event._id },
      });
      // Remove user ID from event's attendeeList
      await axios.patch(`${API_KEY}/api/events/${event._id}`, {
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

  // If the data is still loading, you can display a loader or return null
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading event...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Banner image + like button */}
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={garden} />
        <View style={styles.likeContainer}>
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={24}
            color={liked ? "red" : "gray"}
            onPress={handleLikeToggle}
          />
          <Text style={styles.likeCount}>{likeCount}</Text>
        </View>
      </View>

      {/* Host Card example (assuming user is the host; adjust as needed) */}
      <UserCard name={user?.name || "Host"} profilePicture={garden} style={styles.hostCard} />

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

      {/* Collapsible section to list attendee names */}
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

      {/* Registration / Cancel Registration logic */}
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

      {/* ADMIN PANEL */}
      {user?.admin && (
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
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: 340,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  likeContainer: {
    position: "absolute",
    top: 8,
    right: 30,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
    padding: 4,
    borderRadius: 12,
  },
  likeCount: {
    marginLeft: 4,
    fontSize: 16,
    color: "black",
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
  attendeesList: {
    marginTop: 8,
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
