import React, { useState, useEffect } from "react";
import { Text, ScrollView, View, Pressable, StyleSheet, Alert, Modal, Image, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import Collapsible from "react-native-collapsible";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from 'expo-router';
import RegisterModal from './register_modal.jsx'
import Paradise from "@assets/paradise.png";
import dateIcon from "@assets/date-icon.png";
import locationIcon from "@assets/location-icon.png";
import Ionicons from "react-native-vector-icons/Ionicons";

// Custom components & assets
import AdminDashboard from "@screens/admin_dashboard/admin_dashboard.jsx";
import UserCard from "@screens/event/user_card.jsx";
import ProgramCard from "@screens/event/program_card.jsx";
import AnalyticsChart from "@screens/event/event-components/AnalyticsChart.jsx";
import AttendeePopup from "@screens/event/attendeePopup.jsx";

import garden from "@assets/garden.jpg"; // TODO: need to retrieve the program's pfp (same with host and attendees)
import sprout from "@assets/sprout.png";

// const url = " https://272a-75-142-52-157.ngrok-free.app";
const tempUserId = "68199b9f06fa2e1c7bd3796b";
const url = "https://5253-2607-f010-2a7-1021-9515-5e07-f324-7904.ngrok-free.app";

import community1 from '@assets/community1.png';
import community2 from '@assets/community2.png';

const mediaItems = [
  {
    id: '1',
    name: "Japanese Garden",
    image: community1,
    type: 'photo',
  },
  {
    id: '2',
    name: "garden 2",
    image: community2,
    type: 'video',
  },
  {
    id: '3',
    name: "garden 3",
    image: community1,
    type: 'photo',
  },
  {
    id: '4',
    name: "garden 4",
    image: community2,
    type: 'photo',
}
];


const EventPage = () => {
  const navigation = useNavigation();

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [user, setUser] = useState(null);
  const [attendingEvents, setAttendingEvents] = useState([]);
  const [attendedEvents, setAttendedEvents] = useState([]);
  const [event, setEvent] = useState(null);
  const [attendeeNames, setAttendeeNames] = useState([]);
  const [attendeeCount, setAttendeeCount] = useState(null);
  const [newAttendeeCount, setNewAttendeeCount] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(true);
  // const [showDynamicButtons, setShowDynamicButtons] = useState(true); //change based on if user is registered or not
  const [modalVisible, setModalVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [stats, setStats] = useState({ userStatsList: [] }); // { userStatsList: [...] }

  const route = useRoute();
  const eventData = route.params?.eventData;
  console.log('event page evetndata', eventData);

  const photoCount = mediaItems.filter(item => item.type === 'photo').length;
  const videoCount = mediaItems.filter(item => item.type === 'video').length;

  const [activeTab, setActiveTab] = useState('Gender');


  // Parse eventData (passed via route params) back into an object
  useEffect(() => {
    if (eventData) {
      try {
        const parsed = JSON.parse(eventData);
        setEvent(parsed);
        console.log("eventData", eventData);
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
        // ------- CHANGE THE USER ID HERE --------- -> RIGHT NOW THE ID FOR AN ADMIN USER
        const userId = "68199b9f06fa2e1c7bd3796b"; // Admin user ID
        const response = await axios.get(`${url}/api/users/${userId}`);
        if (response.status === 200) {
          console.log("Fetched user:", response.data);
          console.log('attendingEvents', response.data.attendingEvents);
          console.log('attendedEvents', response.data.attendedEvents);

          setUser(response.data);
          setAttendingEvents(response.data.attendingEvents || []);
          setAttendedEvents(response.data.attendedEvents || []);
        } else {
          console.error("Failed to fetch user:", response.data.error);
        }
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };

    const fetchEvent = async (eventId) => {
      if (!eventId) return;
      try {
        const response = await axios.get(`${url}/api/events/${eventId}`);
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

  // get attendee names and their xp count
  const fetchAttendeeNames = async () => {
    try {
      if (!event.attendeeList || event.attendeeList.length === 0) {
        setAttendeeNames([]);
        return;
      }
      const responses = await Promise.all(
        event.attendeeList.map((id) => axios.get(`${url}/api/users/${id}`))
      );
      const attendeeData = responses.map((res) => ({
        name: res.data.name,
        username: res.data.username,
        tamagatchiXP: res.data.tamagatchiXP, 
        attendedEvents: res.data.attendedEvents,
      }));      
      setAttendeeNames(attendeeData);
      console.log("Attendee names:", attendeeData);
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

// const checkEventID = async () => {
//   if ()
// }
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
    return (
      <View>
        <DynamicButtons attending={attending}/>
        <RegisterModal modalVisible={modalVisible} setModalVisible={setModalVisible} addUserEvent={addUserEvent} xp={event?.XP}/>
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

  return (
    <ScrollView 
      contentContainerStyle={{ flexGrow: 1 }} 
    >
      <View style={{ flex: 1 }}>
        <Image style={{ width: '100%', height: '500', resizeMode: "cover" }} source={Paradise} />
      </View>
      

      <View style={{borderRadius: 10}}>
      <View style={styles.container}>
        <Text style={styles.eventHeader}>{event?.name}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Image style={styles.dateIcon} source={dateIcon}/>
          <Text style={styles.dateText}>{event?.date}, {event?.time}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Image style={styles.locationIcon} source={locationIcon}/>
          <Text style={styles.dateText}>{event?.location}</Text>
        </View>

        {user?.admin &&(
          <Pressable style={styles.shareButton} 
            onPress={() => navigation.navigate(
              {name: 'EventAnalytics', 
              params: 
                {eventData: JSON.stringify(event),stats: JSON.stringify(stats), 
                  attendeeNames: JSON.stringify(attendeeNames), attendeeCount: attendeeCount,
                }})}>
            <Text style={styles.shareButtonText}>Event Analytics</Text>
          </Pressable>
          )
        } 

        <Text style={styles.subtext}>ABOUT EVENT</Text>
        <Text style={styles.description}>{event?.eventDescription}</Text>
        <View style={{margin: 10}}></View>

        <Text style={styles.subtext}>HOSTED BY</Text>
        <ProgramCard name={user?.name} profilePicture={garden} style={styles.hostCard} />
        {/* <Text style={styles.description}>{event?.hostDescription}</Text> */}
        <View style={{margin: 10}}></View>

        <Text style={styles.subtext}>ATTENDEES</Text>
        {/* this is for the attendee count */}
        {attendeeCount !== null ? (
          <TouchableOpacity onPress={() => setPopupVisible(true)}>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center', marginVertical:'8'}}>
              <View style={styles.attendeePhotoContainer}>
                {attendeeNames.slice(0, 4).map((attendee, index) => (
                  <Image
                    key={index}
                    source={attendee.photo || garden}
                    style={[styles.attendeePhoto, { marginLeft: index === 0 ? 0 : -15 }]}
                  />
                ))}
                {attendeeCount > 4 && (
                  <View style={styles.attendeeAdditionalCount}>
                    <Text>+{attendeeCount - 4}</Text>
                  </View>
                )}
                {attendeeCount > 2 ? (
                  <View style={{flex: 1, flexShrink: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginLeft: 5}}>
                  {attendeeNames.slice(0, 2).map((attendee, index) => (
                    <Text key={index}>{attendee.name}, </Text>
                  ))}
                  <Text style={{flexShrink: 1, flexWrap: 'wrap'}}>and {attendeeCount-2} others are going!</Text>
                  </View>
                ) : (
                  <View style={{flex: 1, flexShrink: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginLeft: 5}}>
                  {attendeeNames.slice(0, 2).map((attendee, index) => (
                    <Text key={index}>{attendee.name} </Text>
                  ))}
                  <Text style={{flexShrink: 1, flexWrap: 'wrap'}}>is going!</Text>
                  </View>
                )} 
              </View>
            </View>
              {/* this is for new attendee count */}
              {attendeeCount > 0 && newAttendeeCount > 0 && (
                <View style={{flexDirection: 'row', gap:10, alignItems: 'center'}}>
                  <Image source={sprout} style={{ width: 20, height: 20, marginLeft: 8 }} />
                  <Text style={{fontSize: 14}}>{newAttendeeCount}+ new Teapot goers are attending!</Text>
                </View>
              )}
              <AttendeePopup visible={popupVisible} setPopupVisible={setPopupVisible} attendeeInfo={attendeeNames}/>
            </TouchableOpacity>
        ) : (
          <Text>No attendees yet!</Text>
        )}
        <View style={{margin: 10}}></View>


       <Text style={styles.subtext}>VOLUNTEER NOTES</Text>
       <Text style={styles.description}>{event?.volunteerNotes || 'N/A'}</Text>

        
        {console.log('attendingEvents bor', attendingEvents)}
        {!user?.admin ? (
          <Buttons attending={attendingEvents.includes(event?._id)} />
        ) : (
          <View style={{marginBottom: 30}} />
        )}
            
        {/* -------- ADMIN SCREEN SECTION-----     */}
        {user?.admin && (
          <View style={{ marginTop: 10 }}>
            {/* ────────── header ────────── */}
            <Text style={styles.adminHeader}>Event Analytics</Text>
            {/* ────────── tab row ───────── */}
            <View style={styles.tabRow}>
              {['Gender', 'Ethnicity', 'Income'].map(tab => (
                <Pressable
                  key={tab}
                  style={[
                    styles.tab,
                    activeTab === tab && styles.tabActive,
                  ]}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text style={[
                    styles.tabLabel,
                    activeTab === tab && styles.tabLabelActive,
                  ]}>{tab}</Text>
                </Pressable>
              ))}
            </View>

            {/* ────────── chart ─────────── */}
            {stats?.userStatsList?.length
              ? (
                <AnalyticsChart
                  list={stats.userStatsList}
                  field={
                    activeTab === 'Gender'
                    ? 'genderIdentification'
                    : activeTab === 'Ethnicity'
                    ? 'race'
                    : 'incomeLevel'
                  }
                />
              )
              : <Text>No attendee stats available</Text>}
          </View>
        )}


        <View style={styles.photoContainer}>
          <View style={styles.photoHeading}>
            <Text style={{marginBottom: 5}}>COMMUNITY GALLERY</Text>
            <Text>
              {`${photoCount} photos ${videoCount} videos`}
            </Text>
          </View>
          <TouchableOpacity onPress={() =>  navigation.navigate({
                                    name: 'CommunityPhotos',
                                    params: { eventData: JSON.stringify(event), attendedEvents: JSON.stringify(attendedEvents), attendingEvents: JSON.stringify(attendingEvents)}, // converting the event object into a string json to pass it in
                                })}> 
              <Text style={styles.seeAllText}> See All {">"}</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.photoGalleryContainer}>
          {mediaItems.map((item, index) => <Image key={index} source={item.image} style={styles.galleryPhoto}/>)}
        </View>
  
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
  imageContainer: {
    position: "relative",
  },
  hostCard: {
    display: "flex",
    justifyContent: "left",
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
  attendeesList: {
    marginTop: 8,
  },
  attendeePhotoContainer: {
    marginLeft: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  attendeePhoto: { 
    height: 40, 
    width: 40,
    borderRadius: 50,
    borderColor: "#F0EBD4",
    borderWidth: 1,
  },
  attendeeAdditionalCount: {
    marginLeft: -15, 
    height: 40, 
    width: 40, 
    backgroundColor: "#D7D7D7",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
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
    borderRadius: 16,
    backgroundColor: "#9D4C6A", 
    marginBottom: 20,
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
  blurContainer: {
    flex: 1,
    // padding: 20,
    // margin: 16,
    textAlign: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: "100%",
  },
  seeAllText: {
    color: 'gray',
    textDecorationLine: 'underline',
  },
  photoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between", 
    marginTop: 40,
  }, 
  photoGalleryContainer: {
    display: "flex", 
    flexDirection: "row", 
    justifyContent: "space-between", 
    backgroundColor: "#DFD8D0",
    padding: 10,
    marginTop: 10,
  }, 
  galleryPhoto: {
    width: 70, 
    height: 70, 
    borderRadius: 5
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#E6E6E6',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  adminHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  
  tabRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#E6E6E6',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  
  tabActive: {
    backgroundColor: 'white',
    elevation: 2,           // subtle shadow on Android
    shadowColor: '#000',    // – and iOS
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { height: 1, width: 0 },
  },
  
  tabLabel: {
    fontSize: 14,
    color: '#6F6F6F',
  },
  
  tabLabelActive: {
    color: 'black',
    fontWeight: '500',
  },
  
  
});

export default EventPage;



