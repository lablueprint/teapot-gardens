import AdminDashboard from '@screens/admin_dashboard/admin_dashboard.jsx';
import React, { useState, useEffect} from "react";
import { Text, ScrollView, View, Pressable, StyleSheet, Image, FlatList } from "react-native";
import UserCard from './user_card.jsx';
import Collapsible from 'react-native-collapsible';
import AntDesign from '@expo/vector-icons/AntDesign';
import garden from '@assets/garden.jpg';
import grapes from '@assets/grapes.jpg';
import { useLocalSearchParams } from "expo-router";
import axios from 'axios';


const EventPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [user, setUser] = useState(null); 
  const [event, setEvent] = useState(null);
  const [attendeeIds, setAttendeeIds] = useState(null);
  const [attendeeNames, setAttendeeNames] = useState(null);
  const [attendeeUsernames, setAttendeeUsernames] = useState(null);
  const [attendeeCount, setAttendeeCount] = useState(null);
  const [newAttendeeCount, setNewAttendeeCount] = useState(null);

  const toggleCollapsed = () => {
    setIsCollapsed((prevState) => !prevState);
  };
  // const attendees = [
  //   { 
  //     "name": "Victoria", 
  //     "profilePicture": grapes 
  //   },
  //   { 
  //     "name": "Angela", 
  //     "profilePicture": grapes
  //   }
  // ]
  
  const { title, date, location, time, details} = useLocalSearchParams();

  //update user events

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('https://145c-2607-f010-2a7-1021-65cf-d688-4fd5-ee06.ngrok-free.app/api/users/678f3a6bc0368a4c717413a8');
        if (response.status === 200) {
          setUser(response.data);
        } else {
          console.error('Failed to fetch user: ', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching user: ', error.message);
      } finally {
        setLoading(false);
      } 
    };

    const fetchEventData = async () => {
      try {
        const response = await axios.get(
          "https://145c-2607-f010-2a7-1021-65cf-d688-4fd5-ee06.ngrok-free.app/api/events/678f315b8d423da67c615e95"
        );
    
        if (response.status === 200) {
          const eventData = response.data;
          setEvent(eventData);
          
          if (!eventData.attendeeList || eventData.attendeeList.length === 0) {
            console.log("No attendees found.");
            setLoading(false);
            return;
          }
    
          // Fetch attendee details in parallel
          const attendeeRequests = eventData.attendeeList.map((id) =>
            axios.get(`https://145c-2607-f010-2a7-1021-65cf-d688-4fd5-ee06.ngrok-free.app/api/users/${id}`)
          );
    
          const attendeeResponses = await Promise.allSettled(attendeeRequests);
    
          const tempAttendeeNames = [];
          const tempAttendeeUsernames = [];
    
          attendeeResponses.forEach((res, index) => {
            if (res.status === "fulfilled") {
              tempAttendeeNames.push(res.value.data.name);
              tempAttendeeUsernames.push(res.value.data.username);
            } else {
              console.error(`Error fetching attendee ${eventData.attendeeList[index]}:`, res.reason);
            }
          });
    
          console.log("Attendee Names:", tempAttendeeNames);
          console.log("Attendee Usernames:", tempAttendeeUsernames);
    
          // Now update state
          setAttendeeNames(tempAttendeeNames);
          setAttendeeUsernames(tempAttendeeUsernames);
          setAttendeeIds(eventData.attendeeList);
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
    fetchEventData();
    getAttendeeCount();
    getNewAttendeeCount();
  }, []);

  const updateUserEvents = async () => {
    try {
        console.log('update user events')
        const response = await axios.patch(
          'https://145c-2607-f010-2a7-1021-65cf-d688-4fd5-ee06.ngrok-free.app/api/users/', 
          {
            userId: user,
            eventId: event // Replace with actual eventId
          }
        );

        console.log('Updated User:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
  }

  const updateEventUsers = async () => {
    try {
      console.log('update events')
      const response = await axios.patch(
        'https://145c-2607-f010-2a7-1021-65cf-d688-4fd5-ee06.ngrok-free.app/api/events/', 
        {
          // Replace with actual eventId and userId
          eventId: event,
          userId: user
        }
      );

      console.log('Updated Event:', response.data);
    } catch (error) {
        console.error('Error:', error);
    }
  }


  const getAttendeeCount = async () => {
    try {
      const response = await axios.get(
        `https://145c-2607-f010-2a7-1021-65cf-d688-4fd5-ee06.ngrok-free.app/api/events/attendees/678f315b8d423da67c615e95/`);
      setAttendeeCount(response.data.length);
    } catch (error) {
        console.error('Error:', error);
    }
  }

  const getNewAttendeeCount = async () => {
    try {
      const response = await axios.get(
        `https://145c-2607-f010-2a7-1021-65cf-d688-4fd5-ee06.ngrok-free.app/api/events/attendees/678f315b8d423da67c615e95/`
      );
      const attendeeIds = response.data;
      const userRequests = attendeeIds.map(attendeeId =>
          axios.get(`https://145c-2607-f010-2a7-1021-65cf-d688-4fd5-ee06.ngrok-free.app/api/users/${attendeeId}`)
      );
      const users = await Promise.all(userRequests);
      let count = users.filter(user => user.data.attendedEvents.length === 0).length;
      setNewAttendeeCount(count); 
    } catch (error) {
      console.error('Error fetching new attendees:', error);
    }
  }
  
  return (
    <ScrollView style={styles.container}>
      <Image 
        style={styles.image}
        source = {garden}
      />
      <UserCard name="Bob" style={styles.hostCard} />

      <Text style={styles.eventHeader}>{title}</Text>

      <Text style={styles.subtext}>{date}, {time}</Text>
      <Text style={styles.subtext}>Location </Text>
      <Text>{location}</Text>

      <Text style={styles.subtext}>Attendees</Text>
      <Text>{newAttendeeCount !== null ? `${newAttendeeCount}+ new Teapost goers are attending!` : ""}</Text>
      <Text>{attendeeCount !== null ? attendeeCount : "No attendees yet!"}</Text>

      <Text style={styles.details}>About Event</Text>
      <Text style={styles.detailParagraph}>{details}</Text>


      {/* Attendees Section */}

      <View style={styles.attendeesList}>
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
          {attendeeNames?.map((attendeeName, index) => (
            <UserCard
              key={index}
              name={attendeeName}
              username={attendeeUsernames?.[index]}
              style={styles.attendeeCard}
            />
          ))
          }
        </Collapsible>
      </View>

      <Pressable style={styles.shareButton} onPress={() => 
        {
        updateUserEvents(); 
        updateEventUsers();
        }}>
        <Text style={styles.shareButtonText}>Attending</Text>
      </Pressable>

      {/* Share Button */}
      <Pressable style={styles.shareButton}>
        <Text style={styles.shareButtonText}>Share</Text>
      </Pressable>
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
  details: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 16,
    fontStyle: "italic",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 10,
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
  attendeesList: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
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
  image: {
    width: '340',
    height: '200',
    borderRadius: 10,
    marginBottom: 10,
  }, 
  subtext: {
    fontStyle: 'bold',
  }, 
  detailParagraph: {
    marginBottom: 20,
  }
});

export default EventPage;