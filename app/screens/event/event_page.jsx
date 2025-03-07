import React, { useState, useEffect } from "react";
import { Text, ScrollView, View, Pressable, StyleSheet, Alert, Modal } from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import Collapsible from "react-native-collapsible";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from 'expo-router';


import UserCard from "@screens/program_page/user_card.jsx";
import garden from "@assets/garden.jpg";

const url = "https://fcf2-2607-f010-2a7-1021-146c-10b3-5521-5c7f.ngrok-free.app";

const EventPage = () => {
  const navigation = useNavigation();

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [user, setUser] = useState(null);
  const [attendingEvents, setAttendingEvents] = useState([]);
  const [event, setEvent] = useState(null);
  const [attendeeNames, setAttendeeNames] = useState([]);
  const [attendeeCount, setAttendeeCount] = useState(null);
  const [newAttendeeCount, setNewAttendeeCount] = useState(null);
  const [showDynamicButtons, setShowDynamicButtons] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  // This holds the stats from the backend { userStatsList: [...] }
  const [stats, setStats] = useState({ userStatsList: [] }); // Ensure stats is never null

  const route = useRoute();
  const eventData = route.params?.eventData;

  // Parse eventData string back into an object to access its data
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
        // ------- CHANGE THE USER ID HERE --------- -> RIGHT NOW THE ID FOR AN ADMIN USER
        const userId = "6789f49f8e0a009647312c7a"; // Admin user ID
        const response = await axios.get(`${url}/api/users/${userId}`);
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
        `${url}/api/events/${event._id}/attendee-stats`
      );
      console.log("Stats from server:", response.data);

      // Ensure stats is always an object with userStatsList
      setStats(response.data || { userStatsList: [] });
    } catch (error) {
      console.error("Error fetching stats:", error);
      setStats({ userStatsList: [] }); // Set empty array on error
    }
  };

  // basically this function is called whenever a user decides to register for an event or unregister for an event -> so we need to fetch this new event data
  const fetchEventData = async (eventId) => {
    if (!eventId) return;
    try {
      const response = await axios.get(`${url}/api/events/${eventId}`);
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
        event.attendeeList.map((id) => axios.get(`${url}/api/users/${id}`))
      );
      const names = responses.map((res) => res.data.name);
      setAttendeeNames(names);
    } catch (error) {
      console.error("Error fetching attendee names:", error);
    }
  };

  const getAttendeeCount = async () => {
    try {
      const response = await axios.get(`${url}/api/events/attendees/${event._id}`);
      setAttendeeCount(response.data.length);
    } catch (error) {
      console.error("Error fetching attendee count:", error);
    }
  };

  const getNewAttendeeCount = async () => {
    try {
      const response = await axios.get(`${url}/api/events/attendees/${event._id}`);
      const attendeeIds = response.data;
      const userRequests = attendeeIds.map((id) => axios.get(`${url}/api/users/${id}`));
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
    const response = await axios.get(`${url}/api/users/${user._id}`);
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
    await axios.patch(`${url}/api/users/${user._id}`, {
      $push: { attendingEvents: event._id },
    });

    // Update the event
    await axios.patch(`${url}/api/events/${event._id}`, {
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
  console.log("here");
  if (!event?._id) return;
  try {
    // Update the user
    await axios.patch(`${url}/api/users/${user._id}`, {
      $pull: { attendingEvents: event._id },
    });

    // Update the event
    await axios.patch(`${url}/api/events/${event._id}`, {
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

  //buttons for registration/cancel registration/view ticket
  // const [showDynamicButtons, setShowDynamicButtons] = useState(true);
  const Buttons = ({ attending }) => {
    console.log(modalVisible)
    return (
      <View>
        {showDynamicButtons && <DynamicButtons attending={attending}/>}
        {!showDynamicButtons && <RegisterModal />}
      </View>
    );
  };
  const DynamicButtons = ({ attending }) => {
    let content
    if (!attending) {
      content = 
      <Pressable style={styles.shareButton} onPress={() => {setModalVisible(true); setShowDynamicButtons(false)}}>
      <Text style={styles.shareButtonText}>Register</Text>
      </Pressable>
    } else {
      content = (
        <View>
          <Pressable style={styles.shareButton} onPress={() => {navigation.navigate('RegistrationPage')}}>
          <Text style={styles.shareButtonText}>View Ticket</Text>
          </Pressable>
          <Pressable style={styles.shareButton} onPress={deleteUserEvent}>
          <Text style={styles.shareButtonText}>Cancel Registration</Text>
          </Pressable>
        </View>
      )
    }
    return <View style={{ padding: 24 }}>{content}</View>
  }
  const RegisterModal = () => {
    return (
      <Modal
      animationType="slide"
      visible={modalVisible}
      transparent={true}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{paddingTop: 10}}>Join the event as a...</Text>

            <Pressable style={styles.registerButtons} onPress={() => {setModalVisible(false); addUserEvent()}}>
              <Text style={styles.shareButtonText}>volunteer</Text>
              <Text style={styles.shareButtonText}>make an impact as a volunteer!</Text>
            </Pressable>
            
            <Pressable style={styles.registerButtons} onPress={() => {setModalVisible(false); addUserEvent()}}>
              <Text style={styles.shareButtonText}>attendee</Text>
              <Text style={styles.shareButtonText}>enjoy the event and grow your plant!</Text>
            </Pressable>

            <Pressable style={styles.xButton} onPress={() => {setModalVisible(false); setShowDynamicButtons(true)}}>
            <Text style={styles.shareButtonText}>X</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    )
  }


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

      {/* {showDynamicButtons ? (
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
      )} */}
      <Buttons attending={attendingEvents.includes(event?._id)}/>
      {/* <RegisterPopup/> */}


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
  registerButtons: {
    height: '20%',
    margin: 10,
    padding: 12,
    width: '80%',
    backgroundColor: "gray",
    borderRadius: 20,
  },
  xButton: {
    marginTop: 16,
    padding: 12,
    width: 40,
    backgroundColor: "black",
    borderRadius: 20,
  },
  centeredView: {
    borderColor: 'red',
    borderWidth: '1px',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    borderColor: 'red',
    borderWidth: '1px',
    height: '50%',
    width: '100%',
    backgroundColor: '#6A7D66',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
      bottom: 0,
    }
  },


});

export default EventPage;



