import AdminDashboard from '@screens/admin_dashboard/admin_dashboard.jsx';
import React, { useState, useEffect} from "react";
import { Text, ScrollView, View, Pressable, StyleSheet, Image } from "react-native";
import UserCard from '@screens/program_page/user_card.jsx';
import Collapsible from 'react-native-collapsible';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import garden from '@assets/garden.jpg';
import grapes from '@assets/grapes.jpg';
import { useLocalSearchParams } from "expo-router";
import { Link } from "expo-router"; 
import axios from 'axios';


const EventPage = () => {
  const tempEventId = '67932a72413f4d68be84e592'; //valentines picnic woohoo
  const tempUserId = '678f3a6bc0368a4c717413a8'; //testingggg
  const API_KEY = 'http://localhost:4000';

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [user, setUser] = useState(null); 
  const [attendingEvents, setAttendingEvents] = useState([]);
  const [event, setEvent] = useState(null);
  const [attendeeCount, setAttendeeCount] = useState(null);
  const [newAttendeeCount, setNewAttendeeCount] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(true);


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

  useEffect(() => {
    const fetchUser = async () => {
      try { 
        const response = await axios.get(`${API_KEY}/api/users/678f3a6bc0368a4c717413a8`);
        if (response.status === 200) {
          setUser(response.data);
          setAttendingEvents(response.data.attendingEvents);
        } else {
          console.error('Failed to fetch user: ', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching user: ', error.message);
      } finally {
        setLoading(false);
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
              console.error('Failed to fetch event: ', response.data.error);
          }
      } catch (error) {
          console.error('Error fetching event: ', error.message);
      } finally {
          setLoading(false);
      }
  };

    fetchUser();
    fetchEvent();
    getAttendeeCount();
    getNewAttendeeCount();
  }, []);

  //buttons for registration/cancel registration/view ticket
  const [showDynamicButtons, setShowDynamicButtons] = useState(true);
  const Buttons = ({ attending }) => {
    return (
      <View>
        {showDynamicButtons && <DynamicButtons attending={attending}/>}
        {!showDynamicButtons && <RegisterButtons />}
      </View>
    );
  };
  const DynamicButtons = ({ attending }) => {
    let content
    if (!attending) {
      content = 
      <Pressable style={styles.shareButton} onPress={() => setShowDynamicButtons(false)}>
      <Text style={styles.shareButtonText}>Register</Text>
      </Pressable>
    } else {
      content = (
        <View>
          <Pressable style={styles.shareButton}>
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
  const RegisterButtons = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <Text style={{paddingTop: 10}}>Will you be coming as...</Text>

        <Pressable style={styles.registerButtons} onPress={addUserEvent}>
        <Text style={styles.shareButtonText}>volunteer</Text>
        </Pressable>
        
        <Pressable style={styles.registerButtons} onPress={addUserEvent}>
        <Text style={styles.shareButtonText}>attendee</Text>
        </Pressable>

        <Pressable style={styles.xButton} onPress={() => setShowDynamicButtons(true)}>
        <Text style={styles.shareButtonText}>X</Text>
        </Pressable>
      </View>
    )
  }
    
  //add user event
  const addUserEvent = async () => {
    try {
        console.log('add to user events')
        const response = await axios.patch( 
            `${API_KEY}/api/users/`, 
            {
                userId: tempUserId,
                eventId: tempEventId // Replace with actual eventId
            }
        );
    } catch (error) {
        console.error('Error:', error);
    }
  };

  //delete user event
  const deleteUserEvent = async () => {
    //gets rid of event from attendingEvents array
    const updatedEvents = attendingEvents.filter((item) => item !== tempEventId);
    try { 
      const response = await axios.patch(`${API_KEY}/api/users/${tempUserId}`, { attendingEvents: updatedEvents } );
      console.log(response.data)
    }
    catch (error) {
      console.log("error", error)
    }
    
  }

  const updateEventUsers = async () => {
    try {
      console.log('update events')
      const response = await axios.patch(
        `${API_KEY}/api/events/`, 
        {
          // Replace with actual eventId and userId
          eventId: '678f315b8d423da67c615e95',
          userId: '678f3a6bc0368a4c717413a8'
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
        `${API_KEY}/api/events/attendees/678f315b8d423da67c615e95`);
      setAttendeeCount(response.data.length);
    } catch (error) {
        console.error('Error:', error);
    }
  }

  const getNewAttendeeCount = async () => {
    try {
      const response = await axios.get(  
        `${API_KEY}/api/events/attendees/67932a72413f4d68be84e592`
      );
      const attendeeIds = response.data;
      const userRequests = attendeeIds.map(attendeeId => 
          axios.get(`${API_KEY}/api/users/${attendeeId}`)
      );
      const users = await Promise.all(userRequests);
      let count = users.filter(user => user.data.attendedEvents.length === 0).length;
      setNewAttendeeCount(count); 
    } catch (error) {
      console.error('Error fetching new attendees:', error);
    }
  }

  const handleLikeToggle = async () => {
    try {
        console.log("Sending like request...");
        const response = await axios.patch(
            `${API_KEY}/api/events/like/${tempEventId}`,
            { userId: tempUserId }
        );

        console.log("Response:", response.data);

        if (response.status === 200) {
            setLiked(response.data.likedBy.includes(tempUserId));
            setLikeCount(response.data.likes);
        }
    } catch (error) {
        console.error("Error updating like count:", error.response?.data || error.message);
    }
};

  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          style={styles.image}
          source={garden}
        />
        <View style={styles.likeContainer}>
          <Ionicons 
            name={liked ? 'heart' : 'heart-outline'} 
            size={24} 
            color={liked ? 'red' : 'gray'} 
            onPress={handleLikeToggle}
          />
          <Text style={styles.likeCount}>{likeCount}</Text>
        </View>
      </View>

      <UserCard name="Bob" profilePicture={garden} style={styles.hostCard} />

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


      <Buttons attending={attendingEvents.includes(tempEventId)}/>
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

      <Pressable style={styles.button}>
        <Link
          href={{
            pathname: "screens/event/registration_page",
            params: {
              title,
              date,
              location,
              time,
              details
            },
          }}
          style={styles.link}
        >
        <Text style={styles.buttonText}>Register</Text>
        </Link>
      </Pressable>

      <Pressable style={styles.button}>
        <Link
          href={{
            pathname: "screens/event/admin_scanner",
            params: {
              title,
              date,
              location,
              time,
              details
            },
          }}
          style={styles.link}
        >
        <Text style={styles.buttonText}>Admin QR Scanner</Text>
        </Link>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '340',
    height: '200',
    borderRadius: 10,
    marginBottom: 10,
  },
  likeContainer: {
    position: 'absolute',
    top: 8,
    right: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 4,
    borderRadius: 12,
  },
  likeCount: {
    marginLeft: 4,
    fontSize: 16,
    color: 'black',
  },
  eventHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtext: {
    fontSize: 16,
    marginBottom: 4,
    fontStyle: 'bold',
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
  attendeesButtonText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  attendeeCard: {
    marginBottom: 4,
    fontSize: 10,  
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  shareButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "gray",
    borderRadius: 20,
  },
  registerButtons: {
    marginTop: 16,
    padding: 12,
    width: 150,
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
  buttonText: {
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
  detailParagraph: {
    marginBottom: 20,
  }
});

export default EventPage;