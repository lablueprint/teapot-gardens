import React, { useState, useEffect } from "react";
import { Text, ScrollView, View, Pressable, StyleSheet, Alert, Modal, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import Collapsible from "react-native-collapsible";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from 'expo-router';
import Paradise from "@assets/paradise.png";
import dateIcon from "@assets/date-icon.png";
import locationIcon from "@assets/location-icon.png";
import volunteer from "@assets/volunteer.png";
import attendee from "@assets/attendee.png";


import UserCard from "@screens/event/user_card.jsx";
import ProgramCard from "@screens/event/program_card.jsx";

import garden from "@assets/garden.jpg"; // TODO: need to retrieve the program's pfp (same with host and attendees)

const url = "https://d7a2-2607-f010-2a7-1021-2d5f-b6e6-2282-35c9.ngrok-free.app";

const EventPage = () => {
  const navigation = useNavigation();

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [user, setUser] = useState(null);
  const [attendingEvents, setAttendingEvents] = useState([]);
  const [event, setEvent] = useState(null);
  const [attendeeNames, setAttendeeNames] = useState([]);
  const [attendeeCount, setAttendeeCount] = useState(null);
  const [newAttendeeCount, setNewAttendeeCount] = useState(null);
  // const [showDynamicButtons, setShowDynamicButtons] = useState(true); //change based on if user is registered or not
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

  // this function is called whenever a user decides to register for an event or unregister for an event -> need to fetch this new event data
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

    setModalVisible(false); // go back to the main button state

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
        <DynamicButtons attending={attending}/>
        <RegisterModal />
      </View>
    );
  };

  const DynamicButtons = ({ attending }) => {
    let content
    if (!attending) {
      content = 
      <Pressable style={styles.shareButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.shareButtonText}>Register</Text>
      </Pressable>
    } else {
      content = (
        <View>
          <Pressable style={styles.shareButton} onPress={deleteUserEvent}>
            <Text style={styles.shareButtonText}>Cancel Registration</Text>
          </Pressable>
        </View>
      )
    }
    return <View style={{ padding: 24 }}>{content}</View>
  }

  const VolunteerButton = ({ roleStatus, setRoleStatus }) => {
    // const buttonStyle = roleStatus === "v" ? styles.buttonDark : styles.roleButtons;
    return (
      <Pressable
        onPress={() => setRoleStatus("v") }
        style={roleStatus === "v" ? styles.buttonDark : styles.roleButtons}
      >
        <View style={{ marginRight: 0, flex: 1, padding: 10, paddingRight: 0 }}>
          <Text style={{ textAlign: 'left', color: 'white', fontSize: '30' }}>Volunteer</Text>
          <Text style={{ textAlign: 'left', color: 'white', fontSize: '15' }}>make an impact as a volunteer!</Text>
        </View>
        <Image style={styles.volunteer} source={volunteer}/>
      </Pressable>

    )
  }

  const AttendeeButton = ({ roleStatus, setRoleStatus }) => {
    // const buttonStyle = roleStatus === "a" ? styles.buttonDark : styles.roleButtons;
    return (
      <Pressable
        onPress={() => setRoleStatus("a") }
        style={ roleStatus === "a" ? styles.buttonDark : styles.roleButtons}
      >
        <Image style={styles.volunteer} source={attendee}/>
        <View style={{ marginLeft: 0, flex: 1, padding: 10, paddingLeft: 0 }}>
          <Text style={{ textAlign: 'right', color: 'white', fontSize: '30' }}>Attendee</Text>
          <Text style={{ textAlign: 'right', color: 'white', fontSize: '15' }}>enjoy the event and grow your plant!</Text>
        </View>

      </Pressable>
    )
  }

  const RegisterButton = ({ roleStatus, setRoleStatus }) => {
    let buttonText = "Register";
    let onPressHandler = () => {};
  
    if (roleStatus === "v") {
      buttonText = "Register as a volunteer!";
      onPressHandler = () => {
        setModalVisible(false);
        // setShowDynamicButtons(true);
        setRoleStatus("");
      };
    } else if (roleStatus === "a") {
      buttonText = "Register as an attendee!";
      onPressHandler = () => {
        setModalVisible(false);
        addUserEvent();
        setRoleStatus("");
      };
    }
    const buttonStyle = roleStatus === "v" || roleStatus == "a" ? styles.unclickableRegisterButton : styles.clickableRegisterButton;
  
    return (
      <Pressable style={buttonStyle} onPress={onPressHandler}>
        <Text style={{ color: 'white', fontSize: 15 }}>{buttonText}</Text>
      </Pressable>
    );
  };

  const RegisterModal = () => {
    const [roleStatus, setRoleStatus] = useState("");

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
            <Text style={{marginTop: 40, color: "white", fontSize: 30,}}>Join the event as a...</Text>

            <VolunteerButton roleStatus={roleStatus} setRoleStatus={setRoleStatus} />
            <AttendeeButton roleStatus={roleStatus} setRoleStatus={setRoleStatus} />
            <RegisterButton roleStatus={roleStatus} setRoleStatus={setRoleStatus} />

            <Pressable style={styles.xButton} onPress={() => {setModalVisible(false); setRoleStatus("") }}>
            <Text style={styles.shareButtonText}>X</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    )
  }

  return (
    <ScrollView 
      contentContainerStyle={{ flexGrow: 1 }} 
    >
      <View style={{ flex: 1 }}>
        <Image style={{ width: '100%', height: '500', resizeMode: "cover" }} source={Paradise} />
      </View>
      
      <View style={{borderRadius: 10}}>
      <View style={styles.container}>
        <ProgramCard name={user?.name} profilePicture={garden} style={styles.hostCard} />
        <Text style={styles.eventHeader}>{event?.name}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Image style={styles.dateIcon} source={dateIcon}/>
          <Text style={styles.dateText}>{event?.date}, {event?.time}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Image style={styles.locationIcon} source={locationIcon}/>
          <Text style={styles.dateText}>{event?.location}</Text>
        </View>
        <Text style={styles.subtext}>ABOUT EVENT</Text>
        <Text style={styles.description}>{event?.eventDescription}</Text>
        <View style={{margin: 10}}></View>

        <Text style={styles.subtext}>HOSTED BY</Text>
        <Text style={styles.description}>{event?.hostDescription}</Text>
        <View style={{margin: 10}}></View>

        <Text style={styles.subtext}>ATTENDEES</Text>
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
  
        <Buttons attending={attendingEvents.includes(event?._id)} />
  
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
      <View style={{ height: 50 }} />
      </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({ 
  container: {
    paddingVertical: 16,
    paddingHorizontal: 30,
    backgroundColor: "#E9E5DA",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: "hidden",
    marginTop: -30,
  },
  eventHeader: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtext: {
    color: "#8B8B8B",
    fontSize: 12,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
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
    borderRadius: 20,
    backgroundColor: "#9D4C6A"
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
  buttonDark: {
    flexDirection: 'row',
    height: '124',
    margin: 10,
    padding: 12,
    width: '80%',
    backgroundColor: "#rgba(30, 30, 30, 0.25)",
    color: "white",
    borderRadius: 20,
    padding: 0,
  },
  roleButtons: {
    flexDirection: 'row',
    height: '124',
    margin: 10,
    padding: 12,
    width: '80%',
    backgroundColor: "#rgba(194, 194, 194, 0.25)",
    color: "white",
    borderRadius: 20,
    padding: 0,
  },
  volunteer: {
    // borderColor: 'red',
    // borderStyle: 'solid',
    // borderWidth: '1',
    height: '124',
    // resizeMode: 'contain',
    borderRadius: '15%',
  },
  unclickableRegisterButton: {
    alignItems: 'center',
    height: '10%',
    margin: 10,
    padding: 12,
    width: '80%',
    backgroundColor: "#rgba(157, 76, 106, 1)",
    borderRadius: 20,
  },
  clickableRegisterButton: {
    alignItems: 'center',
    height: '10%',
    margin: 10,
    padding: 12,
    width: '80%',
    backgroundColor: "#rgba(157, 76, 106, 0.25)",
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
    height: '510',
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
  dateIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  locationIcon: {
    width: 18,
    height: 22,
    marginRight: 8,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#7D7D7D'
  },
});

export default EventPage;



