import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import Placeholder from './homepage_components/mainimage';
import EventCard from './homepage_components/eventcard';
import { programPages, upcomingEvents } from './homepage_components/data';
import sample_logo from '@assets/sample.png';
import pichu from '@assets/pichu.jpg';
import pikachu from '@assets/pikachu.jpg';
import raichu from '@assets/raichu.jpg';

export default function Homepage() {
  const [userData, setUserData] = useState(null);
  const [userAttendingEvents, setUserAttendingEvents] = useState([]);

  const [testEvent, setTestEvent] = useState(null);

  const [loading, setLoading] = useState(true);
  let level_img = sample_logo;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // fetching user data here
        const userResponse = await axios.get('http://localhost:4000/api/users/6789f49f8e0a009647312c7a');
        const testResponse = await axios.get('http://localhost:4000/api/events/678f315b8d423da67c615e95');
        setTestEvent(testResponse)
        if (userResponse.status === 200) {
          setUserData(userResponse.data);
          // fetching events for the user's attendingEvents
          setUserAttendingEvents(userResponse.data.attendingEvents)
          console.log(userAttendingEvents)
          // const attendingEvents = userData.attendingEvents.map((eventId) => axios.get(`http://localhost:4000/api/events/${eventId}`));
          // const attendingEventsResponse = await Promise.all(attendingEvents)
          // const events_attending = attendingEventsResponse.map((response) => response.data);
          // setUserAttendingEvents(events_attending)
        } else {
          console.error('Failed to fetch user: ', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching user or events: ', error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);
  
  if (userData && userData.tamagatchiXP !== undefined) {
    if (userData.tamagatchiXP < 1000) {
      level_img = pichu;
    } else if (userData.tamagatchiXP <= 2000) {
      level_img = pikachu;
    } else {
      level_img = raichu;
    }

  }

  return (
    <ScrollView style={styles.main_container}>
      {/* <Text style = {styles.title}> Your Teapot Garden </Text>
      <Placeholder imageSource={level_img} />
      <Text style = {styles.subtitle}> Upcoming Events </Text>
      <View style={styles.events_container}>
        {userAttendingEvents.map((event, index) => (
          <EventCard key={index} title={event.title} time={event.time} date={event.date} location={event.location} image={event.image} />
        ))}
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: 600,
    marginVertical: 40,
    textAlign: 'center',
    color: '#737373',
    marginBottom: 50
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: 600,
    marginTop: 40,
    margin: 20,
    textAlign: 'left',
    color: '#000000'
  },
  main_container: {
    flex: 1,
    backgroundColor: '#FCFCFC'
  },
  events_container: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  
});
